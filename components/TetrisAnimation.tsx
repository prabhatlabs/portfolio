"use client";
import { myInfo } from "@/data/pages";
import { getIcon } from "@/lib/icon";
import { useEffect, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const S = 30, COLS = 12, ROWS = 10;

const PALETTE = [
    { color: '#fff', bg: '#000000' },
    { color: '#fff', bg: '#2ea043' },
    { color: '#fff', bg: '#0077B5' },
    { color: '#fff', bg: '#EA4335' },
    { color: '#fff', bg: '#FFDD00' },
    { color: '#fff', bg: '#E4405F' },
];

const SHAPES = [
    [[1,1,1,1]],
    [[1,1],[1,1]],
    [[0,1,0],[1,1,1]],
    [[1,0],[1,1],[0,1]],
    [[0,1],[1,1],[1,0]],
    [[1,0],[1,1],[1,0]],
    [[0,1],[1,1],[0,1]],
];

type ContactData = typeof myInfo.contacts[0] & { bg: string; color: string };
type Cell = ContactData | null;

interface Piece {
    shape: number[][];
    col: number;
    row: number;
    contact: ContactData;
    targetCol: number;
    rotsLeft: number;
}

function rotate(s: number[][]): number[][] {
    return s[0].map((_, c) => s.map(row => row[c]).reverse());
}

function collides(b: Cell[][], col: number, row: number, shape: number[][]): boolean {
    for (let r = 0; r < shape.length; r++)
        for (let c = 0; c < shape[r].length; c++) {
            if (!shape[r][c]) continue;
            const nr = row + r, nc = col + c;
            if (nc < 0 || nc >= COLS || nr >= ROWS) return true;
            if (nr >= 0 && b[nr]?.[nc]) return true;
        }
    return false;
}

function scoreBoard(b: Cell[][], contact: ContactData, shape: number[][], col: number): number {
    let landRow = 0;
    while (!collides(b, col, landRow + 1, shape)) landRow++;
    const tb = b.map(r => [...r]);
    shape.forEach((row, r) => row.forEach((v, c) => {
        if (!v) return;
        const nr = landRow + r, nc = col + c;
        if (nr >= 0 && nr < ROWS) tb[nr][nc] = contact;
    }));
    let cleared = 0;
    for (let r = 0; r < ROWS; r++) if (tb[r].every(c => c !== null)) cleared++;
    const heights: number[] = Array(COLS).fill(0);
    for (let c = 0; c < COLS; c++)
        for (let r = 0; r < ROWS; r++)
            if (tb[r][c]) { heights[c] = ROWS - r; break; }
    let holes = 0;
    for (let c = 0; c < COLS; c++) {
        let found = false;
        for (let r = 0; r < ROWS; r++) {
            if (tb[r][c]) found = true;
            else if (found) holes++;
        }
    }
    let bump = 0;
    for (let c = 0; c < COLS - 1; c++) bump += Math.abs(heights[c] - heights[c + 1]);
    return cleared * 800 - holes * 400 - bump * 30 - heights.reduce((a, v) => a + v, 0) * 10;
}

function bestMove(b: Cell[][], shape: number[][], contact: ContactData): { targetCol: number; rotsLeft: number } {
    let best = -Infinity;
    let targetCol = Math.floor((COLS - shape[0].length) / 2);
    let rotsLeft = 0;
    let sh = shape;
    for (let rot = 0; rot < 4; rot++) {
        for (let col = 0; col <= COLS - sh[0].length; col++) {
            if (collides(b, col, 0, sh)) continue;
            const s = scoreBoard(b, contact, sh, col);
            if (s > best) { best = s; targetCol = col; rotsLeft = rot; }
        }
        sh = rotate(sh);
    }
    return { targetCol, rotsLeft };
}

export function TetrisAnimation() {
    const contacts: ContactData[] = myInfo.contacts.map((c, i) => ({
        ...c, ...PALETTE[i % PALETTE.length],
    }));

    const boardRef = useRef<Cell[][]>(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
    const pieceRef = useRef<Piece | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    function render() {
        const el = containerRef.current;
        if (!el) return;
        el.innerHTML = '';
        const board = boardRef.current;
        const piece = pieceRef.current;

        board.forEach((row, r) => row.forEach((cell, c) => {
            if (!cell) return;
            const a = document.createElement('a');
            a.href = cell.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.style.cssText = `position:absolute;left:${c*S+1}px;top:${r*S+1}px;width:${S-2}px;height:${S-2}px;background:${cell.bg};border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:${cell.color};text-decoration:none;font-size:15px;`;
            const CellIcon = getIcon(cell.iconName);
            if (CellIcon) {
                a.innerHTML = renderToStaticMarkup(<CellIcon />);
                a.querySelector('svg')?.style.setProperty('pointer-events', 'none');
            }
            el.appendChild(a);
        }));

        if (piece) {
            piece.shape.forEach((row, r) => row.forEach((v, c) => {
                if (!v) return;
                const nr = piece.row + r, nc = piece.col + c;
                if (nr < 0 || nc < 0 || nc >= COLS) return;
                const a = document.createElement('a');
                a.href = piece.contact.url;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.style.cssText = `position:absolute;left:${nc*S+1}px;top:${nr*S+1}px;width:${S-2}px;height:${S-2}px;background:${piece.contact.bg};border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:${piece.contact.color};text-decoration:none;font-size:15px;`;
                const PieceIcon = getIcon(piece.contact.iconName);
                if (PieceIcon) {
                    a.innerHTML = renderToStaticMarkup(<PieceIcon />);
                    a.querySelector('svg')?.style.setProperty('pointer-events', 'none');
                }
                el.appendChild(a);
            }));
        }
    }

    function spawn() {
        const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        const contact = contacts[Math.floor(Math.random() * contacts.length)];
        const startCol = Math.floor((COLS - shape[0].length) / 2);
        if (collides(boardRef.current, startCol, 0, shape)) {
            boardRef.current = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
        }
        const { targetCol, rotsLeft } = bestMove(boardRef.current, shape, contact);
        pieceRef.current = { shape, col: startCol, row: -1, contact, targetCol, rotsLeft };
        render();
    }

    function tick() {
        const p = pieceRef.current;
        if (!p) return;
        const b = boardRef.current;
        let { shape, col, row, rotsLeft, targetCol, contact } = p;

        if (rotsLeft > 0) {
            const rotated = rotate(shape);
            if (!collides(b, col, row, rotated)) { shape = rotated; rotsLeft--; }
        }

        if (col !== targetCol) {
            const dir = col < targetCol ? 1 : -1;
            if (!collides(b, col + dir, row, shape)) col += dir;
        }

        if (!collides(b, col, row + 1, shape)) {
            pieceRef.current = { ...p, shape, col, row: row + 1, rotsLeft };
            render();
        } else {
            const nb = b.map(r => [...r]);
            shape.forEach((shapeRow, r) => shapeRow.forEach((v, c) => {
                if (!v) return;
                const nr = row + r, nc = col + c;
                if (nr >= 0 && nr < ROWS) nb[nr][nc] = contact;
            }));
            const kept = nb.filter(r => !r.every(cell => cell !== null));
            while (kept.length < ROWS) kept.unshift(Array(COLS).fill(null));
            boardRef.current = kept as Cell[][];
            pieceRef.current = null;
            render();
            setTimeout(spawn, 120);
        }
    }

    useEffect(() => {
        spawn();
        const interval = setInterval(tick, 180);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            ref={containerRef}
            style={{ width: 367, height: 300, position: 'relative', overflow: 'hidden' }}
            className="border"
        />
    );
}
