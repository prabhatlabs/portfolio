import type { DitherAlgorithm } from './types';

interface WorkerResponse {
  id: number;
  data: Uint8Array;
}

let worker: Worker | null = null;
let nextId = 0;
const pending = new Map<number, { resolve: (data: Uint8Array) => void; reject: (err: Error) => void }>();

function getWorker(): Worker {
  if (!worker) {
    worker = new Worker(new URL('./dither.worker.ts', import.meta.url), { type: 'module' });
    worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
      const { id, data } = e.data;
      pending.get(id)?.resolve(data);
      pending.delete(id);
    };
    worker.onerror = () => {
      for (const [, entry] of pending) entry.reject(new Error('Worker error'));
      pending.clear();
      worker?.terminate();
      worker = null;
    };
  }
  return worker;
}

export function ditherInWorker(
  imageData: ImageData,
  algorithm: DitherAlgorithm,
  colorMode: boolean = false,
): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const id = nextId++;
    const w = getWorker();
    pending.set(id, { resolve, reject });
    w.postMessage({ id, imageData, algorithm, colorMode });
  });
}

export async function ditherFramesInWorker(
  frames: ImageData[],
  algorithm: DitherAlgorithm,
  colorMode: boolean = false,
  onProgress?: (current: number, total: number) => void,
): Promise<Uint8Array[]> {
  const results: Uint8Array[] = [];
  const total = frames.length;

  for (let i = 0; i < total; i++) {
    const result = await ditherInWorker(frames[i], algorithm, colorMode);
    results.push(result);
    onProgress?.(i + 1, total);
    await new Promise<void>((r) => setTimeout(r, 0));
  }

  return results;
}

export function terminateWorker(): void {
  if (worker) {
    worker.terminate();
    worker = null;
  }
}
