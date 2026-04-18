import GameContainer from "./GameContainer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export const metadata = {
    title: "Space Arcade",
    description: "A mini pixel space arcade game hidden in my portfolio.",
};

export default function GamePage() {
    return (
        <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background elements to match the portfolio */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-destructive rounded-full blur-[120px]" />
            </div>

            <div className="z-10 flex flex-col items-center gap-8 w-full max-w-4xl">
                <div className="flex items-center justify-between w-full">
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <ChevronLeft className="w-4 h-4" />
                            Back to Portfolio
                        </Button>
                    </Link>
                    <div className="text-right">
                        <h1 className="text-2xl font-bold font-mono tracking-tighter">
                            ARCADE_MODE.exe
                        </h1>
                        <p className="text-xs text-muted-foreground font-mono">
                            v1.0.42-pixel
                        </p>
                    </div>
                </div>

                <div className="w-full flex justify-center">
                    <GameContainer />
                </div>
                
                <div className="flex gap-4 text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
                    <span>[ CRT_FILTER: ON ]</span>
                    <span>[ SCANLINES: ENABLED ]</span>
                    <span>[ V-SYNC: 60FPS ]</span>
                </div>
            </div>
        </main>
    );
}
