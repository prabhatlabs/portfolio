export type DitherAlgorithm = 'bayer' | 'atkinson' | 'floyd-steinberg';

export interface BayerConfig {
  matrixSize?: 2 | 4 | 8 | 16;
}

export interface DitherConfig {
  algorithm: DitherAlgorithm;
  bayer?: BayerConfig;
}

export interface FileHeader {
  width: number;
  height: number;
  frameCount: number;
  fps: number;
  bitDepth: number;
  algorithmId: number;
  flags: number;
}

export interface DitherResult {
  data: Uint8Array;
  width: number;
  height: number;
}

export interface DecodedFile extends FileHeader {
  frames: Uint8Array[];
}

export const MAGIC_BYTES = new Uint8Array([0x44, 0x49, 0x54, 0x48]);
export const HEADER_SIZE = 16;

export const ALGORITHM_IDS: Record<DitherAlgorithm, number> = {
  bayer: 0,
  atkinson: 1,
  'floyd-steinberg': 2,
};

export const ALGORITHM_NAMES: Record<number, DitherAlgorithm> = {
  0: 'bayer',
  1: 'atkinson',
  2: 'floyd-steinberg',
};
