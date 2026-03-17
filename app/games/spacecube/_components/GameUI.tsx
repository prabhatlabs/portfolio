'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface GameUIProps {
  hp: number;
  maxHp: number;
  score: number;
  isGameOver: boolean;
  isPlaying: boolean;
  onStart: () => void;
  onRestart: () => void;
}

export default function GameUI({
  hp,
  maxHp,
  score,
  isGameOver,
  isPlaying,
  onStart,
  onRestart,
}: GameUIProps) {
  const hpPercentage = Math.max(0, (hp / maxHp) * 100);
  const hpColor = hpPercentage > 30 ? '#22c55e' : '#ef4444';

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <div className="absolute top-4 left-4 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-white text-sm font-bold">HP:</span>
          <div className="w-32 h-4 bg-gray-800 rounded overflow-hidden border border-gray-600">
            <div
              className="h-full transition-all duration-200"
              style={{
                width: `${hpPercentage}%`,
                backgroundColor: hpColor,
              }}
            />
          </div>
          <span className="text-white text-sm">{hp}/{maxHp}</span>
        </div>
      </div>

      <div className="absolute top-4 right-4">
        <span className="text-white text-lg font-bold">Score: {score}</span>
      </div>

      <AnimatePresence>
        {!isPlaying && !isGameOver && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/70 pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <h1 className="text-5xl font-bold text-green-500 mb-4">SPACECUBE</h1>
              <p className="text-white mb-6">Use Left/Right arrows or A/D to move</p>
              <motion.button
                onClick={onStart}
                className="px-8 py-3 bg-green-600 text-white text-xl font-bold rounded hover:bg-green-500 transition-colors pointer-events-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                START GAME
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isGameOver && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/80 pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <h1 className="text-5xl font-bold text-red-500 mb-4">GAME OVER</h1>
              <p className="text-white text-2xl mb-2">Final Score: {score}</p>
              <motion.button
                onClick={onRestart}
                className="px-8 py-3 bg-green-600 text-white text-xl font-bold rounded hover:bg-green-500 transition-colors pointer-events-auto mt-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                PLAY AGAIN
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
