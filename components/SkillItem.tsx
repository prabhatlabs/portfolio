"use client";

import { myInfo } from "@/data/pages";
import { getIcon } from "@/lib/icons";

export default function SkillItem({ skill }: { skill: (typeof myInfo.skills)[0] }) {
    const IconComponent = getIcon(skill.iconName);
    return (
        <span
            key={skill.name}
            className="flex items-center gap-2 px-2 py-1 bg-secondary/50 border border-dashed whitespace-nowrap"
        >
            <IconComponent />
            <span className="text-xs">{skill.name}</span>
        </span>
    );
}
