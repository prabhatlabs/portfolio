"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const COLS = 10;
const TOTAL = 100;
const ACTIVE_COUNT = 8;

const idx = (r: number, c: number) => r * COLS + c;

const PATH = [
  idx(4, 1),
  idx(3, 2),
  idx(3, 3),
  idx(4, 4),
  idx(5, 5),
  idx(6, 6),
  idx(6, 7),
  idx(5, 8),
  idx(4, 8),
  idx(3, 7),
  idx(3, 6),
  idx(4, 5),
  idx(5, 4),
  idx(6, 3),
  idx(6, 2),
  idx(5, 1),
];

export default function AmbientHoverGrid() {
  const [active, setActive] = useState<number[]>([]);

  useEffect(() => {
    let t = 0;

    const i = setInterval(() => {
      const next: number[] = [];

      for (let k = 0; k < ACTIVE_COUNT; k++) {
        next.push(PATH[(t + k) % PATH.length]);
      }

      setActive(next);
      t = (t + 1) % PATH.length;
    }, 180);

    return () => clearInterval(i);
  }, []);

  return (
    <div className="grid grid-cols-10 gap-x-1.5 gap-y-1.5 w-fit">
      {Array.from({ length: TOTAL }).map((_, i) => {
        const pos = active.indexOf(i);

        return (
          <motion.div
            key={i}
            animate={{
              backgroundColor:
                pos === -1
                  ? "var(--secondary)"
                  : "var(--foreground)",
              opacity:
                pos === -1
                  ? 0.6
                  : 1 - pos * 0.08, // trailing fade
              scale:
                pos === 0 ? 1.25 : pos > -1 ? 1.1 : 1,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            whileHover={{
              backgroundColor: "var(--foreground)",
              scale: 1.3,
              opacity: 1,
            }}
            className="size-4 rounded-[2px]"
          />
        );
      })}
    </div>
  );
}
