"use client";

import { cn } from "@/lib/utils";
import { Fullscreen, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import LoadingCircle from "./LoadingCircle";
import { Button } from "./ui/button";

function Video({
    src,
    placeholder,
    className,
    hideButton,
}: {
    src: string;
    placeholder?: string;
    className?: string;
    hideButton?: boolean;
}) {
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

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

    // Handle video events to sync play state
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => setIsPlaying(false);

        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);
        video.addEventListener("ended", handleEnded);

        return () => {
            video.removeEventListener("play", handlePlay);
            video.removeEventListener("pause", handlePause);
            video.removeEventListener("ended", handleEnded);
        };
    }, [inView]);

    // Try to autoplay when video is ready
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !inView) return;

        const attemptAutoplay = async () => {
            try {
                await video.play();
                setIsPlaying(true);
            } catch (error) {
                console.log("Autoplay prevented:", error);
                setIsPlaying(false);
            }
        };

        // Try autoplay when video can play
        const handleCanPlay = () => {
            setLoading(false);
            attemptAutoplay();
        };

        video.addEventListener("canplay", handleCanPlay);

        return () => {
            video.removeEventListener("canplay", handleCanPlay);
        };
    }, [inView]);

    const togglePlayPause = async () => {
        if (!videoRef.current) return;

        try {
            if (videoRef.current.paused) {
                await videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        } catch (error) {
            console.error("Error toggling play/pause:", error);
        }
    };

    const handleFullscreen = () => {
        if (videoRef.current) {
            videoRef.current.requestFullscreen();
        }
    };

    return (
        <div
            ref={ref}
            className={cn(
                "relative w-full overflow-hidden rounded-lg aspect-video object-cover",
                className
            )}
        >
            {inView ? (
                <video
                    ref={videoRef}
                    muted
                    loop
                    preload="metadata"
                    src={src}
                    poster={placeholder}
                    onWaiting={() => setLoading(true)}
                    onLoadStart={() => setLoading(true)}
                    onLoadedData={() => setLoading(false)}
                    onCanPlayThrough={() => setLoading(false)}
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                    }}
                />
            ) : (
                <div className="w-full h-full bg-background animate-pulse rounded-lg" />
            )}
            {loading && (
                <div className="absolute top-0 left-0 w-full h-full bg-background/40 rounded-lg flex items-center justify-center">
                    <LoadingCircle className="size-5" />
                </div>
            )}
            {!hideButton && (
                <>
                    <Button
                        className="absolute bottom-0 left-0 m-2"
                        variant={"secondary"}
                        size={"icon"}
                        onClick={togglePlayPause}
                    >
                        {isPlaying ? <Pause /> : <Play />}
                    </Button>
                    <Button
                        className="absolute bottom-0 right-0 m-2"
                        variant={"secondary"}
                        size={"icon"}
                        onClick={handleFullscreen}
                    >
                        <Fullscreen />
                    </Button>
                </>
            )}
        </div>
    );
}

export default Video;
