"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";

const BG = () => {
    const { theme } = useTheme();
    return (
        <div className="fixed inset-0 -z-10 opacity-60">
            <motion.div
                initial={{
                    x: "0%",
                }}
                animate={{
                    x: "-100%",
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute top-7/12 left-1/2 -translate-x-1/2 -translate-y-1/2 flex w-full"
            >
                <Image
                    src={
                        theme === "light"
                            ? "/bg-light-cloud.png"
                            : "/bg-dark-cloud.png"
                    }
                    width={1920}
                    height={1080}
                    alt={""}
                    className="w-full object-cover"
                />
                <Image
                    src={
                        theme === "light"
                            ? "/bg-light-cloud.png"
                            : "/bg-dark-cloud.png"
                    }
                    width={1920}
                    height={1080}
                    alt={""}
                    className="w-full object-cover"
                />
            </motion.div>
            <Image
                src={theme === "light" ? "/bg-light.jpg" : "/bg-dark.jpg"}
                width={1920}
                height={1080}
                alt={""}
                className="w-full h-dvh object-cover"
            />
        </div>
    );
};

export default BG;
