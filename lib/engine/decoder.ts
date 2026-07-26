import { HEADER_SIZE, type DecodedFile } from './types';

export function decodeHeader(buffer: Uint8Array): Omit<DecodedFile, 'frames'> {
  const magic = String.fromCharCode(buffer[0], buffer[1], buffer[2], buffer[3]);
  if (magic !== 'DITH') {
    throw new Error(`Invalid magic bytes: expected "DITH", got "${magic}"`);
  }

  const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  return {
    width: view.getUint16(4, true),
    height: view.getUint16(6, true),
    frameCount: view.getUint32(8, true),
    fps: view.getUint8(12),
    bitDepth: view.getUint8(13),
    algorithmId: view.getUint8(14),
    flags: view.getUint8(15),
  };
}

export function extractFrame(
  header: Omit<DecodedFile, 'frames'>,
  buffer: Uint8Array,
  frameIndex: number,
): Uint8Array {
  const frameByteSize = Math.ceil(header.width * header.height * header.bitDepth / 8);
  const offset = HEADER_SIZE + frameIndex * frameByteSize;
  return buffer.slice(offset, offset + frameByteSize);
}

export function decodeAll(buffer: Uint8Array): DecodedFile {
  const header = decodeHeader(buffer);
  const frames: Uint8Array[] = [];

  for (let i = 0; i < header.frameCount; i++) {
    frames.push(extractFrame(header, buffer, i));
  }

  return { ...header, frames };
}
