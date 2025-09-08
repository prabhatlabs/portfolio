import { BiLogoPostgresql } from "react-icons/bi";
import { DiRedis } from "react-icons/di";
import { FaLinkedinIn, FaNodeJs, FaPython } from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";
import { GrMysql } from "react-icons/gr";
import { IoLogoGithub } from "react-icons/io";
import { RiTwitterXFill } from "react-icons/ri";
import {
    SiDocker,
    SiExpress,
    SiFastapi,
    SiFlask,
    SiGit,
    SiJavascript,
    SiMongodb,
    SiNextdotjs,
    SiPostman,
    SiPrisma,
    SiReact,
    SiRedux,
    SiSqlite,
    SiTailwindcss,
    SiTypescript,
} from "react-icons/si";
import { VscLinkExternal } from "react-icons/vsc";

export const myInfoData = {
    name: "Prabhat Mishra",
    title: "Hi, I'm Prabhat Mishra, a software developer",
    description:
        "Buildling software the way some people build puzzles, piece by piece, until everything clicks.",
    details: [
        "Self-taught software developer with hands-on experience in full-stack, backend, and frontend development, complemented by a Bachelor's degree in Computer Applications.",
        "Passionate about building user-friendly, impactful software solutions that address real-world problems, with a strong drive for continuous learning and growth.",
        "Actively seeking opportunities for a software development internship or full-time role to contribute technical expertise and expand professional experience.",
    ],
    pfp: "https://avatars.githubusercontent.com/u/138608570?v=4",
};

export const contactsData = {
    title: "Connect with me",
    description: "You can find me on the following platforms!",
    mail: "prabhatm8000@gmail.com",
    links: [
        {
            name: "X (Twitter)",
            blank: true,
            url: "https://x.com/IsayAyase",
            icon: <RiTwitterXFill className="size-5 sm:size-6" />,
        },
        {
            name: "GitHub",
            blank: true,
            url: "https://github.com/IsayAyase",
            icon: <IoLogoGithub className="size-5 sm:size-6" />,
        },
        {
            name: "Linkedin",
            blank: true,
            url: "https://linkedin.com/in/prabhatm8000",
            icon: <FaLinkedinIn className="size-5 sm:size-6" />,
        },
    ],
};

export const skillsObj = {
    TypeScript: {
        name: "TypeScript",
        icon: <SiTypescript />,
    },
    JavaScript: {
        name: "JavaScript",
        icon: <SiJavascript />,
    },
    Python: {
        name: "Python",
        icon: <FaPython />,
    },
    Go: {
        name: "Go",
        icon: <FaGolang />,
    },
    Nodejs: {
        name: "Node.js",
        icon: <FaNodeJs />,
    },
    Express: {
        name: "Express",
        icon: <SiExpress />,
    },
    FastAPI: {
        name: "FastAPI",
        icon: <SiFastapi />,
    },
    Flask: {
        name: "Flask",
        icon: <SiFlask />,
    },
    Nextjs: {
        name: "Next.js",
        icon: <SiNextdotjs />,
    },
    Gin: {
        name: "Gin",
        icon: <FaGolang />,
    },
    Mongodb: {
        name: "MongoDB",
        icon: <SiMongodb />,
    },
    Mysql: {
        name: "MYSQL",
        icon: <GrMysql />,
    },
    Postgresql: {
        name: "PostgreSQL",
        icon: <BiLogoPostgresql />,
    },
    Sqlite: {
        name: "SQLite",
        icon: <SiSqlite />,
    },
    Prisma: {
        name: "Prisma",
        icon: <SiPrisma />,
    },
    React: {
        name: "React",
        icon: <SiReact />,
    },
    Redux: {
        name: "Redux",
        icon: <SiRedux />,
    },
    Tailwindcss: {
        name: "TailwindCSS",
        icon: <SiTailwindcss />,
    },
    Redis: {
        name: "Redis",
        icon: <DiRedis />,
    },
    Docker: {
        name: "Docker",
        icon: <SiDocker />,
    },
    Git: {
        name: "Git",
        icon: <SiGit />,
    },
    Postman: {
        name: "Postman",
        icon: <SiPostman />,
    },
};

