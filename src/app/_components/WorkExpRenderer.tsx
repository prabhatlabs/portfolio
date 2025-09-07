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
        <>
            {workexpData.workexp.map((workexp, workIndex) => (
                <div key={workIndex}>
                    <div className="grid grid-cols-1 ">
                        <h3 className="text-xl md:text-2xl">{workexp.title}</h3>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Image
                                    src={workexp.logo}
                                    width={30}
                                    height={30}
                                    className="object-contain p-0.5 border border-border bg-white"
                                    alt={workexp.company}
                                />
                                <h5 className="text-sm md:text-lg">
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
                                    className="rounded-none shadow-none my-2 w-fit text-xs"
                                >
                                    {expendedIndex === workIndex
                                        ? "less"
                                        : "more"}
                                </Button>
                                <h6 className="text-foreground/70 text-xs md:text-[14px]">
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
                                    className="flex flex-col gap-2 overflow-hidden"
                                >
                                    {workexp.description.map(
                                        (workProject, projectIndex) => (
                                            <div
                                                key={projectIndex}
                                                className="text-[14px] md:text-[16px] text-foreground/70"
                                            >
                                                <h6 className="text-foreground border-b border-border">
                                                    {workProject.projectName}
                                                </h6>
                                                <ul className="list-disc pl-4">
                                                    {workProject.description.map(
                                                        (desc, j) => (
                                                            <li key={j}>
                                                                <TextHighlighting
                                                                    text={desc}
                                                                    highlightedTextClassName="text-foreground font-bold text-[15px] md:text-[17px]"
                                                                    specialTextClassName="italic text-foreground font-bold text-[15px] md:text-[17px]"
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
                </div>
            ))}
        </>
    );
};

export default WorkExpRenderer;
