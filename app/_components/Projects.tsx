import { projects } from "@/data/pages";
import Image from "next/image";
import Link from "next/link";

export default function Projects() {
    return (
        <section className="px-6 md:px-8 xl:px-20 py-10 md:py-14 lg:py-20 relative border-b flex justify-center flex-col gap-8">
            <h3 className="border border-dashed w-fit">Projects</h3>
            <div className="flex flex-col">
                {projects.slice(0, 3).map((item) => (
                    <div
                        key={item.title}
                        className="flex flex-col md:flex-row justify-between md:items-center gap-2 pb-4 text-sm md:text-base"
                    >
                        <div className="flex gap-3">
                            <Image
                                src={item.iconUrl}
                                width={50}
                                height={50}
                                alt={item.title}
                                className="object-cover shrink-0 size-[35px] md:size-[45px] lg:size-[50px] mt-1"
                            />
                            <div>
                                <h4 className="text-base md:text-lg font-semibold">
                                    {item.title}
                                </h4>
                                <p className="text-muted-foreground">
                                    {item.subtitle}
                                </p>
                            </div>
                        </div>
                        <div className="text-muted-foreground flex gap-2 pl-[calc(35px+12px)] md:pl-[calc(45px+12px)] lg:pl-[calc(50px+12px)] w-fit">
                            {item.links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.url}
                                    target={link.target}
                                    className="bg-foreground hover:bg-foreground/80 text-background px-2 py-1 h-fit"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {projects.length > 3 && (
                <div className="flex justify-end absolute right-0 bottom-0 mx-6 md:mx-8 xl:mx-20 my-5 md:my-7 lg:my-10">
                    <Link
                        href="/projects"
                        className="text-muted-foreground underline"
                    >
                        see all
                    </Link>
                </div>
            )}
        </section>
    );
}
