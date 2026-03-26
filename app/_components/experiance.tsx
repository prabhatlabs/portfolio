import { experiences } from "@/data/pages";
import Image from "next/image";

export function Experiance() {
    return (
        <div className="p-6 border-b border-dashed space-y-4">
            <h2 className="text-2xl font-bold">Experience</h2>
            {experiences.map((experience) => (
                <div
                    key={experience.company}
                    className="flex flex-col sm:flex-row sm:gap-2 justify-between sm:items-end"
                >
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Image
                            src={experience.iconUrl}
                            alt={experience.company}
                            width={50}
                            height={50}
                            className="size-10 sm:size-12 rounded"
                        />
                        <div className="">
                            <h3 className="sm:text-lg font-semibold">
                                {experience.company}
                            </h3>
                            <p className="text-sm sm:text-base text-muted-foreground">
                                {experience.position} •{" "}
                                <i>{experience.location}</i>
                            </p>
                        </div>
                    </div>
                    <p className="ml-12 sm:ml-0 text-sm text-muted-foreground">
                        {experience.period}
                    </p>
                </div>
            ))}
        </div>
    );
}
