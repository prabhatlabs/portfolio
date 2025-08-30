"use client";
import { Button } from "@/components/ui/button";
import { myInfoData, skills } from "@/data/data";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import TypingText from "../_components/TypingText";

function generatePositions(
    count: number,
    spreadX: number, // how far they can go left/right
    spreadY: number, // how far they can go up/down
    minDistance: number
) {
    const positions: { x: number; y: number }[] = [];

    for (let i = 0; i < count; i++) {
        let pos: { x: number; y: number };
        let tries = 0;

        do {
            // random position in a rectangle around hero
            pos = {
                x: (Math.random() - 0.5) * 2 * spreadX,
                y: (Math.random() - 0.5) * 2 * spreadY,
            };

            const tooClose = positions.some(
                (p) => Math.hypot(p.x - pos.x, p.y - pos.y) < minDistance
            );

            if (!tooClose) break;
            tries++;
        } while (tries < 100);

        positions.push(pos);
    }

    return positions;
}

const HeroSection = () => {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [currentPositions, setCurrentPositions] = useState(() =>
        generatePositions(skills.length, 450, 280, 100)
    );

    const handleSkillClick = () => {
        const newPositions = generatePositions(skills.length, 450, 280, 100);
        setCurrentPositions(newPositions);
    };

    useEffect(() => {
        if (!window) return;
        const handler = (e: MouseEvent) => {
            setMouse({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            });
        };
        window.addEventListener("mousemove", handler);
        return () => window.removeEventListener("mousemove", handler);
    }, []);

    return (
        <motion.div
            id="home"
            initial={{ opacity: 0, backdropFilter: "blur(10px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(0px)" }}
            transition={{ duration: 1 }}
            className="relative w-full h-dvh flex flex-col items-center justify-center overflow-hidden p-4"
        >
            <div className="z-20 font-bold text-center px-3 py-2 flex flex-col gap-2 justify-center items-center rounded-lg bg-background/70 backdrop-blur-[1.5px] border border-dashed border-destructive pointer-events-none">
                <h1 className="text-5xl md:text-7xl">{myInfoData.title}</h1>
                <TypingText
                    text={myInfoData.description}
                    startTyping
                    durationPerChar={20}
                />
            </div>
            <div className="absolute inset-0 z-10 flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {skills.map((skill, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        initial={{
                            x: currentPositions[i].x,
                            y:
                                currentPositions[i].y > 0
                                    ? currentPositions[i].y + 100
                                    : currentPositions[i].y - 100,
                        }}
                        animate={{
                            x: currentPositions[i].x + mouse.x * 60,
                            y:
                                currentPositions[i].y > 0
                                    ? currentPositions[i].y + mouse.y * 60 + 100
                                    : currentPositions[i].y +
                                      mouse.y * 60 -
                                      100,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 30,
                            damping: 15,
                        }}
                    >
                        <Button
                            variant="blueText"
                            size="lg"
                            className="cursor-pointer"
                            onClick={handleSkillClick}
                        >
                            {skill.icon}
                            <span className="ml-2">{skill.name}</span>
                        </Button>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default HeroSection;
