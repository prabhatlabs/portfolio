import { Loader } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const DENSITY_STRING = [' ', '.', ',', '-', '=', '+', ':', ';', 'c', 'b', 'a',
  '!', '?', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '$', 'W', '#', '@', 'N'];

interface FrameData {
  chars: Uint8Array;
  colors: Uint8Array;
}

export default function AsciiVideoPlayer({
  src,
  audioSrc, // New prop for audio URL
  width = 128,
  height = 72,
  fps = 30,
  onCanPlayAudio, // New prop for a callback when audio is ready to be unmuted
}: {
  src: string;
  audioSrc?: string; // Optional audio source
  width?: number;
  height?: number;
  fps?: number;
  onCanPlayAudio?: (unmute: () => void) => void; // Callback to provide unmute function
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref for the audio element
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const frameDataRef = useRef<FrameData[]>([]);
  const currentFrameRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const [dimensions, setDimensions] = useState({ width, height });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(src);
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);

        const arrayBuffer = await response.arrayBuffer();
        const [w, h, frames] = parseBinaryData(arrayBuffer, width, height);
        setDimensions({ width: w, height: h });

        frameDataRef.current = frames;
        currentFrameRef.current = 0;
        setIsLoading(false);
        startPlayback();
      } catch (err) {
        console.error('Error loading ASCII video:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setIsLoading(false);
      }
    };

    loadVideo();

    // Setup audio
    if (audioSrc) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.loop = true;
      audioRef.current.muted = true; // Start muted
      audioRef.current.load(); // Load the audio

      const handleCanPlayThrough = () => {
        // Once audio is ready, provide the unmute function
        if (onCanPlayAudio) {
          onCanPlayAudio(() => {
            if (audioRef.current) {
              audioRef.current.muted = !audioRef.current.muted;
              audioRef.current.play().catch(e => console.error("Error playing audio after unmute:", e));
            }
          });
        }
        audioRef.current?.play().catch(e => {
          // Autoplay policy might block muted play if not interacted with.
          // This is generally fine as it will play when unmuted by user action.
          console.warn("Muted audio autoplay blocked:", e);
        });
      };

      const handlePlaying = () => {
        setIsPlaying(true);
      }
      const handlePaused = () => {
        setIsPlaying(false);
      }

      audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
      audioRef.current.addEventListener("playing", handlePlaying)
      audioRef.current.addEventListener("pause", handlePaused)

      // Cleanup audio
      return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        if (audioRef.current) {
          audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
          audioRef.current.removeEventListener("playing", handlePlaying)
          audioRef.current.removeEventListener("pause", handlePaused)
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    } else {
      // Cleanup for video only
      return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
    }
  }, [src, audioSrc, width, height, fps, onCanPlayAudio]);

  const startPlayback = () => {
    if (!audioRef.current || frameDataRef.current.length === 0) return;

    const frameDuration = 1 / fps;
    const totalFrames = frameDataRef.current.length;

    const renderLoop = () => {
      const audio = audioRef.current;
      if (!audio || audio.paused) {
        animationRef.current = requestAnimationFrame(renderLoop);
        return;
      }

      // Use audio's playback time to find the correct frame
      const currentTime = audio.currentTime;
      const frameIndex = Math.floor((currentTime / frameDuration) % totalFrames);

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        renderFrame(frameIndex);
      }

      animationRef.current = requestAnimationFrame(renderLoop);
    };

    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(renderLoop);
  };


  const renderFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frame = frameDataRef.current[frameIndex];
    if (!frame) return;

    const cellWidth = canvas.width / dimensions.width;
    const cellHeight = canvas.height / dimensions.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const fontSize = Math.floor(cellHeight * 1);
    ctx.font = `bold ${fontSize}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < frame.chars.length; i++) {
      const col = i % dimensions.width;
      const row = Math.floor(i / dimensions.width);

      const x = col * cellWidth;
      const y = row * cellHeight;

      // Draw background
      const color = frame.colors.subarray(i * 3, i * 3 + 3);
      ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      // ctx.fillStyle = '#000';
      ctx.fillRect(x, y, cellWidth, cellHeight);

      // Draw character (white)
      const char = DENSITY_STRING[frame.chars[i]];
      ctx.fillStyle = '#ffffff';
      // ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      ctx.fillText(char, x + cellWidth / 2, y + cellHeight / 2);
    }
  };

  if (error) {
    return <div className="text-destructive p-4">Error loading video: {error}</div>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className='animate-spin size-5' />
      </div>
    );
  }

  const canvasWidth = dimensions.width * 12;
  const canvasHeight = dimensions.height * 12;

  return (
    <div className="overflow-hidden h-dvh">
      {!isPlaying &&
        <div className='fixed z-50 top-1/2 left-1/2 -translate-1/2'>
          <h3 className='text-xl md:text-3xl lg:text-5xl text-white'>paused</h3>
        </div>
      }

      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="block bg-black w-dvw h-full object-cover"
      />
      {/* The audio element is managed by audioRef.current, not rendered directly */}
    </div>
  );
}

// Keep your existing parseBinaryData function here (unchanged)
function parseBinaryData(
  buffer: ArrayBuffer,
  expectedWidth: number,
  expectedHeight: number
): [number, number, FrameData[]] {
  const uint8 = new Uint8Array(buffer);
  const view = new DataView(buffer);

  const magic = String.fromCharCode(uint8[0], uint8[1], uint8[2], uint8[3]);
  if (magic !== 'ASCI') {
    throw new Error('Invalid file: missing ASCI magic bytes');
  }

  let offset = 4;
  const width = view.getUint16(offset, true); offset += 2;
  const height = view.getUint16(offset, true); offset += 2;
  const fps = view.getUint16(offset, true); offset += 2;
  const totalFrames = view.getUint32(offset, true); offset += 4;

  if (width !== expectedWidth || height !== expectedHeight) {
    console.warn(
      `Dimension mismatch: file=(${width}x${height}), expected=(${expectedWidth}x${expectedHeight})`
    );
  }

  const pixelsPerFrame = width * height;
  const bytesPerFrame = pixelsPerFrame * 4;

  const frames: FrameData[] = [];
  for (let f = 0; f < totalFrames; f++) {
    const frameStart = offset + f * bytesPerFrame;
    const chars = new Uint8Array(pixelsPerFrame);
    const colors = new Uint8Array(pixelsPerFrame * 3);

    for (let i = 0; i < pixelsPerFrame; i++) {
      const base = frameStart + i * 4;
      chars[i] = uint8[base];
      colors[i * 3] = uint8[base + 1];
      colors[i * 3 + 1] = uint8[base + 2];
      colors[i * 3 + 2] = uint8[base + 3];
    }

    frames.push({ chars, colors });
  }

  return [width, height, frames];
}
