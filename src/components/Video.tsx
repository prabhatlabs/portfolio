"use client";

import { Fullscreen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

function Video({ src, placeholder }: { src: string; placeholder?: string }) {
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setInView(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.25 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const handleFullscreen = () => {
        if (videoRef.current) {
            videoRef.current.requestFullscreen();
        }
    };
    return (
        <div
            ref={ref}
            className="relative w-full overflow-hidden rounded-lg aspect-video object-cover"
        >
            {inView ? (
                <video
                    ref={videoRef}
                    muted
                    autoPlay
                    loop
                    preload="none"
                    src={src}
                    poster={placeholder}
                    className="rounded-md"
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                    }}
                />
            ) : (
                <div className="w-full h-full bg-gray-800 animate-pulse rounded-md" />
            )}
            <Button
                className="absolute bottom-0 right-0 m-2"
                variant={"secondary"}
                size={"icon"}
                onClick={handleFullscreen}
            >
                <Fullscreen />
            </Button>
        </div>
    );
}

export default Video;
