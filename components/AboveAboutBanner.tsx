"use client";

import { useEffect, useState } from "react";
import { DitherCanvas, loadDitherFile } from "./DitherCanvas";

type DitherFrameData = {
    frames: Uint8Array<ArrayBufferLike>[];
    width: number;
    height: number;
    bitDepth: number;
    fps: number;
}

export default function AboveAboutBanner({
    isMuted = true
}: {
    isMuted?: boolean
    }) {
    // const { resolvedTheme } = useTheme();

    // return (
    //     <HeroDitheringRoot className="absolute top-0 flex items-center w-full">
    //         <div className="w-full mask-r-from-70% mask-l-from-70% mask-t-from-70% mask-b-to-70%">
    //             <HeroDitheringVisual
    //                 className="h-144 sm:h-117 md:h-110 w-full"
    //                 desktopShaderProps={{
    //                     width: "100%",
    //                     height: "100%",
    //                     colorBack:
    //                         resolvedTheme === "dark" ? "#000000" : "#ffffff",
    //                     colorFront:
    //                         resolvedTheme === "dark" ? "#ffffff" : "#000000",
    //                     shape: "warp",
    //                     type: "4x4",
    //                     size: 1.5,
    //                     speed: 2,
    //                     scale: 0.6,
    //                 }}
    //             />
    //         </div>
    //     </HeroDitheringRoot>
    // );

    const [data, setData] = useState<DitherFrameData | null>(null);

    useEffect(() => {
        loadDitherFile("/output.dith").then(setData);
    }, []);

    return (
        <div className="absolute top-0 flex items-center w-full">
            <div className="w-full mask-r-from-90% mask-l-from-90% mask-t-from-90% mask-b-to-80%">
                {data && <DitherCanvas
                    // className="w-full h-full"
                    className="h-124 sm:h-full sm:w-full"
                    frames={data.frames}
                    width={data.width}
                    height={data.height}
                    bitDepth={data.bitDepth}
                    fps={data.fps}
                    playing={data.frames.length > 1}
                    colors={["var(--background)", "var(--foreground)"]}
                    audioSrc="/i_just_wanna_get_rotated.mp3"
                    muted={isMuted}
                />}
            </div>
        </div>
    );
}
