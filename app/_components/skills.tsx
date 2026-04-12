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
            <h2 className="p-6 mt-10 sm:mt-14 md:mt-16 border-y text-3xl md:text-5xl font-bold">
                <LineShadowText
                    className="italic"
                    shadowColor={"var(--foreground)"}
                >
                    Skills
                </LineShadowText>
            </h2>
            <div className="space-y-2 pb-4 mb-10 sm:mb-12 md:mb-14 relative border-y">
                <div className="absolute h-full w-px border-l top-0 left-4"></div>
                <div className="absolute h-full w-px border-l top-0 right-4"></div>
                <span className="absolute top-0 left-0 -translate-x-[50%] translate-y-[100px] rotate-270 my-2 mx-2 font-mono text-[10px] text-muted-foreground/75">
                    flex flex-wrap gap-px p-px
                </span>
                {Object.entries(grps).map(([type, skills]) => (
                    <div key={type} className="space-y-1 md:space-y-2">
                        <h3 className="px-6 capitalize font-mono text-[10px] text-muted-foreground/75 w-full border-b">
                            {type}
                        </h3>
                        <div
                            key={type}
                            className="px-6 flex flex-wrap gap-px p-px"
                        >
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
