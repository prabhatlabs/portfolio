import { Button } from "@/components/ui/button";
import { projectsData } from "@/data/data";
import { IBM_Plex_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const ibmPlexMono = IBM_Plex_Mono({
    weight: "300",
    subsets: ["latin"],
});

const ProjectItemsRenderer = ({}) => {
    return (
        <div className="grid grid-cols-1 gap-8 h-fit grid-auto-block">
            {projectsData.projects.map((project, index) => (
                <div key={index} className="grid grid-cols-1">
                    <div className="grid grid-cols-1 sm:grid-cols-[300px_1px_auto] items-start gap-2">
                        <div className="py-2">
                            <Image
                                src={project.thumbnail}
                                alt={project.title}
                                width={500}
                                height={500}
                                className="object-contain w-full"
                            />
                            {/* <Video src={project.video} className="w-full" /> */}
                        </div>
                        <div className="bg-border h-full w-full" />
                        <div className="grid grid-cols-1 py-2">
                            <div className="flex items-center gap-2">
                                <Image
                                    src={project.logo}
                                    width={25}
                                    height={25}
                                    className="object-contain p-0.5 border border-border bg-white"
                                    alt={project.title}
                                />
                                <h3 className="text-xl md:text-2xl">
                                    {project.title}
                                </h3>
                            </div>
                            <p className="text-xs md:text-sm text-foreground/70">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {project.skils.map((skill, index) => (
                                    <span
                                        key={index}
                                        title={skill.name}
                                        className="flex gap-2 items-center"
                                    >
                                        {skill.icon}
                                        {/* <span className="text-sm">
                                            {skill.name}
                                        </span> */}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-4 sm:mt-6 flex gap-2 items-center">
                                {project.links.map((link, i) => (
                                    <Link key={i} href={link.url}>
                                        <Button
                                            className="rounded-none"
                                            size={"sm"}
                                        >
                                            {link.icon}
                                            <span>{link.name}</span>
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const Projects = () => {
    return (
        // Do not need grid-auto-block, As there will be a grid inside grid with multiple columns
        // in the project item renderer So to avoid conflict, will use grid-auto-block only inside
        // the renderer, and for the title we can manually put px-2.
        <div className="grid grid-cols-1 h-fit gap-8">
            <div
                className={`${ibmPlexMono.className} text-xs md:text-sm text-pink-500 h-20 flex flex-col justify-end`}
            >
                <h6 className="border-y border-border w-full px-2">
                    {projectsData.title}
                </h6>
            </div>
            <div className={`flex flex-col`}>
                <ProjectItemsRenderer />
            </div>
        </div>
    );
};

export default Projects;
