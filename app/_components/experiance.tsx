import { LineShadowText } from "@/components/ui/line-shadow-text";
import { experiences } from "@/data/pages";
import Image from "next/image";

export function Experiance() {
    return (
        <div className="space-y-4">
            <h2 className="p-6 mt-6 sm:mt-8 md:mt-10 border-y text-3xl md:text-5xl font-bold">
                <LineShadowText
                    className="italic"
                    shadowColor={"var(--foreground)"}
                >
                    Experience
                </LineShadowText>
            </h2>

            <div className="px-6 space-y-4 border-b pb-4">
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
        </div>
    );
}
