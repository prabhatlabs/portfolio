import { skillsArray } from "@/data/pages";
import { getIcon } from "@/lib/icon";
import { GeistPixelSquare } from "geist/font/pixel";
import { Fragment } from "react/jsx-runtime";

export function Skills() {
    const grps = {
        languages: skillsArray.filter((skill) => skill.type === "Languages"),
        backend: skillsArray.filter((skill) => skill.type === "Backend"),
        frontend: skillsArray.filter((skill) => skill.type === "Frontend"),
        databases: skillsArray.filter((skill) => skill.type === "Databases"),
        "dev / tools": skillsArray.filter(
            (skill) => skill.type === "Dev / Tools",
        ),
    };
    return (
        <div>
            <h2 className={`p-6 mt-16 sm:mt-20 md:mt-24 border-y text-3xl md:text-5xl ${GeistPixelSquare.className}`}>
                <span>S</span>
                <span className=" text-muted-foreground">kills</span>
            </h2>
            <div className="space-y-2 py-1 px-5.5 relative border-b">
                <span className="absolute -top-5 left-1 my-1 mx-4 font-mono text-[10px] text-muted-foreground">
                    flex flex-wrap gap-1
                </span>
                <div className="absolute h-full w-px border-l top-0 left-4"></div>
                <div className="absolute h-full w-px border-l top-0 right-4"></div>
                <div className="flex flex-wrap gap-1">
                    {Object.entries(grps).map(([type, skills]) => (
                        <Fragment key={type}>
                            {skills.map((skill, index) => {
                                const IconComp = getIcon(skill.iconName);
                                return (
                                    <div
                                        key={index}
                                        className="relative flex items-center gap-1.5 p-1.5 bg-foreground/5 border hover:border-foreground border-dashed transition-all duration-300"
                                    >
                                        <IconComp className="size-4" />
                                        <span className="text-xs">
                                            {skill.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
