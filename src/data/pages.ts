import { BiLogoPostgresql } from "react-icons/bi";
import { DiRedis } from "react-icons/di";
import { FaLinkedinIn, FaNodeJs, FaPython } from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";
import { GrMysql } from "react-icons/gr";
import { IoLogoGithub } from "react-icons/io";
import { RiTwitterXFill } from "react-icons/ri";
import {
    SiCloudinary,
    SiDocker,
    SiExpress,
    SiFastapi,
    SiFlask,
    SiFramer,
    SiGit,
    SiGmail,
    SiJavascript,
    SiMongodb,
    SiMui,
    SiNextdotjs,
    SiPostman,
    SiPrisma,
    SiReact,
    SiRedux,
    SiSqlite,
    SiTailwindcss,
    SiTypescript,
    SiVercel,
} from "react-icons/si";
import { VscLinkExternal } from "react-icons/vsc";
import type { LinkItem, PageData } from "./page.types";

export const skills = {
    // Languages
    typescript: { name: "TypeScript", icon: SiTypescript },
    javascript: { name: "JavaScript", icon: SiJavascript },
    python: { name: "Python", icon: FaPython },
    go: { name: "Go", icon: FaGolang },

    // Backend
    nodejs: { name: "Node.js", icon: FaNodeJs },
    express: { name: "Express", icon: SiExpress },
    fastapi: { name: "FastAPI", icon: SiFastapi },
    flask: { name: "Flask", icon: SiFlask },

    // Frontend
    react: { name: "React", icon: SiReact },
    redux: { name: "Redux", icon: SiRedux },
    zustand: { name: "Zustand", icon: SiReact },
    nextjs: { name: "Next.js", icon: SiNextdotjs },
    mui: { name: "MUI", icon: SiMui },
    tailwind: { name: "TailwindCSS", icon: SiTailwindcss },
    framer: { name: "Framer Motion", icon: SiFramer },

    // Databases
    mongodb: { name: "MongoDB", icon: SiMongodb },
    mysql: { name: "MySQL", icon: GrMysql },
    postgresql: { name: "PostgreSQL", icon: BiLogoPostgresql },
    sqlite: { name: "SQLite", icon: SiSqlite },
    redis: { name: "Redis", icon: DiRedis },
    prisma: { name: "Prisma", icon: SiPrisma },

    // Dev / Tools
    docker: { name: "Docker", icon: SiDocker },
    git: { name: "Git", icon: SiGit },
    postman: { name: "Postman", icon: SiPostman },
    cloudinary: { name: "Cloudinary", icon: SiCloudinary },
    vercel: {name: "Vercel", icon: SiVercel}
};

export const contactLinks: LinkItem[] = [
    {
        name: "X (Twitter)",
        url: "https://x.com/prabhatlabs",
        icon: RiTwitterXFill,
        target: "_blank",
    },
    {
        name: "GitHub",
        url: "https://github.com/IsayAyase",
        icon: IoLogoGithub,
        target: "_blank",
    },
    {
        name: "LinkedIn",
        url: "https://linkedin.com/in/prabhatm8000",
        icon: FaLinkedinIn,
        target: "_blank",
    },
    {
        name: "Mail",
        url: "mailto:prabhatm8000@gmail.com",
        icon: SiGmail,
        target: "_self",
    },
]

