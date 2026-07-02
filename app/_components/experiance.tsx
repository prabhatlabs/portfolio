"use client";

import { experiences } from "@/data/pages";
import { GeistPixelSquare } from "geist/font/pixel";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { PiBuildingsLight } from "react-icons/pi";
import { TbPointFilled } from "react-icons/tb";

export function Experiance() {
    const [expanded, setExpanded] = useState<number>(-1);
    function handleClick(index: number) {
        setExpanded((p) => (p === index ? -1 : index));
    }
    return (
        <div>
            <h2
                className={`p-4 sm:p-6 mt-16 sm:mt-20 md:mt-24 border-y text-3xl md:text-5xl ${GeistPixelSquare.className}`}
            >
                <span>Ex</span>
                <span className=" text-muted-foreground">perience</span>
            </h2>

            <div className="relative mt-4">
                <span className="absolute -top-5 left-0 my-1 mx-4 font-mono text-[10px] text-muted-foreground/50">
                    flex sm:gap-2 justify-between px-4
                </span>
                {experiences.map((experience, index) => (
                    <div
                        onClick={() => handleClick(index)}
                        key={index}
                        className={`relative flex sm:gap-2 justify-between px-4 ${index !== 0 ? "border-b" : "border-y"}`}
                    >
                        <motion.div
                            animate={{ rotate: expanded === index ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute left-0.5 top-1/2 -translate-y-1/2"
                        >
                            <IoIosArrowDown className="size-3 text-muted-foreground" />
                        </motion.div>
                        <div
                            className={`flex gap-2 sm:gap-4 w-full sm:w-fit p-2 sm:p-4 border-l border-r sm:border-r-0`}
                        >
                            {experience.iconUrl ? (
                                <Image
                                    src={experience.iconUrl}
                                    alt={experience.company}
                                    width={50}
                                    height={50}
                                    className="shrink-0 size-10 sm:size-12 border"
                                />
                            ) : (
                                <div className="shrink-0 size-10 sm:size-12 border flex items-center justify-center bg-muted">
                                    <PiBuildingsLight className="size-5 sm:size-7 text-foreground/70" />
                                </div>
                            )}
                            <div className="space-y-0.5 sm:space-y-1.5">
                                <h3 className="sm:text-lg font-semibold leading-4">
                                    {experience.company}
                                </h3>
                                <p className="text-sm sm:text-base text-muted-foreground leading-4">
                                    {`${experience.position} • ${experience.location}`}
                                </p>
                                <p className="block sm:hidden text-sm text-muted-foreground leading-4">
                                    {experience.period}
                                </p>
                                <AnimatePresence initial={false}>
                                    {expanded === index && (
                                        <motion.ul
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden mt-1.5 text-xs sm:text-sm text-muted-foreground leading-4 space-y-2"
                                        >
                                            {experience.points.map((point, i) => (
                                                <motion.li
                                                    key={i}
                                                    initial={{ opacity: 0, x: -8 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.06, duration: 0.25 }}
                                                    className="flex gap-2"
                                                >
                                                    <TbPointFilled className="size-2.5 shrink-0 mt-1" />
                                                    <span>{point}</span>
                                                </motion.li>
                                            ))}
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className="hidden sm:flex shrink-0 items-end justify-center border-x w-42 px-2 py-4">
                            <p className="text-sm text-muted-foreground">
                                {experience.period}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
