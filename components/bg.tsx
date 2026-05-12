"use client";
import { orbPositions, themes } from "@/lib/themes";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useBgTheme } from "./bg-theme-provider";

function Orb({
    position,
    color,
}: {
    position: (typeof orbPositions)[0];
    color: string;
}) {
    return (
        <motion.div
            className="absolute rounded-full will-change-transform opacity-60"
            style={{
                width: position.size,
                height: position.size,
                background: color,
                left: position.left,
                top: position.top,
                filter: "blur(40px)",
            }}
            animate={{
                scale: [1, 1.15, 0.9, 1.1, 1],
                borderRadius: [
                    "40% 60% 70% 30% / 40% 50% 60% 70%",
                    "60% 40% 30% 70% / 50% 60% 70% 40%",
                    "40% 60% 70% 30% / 40% 50% 60% 70%",
                ],
            }}
            transition={{
                duration: position.duration,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
}

function AuroraStrip({
    color,
    delay,
    duration,
    baseX,
}: {
    color: string;
    delay: number;
    duration: number;
    baseX: number;
}) {
    return (
        <motion.div
            className="absolute w-[200%] h-full blur-[40px]"
            style={{
                left: "-50%",
                top: 0,
                background: color,
                maskImage:
                    "linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%), linear-gradient(to bottom, black 0%, transparent 80%)",
                WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%), linear-gradient(to bottom, black 0%, transparent 80%)",
                maskComposite: "intersect",
                WebkitMaskComposite: "intersect",
            }}
            animate={{
                x: [0, 60, -40, 20],
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
}

export default function Bg() {
    const beamRef = useRef<HTMLDivElement>(null);
    const auroraRef = useRef<HTMLDivElement>(null);
    const { themeIndex } = useBgTheme();
    const theme = themes[themeIndex];

    useEffect(() => {
        let current = 50;
        let target = 50;
        let raf: number;

        const handleMouseMove = (e: MouseEvent) => {
            target = (e.clientX / window.innerWidth) * 100;
        };

        const animate = () => {
            current += (target - current) * 0.08;
            if (beamRef.current) {
                const p = current;
                beamRef.current.style.background = `linear-gradient(90deg,
                    transparent 0%,
                    transparent ${Math.max(0, p - 12)}%,
                    ${theme.orbs[0]}ee ${p}%,
                    ${theme.orbs[1]}ee ${p + 4}%,
                    transparent ${Math.min(100, p + 16)}%,
                    transparent 100%
                )`;
            }
            if (auroraRef.current) {
                const offset = (current - 50) * 1.5;
                auroraRef.current.style.transform = `translateX(${offset}px)`;
            }
            raf = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMouseMove);
        raf = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(raf);
        };
    }, [theme]);

    const auroraColors = [
        theme.orbs[0],
        theme.orbs[1],
        theme.orbs[2],
        theme.orbs[3],
    ];

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
            <motion.div
                key={themeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                className="absolute inset-0"
                style={{ background: theme.bg }}
            />

            <div className="absolute inset-0" style={{ filter: "url(#gooey)" }}>
                {orbPositions.map((position, i) => (
                    <Orb
                        key={`${themeIndex}-${i}`}
                        position={position}
                        color={theme.orbs[i]}
                    />
                ))}
            </div>

            <div
                ref={beamRef}
                className="absolute top-0 left-0 w-full h-16 blur-[30px] pointer-events-none"
            />

            <div
                ref={auroraRef}
                className="absolute top-0 left-0 w-full h-[50vh] pointer-events-none overflow-hidden opacity-80"
                style={{
                    maskImage:
                        "linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%), linear-gradient(to bottom, black 0%, transparent 100%)",
                    WebkitMaskImage:
                        "linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%), linear-gradient(to bottom, black 0%, transparent 100%)",
                    maskComposite: "intersect",
                    WebkitMaskComposite: "intersect",
                }}
            >
                <div className="relative w-full h-full">
                    {auroraColors.map((color, i) => (
                        <AuroraStrip
                            key={i}
                            color={color}
                            delay={i * 0.8}
                            duration={12 + i * 2}
                            baseX={i * 25}
                        />
                    ))}
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-100" />

            <svg className="hidden">
                <defs>
                    <filter id="gooey">
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="30"
                            result="blur"
                        />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15"
                            result="goo"
                        />
                        <feComposite
                            in="SourceGraphic"
                            in2="goo"
                            operator="atop"
                        />
                    </filter>
                </defs>
            </svg>
        </div>
    );
}
