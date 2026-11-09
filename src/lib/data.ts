
import type { InfoItem, LinkItem } from "@/types";

/** Asset paths under the public directory. */
export const assets: {
  logo: string | null;
  avatar: string | null;
  flag: string | null;
} = {
  logo: "/assets/logo.png",
  avatar: "/assets/image.png",
  flag: "/assets/flag.svg",
};

/** Logo dimensions */
export const logoSize = {
  width: 64,
  height: 64,
};

/** Text exactly as rendered in the reference screenshot. */
export const profile = {
  displayName: "Varun Vangari",
  // displayName: "Vårün Vångårï",
  accessibleName: "Varun Vangari",
  title: [
    "Full Stack Developer",
    "UI/UX Designer",
    "Web Designer",
    "Web Developer",
  ],
};

export const infoLeft: InfoItem[] = [
  {
    icon: "briefcase",
    text: "Web Design & Full Stack Developer Intern",
    strong: "Deteroid Technologies LLP",
  },
  {
    icon: "pin",
    text: "Mumbai, Maharashtra, India",
  },
  {
    icon: "mail",
    text: "varunvangari29@gmail.com",
    href: "mailto:varunvangari29@gmail.com",
  },
  {
    icon: "gender",
    text: "Male",
  },
];

export const infoRight: InfoItem[] = [
  {
    icon: "code",
    text: "Full Stack Developer Intern",
    strong: "Zamanat Tech Solutions Private Limited",
  },
  {
    icon: "phone",
    text: "+918104597116",
    href: "tel:+918104597116",
  },
  {
    icon: "globe",
    text: "varun-vangari",
    href: "https://varun-vangari.vercel.app",
  },
];

/** Social links */
export const links: LinkItem[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "varun-vangari",
    href: "https://www.linkedin.com/in/varun-vangari-092895277/",
  },
  {
    id: "github",
    label: "GitHub",
    handle: "varun7537",
    href: "https://github.com/varun7537",
  },
  {
    id: "x",
    label: "X (Formerly Twitter)",
    handle: "@varun-vangari",
    href: "https://x.com/varun-vangari",
  },
  {
    id: "dailydev",
    label: "daily.dev",
    handle: "@varun_vangari",
    href: "https://dly.to/WKCbiOO1eX9",
  },
];

export const GITHUB_USER = "varun7537";
export const CONTRIBUTION_YEAR = 2026;

/** Fallback contribution total */
export const FALLBACK_CONTRIBUTION_TOTAL = 835;

/** About section */
export const aboutParagraphs: string[] = [
  "Hello, World! I am Varun Vangari — a Full Stack Developer, Web Designer, and Web Developer passionate about building high-performance, user-centric web applications and crafting visually appealing, intuitive, and engaging digital experiences. I enjoy combining creative design with modern technologies to develop seamless, responsive, and scalable solutions.",

  "Recently working at Deteroid Technologies LLP, where I started my journey as a Design Intern and was later promoted to Web Design & Developer Intern. During my initial role, I designed websites, created professional brochures, and developed unique brand logos. Following my promotion, I transitioned into web development, where I developed two websites and eventually built a full-stack web application. This experience helped me strengthen my skills in graphic design, UI/UX design, frontend development, and full-stack engineering.",

  "Previously, I worked as a Full Stack Development Intern at Zamanat Tech Solutions Private Limited, where I contributed to developing a full-stack real estate application. My responsibilities included building user-friendly interfaces, implementing core application features, and integrating frontend and backend functionality to deliver a seamless real estate experience. I also contributed to the Wave analytics platform by engineering reusable UI components, resulting in 20% faster page loads and 15% higher user engagement. Additionally, I optimized application performance using technologies such as React, Express.js, Node.js, and MySQL, reducing API call overhead by 35% and data transfer by 40%.",
];

export const githubProfileUrl = "https://github.com/varun7537";

/** Current project */
export const currentWork = {
  title: "QuickTube",
  image: null as string | null,
  tags: [
    "Next.js 15",
    "React 19",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Convex",
    "Zustand",
    "Shadcn UI",
  ],
  description:
    "QuickTube is a collaborative workspace for YouTube creators and their editing teams. The app brings channel management, video review, editor handoff, metadata prep, and publishing support into one shared workflow instead of spreading work across downloads, chat threads, and spreadsheets.",
};

