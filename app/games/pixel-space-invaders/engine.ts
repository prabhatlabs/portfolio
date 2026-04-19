import {
    BULLET_SIZE,
    BULLET_SPEED,
    COLORS,
    ENEMY_DESCEND_STEP,
    ENEMY_SIZE,
    ENEMY_SPACING,
    ENEMY_SPEED_INITIAL,
    GAME_HEIGHT,
    GAME_WIDTH,
    PARTICLE_COUNT,
    PARTICLE_LIFESPAN,
    PLAYER_SIZE,
    PLAYER_SPEED,
} from "./constants";
import { Boss, Bullet, Enemy, Entity, Particle, Player } from "./types";

export class GameEngine {
    player: Player;
    enemies: Enemy[] = [];
    bullets: Bullet[] = [];
    particles: Particle[] = [];
    boss: Boss | null = null;
    score: number = 0;
    wave: number = 1;
    enemyDirection: number = 1;
    enemySpeed: number = ENEMY_SPEED_INITIAL;
    isGameOver: boolean = false;
    isEntering: boolean = true;
    mode: "MINIONS" | "BOSS" = "MINIONS";
    groupY: number = -400;

    constructor() {
        this.player = {
            x: GAME_WIDTH / 2 - PLAYER_SIZE / 2,
            y: GAME_HEIGHT - PLAYER_SIZE - 20,
            width: PLAYER_SIZE,
            height: PLAYER_SIZE,
            hp: 100,
            maxHp: 100,
            laserPower: 100,
            isLaserActive: false,
        };
        this.initEnemies();
    }

    initEnemies() {
        this.enemies = [];
        this.isEntering = true;
        this.groupY = -400; // Reset group start position

        const count = 6 + Math.floor(Math.random() * 5); // 6 to 10 enemies
        const patternType = (this.wave - 1) % 4; // 0: Up Arrow, 1: Down Arrow, 2: Angle /, 3: Angle \

        const startX = GAME_WIDTH / 2;
        const spacing = ENEMY_SIZE + ENEMY_SPACING;

        for (let i = 0; i < count; i++) {
            let x = 0;
            let targetY = 0;

            if (patternType === 0) {
                // Upward Arrow
                const mid = Math.floor(count / 2);
                x = startX + (i - mid) * spacing;
                targetY = 100 + Math.abs(i - mid) * 35;
            } else if (patternType === 1) {
                // Downward Arrow
                const mid = Math.floor(count / 2);
                x = startX + (i - mid) * spacing;
                targetY = 200 - Math.abs(i - mid) * 35;
            } else if (patternType === 2) {
                // Angle /
                const totalW = count * spacing;
                x = startX - totalW / 2 + i * spacing;
                targetY = 100 + (count - i) * 25;
            } else {
                // Angle \
                const totalW = count * spacing;
                x = startX - totalW / 2 + i * spacing;
                targetY = 100 + i * 25;
            }

            this.enemies.push({
                x: x - ENEMY_SIZE / 2,
                y: this.groupY + targetY,
                targetY,
                width: ENEMY_SIZE,
                height: ENEMY_SIZE,
                alive: true,
                row: 0,
                col: i,
            });
        }
    }

    initBoss() {
        this.mode = "BOSS";
        const bossHp = 30 + this.wave * 2;
        this.boss = {
            x: GAME_WIDTH / 2 - 50,
            y: -150,
            width: 100,
            height: 60,
            hp: bossHp,
            maxHp: bossHp,
            alive: true,
            laserActive: false,
            laserX: 0,
            laserTimer: 0,
            lastTrackTime: Date.now(),
        };
    }

