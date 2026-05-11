"use client";
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { themes, orbPositions } from "@/lib/themes";
import { useBgTheme } from "./bg-theme-provider";

function Orb({
    position,
    color,
    mouseX,
    mouseY,
}: {
    position: (typeof orbPositions)[0];
    color: string;
    mouseX: any;
    mouseY: any;
}) {
    // Snappier springs for movement
    const x = useSpring(mouseX, { stiffness: 50, damping: 25 });
    const y = useSpring(mouseY, { stiffness: 50, damping: 25 });
    
    // Velocity tracking for aggressive response
    const xVelocity = useVelocity(mouseX);
    const yVelocity = useVelocity(mouseY);
    
    // Combine velocities and transform to a scale multiplier
    const velocity = useTransform(
        [xVelocity, yVelocity],
        ([latestX, latestY]: any) => {
            const speed = Math.sqrt(latestX ** 2 + latestY ** 2);
            return 1 + Math.min(speed / 1000, 0.2); // Up to 20% scale boost on movement
        }
    );
    
    const scale = useSpring(velocity, { stiffness: 100, damping: 30 });

    return (
        <motion.div
            className="absolute rounded-full will-change-transform"
            style={{
                width: position.size,
                height: position.size,
                background: color,
                filter: "blur(60px)", // Slightly higher blur for more "ethereal" look
                left: position.left,
                top: position.top,
                x,
                y,
                scale,
            }}
            animate={{
                x: [0, 250, -200, 150, 0], // Increased range from 160/-120
                y: [0, -200, 250, -150, 0], // Increased range from -120/180
                scale: [1, 1.2, 0.8, 1.1, 1], // More aggressive scale breathing
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
    mouseX: any;
    mouseY: any;
    color: string;
}) {
    const x = useSpring(mouseX, { stiffness: 80, damping: 35 });
    const y = useSpring(mouseY, { stiffness: 80, damping: 35 });

    return (
        <motion.div
            className="absolute rounded-full pointer-events-none will-change-transform"
            style={{
                width: "45vw",
                height: "45vw",
                background: color,
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
    const { themeIndex } = useBgTheme();
    const theme = themes[themeIndex];

    useEffect(() => {
        let raf: number;
        const handleMove = (e: MouseEvent) => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                // Increased the movement multiplier from 200 to 400 for more aggressive follow
                mouseX.set((e.clientX / window.innerWidth - 0.5) * 400);
                mouseY.set((e.clientY / window.innerHeight - 0.5) * 400);
            });
        };

        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
            <motion.div
                key={themeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5 }} // Slower transition between themes for better blend
                className="absolute inset-0"
                style={{ background: theme.bg }}
            />

            {orbPositions.map((position, i) => (
                <Orb
                    key={`${themeIndex}-${i}`}
                    position={position}
                    color={theme.orbs[i]}
                    mouseX={mouseX}
                    mouseY={mouseY}
                />
            ))}

            <MouseOrb 
                mouseX={mouseX} 
                mouseY={mouseY} 
                color={theme.orbs[0]} 
            />

            {/* Overlays for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.4))]" />
        </div>
    );
}
