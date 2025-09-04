"use client";
import { motion } from "framer-motion";

function BoxBg() {
    return (
        <motion.div
            className="fixed inset-0 -z-10 opacity-10"
            style={{
                backgroundImage: `
        linear-gradient(to right, var(--foreground) 0.1px, transparent 1px),
        linear-gradient(to bottom, var(--foreground) 0.1px, transparent 1px)
        `,
                backgroundSize: "20px 20px",
            }}
            animate={{
                backgroundPosition: ["0px 0px", "0px -60px"],
            }}
            transition={{
                duration: 2,
                ease: "linear",
                repeat: Infinity,
            }}
        />
    );
}

export default BoxBg;
