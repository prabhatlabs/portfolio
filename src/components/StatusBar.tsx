"use client";
import dynamic from "next/dynamic";
import { ThemeBtn } from "./ui/theme-btn";

const Clock = dynamic(() => import("./Clock"), { ssr: false });

const StatusBar = () => {
    return (
        <div className="bg-background/40 z-50 fixed w-full top-0 backdrop-blur-[1px]">
            <div className="max-w-7xl mx-auto px-4 py-1 flex justify-between items-center gap-2 font-mono text-xs">
                <ThemeBtn />
                <div className="relative w-fit px-1.5 py-0.5 rounded-md border border-muted-foreground/30">
                    Prabhat Mishra
                </div>
                <Clock />
            </div>
        </div>
    );
};

export default StatusBar;
