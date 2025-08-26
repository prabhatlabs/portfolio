"use client";
import { motion } from "framer-motion";

const GlitchText = ({
    text,
    className,
    children,
    condition = true,
    repeat = true,
    repeatDelay = 3,
}: {
    text?: string;
    className?: string;
    children?: React.ReactNode;
    condition?: boolean;
    repeat?: boolean;
    repeatDelay?: number;
}) => {
    return (
        <div className={`relative ${className}`}>
            <motion.h1
                animate={
                    condition
                        ? {
                              opacity: [1, 0.2, 1],
                          }
                        : {}
                }
                transition={{
                    ease: "linear",
                    duration: 0.5,
                    repeat: repeat ? Infinity : 0,
                    repeatDelay,
                }}
                className="text-foreground/90 flex items-center justify-center gap-2"
            >
                {text || children}
            </motion.h1>
            <div>
                <motion.h1
                    initial={{ x: 0 }}
                    animate={
                        condition
                            ? {
                                  x: [0, -2, 2, 0],
                              }
                            : {}
                    }
                    transition={{
                        ease: "linear",
                        duration: 0.5,
                        repeat: repeat ? Infinity : 0,
                        repeatDelay,
                    }}
                    className="absolute -z-10 top-0 left-0 flex items-center justify-center gap-2 text-red-500/65"
                >
                    {text || children}
                </motion.h1>
                <motion.h1
                    initial={{ y: 0 }}
                    animate={
                        condition
                            ? {
                                  y: [0, -2, 2, 0],
                              }
                            : {}
                    }
                    transition={{
                        ease: "linear",
                        duration: 0.5,
                        repeat: repeat ? Infinity : 0,
                        repeatDelay,
                    }}
                    className="absolute -z-10 top-0 left-0 flex items-center justify-center gap-2 text-blue-500/65"
                >
                    {text || children}
                </motion.h1>
                <motion.h1
                    initial={{ x: 0, y: 0 }}
                    animate={
                        condition
                            ? {
                                  x: [0, -2, 2, 0],
                                  y: [0, -2, 2, 0],
                              }
                            : {}
                    }
                    transition={{
                        ease: "linear",
                        duration: 0.5,
                        repeat: repeat ? Infinity : 0,
                        repeatDelay,
                    }}
                    className="absolute -z-10 top-0 left-0 flex items-center justify-center gap-2 text-green-500/45"
                >
                    {text || children}
                </motion.h1>
            </div>
        </div>
    );
};

export default GlitchText;
