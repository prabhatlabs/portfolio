"use client";

import { motion } from "framer-motion";
import { useState } from "react";

function HoverBold({
    text,
    highlightedIndexs = {
        start: 0,
        end: 0,
    },
    className,
}: {
    text: string;
    highlightedIndexs: {
        start: number;
        end: number;
    };
    className?: string;
}) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const getFontWeight = (index: number) => {
        if (hoveredIndex === null) return 330;

        const distance = Math.abs(index - hoveredIndex);

        if (distance === 0) return 500; // semibold - hovered letter
        if (distance === 1) return 470; // medium - adjacent letters
        if (distance === 2) return 440; // normal - two letters away
        if (distance === 3) return 410; // normal - two letters away
        if (distance === 4) return 380; // normal - two letters away

        return 350;
    };

    // Split text into words, then split each word into letters while keeping track of global index
    const words = text.split(" ");
    let globalIndex = 0;

    const wordElements = words.map((word, wordIndex) => {
        const letters = word.split("").map((letter) => {
            const currentIndex = globalIndex++;
            const targetWeight = getFontWeight(currentIndex);

            return (
                <motion.span
                    key={currentIndex}
                    className="cursor-default"
                    initial={false}
                    animate={{
                        fontWeight: targetWeight,
                    }}
                    transition={{
                        duration: 0.15,
                        ease: "easeOut",
                    }}
                    style={{
                        display: "inline-block",
                        transformOrigin: "center",
                        color:
                            highlightedIndexs.start <= currentIndex &&
                            currentIndex <= highlightedIndexs.end
                                ? currentIndex === hoveredIndex
                                    ? "var(--foreground)"
                                    : "blue"
                                : currentIndex === hoveredIndex
                                ? "blue"
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

            spaceElement = (
                <motion.span
                    key={spaceIndex}
                    className="cursor-default"
                    initial={false}
                    animate={{
                        fontWeight: spaceWeight,
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

    return <h1 className={className}>{wordElements}</h1>;
}

export default HoverBold;
