export const personalInfo = {
  name: "KRUPA B T",
  brandName: "KRUPA BT",
  field: "Information Science Engineering",
  educationLabel: "INFORMATION SCIENCE ENGINEERING",
  education: "B.E. Information Science Engineering",
  institution: "Garden City University",
  period: "Oct 2023 – Present",
  gpa: "9.22 / 10 GPA",
  location: "Bengaluru, India",
  supportingStatement: "Building practical AI and software solutions while continuously improving my DSA and development skills.",
  aboutStatement: "I like turning ideas into things that actually work.",
  email: "krupabt83@gmail.com",
  github: "https://github.com/krupabt",
  linkedin: "https://linkedin.com/in/krupa-b-t-26a153331",
  leetcode: "https://leetcode.com/u/Krupa_B_T/",
  profilePhoto: "/profile.jpeg"
};

export const skillsData = [
  {
    category: "PROGRAMMING",
    description: "Core languages for algorithmic logic, system scripting, and query engineering.",
    skills: ["Python", "Java (Core)", "JavaScript", "SQL"]
  },
  {
    category: "WEB",
    description: "Modern client-side engineering, responsive component architecture, and semantics.",
    skills: ["HTML", "CSS", "React.js"]
  },
  {
    category: "DATA",
    description: "Data manipulation, analytical pipelines, vector matrices, and predictive modeling.",
    skills: ["NumPy", "Pandas", "Scikit-learn"]
  },
  {
    category: "BACKEND",
    description: "RESTful API architectures, server-side business logic, and web services.",
    skills: ["Node.js", "Express.js", "Flask", "REST APIs"]
  },
  {
    category: "DATABASE",
    description: "Structured storage, schema design, relational queries, and ACID persistence.",
    skills: ["MySQL", "SQLite"]
  },
  {
    category: "FOUNDATIONS",
    description: "Computational problem solving, space-time efficiency, and software architecture.",
    skills: ["Data Structures & Algorithms (DSA)", "Object-Oriented Programming (OOP)"]
  },
  {
    category: "TOOLS",
    description: "Source code management, collaborative version control, and modern development environments.",
    skills: ["Git", "GitHub", "VS Code"]
  }
];

export const experienceData = [
  {
    role: "Python Intern",
    company: "Infosys Springboard",
    period: "2026 – Present",
    location: "Virtual / Remote",
    type: "Internship",
    bullets: [
      "Developing **BugFlow — Intelligent Software Defect Tracking System with Resolution Assistance**, a full-stack application using Python, Flask, React.js, and PostgreSQL to report, assign, manage, and track software defects.",
      "Implementing JWT authentication, role-based access control, REST APIs, and role-specific dashboards for secure access and efficient issue management.",
      "Developing resolution-assistance features to support software defect handling and improve issue-tracking workflows."
    ],
    technologies: ["Python", "NumPy", "Pandas", "Matplotlib", "Data Processing", "Data Visualization"]
  },
  {
    role: "Python Full Stack Development Intern",
    company: "Codtech IT Solutions Pvt. Ltd.",
    period: "Jan 2026 – Apr 2026",
    location: "Bengaluru, India",
    type: "Internship",
    bullets: [
      "Developed a Python-based Expense Tracker application with CRUD functionality and CSV-based data management.",
      "Implemented data handling and application logic using Python, SQL, and MySQL to organize and manage structured data.",
      "Performed testing, debugging, and issue resolution to improve application functionality, reliability, and code quality."
    ],
    technologies: ["Python", "SQL", "MySQL", "CRUD", "CSV Data Management", "Debugging"]
  }
];

