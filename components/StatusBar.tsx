"use client";

import { formatDateTime } from "@/lib/time";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";
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

const FONTS: {
    family: string;
    weight?: string;
    style?: string;
    spacing?: string;
    transform?: string;
}[] = [
    { family: "serif" },
    {
        family: "sans-serif",
        weight: "900",
        spacing: "0.15em",
        transform: "uppercase",
    },
    { family: "monospace", style: "italic", weight: "100" },
    { family: "cursive", weight: "300" },
    { family: "fantasy", weight: "900", spacing: "0.1em" },
    { family: "system-ui", weight: "100" },
    { family: "Georgia, serif", style: "italic" },
    { family: '"Courier New", monospace', weight: "700" },
    { family: "Impact, fantasy", spacing: "0.05em", transform: "uppercase" },
    {
        family: '"Comic Sans MS", cursive',
        weight: "300",
        transform: "lowercase",
    },
    { family: '"Trebuchet MS", sans-serif', weight: "800", style: "italic" },
    { family: '"Palatino Linotype", serif', weight: "400", spacing: "0.2em" },
    { family: '"Lucida Console", monospace', weight: "100", style: "oblique" },
    {
        family: '"Arial Black", sans-serif',
        transform: "uppercase",
        spacing: "0.08em",
    },
    { family: '"Book Antiqua", serif', style: "italic", weight: "700" },
    {
        family: '"Brush Script MT", cursive',
        weight: "400",
        transform: "capitalize",
    },
    {
        family: '"Copperplate Gothic Bold", fantasy',
        weight: "400",
        spacing: "0.3em",
    },
    { family: '"Garamond", serif', weight: "300", style: "italic" },
    { family: '"Century Gothic", sans-serif', weight: "900" },
    {
        family: '"Rockwell Extra Bold", serif',
        weight: "400",
        spacing: "0.12em",
        transform: "uppercase",
    },
];

const FADE_IN = 1000;
const CYCLE_1_START = 1680;
const CYCLE_1_END = 2700;
const CYCLE_2_START = 3600;
const CYCLE_2_END = 4829;

function FullScreenPlay({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [phase, setPhase] = useState<0 | 1 | null>(null);
    const [fontIndex, setFontIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;

    useEffect(() => {
        if (!isOpen) return;

        const audio = new Audio("/audio/font_cycle.mp3");
        audioRef.current = audio;
        audio.play().catch(() => {});

        const idx1 = { current: 0 };
        const idx2 = { current: 0 };
        const int1 = (CYCLE_1_END - CYCLE_1_START) / FONTS.length;
        const int2 = (CYCLE_2_END - CYCLE_2_START) / FONTS.length;

        const timeouts: ReturnType<typeof setTimeout>[] = [];
        const intervals: ReturnType<typeof setInterval>[] = [];

        timeouts.push(
            setTimeout(() => {
                setPhase(0);
                setFontIndex(0);
            }, FADE_IN),
        );

        timeouts.push(
            setTimeout(() => {
                const i1 = setInterval(() => {
                    idx1.current++;
                    if (idx1.current >= FONTS.length) {
                        clearInterval(i1);
                        return;
                    }
                    setFontIndex(idx1.current);
                }, int1);
                intervals.push(i1);
            }, CYCLE_1_START),
        );

        timeouts.push(
            setTimeout(() => {
                clearInterval(intervals[0]);
            }, CYCLE_1_END),
        );

        timeouts.push(
            setTimeout(() => {
                setPhase(1);
                setFontIndex(0);

                const i2 = setInterval(() => {
                    idx2.current++;
                    if (idx2.current >= FONTS.length) {
                        clearInterval(i2);
                        return;
                    }
                    setFontIndex(idx2.current);
                }, int2);
                intervals.push(i2);
            }, CYCLE_2_START),
        );

        timeouts.push(
            setTimeout(() => {
                clearInterval(intervals[1]);
                setPhase(null);
                setTimeout(() => onCloseRef.current(), 500);
            }, CYCLE_2_END),
        );

        return () => {
            intervals.forEach(clearInterval);
            timeouts.forEach(clearTimeout);
            audio.pause();
            audio.currentTime = 0;
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    exit={{ scaleY: 0, opacity: 0 }}
                    transition={{
                        duration: FADE_IN / 1000,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ originY: 0.5 }}
                    className="fixed top-0 left-0 w-dvw h-dvh bg-background z-50 flex items-center justify-center"
                >
                    {phase !== null && (
                        <span
                            key={`${phase}-${fontIndex}`}
                            className={cn(
                                "text-foreground",
                                phase === 0
                                    ? "text-3xl sm:text-4xl md:text-6xl"
                                    : "text-xl sm:text-2xl md:text-3xl",
                            )}
                            style={{
                                fontFamily: FONTS[fontIndex].family,
                                fontWeight: FONTS[fontIndex].weight,
                                fontStyle: FONTS[fontIndex].style,
                                letterSpacing: FONTS[fontIndex].spacing,
                                textTransform: FONTS[fontIndex]
                                    .transform as any,
                            }}
                        >
                            {phase === 0
                                ? "Prabhat Mishra"
                                : "Software Developer"}
                        </span>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export function StatusBar({
    className,
    setIsMutedAction,
    isMuted,
}: {
    className?: string;
    setIsMutedAction?: React.Dispatch<React.SetStateAction<boolean>>;
    isMuted: boolean;
}) {
    const [ipGeoData, setIpGeoData] = useState<null | IpGeo>(null);

    useEffect(() => {
        const ipGeoStr = localStorage.getItem("visitor_ip_geo");
        if (ipGeoStr) {
            setIpGeoData(JSON.parse(ipGeoStr));
        }
    }, []);

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
            {ipGeoData?.city && (
                <span className="px-1 border-l border-b">{ipGeoData.city}</span>
            )}
            {ipGeoData?.region && (
                <span className="px-1 border-l border-b">
                    {ipGeoData.region}
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
                className="w-fit px-1 border-l border-b"
            />
            {setIsMutedAction && (
                <button
                    onClick={() => setIsMutedAction((p) => !p)}
                    className="px-1 border-l border-b flex items-center justify-center gap-0.5"
                >
                    {isMuted ? (
                        <IoPlaySharp className="size-3 fill-muted-foreground" />
                    ) : (
                        <IoPauseSharp className="size-3 fill-muted-foreground" />
                    )}
                    <span>{isMuted ? "Play" : "Pause"}</span>
                </button>
            )}
            {/*<FullScreenPlay isOpen={isFullScreen} onClose={() => setIsFullScreen(false)} />*/}
        </div>
    );
}
