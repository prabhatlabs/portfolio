import Corners from "@/components/Corners";
import { ContributionChart } from "@/components/githubchart";
import { GeistPixelSquare } from "geist/font/pixel";

export function Contributions() {
    return (
        <div className="relative">
            <Corners />
            <h2
                className={`p-4 sm:p-6 mt-16 sm:mt-20 md:mt-24 border-y text-3xl md:text-5xl ${GeistPixelSquare.className}`}
            >
                <span>Con</span>
                <span className=" text-muted-foreground">tributions</span>
            </h2>
            <div className="relative p-4 border-y mt-4">
                <span className="absolute -top-5 left-0 my-1 mx-4 font-mono text-[10px] text-muted-foreground/50">
                    space-y-3
                </span>
                <ContributionChart username="prabhatlabs" />
            </div>
        </div>
    );
}
