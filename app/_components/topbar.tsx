import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { GeistPixelSquare } from "geist/font/pixel";

export function Topbar() {
    return (
        <div className="relative border-b">
            <div className="max-w-3xl mx-auto border-x py-6">
                <div className="flex items-center justify-between gap-1 sm:gap-4 border-y px-4 sm:px-6 relative h-9">
                    {/* top right tailwind text */}
                    <>
                        <span className="text-muted-foreground/50 text-[10px] font-mono absolute top-full left-2 mt-1">
                            max-w-3xl mx-auto
                        </span>
                        <span className="text-muted-foreground/50 text-[10px] font-mono absolute bottom-full right-2 mb-1">
                            flex items-center justify-between gap-4
                        </span>
                    </>

                    {/* main text left side */}
                    <div className="w-full sm:w-fit">
                        <h2
                            className={`text-2xl border-x px-1 w-fit ${GeistPixelSquare.className}`}
                        >
                            <span>prabhatlabs</span>
                            <span className="text-muted-foreground">
                                .dev
                            </span>
                        </h2>
                    </div>

                    {/* main action buttons right side */}
                    <ThemeToggle className="border-x hover:border rounded-none" />
                </div>
            </div>
        </div>
    );
}
