"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const orbs = [
    {
        size: "60vw",
        left: "-20%",
        top: "-30%",
        color: "radial-gradient(circle, hsl(217 91% 70% / 0.5), transparent 70%)",
        duration: 18,
    },
    {
        size: "50vw",
        left: "60%",
        top: "10%",
        color: "radial-gradient(circle, hsl(213 97% 87% / 0.4), transparent 70%)",
        duration: 22,
    },
    {
        size: "40vw",
        left: "20%",
        top: "50%",
        color: "radial-gradient(circle, hsl(217 91% 60% / 0.35), transparent 70%)",
        duration: 26,
    },
    {
        size: "45vw",
        left: "-10%",
        top: "40%",
        color: "radial-gradient(circle, hsl(213 97% 77% / 0.3), transparent 70%)",
        duration: 20,
    },
];

const bgGradients = [
    "linear-gradient(135deg, hsl(210 85% 18%) 0%, hsl(190 90% 26%) 100%)",
    "linear-gradient(140deg, hsl(6 85% 20%) 0%, hsl(28 95% 28%) 100%)",
    "linear-gradient(145deg, hsl(330 78% 24%) 0%, hsl(270 78% 28%) 100%)",
    "linear-gradient(130deg, hsl(24 92% 24%) 0%, hsl(48 96% 32%) 100%)",
    "linear-gradient(125deg, hsl(210 12% 78%) 0%, hsl(220 10% 40%) 100%)",
    "linear-gradient(150deg, hsl(145 62% 20%) 0%, hsl(175 70% 26%) 100%)",
];

function Orb({ orb, mouseX, mouseY, i }: any) {
    // keep spring but reuse config
    const x = useSpring(mouseX, { stiffness: 35, damping: 20 });
    const y = useSpring(mouseY, { stiffness: 35, damping: 20 });

    return (
        <motion.div
            className="absolute rounded-full will-change-transform"
            style={{
                width: orb.size,
                height: orb.size,
                background: orb.color,
                filter: "blur(48px)", // reduced but still soft
                left: orb.left,
                top: orb.top,
                x,
                y,
            }}
            animate={{
                x: [0, 160, -120, 80, 0],
                y: [0, -120, 180, -80, 0],
                scale: [1, 1.12, 0.9, 1.08, 1],
            }}
            transition={{
                duration: orb.duration,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
}

function MouseOrb({ mouseX, mouseY }: any) {
    const x = useSpring(mouseX, { stiffness: 60, damping: 30 });
    const y = useSpring(mouseY, { stiffness: 60, damping: 30 });

    return (
        <motion.div
            className="absolute rounded-full pointer-events-none will-change-transform"
            style={{
                width: "40vw",
                height: "40vw",
                background:
                    "radial-gradient(circle, hsl(213 97% 87% / 0.4), transparent 70%)",
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
    const [activeGradient, setActiveGradient] = useState(bgGradients[0]);

    useEffect(() => {
        let raf: number;
        const randomGradient =
            bgGradients[Math.floor(Math.random() * bgGradients.length)];
        setActiveGradient(randomGradient);

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
                style={{ background: activeGradient }}
            />

            {orbs.map((orb, i) => (
                <Orb key={i} orb={orb} i={i} mouseX={mouseX} mouseY={mouseY} />
            ))}

            <MouseOrb mouseX={mouseX} mouseY={mouseY} />

            {/* replace 20 blur strips with 1 cheap gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.35))]" />
        </div>
    );
}
