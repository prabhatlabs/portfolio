"use client";

import { useEffect, useState } from "react";
import { FaSpaceShuttle } from "react-icons/fa";

interface SpaceshipProps {
  className?: string;
  shipSize?: number;
  margin?: number;
  speed?: number;
}

export default function Spaceship({
  className,
  shipSize = 40,
  margin = 50,
  speed = 8,
}: SpaceshipProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [keys, setKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleResize = () => {
      const initialX = (window.innerWidth - shipSize) / 2;
      const initialY = window.innerHeight - shipSize - margin;
      setPosition({ x: initialX, y: initialY });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [shipSize, margin]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        setKeys((prev) => new Set(prev).add(e.key));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys((prev) => {
        const next = new Set(prev);
        next.delete(e.key);
        return next;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        if (keys.has("ArrowLeft")) newX -= speed;
        if (keys.has("ArrowRight")) newX += speed;
        if (keys.has("ArrowUp")) newY -= speed;
        if (keys.has("ArrowDown")) newY += speed;

        const maxX = window.innerWidth - shipSize - margin;
        const minY = window.innerHeight * 0.4;
        const maxY = window.innerHeight - shipSize - margin;

        newX = Math.max(margin, Math.min(newX, maxX));
        newY = Math.max(minY, Math.min(newY, maxY));

        return { x: newX, y: newY };
      });
    }, 16);

    return () => clearInterval(interval);
  }, [keys, shipSize, margin, speed]);

  return (
    <div
      className={`absolute ${className}`}
      style={{
        left: position.x,
        top: position.y,
        width: shipSize,
        height: shipSize + 20,
      }}
    >
      <FaSpaceShuttle
        className="w-full h-full text-foreground"
        style={{ transform: "rotate(-90deg)" }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0"
        style={{
          width: 0,
          height: 0,
          borderLeft: "3px solid transparent",
          borderRight: "3px solid transparent",
          borderTop: "10px solid #f97316",
          filter: "blur(1px)",
          animation: "flicker 0.15s infinite alternate",
        }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0"
        style={{
          width: 0,
          height: 0,
          borderLeft: "2px solid transparent",
          borderRight: "2px solid transparent",
          borderTop: "8px solid #eab308",
          filter: "blur(0.5px)",
          animation: "flicker 0.12s infinite alternate-reverse",
        }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 ml-1.75"
        style={{
          width: 0,
          height: 0,
          borderLeft: "3px solid transparent",
          borderRight: "3px solid transparent",
          borderTop: "10px solid #f97316",
          filter: "blur(1px)",
          animation: "flicker 0.15s infinite alternate",
        }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 ml-1.5"
        style={{
          width: 0,
          height: 0,
          borderLeft: "2px solid transparent",
          borderRight: "2px solid transparent",
          borderTop: "8px solid #eab308",
          filter: "blur(0.5px)",
          animation: "flicker 0.12s infinite alternate-reverse",
        }}
      />
      <style jsx>{`
        @keyframes flicker {
          0% { opacity: 0.8; transform: translateX(-50%) scaleY(1); }
          100% { opacity: 1; transform: translateX(-50%) scaleY(1.15); }
        }
      `}</style>
    </div>
  );
}
