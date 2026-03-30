import { LineShadowText } from "@/components/ui/line-shadow-text";
import { skillsArray } from "@/data/pages";
import { getIcon } from "@/lib/icon";

function Skill({ skill }: { skill: { name: string; iconName: string } }) {
    const IconComp = getIcon(skill.iconName);
    return (
        <div
            key={skill.name}
            className="flex items-center gap-1.5 p-1.5 text-muted bg-foreground/90"
        >
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
            <h2 className="p-6 mt-16 sm:mt-20 md:mt-24 border-y text-3xl md:text-5xl font-bold">
                <LineShadowText
                    className="italic"
                    shadowColor={"var(--foreground)"}
                >
                    Skills
                </LineShadowText>
            </h2>
            <div className="space-y-4 px-6 mb-10 sm:mb-12 md:mb-14">
                {Object.entries(grps).map(([type, skills]) => (
                    <div key={type} className="md:space-y-1">
                        <h3 className="capitalize md:text-lg">{type}</h3>
                        <div key={type} className="flex flex-wrap gap-px p-px">
                            {skills.map((skill) => (
                                <Skill key={skill.name} skill={skill} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