export const myInfoPage: PageData = {
    title: "Prabhat Mishra",
    name: "Overview",
    tabName: "overview",
    description:
        "Building software the way some people build puzzles - carefully, thoughtfully, and with a vision for the bigger picture.",
    imageUrl: "https://avatars.githubusercontent.com/u/138608570?v=4",
    contents: [
        {
            title: "Software Developer",
            content: [
                {
                    title: "Overview",
                    content:
                        "I'm a self-taught software developer with a Bachelor's in Computer Applications (BCA, 2022-2025) and hands-on experience in full-stack web development. Over the past few years, I've built and maintained scalable web apps, backend systems, and developer tools using modern technologies like TypeScript, Node.js, React, and Next.js. My technical foundation spans backend design, API architecture, cloud deployment, and building intelligent applications with AI integration.",
                },
                {
                    title: "Passion",
                    content:
                        "I love crafting software that balances functionality and simplicity — whether it's designing intuitive UIs, optimizing backend performance, or integrating AI features that make applications smarter and more personal. My curiosity drives me to explore new technologies and understand systems from end to end, from database design to user interaction. Coding, for me, is not just about building — it's about solving meaningful problems and learning something new every day.",
                },
                {
                    title: "Experience",
                    content:
                        "I've interned at NxTechWorks Consulting and TecoNico Pvt. Ltd., where I contributed to real-world projects involving SaaS product development, RESTful API design, and frontend optimization. I've also built several personal projects, including Ref.com — a shortlink management SaaS platform — and YouLearn, an AI-driven learning platform leveraging RAG (Retrieval-Augmented Generation). These experiences have honed my skills in building production-grade applications and collaborating within agile teams.",
                },
                {
                    title: "Career Goal",
                    content:
                        "I'm currently seeking internship or entry-level software engineering opportunities where I can work with a talented team, contribute to meaningful projects, and continue sharpening my skills in backend systems, cloud infrastructure, and intelligent application design. My long-term goal is to evolve into a developer who not only writes efficient code but also designs solutions that truly make an impact.",
                },
            ],
        },
        {
            title: "Connect with Me",
            links: contactLinks,
            content:
                "I'm always open to new opportunities, collaborations, or simply tech conversations. Feel free to reach out or follow my work on above platforms.",
        },
    ],
};

export const skillsPage: PageData = {
    title: "Skills",
    name: "Skills",
    tabName: "skills",
    description:
        "A well-rounded technical toolkit built through hands-on experience across backend systems, frontend interfaces, databases, and DevOps tools — enabling me to design, develop, and deploy complete software solutions from scratch.",
    contents: [
        {
            title: "Languages",
            pills: [
                skills.typescript,
                skills.javascript,
                skills.python,
                skills.go,
            ],
        },
        {
            title: "Backend",
            pills: [
                skills.nodejs,
                skills.express,
                skills.fastapi,
                skills.flask,
            ],
        },
        {
            title: "Frontend",
            pills: [
                skills.nextjs,
                skills.react,
                skills.redux,
                skills.zustand,
                skills.mui,
                skills.tailwind,
                skills.framer,
            ],
        },
        {
            title: "Databases",
            pills: [
                skills.mongodb,
                skills.mysql,
                skills.postgresql,
                skills.sqlite,
                skills.redis,
                skills.prisma,
            ],
        },
        {
            title: "Dev Tools & Infrastructure",
            pills: [
                skills.docker,
                skills.git,
                skills.postman,
                skills.cloudinary,
                skills.vercel
            ],
        },
    ],
};

