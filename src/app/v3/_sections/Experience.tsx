import { skills, workexpData } from "@/data/data";
import Image from "next/image";

function Experience() {
    return (
        <div
            id="workexp"
            className="grid md:grid-cols-[2fr_1fr] gap-8 w-full pt-16 pb-2"
        >
            <div className="">
                <h5 className="text-sm font-light">{workexpData.title}</h5>
                <div className="mt-2 flex flex-col gap-2">
                    {workexpData.workexp.map((exp, i) => (
                        <div
                            key={i}
                            className="flex gap-2 items-start border border-border rounded-md px-4 py-2"
                        >
                            <div className="rounded-full bg-white p-1">
                                <Image
                                    width={30}
                                    height={30}
                                    src={exp.logo}
                                    alt={exp.company}
                                    className="rounded-full"
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <h5 className="text-lg font-semibold">
                                    {exp.company}
                                </h5>
                                <div className="flex justify-between items-center">
                                    <h6>{exp.title}</h6>
                                    <p className="text-xs">
                                        {exp.start} - {exp.end}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h5 className="text-sm font-light">Skills</h5>
                <div className="text-lg sm:text-xl md:text-2xl mt-2 flex flex-wrap gap-2">
                    {skills.map((skill, i) => (
                        <span
                            key={i}
                            className="flex gap-2 items-center text-sm border border-border rounded-md px-2 py-1 hover:scale-105 transition-transform duration-200 ease-in-out hover:border-red-500 hover:text-red-500"
                        >
                            {skill.icon}
                            <span>{skill.name}</span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Experience;
