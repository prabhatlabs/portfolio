export type GameState = "START" | "PLAYING" | "BOSS" | "GAMEOVER" | "PAUSED";

export interface Entity {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Player extends Entity {
    hp: number;
    maxHp: number;
}

export interface Enemy extends Entity {
    alive: boolean;
    row: number;
    col: number;
    targetY: number; // For descending entry
}

export interface Boss extends Entity {
    hp: number;
    maxHp: number;
    alive: boolean;
    laserActive: boolean;
    laserX: number;
    laserTimer: number; // Time spent tracking player in range
    lastTrackTime: number; // For delayed following
}

export interface Bullet extends Entity {
    active: boolean;
    timestamp: number;
    isEnemy: boolean;
    vx?: number;
    vy?: number;
}

export interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
}

export interface GameStats {
    score: number;
    wave: number;
}
