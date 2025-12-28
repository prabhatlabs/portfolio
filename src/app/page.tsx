import { Suspense } from "react";
import Contact from "./_components/Contact";
import Contributions from "./_components/Contributions";
import Experience from "./_components/Experience";
import Footer from "./_components/Footer";
import MyInfo from "./_components/MyInfo";
import NavBar from "./_components/NavBar";
import Projects from "./_components/Projects";
import Loading from "./loading";

export default function MyPage() {
    return (
        <Suspense fallback={<Loading />}>
            <div className="relative max-w-6xl mx-auto min-h-dvh space-y-8">
                <div className="border-r border-l">
                    <NavBar />
                    <MyInfo />
                    <Experience />
                    <Contributions />
                    <Projects />
                    {/* <VideoComp /> */}
                    <Contact />
                </div>
                <Footer />
            </div>
        </Suspense>
    );
}
