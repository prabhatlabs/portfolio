import { workexpData } from "@/data/data";
import Image from "next/image";

function Experience() {
    return (
        <div id="workexp" className="pt-16 pb-2">
            <div className="">
                <h5 className="text-sm font-light">{workexpData.title}</h5>
                <div className="mt-2 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {workexpData.workexp.map((exp, i) => (
                        <div
                            key={i}
                            className="flex gap-2 items-start border border-border p-2 rounded-md"
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
                                <h6>{exp.title}</h6>
                                <p className="text-xs">
                                    {exp.start} - {exp.end}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* <div>
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
            </div> */}
        </div>
    );
}

export default Experience;
