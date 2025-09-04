import Video from "@/components/Video";
import { projectsData } from "@/data/data";
import Image from "next/image";
import Link from "next/link";

const Projects = () => {
    return (
        <div className="pt-16 pb-2">
            <h5 className="text-sm font-light">{projectsData.title}</h5>
            <div className="mt-2 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectsData.projects.map((project, i) => (
                    <div
                        key={i}
                        className="flex flex-col gap-2 border border-border rounded-md p-2"
                    >
                        <div className="flex items-center gap-2 w-fit">
                            <div className="rounded-full bg-white p-1">
                                <Image
                                    width={30}
                                    height={30}
                                    src={project.logo}
                                    alt={project.title}
                                    className="rounded-full"
                                />
                            </div>
                            <h5 className="text-lg font-semibold w-fit">
                                {project.title}
                            </h5>
                        </div>
                        <div>
                            <Video src={project.video} />
                        </div>
                        <div className="flex gap-2">
                            {project.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    className="flex gap-2 items-center text-sm border border-border rounded-md px-2 py-1 hover:scale-105 transition-transform duration-200 ease-in-out hover:border-red-500 hover:text-red-500"
                                >
                                    {link.icon}
                                    <span>{link.name}</span>
                                </Link>
                            ))}
                        </div>
                        <p className="text-xs">{project.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
