"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const TypingText = ({
    text,
    className,
    startTyping = false,
    durationPerChar = 100,
}: {
    text: string;
    className?: string;
    startTyping?: boolean;
    durationPerChar?: number;
}) => {
    const [renderedText, setRenderedText] = useState("ㅤ");
    useEffect(() => {
        if (!startTyping) {
            return;
        }

        const interval = setInterval(() => {
            setRenderedText((prevText) => {
                if (prevText === text) {
                    clearInterval(interval);
                }
                const currtext = prevText === "ㅤ" ? "" : prevText;
                return currtext + text.charAt(currtext.length);
            });
        }, durationPerChar);

        return () => clearInterval(interval);
    }, [startTyping, durationPerChar, text]);
    return <p className={cn("text-md", className)}>{renderedText}</p>;
};

export default TypingText;
