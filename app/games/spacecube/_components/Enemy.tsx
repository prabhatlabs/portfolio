'use client';

import { Enemy as EnemyType } from './types';

interface EnemyProps {
  enemy: EnemyType;
  time: number;
}

export default function Enemy({ enemy, time }: EnemyProps) {
  const waveX = Math.sin(time * 0.002 + enemy.waveOffset) * 50;
  const displayX = enemy.x + waveX;

  const hpPercentage = Math.max(0, (enemy.hp / enemy.maxHp) * 100);

  return (
    <div
      className="absolute"
      style={{
        left: displayX,
        top: enemy.y,
        width: enemy.size,
        height: enemy.size,
        backgroundColor: '#ef4444',
        boxShadow: '0 0 8px #ef4444, 0 0 16px #ef4444',
      }}
    >
      <div
        className="absolute -top-3 left-0 right-0 h-1 bg-red-800"
        style={{ width: '100%' }}
      >
        <div
          className="h-full bg-green-500"
          style={{ width: `${hpPercentage}%` }}
        />
      </div>
    </div>
  );
}