export const projectsData = [
  {
    id: "smart-support-ai",
    number: "01",
    title: "SmartSupport AI",
    subtitle: "Customer Support & Complaint Resolution System",
    description: "A Python-based customer support platform leveraging retrieval-augmented generation (RAG) to produce grounded, verified responses from an enterprise knowledge base.",
    details: [
      "Implemented complaint classification, sentiment analysis, and priority ranking workflows.",
      "Built vector-based document retrieval using FAISS and Sentence Transformers embeddings.",
      "Integrated secure user authentication, ticket escalation pipelines, source-cited AI responses via Gemini, and an administrative support dashboard."
    ],
    tech: ["Python", "Flask", "RAG", "Gemini", "Sentence Transformers", "FAISS", "SQLite", "NumPy", "Bootstrap"],
    accent: "from-[#A8875A]/25 via-[#C4A67B]/15 to-transparent",
    accentGlow: "rgba(168, 135, 90, 0.15)",
    githubUrl: "https://github.com/krupabt/SmartSupport-AI",
    github: "https://github.com/krupabt/SmartSupport-AI",
    demoUrl: "",
    demoVideo: "",
    images: [
      "/projects/smartsupport/home.png",
      "/projects/smartsupport/dashboard.png"
    ],
    schematicType: "rag-retrieval"
  },
  {
    id: "merchant-pilot-ai",
    number: "02",
    title: "MerchantPilot AI",
    subtitle: "AI-Powered E-Commerce & Revenue Intelligence Platform",
    description: "An intelligent e-commerce ecosystem built with Python and FastAPI designed for automated product discovery, personalized bundle recommendations, and revenue optimization.",
    details: [
      "Implemented Apriori-based market basket analysis algorithms to calculate frequent itemsets and generate association rules for product bundling.",
      "Integrated Razorpay payment gateway with discount validation, HMAC-SHA256 signature verification, and automated audit logging.",
      "Architected reactive client-side storefront connected to asynchronous FastAPI REST endpoints and SQLAlchemy persistence."
    ],
    tech: ["Python", "FastAPI", "React.js", "SQLite", "SQLAlchemy", "Pandas", "Scikit-learn", "Gemini", "Razorpay", "REST APIs"],
    accent: "from-[#A8875A]/25 via-[#C4A67B]/15 to-transparent",
    accentGlow: "rgba(168, 135, 90, 0.15)",
    githubUrl: "https://github.com/krupabt/MerchantPilot-AI",
    github: "https://github.com/krupabt/MerchantPilot-AI",
    demoUrl: "",
    demoVideo: "",
    images: [
      "/projects/merchantpilot/home.png",
      "/projects/merchantpilot/dashboard.png"
    ],
    schematicType: "market-basket"
  },
  {
    id: "deepfake-detection",
    number: "03",
    title: "Harnessing AI for Deepfake Detection in Images and Videos",
    subtitle: "Facial & Temporal Media Authentication in Images & Videos",
    description: "A full-stack media forensics web application engineered with Django following SDLC best practices to classify and verify synthetic vs authentic digital media.",
    details: [
      "Engineered CNN architectures (VGG16 and MobileNet) for spatial artifact and boundary analysis across individual facial frames.",
      "Incorporated Gated Recurrent Units (GRU) to analyze temporal inconsistencies and sequence transitions across multi-frame video playback.",
      "Integrated MySQL database for secure upload processing, media logging, and model output queues, achieving 70%+ detection accuracy."
    ],
    tech: ["Python", "Django", "VGG16", "MobileNet", "GRU", "MySQL", "NumPy", "Pandas", "JavaScript"],
    stat: "70%+ Detection Accuracy",
    accent: "from-[#A8875A]/25 via-[#C4A67B]/15 to-transparent",
    accentGlow: "rgba(168, 135, 90, 0.15)",
    githubUrl: "https://github.com/krupabt/Deepfake-Detection",
    github: "https://github.com/krupabt/Deepfake-Detection",
    demoUrl: "",
    demoVideo: "",
    images: [
      "/projects/deepfake/home.png",
      "/projects/deepfake/result.png"
    ],
    schematicType: "neural-frames"
  },
  {
    id: "resume-analyzer",
    number: "04",
    title: "Resume Analyzer",
    subtitle: "NLP Candidate & Job Description Matcher",
    description: "An automated natural language processing tool comparing technical resumes with job requirements to calculate alignment scores and pinpoint skill overlaps.",
    details: [
      "Constructed textual ingestion and linguistic preprocessing pipelines including tokenization and stopword normalization.",
      "Implemented TF-IDF vector space modeling and Cosine Similarity algorithms to compute mathematical alignment metrics between candidate profiles and job descriptions.",
      "Automated skill extraction workflows to streamline preliminary candidate screening efficiency."
    ],
    tech: ["Python", "NLP", "TF-IDF", "Cosine Similarity", "Text Processing"],
    accent: "from-[#A8875A]/25 via-[#C4A67B]/15 to-transparent",
    accentGlow: "rgba(168, 135, 90, 0.15)",
    githubUrl: "https://github.com/krupabt/Resume-Analyzer",
    github: "https://github.com/krupabt/Resume-Analyzer",
    demoUrl: "",
    demoVideo: "",
    images: [
      "/projects/resume-analyzer/home.png",
      "/projects/resume-analyzer/result.png"
    ],
    schematicType: "nlp-vector"
  },
  {
    id: "classic-online-shop",
    number: "05",
    title: "Classic Online Shop",
    subtitle: "Responsive E-Commerce Web Application",
    description: "A responsive full-stack online shopping web application developed using React.js, Node.js, and Express.js with a clean interface, robust cart management, and secure order processing workflows.",
    details: [
      "Developed a responsive online shopping web application using React.js, Node.js, and Express.js with a clean and user-friendly interface.",
      "Implemented key e-commerce features including product browsing, shopping cart management, user authentication, and order processing.",
      "Integrated frontend and backend functionality using REST APIs for smooth data exchange and application workflow.",
      "Used Git for version control and maintained a structured, reusable, and maintainable codebase."
    ],
    tech: ["React.js", "Node.js", "Express.js", "JavaScript", "HTML", "CSS", "REST APIs", "Git"],
    accent: "from-[#A8875A]/25 via-[#C4A67B]/15 to-transparent",
    accentGlow: "rgba(168, 135, 90, 0.15)",
    githubUrl: "https://github.com/krupabt/Classic-Online-Shop",
    github: "https://github.com/krupabt/Classic-Online-Shop",
    demoUrl: "",
    demoVideo: "",
    images: [
      "/projects/classic-online-shop/home.png",
      "/projects/classic-online-shop/cart.png"
    ]
  }
];