    update(keys: Record<string, boolean>) {
        if (this.isGameOver) return;

        // Player movement
        if ((keys["ArrowLeft"] || keys["a"]) && this.player.x > 0) {
            this.player.x -= PLAYER_SPEED;
        }
        if (
            (keys["ArrowRight"] || keys["d"]) &&
            this.player.x < GAME_WIDTH - this.player.width
        ) {
            this.player.x += PLAYER_SPEED;
        }

        // Laser logic
        const canUseLaser =
            (keys["ArrowUp"] || keys["w"]) && this.player.laserPower > 0;

        if (canUseLaser) {
            this.player.isLaserActive = true;
            this.player.laserPower = Math.max(0, this.player.laserPower - 0.25); // Slightly faster drain
            if (this.player.laserPower === 0) {
                this.player.isLaserActive = false;
            }
        } else {
            this.player.isLaserActive = false;
            this.player.laserPower = Math.min(
                100,
                this.player.laserPower + 0.1,
            ); // Slightly faster recharge
        }

        // Shooting (disable while laser is active for balance)
        if (!this.player.isLaserActive && (keys[" "] || keys["Enter"])) {
            this.shoot();
        }

        // Bullets movement
        this.bullets.forEach((bullet) => {
            if (bullet.isEnemy) {
                // Diagonal or vertical movement
                bullet.y += bullet.vy ?? BULLET_SPEED * 0.6;
                if (bullet.vx) bullet.x += bullet.vx;

                // Hit player?
                if (this.checkCollision(bullet, this.player)) {
                    bullet.active = false;
                    this.player.hp -= 1;
                    this.createExplosion(
                        this.player.x + this.player.width / 2,
                        this.player.y,
                        COLORS.player,
                        3,
                    );
                }
            } else {
                bullet.y -= bullet.vy ?? BULLET_SPEED;
                if (bullet.vx) bullet.x += bullet.vx;
            }
            if (
                bullet.y < -50 ||
                bullet.y > GAME_HEIGHT + 50 ||
                bullet.x < -50 ||
                bullet.x > GAME_WIDTH + 50
            )
                bullet.active = false;
        });
        this.bullets = this.bullets.filter((b) => b.active);

        if (this.mode === "MINIONS") {
            this.updateMinions();
        } else {
            this.updateBoss();
        }

        // Laser damage logic
        if (this.player.isLaserActive) {
            const lx = this.player.x + this.player.width / 2;
            const laserWidth = 10;

            if (this.mode === "MINIONS") {
                this.enemies.forEach((enemy) => {
                    if (enemy.alive) {
                        const ex1 = enemy.x;
                        const ex2 = enemy.x + enemy.width;
                        if (
                            lx + laserWidth / 2 > ex1 &&
                            lx - laserWidth / 2 < ex2
                        ) {
                            enemy.alive = false;
                            this.score += 10;
                            this.createExplosion(
                                enemy.x + enemy.width / 2,
                                enemy.y + enemy.height / 2,
                                COLORS.enemy,
                            );
                        }
                    }
                });
            } else if (this.boss && this.boss.alive) {
                const bx1 = this.boss.x;
                const bx2 = this.boss.x + this.boss.width;
                if (lx + laserWidth / 2 > bx1 && lx - laserWidth / 2 < bx2) {
                    this.boss.hp -= 0.1; // Laser deals continuous small damage
                    if (Math.random() < 0.1)
                        this.createExplosion(
                            lx,
                            this.boss.y + this.boss.height,
                            COLORS.player,
                            1,
                        );
                    if (this.boss.hp <= 0) {
                        this.boss.hp = 0;
                    }
                }
            }
        }

        // Particles
        this.particles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
        });
        this.particles = this.particles.filter((p) => p.life > 0);

        if (this.player.hp <= 0) {
            this.isGameOver = true;
            this.player.hp = 0;
        }
    }

    updateMinions() {
        let shouldStepDown = false;

        // Group entry
        if (this.isEntering) {
            this.groupY += 4;
            this.enemies.forEach((e) => {
                const targetYForEnemy = e.targetY;
                if (e.y < targetYForEnemy) {
                    e.y += 4;
                    if (e.y > targetYForEnemy) e.y = targetYForEnemy;
                }
            });
            if (this.enemies.every((e) => e.y >= e.targetY)) {
                this.isEntering = false;
            }
        } else {
            this.enemies.forEach((enemy) => {
                if (!enemy.alive) return;
                enemy.x += this.enemyDirection * this.enemySpeed;
                if (enemy.x <= 0 || enemy.x >= GAME_WIDTH - enemy.width) {
                    shouldStepDown = true;
                }
                if (enemy.y + enemy.height >= this.player.y) {
                    this.isGameOver = true;
                }
            });

            // Enemy Shooting logic: Reduced base rate from 0.08 to 0.03
            const shootProbability = 0.03 + this.wave * 0.005;
            if (Math.random() < shootProbability) {
                this.enemyShoot();
            }
        }

        if (shouldStepDown && !this.isEntering) {
            this.enemyDirection *= -1;
            this.enemies.forEach((enemy) => {
                if (enemy.alive) enemy.y += ENEMY_DESCEND_STEP;
            });
            this.enemySpeed += 0.05;
        }

        // Minion collisions
        this.bullets.forEach((bullet) => {
            if (bullet.isEnemy) return;
            this.enemies.forEach((enemy) => {
                if (enemy.alive && this.checkCollision(bullet, enemy)) {
                    bullet.active = false;
                    enemy.alive = false;
                    this.score += 10;
                    this.createExplosion(
                        enemy.x + enemy.width / 2,
                        enemy.y + enemy.height / 2,
                        COLORS.enemy,
                    );
                }
            });
        });

        if (this.enemies.every((e) => !e.alive)) {
            this.initBoss();
        }
    }

    enemyShoot() {
        // Find bottom enemies
        const columns: Record<number, Enemy> = {};
        this.enemies.forEach((e) => {
            if (e.alive) {
                if (!columns[e.col] || columns[e.col].y < e.y) {
                    columns[e.col] = e;
                }
            }
        });

        const bottomEnemies = Object.values(columns);
        if (bottomEnemies.length === 0) return;

        const shooter =
            bottomEnemies[Math.floor(Math.random() * bottomEnemies.length)];
        this.bullets.push({
            x: shooter.x + shooter.width / 2 - BULLET_SIZE / 2,
            y: shooter.y + shooter.height,
            width: BULLET_SIZE,
            height: BULLET_SIZE,
            active: true,
            timestamp: Date.now(),
            isEnemy: true,
        });
    }

    updateBoss() {
        if (!this.boss) return;

        // Entry
        if (this.boss.y < 80) {
            this.boss.y += 2;
            return;
        }

        // 1. Follow Player with more delay/inertia
        const targetX =
            this.player.x + this.player.width / 2 - this.boss.width / 2;
        const dx = targetX - this.boss.x;
        // Use a smaller factor for more "lag" feel
        const followFactor = 0.02 + this.wave * 0.005;
        this.boss.x += dx * followFactor;

        // 2. Laser Logic: Charge and Fire continuous while in range
        const bossCenterX = this.boss.x + this.boss.width / 2;
        const playerCenterX = this.player.x + this.player.width / 2;
        const inRange =
            Math.abs(bossCenterX - playerCenterX) < this.boss.width / 2;

        if (inRange) {
            this.boss.laserTimer += 16.67;
            if (this.boss.laserTimer >= 100) {
                this.boss.laserActive = true;
            }
        } else {
            this.boss.laserActive = false;
            this.boss.laserTimer = Math.max(0, this.boss.laserTimer - 20); // Cool down when losing focus
        }

        // 3. Laser Tracking and Damage
        if (this.boss.laserActive) {
            this.boss.laserX = bossCenterX;
            if (Math.abs(playerCenterX - this.boss.laserX) < 25) {
                this.player.hp -= 0.16; // Approx 10hp per second at 60fps
            }
        }

        // 4. Continuous Boss Bullets (independent of laser)
        if (Math.random() < 0.028) {
            this.bossShootDiagonal();
        }

        // Boss collisions
        this.bullets.forEach((bullet) => {
            if (bullet.isEnemy) return;
            if (
                this.boss &&
                this.boss.alive &&
                this.checkCollision(bullet, this.boss)
            ) {
                bullet.active = false;
                this.boss.hp -= 1;
                this.createExplosion(bullet.x, bullet.y, COLORS.player);
                if (this.boss.hp <= 0) {
                    this.boss.alive = false;
                    this.score += 500;
                    this.createExplosion(
                        this.boss.x + this.boss.width / 2,
                        this.boss.y + this.boss.height / 2,
                        COLORS.enemy,
                        30,
                    );
                    this.wave++;
                    this.enemySpeed = ENEMY_SPEED_INITIAL + this.wave * 0.1;
                    this.mode = "MINIONS";
                    this.boss = null;
                    this.initEnemies();
                }
            }
        });
    }

    bossShootDiagonal() {
        if (!this.boss) return;
        const centerX = this.boss.x + this.boss.width / 2;
        const centerY = this.boss.y + this.boss.height;

        // Shoot in 3 directions: Down, Diagonal Left, Diagonal Right
        const directions = [
            { vx: 0, vy: BULLET_SPEED * 0.7 },
            { vx: -2, vy: BULLET_SPEED * 0.7 },
            { vx: 2, vy: BULLET_SPEED * 0.7 },
        ];

        directions.forEach((dir) => {
            this.bullets.push({
                x: centerX - BULLET_SIZE / 2,
                y: centerY,
                width: BULLET_SIZE,
                height: BULLET_SIZE,
                active: true,
                timestamp: Date.now(),
                isEnemy: true,
                vx: dir.vx,
                vy: dir.vy,
            });
        });
    }

    shoot() {
        // Prevent shooting during entry phases
        if (this.mode === "MINIONS" && this.isEntering) return;
        if (this.mode === "BOSS" && this.boss && this.boss.y < 80) return;

        const now = Date.now();
        const lastPlayerBullet = this.bullets.filter((b) => !b.isEnemy).pop();
        if (lastPlayerBullet && now - lastPlayerBullet.timestamp < 200) return;

        this.bullets.push({
            x: this.player.x + this.player.width / 2 - BULLET_SIZE / 2,
            y: this.player.y,
            width: BULLET_SIZE,
            height: BULLET_SIZE,
            active: true,
            timestamp: now,
            isEnemy: false,
        });
    }

    checkCollision(a: Entity, b: Entity) {
        // If 'b' is the player, use a smaller hurtbox (padding of 4px)
        if (b === this.player) {
            const hurtboxPadding = 6;
            return (
                a.x < b.x + b.width - hurtboxPadding &&
                a.x + a.width > b.x + hurtboxPadding &&
                a.y < b.y + b.height - hurtboxPadding &&
                a.y + a.height > b.y + hurtboxPadding
            );
        }

        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    createExplosion(
        x: number,
        y: number,
        color: string,
        count: number = PARTICLE_COUNT,
    ) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x,
                y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: PARTICLE_LIFESPAN + Math.random() * 20,
                color,
            });
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        // Player
        ctx.fillStyle = COLORS.player;
        ctx.fillRect(
            this.player.x,
            this.player.y,
            this.player.width,
            this.player.height,
        );

        // Player Laser
        if (this.player.isLaserActive && this.player.laserPower > 0) {
            const lx = this.player.x + this.player.width / 2;
            const gradient = ctx.createLinearGradient(lx - 10, 0, lx + 10, 0);
            gradient.addColorStop(0, "transparent");
            gradient.addColorStop(0.5, COLORS.particle); // Yellow/Accent for player laser
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.fillRect(lx - 10, 0, 20, this.player.y);
        }

        // Enemies
        ctx.fillStyle = COLORS.enemy;
        this.enemies.forEach((enemy) => {
            if (enemy.alive) {
                ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
            }
        });

        // Boss
        if (this.boss && this.boss.alive) {
            ctx.fillStyle = COLORS.enemy;
            ctx.fillRect(
                this.boss.x,
                this.boss.y,
                this.boss.width,
                this.boss.height,
            );

            if (this.boss.laserActive) {
                const gradient = ctx.createLinearGradient(
                    this.boss.laserX - 15,
                    0,
                    this.boss.laserX + 15,
                    0,
                );
                gradient.addColorStop(0, "transparent");
                gradient.addColorStop(0.5, COLORS.enemy);
                gradient.addColorStop(1, "transparent");
                ctx.fillStyle = gradient;
                ctx.fillRect(
                    this.boss.laserX - 15,
                    this.boss.y + this.boss.height,
                    30,
                    GAME_HEIGHT,
                );
            }
        }

        // Bullets
        this.bullets.forEach((bullet) => {
            ctx.fillStyle = bullet.isEnemy ? COLORS.enemy : COLORS.bullet;
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        });

        // Particles
        this.particles.forEach((p) => {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life / (PARTICLE_LIFESPAN + 20);
            ctx.fillRect(p.x, p.y, 3, 3);
        });
        ctx.globalAlpha = 1;

        // UI - Bottom Bar
        const uiY = GAME_HEIGHT - 20;

        // Health Bar (Left Side)
        const barWidth = 200;
        const barHeight = 12;
        const hpPercent = this.player.hp / this.player.maxHp;

        // Bar Background
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.fillRect(20, uiY, barWidth, barHeight);

        // Bar Fill
        ctx.fillStyle = hpPercent > 0.3 ? "#22c55e" : "#ef4444";
        ctx.fillRect(20, uiY, barWidth * hpPercent, barHeight);

        // Laser Power Bar (Yellow)
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.fillRect(20, uiY + 18, barWidth, 6);
        ctx.fillStyle = COLORS.particle; // Yellow
        ctx.fillRect(
            20,
            uiY + 18,
            barWidth * (this.player.laserPower / 100),
            6,
        );

        // Health Text
        ctx.fillStyle = COLORS.text;
        ctx.font = "bold 14px monospace";
        ctx.textAlign = "left";
        ctx.fillText("SYSTEM_INTEGRITY", 20, uiY - 12);

        // Score & Wave (Right Side)
        ctx.textAlign = "right";
        ctx.font = "bold 14px";
        ctx.fillText(
            `WAVE_${this.wave.toString().padStart(2, "0")}`,
            GAME_WIDTH - 20,
            uiY - 20,
        );
        ctx.font = "bold 32px monospace";
        ctx.fillText(
            `${this.score.toString().padStart(6, "0")}`,
            GAME_WIDTH - 20,
            uiY + barHeight,
        );

        // Wave Change Flash
        if (
            this.isEntering &&
            (this.mode === "MINIONS" || this.mode === "BOSS")
        ) {
            ctx.textAlign = "center";
            ctx.fillStyle = COLORS.player;
            ctx.font = "bold 72px monospace";
            const text =
                this.mode === "MINIONS"
                    ? `WAVE ${this.wave}`
                    : `BOSS ${this.wave}`;
            ctx.fillText(text, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 40);
        }

        if (this.mode === "BOSS" && this.boss) {
            // Boss HP Bar (Top Left - moved down to avoid header)
            const bossBarWidth = 300;
            const bossBarHeight = 8;
            const bossHpPercent = this.boss.hp / this.boss.maxHp;
            const bossUiY = 60;

            ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
            ctx.fillRect(40, bossUiY, bossBarWidth, bossBarHeight);

            ctx.fillStyle = COLORS.enemy;
            ctx.fillRect(
                20,
                bossUiY,
                bossBarWidth * bossHpPercent,
                bossBarHeight,
            );

            ctx.fillStyle = COLORS.enemy;
            ctx.font = "bold 14px monospace";
            ctx.textAlign = "left";
            ctx.fillText("BOSS_INTEGRITY", 20, bossUiY - 8);
        }
    }
}
