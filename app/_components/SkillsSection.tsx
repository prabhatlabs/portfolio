import SkillItem from "@/components/SkillItem";
import { skillsArray } from "@/data/pages";

export default function SkillsSection() {
    return (
        <section className="px-6 md:px-8 xl:px-20 py-10 md:py-14 lg:py-20 relative border-b flex justify-center flex-col gap-8">
            <h3 className="border border-dashed w-fit px-1">Skills</h3>
            <div className="flex flex-wrap gap-2">
                {skillsArray.map((skill) => (
                    <SkillItem key={skill.name} skill={skill} />
                ))}
            </div>
        </section>
    );
}
