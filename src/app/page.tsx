import Navbar from "@/components/Navbar";
import { ThemeToggle } from "@/components/ThemeToggle";
import Contacts from "./_sections/Contacts";
import Hero from "./_sections/Hero";
import Projects from "./_sections/Projects";
import WorkExp from "./_sections/WorkExp";

function Page() {
    return (
        <div className="max-w-screen overflow-hidden">
            <Navbar />
            <ThemeToggle className="fixed bottom-0 right-0 m-4 bg-background/50 border border-border text-foreground/70" />

            <div className="grid min-h-dvh grid-cols-1 justify-center pt-16 [--gutter-width:3rem] md:-mx-4 md:grid-cols-[var(--gutter-width)_minmax(0,var(--breakpoint-xl))_var(--gutter-width)] lg:mx-0">
                <div className="row-span-full row-start-1 hidden border-x border-x-(--border) bg-[image:repeating-linear-gradient(315deg,_var(--border)_0,_var(--border)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed md:col-start-1 md:block"></div>
                <div className="grid grid-cols-1 gap-24">
                    <Hero />
                    <WorkExp />
                    <Projects />
                    <Contacts />
                </div>
                <div className="row-span-full row-start-1 hidden border-x border-x-(--border) bg-[image:repeating-linear-gradient(315deg,_var(--border)_0,_var(--border)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed md:col-start-3 md:block"></div>
            </div>
        </div>
    );
}

export default Page;
