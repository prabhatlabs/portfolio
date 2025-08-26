import { projectsData } from "@/data/data";
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import { IoLogoGithub } from "react-icons/io";
import { SiVlcmediaplayer } from "react-icons/si";
import { Button } from "../../../components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";

const Projects = () => {
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-col">
                <div className="flex gap-6 w-full">
                    <CardTitle className="text-2xl w-full flex justify-start items-center gap-2">
                        <SiVlcmediaplayer />
                        <span>{projectsData.title}</span>
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="mb-2">
                {projectsData.projects.map((project, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <div className="flex gap-2 items-start">
                            <div className="rounded-full bg-white p-1">
                                <Image
                                    src={project.logo}
                                    alt={project.title}
                                    width={30}
                                    height={30}
                                    className="rounded-full w-[30px] h-[30px] object-cover"
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
                            <p className="text-sm text-foreground/80">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.skils.map((skill, i) => (
                                    <Button
                                        size={"sm"}
                                        variant={"glitch"}
                                        key={i}
                                    >
                                        {skill.icon}
                                        <span>{skill.name}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {i !== projectsData.projects.length - 1 && (
                            <div className="my-4 border-b border-muted-foreground/20" />
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default Projects;
