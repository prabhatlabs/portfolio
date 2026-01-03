import { experiences } from "@/data/pages";
import Image from "next/image";
import Link from "next/link";

export default function Experience() {
    return (
        <section className="px-6 md:px-8 xl:px-20 py-10 md:py-14 lg:py-20 border-b flex justify-center flex-col gap-8">
            <h3 className="border border-dashed w-fit">Experience</h3>
            <div className="flex flex-col">
                {experiences.slice(0, 3).map((item) => (
                    <div
                        key={item.company}
                        className="flex flex-col md:flex-row justify-between md:items-center py-2"
                    >
                        <div className="flex gap-3">
                            <Image
                                src={item.iconUrl}
                                width={50}
                                height={50}
                                alt={item.company}
                                className="object-cover shrink-0 size-[50px]"
                            />
                            <div>
                                <h4 className="text-lg font-semibold">
                                    {item.position}
                                </h4>
                                <p className="text-muted-foreground">
                                    {item.company}
                                </p>
                            </div>
                        </div>
                        <div className="text-muted-foreground flex flex-col md:items-end pl-[calc(50px+12px)]">
                            <p className="">{item.period}</p>
                            <p className="">{item.location}</p>
                        </div>
                    </div>
                ))}
            </div>
            {experiences.length > 3 && (
                <div className="flex justify-end absolute right-0 bottom-0 mx-6 md:mx-8 xl:mx-20 my-6">
                    <Link
                        href="/experience"
                        className="text-muted-foreground underline"
                    >
                        see all
                    </Link>
                </div>
            )}
        </section>
    );
}
