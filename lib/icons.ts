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

const iconMap = {
    // Languages
    SiTypescript,
    SiJavascript,
    FaPython,
    FaGolang,

    // Backend
    FaNodeJs,
    SiExpress,
    SiFastapi,
    SiFlask,

    // Frontend
    SiReact,
    SiRedux,
    SiNextdotjs,
    SiMui,
    SiTailwindcss,
    SiFramer,

    // Databases
    SiMongodb,
    GrMysql,
    BiLogoPostgresql,
    SiSqlite,
    DiRedis,
    SiPrisma,

    // Dev / Tools
    SiDocker,
    SiGit,
    SiPostman,
    SiCloudinary,
    SiVercel,

    // Contact links
    RiTwitterXFill,
    IoLogoGithub,
    FaLinkedinIn,
    SiGmail,
    SiInstagram,
    VscLinkExternal,
};

export function getIcon(iconName: string) {
    return iconMap[iconName as keyof typeof iconMap] || SiReact;
}