"use client";

import AsciiVideoPlayer from "@/components/AsciiVideoPlayer";
import { Button } from "@/components/ui/button";
import { Speaker } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function VideoComp() {
    const [unmuteAudio, setUnmuteAudio] = useState<(() => void) | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    // const hasUnmutedRef = useRef(false);

    const handleAudioReady = useCallback((unmuteFn: () => void) => {
        setUnmuteAudio(() => unmuteFn);
    }, []);

    // Keyboard shortcut (unchanged)
    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === ".") {
                unmuteAudio?.();
            }
        };
        document.addEventListener("keydown", handleKeydown);
        return () => document.removeEventListener("keydown", handleKeydown);
    }, [unmuteAudio]);

    // Auto-unmute when in view
    // useEffect(() => {
    //     if (!containerRef.current || !unmuteAudio) return;

    //     const observer = new IntersectionObserver(
    //         ([entry]) => {
    //             if (entry.isIntersecting && !hasUnmutedRef.current) {
    //                 unmuteAudio();
    //                 hasUnmutedRef.current = true;
    //             }
    //         },
    //         {
    //             threshold: 0.4, // 40% visible
    //         }
    //     );

    //     observer.observe(containerRef.current);

    //     return () => observer.disconnect();
    // }, [unmuteAudio]);

    return (
        <div ref={containerRef} className="w-full h-[500px] relative border-b">
            {unmuteAudio && (
                <Button
                    onClick={() => unmuteAudio()}
                    className="absolute bottom-0 right-0 m-4 z-50"
                    size="icon"
                >
                    <Speaker />
                </Button>
            )}

            <div className="w-full h-full flex items-center justify-center">
                <AsciiVideoPlayer
                    src="/extra/ascii_video.bin"
                    audioSrc="/extra/bg_audio.mp3"
                    width={96}
                    height={54}
                    fps={30}
                    onCanPlayAudio={handleAudioReady}
                />
            </div>
        </div>
    );
}
