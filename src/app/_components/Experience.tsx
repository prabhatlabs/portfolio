import { experiences } from "@/data/pages";
import Link from "next/link";

export default function Experience() {
    return (
        <section className="px-6 md:px-8 xl:px-20 py-10 md:py-14 lg:py-20 border-b flex justify-center flex-col gap-8">
            <h3>Experience</h3>
            <div className="flex flex-col">
                {experiences.slice(0, 3).map((item, index) => (
                    <div
                        key={item.company}
                        className="flex flex-col md:flex-row justify-between md:items-center py-2"
                    >
                        <div>
                            <h4 className="text-lg font-semibold">
                                {item.position}
                            </h4>
                            <p className="text-muted-foreground">
                                {item.company}
                            </p>
                        </div>
                        <div className="text-muted-foreground flex flex-col md:items-end">
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