export const skills = [
    skillsObj.TypeScript,
    skillsObj.JavaScript,
    skillsObj.Python,
    skillsObj.Go,
    skillsObj.Nodejs,
    skillsObj.Express,
    skillsObj.FastAPI,
    skillsObj.Flask,
    skillsObj.Nextjs,
    skillsObj.Gin,
    skillsObj.Mongodb,
    skillsObj.Mysql,
    skillsObj.Postgresql,
    skillsObj.Sqlite,
    skillsObj.Prisma,
    skillsObj.React,
    skillsObj.Redux,
    skillsObj.Tailwindcss,
    skillsObj.Redis,
    skillsObj.Docker,
    skillsObj.Git,
    skillsObj.Postman,
];

export const skillsData = {
    title: "Skills",
    skills: skills,
};

export const projectsData = {
    title: "Projects",
    projects: [
        {
            logo: "/projectLogos/mapware.jpg",
            thumbnail: "/projectThumbnails/mapware.png",
            video: "https://res.cloudinary.com/dtapvbbzb/video/upload/v1756537370/portfolio/mapware-preview_ww3tss.mp4",
            title: "mapware",
            description:
                "Tracks abusive activity of IP with their locations and shows the data on a 3D map with location(with country, state, city, town and pincode), timezone and ISP information.",
            skils: [
                skillsObj.TypeScript,
                skillsObj.Nodejs,
                skillsObj.Express,
                skillsObj.Mongodb,
                skillsObj.Redis,
                skillsObj.Nextjs,
                skillsObj.Tailwindcss,
                skillsObj.Git,
            ],
            links: [
                {
                    icon: <VscLinkExternal />,
                    name: "Live",
                    url: "https://mapware.prabhatlabs.dev",
                },
                {
                    icon: <IoLogoGithub />,
                    name: "Github",
                    url: "https://github.com/IsayAyase",
                },
            ],
        },
        {
            logo: "/projectLogos/ref.svg",
            thumbnail: "/projectThumbnails/ref.png",
            video: "https://res.cloudinary.com/dtapvbbzb/video/upload/v1756537244/portfolio/ref-preview_wks3zn.mp4",
            title: "Ref.com",
            description:
                "Ref is an advanced link management platform for business, creators, and growth teams to manage, track and analyse all the links and their events in one place (Ref.com).",
            skils: [
                skillsObj.TypeScript,
                skillsObj.Nodejs,
                skillsObj.Express,
                skillsObj.Mongodb,
                skillsObj.React,
                skillsObj.Redux,
                skillsObj.Tailwindcss,
                skillsObj.Redis,
                skillsObj.Docker,
                skillsObj.Git,
            ],
            links: [
                {
                    icon: <VscLinkExternal />,
                    name: "Live",
                    url: "https://zippy-kacey-prabhats-c81a00cc.koyeb.app",
                },
                {
                    icon: <IoLogoGithub />,
                    name: "Github",
                    url: "https://github.com/IsayAyase/link-manager",
                },
            ],
        },
        {
            logo: "/projectLogos/yapless.svg",
            thumbnail: "/projectThumbnails/yapless.png",
            video: "https://res.cloudinary.com/dtapvbbzb/video/upload/v1756537373/portfolio/yapless-preview_s55qxu.mp4",
            title: "Yapless",
            description:
                "An attitude-adjustable AI chat that web searches when it must, and always skips the pointless yapping. Search supports on wikipedia, reddit and top sites from google search.",
            skils: [
                skillsObj.TypeScript,
                skillsObj.Python,
                skillsObj.Nodejs,
                skillsObj.Express,
                skillsObj.FastAPI,
                skillsObj.Mongodb,
                skillsObj.Sqlite,
                skillsObj.Prisma,
                skillsObj.React,
                skillsObj.Redux,
                skillsObj.Tailwindcss,
                skillsObj.Docker,
                skillsObj.Git,
            ],
            links: [
                // {
                // icon: <VscLinkExternal />,
                //     name: "Live",
                //     url: "https://yapless.prabhatlabs.dev",
                // },
                {
                    icon: <IoLogoGithub />,
                    name: "Github",
                    url: "https://github.com/IsayAyase/yapless",
                },
            ],
        },
        {
            logo: "/projectLogos/hbench.ico",
            thumbnail: "/projectThumbnails/hbench.png",
            video: "https://res.cloudinary.com/dtapvbbzb/video/upload/v1756537240/portfolio/hbench-preview_xmgsdu.mp4",
            title: "HBench | Human Benchmark",
            description:
                "Train your brain. Test your reflexes. A fun and minimal suite of cognitive challenges like click speed and typing speed, sequence memory, visual memory and number memory.",
            skils: [
                skillsObj.TypeScript,
                skillsObj.Nodejs,
                skillsObj.Nextjs,
                skillsObj.Tailwindcss,
                skillsObj.Git,
            ],
            links: [
                {
                    icon: <VscLinkExternal />,
                    name: "Live",
                    url: "https://hbench.prabhatlabs.dev",
                },
                {
                    icon: <IoLogoGithub />,
                    name: "Github",
                    url: "https://github.com/IsayAyase/h-bench",
                },
            ],
        },
    ],
};

