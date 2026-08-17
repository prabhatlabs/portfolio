"use client";

import { useEffect, useState } from "react";
import { GeistPixelSquare } from "geist/font/pixel";

export default function Clock() {
    const [time, setTime] = useState<string>("");
    const [date, setDate] = useState<string>("");

    useEffect(() => {
        const tick = () => {
            const now = new Date();
            setTime(
                now.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                }),
            );
            setDate(
                now.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
            );
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className={`${GeistPixelSquare.className} flex flex-col items-center justify-center gap-2`}>
            <span suppressHydrationWarning className="text-5xl text-white">
                {time}
            </span>
            <span suppressHydrationWarning className="text-xl text-white/60">
                {date}
            </span>
        </div>
    );
}
