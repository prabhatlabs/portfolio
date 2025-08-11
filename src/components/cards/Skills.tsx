import { BiLogoPostgresql } from "react-icons/bi";
import { DiRedis } from "react-icons/di";
import { FaNodeJs, FaPython } from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";
import { GrMysql } from "react-icons/gr";
import { IoHardwareChipOutline } from "react-icons/io5";
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
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

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

const Skills = () => {
    return (
        <Card>
            <CardHeader className="flex flex-col">
                <div className="flex gap-6 w-full">
                    <CardTitle className="text-2xl w-full flex justify-start items-center gap-2">
                        <IoHardwareChipOutline />
                        <span>Skills</span>
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 mb-2">
                {skills.map((skill, i) => (
                    <Button size={"sm"} key={i} variant={"outline"}>
                        {skill.icon}
                        <span>{skill.name}</span>
                    </Button>
                ))}
            </CardContent>
        </Card>
    );
};

export default Skills;
