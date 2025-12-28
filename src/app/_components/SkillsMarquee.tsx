"use client";

import { myInfo } from "@/data/pages";
import { motion } from "framer-motion";

export function SkillItem({ skill }: { skill: (typeof myInfo.skills)[0] }) {
    return (
        <span
            key={skill.name}
            className="flex items-center gap-2 px-2 py-1 bg-secondary border whitespace-nowrap"
        >
            <skill.icon />
            <span className="text-xs">{skill.name}</span>
        </span>
    );
}

export function SkillsMarquee({ speed = 20 }: { speed?: number }) {
    return (
        <div className="relative overflow-hidden w-full">
            {/* Fade masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-background to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-background to-transparent z-10" />

            <motion.div
                className="flex w-max gap-4"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                    duration: speed,
                }}
            >
                {/* First copy */}
                {myInfo.skills.map((skill) => (
                    <SkillItem skill={skill} />
                ))}

                {/* Second copy (for seamless loop) */}
                {myInfo.skills.map((skill) => (
                    <SkillItem skill={skill} />
                ))}
            </motion.div>
        </div>
    );
}