export const projectsPage: PageData = {
    title: "Projects",
    name: "Projects",
    tabName: "projects",
    description:
        "A curated collection of projects that reflect my journey as a developer — blending creativity, scalability, and problem-solving through code.",
    contents: [
        {
            title: "Mapware",
            subtitle: "IP Abuse Tracking Dashboard",
            content: [
                "Implemented a pipeline to fetch ||10,000+|| **abusive IPs** from AbuseIPDB, using **IP Geolocation** to retrieve physical location, ISP, and additional metadata, storing everything efficiently in MongoDB.",
                "Built a **worker service** to automatically refresh the data every 6 hours, keeping insights up-to-date.",
                "Developed a Next.js frontend to **visualize abusive IP locations** on a 3D OpenStreetMap, complete with heatmaps and interactive IP info.",
                "Optimized data retrieval using Redis, fetching ||~18,000-23,000|| **coordinates** in real-time, reducing response times by ||40-50%||."
            ],
            imageUrl: "/projectThumbnails/mapware.png",
            iconUrl: "/projectIcons/mapware.png",
            videoUrl:
                "https://res.cloudinary.com/dtapvbbzb/video/upload/v1756537370/portfolio/mapware-preview_ww3tss.mp4",
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
                    icon: VscLinkExternal,
                    target: "_blank",
                },
                {
                    name: "GitHub",
                    url: "https://github.com/IsayAyase/abuseIP-map",
                    icon: IoLogoGithub,
                    target: "_blank",
                },
            ],
        },
        {
            title: "Ref.com",
            subtitle: "Advanced Link Management SaaS",
            content: [
                "Built a **multi-tenant SaaS platform** for link management, empowering creators and teams to organize, track, and optimize links.",
                "Implemented **multiple workspaces** for separate teams to manage their own links securely.",
                "Enabled **custom aliases, branded QR codes, password-protected links, and link expiration** for secure sharing.",
                "Integrated **advanced analytics** for clicks and QR scans, with **geo-location tracking** and **CSV export**, providing actionable insights.",
                "Dockerized microservices and Redis caching for **fast response times and smooth deployment**."
            ],
            iconUrl: "/projectIcons/ref.png",
            imageUrl: "/projectThumbnails/ref.png",
            videoUrl:
                "https://res.cloudinary.com/dtapvbbzb/video/upload/v1756537244/portfolio/ref-preview_wks3zn.mp4",
            pills: [
                skills.typescript,
                skills.nodejs,
                skills.express,
                skills.mongodb,
                skills.redis,
                skills.react,
                skills.redux,
                skills.tailwind,
                skills.framer,
                skills.docker,
                skills.git,
            ],
            links: [
                {
                    name: "Live",
                    url: "https://zippy-kacey-prabhats-c81a00cc.koyeb.app",
                    icon: VscLinkExternal,
                    target: "_blank",
                },
                {
                    name: "GitHub",
                    url: "https://github.com/IsayAyase/link-manager",
                    icon: IoLogoGithub,
                    target: "_blank",
                },
            ],
        },
        {
            title: "Yapless",
            subtitle: "AI Chat with Smart Web Search",
            content: [
                "Developed an AI-powered chat platform integrating selective web search for context-aware responses.",
                "Implemented a RAG-inspired retrieval layer to intelligently filter and rank information from trusted sources, saving time and improving accuracy.",
                "Designed a **dual-service architecture** using FastAPI and Node.js, with Prisma for unified database access.",
                "Demonstrated expertise in **multi-service communication, LLM orchestration, and vector-based data retrieval**, handling complex backend workflows seamlessly."
            ],
            imageUrl: "/projectThumbnails/yapless.png",
            iconUrl: "/projectIcons/yapless.png",
            videoUrl:
                "https://res.cloudinary.com/dtapvbbzb/video/upload/v1756537373/portfolio/yapless-preview_s55qxu.mp4",
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
                    icon: IoLogoGithub,
                    target: "_blank",
                },
            ],
        },
        {
            title: "HBench | Human Benchmark",
            subtitle: "Cognitive Training Games",
            content: [
                "Recreated popular cognitive and reflex-based tests such as reaction speed, memory sequences, typing, and aim training in a **minimalist web app**.",
                "Developed smooth animations and fast state updates for an **interactive and engaging user experience**.",
                "Ensured **mobile responsiveness** and clean UI design, demonstrating frontend craftsmanship and attention to interaction design.",
                "Built with Next.js, Zustand, and Framer Motion, highlighting expertise in **modern React state management and animation libraries**."
            ],
            iconUrl: "/projectIcons/hbench.png",
            imageUrl: "/projectThumbnails/hbench.png",
            videoUrl:
                "https://res.cloudinary.com/dtapvbbzb/video/upload/v1756537240/portfolio/hbench-preview_xmgsdu.mp4",
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
                    icon: VscLinkExternal,
                    target: "_blank",
                },
                {
                    name: "GitHub",
                    url: "https://github.com/IsayAyase/h-bench",
                    icon: IoLogoGithub,
                    target: "_blank",
                },
            ],
        },
    ],
};

