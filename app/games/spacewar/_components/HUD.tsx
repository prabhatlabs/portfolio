"use client";

interface HUDProps {
  health: number;
  maxHealth: number;
  score: number;
}

export default function HUD({ health, maxHealth, score }: HUDProps) {
  const healthPercent = (health / maxHealth) * 100;

  return (
    <div className="fixed bottom-4 left-4 right-4 flex items-center justify-between z-50 pointer-events-none">
      <div className="flex items-center gap-4">
        <div className="w-64 h-6 bg-gray-800 border-2 border-gray-600 rounded overflow-hidden">
          <div
            className="h-full transition-all duration-200"
            style={{
              width: `${healthPercent}%`,
              backgroundColor: healthPercent > 30 ? "#22c55e" : "#ef4444",
              boxShadow: `0 0 10px ${healthPercent > 30 ? "#22c55e" : "#ef4444"}`,
            }}
          />
        </div>
        <span className="text-foreground font-mono text-lg">
          {health}/{maxHealth}
        </span>
      </div>
      <div className="text-foreground font-mono text-xl">
        Score: <span className="text-yellow-400">{score}</span>
      </div>
    </div>
  );
}