export interface Role {
  title: string;
  /** e.g. "Full-time"; omitted for education entries. */
  type?: string;
  period: string;
  /** Hidden content of collapsed entries is not visible in the references, so it is empty here. */
  bullets: string[];
  // tags: string[];
  icon?: "code" | "education";
  defaultOpen?: boolean;
}
export interface Company {
  name: string;
  current?: boolean;
  logo: string | null;
  logoRound?: boolean;
  /** Renders a small grey dot instead of a logo and links the role icons with a vertical line. */
  dot?: boolean;
  roles: Role[];
}


/** Work experience */
/** Work Experience */
export const experience: Company[] = [
  {
    name: "Deteroid Technologies LLP",
    current: true,
    logo: "/assets/deteroid.png",
    logoRound: true,
    roles: [
      {
        title: "Web Design & Full Stack Developer Intern",
        type: "Internship",
        period: "April 2026–October 2026 (6 Months)",
        bullets: [
          "Started my professional journey as a Design Intern, creating visually appealing brand logos, professional brochures, and modern website designs while focusing on visual identity, UI/UX principles, and user-centered design.",

          "Within the first month, I was promoted to Web Design & Developer Intern in recognition of my performance, quality of work, and ability to deliver creative solutions.",

          "Worked on multiple client projects, translating business requirements into responsive, visually engaging, and user-friendly web experiences.",

          "Designed and developed the Blue Elephants Travels company website, focusing on responsive layouts, intuitive navigation, and an engaging user experience.",

          "Developed a landing page for Icon Interior, a home decor and interior design company, emphasizing modern UI design, visual storytelling, and responsive presentation.",

          "Worked on the Navgrah Bracelets company website, delivering a complete full-stack web solution using Next.js, Tailwind CSS, Node.js, MongoDB, and Sanity CMS.",

          "Implemented reusable frontend components, responsive interfaces, server-side functionality, database integration, and content management workflows for the Navgrah Bracelets website.",

          "Worked on backend functionality, API integration, data handling, and dynamic content management to connect frontend interfaces with application services.",

          "Collaborated on project requirements, design implementation, development workflows, debugging, testing, and website optimization to deliver production-ready digital experiences.",

          "Strengthened practical skills in graphic design, UI/UX design, frontend development, backend engineering, database management, and full-stack web development.",
        ],
      },
    ],
  },

  {
    name: "Zamanat Tech Solutions Private Limited",
    logo: "/assets/zamanat.png",
    roles: [
      {
        title: "Full Stack Developer Intern",
        type: "Internship",
        period: "December 2025 - March 2026 (3 Months)",
        bullets: [
          "Completed a 3-month Full Stack Development Internship, contributing to the development of EStateHub, a real estate application designed to simplify property discovery and management.",

          "Worked across both frontend and backend development, contributing to application architecture, user interface implementation, server-side functionality, and database integration.",

          "Developed responsive and reusable frontend components using React Native, focusing on intuitive navigation, consistent UI patterns, and smooth user interactions.",

          "Built backend functionality using Node.js and Express.js, implementing RESTful APIs to handle application requests, business logic, and communication between frontend and backend services.",

          "Worked with MySQL for relational database management, including data modeling, structured queries, CRUD operations, and maintaining consistent application data.",

          "Integrated frontend components with backend APIs to support dynamic data rendering, application workflows, and seamless communication between different application layers.",

          "Participated in debugging, API testing, error handling, and performance optimization to improve application reliability and maintainability.",

          "Collaborated with the development team to understand project requirements, implement features, resolve technical issues, and follow structured development practices.",

          "Gained hands-on experience in full-stack application development, REST API integration, database management, frontend engineering, and collaborative software development.",
        ],
      },
    ],
  },
  {
      name: "Education",
      logo: null,
      dot: false,
      roles: [
      {
        title: "Aditya Institute of Management Studies & Research",
        period: "2024–2026",
        icon: "education",
        bullets: [
          "Recently completed Master of Computer Applications (MCA).",
          "Developed a strong foundation in advanced computer applications, software development, and database management.",
          "Gained knowledge of programming, data structures, web technologies, and modern computing concepts.",
          "Worked on practical projects to strengthen technical, analytical, and problem-solving skills.",
          "Located in Mumbai, India."
        ],
      },
      {
        title: "SIES College of Arts, Science & Commerce",
        period: "2021–2024",
        icon: "education",
        defaultOpen: false,
        bullets: [
          "Successfully completed Bachelor of Science (B.Sc.) in Computer Science in 2024.",
          "Studied core computer science subjects, including programming, database management, computer networks, and software development.",
          "Developed programming and logical problem-solving skills through academic coursework and practical assignments.",
          "Built a strong foundation in computer science, analytical thinking, and technical concepts.",
          "Located in Mumbai, India."
        ],
      },
      {
        title: "Rao Junior College of Science",
        period: "2019–2021",
        icon: "education",
        defaultOpen: false,
        bullets: [
          "Successfully completed Higher Secondary Certificate (HSC) in the Science stream in 2021.",
          "Studied foundational science and mathematics subjects.",
          "Developed analytical thinking, logical reasoning, and problem-solving abilities.",
          "Built a strong academic foundation for higher education in computer science.",
          "Located in Mumbai, India."
        ],
      },
    ],
    },
  ];
  
  export interface PersonalProject {
    id: string;
    title: string;
    /** Preview image / icon paths under /public; null renders an empty slot. */
    image: string | null;
    icon: string | null;
  }
  /** Cards are only visible as image tops in the reference; names/content/aspect still needed. */
  export const personalProjects: PersonalProject[] = [
  { id: "mindmarket", title: "MindMarket Landing Page \u2014 Technical Study", image: null, icon: null },
  { id: "quicktube", title: "Quicktube", image: null, icon: null },
];

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  href: string | null;
  icon: "id" | "coursera";
}

