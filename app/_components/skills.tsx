import { LineShadowText } from "@/components/ui/line-shadow-text";
import { skillsArray } from "@/data/pages";
import { getIcon } from "@/lib/icon";

function Skill({ skill }: { skill: { name: string; iconName: string } }) {
    const IconComp = getIcon(skill.iconName);
    return (
        <div
            key={skill.name}
            className="flex items-center gap-1.5 border   rounded p-1.5"
        >
            <IconComp className="size-4" />
            <span className="text-xs text-muted-foreground">{skill.name}</span>
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
        <div className="p-4 sm:p-6 border-b space-y-4">
            <h2 className="text-2xl font-bold">
                <LineShadowText
                    className="italic"
                    shadowColor={"var(--foreground)"}
                >
                    Skills
                </LineShadowText>
            </h2>
            <div className="space-y-4">
                {Object.entries(grps).map(([type, skills]) => (
                    <div key={type} className="space-y-1">
                        <h3 className="capitalize">{type}</h3>
                        <div key={type} className="flex flex-wrap gap-2">
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
