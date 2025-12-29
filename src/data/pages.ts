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
    SiInstagram,
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

export const contactLinks = {
    twitter: {
        name: "x",
        url: "https://x.com/prabhatlabs",
        icon: RiTwitterXFill,
        target: "_blank",
    },
    github: {
        name: "github",
        url: "https://github.com/IsayAyase",
        icon: IoLogoGithub,
        target: "_blank",
    },
    linkedIn: {
        name: "linkedin",
        url: "https://linkedin.com/in/prabhatm8000",
        icon: FaLinkedinIn,
        target: "_blank",
    },
    mail: {
        name: "mail",
        url: "mailto:prabhatm8000@gmail.com",
        icon: SiGmail,
        target: "_self",
    },
    instagram: {
        name: "instagram",
        url: "https://instagram.com/prabhatm8000",
        icon: SiInstagram,
        target: "_blank",
    },
};

export const contactLinksArray = Object.values(contactLinks);
export const skillsArray = Object.values(skills);

export const projects = [
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
];

export const experiences = [
    {
        iconUrl: "/companyLogos/flexzistay_logo.png",
        company: "Flexzistay",
        position: "Software Developer Intern",
        location: "Remote",
        period: "Oct 2025 - Present",
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
]

export const myInfo = {
    name: "Prabhat Mishra",
    title: "Software Developer",
    description:
        "Building software the way some people build puzzles - carefully, thoughtfully, and with a vision for the bigger picture.",
    imageUrl: "/me.png",
    contacts: contactLinksArray,
    skills: skillsArray,
};