export const workexpData = {
    title: "Work Experience",
    workexp: [
        {
            logo: "/companyLogos/nxtechworks_logo.jpeg",
            title: "Full Stack Developer Intern (Remote)",
            company: "NxTechWorks",
            start: "Jan 2025",
            end: "Present",
            description: [
                {
                    projectName: "HealthProNext | EMR for Nutritionist",
                    description: [
                        "**Dynamic visit form builder** with **multi-template** functionality and field validation for customizable patient forms.",
                        "**Visit comparison module** for side-by-side tracking & diagnosis accuracy, to help doctors compare past visits and identify patterns.",
                        "**Calendar-based appointment view** for quick follow-ups & schedulingwith a **cross-device responsive** front-end for consistent UX",
                        "Reduced redundant **API calls** by ||~40-45%|| via reducer and dispatch optimization, resulting in faster rendering and improved performance.",
                    ],
                },
                {
                    projectName: "Primes360 | Premises Management",
                    description: [
                        "**Role-based authentication system** with permissions for all user tiers, ensuring data integrity and security.",
                        "Reduced **database calls by 20-30%** using MongoDB aggregation pipeline, instead of multiple direct queries.",
                        "Built modules for inventory, asset, schedule, and task management with centralized dashboard, allowing users to **track tasks and manage resources efficiently**.",
                    ],
                },
            ],
        },
        {
            logo: "/companyLogos/teconicopvtltd_logo.jpeg",
            title: "Full Stack Developer Intern (Remote)",
            company: "TecoNico Pvt. Ltd.",
            start: "Jul 2024",
            end: "Dec 2024",
            description: [
                {
                    projectName:
                        "Robosensy | Electronic Medical Record Manager",
                    description: [
                        "Developed API workflow to auto-create follow-up appointments when submitting prescriptions with next visit details.",
                        "Built feature to generate prescription PDFs from doctor-submitted forms and invoice PDFs for reception workflows.",
                        "Integrated **WhatsApp bot** via 3rd-party provider for sending notifications and prescriptions.",
                        "Documented all API endpoints, which **reduced development time by 20%**, streamlining backend and frontend workflows.",
                        "Improved **backend efficiency and reduced database/API response times by 20-30%** via aggregation pipeline optimization, indexing, and fixing unexpected lookup errors.",
                    ],
                },
            ],
        },
    ],
};
