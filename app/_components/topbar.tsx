import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { GeistPixelSquare } from "geist/font/pixel";

export function Topbar() {
    return (
        <div className="sm:py-6">
            <div className="flex items-center justify-between gap-1 sm:gap-4 sm:border-y px-4 sm:px-6 relative h-9">
                {/* top right tailwind text */}
                <>
                    <span className="text-muted-foreground text-[10px] font-mono absolute bottom-full left-2 hidden sm:block mb-7">
                        max-w-3xl mx-auto
                    </span>
                    <span className="text-muted-foreground text-[10px] font-mono absolute bottom-full right-6 hidden sm:block mb-1">
                        flex items-center justify-between gap-4
                    </span>
                </>

                {/* main text left side */}
                <div className="w-full sm:w-fit">
                    <h2 className={`text-2xl ${GeistPixelSquare.className}`}>
                        prabhatlabs
                        <span className="text-foreground/60">.dev</span>
                    </h2>
                </div>

                {/* main action buttons right side */}
                <ThemeToggle className="border-x rounded-none" />
            </div>
        </div>
    );
}
