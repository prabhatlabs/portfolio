import Corners from "@/components/Corners";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { GeistPixelSquare } from "geist/font/pixel";

export function Topbar() {
    return (
        <div className="relative py-6">
            <Corners />
            <div className="flex items-center justify-between gap-1 sm:gap-4 border-y px-4 sm:px-6 relative h-9">
                {/* top right tailwind text */}
                <>
                    <span className="text-muted-foreground/50 text-[10px] font-mono absolute bottom-full left-2 mb-7">
                        max-w-3xl mx-auto
                    </span>
                    <span className="text-muted-foreground/50 text-[10px] font-mono absolute bottom-full right-6 mb-1">
                        flex items-center justify-between gap-4
                    </span>
                </>

                {/* main text left side */}
                <div className="w-full sm:w-fit">
                    <h2 className={`text-2xl text-accent-foreground bg-accent px-0.5 w-fit ${GeistPixelSquare.className}`}>
                        prabhatlabs.dev
                    </h2>
                </div>

                {/* main action buttons right side */}
                <ThemeToggle className="border-x hover:border rounded-none" />
            </div>
        </div>
    );
}
