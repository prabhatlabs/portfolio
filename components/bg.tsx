"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const themes = [
    {
        // Deep ocean blue
        bg: "linear-gradient(135deg, hsl(210 85% 18%) 0%, hsl(190 90% 26%) 100%)",
        orbs: [
            "radial-gradient(circle, hsl(210 100% 75% / 0.5), transparent 70%)",
            "radial-gradient(circle, hsl(195 90% 80% / 0.4), transparent 70%)",
            "radial-gradient(circle, hsl(220 85% 65% / 0.35), transparent 70%)",
            "radial-gradient(circle, hsl(200 95% 72% / 0.3), transparent 70%)",
        ],
    },
    {
        // Ember / volcanic red-orange
        bg: "linear-gradient(140deg, hsl(6 85% 20%) 0%, hsl(28 95% 28%) 100%)",
        orbs: [
            "radial-gradient(circle, hsl(20 100% 70% / 0.5), transparent 70%)",
            "radial-gradient(circle, hsl(38 95% 72% / 0.4), transparent 70%)",
            "radial-gradient(circle, hsl(8 90% 65% / 0.35), transparent 70%)",
            "radial-gradient(circle, hsl(30 100% 68% / 0.3), transparent 70%)",
        ],
    },
    {
        // Dusk purple-pink
        bg: "linear-gradient(145deg, hsl(330 78% 24%) 0%, hsl(270 78% 28%) 100%)",
        orbs: [
            "radial-gradient(circle, hsl(300 80% 75% / 0.5), transparent 70%)",
            "radial-gradient(circle, hsl(270 85% 78% / 0.4), transparent 70%)",
            "radial-gradient(circle, hsl(330 75% 70% / 0.35), transparent 70%)",
            "radial-gradient(circle, hsl(285 80% 72% / 0.3), transparent 70%)",
        ],
    },
    {
        // Golden amber
        bg: "linear-gradient(130deg, hsl(24 92% 24%) 0%, hsl(48 96% 32%) 100%)",
        orbs: [
            "radial-gradient(circle, hsl(45 100% 72% / 0.5), transparent 70%)",
            "radial-gradient(circle, hsl(35 95% 68% / 0.4), transparent 70%)",
            "radial-gradient(circle, hsl(55 90% 70% / 0.35), transparent 70%)",
            "radial-gradient(circle, hsl(40 100% 65% / 0.3), transparent 70%)",
        ],
    },
    {
        // Silver mist / cool grey
        bg: "linear-gradient(125deg, hsl(210 12% 78%) 0%, hsl(220 10% 40%) 100%)",
        orbs: [
            "radial-gradient(circle, hsl(215 30% 88% / 0.5), transparent 70%)",
            "radial-gradient(circle, hsl(200 20% 80% / 0.4), transparent 70%)",
            "radial-gradient(circle, hsl(220 25% 82% / 0.35), transparent 70%)",
            "radial-gradient(circle, hsl(210 15% 75% / 0.3), transparent 70%)",
        ],
    },
    {
        // Deep forest / teal-green
        bg: "linear-gradient(150deg, hsl(145 62% 20%) 0%, hsl(175 70% 26%) 100%)",
        orbs: [
            "radial-gradient(circle, hsl(155 70% 68% / 0.5), transparent 70%)",
            "radial-gradient(circle, hsl(175 75% 65% / 0.4), transparent 70%)",
            "radial-gradient(circle, hsl(140 65% 62% / 0.35), transparent 70%)",
            "radial-gradient(circle, hsl(165 72% 66% / 0.3), transparent 70%)",
        ],
    },
];

const orbPositions = [
    { size: "60vw", left: "-20%", top: "-30%", duration: 18 },
    { size: "50vw", left: "60%", top: "10%", duration: 22 },
    { size: "40vw", left: "20%", top: "50%", duration: 26 },
    { size: "45vw", left: "-10%", top: "40%", duration: 20 },
];

function Orb({
    position,
    color,
    mouseX,
    mouseY,
}: {
    position: (typeof orbPositions)[0];
    color: string;
    mouseX: number;
    mouseY: number;
}) {
    const x = useSpring(mouseX, { stiffness: 35, damping: 20 });
    const y = useSpring(mouseY, { stiffness: 35, damping: 20 });

    return (
        <motion.div
            className="absolute rounded-full will-change-transform"
            style={{
                width: position.size,
                height: position.size,
                background: color,
                filter: "blur(48px)",
                left: position.left,
                top: position.top,
                x,
                y,
            }}
            animate={{
                x: [0, 160, -120, 80, 0],
                y: [0, -120, 180, -80, 0],
                scale: [1, 1.12, 0.9, 1.08, 1],
            }}
            transition={{
                duration: position.duration,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
}

function MouseOrb({
    mouseX,
    mouseY,
    color,
}: {
    mouseX: number;
    mouseY: number;
    color: string;
}) {
    const x = useSpring(mouseX, { stiffness: 60, damping: 30 });
    const y = useSpring(mouseY, { stiffness: 60, damping: 30 });

    return (
        <motion.div
            className="absolute rounded-full pointer-events-none will-change-transform"
            style={{
                width: "40vw",
                height: "40vw",
                background: color,
                filter: "blur(50px)",
                left: "30%",
                top: "30%",
                translateX: "-50%",
                translateY: "-50%",
                x,
                y,
            }}
        />
    );
}

export default function Bg() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [theme, setTheme] = useState(themes[0]);

    useEffect(() => {
        const randomTheme = themes[Math.floor(Math.random() * themes.length)];
        setTheme(randomTheme);

        let raf: number;
        const handleMove = (e: MouseEvent) => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                mouseX.set((e.clientX / window.innerWidth - 0.5) * 200);
                mouseY.set((e.clientY / window.innerHeight - 0.5) * 200);
            });
        };

        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
            <div
                className="absolute inset-0 opacity-90"
                style={{ background: theme.bg }}
            />

            {orbPositions.map((position, i) => (
                <Orb
                    key={i}
                    position={position}
                    color={theme.orbs[i]}
                    mouseX={mouseX}
                    mouseY={mouseY}
                />
            ))}

            <MouseOrb mouseX={mouseX} mouseY={mouseY} color={theme.orbs[0]} />

            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.35))]" />
        </div>
    );
}
