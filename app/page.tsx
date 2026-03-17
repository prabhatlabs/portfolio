import Layout from "@/components/Layout";
import Contact from "./_components/Contact";
import Contributions from "./_components/Contributions";
import Experience from "./_components/Experience";
import MyInfo from "./_components/MyInfo";
import Projects from "./_components/Projects";
import SkillsSection from "./_components/SkillsSection";
import VideoComp from "./_components/VideoComp";

export default function MyPage() {
    return (
        <Layout>
            <div className="relative bg-background">
                <MyInfo />
                <Experience />
                <Projects />
                <Contributions />
                <SkillsSection />
                <VideoComp />
                <Contact />
            </div>
        </Layout>
    );
}
