"use client";

export interface Boss {
  id: number;
  x: number;
  y: number;
  size: number;
  health: number;
  maxHealth: number;
  laserActive: boolean;
}

interface BossProps {
  boss: Boss | null;
}

export default function Boss({ boss }: BossProps) {
  if (!boss) return null;

  return (
    <div
      className="absolute"
      style={{
        left: boss.x,
        top: boss.y,
        width: boss.size,
        height: boss.size,
        backgroundColor: "#dc2626",
        boxShadow: "0 0 20px #dc2626",
      }}
    >
      {boss.laserActive && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-full"
          style={{
            width: 30,
            height: "100vh",
            background: "linear-gradient(to bottom, #ef4444, #dc2626, #b91c1c)",
            boxShadow: "0 0 30px #ef4444, 0 0 60px #dc2626",
            animation: "laserPulse 0.2s infinite alternate",
          }}
        />
      )}
      <style jsx>{`
        @keyframes laserPulse {
          0% { opacity: 0.8; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
