"use client";

import { Fullscreen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

function Video({ src }: { src: string }) {
    const [mounted, setMounted] = useState(false);
    const ref = useRef<HTMLVideoElement>(null);
    const handleFullscreen = () => {
        if (ref.current) {
            ref.current.requestFullscreen();
        }
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }
    return (
        <div className="relative w-full overflow-hidden rounded-lg aspect-video object-cover">
            <video
                ref={ref}
                muted
                autoPlay
                loop
                src={src}
                className="rounded-md"
                style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                }}
            />
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
