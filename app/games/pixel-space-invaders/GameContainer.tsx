"use client";

import { useEffect, useRef, useState } from "react";
import { COLORS, GAME_HEIGHT, GAME_WIDTH } from "./constants";
import { GameEngine } from "./engine";
import { GameState } from "./types";

export default function GameContainer() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<GameEngine | null>(null);
    const [gameState, setGameState] = useState<GameState>("START");
    const [score, setScore] = useState(0);
    const keys = useRef<Record<string, boolean>>({});

    const startStarfield = useRef<{ x: number; y: number; speed: number }[]>(
        [],
    );

    const startGame = () => {
        engineRef.current = new GameEngine();
        setGameState("PLAYING");
    };

    const drawOverlay = (
        ctx: CanvasRenderingContext2D,
        title: string,
        subtitle: string,
    ) => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        ctx.fillStyle = COLORS.player;
        ctx.font = "bold 40px var(--font-geist-mono)";
        ctx.textAlign = "center";
        ctx.fillText(title, GAME_WIDTH / 2, GAME_HEIGHT / 2 - 20);

        ctx.fillStyle = COLORS.text;
        ctx.font = "20px var(--font-geist-mono)";
        ctx.fillText(subtitle, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30);
    };

    useEffect(() => {
        // Initialize starfield
        startStarfield.current = Array.from({ length: 100 }, () => ({
            x: Math.random() * GAME_WIDTH,
            y: Math.random() * GAME_HEIGHT,
            speed: 0.5 + Math.random() * 2,
        }));

        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                [
                    " ",
                    "ArrowUp",
                    "ArrowDown",
                    "ArrowLeft",
                    "ArrowRight",
                ].includes(e.key)
            ) {
                e.preventDefault();
            }
            keys.current[e.key] = true;
            if (gameState === "START" && (e.key === " " || e.key === "Enter")) {
                startGame();
            }
            if (gameState === "GAMEOVER" && (e.key === "r" || e.key === "R")) {
                startGame();
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            keys.current[e.key] = false;
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        let animationFrameId: number;

        const render = () => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");

            if (ctx && canvas) {
                // Draw starfield background
                ctx.fillStyle = COLORS.background;
                ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

                ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
                startStarfield.current.forEach((star) => {
                    ctx.fillRect(star.x, star.y, 2, 2);
                    star.y += star.speed;
                    if (star.y > GAME_HEIGHT) {
                        star.y = 0;
                        star.x = Math.random() * GAME_WIDTH;
                    }
                });

                if (gameState === "PLAYING" && engineRef.current) {
                    engineRef.current.update(keys.current);
                    engineRef.current.draw(ctx);
                    if (engineRef.current.isGameOver) {
                        setGameState("GAMEOVER");
                        setScore(engineRef.current.score);
                    }
                } else if (gameState === "START") {
                    drawOverlay(
                        ctx,
                        "PIXEL SPACE INVADERS",
                        "PRESS SPACE TO START",
                    );
                } else if (gameState === "GAMEOVER") {
                    drawOverlay(
                        ctx,
                        "GAME OVER",
                        `SCORE: ${score} - PRESS R TO RESTART`,
                    );
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            cancelAnimationFrame(animationFrameId);
        };
    }, [gameState, score]);

    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full max-w-[800px]">
            <div className="relative border-4 border-foreground/20 rounded-lg overflow-hidden shadow-2xl aspect-4/3 w-full">
                <canvas
                    ref={canvasRef}
                    width={GAME_WIDTH}
                    height={GAME_HEIGHT}
                    className="w-full h-full cursor-none block"
                />
            </div>
            <div className="text-muted-foreground font-mono text-sm text-center">
                <p>Move: WASD / ARROWS | Shoot: SPACE</p>
                <p className="mt-2 opacity-50">
                    Hint: Hidden in your portfolio, just for you.
                </p>
            </div>
        </div>
    );
}
