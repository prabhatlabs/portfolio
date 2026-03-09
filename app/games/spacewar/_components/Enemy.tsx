"use client";

export interface Enemy {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  health: number;
  color: string;
}

interface EnemyProps {
  enemy: Enemy;
}

export default function Enemy({ enemy }: EnemyProps) {
  return (
    <div
      className="absolute"
      style={{
        left: enemy.x,
        top: enemy.y,
        width: enemy.size,
        height: enemy.size,
        backgroundColor: enemy.color,
        boxShadow: `0 0 8px ${enemy.color}`,
      }}
    />
  );
}
