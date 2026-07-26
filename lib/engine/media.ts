export async function resizeImageData(
  imageData: ImageData,
  width: number,
  height: number,
): Promise<ImageData> {
  if (imageData.width === width && imageData.height === height) return imageData;

  const bitmap = await createImageBitmap(imageData, { resizeWidth: width, resizeHeight: height });
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(bitmap, 0, 0);
  const result = ctx.getImageData(0, 0, width, height);
  bitmap.close();
  return result;
}

export async function loadImageData(file: File): Promise<ImageData> {
  const bitmap = await createImageBitmap(file);
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(bitmap, 0, 0);
  const imageData = ctx.getImageData(0, 0, bitmap.width, bitmap.height);
  bitmap.close();
  return imageData;
}

export interface VideoMetadata {
  width: number;
  height: number;
  duration: number;
}

export function getVideoMetadata(file: File): Promise<VideoMetadata> {
  const url = URL.createObjectURL(file);
  const video = document.createElement('video');
  video.preload = 'metadata';
  video.muted = true;

  const cleanup = () => {
    URL.revokeObjectURL(url);
    video.remove();
  };

  return new Promise((resolve, reject) => {
    video.onloadedmetadata = () => {
      cleanup();
      resolve({
        width: video.videoWidth,
        height: video.videoHeight,
        duration: video.duration,
      });
    };
    video.onerror = () => {
      cleanup();
      reject(new Error('Failed to load video metadata'));
    };
    video.src = url;
  });
}

export async function extractVideoFrames(
  file: File,
  fps: number,
  onProgress?: (current: number, total: number) => void,
): Promise<ImageData[]> {
  const url = URL.createObjectURL(file);
  const video = document.createElement('video');
  video.preload = 'auto';
  video.muted = true;
  (video as HTMLVideoElement).playsInline = true;

  const cleanup = () => {
    URL.revokeObjectURL(url);
    video.remove();
  };

  try {
    await new Promise<void>((resolve, reject) => {
      video.onloadedmetadata = () => resolve();
      video.onerror = () => reject(new Error('Failed to load video'));
      video.src = url;
    });

    const { videoWidth, videoHeight, duration } = video;
    const totalFrames = Math.ceil(duration * fps);
    const frames: ImageData[] = [];
    const canvas = new OffscreenCanvas(videoWidth, videoHeight);
    const ctx = canvas.getContext('2d')!;

    for (let i = 0; i < totalFrames; i++) {
      const time = Math.min(i / fps, duration);

      if (Math.abs(video.currentTime - time) > 0.01) {
        video.currentTime = time;
        await new Promise<void>((resolve) => {
          const handler = () => {
            video.removeEventListener('seeked', handler);
            resolve();
          };
          video.addEventListener('seeked', handler);
        });
      }

      ctx.drawImage(video, 0, 0);
      frames.push(ctx.getImageData(0, 0, videoWidth, videoHeight));
      onProgress?.(i + 1, totalFrames);
      await new Promise<void>((r) => setTimeout(r, 0));
    }

    return frames;
  } finally {
    cleanup();
  }
}
