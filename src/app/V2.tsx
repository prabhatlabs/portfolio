import { ThemeToggle } from "@/components/ThemeToggle";
import NavBar from "./_components/NavBar";
import SectionLayout from "./_components/SectionLayout";
import HeroSection from "./_sections/HeroSection";
import ProjectsSection from "./_sections/ProjectsSection";
import WorkExpSection from "./_sections/WorkExpSection";

const V2 = () => {
    return (
        <div className="font-light">
            <NavBar />
            <SectionLayout>
                <HeroSection />
            </SectionLayout>
            <SectionLayout>
                <WorkExpSection />
            </SectionLayout>
            <SectionLayout>
                <ProjectsSection />
            </SectionLayout>
            <ThemeToggle />

            <div className="text-xs w-full text-center py-2 px-4">
                • Prabhat Mishra © 2025 • All Rights Reserved •
            </div>
        </div>
    );
};

export default V2;
