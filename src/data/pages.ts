
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
    redux: { name: "Redux", iconName: "SiRedux" },
    zustand: { name: "Zustand", iconName: "SiReact" },
    nextjs: { name: "Next.js", iconName: "SiNextdotjs" },
    mui: { name: "MUI", iconName: "SiMui" },
    tailwind: { name: "TailwindCSS", iconName: "SiTailwindcss" },
    framer: { name: "Framer Motion", iconName: "SiFramer" },

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
        subtitle: "Client-side suite of utility tools",
        content: [
            "Developed a suite of ||12+|| **high-performance tools** for PDF, Image, and Video processing, utilizing Next.js **SSG/SSR** to achieve near-instant routing and optimized SEO.",
            "Integrated **FFmpeg WASM** to enable local media transcoding, **reducing file processing latency** by ||100%|| by eliminating the need for server-side uploads and downloads.",
            "**Ensured** ||100%|| user data **privacy** and **zero infrastructure overhead** by architecting a purely client-side system where all file manipulations occur strictly within the browser.",
        ],
        imageUrl: "/projectThumbnails/bladetools.webp",
        iconUrl: "/projectLogos/bladetools.ico",
        videoUrl:
            "https://res.cloudinary.com/dtapvbbzb/video/upload/v1756537370/portfolio/mapware-preview_ww3tss.mp4",
        pills: [
            skills.typescript,
            skills.nodejs,
            skills.mongodb,
            skills.nextjs,
            skills.tailwind,
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
                iconName: "IoLogoGithub",
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
    description:
        "Building software the way some people build puzzles - carefully, thoughtfully, and with a vision for the bigger picture.",
    imageUrl: "/me.png",
    contacts: contactLinksArray,
    skills: skillsArray,
};
