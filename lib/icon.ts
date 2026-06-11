import {
    SiBun,
    SiCloudinary,
    SiDocker,
    SiDrizzle,
    SiExpress,
    SiFastapi,
    SiFfmpeg,
    SiFlask,
    SiFramer,
    SiGit,
    SiHono,
    SiJavascript,
    SiMongodb,
    SiMui,
    SiNextdotjs,
    SiPostman,
    SiPrisma,
    SiReact,
    SiRedux,
    SiShadcnui,
    SiSqlite,
    SiTailwindcss,
    SiTypescript,
    SiVercel,
    SiGmail,
    SiBuymeacoffee,
    SiInstagram,
    SiSocketdotio,
    SiAngular,
} from "react-icons/si";
import { IoLogoGithub } from "react-icons/io5";
import {
    FaPython,
    FaGolang,
    FaNodeJs,
    FaCloudflare,
    FaLinkedinIn,
} from "react-icons/fa6";
import { GrFirefox, GrMysql } from "react-icons/gr";
import { BiLogoPostgresql } from "react-icons/bi";
import { DiRedis } from "react-icons/di";
import { RiTwitterXFill } from "react-icons/ri";
import { VscLinkExternal } from "react-icons/vsc";

export const icons = {
    // Languages
    SiTypescript,
    SiJavascript,
    FaPython,
    FaGolang,

    // Backend
    FaNodeJs,
    SiBun,
    GrFirefox,
    SiExpress,
    SiHono,
    SiFastapi,
    SiFlask,
    SiSocketdotio,

    // Frontend
    SiReact,
    SiNextdotjs,
    SiAngular,
    SiRedux,
    SiShadcnui,
    SiMui,
    SiTailwindcss,
    SiFramer,
    SiFfmpeg,

    // Databases
    SiMongodb,
    GrMysql,
    BiLogoPostgresql,
    SiSqlite,
    DiRedis,
    SiPrisma,
    SiDrizzle,

    // Dev / Tools
    FaCloudflare,
    SiDocker,
    SiGit,
    SiPostman,
    SiCloudinary,
    SiVercel,

    // contacts
    RiTwitterXFill,
    IoLogoGithub,
    FaLinkedinIn,
    SiGmail,
    SiBuymeacoffee,
    SiInstagram,
    VscLinkExternal,
};

export function getIcon(iconName: string) {
    return icons[iconName as keyof typeof icons];
}
