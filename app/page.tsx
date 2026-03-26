import Image from "next/image";
import { About } from "./_components/about";
import { Experiance } from "./_components/experiance";
import { Footer } from "./_components/footer";
import { Projects } from "./_components/projects";
import { Skills } from "./_components/skills";

export default function MyPage() {
    return (
        <div className="relative px-2">
            <Image
                src="/bg.jpg"
                alt="bg"
                width={3840}
                height={2160}
                className="object-cover w-screen h-dvh fixed z-0 top-0 left-0"
            />

            <div className="z-10 relative max-w-3xl mx-auto my-20 backdrop-blur-lg bg-background/60 border border-dashed rounded-md">
                <Footer asNav />
                <About />
                <Experiance />
                <Projects />
                <Skills />
                <Footer />
            </div>
        </div>
    );
}
