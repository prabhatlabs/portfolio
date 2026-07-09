"use client";

import { skillsArray } from "@/data/root";
import { getIcon } from "@/lib/icon";
import { motion } from "framer-motion";
import { GeistPixelSquare } from "geist/font/pixel";

export function TwinklingSkill({
    skill,
    index,
}: {
    skill: { name: string; iconName: string };
    index: number;
}) {
    const IconComp = getIcon(skill.iconName);
    const duration = 1.5 + (index % 5) * 0.6;
    const delay = (index % 7) * 0.3;

    return (
        <motion.div
            key={skill.name}
            className="relative flex flex-1 w-fit h-fit justify-center items-center gap-1.5 p-1.5 bg-foreground/5 border border-dashed transition-colors duration-300"
            animate={{
                borderColor: [
                    "color-mix(in oklab, var(--foreground) 30%, transparent)",
                    "color-mix(in oklab, var(--foreground) 100%, transparent)",
                    "color-mix(in oklab, var(--foreground) 30%, transparent)",
                ],
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            <IconComp className="size-4" />
            <span className="text-xs">{skill.name}</span>
        </motion.div>
    );
}

export function Skills() {
    return (
        <div>
            <h2
                className={`p-4 sm:p-6 mt-16 sm:mt-20 md:mt-24 border-y text-3xl md:text-5xl ${GeistPixelSquare.className}`}
            >
                <span>S</span>
                <span className="text-muted-foreground">kills</span>
            </h2>
            <div className="space-y-2 py-1 px-5.5 mt-4 relative border-y">
                <span className="absolute -top-5 left-0 my-1 mx-4 font-mono text-[10px] text-muted-foreground/50">
                    flex flex-wrap gap-1
                </span>
                <div className="absolute h-full w-px border-l top-0 left-4"></div>
                <div className="absolute h-full w-px border-l top-0 right-4"></div>
                <div className="flex flex-1 flex-wrap gap-1">
                    {Object.entries(skillsArray).map(([_, skill], index) => (
                        <TwinklingSkill
                            key={skill.name}
                            skill={skill}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
