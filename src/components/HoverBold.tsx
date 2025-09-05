"use client";

import { motion } from "framer-motion";
import { useState } from "react";

function HoverBold({ text }: { text: string }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const getFontWeight = (index: number) => {
        if (hoveredIndex === null) return 330;

        const distance = Math.abs(index - hoveredIndex);

        if (distance === 0) return 450; // semibold - hovered letter
        if (distance === 1) return 410; // medium - adjacent letters
        if (distance === 2) return 370; // normal - two letters away

        return 330;
    };

    // Split text into words, then split each word into letters while keeping track of global index
    const words = text.split(" ");
    let globalIndex = 0;

    const wordElements = words.map((word, wordIndex) => {
        const letters = word.split("").map((letter) => {
            const currentIndex = globalIndex++;
            const targetWeight = getFontWeight(currentIndex);
            const targetScale = hoveredIndex === currentIndex ? 1.1 : 1;

            return (
                <motion.span
                    key={currentIndex}
                    className="cursor-default"
                    initial={false}
                    animate={{
                        fontWeight: targetWeight,
                        scale: targetScale,
                    }}
                    transition={{
                        duration: 0.15,
                        ease: "easeOut",
                    }}
                    style={{
                        display: "inline-block",
                        transformOrigin: "center",
                        color:
                            word === "developer" ||
                            currentIndex === hoveredIndex
                                ? "red"
                                : "var(--foreground)",
                    }}
                    onMouseEnter={() => setHoveredIndex(currentIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {letter}
                </motion.span>
            );
        });

        // Create space element if not the last word
        let spaceElement = null;
        if (wordIndex < words.length - 1) {
            const spaceIndex = globalIndex++;
            const spaceWeight = getFontWeight(spaceIndex);
            const spaceScale = hoveredIndex === spaceIndex ? 1.1 : 1;

            spaceElement = (
                <motion.span
                    key={spaceIndex}
                    className="cursor-default"
                    initial={false}
                    animate={{
                        fontWeight: spaceWeight,
                        scale: spaceScale,
                    }}
                    transition={{
                        duration: 0.15,
                        ease: "easeOut",
                    }}
                    style={{
                        display: "inline-block",
                        transformOrigin: "center",
                    }}
                    onMouseEnter={() => setHoveredIndex(spaceIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {"\u00A0"}
                </motion.span>
            );
        }

        return (
            <span key={wordIndex} className="inline-block">
                {letters}
                {spaceElement}
            </span>
        );
    });

    return (
        <h1 className="text-5xl md:text-7xl select-none max-w-7xl">
            {wordElements}
        </h1>
    );
}

export default HoverBold;
