import BG from "@/components/BG";
import ConnectWithMe from "@/components/cards/ConnectWithMe";
import GithubChart from "@/components/cards/GithubChart";
import MyInfo from "@/components/cards/MyInfo";
import Projects from "@/components/cards/Projects";
import Skills from "@/components/cards/Skills";
import WorkExp from "@/components/cards/WorkExp";
import StatusBar from "@/components/StatusBar";

function Home() {
    return (
        <div className="h-dvh lg:overflow-y-hidden font-mono w-full">
            <StatusBar />

            <div className="pb-96 md:pb-10 mt-8 relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[320px_1fr] xl:grid-cols-[384px_1fr] gap-4 lg:gap-0">
                <div className="pr-4 pl-4 pt-4 pb-0 lg:pr-0 lg:pl-4 lg:pb-4 flex flex-col gap-4 md:max-w-xl lg:max-w-xs xl:max-w-sm w-full mx-auto lg:mx-0 lg:h-[calc(100dvh-4rem)] lg:overflow-y-auto hideScrollbar">
                    <MyInfo />
                    <ConnectWithMe />
                    <Skills />
                </div>
                <div className="py-0 lg:py-4 z-10 flex flex-col w-full gap-4 lg:h-[calc(100dvh-4rem)] lg:overflow-y-auto hideScrollbar">
                    <div className="flex flex-row items-start gap-4 md:max-w-xl lg:max-w-full w-full px-4 mx-auto lg:mx-0">
                        <GithubChart />
                    </div>
                    <div className="flex flex-col xl:flex-row items-start gap-4 md:max-w-xl lg:max-w-full w-full px-4 mx-auto lg:mx-0">
                        <WorkExp />
                        <Projects />
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 text-xs w-full text-center py-2 px-4">
                • Prabhat Mishra • © 2025 • All Rights Reserved •
            </div>
            <BG />
        </div>
    );
}

export default Home;
