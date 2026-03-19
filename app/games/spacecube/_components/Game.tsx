/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect, useRef, useState } from 'react';
import CanvasBackground from './CanvasBackground';
import { GAME_CONFIG, ENEMY_TYPES, Bullet, Enemy as EnemyType } from './types';

const generateId = () => Math.random().toString(36).substring(2, 9);

export default function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [hp, setHp] = useState(100);
  const maxHp = 100;
  const [gameTime, setGameTime] = useState(0);
  const [renderKey, setRenderKey] = useState(0);
  const [playerHit, setPlayerHit] = useState(false);
  const [hitEnemies, setHitEnemies] = useState<Set<string>>(new Set());
  const [powerUpCharge, setPowerUpCharge] = useState(0);
  
  const gameWidth = typeof window !== 'undefined' ? window.innerWidth : 800;
  const gameHeight = typeof window !== 'undefined' ? window.innerHeight : 600;
  
  const [playerX, setPlayerX] = useState(gameWidth / 2 - GAME_CONFIG.PLAYER_SIZE / 2);
  const [playerY, setPlayerY] = useState(gameHeight - GAME_CONFIG.PLAYER_SIZE - 20);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [enemies, setEnemies] = useState<EnemyType[]>([]);
  const [lasers, setLasers] = useState<{ id: string; x: number; y: number }[]>([]);
  const [playerLaser, setPlayerLaser] = useState(false);
  
  const keysRef = useRef<{ left: boolean; right: boolean; up: boolean; down: boolean; space: boolean }>({ left: false, right: false, up: false, down: false, space: false });
  const bulletsRef = useRef<Bullet[]>([]);
  const enemiesRef = useRef<EnemyType[]>([]);
  const playerRef = useRef({ x: gameWidth / 2 - GAME_CONFIG.PLAYER_SIZE / 2, y: gameHeight - GAME_CONFIG.PLAYER_SIZE - 20, hp: 100 });
  const lastPlayerShoot = useRef(0);
  const lastEnemySpawn = useRef(0);
  const lastLaserDamage = useRef(0);
  const lastPlayerLaser = useRef(0);
  const animationRef = useRef<number>(0);
  const scoreRef = useRef(0);
  const playerHpRef = useRef(100);
  const startTimeRef = useRef(0);
  const isInitialized = useRef(false);
  const hitEnemiesRef = useRef<Set<string>>(new Set());
  const playerHitRef = useRef(false);
  const powerUpChargeRef = useRef(0);

  const checkCollision = (x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number) => {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
  };

  const getEnemyScore = (size: number): number => {
    const type = ENEMY_TYPES.find(t => t.size === size);
    return type ? type.score : 5;
  };

  const spawnEnemy = (now: number): EnemyType | null => {
    const has50px = enemiesRef.current.some(e => e.size === 50);
    const currentEnemies = enemiesRef.current.length;
    
    if (currentEnemies >= GAME_CONFIG.MAX_ENEMIES) return null;
    
    const roll = Math.random();
    let typeIndex: number;
    
    if (roll < 0.1 && !has50px) {
      typeIndex = 2;
    } else {
      typeIndex = Math.floor(Math.random() * 2);
    }
    
    const type = ENEMY_TYPES[typeIndex];
    return {
      id: generateId(),
      x: Math.random() * (gameWidth - type.size),
      y: -type.size,
      size: type.size,
      hp: type.hp,
      maxHp: type.hp,
      waveOffset: Math.random() * Math.PI * 2,
      speed: type.speed,
      shootCooldown: now + Math.random() * 1000 + 500,
      isLaser: type.size === 50
    };
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        keysRef.current.space = true;
      }
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keysRef.current.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keysRef.current.right = true;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') keysRef.current.up = true;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') keysRef.current.down = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.code === 'Space') {
        keysRef.current.space = false;
      }
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keysRef.current.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keysRef.current.right = false;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') keysRef.current.up = false;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') keysRef.current.down = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!gameStarted || gameOver || isInitialized.current) return;

    isInitialized.current = true;
    bulletsRef.current = [];
    enemiesRef.current = [];
    playerRef.current = { x: gameWidth / 2 - GAME_CONFIG.PLAYER_SIZE / 2, y: gameHeight - GAME_CONFIG.PLAYER_SIZE - 20, hp: 100 };
    playerHpRef.current = 100;
    scoreRef.current = 0;
    setScore(0);
    setHp(100);
    setGameOver(false);
    setPlayerX(gameWidth / 2 - GAME_CONFIG.PLAYER_SIZE / 2);
    setPlayerY(gameHeight - GAME_CONFIG.PLAYER_SIZE - 20);
    setBullets([]);
    setEnemies([]);
    setPlayerHit(false);
    setHitEnemies(new Set());
    setPowerUpCharge(0);
    setPlayerLaser(false);
    powerUpChargeRef.current = 0;
    lastPlayerShoot.current = Date.now();
    lastEnemySpawn.current = Date.now();
    lastLaserDamage.current = Date.now();
    lastPlayerLaser.current = Date.now();
    startTimeRef.current = Date.now();
    setRenderKey(k => k + 1);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const loop = () => {
      const now = Date.now();
      const elapsed = now - startTimeRef.current;
      setGameTime(elapsed);
      
      let currentX = playerRef.current.x;
      let currentY = playerRef.current.y;
      let currentHp = playerHpRef.current;
      let currentScore = scoreRef.current;

      if (keysRef.current.left) {
        currentX = Math.max(0, currentX - GAME_CONFIG.PLAYER_SPEED);
      }
      if (keysRef.current.right) {
        currentX = Math.min(gameWidth - GAME_CONFIG.PLAYER_SIZE, currentX + GAME_CONFIG.PLAYER_SPEED);
      }
      if (keysRef.current.up) {
        currentY = Math.max(0, currentY - GAME_CONFIG.PLAYER_SPEED);
      }
      if (keysRef.current.down) {
        currentY = Math.min(gameHeight - GAME_CONFIG.PLAYER_SIZE, currentY + GAME_CONFIG.PLAYER_SPEED);
      }

      const isSpaceHeld = keysRef.current.space;
      const hasPower = powerUpChargeRef.current >= GAME_CONFIG.POWER_UP_MAX;

      if (isSpaceHeld && powerUpChargeRef.current > 0) {
        powerUpChargeRef.current -= (GAME_CONFIG.POWER_UP_USE_PER_700MS / 700) * 16.67;
        if (powerUpChargeRef.current < 0) powerUpChargeRef.current = 0;
      } else if (!isSpaceHeld && powerUpChargeRef.current < GAME_CONFIG.POWER_UP_MAX) {
        powerUpChargeRef.current += (GAME_CONFIG.POWER_UP_CHARGE_PER_SEC / 1000) * 16.67;
        if (powerUpChargeRef.current > GAME_CONFIG.POWER_UP_MAX) powerUpChargeRef.current = GAME_CONFIG.POWER_UP_MAX;
      }

      const newLasers: { id: string; x: number; y: number }[] = [];

      if (isSpaceHeld) {
        setPlayerLaser(true);
      } else {
        setPlayerLaser(false);
        if (now - lastPlayerShoot.current > GAME_CONFIG.PLAYER_SHOOT_INTERVAL) {
          bulletsRef.current.push({
            id: generateId(),
            x: currentX + GAME_CONFIG.PLAYER_SIZE / 2 - GAME_CONFIG.BULLET_SIZE / 2,
            y: currentY,
            type: 'playerBullet'
          });
          lastPlayerShoot.current = now;
        }
      }

      if (now - lastEnemySpawn.current > GAME_CONFIG.ENEMY_SPAWN_INTERVAL) {
        const newEnemy = spawnEnemy(now);
        if (newEnemy) {
          enemiesRef.current.push(newEnemy);
        }
        lastEnemySpawn.current = now;
      }

      bulletsRef.current = bulletsRef.current
        .map(b => ({ ...b, y: b.type === 'playerBullet' ? b.y - GAME_CONFIG.BULLET_SPEED : b.y + GAME_CONFIG.BULLET_SPEED }))
        .filter(b => b.y > -10 && b.y < gameHeight + 10);

      enemiesRef.current = enemiesRef.current
        .map(e => ({ ...e, y: e.y + e.speed }))
        .filter(e => e.y < gameHeight + e.size);

      enemiesRef.current.forEach(enemy => {
        const waveAmplitude = enemy.size === 50 ? 100 : 50;
        const waveX = Math.sin(elapsed * 0.002 + enemy.waveOffset) * waveAmplitude;
        const displayX = enemy.x + waveX;
        
        if (enemy.isLaser) {
          newLasers.push({
            id: enemy.id,
            x: displayX + enemy.size / 2 - 3,
            y: enemy.y + enemy.size
          });
        } else {
          if (now > enemy.shootCooldown) {
            bulletsRef.current.push({
              id: generateId(),
              x: displayX + enemy.size / 2 - GAME_CONFIG.BULLET_SIZE / 2,
              y: enemy.y + enemy.size,
              type: 'enemyBullet'
            });
            enemy.shootCooldown = now + Math.random() * 1000 + 1000;
          }
        }
      });

      playerHitRef.current = false;
      hitEnemiesRef.current = new Set();

      enemiesRef.current.forEach(enemy => {
        if (enemy.isLaser) {
          const waveAmplitude = 100;
          const waveX = Math.sin(elapsed * 0.002 + enemy.waveOffset) * waveAmplitude;
          const displayX = enemy.x + waveX;
          const laserX = displayX + enemy.size / 2 - 3;
          if (checkCollision(laserX, enemy.y + enemy.size, 6, gameHeight, currentX, currentY, GAME_CONFIG.PLAYER_SIZE, GAME_CONFIG.PLAYER_SIZE)) {
            if (now - lastLaserDamage.current > GAME_CONFIG.LASER_DAMAGE_INTERVAL) {
              currentHp -= 1;
              playerHitRef.current = true;
              lastLaserDamage.current = now;
            }
          }
        }
      });

      bulletsRef.current.forEach(bullet => {
        if (bullet.type === 'enemyBullet') {
          if (checkCollision(bullet.x, bullet.y, GAME_CONFIG.BULLET_SIZE, GAME_CONFIG.BULLET_SIZE, currentX, currentY, GAME_CONFIG.PLAYER_SIZE, GAME_CONFIG.PLAYER_SIZE)) {
            currentHp -= 1;
            playerHitRef.current = true;
            bullet.y = -100;
          }
        } else {
          enemiesRef.current.forEach(enemy => {
            const waveAmplitude = enemy.size === 50 ? 100 : 50;
            const waveX = Math.sin(elapsed * 0.002 + enemy.waveOffset) * waveAmplitude;
            const displayX = enemy.x + waveX;
            if (checkCollision(bullet.x, bullet.y, GAME_CONFIG.BULLET_SIZE, GAME_CONFIG.BULLET_SIZE, displayX, enemy.y, enemy.size, enemy.size)) {
              enemy.hp -= 1;
              hitEnemiesRef.current.add(enemy.id);
              bullet.y = -100;
              if (enemy.hp <= 0) {
                currentScore += getEnemyScore(enemy.size);
              } else {
                currentScore += 1;
              }
            }
          });
        }
      });

      if (isSpaceHeld && hasPower && now - lastPlayerLaser.current > 100) {
        const playerLaserX = currentX + GAME_CONFIG.PLAYER_SIZE / 2 - 3;
        enemiesRef.current.forEach(enemy => {
          const waveAmplitude = enemy.size === 50 ? 100 : 50;
          const waveX = Math.sin(elapsed * 0.002 + enemy.waveOffset) * waveAmplitude;
          const displayX = enemy.x + waveX;
          if (checkCollision(playerLaserX, 0, 6, currentY, displayX, enemy.y, enemy.size, enemy.size)) {
            enemy.hp -= 1;
            hitEnemiesRef.current.add(enemy.id);
            if (enemy.hp <= 0) {
              currentScore += getEnemyScore(enemy.size);
            } else {
              currentScore += 1;
            }
          }
        });
        lastPlayerLaser.current = now;
      }

      enemiesRef.current = enemiesRef.current.filter(e => e.hp > 0);

      enemiesRef.current.forEach(enemy => {
        const waveAmplitude = enemy.size === 50 ? 100 : 50;
        const waveX = Math.sin(elapsed * 0.002 + enemy.waveOffset) * waveAmplitude;
        const displayX = enemy.x + waveX;
        if (checkCollision(currentX, currentY, GAME_CONFIG.PLAYER_SIZE, GAME_CONFIG.PLAYER_SIZE, displayX, enemy.y, enemy.size, enemy.size)) {
          currentHp = 0;
        }
      });

      playerRef.current.x = currentX;
      playerRef.current.y = currentY;
      playerHpRef.current = currentHp;
      scoreRef.current = currentScore;

      setPlayerX(currentX);
      setPlayerY(currentY);
      setHp(currentHp);
      setScore(currentScore);
      setBullets([...bulletsRef.current]);
      setEnemies([...enemiesRef.current]);
      setLasers(newLasers);
      setPlayerHit(playerHitRef.current);
      setHitEnemies(new Set(hitEnemiesRef.current));
      setPowerUpCharge(powerUpChargeRef.current);

      if (currentHp <= 0) {
        setGameOver(true);
        isInitialized.current = false;
        return;
      }

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [gameStarted, gameOver, renderKey]);

  const hpPercentage = (hp / maxHp) * 100;

  const handleStart = () => {
    setGameStarted(true);
  };

  const handleRestart = () => {
    setGameOver(false);
    isInitialized.current = false;
    setGameStarted(true);
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <CanvasBackground width={gameWidth} height={gameHeight} />

      {gameStarted && !gameOver && (
        <>
          <div
            style={{
              position: 'absolute',
              left: playerX,
              top: playerY,
              width: GAME_CONFIG.PLAYER_SIZE,
              height: GAME_CONFIG.PLAYER_SIZE,
              backgroundColor: playerHit ? '#ff0000' : '#FFFFFF',
              boxShadow: playerHit ? '0 0 10px #ff0000, 0 0 20px #ff0000' : '0 0 10px #FFFFFF, 0 0 20px #FFFFFF',
            }}
          />

          {bullets.map(bullet => (
            <div
              key={bullet.id}
              style={{
                position: 'absolute',
                left: bullet.x,
                top: bullet.y,
                width: GAME_CONFIG.BULLET_SIZE,
                height: GAME_CONFIG.BULLET_SIZE,
                backgroundColor: '#22c55e',
                borderRadius: '1px',
              }}
            />
          ))}

          {playerLaser && (
            <div
              style={{
                position: 'absolute',
                left: playerX + GAME_CONFIG.PLAYER_SIZE / 2 - 3,
                top: 0,
                width: 6,
                height: playerY,
                backgroundColor: '#ff0000',
                boxShadow: '0 0 15px #ff0000, 0 0 30px #ff0000, 0 0 50px #ff0000',
                opacity: 0.9,
              }}
            />
          )}

          {enemies.map(enemy => {
            const waveAmplitude = enemy.size === 50 ? 100 : 50;
            const waveX = Math.sin(gameTime * 0.002 + enemy.waveOffset) * waveAmplitude;
            const displayX = enemy.x + waveX;
            const isHit = hitEnemies.has(enemy.id);
            return (
              <div
                key={enemy.id}
                style={{
                  position: 'absolute',
                  left: displayX,
                  top: enemy.y,
                  width: enemy.size,
                  height: enemy.size,
                  backgroundColor: isHit ? '#ff0000' : '#FFFFFF',
                  boxShadow: enemy.size === 50 ? '0 0 15px #ff0000, 0 0 30px #ff0000' : isHit ? '0 0 8px #ff0000, 0 0 16px #ff0000' : '0 0 8px #FFFFFF, 0 0 16px #FFFFFF',
                }}
              >
                <div style={{ position: 'absolute', top: '-8px', left: '0', width: '100%', height: '4px', backgroundColor: '#333333', borderRadius: '2px' }}>
                  <div style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%`, height: '100%', backgroundColor: '#22c55e', borderRadius: '2px' }} />
                </div>
              </div>
            );
          })}

          {lasers.map(laser => (
            <div
              key={laser.id}
              style={{
                position: 'absolute',
                left: laser.x,
                top: laser.y,
                width: 6,
                height: gameHeight - laser.y,
                backgroundColor: '#ff0000',
                boxShadow: '0 0 15px #ff0000, 0 0 30px #ff0000, 0 0 50px #ff0000',
                opacity: 0.9,
              }}
            />
          ))}

          <div className="absolute top-4 left-4 flex items-center gap-2 z-50">
            <span className="text-white text-sm font-bold">HP:</span>
            <div className="w-32 h-4 bg-gray-800 rounded overflow-hidden border border-gray-600">
              <div
                className="h-full transition-all duration-200"
                style={{
                  width: `${hpPercentage}%`,
                  backgroundColor: hpPercentage > 30 ? '#22c55e' : '#ef4444',
                }}
              />
            </div>
            <span className="text-white text-sm">{hp}/{maxHp}</span>
          </div>

          <div className="absolute top-10 left-4 flex items-center gap-2 z-50">
            <span className="text-yellow-400 text-xs font-bold">SPACE:</span>
            <div className="w-32 h-2 bg-gray-800 rounded overflow-hidden border border-gray-600">
              <div
                className="h-full transition-all duration-200"
                style={{
                  width: `${Math.min(100, (powerUpCharge / GAME_CONFIG.POWER_UP_MAX) * 100)}%`,
                  backgroundColor: powerUpCharge >= GAME_CONFIG.POWER_UP_MAX ? '#ffff00' : '#ca8a04',
                }}
              />
            </div>
            <span className="text-yellow-400 text-xs">{powerUpCharge >= GAME_CONFIG.POWER_UP_MAX ? 'READY' : ''}</span>
          </div>

          <div className="absolute top-4 right-4 z-50">
            <span className="text-white text-lg font-bold">Score: {score}</span>
          </div>
        </>
      )}

      {!gameStarted && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-green-500 mb-4">SPACECUBE</h1>
            <p className="text-white mb-2">WASD or Arrows to move</p>
            <p className="text-white mb-6">Hold SPACE for laser when charged</p>
            <button
              onClick={handleStart}
              className="px-8 py-3 bg-green-600 text-white text-xl font-bold rounded hover:bg-green-500 transition-colors"
            >
              START GAME
            </button>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-red-500 mb-4">GAME OVER</h1>
            <p className="text-white text-2xl mb-2">Final Score: {score}</p>
            <button
              onClick={handleRestart}
              className="px-8 py-3 bg-green-600 text-white text-xl font-bold rounded hover:bg-green-500 transition-colors mt-4"
            >
              PLAY AGAIN
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
