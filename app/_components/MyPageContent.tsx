"use client";

import { useState } from "react";
import { About } from "./about";
import { Contributions } from "./contributions";
import { Experiance } from "./experiance";
import { Footer } from "./footer";
import { Projects } from "./projects";
import { Skills } from "./skills";
import RandomShit from "./randomshit";

export function MyPageContent() {
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    return (
        <>
            <div className="h-6 md:h-20 w-full border-b">
                <div className="max-w-3xl mx-auto border-x h-full relative">
                    <span className="text-muted-foreground text-[10px] font-mono absolute bottom-1 left-2"></span>
                </div>
            </div>

            {/* main content */}
            <div className="z-10 max-w-3xl mx-auto relative backdrop-blur-2xl bg-foreground/5">
                <div className="-z-10 absolute top-0 left-0 w-4 h-full border-l"></div>
                <div className="space-y-4 md:space-y-6">
                    <Footer asNav />
                    <About
                        isTerminalOpen={isTerminalOpen}
                        setIsTerminalOpen={setIsTerminalOpen}
                    />
                    <Experiance />
                    <Projects />
                    <Contributions />
                </div>
                <Skills />
                <Footer />
                <div className="-z-10 absolute top-0 right-0 w-4 h-full border-r"></div>
            </div>

            <div className="h-4 md:h-20 w-full border-t">
                <div className="max-w-3xl mx-auto border-x h-full relative"></div>
            </div>

            {/* Terminal Modal */}
            {isTerminalOpen && (
                <RandomShit onClose={() => setIsTerminalOpen(false)} />
            )}
        </>
    );
}
