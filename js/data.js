/**
 * Portfolio Data & Knowledge Base for Vaishnavi S
 * Centralized data store for portfolio content and AI Chatbot knowledge retrieval.
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Vaishnavi S",
    preferredName: "Vaishnavi",
    title: "Computer Science & Engineering Student | ML & Frontend Developer",
    role: "ML & IoT Intern | Aspiring Software Engineer",
    headline: "Building Computer Vision Security, Smart IoT Automation & User-Centric Web Applications",
    bio: "Dedicated Computer Science and Engineering student with hands-on experience in UI/UX Design, Frontend Development, and Python Programming. Proven expertise in developing intelligent automation systems, computer vision-based security solutions, and IoT-driven real-world applications. Passionate about creating seamless user experiences and seeking professional internship opportunities to contribute to high-impact engineering projects.",
    status: "Actively Seeking Professional Internship & Engineering Roles (2026 – 2027)",
    location: "Villupuram, Tamil Nadu, India (PIN: 604202)",
    email: "vaishnavivaithegil@gmail.com",
    phone: "+91 9345567751",
    github: "https://github.com/vaishusubramani145",
    linkedin: "https://linkedin.com/in/vaishnavi-s",
    resumeUrl: "#resume-modal",
    stats: [
      { label: "CGPA", value: "8.13", icon: "fa-graduation-cap" },
      { label: "Strategic Projects", value: "5+", icon: "fa-rocket" },
      { label: "Internships Completed", value: "2", icon: "fa-briefcase" },
      { label: "Hackathons & Expos", value: "SIH & More", icon: "fa-trophy" },
      { label: "Technical Domains", value: "ML, IoT, Web", icon: "fa-layer-group" }
    ]
  },

  education: [
    {
      degree: "Bachelor of Engineering (B.E.) in Computer Science and Engineering",
      institution: "P.T. Lee Chengalvaraya Naicker College of Engineering & Tech, Kanchipuram",
      duration: "2023 – 2027",
      gpa: "CGPA: 8.13",
      location: "Kanchipuram, Tamil Nadu, India",
      coursework: [
        "Data Structures & Algorithmic Thinking",
        "Object-Oriented Programming with Python & C++",
        "Database Management Systems (DBMS & SQL)",
        "Computer Vision & Image Processing Fundamentals",
        "Web Technologies & Responsive Design",
        "Internet of Things (IoT) & Embedded Systems"
      ],
      honors: [
        "Consistent Academic Performer with CGPA 8.13",
        "Active Participant in Smart India Hackathon (SIH)",
        "Organizer of College Technical & Cultural Events"
      ]
    }
  ],

  skills: {
    categories: [
      {
        name: "Programming & Machine Learning",
        icon: "fa-brain",
        skills: [
          { name: "Python Programming", level: 90 },
          { name: "OpenCV & Image Processing", level: 86 },
          { name: "Basic Machine Learning & Classification", level: 82 },
          { name: "OCR & Text Recognition", level: 84 },
          { name: "Algorithmic Thinking & Logic", level: 85 }
        ]
      },
      {
        name: "Frontend Development & UI/UX Design",
        icon: "fa-palette",
        skills: [
          { name: "HTML5 & Semantic Markup", level: 92 },
          { name: "CSS3 & Modern Responsive Design", level: 90 },
          { name: "JavaScript (ES6+)", level: 82 },
          { name: "Figma Prototyping & Wireframing", level: 88 },
          { name: "Canva & Design Systems", level: 90 }
        ]
      },
      {
        name: "IoT & Smart Automation",
        icon: "fa-microchip",
        skills: [
          { name: "IoT System Integration", level: 85 },
          { name: "Smart Automation & Robotics", level: 82 },
          { name: "Sensor Interfacing & Telemetry", level: 84 },
          { name: "Hardware-Software Synchronization", level: 80 }
        ]
      },
      {
        name: "Tools, Platforms & Databases",
        icon: "fa-screwdriver-wrench",
        skills: [
          { name: "Git & GitHub Version Control", level: 88 },
          { name: "VS Code & Jupyter Notebook", level: 92 },
          { name: "SQLite & Flask Backend", level: 82 },
          { name: "Linux Basics & System Integration", level: 80 }
        ]
      }
    ],
    badges: [
      "Python", "OpenCV", "Machine Learning", "Image Processing", "HTML5", "CSS3", 
      "JavaScript", "Flask", "SQLite", "Figma", "Canva", "IoT Systems", "Sensor Interfacing", 
      "Hardware-Software Sync", "Git", "GitHub", "VS Code", "Jupyter", "Linux Basics"
    ]
  },

  internships: [
    {
      company: "Gradtwin Services (OPC) Pvt Ltd, Chennai",
      role: "Technical Intern",
      period: "July 2026 – Sep 2026",
      location: "Chennai, Tamil Nadu, India",
      type: "Internship",
      highlights: [
        "Contributed to full-stack web feature development and UI/UX responsive enhancements using modern HTML5, CSS3, and JavaScript.",
        "Collaborated on software architecture optimization, component reusability, and automated cross-browser testing routines.",
        "Created user-centric prototypes in Figma, translating client business requirements into intuitive frontend interface designs.",
        "Assisted senior engineers in system integration, code reviews, and Git-based collaborative version control workflows."
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "Figma", "Git", "System Integration", "Python"]
    },
    {
      company: "VEI Technologies Pvt Ltd, Chennai",
      role: "IoT Solutions Intern",
      period: "Dec 2025 – Jan 2026",
      location: "Chennai, Tamil Nadu, India",
      type: "Internship",
      highlights: [
        "Engineered and deployed end-to-end IoT sensor interfacing modules for smart automation telemetry and data collection.",
        "Implemented seamless hardware-software synchronization protocols between microcontrollers, sensor nodes, and monitoring dashboards.",
        "Conducted thorough testing and troubleshooting of IoT hardware firmware, reducing communication latency and signal dropouts.",
        "Authored comprehensive technical documentation on sensor calibration, circuit schematics, and system deployment guidelines."
      ],
      tech: ["IoT System Integration", "Sensors", "Hardware-Software Sync", "Automation", "Python", "Embedded C"]
    }
  ],

  projects: [
    {
      id: "weapon-detection",
      title: "Weapon Detection System – Computer Vision & ML",
      category: "vision",
      categoryLabel: "Computer Vision & ML",
      featured: true,
      summary: "Automated real-time security monitoring system using OpenCV and Machine Learning algorithms to detect weapons in digital imagery and surveillance feeds.",
      problem: "Traditional surveillance depends heavily on human vigilance, leading to delayed reactions and overlooked threats in public and secured facilities.",
      solution: "Engineered an intelligent computer vision pipeline implementing morphological preprocessing, edge analysis, and ML classification algorithms to spot weapon silhouettes and alert operators instantaneously.",
      metrics: [
        { label: "Detection Reliability", value: "High Precision" },
        { label: "Processing Speed", value: "Real-Time" },
        { label: "Surveillance Ready", value: "100%" }
      ],
      tech: ["Python", "OpenCV", "Machine Learning", "Image Processing", "NumPy"],
      github: "https://github.com/vaishusubramani145",
      demo: "https://github.com/vaishusubramani145",
      paper: "https://github.com/vaishusubramani145",
      image: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)"
    },
    {
      id: "tamil-script-ocr",
      title: "Ancient Tamil Script Recognition Engine",
      category: "nlp",
      categoryLabel: "ML & Digital Humanities",
      featured: true,
      summary: "Machine learning model and optical character recognition pipeline designed to decipher historical Tamil inscriptions and translate them into modern readable script.",
      problem: "Epigraphical stone carvings and ancient palm-leaf manuscripts are severely deteriorated, making manual historical translation time-consuming and error-prone.",
      solution: "Developed custom image preprocessing techniques (binarization, contour segmentation, contrast stretching) coupled with machine learning classifiers and OCR algorithms to recognize centuries-old Tamil characters.",
      metrics: [
        { label: "Script Support", value: "Ancient & Brahmi" },
        { label: "Text Extraction", value: "Automated OCR" },
        { label: "Language", value: "Tamil" }
      ],
      tech: ["Python", "OCR", "Image Processing", "Machine Learning", "OpenCV"],
      github: "https://github.com/vaishusubramani145",
      demo: "https://github.com/vaishusubramani145",
      paper: "https://github.com/vaishusubramani145",
      image: "linear-gradient(135deg, #7F00FF 0%, #E100FF 100%)"
    },
    {
      id: "fintrack-pro",
      title: "FinTrack-Pro – Personal Finance Management System",
      category: "web",
      categoryLabel: "Full-Stack Web & Python",
      featured: true,
      summary: "Comprehensive personal finance web application built using Python, Flask, and SQLite for tracking income, categorizing expenses, and analyzing savings.",
      problem: "Individuals frequently struggle with manual financial tracking, leading to budgeting errors, missed payments, and lack of visual spending insights.",
      solution: "Built a responsive web dashboard with secure SQLite database integration, categorized transaction logging, visual expense analytics, and responsive UI with HTML5/CSS3.",
      metrics: [
        { label: "Database", value: "SQLite ACID" },
        { label: "Framework", value: "Flask Micro" },
        { label: "Device Support", value: "Responsive" }
      ],
      tech: ["Python", "Flask", "SQLite", "HTML5", "CSS3", "JavaScript"],
      github: "https://github.com/vaishusubramani145",
      demo: "https://github.com/vaishusubramani145",
      paper: "https://github.com/vaishusubramani145",
      image: "linear-gradient(135deg, #0ba360 0%, #3cba92 100%)"
    },
    {
      id: "nextgen-agri",
      title: "NextGen Agri: Smart Farming & Robotics Ecosystem",
      category: "iot",
      categoryLabel: "IoT & Smart Automation",
      featured: false,
      summary: "End-to-end intelligent agricultural automation system integrating drone surveillance, telemetry soil sensing, and automated robotic weed elimination.",
      problem: "Unpredictable climate conditions and weed infestations severely degrade crop yields while manual field inspection demands heavy labor.",
      solution: "Architected a dual aerial-terrestrial system combining aerial drone monitoring with terrestrial soil moisture/nutrient sensors, automatically triggering targeted robotic weed removal.",
      metrics: [
        { label: "Crop Yield Boost", value: "Optimized" },
        { label: "Weed Detection", value: "Automated" },
        { label: "Architecture", value: "IoT Sensors" }
      ],
      tech: ["IoT Systems", "Robotics", "Sensors", "Automation", "Hardware-Software Sync", "Python"],
      github: "https://github.com/vaishusubramani145",
      demo: "https://github.com/vaishusubramani145",
      paper: "https://github.com/vaishusubramani145",
      image: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
    },
    {
      id: "college-rbac",
      title: "College Management & Role-Based Access Control (RBAC)",
      category: "web",
      categoryLabel: "Web & Security",
      featured: false,
      summary: "Secure institutional management web portal with Role-Based Access Control, automated attendance tracking, complaint registration, and real-time SMS alerts.",
      problem: "Educational institutions struggle with fragmented attendance recording, slow grievance redressal, and uncoordinated communication with parents.",
      solution: "Engineered a secure web application establishing granular permissions for students, faculty, and administrators, paired with automated SMS gateway notifications.",
      metrics: [
        { label: "Security", value: "RBAC Protocol" },
        { label: "Alerts", value: "Real-Time SMS" },
        { label: "Modules", value: "Attendance & Helpdesk" }
      ],
      tech: ["Web Technologies", "Python", "SMS Gateway", "HTML5", "CSS3", "JavaScript"],
      github: "https://github.com/vaishusubramani145",
      demo: "https://github.com/vaishusubramani145",
      paper: "https://github.com/vaishusubramani145",
      image: "linear-gradient(135deg, #f857a6 0%, #ff5858 100%)"
    }
  ],

  certifications: [
    {
      title: "Venture Idea Development: Ignite Bootcamp",
      issuer: "Wadhwani Foundation",
      date: "2026",
      credentialId: "WADHWANI-IGNITE-2026",
      credentialUrl: "https://www.wadhwanifoundation.org/",
      skillsCovered: ["Entrepreneurial Thinking", "Product Ideation", "Market Feasibility", "Business Model Canvas"],
      icon: "fa-lightbulb"
    },
    {
      title: "Generative AI and Machine Learning Specialist",
      issuer: "MindIT Technical Workshops",
      date: "2025 – 2026",
      credentialId: "MINDIT-GENAI-ML-SPEC",
      credentialUrl: "https://mindit.in/",
      skillsCovered: ["Generative AI Models", "Prompt Engineering", "Machine Learning Workflows", "Applied Python AI"],
      icon: "fa-brain"
    }
  ],

  achievements: [
    {
      title: "Smart India Hackathon (SIH) Participant",
      organization: "Ministry of Education & AICTE",
      date: "2024 – 2025",
      description: "Participated in the prestigious nationwide Smart India Hackathon, brainstorming and prototyping tech solutions for pressing real-world challenges.",
      badge: "🇮🇳 SIH Hackathon"
    },
    {
      title: "Lee Techathlon & Lee Forge Project Expo Competitor",
      organization: "P.T. Lee Chengalvaraya Naicker College of Engineering & Tech",
      date: "2024 – 2026",
      description: "Demonstrated innovative working prototypes in smart automation, computer vision, and IoT systems, receiving faculty and peer acclaim.",
      badge: "🏆 Project Expo"
    },
    {
      title: "Leadership & Technical Event Organizer",
      organization: "College Technical & Cultural Committees",
      date: "2023 – 2026",
      description: "Successfully organized and coordinated inter-college symposiums, coding competitions, and cultural festivals, managing logistics and student teams.",
      badge: "⭐ Student Leadership"
    },
    {
      title: "Consistent Academic Excellence – CGPA 8.13",
      organization: "Anna University / PT Lee CNCET",
      date: "2023 – 2027",
      description: "Maintained a strong 8.13 CGPA across rigorous semesters in Computer Science and Engineering coursework.",
      badge: "🎓 High Academic Standing"
    }
  ],

  contact: {
    name: "Vaishnavi S",
    email: "vaishnavivaithegil@gmail.com",
    phone: "+91 9345567751",
    location: "Villupuram, Tamil Nadu, India 604202",
    workAuthorization: "Authorized to work in India / Open to Global Remote Internships",
    availability: "Available for Professional Internships & Engineering Roles",
    preferredRoles: [
      "Machine Learning Intern",
      "Frontend & UI/UX Developer",
      "Python / Software Engineering Intern",
      "IoT Solutions Specialist"
    ],
    socials: [
      { name: "LinkedIn", url: "https://linkedin.com/in/vaishnavi-s", icon: "fa-linkedin" },
      { name: "GitHub", url: "https://github.com/vaishusubramani145", icon: "fa-github" }
    ]
  },

  // Knowledge base for Vaishnavi's AI Chatbot
  faq: [
    {
      keywords: ["who are you", "who is vaishnavi", "tell me about yourself", "intro", "profile", "about vaishnavi", "bio", "overview"],
      answer: "Hello! I'm **Nexora**, Vaishnavi S's interactive AI assistant. **Vaishnavi S** is a dedicated Computer Science and Engineering student at P.T. Lee CNCET (CGPA: 8.13) with proven hands-on experience in **Python Programming, UI/UX Design (Figma), Frontend Web Development (HTML/CSS/JS), Machine Learning (OpenCV & Computer Vision), and IoT Automation**!\n\nShe has completed internships at **VEI Technologies** (IoT Solutions) and **Gradtwin Services** (Technical Intern), and is seeking professional internship opportunities!"
    },
    {
      keywords: ["skills", "technical skills", "technologies", "tech stack", "languages", "tools", "what do you know"],
      answer: "Here are Vaishnavi's key technical skills:\n\n- **Programming & ML**: Python, OpenCV, Basic Machine Learning, Image Processing, OCR, Algorithmic Thinking.\n- **Frontend & UI/UX**: HTML5, CSS3, JavaScript (ES6+), Responsive Web Design, Figma Prototyping, Canva.\n- **IoT & Infrastructure**: IoT System Integration, Smart Automation, Sensor Interfacing, Hardware-Software Sync.\n- **Tools & Platforms**: Git, GitHub, VS Code, Jupyter Notebook, SQLite, Flask, Linux Basics."
    },
    {
      keywords: ["education", "college", "degree", "university", "cgpa", "school", "coursework", "grades"],
      answer: "🎓 **Vaishnavi's Education**:\n\n- **Degree**: Bachelor of Engineering (B.E.) in Computer Science and Engineering\n- **Institution**: P.T. Lee Chengalvaraya Naicker College of Engineering & Tech, Kanchipuram\n- **Duration**: 2023 – 2027\n- **CGPA**: **8.13 / 10.0**\n- **Key Coursework**: Data Structures, Python, DBMS, Web Technologies, Computer Vision, IoT Systems."
    },
    {
      keywords: ["internship", "intern", "experience", "work history", "jobs", "vei technologies", "gradtwin"],
      answer: "💼 **Vaishnavi's Professional Internships**:\n\n1. **Technical Intern** at **Gradtwin Services (OPC) Pvt Ltd, Chennai** (July 2026 – Sep 2026):\n   - Developed frontend web components, built Figma prototypes, and enhanced UI/UX responsiveness.\n\n2. **IoT Solutions Intern** at **VEI Technologies Pvt Ltd, Chennai** (Dec 2025 – Jan 2026):\n   - Engineered IoT sensor interfacing modules, automated telemetry, and integrated hardware-software synchronization protocols."
    },
    {
      keywords: ["project", "projects", "weapon detection", "tamil script", "fintrack", "nextgen agri", "smart farming", "rbac"],
      answer: "🚀 **Vaishnavi's Key Strategic Projects**:\n\n1. 🔍 **Weapon Detection System**: Real-time security monitoring using Python, OpenCV, and Machine Learning classification.\n2. 📜 **Ancient Tamil Script Recognition Engine**: OCR and ML image processing model translating historical inscriptions into modern text.\n3. 💰 **FinTrack-Pro**: Web-based personal finance management system built with Python, Flask, and SQLite.\n4. 🌾 **NextGen Agri**: Smart farming ecosystem integrating drone surveillance and automated soil sensing with robotic weed removal.\n5. 🏫 **College Management & RBAC System**: Web portal with Role-Based Access Control and real-time SMS alerts."
    },
    {
      keywords: ["certification", "certifications", "certificate", "wadhwani", "mindit", "ignite"],
      answer: "📜 **Vaishnavi's Certifications**:\n\n1. 💡 **Venture Idea Development: Ignite Bootcamp** – Wadhwani Foundation (2026)\n2. 🧠 **Generative AI and Machine Learning Specialist** – MindIT Technical Workshops (2025 – 2026)"
    },
    {
      keywords: ["achievement", "achievements", "hackathon", "sih", "smart india", "expo", "leadership"],
      answer: "🏆 **Vaishnavi's Achievements & Activities**:\n\n- 🇮🇳 **Smart India Hackathon (SIH)**: Active Participant in nationwide problem-solving.\n- 🔬 **Lee Techathlon & Lee Forge Project Expo**: Demonstrated working IoT and Computer Vision prototypes.\n- ⭐ **Leadership**: Organized and coordinated major college-level technical symposiums and cultural events.\n- 📚 **Academic Excellence**: Consistent 8.13 CGPA throughout engineering."
    },
    {
      keywords: ["contact", "email", "reach", "hire", "phone", "linkedin", "github", "location", "address"],
      answer: "📬 **Contact Vaishnavi S**:\n\n- 📧 **Email**: [vaishnavivaithegil@gmail.com](mailto:vaishnavivaithegil@gmail.com)\n- 📱 **Phone**: [+91 9345567751](tel:+919345567751)\n- 💼 **LinkedIn**: [linkedin.com/in/vaishnavi-s](https://linkedin.com/in/vaishnavi-s)\n- 💻 **GitHub**: [github.com/vaishusubramani145](https://github.com/vaishusubramani145)\n- 📍 **Location**: Villupuram, Tamil Nadu, India 604202\n\nShe is open to internship and engineering opportunities!"
    },
    {
      keywords: ["resume", "cv", "download", "pdf"],
      answer: "You can preview and print Vaishnavi's full resume directly using the 'Resume' button in the navigation header or by requesting a copy at [vaishnavivaithegil@gmail.com](mailto:vaishnavivaithegil@gmail.com)!"
    }
  ]
};

// Export to window for global browser usage
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
