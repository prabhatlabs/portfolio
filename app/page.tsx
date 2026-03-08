import Layout from "@/components/Layout";
import Contact from "./_components/Contact";
import Contributions from "./_components/Contributions";
import Experience from "./_components/Experience";
import MyInfo from "./_components/MyInfo";
import Projects from "./_components/Projects";
import SpaceBackground from "./_components/SpaceBackground";
import VideoComp from "./_components/VideoComp";

export default function MyPage() {
    return (
        <Layout>
            <div className="relative bg-background">
                <MyInfo />
                <Experience />
                <Contributions />
                <Projects />
                <VideoComp />
                <Contact />
                <SpaceBackground />
            </div>
        </Layout>
    );
}
