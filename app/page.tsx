import Image from "next/image";
import { About } from "./_components/about";
import { Contributions } from "./_components/contributions";
import { Experiance } from "./_components/experiance";
import { Footer } from "./_components/footer";
import { Projects } from "./_components/projects";
import { Skills } from "./_components/skills";
import Bg from "@/components/bg";

export default function MyPage() {
    return (
        <div className="min-h-dvh h-full overflow-auto relative">
            {/*<div className="animate-line-shadow absolute -z-10 w-screen h-full top-0 left-0 bg-[repeating-linear-gradient(315deg,color-mix(in_oklab,var(--border)60%,transparent)_0,color-mix(in_oklab,var(--border)60%,transparent)_2px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed"></div>*/}

            <Bg />

            <div className="h-6 md:h-20 w-full border-b">
                <div className="max-w-3xl mx-auto border-x h-full relative">
                    <span className="text-muted-foreground text-[10px] font-mono absolute bottom-1 left-2"></span>
                </div>
            </div>

            {/* main content */}
            <div className="z-10 max-w-3xl mx-auto relative backdrop-blur-2xl bg-foreground/5">
                <div className="-z-10 absolute top-0 left-0 w-4 h-full border-l"></div>
                <div className="space-y-4 md:space-y-6">
                    <Footer asNav />
                    <About />
                    <Experiance />
                    <Projects />
                    <Contributions />
                    <Skills />
                    <Footer />
                </div>
                <div className="-z-10 absolute top-0 right-0 w-4 h-full border-r"></div>
            </div>

            <div className="h-4 md:h-20 w-full border-t">
                <div className="max-w-3xl mx-auto border-x h-full relative"></div>
            </div>
        </div>
    );
}
