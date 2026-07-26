"use client";

import AboveAboutBanner from "@/components/AboveAboutBanner";
import { StatusBar } from "@/components/StatusBar";
import RenderText from "@/components/ui/render-text";
import { myInfo } from "@/data/root";
import { getIcon } from "@/lib/icon";
import { GeistPixelSquare } from "geist/font/pixel";
import { Gamepad2 } from "lucide-react";
import Link from "next/link";
import { RiPagesLine } from "react-icons/ri";
import Cli from "./cli";
import OpenToWork from "@/components/OpenToWork";
import Corners from "@/components/Corners";
import { useState } from "react";

export function About() {
    const [isMuted, setIsMutedAction] = useState(true);
    return (
        <div className="relative">
            {/* about */}
            <div className="flex items-center w-full border-y relative z-50 pt-60 sm:pt-45 md:pt-65">
                <AboveAboutBanner isMuted={isMuted} />
                <Corners bottom={false} />
                <StatusBar setIsMutedAction={setIsMutedAction} className="absolute top-0 right-0 text-xs text-muted-foreground" />
                <div className="p-4 md:px-6 flex flex-col justify-center z-10">
                    <OpenToWork />
                    <h1
                        className={`text-4xl sm:text-5xl md:text-6xl flex gap-2 sm:gap-3 md:gap-4 items-center ${GeistPixelSquare.className}`}
                    >
                        {myInfo.name.split(" ").map((char, index) => (
                            <span
                                key={index}
                                className={`${index === 0 ? "text-foreground" : "text-foreground/60"}`}
                            >
                                {char}
                            </span>
                        ))}
                    </h1>
                    <h3
                        className={`text-2xl md:text-3xl ${GeistPixelSquare.className}`}
                    >
                        <span>Software</span>
                        <span className="text-muted-foreground ml-2">
                            Developer
                        </span>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 mb-1.5">
                        <RenderText>{myInfo.description}</RenderText>
                    </p>
                </div>
            </div>

            {/* contacts */}
            <div className="my-4 flex items-center w-full ml-px border-y relative">
                <span className="absolute bottom-full my-0.5 left-4 md:left-6 font-mono text-[10px] text-muted-foreground/50">
                    flex items-center w-fit
                </span>
                <div className="w-4 md:w-6 shrink-0"></div>
                <div className="flex items-center w-fit border-x">
                    {myInfo.contacts.map((contact, index) => {
                        const Icon = getIcon(contact.iconName);
                        return (
                            <Link
                                key={contact.name}
                                href={contact.url}
                                className={`p-2 text-foreground duration-300 group ${index !== 0 ? "border-l" : ""}`}
                            >
                                <Icon className="size-5 transition-transform group-hover:rotate-3 group-hover:-translate-y-1" />
                            </Link>
                        );
                    })}
                </div>
                <div className="absolute top-0 bottom-0 right-4 md:right-6 flex items-center">
                    <Link
                        href={"/blog"}
                        className="flex items-center gap-1.5 px-3 h-full border-x md:border-r-0 font-mono text-xs text-muted-foreground hover:text-primary transition-all duration-300 hover:bg-primary/5 group"
                    >
                        <RiPagesLine className="size-3.5 group-hover:rotate-12 transition-transform" />
                        <span className="whitespace-nowrap">Blogs</span>
                    </Link>
                    <Link
                        href="/games"
                        className="hidden md:flex items-center gap-1.5 px-3 h-full border-x font-mono text-xs text-muted-foreground hover:text-primary transition-all duration-300 hover:bg-primary/5 group"
                    >
                        <Gamepad2 className="size-3.5 group-hover:rotate-12 transition-transform" />
                        <span className="whitespace-nowrap">Arcade</span>
                    </Link>
                </div>
            </div>

            {/* cli */}
            <div className="my-4 flex items-center w-full ml-px border-y relative">
                <Corners top={false} />
                <div className="w-4 md:w-6 shrink-0"></div>
                <Cli />
                <div className="w-4 md:w-6 shrink-0"></div>
            </div>
        </div>
    );
}
