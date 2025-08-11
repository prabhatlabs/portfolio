import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import { IoLogoGithub } from "react-icons/io";
import { SiVlcmediaplayer } from "react-icons/si";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { skillsObj } from "./Skills";

const projects = [
    {
        logo: "/projectLogos/yapless.svg",
        thumbnail: "/projectThumbnails/yapless.png",
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
            {
                name: "Live",
                url: "https://yapless.vercel.app/",
            },
            {
                name: "Github",
                url: "https://github.com/prabhatm8000/yapless",
            },
        ],
    },
    {
        logo: "/projectLogos/ref.svg",
        thumbnail: "/projectThumbnails/ref.png",
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
                url: "https://ref.com/",
            },
            {
                name: "Github",
                url: "https://github.com/prabhatm8000/ref",
            },
        ],
    },
    {
        logo: "/projectLogos/hbench.ico",
        thumbnail: "/projectThumbnails/hbench.png",
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
                url: "https://hbench.vercel.app/",
            },
            {
                name: "Github",
                icon: null,
                url: "https://github.com/prabhatm8000/hbench",
            },
        ],
    },
];

const Projects = () => {
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-col">
                <div className="flex gap-6 w-full">
                    <CardTitle className="text-2xl w-full flex justify-start items-center gap-2">
                        <SiVlcmediaplayer />
                        <span>Projects</span>
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="mb-2">
                {projects.map((project, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <div className="flex gap-2 items-start">
                            <div className="rounded-full bg-white p-1">
                                <Image
                                    src={project.logo}
                                    alt={project.title}
                                    width={30}
                                    height={30}
                                    className="rounded-full"
                                />
                            </div>
                            <div className="flex flex-col">
                                <h5 className="text-lg font-semibold">
                                    {project.title}
                                </h5>
                                <div className="flex flex-wrap gap-3">
                                    {project.links.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm flex gap-1 items-center"
                                        >
                                            {link.name === "Github" ? (
                                                <IoLogoGithub />
                                            ) : (
                                                <FiExternalLink />
                                            )}
                                            <span>{link.name}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 py-1">
                            <Image
                                src={project.thumbnail}
                                alt={project.title}
                                width={480}
                                height={270}
                                className="w-full rounded-lg border border-border"
                            />
                            <p className="text-sm text-foreground/70">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.skils.map((skill, i) => (
                                    <Button
                                        size={"sm"}
                                        variant={"outline"}
                                        key={i}
                                    >
                                        {skill.icon}
                                        <span>{skill.name}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {i !== projects.length - 1 && (
                            <div className="my-4 border-b border-muted-foreground/20" />
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default Projects;
