import { experiences } from "@/data/pages";
import Image from "next/image";
import { PiBuildingsLight } from "react-icons/pi";

export function Experiance() {
    return (
        <div className="">
            <h2 className="p-6 mt-6 sm:mt-8 md:mt-10 border-t text-3xl md:text-5xl font-bold">
                <span>
                    Ex
                </span>
                <span
                    className=" text-muted-foreground"
                >
                    perience
                </span>
            </h2>

            <div className="relative">
                <span className="absolute -top-5 left-1 my-1 mx-4 font-mono text-[10px] text-muted-foreground">
                    flex sm:gap-2 justify-between px-4
                </span>
                {experiences.map((experience, index) => (
                    <div
                        key={index}
                        className={`flex sm:gap-2 justify-between px-4 ${index !== 0 ? "border-b" : "border-y"}`}
                    >
                        <div
                            className={`flex gap-2 sm:gap-4 w-full sm:w-fit p-2 sm:p-4 border-l border-r sm:border-r-0`}
                        >
                            {experience.iconUrl ? (
                                <Image
                                    src={experience.iconUrl}
                                    alt={experience.company}
                                    width={50}
                                    height={50}
                                    className="size-10 sm:size-12 border"
                                />
                            ) : (
                                <div className="size-10 sm:size-12 border flex items-center justify-center">
                                    <PiBuildingsLight className="size-5 sm:size-7 text-foreground/60" />
                                </div>
                            )}
                            <div className="">
                                <h3 className="sm:text-lg font-semibold">
                                    {experience.company}
                                </h3>
                                <p className="text-sm sm:text-base text-muted-foreground">
                                    {experience.position} •{" "}
                                    <i>{experience.location}</i>
                                </p>
                                <p className="block sm:hidden text-sm text-muted-foreground">
                                    {experience.period}
                                </p>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-end justify-center border-x w-42 px-2 py-4">
                            <p className="text-sm text-muted-foreground">
                                {experience.period}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
