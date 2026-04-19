import { LineShadowText } from "@/components/ui/line-shadow-text";
import { projects } from "@/data/pages";
import { getIcon } from "@/lib/icon";
import Image from "next/image";
import Link from "next/link";

function ProjectCard({
    project,
    idx,
}: {
    project: (typeof projects)[0];
    idx: number;
}) {
    return (
        <div
            key={project.title}
            className={`${idx === 0 || idx === projects.length - 1 ? "" : "border-l"} z-10 p-2 md:p-3 flex flex-col gap-2 justify-between min-w-[300px]`}
        >
            <div className="space-y-2">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={300}
                    height={160}
                    className="w-full h-fit aspect-video border"
                />
                <div className="flex items-center gap-2">
                    <Image
                        src={project.iconUrl}
                        alt={project.title}
                        width={32}
                        height={32}
                        className="size-5"
                    />
                    <h3 className="font-semibold">{project.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                    {project.description}
                </p>
            </div>

            <div className="space-y-2">
                {project.skills && (
                    <div className="flex gap-2 items-center">
                        {project.skills.map((skill) => {
                            const IconComp = getIcon(skill.iconName);
                            return (
                                <IconComp key={skill.name} title={skill.name} />
                            );
                        })}
                    </div>
                )}

                <div className="flex gap-px items-center">
                    {project.links.map((link) => {
                        const IconComp = getIcon(link.iconName);
                        return (
                            <Link
                                key={link.name}
                                href={link.url}
                                target={link.target}
                                className="text-sm bg-foreground/10 px-1.5 py-0.5 flex items-center gap-2 justify-center"
                            >
                                <IconComp className="size-4" />
                                {link.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export function Projects() {
    return (
        <div>
            <h2 className="p-6 mt-16 sm:mt-20 md:mt-24 border-y text-3xl md:text-5xl font-bold">
                <LineShadowText
                    className="italic"
                    shadowColor={"var(--foreground)"}
                >
                    Projects
                </LineShadowText>
            </h2>
            <div className="relative w-full px-4 py-6 border-b overflow-hidden">
                <div className="flex w-full overflow-auto border">
                    <span className="absolute top-0 left-0 my-1 mx-4 font-mono text-[10px] text-muted-foreground">
                        flex gap-4 w-full overflow-auto
                    </span>
                    {projects.map((project, index) => {
                        return project?.show ? (
                            <ProjectCard
                                project={project}
                                idx={index}
                                key={index}
                            />
                        ) : null;
                    })}
                </div>
            </div>
        </div>
    );
}
