
export const skills = {
    // Languages
    typescript: { name: "TypeScript", iconName: "SiTypescript" },
    javascript: { name: "JavaScript", iconName: "SiJavascript" },
    python: { name: "Python", iconName: "FaPython" },
    go: { name: "Go", iconName: "FaGolang" },

    // Backend
    nodejs: { name: "Node.js", iconName: "FaNodeJs" },
    express: { name: "Express", iconName: "SiExpress" },
    fastapi: { name: "FastAPI", iconName: "SiFastapi" },
    flask: { name: "Flask", iconName: "SiFlask" },

    // Frontend
    react: { name: "React", iconName: "SiReact" },
    nextjs: { name: "Next.js", iconName: "SiNextdotjs" },
    redux: { name: "Redux", iconName: "SiRedux" },
    zustand: { name: "Zustand", iconName: "SiReact" },
    shadcn: { name: "Shadcn UI", iconName: "SiShadcnui" },
    mui: { name: "MUI", iconName: "SiMui" },
    tailwind: { name: "TailwindCSS", iconName: "SiTailwindcss" },
    framer: { name: "Framer Motion", iconName: "SiFramer" },
    ffmpeg: { name: "Ffmpeg wasm", iconName: "SiFfmpeg" },

    // Databases
    mongodb: { name: "MongoDB", iconName: "SiMongodb" },
    mysql: { name: "MySQL", iconName: "GrMysql" },
    postgresql: { name: "PostgreSQL", iconName: "BiLogoPostgresql" },
    sqlite: { name: "SQLite", iconName: "SiSqlite" },
    redis: { name: "Redis", iconName: "DiRedis" },
    prisma: { name: "Prisma", iconName: "SiPrisma" },

    // Dev / Tools
    docker: { name: "Docker", iconName: "SiDocker" },
    git: { name: "Git", iconName: "SiGit" },
    postman: { name: "Postman", iconName: "SiPostman" },
    cloudinary: { name: "Cloudinary", iconName: "SiCloudinary" },
    vercel: { name: "Vercel", iconName: "SiVercel" },
};

export const contactLinks = {
    twitter: {
        name: "x",
        url: "https://x.com/prabhatlabs",
        iconName: "RiTwitterXFill",
        target: "_blank",
    },
    github: {
        name: "github",
        url: "https://github.com/IsayAyase",
        iconName: "IoLogoGithub",
        target: "_blank",
    },
    linkedIn: {
        name: "linkedin",
        url: "https://linkedin.com/in/prabhatm8000",
        iconName: "FaLinkedinIn",
        target: "_blank",
    },
    mail: {
        name: "mail",
        url: "mailto:prabhatm8000@gmail.com",
        iconName: "SiGmail",
        target: "_self",
    },
    buymeacoffee: {
        name: "buymeacoffee",
        url: "https://www.buymeacoffee.com/prabhatlabs",
        iconName: "SiBuymeacoffee",
        target: "_blank",
    },
    instagram: {
        name: "instagram",
        url: "https://instagram.com/prabhatm8000",
        iconName: "SiInstagram",
        target: "_blank",
    },
};

export const contactLinksArray = Object.values(contactLinks);
export const skillsArray = Object.values(skills);

