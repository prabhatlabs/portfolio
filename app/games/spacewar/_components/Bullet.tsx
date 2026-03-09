"use client";

export interface Bullet {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  isEnemy: boolean;
}

interface BulletProps {
  bullet: Bullet;
}

export default function Bullet({ bullet }: BulletProps) {
  return (
    <div
      className="absolute"
      style={{
        left: bullet.x,
        top: bullet.y,
        width: bullet.size,
        height: bullet.size,
        backgroundColor: bullet.color,
        boxShadow: `0 0 6px ${bullet.color}`,
      }}
    />
  );
}
