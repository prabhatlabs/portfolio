"use client";

import TextHighlighting from "@/components/TextHighlighting";
import { Button } from "@/components/ui/button";
import { workexpData } from "@/data/data";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const WorkExpRenderer = () => {
    const [expendedIndex, setExpendedIndex] = useState<number | null>(null);

    return (
        <div className="grid grid-cols-1 gap-8 h-fit grid-auto-block">
            {workexpData.workexp.map((workexp, workIndex) => (
                <div
                    key={workIndex}
                    className="grid grid-cols-1"
                    style={{
                        padding: 0,
                    }}
                >
                    <h3 className="text-[16px] md:text-lg px-2">
                        {workexp.title}
                    </h3>

                    <div className="flex justify-between items-center px-2">
                        <div className="flex items-center gap-2">
                            <Image
                                src={workexp.logo}
                                width={32}
                                height={32}
                                className="object-contain p-0.5 border border-border bg-white"
                                alt={workexp.company}
                            />
                            <h5 className="text-[14px] md:text-[16px]">
                                {workexp.company}
                            </h5>
                        </div>

                        <div className="flex items-center justify-end gap-2">
                            <Button
                                size={"sm"}
                                variant={"outline"}
                                onClick={() =>
                                    setExpendedIndex((p) =>
                                        p !== null && p === workIndex
                                            ? null
                                            : workIndex
                                    )
                                }
                                className="rounded-none shadow-none w-fit text-xs border-border"
                            >
                                {expendedIndex === workIndex ? "less" : "more"}
                            </Button>
                            <h6 className="text-foreground/70 text-xs">
                                {`${workexp.start} - ${workexp.end}`}
                            </h6>
                        </div>
                    </div>

                    {/* Animate Expand/Collapse */}
                    <AnimatePresence initial={false}>
                        {expendedIndex === workIndex && (
                            <motion.div
                                key="content"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut",
                                }}
                                className="flex flex-col overflow-hidden"
                            >
                                {workexp.description.map(
                                    (workProject, projectIndex) => (
                                        <div
                                            key={projectIndex}
                                            className="mt-2 text-[14px] md:text-[16px] text-foreground/70"
                                        >
                                            <h6 className="text-foreground border-b border-border px-2">
                                                {workProject.projectName}
                                            </h6>
                                            <ul className="list-disc pl-6">
                                                {workProject.description.map(
                                                    (desc, j) => (
                                                        <li key={j}>
                                                            <TextHighlighting
                                                                text={desc}
                                                                className="leading-4 text-[12px] md:text-[14px]"
                                                                highlightedTextClassName="text-foreground font-bold"
                                                                specialTextClassName="italic text-foreground font-bold"
                                                            />
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};

export default WorkExpRenderer;