export const projects = [
    {
        title: "Blade Tools",
        subtitle: "20+ browser-based tools for PDF, image & video processing",
        content: [
            "Developed suite of **20+ high-performance client-side tools** for PDF manipulation, image optimization, and video transcoding using **Next.js SSG/SSR**, achieving near-instant routing and optimized SEO through static generation",
            "Integrated **FFmpeg WASM** for in-browser media transcoding, **eliminating 100% of server-side latency** and infrastructure costs by processing files entirely client-side without uploads or downloads",
            "Architected **privacy-first system with zero backend dependency**, ensuring complete user data privacy through browser-only file manipulation, resulting in **zero operational costs** and maximum data security",
        ],
        imageUrl: "/projectThumbnails/bladetools.webp",
        iconUrl: "/projectLogos/bladetools.ico",
        videoUrl: "https://res.cloudinary.com/dtapvbbzb/video/upload/v1756537370/portfolio/mapware-preview_ww3tss.mp4",
        pills: [
            skills.typescript,
            skills.nextjs,
            skills.ffmpeg,
            skills.tailwind,
            skills.shadcn,
            skills.git,
        ],
        links: [
            {
                name: "Live",
                url: "https://bladetools.prabhatlabs.dev",
                iconName: "VscLinkExternal",
                target: "_blank",
            },
            {
                name: "GitHub",
                url: "https://github.com/IsayAyase",
                iconName: "IoLogoGithub",
                target: "_blank",
            },
        ],
    },
    {
        title: "Mapware",
        subtitle: "Real-time IP threat intelligence & abuse tracking platform",
        content: [
            "Engineered automated data pipeline fetching **10,000+ abusive IP addresses** from AbuseIPDB with **IP geolocation enrichment**, storing physical location, ISP, and threat metadata in **MongoDB** with optimized indexing strategies",
            "Built **autonomous worker service** with 6-hour refresh cycle for continuous threat data updates, implementing background job scheduling and error recovery for production-grade reliability",
            "Developed **Next.js frontend** with **3D OpenStreetMap visualization** featuring interactive heatmaps and real-time IP metadata display, optimized with **Redis caching** to fetch **18,000-23,000 coordinates**, **reducing response times by 40-50%**",
        ],
        imageUrl: "/projectThumbnails/mapware.png",
        iconUrl: "/projectLogos/mapware.ico",
        videoUrl: "https://res.cloudinary.com/dtapvbbzb/video/upload/v1756537370/portfolio/mapware-preview_ww3tss.mp4",
        pills: [
            skills.typescript,
            skills.nodejs,
            skills.express,
            skills.mongodb,
            skills.redis,
            skills.nextjs,
            skills.zustand,
            skills.tailwind,
            skills.git,
        ],
        links: [
            {
                name: "Live",
                url: "https://mapware.prabhatlabs.dev",
                iconName: "VscLinkExternal",
                target: "_blank",
            },
            {
                name: "GitHub",
                url: "https://github.com/IsayAyase/abuseIP-map",
                iconName: "IoLogoGithub",
                target: "_blank",
            },
        ],
    },
    {
        title: "Ref.com",
        subtitle: "Multi-tenant link management SaaS with analytics & branded QR codes",
        content: [
            "Architected **production-ready multi-tenant SaaS platform** enabling teams to organize, track, and optimize links through isolated workspaces with secure authentication and role-based access control",
            "Implemented comprehensive feature set including **custom aliases, branded QR code generation, password-protected links, and time-based expiration**, built with **React/Redux** state management and **Express.js REST APIs**",
            "Integrated **advanced analytics engine** tracking click events, QR scans, and geo-location data with **MongoDB aggregation pipelines** and **Redis caching**, featuring **CSV export** for actionable insights and **Docker deployment** for scalable infrastructure",
        ],
        iconUrl: "/projectLogos/ref.svg",
        imageUrl: "/projectThumbnails/ref.png",
        videoUrl: "https://res.cloudinary.com/dtapvbbzb/video/upload/v1756537244/portfolio/ref-preview_wks3zn.mp4",
        pills: [
            skills.typescript,
            skills.nodejs,
            skills.express,
            skills.mongodb,
            skills.redis,
            skills.react,
            skills.redux,
            skills.shadcn,
            skills.tailwind,
            skills.framer,
            skills.docker,
            skills.git,
        ],
        links: [
            {
                name: "Live",
                url: "https://zippy-kacey-prabhats-c81a00cc.koyeb.app",
                iconName: "VscLinkExternal",
                target: "_blank",
            },
            {
                name: "GitHub",
                url: "https://github.com/IsayAyase/link-manager",
                iconName: "IoLogoGithub",
                target: "_blank",
            },
        ],
    },
    {
        title: "Yapless",
        subtitle: "AI-powered chat platform with intelligent web search integration",
        content: [
            "Architected **microservice-based AI platform** using **FastAPI** and **Node.js**, implementing modular separation of concerns across web search, LLM orchestration, and core API services for scalable deployment",
            "Engineered **RAG-inspired retrieval layer** with **vector-based document search** and intelligent source filtering, ranking trusted information to improve response accuracy and reduce hallucination in AI-generated content",
            "Demonstrated expertise in **multi-service communication patterns, LLM prompt engineering, and context-aware response generation**, handling complex backend workflows with **SQLite** for persistent storage and **Prisma ORM** for type-safe database operations",
        ],
        iconUrl: "/projectLogos/yapless.svg",
        imageUrl: "/projectThumbnails/yapless.png",
        videoUrl: "https://res.cloudinary.com/dtapvbbzb/video/upload/v1756537373/portfolio/yapless-preview_s55qxu.mp4",
        pills: [
            skills.python,
            skills.typescript,
            skills.fastapi,
            skills.nodejs,
            skills.express,
            skills.mongodb,
            skills.sqlite,
            skills.prisma,
            skills.react,
            skills.redux,
            skills.tailwind,
            skills.docker,
            skills.git,
        ],
        links: [
            {
                name: "GitHub",
                url: "https://github.com/IsayAyase/yapless",
                iconName: "IoLogoGithub",
                target: "_blank",
            },
        ],
    },
    {
        title: "ClipB",
        subtitle: "Ephemeral clipboard sharing with auto-expiry & API access",
        content: [
            "Built **API-driven clipboard system** with **cURL support** for programmatic access, enabling seamless item sharing through both REST endpoints and web UI built with **Next.js App Router**",
            "Implemented **self-destructing one-time fetch mechanism**, automatically deleting items after single retrieval through API or UI, ensuring secure temporary data sharing",
            "Engineered **40-minute auto-expiry system** with **Redis TTL (Time-To-Live)** for automatic cleanup, integrated **rate limiting** to prevent abuse, and native **Google OAuth authentication** for secure access control",
        ],
        iconUrl: "/projectLogos/clipb.png",
        imageUrl: "/projectThumbnails/clipb.png",
        pills: [
            skills.typescript,
            skills.nodejs,
            skills.nextjs,
            skills.mongodb,
            skills.redis,
            skills.zustand,
            skills.tailwind,
            skills.framer,
            skills.git,
        ],
        links: [
            {
                name: "Live",
                url: "https://clipb.prabhatlabs.dev",
                iconName: "VscLinkExternal",
                target: "_blank",
            },
            {
                name: "GitHub",
                url: "https://github.com/IsayAyase/global-clipboard",
                iconName: "IoLogoGithub",
                target: "_blank",
            },
        ],
    },
    {
        title: "HBench | Human Benchmark",
        subtitle: "Interactive cognitive & reflex training web app",
        content: [
            "Recreated suite of cognitive and reflex-based tests including reaction speed, memory sequences, typing accuracy, and aim training in a **minimalist, mobile-responsive web application**",
            "Engineered smooth **60fps animations** and optimized state updates using **Zustand** for fast, interactive user experience with real-time performance feedback and score tracking",
            "Built with **Next.js, Framer Motion**, and **Tailwind CSS**, demonstrating frontend expertise in **modern React patterns, state management, and animation libraries** with attention to responsive design and UX polish",
        ],
        iconUrl: "/projectLogos/hbench.ico",
        imageUrl: "/projectThumbnails/hbench.png",
        videoUrl: "https://res.cloudinary.com/dtapvbbzb/video/upload/v1756537240/portfolio/hbench-preview_xmgsdu.mp4",
        pills: [
            skills.typescript,
            skills.nodejs,
            skills.nextjs,
            skills.zustand,
            skills.tailwind,
            skills.framer,
            skills.git,
        ],
        links: [
            {
                name: "Live",
                url: "https://hbench.prabhatlabs.dev",
                iconName: "VscLinkExternal",
                target: "_blank",
            },
            {
                name: "GitHub",
                url: "https://github.com/IsayAyase/h-bench",
                iconName: "IoLogoGithub",
                target: "_blank",
            },
        ],
    },
];

