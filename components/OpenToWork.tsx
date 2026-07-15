"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function OpenToWork() {
    const [showOverlay, setShowOverlay] = useState(true);

    return (
        <div className="flex items-center gap-2">
            <AnimatePresence>
                {showOverlay ? (
                    <motion.div
                        key="dot"
                        layoutId="dot"
                        initial={{ width: "200dvw", height: "200dvw", backgroundColor: "var(--background)" }}
                        animate={{ width: "4px", height: "4px", padding: "4px", backgroundColor: "var(--color-green-500)"  }}
                        transition={{
                            duration: 1.5,
                            delay: 0.25,
                            ease: "circInOut",
                        }}
                        onAnimationComplete={() => setShowOverlay(false)}
                        className="fixed p-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden flex items-center justify-center"
                    >
                        <span className="text-2xl font-bold whitespace-nowrap">
                            prabhatlabs
                            <span className="text-muted-foreground">.dev</span>
                        </span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="dot"
                        layoutId="dot"
                        className="w-1 h-1 p-1 animate-pulse rounded-full bg-green-500"
                    />
                )}
            </AnimatePresence>
            <span className="">Open to work</span>
        </div>
    );
}