export const certifications: Certification[] = [
  // Cybersecurity
  {
    title: "Google Cybersecurity",
    issuer: "@Coursera",
    date: "31.01.2025",
    href: null,
    icon: "coursera",
  },

  // Automation & Backend
  {
    title: "Google IT Automation with Python",
    issuer: "@Coursera",
    date: "30.01.2025",
    href: null,
    icon: "coursera",
  },

  // Programming & Data Structures
  {
    title: "Java: Data Structures and Algorithms Specialization",
    issuer: "@Coursera",
    date: "22.01.2025",
    href: null,
    icon: "coursera",
  },

  // Python Programming
  {
    title: "Python Essentials 1",
    issuer: "@Cisco Networking Academy",
    date: "08.02.2025",
    href: null,
    icon: "coursera",
  },

  // Frontend Development
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "@freeCodeCamp",
    date: "08.02.2025",
    href: null,
    icon: "coursera",
  },

  // Frontend & Data Visualization
  {
    title: "Data Visualization",
    issuer: "@freeCodeCamp",
    date: "08.02.2025",
    href: null,
    icon: "coursera",
  },

  // Backend Development
  {
    title: "PHP Tutorial Beginner to Advanced",
    issuer: "@Udemy",
    date: "07.02.2025",
    href: null,
    icon: "coursera",
  },

  // AI & Machine Learning
  {
    title: "Deep Learning Mastery",
    issuer: "@Udemy",
    date: "07.02.2025",
    href: null,
    icon: "coursera",
  },

  // Cloud Computing
  {
    title: "AWS Fundamentals",
    issuer: "@Coursera",
    date: "08.2022",
    href: null,
    icon: "coursera",
  },

  // Java Backend Development
  {
    title: "Spring Framework Specialization",
    issuer: "@Coursera",
    date: "",
    href: null,
    icon: "coursera",
  },


  // UI/UX Design
  {
    title: "Foundations of User Experience (UX) Design",
    issuer: "@Coursera",
    date: "01.01.2025",
    href: null,
    icon: "coursera",
  },

  // Generative AI
  {
    title: "Generative AI: Elevate your Software Development Career",
    issuer: "@Coursera",
    date: "01.01.2025",
    href: null,
    icon: "coursera",
  },

  // Graphic Design
  {
    title: "Adobe Illustrator Course For Beginner",
    issuer: "@Udemy",
    date: "07.02.2025",
    href: null,
    icon: "coursera",
  },
];

export const contact = {
  title: "Schedule a Meeting",
  subtitle: "Book a call to discuss your project or collaboration.",
  cta: "Book a meeting",
  /** Destination not visible in the references; the CTA is inert until this is set. */
  ctaHref: null as string | null,
  blurb: "Feel free to reach out for inquiries, collaborations, projects, or brainstorm solutions.",
  inquired: "10+ others inquired",
  /** Three avatar image paths under /public; null renders empty slots. */
  avatars: [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
  ] as Array<string | null>,
};

export const footerText = {
  title: [
    "Full Stack Developer",
    "UI/UX Designer",
    "Web Designer",
    "Web Developer",
  ],
  left: "All rights reserved \u00a9 2026 varun vangari",
  right: "Code by Varun Vangari",
};
