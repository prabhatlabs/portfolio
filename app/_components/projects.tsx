import { LineShadowText } from "@/components/ui/line-shadow-text";
import { projects } from "@/data/pages";
import { getIcon } from "@/lib/icon";
import Image from "next/image";
import Link from "next/link";

export function Projects() {
    const showFiller = projects.length % 2 !== 0;
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
            <div className="relative grid sm:grid-cols-2 px-4 py-6 pb-0 gap-4">
                <div className="absolute mask-b-from-85% mask-t-from-85% mask-l-from-85% mask-r-from-85% w-full h-full animate-line-shadow bg-[repeating-linear-gradient(315deg,color-mix(in_oklab,var(--border)60%,transparent)_0,color-mix(in_oklab,var(--border)60%,transparent)_2px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed"></div>
                {projects.map((project) => {
                    return (
                        <div
                            key={project.title}
                            className="z-10 bg-background p-2 md:p-3 border flex flex-col gap-2 justify-between"
                        >
                            <div className="space-y-2">
                                <Image
                                    src={project.imageUrl}
                                    alt={project.title}
                                    width={300}
                                    height={160}
                                    className="w-full h-fit aspect-video rounded border"
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

                            <div className="flex gap-px items-center">
                                {project.links.map((link) => {
                                    const IconComp = getIcon(link.iconName);
                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.url}
                                            target={link.target}
                                            className="text-sm bg-foreground/90 text-background px-1.5 py-0.5 border flex items-center gap-2 justify-center"
                                        >
                                            <IconComp className="size-4" />
                                            {link.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
