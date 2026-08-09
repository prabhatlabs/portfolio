"use client";

import { useEffect, useRef, useState } from "react";

export default function BottomBlur() {
    const ref = useRef<HTMLDivElement>(null);
    const [isNearBottom, setIsNearBottom] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let scroller: HTMLElement = el;
        while (
            scroller.parentElement &&
            scroller.scrollHeight <= scroller.clientHeight + 1
        ) {
            scroller = scroller.parentElement;
        }

        function handleScroll() {
            const remaining =
                scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
            setIsNearBottom(remaining <= 300);
        }

        handleScroll();
        scroller.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);

        return () => {
            scroller.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`h-40 w-full z-100 pointer-events-none fixed bottom-0 left-0 bg-background/20 backdrop-blur-3xl mask-t-from-0% transition-opacity duration-500 ${isNearBottom ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        ></div>
    );
}
