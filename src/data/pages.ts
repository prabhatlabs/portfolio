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
    vercel: { name: "Vercel", icon: SiVercel },
};

export const contactLinks: Record<
    "twitter" | "github" | "linkedIn" | "mail",
    LinkItem
> = {
    twitter: {
        name: "X (Twitter)",
        url: "https://x.com/prabhatlabs",
        icon: RiTwitterXFill,
        target: "_blank",
    },
    github: {
        name: "GitHub",
        url: "https://github.com/IsayAyase",
        icon: IoLogoGithub,
        target: "_blank",
    },
    linkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/prabhatm8000",
        icon: FaLinkedinIn,
        target: "_blank",
    },
    mail: {
        name: "Mail",
        url: "mailto:prabhatm8000@gmail.com",
        icon: SiGmail,
        target: "_self",
    },
};

export const contactLinksArray = Object.values(contactLinks);

export const skillsPage: PageData = {
    title: "Skills",
    name: "Skills",
    tabName: "skills",
    description:
        "A well-rounded technical toolkit built through hands-on experience across backend systems, frontend interfaces, databases, and DevOps tools - enabling me to design, develop, and deploy complete software solutions from scratch.",
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
                skills.vercel,
            ],
        },
    ],
};

export const projectsPage: PageData = {
    title: "Projects",
    name: "Projects",
    tabName: "projects",
    description:
        "A curated collection of projects that reflect my journey as a developer - blending creativity, scalability, and problem-solving through code.",
    contents: [
        {
            title: "Mapware",
            subtitle: "IP Abuse Tracking Dashboard",
            content: [
                "Implemented a pipeline to fetch ||10,000+|| **abusive IPs** from AbuseIPDB, using **IP Geolocation** to retrieve physical location, ISP, and additional metadata, storing everything efficiently in MongoDB.",
                "Built a **worker service** to automatically refresh the data every 6 hours, keeping insights up-to-date.",
                "Developed a Next.js frontend to **visualize abusive IP locations** on a 3D OpenStreetMap, complete with heatmaps and interactive IP info.",
                "Optimized data retrieval using Redis, fetching ||~18,000-23,000|| **coordinates** in real-time, reducing response times by ||40-50%||.",
            ],
            imageUrl: "/projectThumbnails/mapware.png",
            iconUrl: "/projectLogos/mapware.ico",
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
                "Dockerized and Redis caching for **fast response times and smooth deployment**.",
            ],
            iconUrl: "/projectLogos/ref.svg",
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
                "Designed a **micro-service architecture** using FastAPI and Node.js, to Modularise, Web searching, LLM handling and A main core api service.",
                "Demonstrated expertise in **multi-service communication, LLM orchestration, and vector-based data retrieval**, handling complex backend workflows seamlessly.",
            ],
            iconUrl: "/projectLogos/yapless.svg",
            imageUrl: "/projectThumbnails/yapless.png",
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
            title: "ClipB",
            subtitle: "Clipboard made simple.",
            content: [
                "Added **cURL support** for direct access to items through API or UI.",
                "Developed a **one-time fetch** system, deleting items immediately after being fetched once through the API or UI.",
                "Implemented **auto-clear in 40 minutes**, removing items after 40-45 minutes.",
                "Utilized **Redis for rate limiting and caching**, preventing abuse and speeding up fetch operations.",
                "Handled **native Google OAuth** authentication, Designed an **API-driven architecture**, accessing clipboard operations through REST-like endpoints inside the Next.js App Router.",
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
                    icon: VscLinkExternal,
                    target: "_blank",
                },
                {
                    name: "GitHub",
                    url: "https://github.com/IsayAyase/global-clipboard",
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
                "Built with Next.js, Zustand, and Framer Motion, highlighting expertise in **modern React state management and animation libraries**.",
            ],
            iconUrl: "/projectLogos/hbench.ico",
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
        "Practical, hands-on experience building scalable full-stack applications, optimizing system performance, and integrating AI-driven features into real-world products. Demonstrated proficiency in backend, frontend and RAG systems.",
    contents: [
        {
            iconUrl: "/companyLogos/flexzistay_logo.png",
            title: "Flexzistay",
            subtitle: "Software Developer Intern",
            description: "Remote • Oct 2025 - Present",
            content: [
                "Revamped the UI, **streamlining user experience** and **improving performance**. Optimized and **increased mantainability and consistency** of Tailwind classes.",
                "Implemented a **feature to manage price and aviailability** of rooms for hotels. Added **cashfree payout integration**, invoice generation, all with **Pub/Sub** (event-based) architecture.",
                "Cloudinary asset migration, security and authentication setup. ",
            ],
            pills: [
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
            title: "NxTechWorks Consulting",
            subtitle: "Full Stack Developer Intern",
            description: "Remote • Jan 2025 - Sep 2025",
            content: [
                {
                    title: "PaperNextTech | Document Intelligence Platform",
                    content: [
                        "Engineered a production-ready **RAG microservice** using FastAPI, Gemma-3, and ChromaDB for vector based data retrieval, summarization, and contextual Q&A.",
                        "Implemented session-based chat history, for a seamless conversational interface.",
                        "Designed the system with modular architecture for **easy scaling across multiple AI-driven features** and smooth deployment.",
                    ],
                },
                {
                    title: "HealthProNext | EMR System for Nutritionists",
                    content: [
                        "Developed **dynamic visit form builders** with multi-template functionality and field validation for customizable patient forms.",
                        "Implemented a **visit comparison module** to track patient progress side-by-side, enabling nutritionists to detect trends and improve treatment accuracy.",
                        "Reduced redundant API requests by ||40-45%|| by optimizing state management, improving dashboard load times and lowering server strain.",
                        "Built **calendar-based appointment views** for scheduling and follow-ups, ensuring **cross-device responsive UI** for consistent user experience.",
                    ],
                },
                {
                    title: "Primes360 | Premises & Resource Management",
                    content: [
                        "Implemented **role-based authentication** with permissions for multiple user tiers, ensuring secure access to sensitive data.",
                        "Reduced database calls by ||20-30%|| using MongoDB aggregation pipelines, caching, and query restructuring.",
                        "Built real-time dashboards for inventory, asset, schedule, and task management, allowing admins and operators to **track tasks and manage resources efficiently**.",
                        "Delivered **responsive, multi-tenant dashboards** for admins and on-ground operators.",
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
            iconUrl: "/companyLogos/teconicopvtltd_logo.jpeg",
            title: "TecoNico Pvt. Ltd.",
            subtitle: "Full Stack Developer Intern",
            description: "Remote • Jul 2024 - Dec 2024",
            content: [
                {
                    title: "Robosensy | Electronic Medical Record (EMR) Manager",
                    content: [
                        "Developed API workflows to **auto-create follow-up appointments** when submitting prescriptions with next visit details.",
                        "Built features to **generate prescription PDFs** from doctor-submitted forms and **invoice PDFs** for reception workflows.",
                        "Integrated **WhatsApp chatbot communication** via third party provider for sending notifications, confirmations, and prescription reminders.",
                        "Documented all API endpoints thoroughly, **reducing development time by** ||20%|| and streamlining frontend-backend workflows.",
                        "Refactored backend modules to improve query performance, **enhancing efficiency by** ||20-30%|| through aggregation pipeline optimization, indexing, and error handling.",
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
        },
    ],
};

export const myInfoPage: PageData = {
    title: "Prabhat Mishra",
    name: "Overview",
    tabName: "overview",
    description:
        "Building software the way some people build puzzles - carefully, thoughtfully, and with a vision for the bigger picture.",
    imageUrl: "/me.png",
    contents: [
        {
            title: "Connect with Me",
            content: [
                {
                    title: "Let's Collaborate",
                    content:
                        "I'm always open to new opportunities, collaborations, or simply tech conversations. Feel free to reach out or follow my work on below platforms.",
                    links: contactLinksArray,
                },
            ],
        },
        {
            title: experiencePage.title,
            content: experiencePage.contents.slice(0, 2).map((content) => {
                return {
                    iconUrl: content.iconUrl,
                    title: content.title,
                    content:
                        `${content.subtitle}\n${content.description}` || "",
                };
            }),
            bottomLinks: [
                {
                    name:
                        experiencePage.contents.length > 2
                            ? `+${experiencePage.contents.length - 2} More`
                            : "More",
                    target: "_self",
                    url: `/${experiencePage.tabName}`,
                },
            ],
        },
        {
            title: projectsPage.title,
            content: projectsPage.contents.slice(0, 2).map((content) => {
                return {
                    title: content.title,
                    iconUrl: content.iconUrl,
                    imageUrl: content.imageUrl,
                    content: `${content.subtitle}` || "",
                    links: content.links,
                };
            }),
            bottomLinks: [
                {
                    name:
                        projectsPage.contents.length > 2
                            ? `+${projectsPage.contents.length - 2} More`
                            : "More",
                    target: "_self",
                    url: `/${projectsPage.tabName}`,
                },
            ],
        },
        {
            title: skillsPage.title,
            content: [
                {
                    title: "",
                    content: "",
                    pills: skillsPage.contents.map((c) => c.pills || []).flat(),
                },
            ],
        },
    ],
};

export const pages: PageData[] = [
    // myInfoPage,
    // skillsPage,
    projectsPage,
    experiencePage,
    blogsPage,
];
