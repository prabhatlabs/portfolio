import Contact from "./_components/Contact";
import Experience from "./_components/Experience";
import Footer from "./_components/Footer";
import MyInfo from "./_components/MyInfo";
import NavBar from "./_components/NavBar";
import Projects from "./_components/Projects";
import VideoComp from "./_components/VideoComp";

export default function MyPage() {
    return (
        <div className="relative max-w-6xl mx-auto min-h-dvh space-y-8">
            <div className="border-r border-l">
                <NavBar />
                <MyInfo />
                <Experience />
                <Projects />
                <VideoComp />
                <Contact />
            </div>
            <Footer />
        </div>
    );
}
