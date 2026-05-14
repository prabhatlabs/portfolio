import { About } from "./_components/about";
import { Contributions } from "./_components/contributions";
import { Experiance } from "./_components/experiance";
import { Footer } from "./_components/footer";
import { Projects } from "./_components/projects";
import { Skills } from "./_components/skills";

export default function PageContent() {
    return (
        <div className="min-h-dvh h-full overflow-auto relative">
            <div className="h-6 md:h-20 w-full border-b">
                <div className="max-w-3xl mx-auto border-x h-full relative">
                    <span className="text-muted-foreground text-[10px] font-mono absolute bottom-1 left-2"></span>
                </div>
            </div>

            {/* main content */}
            <div className="z-10 max-w-3xl mx-auto relative">
                <div className="-z-10 absolute top-0 left-0 w-4 h-full border-l"></div>
                <div className="space-y-4 md:space-y-6">
                    <Footer asNav />
                    <About />
                    <svg
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect width="10" height="10" fill="rgba(0,0,0,0.01)" />
                        <rect
                            x="10"
                            y="0"
                            width="10"
                            height="10"
                            fill="transparent"
                        />
                        <rect
                            x="0"
                            y="10"
                            width="10"
                            height="10"
                            fill="transparent"
                        />
                        <rect
                            x="10"
                            y="10"
                            width="10"
                            height="10"
                            fill="rgba(0,0,0,0.01)"
                        />
                    </svg>
                    <Experiance />
                    <Projects />
                    <Contributions />
                </div>
                <Skills />
                <Footer />
                <div className="-z-10 absolute top-0 right-0 w-4 h-full border-r"></div>
            </div>

            <div className="h-4 md:h-20 w-full border-t">
                <div className="max-w-3xl mx-auto border-x h-full relative"></div>
            </div>
        </div>
    );
}
