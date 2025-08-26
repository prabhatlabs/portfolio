"use client";

import { motion } from "framer-motion";

export default function BoxAnimatedBG() {
    return (
        <div className="fixed -z-10 top-0 w-full h-full pointer-events-none grid grid-cols-2 grid-rows-2">
            <motion.div
                className=""
                style={{
                    backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 19px, var(--box-bg-lines) 19px, var(--box-bg-lines) 20px, transparent 20px, transparent 39px, var(--box-bg-lines) 39px, var(--box-bg-lines) 40px),
          repeating-linear-gradient(90deg, transparent, transparent 19px, var(--box-bg-lines) 19px, var(--box-bg-lines) 20px, transparent 20px, transparent 39px, var(--box-bg-lines) 39px, var(--box-bg-lines) 40px),
          radial-gradient(circle at 20px 20px, var(--bg-bg-circle) 2px, transparent 2px),
          radial-gradient(circle at 40px 40px, var(--bg-bg-circle) 2px, transparent 2px)
          `,
                    backgroundSize:
                        "40px 40px, 40px 40px, 40px 40px, 40px 40px",
                }}
                animate={{
                    backgroundPosition: ["80px 80px", "0px 0px"],
                }}
                transition={{
                    duration: 3,
                    ease: "linear",
                    repeat: Infinity,
                }}
            />
            <motion.div
                className=""
                style={{
                    backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 19px, var(--box-bg-lines) 19px, var(--box-bg-lines) 20px, transparent 20px, transparent 39px, var(--box-bg-lines) 39px, var(--box-bg-lines) 40px),
          repeating-linear-gradient(90deg, transparent, transparent 19px, var(--box-bg-lines) 19px, var(--box-bg-lines) 20px, transparent 20px, transparent 39px, var(--box-bg-lines) 39px, var(--box-bg-lines) 40px),
          radial-gradient(circle at 20px 20px, var(--bg-bg-circle) 2px, transparent 2px),
          radial-gradient(circle at 40px 40px, var(--bg-bg-circle) 2px, transparent 2px)
          `,
                    backgroundSize:
                        "40px 40px, 40px 40px, 40px 40px, 40px 40px",
                }}
                animate={{
                    backgroundPosition: ["0px 80px", "80px 0px"],
                }}
                transition={{
                    duration: 3,
                    ease: "linear",
                    repeat: Infinity,
                }}
            />
            <motion.div
                className=""
                style={{
                    backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 19px, var(--box-bg-lines) 19px, var(--box-bg-lines) 20px, transparent 20px, transparent 39px, var(--box-bg-lines) 39px, var(--box-bg-lines) 40px),
          repeating-linear-gradient(90deg, transparent, transparent 19px, var(--box-bg-lines) 19px, var(--box-bg-lines) 20px, transparent 20px, transparent 39px, var(--box-bg-lines) 39px, var(--box-bg-lines) 40px),
          radial-gradient(circle at 20px 20px, var(--bg-bg-circle) 2px, transparent 2px),
          radial-gradient(circle at 40px 40px, var(--bg-bg-circle) 2px, transparent 2px)
          `,
                    backgroundSize:
                        "40px 40px, 40px 40px, 40px 40px, 40px 40px",
                }}
                animate={{
                    backgroundPosition: ["80px 0px", "0px 80px"],
                }}
                transition={{
                    duration: 3,
                    ease: "linear",
                    repeat: Infinity,
                }}
            />
            <motion.div
                className=""
                style={{
                    backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 19px, var(--box-bg-lines) 19px, var(--box-bg-lines) 20px, transparent 20px, transparent 39px, var(--box-bg-lines) 39px, var(--box-bg-lines) 40px),
          repeating-linear-gradient(90deg, transparent, transparent 19px, var(--box-bg-lines) 19px, var(--box-bg-lines) 20px, transparent 20px, transparent 39px, var(--box-bg-lines) 39px, var(--box-bg-lines) 40px),
          radial-gradient(circle at 20px 20px, var(--bg-bg-circle) 2px, transparent 2px),
          radial-gradient(circle at 40px 40px, var(--bg-bg-circle) 2px, transparent 2px)
          `,
                    backgroundSize:
                        "40px 40px, 40px 40px, 40px 40px, 40px 40px",
                }}
                animate={{
                    backgroundPosition: ["0px 0px", "80px 80px"],
                }}
                transition={{
                    duration: 3,
                    ease: "linear",
                    repeat: Infinity,
                }}
            />
        </div>
    );
}
