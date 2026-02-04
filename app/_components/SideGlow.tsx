"use client";
import { motion } from "framer-motion";

export function SmokeThrust() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Core bright thrust */}
            <motion.div
                className="
          absolute inset-y-0 right-0 w-16
          bg-gradient-to-b
          from-yellow-200/80
          via-yellow-300/60
          to-amber-500/40
          blur-xl
        "
                animate={{ y: [-40, 40] }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "linear",
                }}
            />

            {/* Mid smoke */}
            <motion.div
                className="
          absolute inset-y-0 right-0 w-32
          bg-gradient-to-b
          from-yellow-300/40
          via-amber-400/30
          to-amber-600/20
          blur-2xl
        "
                animate={{
                    y: [-80, 80],
                    x: [-6, 6],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "linear",
                }}
            />

            {/* Outer diffusion */}
            <motion.div
                className="
          absolute inset-y-0 right-0 w-48
          bg-gradient-to-b
          from-amber-400/25
          via-amber-600/20
          to-transparent
          blur-3xl
        "
                animate={{
                    y: [-120, 120],
                    x: [-10, 10],
                }}
                transition={{
                    duration: 16,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "linear",
                }}
            />
        </div>
    );
}
