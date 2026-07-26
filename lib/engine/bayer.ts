function generateBayerMatrix(size: number): number[][] {
  if (size === 1) return [[0]];
  const half = size / 2;
  const m = generateBayerMatrix(half);
  const result: number[][] = Array.from({ length: size }, () => Array(size).fill(0));
  for (let y = 0; y < half; y++) {
    for (let x = 0; x < half; x++) {
      const v = m[y][x];
      result[y][x] = 4 * v + 0;
      result[y][x + half] = 4 * v + 2;
      result[y + half][x] = 4 * v + 3;
      result[y + half][x + half] = 4 * v + 1;
    }
  }
  return result;
}

export function bayerDither(imageData: ImageData, matrixSize: number = 4): Uint8Array {
  const { data, width, height } = imageData;
  const matrix = generateBayerMatrix(matrixSize);
  const maxVal = matrixSize * matrixSize;
  const bytesPerRow = Math.ceil(width / 8);
  const output = new Uint8Array(bytesPerRow * height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 4;
      const gray = 0.299 * data[srcIdx] + 0.587 * data[srcIdx + 1] + 0.114 * data[srcIdx + 2];
      const threshold = matrix[y % matrixSize][x % matrixSize];
      const normalized = Math.floor((gray / 255) * (maxVal - 1));
      const bit = normalized > threshold ? 1 : 0;

      const byteIdx = Math.floor(x / 8) + y * bytesPerRow;
      const bitIdx = 7 - (x % 8);
      if (bit) output[byteIdx] |= (1 << bitIdx);
    }
  }

  return output;
}

export function bayerDitherColor(imageData: ImageData, matrixSize: number = 4): Uint8Array {
  const { data, width, height } = imageData;
  const matrix = generateBayerMatrix(matrixSize);
  const maxVal = matrixSize * matrixSize;
  const output = new Uint8Array(width * height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 4;
      const threshold = matrix[y % matrixSize][x % matrixSize];
      const n = maxVal - 1;

      const r = Math.floor((data[srcIdx] / 255) * n) > threshold ? 1 : 0;
      const g = Math.floor((data[srcIdx + 1] / 255) * n) > threshold ? 1 : 0;
      const b = Math.floor((data[srcIdx + 2] / 255) * n) > threshold ? 1 : 0;

      output[y * width + x] = r | (g << 1) | (b << 2);
    }
  }

  return output;
}
