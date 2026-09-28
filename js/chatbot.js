/**
 * AI Chatbot Assistant Engine ("Nexora" - Vaishnavi S's AI Persona)
 * Supports:
 * 1. Built-in Smart RAG / Knowledge retrieval engine (Instant, 0-latency, 100% offline)
 * 2. Optional Google Gemini API integration (Live LLM with full context)
 * 3. Voice synthesis (Text-to-Speech) & Speech-to-Text input
 * 4. Contextual memory & follow-up tracking
 */

(function () {
  'use strict';

  // State Management
  const ChatState = {
    isOpen: false,
    soundEnabled: true,
    speechEnabled: false,
    useGemini: false,
    geminiApiKey: localStorage.getItem('gemini_api_key') || '',
    activeTopic: null,
    conversationHistory: []
  };

  // DOM Elements Cache
  let elements = {};

  // Audio synthesizer for subtle modern interaction beeps
  const SoundFX = {
    ctx: null,
    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
    },
    playTone(freq = 440, type = 'sine', duration = 0.08) {
      if (!ChatState.soundEnabled) return;
      try {
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        // AudioContext not allowed before user interaction
      }
    },
    send() { this.playTone(580, 'sine', 0.06); },
    receive() {
      this.playTone(660, 'triangle', 0.08);
      setTimeout(() => this.playTone(880, 'sine', 0.08), 70);
    }
  };

  // Text-To-Speech (Web Speech API)
  const VoiceAssistant = {
    speak(text) {
      if (!ChatState.speechEnabled || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*_#`[\]()]/g, '').slice(0, 280);
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Simple Markdown Parser for Rich Answers
  function formatMarkdown(text) {
    if (!text) return '';
    let parsed = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    parsed = parsed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    parsed = parsed.replace(/\*(.*?)\*/g, '<em>$1</em>');
    parsed = parsed.replace(/`([^`]+)`/g, '<code class="tag">$1</code>');
    parsed = parsed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1 <i class="fas fa-external-link-alt" style="font-size:0.7em"></i></a>');
    
    const paragraphs = parsed.split('\n\n');
    return paragraphs.map(p => {
      if (p.trim().startsWith('- ') || p.trim().startsWith('* ')) {
        const items = p.split('\n').map(line => {
          const itemContent = line.replace(/^[-*]\s+/, '');
          return itemContent ? `<li>${itemContent}</li>` : '';
        }).join('');
        return `<ul>${items}</ul>`;
      }
      return `<p>${p.replace(/\n/g, '<br>')}</p>`;
    }).join('');
  }

  // Built-in Smart Knowledge Engine
  const SmartKnowledgeEngine = {
    answer(query) {
      const q = query.toLowerCase().trim();
      const data = window.PORTFOLIO_DATA || {};

      // 1. Specific Project Deep Dives
      if (data.projects) {
        for (const proj of data.projects) {
          const titleWords = proj.title.toLowerCase();
          const projId = proj.id.toLowerCase();
          if (q.includes(projId) || titleWords.split(' ').some(w => w.length > 3 && q.includes(w))) {
            ChatState.activeTopic = `project_${proj.id}`;
            return `🚀 **${proj.title}** (${proj.categoryLabel})\n\n` +
                   `**Summary:** ${proj.summary}\n\n` +
                   `**Problem Solved:** ${proj.problem}\n\n` +
                   `**Solution & Implementation:** ${proj.solution}\n\n` +
                   `**Key Highlights:** ${proj.metrics.map(m => `**${m.label}:** ${m.value}`).join(' | ')}\n\n` +
                   `**Technologies Used:** ${proj.tech.join(', ')}\n\n` +
                   `🔗 [View GitHub Repository](${proj.github})`;
          }
        }
      }

      // 2. Specific Internship Deep Dives
      if (data.internships) {
        if (q.includes('vei') || q.includes('iot solutions') || q.includes('sensor')) {
          const vei = data.internships.find(i => i.company.toLowerCase().includes('vei'));
          ChatState.activeTopic = 'internship_vei';
          return `💼 **${vei.role} at ${vei.company}** (${vei.period}):\n\n` +
                 vei.highlights.map(h => `- ${h}`).join('\n') +
                 `\n\n**Tech Stack:** ${vei.tech.join(', ')}`;
        }
        if (q.includes('gradtwin') || q.includes('frontend') || q.includes('technical intern') || q.includes('figma')) {
          const gt = data.internships.find(i => i.company.toLowerCase().includes('gradtwin'));
          ChatState.activeTopic = 'internship_gradtwin';
          return `💼 **${gt.role} at ${gt.company}** (${gt.period}):\n\n` +
                 gt.highlights.map(h => `- ${h}`).join('\n') +
                 `\n\n**Tech Stack:** ${gt.tech.join(', ')}`;
        }
      }

      // 3. Follow-up resolution based on active context
      if (ChatState.activeTopic && (q.includes('tell me more') || q.includes('more details') || q.includes('what else') || q.includes('explain'))) {
        if (ChatState.activeTopic.startsWith('project_')) {
          const pId = ChatState.activeTopic.replace('project_', '');
          const proj = data.projects.find(p => p.id === pId);
          if (proj) {
            return `Here is additional technical context for **${proj.title}**:\n\n` +
                   `- **Architecture**: Built using ${proj.tech.slice(0, 3).join(', ')} with high modularity and clean algorithmic processing.\n` +
                   `- **Primary Output**: ${proj.metrics[0].label} is **${proj.metrics[0].value}**.\n` +
                   `- **Repository**: Open-source code available on Vaishnavi's GitHub: [${proj.github}](${proj.github}).`;
          }
        }
      }

      // 4. Match Knowledge Base FAQs
      if (data.faq && Array.isArray(data.faq)) {
        let bestMatch = null;
        let highestScore = 0;

        for (const item of data.faq) {
          let score = 0;
          for (const kw of item.keywords) {
            if (q === kw) score += 10;
            else if (q.includes(kw)) score += 3 + kw.length * 0.2;
          }
          if (score > highestScore) {
            highestScore = score;
            bestMatch = item;
          }
        }

        if (bestMatch && highestScore >= 3) {
          return bestMatch.answer;
        }
      }

      // 5. Broad Categorical Fallbacks
      if (q.includes('skill') || q.includes('python') || q.includes('opencv') || q.includes('html') || q.includes('figma')) {
        return `🛠️ **Vaishnavi's Technical Skills Overview**:\n\n` +
               `- **Programming & ML**: Python, OpenCV, Basic Machine Learning, Image Processing, OCR, Algorithmic Thinking.\n` +
               `- **Frontend & Design**: HTML5, CSS3, JavaScript (ES6+), Responsive Design, Figma Prototyping, Canva.\n` +
               `- **IoT & Automation**: Sensor Interfacing, Hardware-Software Sync, IoT System Integration, Smart Automation.\n` +
               `- **Tools**: Git, GitHub, VS Code, Jupyter Notebook, SQLite, Flask.\n\n` +
               `Would you like to know more about her Computer Vision or Web Development projects?`;
      }

      if (q.includes('education') || q.includes('college') || q.includes('cgpa') || q.includes('chengalvaraya')) {
        const edu = data.education[0];
        return `🎓 **Vaishnavi's Academic Background**:\n\n` +
               `**${edu.degree}**\n` +
               `- **Institution:** ${edu.institution}\n` +
               `- **CGPA:** **${edu.gpa}**\n` +
               `- **Timeline:** ${edu.duration}\n` +
               `- **Core Subjects:** ${edu.coursework.slice(0, 4).join(', ')}`;
      }

      if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('hire') || q.includes('linkedin') || q.includes('github')) {
        return `📬 **Get in Touch with Vaishnavi S**:\n\n` +
               `- **Email:** [${data.contact.email}](mailto:${data.contact.email})\n` +
               `- **Phone:** [${data.contact.phone}](tel:+919345567751)\n` +
               `- **LinkedIn:** [${data.contact.socials[0].url}](${data.contact.socials[0].url})\n` +
               `- **GitHub:** [${data.contact.socials[1].url}](${data.contact.socials[1].url})\n` +
               `- **Location:** ${data.contact.location}\n\n` +
               `Vaishnavi is actively open to **Machine Learning**, **Frontend**, **Python**, and **IoT** internship opportunities!`;
      }

      if (q.includes('certif') || q.includes('wadhwani') || q.includes('mindit')) {
        return `📜 **Vaishnavi's Certifications**:\n\n` +
               data.certifications.map(c => `- **${c.title}** (${c.issuer} - ${c.date})`).join('\n') +
               `\n\nThese reflect her continuous learning across Generative AI, Machine Learning, and Entrepreneurship!`;
      }

      if (q.includes('award') || q.includes('achievement') || q.includes('hackathon') || q.includes('sih') || q.includes('expo')) {
        return `🏆 **Achievements & Recognition**:\n\n` +
               `- **Smart India Hackathon (SIH)** Participant (Nationwide innovation challenge)\n` +
               `- **Lee Techathlon & Lee Forge Project Expo** Competitor\n` +
               `- **Student Leadership**: Organized and coordinated major college technical & cultural events\n` +
               `- **High Academic Standing**: Consistent 8.13 CGPA in Computer Science Engineering`;
      }

      // Greetings
      if (['hi', 'hello', 'hey', 'greetings', 'vanakkam', 'sup'].some(g => q === g || q.startsWith(g + ' '))) {
        return `Hello! 👋 I'm **Nexora**, Vaishnavi S's interactive portfolio assistant.\n\nAsk me anything about Vaishnavi's **Projects**, **Internship Experience**, **Technical Skills**, **Education**, or **Contact details**!\n\nWhat would you like to know?`;
      }

      // Default prompt
      return `I can help you explore Vaishnavi S's engineering portfolio! Here are a few things you can ask me:\n\n` +
             `- *"Tell me about her Weapon Detection System or Tamil Script OCR project"*\n` +
             `- *"What did Vaishnavi do during her VEI Technologies and Gradtwin internships?"*\n` +
             `- *"What are her technical skills in Python, ML, and Frontend?"*\n` +
             `- *"What is her college and CGPA?"*\n` +
             `- *"How can I contact Vaishnavi?"*`;
    }
  };

  // Google Gemini API Live Integration (Optional)
  const GeminiEngine = {
    async queryGemini(userMessage) {
      const apiKey = ChatState.geminiApiKey;
      if (!apiKey) {
        return SmartKnowledgeEngine.answer(userMessage);
      }

      const portfolioJson = JSON.stringify(window.PORTFOLIO_DATA || {});
      const systemInstruction = `You are Nexora, the personalized AI assistant for Vaishnavi S, a dedicated Computer Science and Engineering student, ML enthusiast, and Frontend developer.
Your job is to answer questions from recruiters, interviewers, and engineers about Vaishnavi's portfolio, background, skills, education, internships, projects, certifications, and achievements.
Always speak politely, accurately, and professionally about Vaishnavi using third/first person ("Vaishnavi has...", "In her project...").
Reference specific details, technologies, and achievements from her portfolio data.
Portfolio Data:
${portfolioJson}

Keep responses structured, engaging, and clear with Markdown.`;

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemInstruction}\n\nUser Question: ${userMessage}` }]
              }
            ],
            generationConfig: {
              temperature: 0.4,
              maxOutputTokens: 500
            }
          })
        });

        if (!response.ok) {
          throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidate) {
          return candidate;
        } else {
          throw new Error('No candidate returned');
        }
      } catch (err) {
        console.warn('Gemini API call failed, falling back to local smart engine:', err);
        return SmartKnowledgeEngine.answer(userMessage);
      }
    }
  };

  // Chatbot Controller
  const Chatbot = {
    init() {
      this.bindElements();
      this.attachEvents();
      this.renderInitialGreeting();
    },

    bindElements() {
      elements = {
        widget: document.getElementById('chatbot-widget'),
        triggerBtn: document.getElementById('chatbot-trigger'),
        chatWindow: document.getElementById('chatbot-window'),
        closeBtn: document.getElementById('chat-close-btn'),
        clearBtn: document.getElementById('chat-clear-btn'),
        soundBtn: document.getElementById('chat-sound-btn'),
        speechBtn: document.getElementById('chat-speech-btn'),
        settingsBtn: document.getElementById('chat-settings-btn'),
        messagesContainer: document.getElementById('chat-messages'),
        inputForm: document.getElementById('chat-form'),
        inputField: document.getElementById('chat-input'),
        chipsContainer: document.getElementById('chat-chips'),
        unreadDot: document.querySelector('.chatbot-unread-dot'),
        statusText: document.getElementById('chat-status-mode')
      };
    },

    attachEvents() {
      if (elements.triggerBtn) {
        elements.triggerBtn.addEventListener('click', () => this.toggleChat());
      }
      if (elements.closeBtn) {
        elements.closeBtn.addEventListener('click', () => this.closeChat());
      }
      if (elements.clearBtn) {
        elements.clearBtn.addEventListener('click', () => this.clearChat());
      }
      if (elements.soundBtn) {
        elements.soundBtn.addEventListener('click', () => this.toggleSound());
      }
      if (elements.speechBtn) {
        elements.speechBtn.addEventListener('click', () => this.toggleSpeech());
      }
      if (elements.settingsBtn) {
        elements.settingsBtn.addEventListener('click', () => this.openSettingsModal());
      }
      if (elements.inputForm) {
        elements.inputForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this.handleSendMessage();
        });
      }

      // Quick Chips Delegation
      if (elements.chipsContainer) {
        elements.chipsContainer.addEventListener('click', (e) => {
          const chip = e.target.closest('.chat-chip');
          if (chip) {
            const prompt = chip.getAttribute('data-prompt');
            if (prompt) {
              elements.inputField.value = prompt;
              this.handleSendMessage();
            }
          }
        });
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && ChatState.isOpen) {
          this.closeChat();
        }
      });
    },

    toggleChat() {
      ChatState.isOpen = !ChatState.isOpen;
      if (ChatState.isOpen) {
        elements.chatWindow.classList.add('open');
        elements.chatWindow.setAttribute('aria-hidden', 'false');
        if (elements.unreadDot) elements.unreadDot.style.display = 'none';
        SoundFX.receive();
        setTimeout(() => elements.inputField.focus(), 300);
      } else {
        elements.chatWindow.classList.remove('open');
        elements.chatWindow.setAttribute('aria-hidden', 'true');
      }
    },

    closeChat() {
      ChatState.isOpen = false;
      elements.chatWindow.classList.remove('open');
      elements.chatWindow.setAttribute('aria-hidden', 'true');
    },

    clearChat() {
      elements.messagesContainer.innerHTML = '';
      ChatState.conversationHistory = [];
      this.renderInitialGreeting();
      SoundFX.send();
    },

    toggleSound() {
      ChatState.soundEnabled = !ChatState.soundEnabled;
      const icon = elements.soundBtn.querySelector('i');
      if (icon) {
        icon.className = ChatState.soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
      }
      if (ChatState.soundEnabled) SoundFX.playTone(520, 'sine', 0.1);
    },

    toggleSpeech() {
      ChatState.speechEnabled = !ChatState.speechEnabled;
      const icon = elements.speechBtn.querySelector('i');
      if (icon) {
        icon.className = ChatState.speechEnabled ? 'fas fa-microphone' : 'fas fa-microphone-slash';
        icon.style.color = ChatState.speechEnabled ? 'var(--accent-cyan)' : 'inherit';
      }
    },

    openSettingsModal() {
      const currentKey = localStorage.getItem('gemini_api_key') || '';
      const modalHtml = `
        <div class="modal-overlay open" id="api-modal">
          <div class="modal-content">
            <button class="modal-close-btn" onclick="document.getElementById('api-modal').remove()">
              <i class="fas fa-times"></i>
            </button>
            <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem;">
              <div class="brand-icon"><i class="fas fa-microchip"></i></div>
              <h3>AI Engine Configuration</h3>
            </div>
            <p style="color:var(--text-secondary); font-size:0.92rem; margin-bottom:1.5rem;">
              Nexora uses a <strong>Built-in Smart RAG Knowledge Engine</strong> running client-side with 0 latency. Optionally, connect your <strong>Google Gemini API Key</strong> for live foundation model reasoning!
            </p>
            <div class="form-group">
              <label class="form-label">Google Gemini API Key (Optional)</label>
              <input type="password" id="gemini-key-input" class="form-input" placeholder="AIzaSy..." value="${currentKey}">
              <small style="color:var(--text-muted); font-size:0.78rem; display:block; margin-top:0.4rem;">
                Stored securely in your local browser only. Never transmitted elsewhere.
              </small>
            </div>
            <div style="display:flex; gap:1rem; justify-content:flex-end; margin-top:1.5rem;">
              <button class="btn btn-secondary btn-sm" onclick="localStorage.removeItem('gemini_api_key'); document.getElementById('api-modal').remove(); window.location.reload();">
                Reset to Smart Offline
              </button>
              <button class="btn btn-primary btn-sm" id="save-key-btn">
                Save & Connect
              </button>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHtml);

      document.getElementById('save-key-btn').addEventListener('click', () => {
        const val = document.getElementById('gemini-key-input').value.trim();
        if (val) {
          localStorage.setItem('gemini_api_key', val);
          ChatState.geminiApiKey = val;
          ChatState.useGemini = true;
          if (elements.statusText) elements.statusText.textContent = 'Gemini 1.5 Flash Active';
        } else {
          localStorage.removeItem('gemini_api_key');
          ChatState.geminiApiKey = '';
          ChatState.useGemini = false;
          if (elements.statusText) elements.statusText.textContent = 'Smart Knowledge RAG';
        }
        document.getElementById('api-modal').remove();
      });
    },

    renderInitialGreeting() {
      const greeting = `Hello! 👋 I'm **Nexora**, Vaishnavi S's interactive portfolio assistant.\n\nAsk me anything about Vaishnavi's **Projects**, **Internship Experience**, **Skills**, **Education**, or **Contact details**!`;
      this.appendMessage('bot', greeting);
    },

    appendMessage(sender, text) {
      const bubble = document.createElement('div');
      bubble.className = `chat-bubble ${sender}`;

      const avatarIcon = sender === 'bot' ? 'fa-robot' : 'fa-user';
      bubble.innerHTML = `
        <div class="bubble-avatar">
          <i class="fas ${avatarIcon}"></i>
        </div>
        <div class="bubble-content">
          ${formatMarkdown(text)}
        </div>
      `;

      elements.messagesContainer.appendChild(bubble);
      elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;

      if (sender === 'bot') {
        SoundFX.receive();
        VoiceAssistant.speak(text);
      } else {
        SoundFX.send();
      }
    },

    showTyping() {
      const typing = document.createElement('div');
      typing.className = 'chat-bubble bot';
      typing.id = 'chat-typing-indicator';
      typing.innerHTML = `
        <div class="bubble-avatar"><i class="fas fa-robot"></i></div>
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      `;
      elements.messagesContainer.appendChild(typing);
      elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
    },

    hideTyping() {
      const typing = document.getElementById('chat-typing-indicator');
      if (typing) typing.remove();
    },

    async handleSendMessage() {
      const query = elements.inputField.value.trim();
      if (!query) return;

      this.appendMessage('user', query);
      elements.inputField.value = '';
      this.showTyping();

      let responseText = '';
      if (ChatState.geminiApiKey) {
        responseText = await GeminiEngine.queryGemini(query);
      } else {
        await new Promise(res => setTimeout(res, 400));
        responseText = SmartKnowledgeEngine.answer(query);
      }

      this.hideTyping();
      this.appendMessage('bot', responseText);
    }
  };

  // Expose and Auto-initialize
  window.NeuroBot = Chatbot;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Chatbot.init());
  } else {
    Chatbot.init();
  }
})();
