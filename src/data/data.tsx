import { BiLogoGmail, BiLogoPostgresql } from "react-icons/bi";
import { DiRedis } from "react-icons/di";
import { FaLinkedinIn, FaNodeJs, FaPython, FaWrench } from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";
import { GrMysql } from "react-icons/gr";
import { IoLogoGithub } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { MdWork } from "react-icons/md";
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

export const myInfoData = {
    name: "Prabhat Mishra",
    title: "Hey there, I'm Prabhat Mishra",
    description:
        "I'm a self-taught software developer, buildling software the way some people build puzzles, piece by piece, until everything clicks.",
    pfp: "https://avatars.githubusercontent.com/u/138608570?v=4",
};

export const contactsData = {
    title: "Connect with me",
    description: "You can find me on the following platforms!",
    mail: "prabhatm8000@gmail.com",
    links: [
        {
            name: "X",
            blank: true,
            url: "https://x.com/prabhatsuntoh",
            icon: <RiTwitterXFill className="size-6" />,
        },
        {
            name: "GitHub",
            blank: true,
            url: "https://github.com/prabhatm8000",
            icon: <IoLogoGithub className="size-6" />,
        },
        {
            name: "Linkedin",
            blank: true,
            url: "https://linkedin.com/in/prabhatm8000",
            icon: <FaLinkedinIn className="size-6" />,
        },
        {
            name: "Mail",
            blank: true,
            url: "mailto:prabhatm8000@gmail.com",
            icon: <BiLogoGmail className="size-6" />,
        },
    ],
};

export const navBarData = [
    [
        {
            name: "Home",
            icon: <IoHome className="size-6" />,
            url: "#home",
        },
        {
            name: "Work Experience",
            icon: <MdWork className="size-6" />,
            url: "#workexp",
        },
        {
            name: "Projects",
            icon: <FaWrench className="size-6" />,
            url: "#projects",
        },
    ],
    [...contactsData.links],
];

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
            logo: "/projectLogos/mapware.ico",
            thumbnail: "/projectThumbnails/mapware.png",
            video: "/videos/mapware-preview.mp4",
            title: "mapware.com",
            description:
                "Tracks abusive activity of IP with their locations and shows the data on a 3D map with location, timezone and ISP information.",
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
                    name: "Live",
                    url: "https://mapware.vercel.app",
                },
                {
                    name: "Github",
                    url: "https://github.com/prabhatm8000",
                },
            ],
        },
        {
            logo: "/projectLogos/ref.svg",
            thumbnail: "/projectThumbnails/ref.png",
            video: "/videos/ref-preview.mp4",
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
                    name: "Live",
                    url: "https://zippy-kacey-prabhats-c81a00cc.koyeb.app",
                },
                {
                    name: "Github",
                    url: "https://github.com/prabhatm8000/link-manager",
                },
            ],
        },
        {
            logo: "/projectLogos/yapless.svg",
            thumbnail: "/projectThumbnails/yapless.png",
            video: "/videos/yapless-preview.mp4",
            title: "Yapless",
            description:
                "An attitude-adjustable AI chat that thinks when it should, searches when it must, and always skips the pointless yapping.",
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
                //     name: "Live",
                //     url: "https://yapless.vercel.app",
                // },
                {
                    name: "Github",
                    url: "https://github.com/prabhatm8000/yapless",
                },
            ],
        },
        {
            logo: "/projectLogos/hbench.ico",
            thumbnail: "/projectThumbnails/hbench.png",
            video: "/videos/hbench-preview.mp4",
            title: "HBench | Human Benchmark",
            description:
                "Train your brain. Test your reflexes. A fun and minimal suite of cognitive challenges, from memory to motor skills.",
            skils: [
                skillsObj.TypeScript,
                skillsObj.Nodejs,
                skillsObj.Nextjs,
                skillsObj.Tailwindcss,
                skillsObj.Git,
            ],
            links: [
                {
                    name: "Live",
                    url: "https://hbench.vercel.app",
                },
                {
                    name: "Github",
                    url: "https://github.com/prabhatm8000/h-bench",
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
                    projectName: "HealthProNext",
                    description: [
                        "**Dynamic visit form builder** for customizable patient forms with field validation and conditional logic.",
                        "**Multi-template functionality** to streamline clinical workflows by creating multiple templates for different types of visits and assigning them to different roles.",
                        "**Visit comparison module** for side-by-side tracking & diagnosis accuracy, to help doctors compare past visits and identify patterns.",
                        "**Calendar-based appointment view** for quick follow-ups & scheduling, allowing doctors to schedule appointments and set reminders.",
                        "**Cross-device responsive front-end** for consistent UX, ensuring that the application works seamlessly on all devices, from desktops to mobile phones.",
                        "Reduced redundant **API calls** by ||~40-45%|| via **reducer** and **dispatch** optimization, resulting in faster rendering and improved performance.",
                    ],
                },
                {
                    projectName: "Primes360",
                    description: [
                        "**Role-based authentication system** with permissions for all user tiers, ensuring that each user can only access the features and data they are authorized to.",
                        "Modules for **inventory**, **asset**, **schedule**, and **task management** with automation, allowing users to automate tasks and manage their resources more efficiently.",
                        "**Centralized dashboard** combining resources, assets, and inventory, providing a single place for users to view and manage all their data.",
                        "Reduced **database calls** by ||~20-30%|| using **MongoDB aggregation pipeline**, Instead of calling multiple database functions, reducing the load on the database and improving performance.",
                        "**Enhanced UI responsiveness** with bug fixes & stability improvements, ensuring that the application is more responsive and reliable.",
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
                    projectName: "Robosensy",
                    description: [
                        "Developed **API workflow** to auto-create **follow-up appointments** when submitting prescriptions with next visit details.",
                        "Built feature to generate **prescription PDFs** from doctor-submitted forms and **invoice PDFs** for reception workflows.",
                        "Integrated **WhatsApp bot** via **3rd-party provider** for sending notifications and prescriptions.",
                        "Created **backend API documentation**, reducing **development time** by ||~20%|| through parallel backend-frontend workflows.",
                        "Improved **backend efficiency** and reduced **database/API response times** by ||~20-30%|| via **aggregation pipeline optimization**, **indexing**, and **fixing unexpected lookup errors** that returned empty arrays.",
                    ],
                },
            ],
        },
    ],
};
