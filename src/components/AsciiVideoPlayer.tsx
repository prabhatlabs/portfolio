"use client";

import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const DENSITY_STRING = [
    " ",
    "·",
    "･",
    ".",
    "˙",
    "。",
    "､",
    "､",
    "､",
    ":",
    ";",
    ",",
    "丶",
    "っ",
    "つ",
    "i",
    "l",
    "|",
    "I",
    "!",
    "¡",
    "の",
    "へ",
    "て",
    "c",
    "r",
    "v",
    "u",
    "n",
    "め",
    "る",
    "ぬ",
    "a",
    "e",
    "o",
    "あ",
    "お",
    "s",
    "x",
    "z",
    "ま",
    "ほ",
    "m",
    "w",
    "ぼ",
    "ぽ",
    "二",
    "三",
    "十",
    "干",
    "工",
    "王",
    "田",
    "由",
    "甲",
    "申",
    "白",
    "百",
    "国",
    "園",
    "圓",
    "滿",
    "黒",
    "▓",
    "█",
];

interface FrameData {
    chars: Uint8Array;
    colors: Uint8Array;
}

export default function AsciiVideoPlayer({
    src,
    audioSrc,
    width = 128,
    height = 72,
    fps = 30,
    onCanPlayAudio,
}: {
    src: string;
    audioSrc?: string;
    width?: number;
    height?: number;
    fps?: number;
    onCanPlayAudio?: (unmute: () => void) => void;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioRef = useRef<HTMLVideoElement | null>(null);
    const frameDataRef = useRef<FrameData[]>([]);
    const currentFrameRef = useRef(0);
    const rafRef = useRef<number | null>(null);
    const startedRef = useRef(false);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dimensions, setDimensions] = useState({ width, height });
    const [isPlaying, setIsPlaying] = useState(false);

    /* ----------------------------- LOAD DATA ----------------------------- */

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setIsLoading(true);

                const res = await fetch(src);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                const buffer = await res.arrayBuffer();
                const [w, h, frames] = parseBinaryData(buffer);

                if (cancelled) return;

                frameDataRef.current = frames;
                currentFrameRef.current = 0;
                setDimensions({ width: w, height: h });
                setIsLoading(false);

                if (!audioSrc) {
                    startedRef.current = true;
                    startSilentPlayback();
                }
            } catch (e) {
                setError(e instanceof Error ? e.message : "Unknown error");
                setIsLoading(false);
            }
        }

        load();
        return () => {
            cancelled = true;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [src, audioSrc, width, height, fps]);

    /* ----------------------------- AUDIO MODE ----------------------------- */

    useEffect(() => {
        onCanPlayAudio?.(() => {
            if (!audioRef.current) return;
            audioRef.current.muted = !audioRef.current.muted;
            audioRef.current.play();
        });
    }, [audioRef, onCanPlayAudio]); 

    /* ----------------------------- PLAYBACK ----------------------------- */

    function startSilentPlayback() {
        const frameDuration = 1000 / fps;
        let last = performance.now();

        const loop = (now: number) => {
            if (!startedRef.current) return;

            if (now - last >= frameDuration) {
                last = now;
                renderFrame(currentFrameRef.current);
                currentFrameRef.current =
                    (currentFrameRef.current + 1) % frameDataRef.current.length;
            }

            rafRef.current = requestAnimationFrame(loop);
        };

        rafRef.current = requestAnimationFrame(loop);
    }

    function startAudioPlayback() {
        const frameDuration = 1 / fps;
        const totalFrames = frameDataRef.current.length;

        const loop = () => {
            const audio = audioRef.current;
            if (!audio || audio.paused) {
                rafRef.current = requestAnimationFrame(loop);
                return;
            }

            const index = Math.floor(
                (audio.currentTime / frameDuration) % totalFrames
            );

            if (index !== currentFrameRef.current) {
                currentFrameRef.current = index;
                renderFrame(index);
            }

            rafRef.current = requestAnimationFrame(loop);
        };

        rafRef.current = requestAnimationFrame(loop);
    }

    /* ----------------------------- RENDER ----------------------------- */

    function renderFrame(index: number) {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const frame = frameDataRef.current[index];
        if (!frame) return;

        const cw = canvas.width / dimensions.width;
        const ch = canvas.height / dimensions.height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = `bold ${Math.floor(ch)}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (let i = 0; i < frame.chars.length; i++) {
            const x = (i % dimensions.width) * cw;
            const y = Math.floor(i / dimensions.width) * ch;

            const c = frame.colors.subarray(i * 3, i * 3 + 3);
            ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},0.5)`;
            ctx.fillRect(x, y, cw, ch);

            // ctx.fillStyle = "rgba(255,255,255,0.5)";
            ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
            ctx.fillText(
                DENSITY_STRING[frame.chars[i]],
                x + cw / 2,
                y + ch / 2
            );
        }
    }

    /* ----------------------------- UI ----------------------------- */

    if (error) {
        return <div className="p-4 text-destructive">Error: {error}</div>;
    }

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader className="size-5 animate-spin" />
            </div>
        );
    }

    return (
        <div className="relative h-full w-full overflow-hidden bg-black">
            {audioSrc && !isPlaying && (
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <h3 className="text-3xl text-white">paused</h3>
                </div>
            )}

            <div className="absolute inset-0 z-10">
                <video
                    src={audioSrc}
                    ref={audioRef}
                    muted
                    autoPlay
                    playsInline
                    loop
                    // className="hidden"
                    // controls
                    onPlay={(e) => {
                        // e.preventDefault();
                        if (!startedRef.current) {
                            startedRef.current = true;
                            startAudioPlayback();
                        }
                    }}
                    onPlaying={() => {
                        setIsPlaying(true);
                    }}
                    onPause={() => {
                        setIsPlaying(false);
                    }}
                />
            </div>

            <canvas
                ref={canvasRef}
                width={dimensions.width * 12}
                height={dimensions.height * 12}
                className="block bg-background w-full h-full object-cover"
            />
        </div>
    );
}

/* ----------------------------- PARSER ----------------------------- */

function parseBinaryData(buffer: ArrayBuffer): [number, number, FrameData[]] {
    const u8 = new Uint8Array(buffer);
    const view = new DataView(buffer);

    if (String.fromCharCode(u8[0], u8[1], u8[2], u8[3]) !== "ASCI") {
        throw new Error("Invalid ASCI file");
    }

    let o = 4;
    const w = view.getUint16(o, true);
    o += 2;
    const h = view.getUint16(o, true);
    o += 2;
    o += 2;
    const total = view.getUint32(o, true);
    o += 4;

    const pixels = w * h;
    const frames: FrameData[] = [];

    for (let f = 0; f < total; f++) {
        const chars = new Uint8Array(pixels);
        const colors = new Uint8Array(pixels * 3);

        for (let i = 0; i < pixels; i++) {
            const base = o + (f * pixels + i) * 4;
            chars[i] = u8[base];
            colors[i * 3] = u8[base + 1];
            colors[i * 3 + 1] = u8[base + 2];
            colors[i * 3 + 2] = u8[base + 3];
        }

        frames.push({ chars, colors });
    }

    return [w, h, frames];
}
