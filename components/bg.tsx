"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { themes, orbPositions } from "@/lib/themes";
import { useBgTheme } from "./bg-theme-provider";

function Orb({
    position,
    color,
    index,
    mouseX,
    mouseY,
}: {
    position: (typeof orbPositions)[0];
    color: string;
    index: number;
    mouseX: any;
    mouseY: any;
}) {
    // Responsive springs for visible movement, removed extra offsets
    const x = useSpring(mouseX, { stiffness: 20, damping: 35 });
    const y = useSpring(mouseY, { stiffness: 20, damping: 35 });

    return (
        <motion.div
            className="absolute rounded-full will-change-transform opacity-60"
            style={{
                width: position.size,
                height: position.size,
                background: color,
                // Removed the +10% offset to align perfectly
                left: position.left,
                top: position.top,
                x,
                y,
                filter: "blur(40px)",
            }}
            animate={{
                scale: [1, 1.15, 0.9, 1.1, 1],
                borderRadius: [
                    "40% 60% 70% 30% / 40% 50% 60% 70%", 
                    "60% 40% 30% 70% / 50% 60% 70% 40%", 
                    "40% 60% 70% 30% / 40% 50% 60% 70%"
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

export default function Bg() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    // Smooth springs for the parallax layers
    const smoothX = useSpring(mouseX, { stiffness: 10, damping: 40 });
    const smoothY = useSpring(mouseY, { stiffness: 10, damping: 40 });

    // Calculate the angle of the mouse from the center for a directional mask
    const maskAngle = useTransform(
        [smoothX, smoothY],
        ([x, y]) => {
            const angle = Math.atan2(y as number, x as number) * (180 / Math.PI) + 90;
            return `${angle}deg`;
        }
    );
    
    // Create a linear gradient mask that follows the cursor's angle
    const maskImage = useTransform(
        maskAngle,
        (angle) => `linear-gradient(${angle}, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 30%, transparent 100%)`
    );

    // Centered transform ranges for perfectly aligned movement
    const bgTranslateY = useTransform(smoothY, [-500, 500], [-100, 100]);
    const maskTranslateY = useTransform(smoothY, [-500, 500], [-100, 100]);
    const globalX = useTransform(smoothX, [-500, 500], [-100, 100]);

    const { themeIndex } = useBgTheme();
    const theme = themes[themeIndex];

    useEffect(() => {
        const updateMouse = (x: number, y: number) => {
            // Normalized values directly driving the movement
            mouseX.set((x / window.innerWidth - 0.5) * 400);
            mouseY.set((y / window.innerHeight - 0.5) * 400);
        };

        const handleMouseMove = (e: MouseEvent) => updateMouse(e.clientX, e.clientY);
        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches[0]) updateMouse(e.touches[0].clientX, e.touches[0].clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
            <motion.div
                key={themeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                className="absolute -inset-[20%] h-[140%] w-[140%]"
                style={{ 
                    background: theme.bg,
                    x: globalX,
                    y: bgTranslateY,
                    WebkitMaskImage: maskImage,
                    maskImage: maskImage
                }}
            />

            <div className="absolute inset-0" style={{ filter: "url(#gooey)" }}>
                {orbPositions.map((position, i) => (
                    <Orb
                        key={`${themeIndex}-${i}`}
                        index={i}
                        position={position}
                        color={theme.orbs[i]}
                        mouseX={mouseX}
                        mouseY={mouseY}
                    />
                ))}
            </div>

            <motion.div 
                className="absolute -inset-[20%] h-[140%] w-[140%] pointer-events-none"
                style={{ y: maskTranslateY, x: globalX }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent opacity-20" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.1))] mix-blend-overlay" />
            </motion.div>
            
            <svg className="hidden">
                <defs>
                    <filter id="gooey">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
}
