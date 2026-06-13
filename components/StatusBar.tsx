"use client";

import { formatDateTime } from "@/lib/time";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { IoMdPlay } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { IpGeo, VisitorCounter } from "./VisitorCounter";

function DateTime({ className }: { className?: string }) {
    const [time, setTime] = useState<string>(
        formatDateTime(new Date().getTime()),
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const t = new Date().getTime();
            const dtStr = formatDateTime(t);
            setTime(dtStr);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <span
            suppressHydrationWarning={true}
            className={cn(className, "w-36 text-center")}
        >
            {time}
        </span>
    );
}

const FONTS: { family: string; weight?: string; style?: string; spacing?: string; transform?: string }[] = [
    { family: "serif" },
    { family: "sans-serif", weight: "900", spacing: "0.15em", transform: "uppercase" },
    { family: "monospace", style: "italic", weight: "100" },
    { family: "cursive", weight: "300" },
    { family: "fantasy", weight: "900", spacing: "0.1em" },
    { family: "system-ui", weight: "100" },
    { family: "Georgia, serif", style: "italic" },
    { family: '"Courier New", monospace', weight: "700" },
    { family: "Impact, fantasy", spacing: "0.05em", transform: "uppercase" },
    { family: '"Comic Sans MS", cursive', weight: "300", transform: "lowercase" },
    { family: '"Trebuchet MS", sans-serif', weight: "800", style: "italic" },
    { family: '"Palatino Linotype", serif', weight: "400", spacing: "0.2em" },
    { family: '"Lucida Console", monospace', weight: "100", style: "oblique" },
    { family: '"Arial Black", sans-serif', transform: "uppercase", spacing: "0.08em" },
    { family: '"Book Antiqua", serif', style: "italic", weight: "700" },
    { family: '"Brush Script MT", cursive', weight: "400", transform: "capitalize" },
    { family: '"Copperplate Gothic Bold", fantasy', weight: "400", spacing: "0.3em" },
    { family: '"Garamond", serif', weight: "300", style: "italic" },
    { family: '"Century Gothic", sans-serif', weight: "900" },
    { family: '"Rockwell Extra Bold", serif', weight: "400", spacing: "0.12em", transform: "uppercase" },
];

const TEXT_DURATION = 100;
const DISPLAY_DURATION = 2000;

function FullScreenPlay({ isOpen, onClose }: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [phase, setPhase] = useState<0 | 1 | null>(null);
    const [fontIndex, setFontIndex] = useState(0);

    useEffect(() => {
        if (!isOpen) return;

        let currentPhase: 0 | 1 = 0;
        let idx = 0;
        let interval: ReturnType<typeof setInterval>;
        let timeout: ReturnType<typeof setTimeout>;

        function startFontCycle() {
            idx = 0;
            setPhase(currentPhase);
            setFontIndex(0);

            interval = setInterval(() => {
                idx++;
                if (idx >= FONTS.length) {
                    clearInterval(interval);
                    if (currentPhase === 0) {
                        currentPhase = 1;
                        timeout = setTimeout(startFontCycle, TEXT_DURATION);
                    } else {
                        setPhase(null);
                        timeout = setTimeout(onClose, 300);
                    }
                    return;
                }
                setFontIndex(idx);
            }, TEXT_DURATION);
        }

        timeout = setTimeout(startFontCycle, 600);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    exit={{ scaleY: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ originY: 0.5 }}
                    className="fixed top-0 left-0 w-dvw h-dvh bg-background z-50 flex items-center justify-center"
                >
                    {phase !== null && (
                        <span
                            key={`${phase}-${fontIndex}`}
                            className={cn(
                                "text-foreground",
                                phase === 0 ? "text-3xl sm:text-4xl md:text-6xl" : "text-xl sm:text-2xl md:text-3xl",
                            )}
                            style={{
                                fontFamily: FONTS[fontIndex].family,
                                fontWeight: FONTS[fontIndex].weight,
                                fontStyle: FONTS[fontIndex].style,
                                letterSpacing: FONTS[fontIndex].spacing,
                                textTransform: FONTS[fontIndex].transform as any,
                            }}
                        >
                            {phase === 0 ? "Prabhat Mishra" : "Software Developer"}
                        </span>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export function StatusBar({ className }: { className?: string }) {
    const [ipGeoData, setIpGeoData] = useState<null | IpGeo>(() => {
        if (typeof window === "undefined") return null;
        const ipGeoStr = localStorage.getItem("visitor_ip_geo");
        return ipGeoStr ? JSON.parse(ipGeoStr) : null;
    });

    const [isFullScreen, setIsFullScreen] = useState(false);

    return (
        <div
            className={cn(className, "flex justify-end flex-wrap items-center")}
        >
            {ipGeoData?.ip && (
                <span className="px-1 border-l border-b">{ipGeoData.ip}</span>
            )}
            {ipGeoData?.ping && (
                <span className="px-1 border-l border-b">
                    {ipGeoData.ping}ms
                </span>
            )}
            {ipGeoData?.country && (
                <span className="px-1 border-l border-b">
                    {ipGeoData.country}
                </span>
            )}
            {ipGeoData?.os && (
                <span className="px-1 border-l border-b">{ipGeoData?.os}</span>
            )}
            <DateTime className="px-1 border-l border-b" />
            <VisitorCounter
                onIpGeoData={setIpGeoData}
                className="w-20 px-1 border-l border-b"
            />
            <button
                onClick={() => setIsFullScreen(true)}
                className="px-2 border-l border-b flex items-center justify-center gap-0.5"
            >
                <IoMdPlay className="size-3 fill-muted-foreground" />
                <span>Play</span>
            </button>
            <FullScreenPlay isOpen={isFullScreen} onClose={() => setIsFullScreen(false)} />
        </div>
    );
}