export const experiencePage: PageData = {
    title: "Work Experience",
    tabName: "experience",
    name: "Experience",
    description:
        "Practical, hands-on experience building scalable full-stack applications, optimizing system performance, and integrating AI-driven features into real-world products. Demonstrated proficiency in backend APIs, frontend dashboards, RAG systems, and data analytics.",
    contents: [
        {
            title: "Full Stack Developer Intern",
            subtitle: "NxTechWorks Consulting",
            description: "Remote • Jan 2025 - Sep 2025",
            content: [
                {
                    title: "PaperNextTech | Document Intelligence Platform",
                    content: [
                        "Engineered a production-ready **RAG microservice** using FastAPI, Gemma-3, and ChromaDB for semantic retrieval, summarization, and contextual Q&A.",
                        "Implemented session-based chat history, for a seamless conversational interface.",
                        "Designed the system with modular architecture for **easy scaling across multiple AI-driven features** and smooth deployment.",
                    ],
                },
                {
                    title: "HealthProNext | EMR System for Nutritionists",
                    content: [
                        "Developed **dynamic visit form builders** with multi-template functionality and field validation for customizable patient forms.",
                        "Implemented a **visit comparison module** to track patient progress side-by-side, enabling nutritionists to detect trends and improve treatment accuracy.",
                        "Built **calendar-based appointment views** for scheduling and follow-ups, ensuring **cross-device responsive UI** for consistent user experience.",
                        "Reduced redundant API requests by ||40-45%||, improving dashboard load times and lowering server strain."
                    ],
                },
                {
                    title: "Primes360 | Premises & Resource Management",
                    content: [
                        "Implemented **role-based authentication** with permissions for multiple user tiers, ensuring secure access to sensitive data.",
                        "Reduced database calls by ||20-30%|| using MongoDB aggregation pipelines, caching, and query restructuring.",
                        "Built real-time dashboards for inventory, asset, schedule, and task management, allowing admins and operators to **track tasks and manage resources efficiently**.",
                        "Delivered **responsive, multi-tenant dashboards** for admins and on-ground operators."
                    ],
                },
            ],
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
            title: "Full Stack Developer Intern",
            subtitle: "TecoNico Pvt. Ltd.",
            description: "Remote • Jul 2024 - Dec 2024",
            content: [
                {
                    title: "Robosensy | Electronic Medical Record (EMR) Manager",
                    content: [
                        "Developed API workflows to **auto-create follow-up appointments** when submitting prescriptions with next visit details.",
                        "Built features to **generate prescription PDFs** from doctor-submitted forms and **invoice PDFs** for reception workflows.",
                        "Integrated **WhatsApp chatbot communication** for sending notifications, confirmations, and prescription reminders.",
                        "Documented all API endpoints thoroughly, **reducing development time by** ||20%|| and streamlining frontend-backend workflows.",
                        "Refactored backend modules to improve query performance, **enhancing efficiency by** ||20-30%|| through aggregation pipeline optimization, indexing, and error handling."
                    ],
                },
            ],
            pills: [
                skills.javascript,
                skills.nodejs,
                skills.express,
                skills.mongodb,
                skills.git,
            ],
        },
    ],
};

export const blogsPage: PageData = {
    title: "Blogs",
    name: "Blogs",
    tabName: "blogs",
    description: "I'll be writing about tech, life, and more.",
    contents: [
        {
            title: "Coming Soon...",
        }
    ],
};

export const pages: PageData[] = [
    myInfoPage,
    skillsPage,
    projectsPage,
    experiencePage,
    blogsPage,
];