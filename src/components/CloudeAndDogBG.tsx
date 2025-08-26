"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const CloudeAndDogBG = () => {
    const { theme } = useTheme();
    const [duration, setDuration] = useState(30);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        function updateDuration() {
            const width = window.innerWidth;
            const duration = Math.round((width / 1920) * 25 + 5);
            setDuration(duration);
        }

        updateDuration(); // set on load
        window.addEventListener("resize", updateDuration);
        return () => window.removeEventListener("resize", updateDuration);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="fixed inset-0 -z-10 opacity-80">
            {/* clouds */}
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

            {/* dog */}
            <motion.div
                initial={{
                    x: "-100px",
                }}
                animate={{
                    x: "105%",
                }}
                transition={{
                    duration,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute top-[80%] z-10 flex w-full"
            >
                <Image
                    src={"/dog.gif"}
                    width={70}
                    height={70}
                    alt={""}
                    className="object-cover"
                    unoptimized
                />
            </motion.div>

            {/* background */}
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

export default CloudeAndDogBG;
