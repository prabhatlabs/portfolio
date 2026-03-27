import { projects } from "@/data/pages";
import { getIcon } from "@/lib/icon";
import Image from "next/image";
import Link from "next/link";

export function Projects() {
    return (
        <div className="p-6 border-b space-y-4">
            <h2 className="text-2xl font-bold">Projects</h2>
            <div className="grid md:grid-cols-2 gap-4">
                {projects.map((project) => (
                    <div
                        key={project.title}
                        className="p-2 border   rounded-xl flex flex-col gap-2 justify-between"
                    >
                        <div className="space-y-2">
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                width={300}
                                height={160}
                                className="w-full h-fit aspect-video rounded-sm"
                            />
                            <div className="flex items-center gap-2">
                                <Image
                                    src={project.iconUrl}
                                    alt={project.title}
                                    width={32}
                                    height={32}
                                    className="size-5"
                                />
                                <h3 className="font-semibold">
                                    {project.title}
                                </h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {project.description}
                            </p>
                        </div>

                        <div className="flex gap-2 items-center">
                            {project.links.map((link) => {
                                const IconComp = getIcon(link.iconName);
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.url}
                                        target={link.target}
                                        className="text-sm bg-foreground text-background px-1.5 py-0.5 border rounded flex items-center gap-2 justify-center"
                                    >
                                        <IconComp className="size-4" />
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
