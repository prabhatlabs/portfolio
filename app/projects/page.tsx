import { projects } from "@/data/pages";
import { getIcon } from "@/lib/icons";
import Image from "next/image";
import Link from "next/link";
import { SkillItem } from "../_components/SkillsMarquee";
import Layout from "@/components/Layout";

export default function Projects() {
    return (
        <Layout>
            <section className="px-6 md:px-8 xl:px-20 py-10 md:py-14 lg:py-20">
                <h1 className="text-4xl md:text-5xl font-bold mb-8">
                    Projects
                </h1>
                <div className="grid md:grid-cols-2 md:border">
                    {projects.map((project) => (
                        <div
                            key={project.title}
                            className="md:border-x md:border-b border-t md:px-6 py-6 hover:shadow-lg transition-shadow space-y-4"
                        >
                            <div className="flex gap-4">
                                <Image
                                    src={project.iconUrl}
                                    width={60}
                                    height={60}
                                    alt={project.title}
                                    className="object-cover shrink-0 size-[35px] md:size-[45px] lg:size-[50px] mt-1"
                                />
                                <div className="flex-1">
                                    <h2 className="text-xl md:text-2xl font-semibold">
                                        {project.title}
                                    </h2>
                                    <p className="text-muted-foreground">
                                        {project.subtitle}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                {project.links.map((link) => {
                                    const IconComponent = getIcon(
                                        link.iconName,
                                    );
                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.url}
                                            target={link.target}
                                            className="bg-foreground hover:bg-foreground/80 text-background px-2 py-1 h-fit text-sm flex gap-2 items-center"
                                        >
                                            <IconComponent className="size-4" />
                                            {link.name}
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="">
                                <Image
                                    src={project.imageUrl}
                                    width={400}
                                    height={200}
                                    alt={`${project.title} screenshot`}
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </div>

                            <div className="space-y-2">
                                {project.content.map((paragraph, index) => (
                                    <p
                                        key={index}
                                        className="text-sm leading-relaxed font-light"
                                    >
                                        {paragraph.split("||").map((part, i) =>
                                            i % 2 === 1 ? (
                                                <span
                                                    key={i}
                                                    className="font-bold italic"
                                                >
                                                    {part}
                                                </span>
                                            ) : (
                                                <span key={i}>
                                                    {part
                                                        .split("**")
                                                        .map((boldPart, j) =>
                                                            j % 2 === 1 ? (
                                                                <span
                                                                    key={j}
                                                                    className="font-bold"
                                                                >
                                                                    {boldPart}
                                                                </span>
                                                            ) : (
                                                                <span key={j}>
                                                                    {boldPart}
                                                                </span>
                                                            ),
                                                        )}
                                                </span>
                                            ),
                                        )}
                                    </p>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {project.pills.map((skill, index) => (
                                    <SkillItem key={index} skill={skill} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Layout>
    );
}
