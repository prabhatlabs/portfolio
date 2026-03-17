'use client';

import { GAME_CONFIG } from './types';

interface PlayerProps {
  x: number;
}

export default function Player({ x }: PlayerProps) {
  const playerY = GAME_CONFIG.CANVAS_HEIGHT - GAME_CONFIG.PLAYER_SIZE - 20;
  
  return (
    <div
      className="absolute"
      style={{
        left: x,
        top: playerY,
        width: GAME_CONFIG.PLAYER_SIZE,
        height: GAME_CONFIG.PLAYER_SIZE,
        backgroundColor: '#22c55e',
        boxShadow: '0 0 10px #22c55e, 0 0 20px #22c55e',
      }}
    />
  );
}
