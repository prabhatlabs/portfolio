'use client';

import { Bullet as BulletType, GAME_CONFIG } from './types';

interface BulletProps {
  bullet: BulletType;
}

export default function Bullet({ bullet }: BulletProps) {
  const isPlayerBullet = bullet.type === 'playerBullet';

  return (
    <div
      className="absolute"
      style={{
        left: bullet.x,
        top: bullet.y,
        width: GAME_CONFIG.BULLET_SIZE,
        height: GAME_CONFIG.BULLET_SIZE,
        backgroundColor: isPlayerBullet ? '#22c55e' : '#ef4444',
      }}
    />
  );
}
