"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const orbs = [
    {
        width: "60vw",
        height: "60vw",
        left: "-20%",
        top: "-30%",
        color: "radial-gradient(circle, hsl(217 91% 70% / 0.5) 0%, transparent 70%)",
        duration: 18,
        stiffness: 30,
        damping: 20,
    },
    {
        width: "50vw",
        height: "50vw",
        left: "60%",
        top: "10%",
        color: "radial-gradient(circle, hsl(213 97% 87% / 0.4) 0%, transparent 70%)",
        duration: 22,
        stiffness: 38,
        damping: 23,
    },
    {
        width: "40vw",
        height: "40vw",
        left: "20%",
        top: "50%",
        color: "radial-gradient(circle, hsl(217 91% 60% / 0.35) 0%, transparent 70%)",
        duration: 26,
        stiffness: 46,
        damping: 26,
    },
    {
        width: "45vw",
        height: "45vw",
        left: "-10%",
        top: "40%",
        color: "radial-gradient(circle, hsl(213 97% 77% / 0.3) 0%, transparent 70%)",
        duration: 20,
        stiffness: 54,
        damping: 29,
    },
];

const KEYFRAMES = `
    @keyframes orbDrift0 {
        0%, 100% { margin-left: 0px;    margin-top: 0px;    scale: 1; }
        25%       { margin-left: 160px;  margin-top: -120px; scale: 1.12; }
        50%       { margin-left: -120px; margin-top: 180px;  scale: 0.90; }
        75%       { margin-left: 80px;   margin-top: -80px;  scale: 1.08; }
    }
    @keyframes orbDrift1 {
        0%, 100% { margin-left: 0px;    margin-top: 0px;    scale: 1; }
        25%       { margin-left: -180px; margin-top: 100px;  scale: 1.14; }
        50%       { margin-left: 140px;  margin-top: -160px; scale: 0.88; }
        75%       { margin-left: -80px;  margin-top: 120px;  scale: 1.10; }
    }
    @keyframes orbDrift2 {
        0%, 100% { margin-left: 0px;    margin-top: 0px;    scale: 1; }
        25%       { margin-left: 140px;  margin-top: 160px;  scale: 0.92; }
        50%       { margin-left: -160px; margin-top: -100px; scale: 1.14; }
        75%       { margin-left: 100px;  margin-top: 80px;   scale: 0.94; }
    }
    @keyframes orbDrift3 {
        0%, 100% { margin-left: 0px;    margin-top: 0px;    scale: 1; }
        25%       { margin-left: -120px; margin-top: -160px; scale: 1.10; }
        50%       { margin-left: 180px;  margin-top: 120px;  scale: 0.90; }
        75%       { margin-left: -100px; margin-top: -60px;  scale: 1.08; }
    }
`;

function Orb({
    orb,
    index,
    mouseX,
    mouseY,
}: {
    orb: (typeof orbs)[0];
    index: number;
    mouseX: ReturnType<typeof useMotionValue<number>>;
    mouseY: ReturnType<typeof useMotionValue<number>>;
}) {
    const x = useSpring(mouseX, {
        stiffness: orb.stiffness,
        damping: orb.damping,
    });
    const y = useSpring(mouseY, {
        stiffness: orb.stiffness,
        damping: orb.damping,
    });

    return (
        <motion.div
            className="absolute rounded-full"
            style={{
                width: orb.width,
                height: orb.height,
                background: orb.color,
                filter: "blur(72px)",
                left: orb.left,
                top: orb.top,
                animation: `orbDrift${index} ${orb.duration}s ease-in-out infinite`,
                x,
                y,
            }}
        />
    );
}

function MouseOrb({
    mouseX,
    mouseY,
}: {
    mouseX: ReturnType<typeof useMotionValue<number>>;
    mouseY: ReturnType<typeof useMotionValue<number>>;
}) {
    const x = useSpring(mouseX, { stiffness: 60, damping: 30 });
    const y = useSpring(mouseY, { stiffness: 60, damping: 30 });

    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
                width: "40vw",
                height: "40vw",
                background:
                    "radial-gradient(circle, hsl(213 97% 87% / 0.4) 0%, transparent 70%)",
                filter: "blur(60px)",
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

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            mouseX.set((e.clientX / window.innerWidth - 0.5) * 220);
            mouseY.set((e.clientY / window.innerHeight - 0.5) * 220);
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed -z-10 w-screen h-dvh top-0 left-0 bg-background overflow-hidden">
            <style>{KEYFRAMES}</style>

            {orbs.map((orb, i) => (
                <Orb
                    key={i}
                    index={i}
                    orb={orb}
                    mouseX={mouseX}
                    mouseY={mouseY}
                />
            ))}

            <MouseOrb mouseX={mouseX} mouseY={mouseY} />

            {Array(20)
                .fill(0)
                .map((_, i) => (
                    <div
                        key={i}
                        className="absolute z-0 backdrop-blur-[124px] h-full top-0 w-[5%] bg-linear-to-r from-0% from-background/30 to-70% to-transparent"
                        style={{ left: `${i * 5}%` }}
                    />
                ))}

            <div className="absolute bottom-0 left-0 w-full h-[30%] bg-linear-to-t from-background to-transparent" />
        </div>
    );
}
