import { bayerDither, bayerDitherColor } from './bayer';
import { atkinsonDither, atkinsonDitherColor } from './atkinson';
import { floydSteinbergDither, floydSteinbergDitherColor } from './floyd-steinberg';
import type { DitherAlgorithm } from './types';

interface WorkerRequest {
  id: number;
  imageData: ImageData;
  algorithm: DitherAlgorithm;
  colorMode: boolean;
}

interface WorkerResponse {
  id: number;
  data: Uint8Array;
}

self.onmessage = (e: MessageEvent<WorkerRequest>) => {
  const { id, imageData, algorithm, colorMode } = e.data;

  let result: Uint8Array;
  if (colorMode) {
    switch (algorithm) {
      case 'bayer':
        result = bayerDitherColor(imageData);
        break;
      case 'atkinson':
        result = atkinsonDitherColor(imageData);
        break;
      case 'floyd-steinberg':
        result = floydSteinbergDitherColor(imageData);
        break;
    }
  } else {
    switch (algorithm) {
      case 'bayer':
        result = bayerDither(imageData);
        break;
      case 'atkinson':
        result = atkinsonDither(imageData);
        break;
      case 'floyd-steinberg':
        result = floydSteinbergDither(imageData);
        break;
    }
  }

  self.postMessage({ id, data: result } satisfies WorkerResponse, [result.buffer]);
};
