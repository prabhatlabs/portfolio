export const skills = {
    // Languages
    typescript: {
        type: "Languages",
        name: "TypeScript",
        iconName: "SiTypescript",
    },
    javascript: {
        type: "Languages",
        name: "JavaScript",
        iconName: "SiJavascript",
    },
    python: { type: "Languages", name: "Python", iconName: "FaPython" },
    go: { type: "Languages", name: "Go", iconName: "FaGolang" },

    // Backend
    nodejs: { type: "Backend", name: "Node.js", iconName: "FaNodeJs" },
    bun: { type: "Backend", name: "Bun", iconName: "SiBun" },
    elysia: { type: "Backend", name: "Elysia", iconName: "GrFirefox" },
    express: { type: "Backend", name: "Express", iconName: "SiExpress" },
    hono: { type: "Backend", name: "Hono", iconName: "SiHono" },
    fastapi: { type: "Backend", name: "FastAPI", iconName: "SiFastapi" },
    flask: { type: "Backend", name: "Flask", iconName: "SiFlask" },

    // Frontend
    react: { type: "Frontend", name: "React", iconName: "SiReact" },
    nextjs: { type: "Frontend", name: "Next.js", iconName: "SiNextdotjs" },
    redux: { type: "Frontend", name: "Redux", iconName: "SiRedux" },
    zustand: { type: "Frontend", name: "Zustand", iconName: "SiReact" },
    shadcn: { type: "Frontend", name: "Shadcn UI", iconName: "SiShadcnui" },
    mui: { type: "Frontend", name: "MUI", iconName: "SiMui" },
    tailwind: {
        type: "Frontend",
        name: "TailwindCSS",
        iconName: "SiTailwindcss",
    },
    framer: { type: "Frontend", name: "Framer Motion", iconName: "SiFramer" },
    ffmpeg: { type: "Frontend", name: "Ffmpeg wasm", iconName: "SiFfmpeg" },

    // Databases
    mongodb: { type: "Databases", name: "MongoDB", iconName: "SiMongodb" },
    mysql: { type: "Databases", name: "MySQL", iconName: "GrMysql" },
    postgresql: {
        type: "Databases",
        name: "PostgreSQL",
        iconName: "BiLogoPostgresql",
    },
    sqlite: { type: "Databases", name: "SQLite", iconName: "SiSqlite" },
    redis: { type: "Databases", name: "Redis", iconName: "DiRedis" },
    prisma: { type: "Databases", name: "Prisma", iconName: "SiPrisma" },
    drizzle: { type: "Databases", name: "Drizzle", iconName: "SiDrizzle" },

    // Dev / Tools
    cloudflare: {
        type: "Dev / Tools",
        name: "Cloudflare",
        iconName: "FaCloudflare",
    },
    docker: { type: "Dev / Tools", name: "Docker", iconName: "SiDocker" },
    git: { type: "Dev / Tools", name: "Git", iconName: "SiGit" },
    postman: { type: "Dev / Tools", name: "Postman", iconName: "SiPostman" },
    cloudinary: {
        type: "Dev / Tools",
        name: "Cloudinary",
        iconName: "SiCloudinary",
    },
    vercel: { type: "Dev / Tools", name: "Vercel", iconName: "SiVercel" },
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
        url: "https://github.com/prabhatlabs",
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
        show: true,
        title: "rum-core",
        description:
            "Full-stack RUM SaaS capturing Core Web Vitals and API timing via a lightweight browser script. Built on a pre-aggregation pipeline across 34 Turso/SQLite tables with a Bun/Elysia + Cloudflare Workers backend and Next.js dashboard.",
        imageUrl: "/projectThumbnails/rum-core.webp",
        iconUrl: "/projectLogos/rum-core.ico",
        links: [
            {
                name: "Live",
                url: "https://rum-core.prabhatlabs.dev",
                iconName: "VscLinkExternal",
                target: "_blank",
            },
            {
                name: "GitHub",
                url: "https://github.com/prabhatlabs/rum-core",
                iconName: "IoLogoGithub",
                target: "_blank",
            },
        ],
    },
    {
        show: true,
        title: "Blade Tools",
        description:
            "Suite of 20+ privacy-first, browser-based tools for PDF, image, and video processing. Leverages FFmpeg WASM for client-side media transcoding — zero uploads, zero server costs.",
        imageUrl: "/projectThumbnails/bladetools.webp",
        iconUrl: "/projectLogos/bladetools.ico",
        links: [
            {
                name: "Live",
                url: "https://bladetools.prabhatlabs.dev",
                iconName: "VscLinkExternal",
                target: "_blank",
            },
            {
                name: "GitHub",
                url: "https://github.com/prabhatlabs",
                iconName: "IoLogoGithub",
                target: "_blank",
            },
        ],
    },
    {
        show: true,
        title: "Mapware",
        description:
            "Real-time IP threat intelligence platform that fetches and geo-enriches 10,000+ abusive IPs from AbuseIPDB on a 6-hour refresh cycle. Visualized via a 3D OpenStreetMap heatmap with Redis-cached coordinates.",
        imageUrl: "/projectThumbnails/mapware.webp",
        iconUrl: "/projectLogos/mapware.ico",
        links: [
            {
                name: "Live",
                url: "https://mapware.prabhatlabs.dev",
                iconName: "VscLinkExternal",
                target: "_blank",
            },
            {
                name: "GitHub",
                url: "https://github.com/prabhatlabs/abuseIP-map",
                iconName: "IoLogoGithub",
                target: "_blank",
            },
        ],
    },
    {
        show: true,
        title: "Ref.com",
        description:
            "Multi-tenant link management SaaS with custom aliases, branded QR codes, password protection, and click analytics. Built with React/Redux, Express.js, MongoDB aggregation pipelines, and Redis caching.",
        iconUrl: "/projectLogos/ref.svg",
        imageUrl: "/projectThumbnails/ref.webp",
        links: [
            {
                name: "Live",
                url: "https://zippy-kacey-prabhats-c81a00cc.koyeb.app",
                iconName: "VscLinkExternal",
                target: "_blank",
            },
            {
                name: "GitHub",
                url: "https://github.com/prabhatlabs/link-manager",
                iconName: "IoLogoGithub",
                target: "_blank",
            },
        ],
    },
    {
        show: false,
        title: "Yapless",
        description:
            "Microservice AI chat platform combining FastAPI and Node.js with a RAG-inspired retrieval layer for vector-based document search. Reduces hallucination through intelligent source ranking and context-aware response generation.",
        iconUrl: "/projectLogos/yapless.svg",
        imageUrl: "/projectThumbnails/yapless.webp",
        links: [
            {
                name: "GitHub",
                url: "https://github.com/prabhatlabs/yapless",
                iconName: "IoLogoGithub",
                target: "_blank",
            },
        ],
    },
    {
        show: false,
        title: "ClipB",
        description:
            "Ephemeral clipboard sharing with cURL/API support, one-time self-destructing fetch, and 40-minute Redis TTL auto-expiry. Secured with Google OAuth and rate limiting.",
        iconUrl: "/projectLogos/clipb.ico",
        imageUrl: "/projectThumbnails/clipb.webp",
        links: [
            {
                name: "Live",
                url: "https://clipb.prabhatlabs.dev",
                iconName: "VscLinkExternal",
                target: "_blank",
            },
            {
                name: "GitHub",
                url: "https://github.com/prabhatlabs/global-clipboard",
                iconName: "IoLogoGithub",
                target: "_blank",
            },
        ],
    },
    {
        show: false,
        title: "HBench | Human Benchmark",
        description:
            "Minimalist cognitive and reflex training app recreating reaction speed, memory, typing, and aim tests at 60fps. Built with Next.js, Zustand, Framer Motion, and Tailwind CSS.",
        iconUrl: "/projectLogos/hbench.ico",
        imageUrl: "/projectThumbnails/hbench.webp",
        links: [
            {
                name: "Live",
                url: "https://hbench.prabhatlabs.dev",
                iconName: "VscLinkExternal",
                target: "_blank",
            },
            {
                name: "GitHub",
                url: "https://github.com/prabhatlabs/h-bench",
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
    description:
        "Software Developer specializing in the **TypeScript/Node.js ecosystem**, building ||privacy-first||, scalable ||SaaS products|| with a focus on operational reliability and long-term cost-efficiency.\\\\I work across the **full stack** — from **database design** and **backend APIs** to responsive **frontend interfaces** — preferring to ||own features end-to-end||.\\\\Most of what I build is shaped by one question: ||does this stay fast and cost less as it scales?||",
    imageUrl: "/me.webp",
    contacts: contactLinksArray,
    skills: skillsArray,
};
