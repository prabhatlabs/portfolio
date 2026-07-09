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
    socketdotio: {
        type: "Backend",
        name: "Socket.io",
        iconName: "SiSocketdotio",
    },

    // Frontend
    react: { type: "Frontend", name: "React", iconName: "SiReact" },
    nextjs: { type: "Frontend", name: "Next.js", iconName: "SiNextdotjs" },
    angular: { type: "Frontend", name: "Angular", iconName: "SiAngular" },
    redux: { type: "Frontend", name: "Redux", iconName: "SiRedux" },
    zustand: { type: "Frontend", name: "Zustand", iconName: "SiReact" },
    shadcn: { type: "Frontend", name: "ShadcnUI", iconName: "SiShadcnui" },
    tailwind: {
        type: "Frontend",
        name: "TailwindCSS",
        iconName: "SiTailwindcss",
    },
    framer: { type: "Frontend", name: "FramerMotion", iconName: "SiFramer" },
    ffmpeg: { type: "Frontend", name: "FfmpegWASM", iconName: "SiFfmpeg" },

    // Databases
    mongodb: { type: "Databases", name: "MongoDB", iconName: "SiMongodb" },
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
        skills: [
            skills.typescript,
            skills.elysia,
            skills.hono,
            skills.nextjs,
            skills.postgresql,
            skills.sqlite,
            skills.redis,
            skills.drizzle,
            skills.cloudflare,
            skills.docker,
        ],
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
        skills: [
            skills.typescript,
            skills.nextjs,
            skills.tailwind,
            skills.shadcn,
            skills.ffmpeg,
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
                url: "https://github.com/prabhatlabs/utility-tools",
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
        skills: [
            skills.typescript,
            skills.express,
            skills.nextjs,
            skills.redis,
            skills.mongodb,
            skills.tailwind,
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
        skills: [
            skills.typescript,
            skills.express,
            skills.mongodb,
            skills.redis,
            skills.react,
            skills.tailwind,
            skills.shadcn,
            skills.docker,
        ],
        links: [
            {
                name: "Live",
                url: "https://ref.prabhatlabs.dev",
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

// need to change the card renderer for this at @app/_components/tools.tsx if items are >= 3
export const tools = [
    {
        show: true,
        title: "Go Tunnel",
        description:
            "A minimal, self-hosted reverse port-forwarding CLI built in Go. Uses a single WebSocket connection to multiplex public HTTP traffic from a VPS down to your local machine — no Ngrok or Cloudflare Tunnel required.",
        skills: [skills.go],
        links: [
            {
                name: "GitHub",
                url: "https://github.com/prabhatlabs/go-tunnel",
                iconName: "IoLogoGithub",
                target: "_blank",
            },
            {
                name: "Blog",
                url: "/blog/building-a-minimal-self-hosted-port-forwarding-tool-in-go",
                iconName: "VscLinkExternal",
                target: "_blank",
            },
        ],
    },
];

export const experiences = [
    {
        iconUrl: "/companyLogos/gluckglobal_logo.jpeg",
        company: "Glück Global Pvt Ltd",
        position: "Full Stack Developer",
        location: "Remote",
        period: "May 2026 - Present",
        pills: [
            skills.typescript,
            skills.javascript,
            skills.mongodb,
            skills.express,
            skills.angular,
            skills.socketdotio,
        ],
        points: [
            "Architected a self-hosted live classroom platform using **LiveKit** to fully replace **Zoom**, featuring camera, mic, screen sharing, and class recording, capable of handling ||10 concurrent classes|| with ||200+ simultaneous students||.",
            "Reduced student dashboard load time by ||94% (52s → ~3s)|| through full-stack optimizations: replaced client-side pagination/filtering/sorting with **server-driven MongoDB queries** (cutting payload from ~52KB to ~4KB per request), converted 100+ $or clauses to a single **$in index scan** (~10s saved), parallelized 5 cross-collection queries via **Promise.all** (~4× latency reduction), and eliminated a ||23s BSON deserialization bottleneck|| by removing a 3,000+ entry attendance array from projection and recomputing it via aggregation.",
            "Conducted a full backend performance audit across ||100+ models|| and ||20+ route files||: added **compound MongoDB indexes** to 16 previously unindexed models and applied **.lean()** to ||70+ read-only Mongoose queries||, reducing per-request memory usage by ||~60 - 80%|| and cutting read-heavy endpoint latency by ||~40 - 60%||.",
            "Further optimized backend with a **2-phase user fetch** (6-field query for all 600+ students + 13-field query only for the 50 visible in parallel), ||O(n²) → O(1)|| student lookup via **hash map**, and **client-side caching** to minimize redundant network calls.",
            "Built **dynamic exercise renderer**; **2D Interactive games**; **Dashboards** for student performance; **Daily streak** system.",
        ],
    },
    {
        // iconUrl: "",
        company: "Freelance",
        position: "Full Stack Developer (Next.js)",
        location: "Remote",
        period: "Feb 2026 - Mar 2026",
        pills: [
            skills.typescript,
            skills.bun,
            skills.nextjs,
            skills.elysia,
            skills.postgresql,
            skills.zustand,
            skills.framer,
            skills.shadcn,
            skills.tailwind,
        ],
        points: [
            "Architected a high-performance frontend using **Next.js** and **Shadcn UI**, leveraging **Static Site Generation (SSG)** and **Server-Side Rendering (SSR)** to optimize **Core Web Vitals** and enhance **SEO**.",
            "Streamlined development workflows by implementing modern **TypeScript** patterns, ensuring **end-to-end type safety** and reducing runtime errors across the application stack.",
        ],
    },
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
        points: [
            "Built end-to-end price and availability management system with **Node.js** APIs and responsive **React** interfaces for manager and admin portals; integrated **Cashfree** payout gateway with automated invoice generation using event-driven **Pub/Sub** architecture",
            "Led **Cloudinary** asset migration, **Next.js v15→v16** upgrade, and **Tailwind v3→v4** migration with **zero downtime** while revamping UI across ||three portals||",
            "Integrated **Google Maps** and **MapTiler** APIs with **Redis** caching (||2-week TTL||), eliminating redundant location requests and cutting API costs",
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
            skills.git,
        ],
        points: [
            "Engineered a **RAG** microservice (**FastAPI** + **Gemma-3** + **ChromaDB**) with a responsive chat interface supporting contextual document Q&A with persistent conversation history",
            "Built a dynamic form builder with **JSON schema** validation and **drag-and-drop** interface, and implemented **end-to-end appointment scheduling** with calendar APIs, conflict detection, and cross-device responsive UI",
            "Architected a **JWT-based RBAC** system, reduced database load by ||25%|| via **MongoDB aggregation pipeline** optimization, and cut redundant API calls by ||40%|| through **Redux** state management across a multi-module dashboard",
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
        points: [
            "Developed API workflow to **auto-create follow-up appointments** when submitting prescriptions with next visit details.",
            "Built feature to generate prescription **PDFs** from doctor-submitted forms and invoice **PDFs** for reception workflows.",
            "Integrated **WhatsApp** bot via 3rd-party provider for sending notifications and prescriptions.",
            "Documented all API endpoints, which reduced development time by ||20%||, streamlining backend and frontend workflows.",
            "Improved backend efficiency and reduced database/API response times by ||20-30%|| via aggregation pipeline optimization, indexing, and fixing unexpected lookup errors.",
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
