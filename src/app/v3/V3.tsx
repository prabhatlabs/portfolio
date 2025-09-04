import NavBar from "./_components/NavBar";
import About from "./_sections/About";
import Experience from "./_sections/Experience";
import Footer from "./_sections/Footer";
import Home from "./_sections/Home";
import Projects from "./_sections/Projects";

function V3() {
    return (
        <div className="overflow-x-hidden">
            <div className="max-w-7xl mx-auto w-full px-4">
                <NavBar />
                <Home />
                <About />
                <Experience />
                <Projects />
            </div>
            <Footer />

            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    background: `linear-gradient(180deg, 
                                    transparent 0%, 
                                    transparent 40%, 
                                    color-mix(in oklab, var(--background) 2%, transparent) 50%,
                                    color-mix(in oklab, var(--background) 6%, transparent) 60%, 
                                    color-mix(in oklab, var(--background) 15%, transparent) 70%, 
                                    color-mix(in oklab, var(--background) 35%, transparent) 80%, 
                                    color-mix(in oklab, var(--background) 60%, transparent) 90%, 
                                    color-mix(in oklab, var(--background) 70%, transparent) 100%
                                )`,
                    backdropFilter: `blur(0px)`,
                }}
            />
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    background: `linear-gradient(180deg, 
                                    transparent 0%, 
                                    transparent 60%, 
                                    color-mix(in oklab, var(--background) 5%, transparent) 65%, 
                                    color-mix(in oklab, var(--background) 20%, transparent) 75%, 
                                    color-mix(in oklab, var(--background) 40%, transparent) 85%, 
                                    color-mix(in oklab, var(--background) 60%, transparent) 100%
                                )`,
                    backdropFilter: `blur(8px)`,
                    maskImage: `linear-gradient(180deg, 
                                    transparent 0%, 
                                    transparent 50%, 
                                    color-mix(in oklab, var(--foreground) 10%, transparent) 65%, 
                                    color-mix(in oklab, var(--foreground) 30%, transparent) 75%, 
                                    color-mix(in oklab, var(--foreground) 60%, transparent) 85%, 
                                    color-mix(in oklab, var(--foreground) 100%, transparent) 100%
                                )`,
                }}
            />
            {/* <BoxBg /> */}
        </div>
    );
}

export default V3;
