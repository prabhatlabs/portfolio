export function floydSteinbergDither(imageData: ImageData): Uint8Array {
  const { data, width, height } = imageData;
  const bytesPerRow = Math.ceil(width / 8);
  const output = new Uint8Array(bytesPerRow * height);

  const gray = new Float32Array(width * height);
  for (let i = 0; i < width * height; i++) {
    const srcIdx = i * 4;
    gray[i] = 0.299 * data[srcIdx] + 0.587 * data[srcIdx + 1] + 0.114 * data[srcIdx + 2];
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const oldPixel = gray[idx];
      const newPixel = oldPixel > 128 ? 255 : 0;
      const error = oldPixel - newPixel;

      const byteIdx = Math.floor(x / 8) + y * bytesPerRow;
      const bitIdx = 7 - (x % 8);
      if (newPixel > 0) output[byteIdx] |= (1 << bitIdx);

      if (x + 1 < width) gray[idx + 1] += error * (7 / 16);
      if (y + 1 < height) {
        if (x - 1 >= 0) gray[idx + width - 1] += error * (3 / 16);
        gray[idx + width] += error * (5 / 16);
        if (x + 1 < width) gray[idx + width + 1] += error * (1 / 16);
      }
    }
  }

  return output;
}

function diffuseChannelFS(ch: Float32Array, width: number, height: number, idx: number): number {
  const oldPixel = ch[idx];
  const newPixel = oldPixel > 128 ? 255 : 0;
  const error = oldPixel - newPixel;
  const x = idx % width;
  const y = Math.floor(idx / width);

  if (x + 1 < width) ch[idx + 1] += error * (7 / 16);
  if (y + 1 < height) {
    if (x - 1 >= 0) ch[idx + width - 1] += error * (3 / 16);
    ch[idx + width] += error * (5 / 16);
    if (x + 1 < width) ch[idx + width + 1] += error * (1 / 16);
  }

  return newPixel > 0 ? 1 : 0;
}

export function floydSteinbergDitherColor(imageData: ImageData): Uint8Array {
  const { data, width, height } = imageData;
  const output = new Uint8Array(width * height);
  const ch: [Float32Array, Float32Array, Float32Array] = [
    new Float32Array(width * height),
    new Float32Array(width * height),
    new Float32Array(width * height),
  ];

  for (let i = 0; i < width * height; i++) {
    const srcIdx = i * 4;
    ch[0][i] = data[srcIdx];
    ch[1][i] = data[srcIdx + 1];
    ch[2][i] = data[srcIdx + 2];
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const r = diffuseChannelFS(ch[0], width, height, idx);
      const g = diffuseChannelFS(ch[1], width, height, idx);
      const b = diffuseChannelFS(ch[2], width, height, idx);
      output[idx] = r | (g << 1) | (b << 2);
    }
  }

  return output;
}
