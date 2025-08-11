import Clock from "./Clock";
import { ThemeBtn } from "./ui/theme-btn";

const StatusBar = () => {
    return (
        <div className="bg-background/40 z-10 sticky top-0 backdrop-blur-[1px]">
            <div className="max-w-[1500px] mx-auto px-4 py-1 flex justify-between items-center gap-2 font-mono text-xs">
                <ThemeBtn />
                <div className="hidden md:block relative w-fit px-1 py-0 rounded-md border border-muted-foreground/30">
                    Prabhat Mishra
                </div>
                <Clock />
            </div>
        </div>
    );
};

export default StatusBar;
