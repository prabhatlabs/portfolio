import { About } from "./_components/about";
import { Experiance } from "./_components/experiance";
import { Footer } from "./_components/footer";
import { Projects } from "./_components/projects";
import { Skills } from "./_components/skills";

export default function MyPage() {
    return (
        <div className="relative px-2 overflow-hidden">
            <video
                className="object-cover w-full h-full absolute z-0 top-0 left-0 dark:opacity-70"
                src="/bg.mp4"
                autoPlay
                loop
                muted
                playsInline
            />
            <div className="z-10 relative h-dvh overflow-auto py-2 md:py-20">
                <div className="max-w-3xl mx-auto backdrop-blur-xl bg-background/50 border rounded-md">
                    <Footer asNav />
                    <About />
                    <Experiance />
                    <Projects />
                    <Skills />
                    <Footer />
                </div>
            </div>
        </div>
    );
}
