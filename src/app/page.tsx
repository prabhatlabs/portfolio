"use client";

import AsciiVideoPlayer from "@/components/AsciiVideoPlayer";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Sparkles, Speaker } from "lucide-react";
import { useCallback, useEffect, useState } from 'react';
import { FaWandMagicSparkles } from "react-icons/fa6";

export default function MyPage() {
    const [unmuteAudio, setUnmuteAudio] = useState<(() => void) | null>(null);

    const handleAudioReady = useCallback((unmuteFn: () => void) => {
        setUnmuteAudio(() => unmuteFn); // Store the unmute function
    }, []);

    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === '.') {
                unmuteAudio?.();
            }
        };
        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [unmuteAudio])

    return (
        <div className="min-h-dvh h-full relative">
            <div style={{
                width: "calc(100% - 2rem)"
            }} className="max-w-7xl fixed z-50 top-0 left-1/2 -translate-x-1/2 p-2 my-4 md:my-6 rounded-lg backdrop-blur-xs border border-white/20 bg-white/5">
                <NavBar bgTransparent textWhite />
            </div>
            {/* Unmute button, only visible when audio is ready */}
            {unmuteAudio && (
                <Button
                    onClick={() => unmuteAudio()}
                    className="absolute bottom-4 right-4 p-2 z-50"
                    size={'icon'}
                >
                    <Sparkles />
                </Button>
            )}

            <div className="fixed z-10 mb-6 ml-8 md:mb-14 md:ml-10 lg:mb-16 lg:ml-12 xl:mb-20 xl:ml-24 bottom-0 left-0">
                <div className="relative flex flex-col gap-4 w-full">
                    {/* Wider elliptical gradient */}
                    <div
                        className="absolute inset-0 -z-10 w-[950px] h-[380px] left-0 top-0 -translate-x-1/3 -translate-y-1/5
      bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.85)_45%,rgba(0,0,0,0.55)_60%,rgba(0,0,0,0.2)_75%,transparent_100%)]
      blur-2xl rounded-full"
                    ></div>

                    <h2 className="text-white text-3xl sm:text-5xl md:text-7xl font-extralight tracking-wide">
                        {"prabhatlabs.dev"}
                    </h2>
                    <div className="text-white/50 text-xs lg:text-sm">
                        <span>
                            {"Build by"}{" "}
                            <a
                                href="https://github.com/IsayAyase"
                                target="_blank"
                                rel="noreferrer"
                                className="underline"
                            >
                                IsayAyase
                            </a>
                        </span>{" "}
                        <span>{`• prabhatlabs.dev © 2025`}</span>{" "}
                        <br className="sm:hidden" />
                        <span>{`• All rights reserved.`}</span>
                    </div>
                </div>
            </div>

            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                <AsciiVideoPlayer
                    src="/extra/ascii_video.bin"
                    audioSrc="/extra/audio.mp3"
                    width={128}
                    height={72}
                    fps={30}
                    onCanPlayAudio={handleAudioReady}
                />
            </div>
        </div>
    );
}