export const educationData = [
  {
    degree: "Bachelor of Engineering (B.E.) – Information Science Engineering",
    institution: "Garden City University",
    location: "Bengaluru, India",
    period: "Oct 2023 – Present",
    score: "9.22 / 10 CGPA",
    highlights: "Focus areas: Python Programming, Data Structures & Algorithms, Artificial Intelligence, Database Management Systems, Computer Networks, and Software Engineering."
  },
  {
    degree: "Pre-University Course (PUC) – PCMB",
    institution: "Govt PU College for Girls",
    location: "Thirthahalli, India",
    period: "May 2021 – May 2023",
    score: "87.6%",
    highlights: "Physics, Chemistry, Mathematics, and Biology foundations with analytical problem-solving and laboratory sciences."
  }
];

export const certificationsData = [
  {
    title: "Artificial Intelligence and Machine Learning",
    issuer: "Coursera",
    issuerType: "Platform",
    date: "January 2026",
    icon: "Brain"
  },
  {
    title: "Software Engineering Job Simulation",
    issuer: "JPMorgan Chase & Co.",
    issuerType: "Organization",
    date: "April 2026",
    icon: "Code2"
  },
  {
    title: "TCS iON Career Edge – Young Professional",
    issuer: "TCS iON",
    issuerType: "Organization",
    date: "September 2025",
    icon: "TrendingUp"
  },
  {
    title: "Introduction to Python",
    issuer: "Infosys Springboard",
    issuerType: "Platform",
    date: "September 2024",
    icon: "Terminal"
  }
];

export const certifications = certificationsData;