export const experiences = [
    {
        iconUrl: "/companyLogos/flexzistay_logo.png",
        company: "Flexzistay",
        position: "Software Developer Intern",
        location: "Remote",
        period: "Oct 2025 - Dec 2025",
        skills: [
            skills.typescript,
            skills.nodejs,
            skills.express,
            skills.nextjs,
            skills.postgresql,
            skills.redis,
            skills.cloudinary,
            skills.tailwind,
            skills.git,
        ],
    },
    {
        iconUrl: "/companyLogos/nxtechworks_logo.jpeg",
        company: "NxTechWorks Consulting",
        position: "Full Stack Developer Intern",
        location: "Remote",
        period: "Jan 2025 - Sep 2025",
        pills: [
            skills.javascript,
            skills.python,
            skills.nodejs,
            skills.fastapi,
            skills.express,
            skills.mongodb,
            skills.sqlite,
            skills.postgresql,
            skills.react,
            skills.redux,
            skills.mui,
            skills.git,
        ],
    },
    {
        iconUrl: "/companyLogos/teconicopvtltd_logo.jpeg",
        company: "TecoNico Pvt. Ltd.",
        position: "Full Stack Developer Intern",
        location: "Remote",
        period: "Jul 2024 - Dec 2024",
        skills: [
            skills.javascript,
            skills.nodejs,
            skills.express,
            skills.mongodb,
            skills.git,
        ],
    },
];

export const myInfo = {
    name: "Prabhat Mishra",
    title: "Software Developer",
    description: [
        `I am a ||Full Stack Developer|| specializing in the **TypeScript and Node.js** ecosystem, currently developing ||Blade Tools|| a suite of browser-based utilities leveraging **FFmpeg WASM** to perform heavy media transcoding on the client side. This project demonstrates my commitment to **infrastructure efficiency**, effectively eliminating server-side compute costs and latency. My experience includes architecting **RAG-based microservices** using FastAPI and ChromaDB, as well as managing **multi-tenant SaaS platforms** with strict workspace isolation.`,
        `My approach to software engineering emphasizes **"privacy-by-design"** and operational reliability. I have a proven track record of maintaining system integrity during critical transitions, such as leading a **Next.js v15 to v16 upgrade** with zero downtime. From optimizing **MongoDB aggregation pipelines** to reduce database load by 30% to implementing **event-driven Pub/Sub architectures**, I focus on building scalable, maintainable systems that prioritize high availability and long-term cost-efficiency.`
    ],
    imageUrl: "/me.png",
    contacts: contactLinksArray,
    skills: skillsArray,
};
