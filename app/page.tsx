import Contact from "./_components/Contact";
import Contributions from "./_components/Contributions";
import Experience from "./_components/Experience";
import MyInfo from "./_components/MyInfo";
import Projects from "./_components/Projects";
import VideoComp from "./_components/VideoComp";

export default function MyPage() {
    return (
        <div className="relative">
            <MyInfo />
            <Experience />
            <Contributions />
            <Projects />
            <VideoComp />
            <Contact />
        </div>
    );
}
