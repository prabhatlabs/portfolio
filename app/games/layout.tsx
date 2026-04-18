"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function GamesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isMainArcade = pathname === "/games";
    
    // Determine header title based on path
    let headerTitle = "GAMES.exe";
    if (pathname.includes("pixel-space-invaders")) {
        headerTitle = "PIXEL_INVADERS.exe";
    }

    return (
        <main className="min-h-screen bg-background flex flex-col items-center p-4 relative overflow-hidden">
            {/* Consistent Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-destructive rounded-full blur-[120px]" />
            </div>

            <div className="z-20 w-full max-w-5xl flex flex-col gap-8">
                {/* Global Games Header */}
                <div className="flex items-center justify-between w-full pt-4">
                    <Link href={isMainArcade ? "/" : "/games"}>
                        <Button variant="ghost" size="sm" className="gap-2 font-mono group">
                            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            {isMainArcade ? "EXIT_TO_PORTFOLIO" : "EXIT_TO_ARCADE"}
                        </Button>
                    </Link>
                    <div className="text-right">
                        <h1 className="text-xl md:text-2xl font-bold font-mono tracking-tighter uppercase">
                            {headerTitle}
                        </h1>
                        <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em] opacity-50">
                            {isMainArcade ? "Library Root" : "Module Active"}
                        </p>
                    </div>
                </div>

                {children}

                {/* Global Footer Elements */}
                <div className="flex justify-center gap-6 text-[10px] text-muted-foreground uppercase tracking-widest font-mono opacity-20 mt-auto pb-8 pt-12">
                    <span>[ CRT_FILTER: ON ]</span>
                    <span>[ SCANLINES: ENABLED ]</span>
                    <span>[ V-SYNC: 60FPS ]</span>
                </div>
            </div>
        </main>
    );
}
