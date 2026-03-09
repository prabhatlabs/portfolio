"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import SpaceBackground from "./SpaceBackground";
import Spaceship from "./Spaceship";
import Bullet, { Bullet as BulletType } from "./Bullet";
import Enemy, { Enemy as EnemyType } from "./Enemy";
import Boss, { Boss as BossType } from "./Boss";
import HUD from "./HUD";

interface GameProps {
  fireRate?: number;
  maxHealth?: number;
}

export default function Game({
  fireRate = 500,
  maxHealth = 60,
}: GameProps) {
  const router = useRouter();
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(maxHealth);
  
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [bullets, setBullets] = useState<BulletType[]>([]);
  const [enemyBullets, setEnemyBullets] = useState<BulletType[]>([]);
  const [enemies, setEnemies] = useState<EnemyType[]>([]);
  const [boss, setBoss] = useState<BossType | null>(null);
  
  const keysRef = useRef<Set<string>>(new Set());
  const lastFireRef = useRef(0);
  const lastEnemyFireRef = useRef(0);
  const lastEnemySpawnRef = useRef(0);
  const gameTimeRef = useRef(0);
  const bossSpawnedRef = useRef(false);

  const SHIP_SIZE = 60;
  const SHIP_HEIGHT = SHIP_SIZE + 20;
  const MARGIN = 50;
  const SPEED = 8;
  const ENEMY_COLORS = ["#8b5cf6", "#06b6d4", "#f59e0b", "#10b981", "#ec4899"];

  const checkCollision = useCallback(
    (a: { x: number; y: number; w: number; h: number }, b: { x: number; y: number; w: number; h: number }) => {
      return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
    },
    []
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        keysRef.current.add(e.key);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setPlayerPos({
        x: (window.innerWidth - SHIP_SIZE) / 2,
        y: window.innerHeight - SHIP_HEIGHT - MARGIN,
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (gameState !== "playing") return;

    const gameLoop = setInterval(() => {
      gameTimeRef.current += 16;

      setPlayerPos((prev) => {
        let newX = prev.x;
        let newY = prev.y;
        const keys = keysRef.current;

        if (keys.has("ArrowLeft")) newX -= SPEED;
        if (keys.has("ArrowRight")) newX += SPEED;
        if (keys.has("ArrowUp")) newY -= SPEED;
        if (keys.has("ArrowDown")) newY += SPEED;

        const maxX = window.innerWidth - SHIP_SIZE - MARGIN;
        const minY = window.innerHeight * 0.6;
        const maxY = window.innerHeight - SHIP_HEIGHT - MARGIN;

        newX = Math.max(MARGIN, Math.min(newX, maxX));
        newY = Math.max(minY, Math.min(newY, maxY));

        return { x: newX, y: newY };
      });

      const now = Date.now();
      if (now - lastFireRef.current > fireRate) {
        lastFireRef.current = now;
        const bulletSize = Math.random() > 0.5 ? 8 : 5;
        const newBullet: BulletType = {
          id: Math.random(),
          x: playerPos.x + (SHIP_SIZE - bulletSize) / 2,
          y: playerPos.y,
          size: bulletSize,
          speed: 10,
          color: ENEMY_COLORS[Math.floor(Math.random() * ENEMY_COLORS.length)],
          isEnemy: false,
        };
        setBullets((prev) => [...prev, newBullet]);
      }

      if (gameTimeRef.current > 60000 && !bossSpawnedRef.current) {
        bossSpawnedRef.current = true;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        setBoss({
          id: Math.random(),
          x: (windowWidth - 110) / 2,
          y: -120,
          size: 110,
          health: 80,
          maxHealth: 80,
          laserActive: false,
        });
      }

      setEnemies((prev) => {
        const moved = prev.map((e) => ({ ...e, y: e.y + e.speed }));
        if (now - lastEnemySpawnRef.current > 1500) {
          lastEnemySpawnRef.current = now;
          const size = 30 + Math.random() * 20;
          moved.push({
            id: Math.random(),
            x: MARGIN + Math.random() * (window.innerWidth - MARGIN * 2 - size),
            y: -size,
            size,
            speed: 2 + Math.random() * 2,
            health: 3 + Math.floor(Math.random() * 2),
            color: ENEMY_COLORS[Math.floor(Math.random() * ENEMY_COLORS.length)],
          });
        }
        return moved.filter((e) => e.y < window.innerHeight + 50);
      });

      setBullets((prev) => {
        const moved = prev
          .map((b) => ({ ...b, y: b.y - b.speed }))
          .filter((b) => b.y > -20);

        setEnemies((currentEnemies) => {
          let enemiesHit: number[] = [];
          let scoreAdd = 0;

          moved.forEach((bullet) => {
            currentEnemies.forEach((enemy) => {
              if (
                checkCollision(
                  { x: bullet.x, y: bullet.y, w: bullet.size, h: bullet.size },
                  { x: enemy.x, y: enemy.y, w: enemy.size, h: enemy.size }
                )
              ) {
                enemiesHit.push(enemy.id);
                bullet.y = -100;
                scoreAdd += 1;
              }
            });
          });

          if (scoreAdd > 0) {
            setScore((s) => s + scoreAdd);
          }

          return currentEnemies.filter((e) => !enemiesHit.includes(e.id));
        });

        return moved;
      });

      setEnemyBullets((prev) => {
        const moved = prev
          .map((b) => ({ ...b, y: b.y + b.speed }))
          .filter((b) => b.y < window.innerHeight + 50);

        if (!boss && enemies.length > 0 && now - lastEnemyFireRef.current > 2000) {
          lastEnemyFireRef.current = now;
          const shooter = enemies[Math.floor(Math.random() * enemies.length)];
          moved.push({
            id: Math.random(),
            x: shooter.x + shooter.size / 2 - 3,
            y: shooter.y + shooter.size,
            size: 6,
            speed: 6,
            color: "#ef4444",
            isEnemy: true,
          });
        }

        return moved;
      });

      if (boss) {
        setBoss((prev) => {
          if (!prev) return null;
          let newY = prev.y;
          if (newY < window.innerHeight * 0.4 - prev.size) {
            newY += 1;
          }
          const laserActive = newY >= window.innerHeight * 0.4 - prev.size;
          
          if (laserActive) {
            const laserX = prev.x + prev.size / 2 - 15;
            const playerHit = checkCollision(
              { x: playerPos.x, y: playerPos.y, w: SHIP_SIZE, h: SHIP_SIZE },
              { x: laserX, y: prev.y + prev.size, w: 30, h: window.innerHeight }
            );
            if (playerHit) {
              setHealth((h) => {
                const newHealth = h - 1;
                if (newHealth <= 0) setGameState("lost");
                return newHealth;
              });
            }
          }

          return { ...prev, y: newY, laserActive };
        });

        setBullets((prev) => {
          let bossHit = false;
          const moved = prev
            .map((b) => {
              if (
                boss &&
                checkCollision(
                  { x: b.x, y: b.y, w: b.size, h: b.size },
                  { x: boss.x, y: boss.y, w: boss.size, h: boss.size }
                )
              ) {
                bossHit = true;
                return { ...b, y: -100 };
              }
              return b;
            })
            .filter((b) => b.y > -20);

          if (bossHit) {
            setBoss((b) => {
              if (!b) return null;
              const newHealth = b.health - 1;
              if (newHealth <= 0) {
                setScore((s) => s + 10);
                setGameState("won");
                return null;
              }
              return { ...b, health: newHealth };
            });
          }

          return moved;
        });
      }

      setEnemyBullets((prev) => {
        let playerHit = false;
        const moved = prev.map((b) => {
          if (
            checkCollision(
              { x: b.x, y: b.y, w: b.size, h: b.size },
              { x: playerPos.x, y: playerPos.y, w: SHIP_SIZE, h: SHIP_SIZE }
            )
          ) {
            playerHit = true;
            return { ...b, y: window.innerHeight + 100 };
          }
          return b;
        });

        if (playerHit) {
          setHealth((h) => {
            const newHealth = h - 1;
            if (newHealth <= 0) setGameState("lost");
            return newHealth;
          });
        }

        return moved;
      });

      setEnemies((prev) => {
        let enemiesHitPlayer = false;
        const moved = prev.map((e) => {
          if (
            checkCollision(
              { x: e.x, y: e.y, w: e.size, h: e.size },
              { x: playerPos.x, y: playerPos.y, w: SHIP_SIZE, h: SHIP_SIZE }
            )
          ) {
            enemiesHitPlayer = true;
            return { ...e, y: window.innerHeight + 100 };
          }
          return e;
        });

        if (enemiesHitPlayer) {
          setHealth((h) => {
            const newHealth = h - 3;
            if (newHealth <= 0) setGameState("lost");
            return newHealth;
          });
        }

        return moved.filter((e) => e.y < window.innerHeight + 50);
      });
    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameState, playerPos, fireRate, maxHealth, checkCollision, boss, enemies]);

  const handleRestart = () => {
    router.refresh();
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background">
      <SpaceBackground />
      
      {gameState === "playing" && (
        <>
          {enemies.map((enemy) => (
            <Enemy key={enemy.id} enemy={enemy} />
          ))}
          {boss && <Boss boss={boss} />}
          {bullets.map((bullet) => (
            <Bullet key={bullet.id} bullet={bullet} />
          ))}
          {enemyBullets.map((bullet) => (
            <Bullet key={bullet.id} bullet={bullet} />
          ))}
          <Spaceship
            className="z-10"
            shipSize={SHIP_SIZE}
            margin={MARGIN + 20}
            speed={SPEED}
          />
        </>
      )}

      <HUD health={health} maxHealth={maxHealth} score={score} />

      {gameState !== "playing" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-50">
          <h1 className="text-6xl font-bold text-foreground mb-4">
            {gameState === "won" ? "YOU WIN!" : "GAME OVER"}
          </h1>
          <p className="text-2xl text-foreground mb-8">
            Final Score: {score}
          </p>
          <button
            onClick={handleRestart}
            className="px-8 py-4 bg-primary text-primary-foreground text-xl rounded hover:bg-primary/80 transition"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
