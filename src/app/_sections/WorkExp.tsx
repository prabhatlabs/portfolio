import { workexpData } from "@/data/data";
import { IBM_Plex_Mono } from "next/font/google";
import WorkExpRenderer from "../_components/WorkExpRenderer";

const ibmPlexMono = IBM_Plex_Mono({
    weight: "300",
    subsets: ["latin"],
});

const WorkExp = () => {
    return (
        <div className="grid grid-cols-1 h-fit gap-4">
            <div
                className={`${ibmPlexMono.className} text-xs md:text-sm text-pink-500 h-20 flex flex-col justify-end`}
            >
                <h6 className="border-y border-border bg-background w-full px-2">
                    {workexpData.title}
                </h6>
            </div>
            <div className={`flex flex-col`}>
                <WorkExpRenderer />
            </div>
        </div>
    );
};

export default WorkExp;
