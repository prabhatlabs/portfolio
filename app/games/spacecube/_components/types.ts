export type EntityType = 'player' | 'enemy' | 'playerBullet' | 'enemyBullet';

export interface Position {
  x: number;
  y: number;
}

export interface Bullet {
  id: string;
  x: number;
  y: number;
  type: 'playerBullet' | 'enemyBullet';
}

export interface Enemy {
  id: string;
  x: number;
  y: number;
  size: 30 | 40 | 50;
  hp: number;
  maxHp: number;
  waveOffset: number;
  speed: number;
  shootCooldown: number;
  isLaser?: boolean;
}

export interface GameState {
  player: {
    x: number;
    y: number;
    hp: number;
    maxHp: number;
  };
  bullets: Bullet[];
  enemies: Enemy[];
  score: number;
  isGameOver: boolean;
  isPlaying: boolean;
}

export const GAME_CONFIG = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
  PLAYER_SIZE: 30,
  PLAYER_HP: 100,
  PLAYER_SPEED: 8,
  PLAYER_SHOOT_INTERVAL: 300,
  BULLET_SIZE: 7,
  BULLET_SPEED: 10,
  ENEMY_SPAWN_INTERVAL: 2000,
  ENEMY_SHOOT_INTERVAL_MIN: 1000,
  ENEMY_SHOOT_INTERVAL_MAX: 2000,
  STAR_COUNT: 100,
  MAX_ENEMIES: 8,
  LASER_DAMAGE_INTERVAL: 300,
} as const;

export const ENEMY_TYPES: Array<{ size: 30 | 40 | 50; hp: number; speed: number; rare: boolean; score: number }> = [
  { size: 30, hp: 2, speed: 2, rare: false, score: 5 },
  { size: 40, hp: 4, speed: 1.5, rare: false, score: 7 },
  { size: 50, hp: 6, speed: 0.5, rare: true, score: 10 },
];
