"use client";
import { motion } from "framer-motion";

const FluidGradientBg = () => {
    return (
        <div className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden blur-2xl">
            {/* Rose-gold / Orange */}
            <motion.div
                className="absolute top-[-20%] left-[-20%] w-[55%] h-[55%] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(255,160,100,0.55), transparent 70%)",
                    filter: "blur(120px)",
                }}
                animate={{
                    x: [0, 80, -60, 0],
                    y: [0, -50, 40, 0],
                    scale: [1, 1.15, 0.9, 1],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Magenta / Pink */}
            <motion.div
                className="absolute top-[-15%] right-[-20%] w-[60%] h-[60%] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(230,70,180,0.45), transparent 70%)",
                    filter: "blur(140px)",
                }}
                animate={{
                    x: [0, -70, 60, 0],
                    y: [0, 60, -50, 0],
                    scale: [1, 1.12, 0.92, 1],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Teal / Cyan */}
            <motion.div
                className="absolute bottom-[-30%] left-[10%] w-[80%] h-[80%] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(0,200,220,0.4), transparent 70%)",
                    filter: "blur(160px)",
                }}
                animate={{
                    x: [0, 90, -70, 0],
                    y: [0, -60, 50, 0],
                    scale: [1, 1.18, 0.88, 1],
                }}
                transition={{
                    duration: 55,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Purple / Indigo */}
            <motion.div
                className="absolute bottom-[-25%] right-[-15%] w-[70%] h-[70%] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(140,100,255,0.35), transparent 70%)",
                    filter: "blur(150px)",
                }}
                animate={{
                    x: [0, -80, 70, 0],
                    y: [0, 50, -40, 0],
                    scale: [1, 1.1, 0.95, 1],
                }}
                transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Lime / Green Accent */}
            <motion.div
                className="absolute top-[30%] left-[25%] w-[50%] h-[50%] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(120,220,150,0.35), transparent 70%)",
                    filter: "blur(130px)",
                }}
                animate={{
                    x: [0, 70, -50, 0],
                    y: [0, -40, 60, 0],
                    scale: [1, 1.14, 0.9, 1],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
};

export default FluidGradientBg;
