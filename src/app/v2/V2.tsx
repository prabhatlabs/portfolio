import localFont from "next/font/local";
import NavBar from "./_components/NavBar";
import SectionLayout from "./_components/SectionLayout";
import HeroSection from "./_sections/HeroSection";
import ProjectsSection from "./_sections/ProjectsSection";
import WorkExpSection from "./_sections/WorkExpSection";

const myFont = localFont({
    src: [
        {
            path: "./_fonts/SF_Pro_Semibold_Rounded.otf",
            weight: "600",
            style: "sf-semibold-rounded",
        },
    ],
});

const V2 = () => {
    return (
        <div className={`font-light ${myFont.className}`}>
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

            <div className="text-xs w-full text-center py-2 px-4">
                • Prabhat Mishra © 2025 • All Rights Reserved •
            </div>
        </div>
    );
};

export default V2;
