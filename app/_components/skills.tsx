import { LineShadowText } from "@/components/ui/line-shadow-text";
import { skillsArray } from "@/data/pages";
import { getIcon } from "@/lib/icon";
import { Fragment } from "react/jsx-runtime";

function Skill({
    skill,
    type,
}: {
    skill: { name: string; iconName: string };
    type?: string;
}) {
    const IconComp = getIcon(skill.iconName);
    return (
        <div
            key={skill.name}
            className="relative flex items-center gap-1.5 p-1.5 bg-foreground/10"
        >
            {type && (
                <span className="text-foreground/60 text-[8px] capitalize absolute -top-[11px] left-0">
                    {type}
                </span>
            )}
            <IconComp className="size-4" />
            <span className="text-xs">{skill.name}</span>
        </div>
    );
}

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
        <div className="space-y-4">
            <h2 className="p-6 mt-10 sm:mt-14 md:mt-16 border-y text-3xl md:text-5xl font-bold">
                <LineShadowText
                    className="italic"
                    shadowColor={"var(--foreground)"}
                >
                    Skills
                </LineShadowText>
            </h2>
            <div className="space-y-2 py-2.5 px-6.5 relative border-t">
                <div className="absolute h-full w-px border-l top-0 left-4"></div>
                <div className="absolute h-full w-px border-l top-0 right-4"></div>
                <div className="flex flex-wrap gap-2.5">
                    {Object.entries(grps).map(([type, skills]) => (
                        <Fragment key={type}>
                            {skills.map((skill, index) => (
                                <Skill
                                    key={skill.name}
                                    skill={skill}
                                    type={index === 0 ? type : undefined}
                                />
                            ))}
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
