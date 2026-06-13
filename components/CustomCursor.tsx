'use client'

import { useEffect, useState } from 'react'

const BLOCKS = [
  { id: 'b4', hour: 4, size: 16 },
  { id: 'b7', hour: 7, size: 8 },
  { id: 'b10', hour: 10, size: 8 },
]

const DOTS = [
  { id: 'd1', x: -18, y: -2, s: 3 },
  { id: 'd2', x: -8, y: 16, s: 2 },
  { id: 'd3', x: 17, y: -8, s: 2 },
  { id: 'd4', x: 3, y: -17, s: 3 },
  { id: 'd5', x: -15, y: -13, s: 2 },
  { id: 'd6', x: 15, y: 12, s: 2 },
  { id: 'd7', x: -4, y: -10, s: 2 },
  { id: 'd8', x: 10, y: -2, s: 2 },
]

const LINES = [
  { id: 'l1', x: -17, y: -9, w: 6, h: 1 },
  { id: 'l2', x: 7, y: 15, w: 5, h: 1 },
  { id: 'l3', x: -3, y: -16, w: 1, h: 5 },
  { id: 'l4', x: 19, y: 3, w: 1, h: 3 },
  { id: 'l5', x: -13, y: 13, w: 4, h: 1 },
  { id: 'l6', x: -11, y: -8, w: 1, h: 3 },
]

const RADIUS = 10
const ALL = [...BLOCKS, ...DOTS, ...LINES]

const GLITCH_COLORS = [
  '#ff0040',
  '#00ff80',
  '#0080ff',
  '#ff00ff',
  '#80ff00',
]

function clockPos(hour: number, r: number) {
  const a = (hour * 30 * Math.PI) / 180
  return { x: Math.sin(a) * r, y: -Math.cos(a) * r }
}

export function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [isTouch, setIsTouch] = useState(true)

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    setMounted(true)
  }, [])

  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [visible, setVisible] = useState(false)

  const blankGlitch = () => ({
    offsets: ALL.map(() => ({ x: 0, y: 0 })),
    colors: ALL.map(() => 'var(--foreground)'),
    alphas: ALL.map(() => 1),
    widths: ALL.map(() => 0),
  })

  const [glitch, setGlitch] = useState(blankGlitch)

  useEffect(() => {
    if (isTouch) return
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [isTouch])

  useEffect(() => {
    if (isTouch) return
    const id = setInterval(() => {
      setGlitch({
        offsets: ALL.map(() => ({
          x: (Math.random() - 0.5) * 4,
          y: (Math.random() - 0.5) * 2,
        })),
        colors: ALL.map((_, i) =>
          i < BLOCKS.length && Math.random() < 0.25
            ? GLITCH_COLORS[(Math.random() * GLITCH_COLORS.length) | 0]
            : 'var(--foreground)'
        ),
        alphas: ALL.map((_, i) => {
          if (i < BLOCKS.length) return Math.random() < 0.06 ? 0 : 1
          return Math.random() < 0.3
            ? 0.3 + Math.random() * 0.4
            : 0.6 + Math.random() * 0.4
        }),
        widths: ALL.map((_, i) =>
          i < BLOCKS.length && Math.random() < 0.12
            ? ((Math.random() * 5 + 1) | 0)
            : 0
        ),
      })
    }, 100)
    return () => clearInterval(id)
  }, [isTouch])

  if (!mounted || isTouch) return null

  return (
    <>
      <style>{`body { cursor: none !important; }`}</style>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 99999,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: pos.x,
            top: pos.y,
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.15s',
          }}
        >
          {BLOCKS.map((b, i) => {
            const p = clockPos(b.hour, RADIUS)
            const go = glitch.offsets[i]
            return (
              <div
                key={b.id}
                style={{
                  position: 'absolute',
                  left: p.x + go.x - b.size / 2,
                  top: p.y + go.y - b.size / 2,
                  width: b.size + glitch.widths[i],
                  height: b.size,
                  background: glitch.colors[i],
                  opacity: glitch.alphas[i],
                  imageRendering: 'pixelated',
                }}
              />
            )
          })}
          {DOTS.map((d, i) => {
            const idx = BLOCKS.length + i
            const go = glitch.offsets[idx]
            return (
              <div
                key={d.id}
                style={{
                  position: 'absolute',
                  left: d.x + go.x - d.s / 2,
                  top: d.y + go.y - d.s / 2,
                  width: d.s,
                  height: d.s,
                  background: glitch.colors[idx],
                  opacity: glitch.alphas[idx],
                  imageRendering: 'pixelated',
                }}
              />
            )
          })}
          {LINES.map((l, i) => {
            const idx = BLOCKS.length + DOTS.length + i
            const go = glitch.offsets[idx]
            return (
              <div
                key={l.id}
                style={{
                  position: 'absolute',
                  left: l.x + go.x,
                  top: l.y + go.y,
                  width: l.w,
                  height: l.h,
                  background: glitch.colors[idx],
                  opacity: glitch.alphas[idx],
                  imageRendering: 'pixelated',
                }}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
