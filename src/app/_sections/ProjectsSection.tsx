import Video from "@/components/Video";
import { projectsData } from "@/data/data";
import Image from "next/image";
const ProjectsSection = () => {
    const getBorderClass = (
        i: number,
        maxInRow: number = 2,
        maxInCol: number = 2
    ) => {
        const pos = i + 1;
        return (
            (pos % maxInRow === 0 ? "border-b" : "border-b-0 md:border-r ") +
            (pos > maxInRow * maxInCol - maxInRow
                ? "border-b"
                : "border-b-0 md:border-b")
        );
    };
    return (
        <div
            id="projects"
            className="relative w-full h-full flex flex-col gap-8 items-center justify-center overflow-hidden p-4 py-20"
        >
            <h3 className="text-3xl md:text-5xl">{projectsData.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-center w-full max-w-5xl rounded-lg border border-dashed border-destructive">
                {projectsData.projects.map((project, i) => (
                    <div
                        key={i}
                        data-last={i === projectsData.projects.length - 1}
                        className={`flex flex-col w-full gap-2 p-4 border-dashed border-destructive ${getBorderClass(
                            i
                        )}`}
                    >
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
                                            className="text-sm text-muted-foreground hover:text-foreground"
                                        >
                                            {link.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <Video
                            src={project.video}
                            placeholder={project.thumbnail}
                        />
                        <div className="flex flex-wrap gap-2">
                            {project.skils.map((skill, i) => (
                                <span
                                    key={i}
                                    className="text-sm flex gap-2 items-center justify-center border border-border px-2 py-1"
                                >
                                    {skill.icon}
                                    <span>{skill.name}</span>
                                </span>
                            ))}
                        </div>
                        <p className="text-sm">{project.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsSection;
