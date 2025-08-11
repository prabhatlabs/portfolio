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
        <div className="h-dvh lg:overflow-y-hidden font-mono">
            <StatusBar />

            <div className="mt-8 relative max-w-[1500px] mx-auto p-4 grid grid-cols-1 lg:grid-cols-[320px_1fr] xl:grid-cols-[384px_1fr] gap-6 lg:gap-0">
                <div className="flex flex-col gap-6 md:max-w-md lg:max-w-xs xl:max-w-sm w-full mx-auto lg:mx-0">
                    <MyInfo />
                    <ConnectWithMe />
                    <Skills />
                </div>
                <div className="mb-4 pb-20 lg:pl-6 flex flex-col w-full gap-6 lg:h-[calc(100dvh-7rem)] lg:overflow-y-auto hideScrollbar">
                    <GithubChart />
                    <div className="flex flex-col xl:flex-row items-start gap-6 md:max-w-md lg:max-w-full w-full mx-auto lg:mx-0">
                        <WorkExp />
                        <Projects />
                    </div>
                </div>
                <span className="text-xs w-full text-center">
                    • Prabhat Mishra • © 2025 • All Rights Reserved •
                </span>
            </div>

            <BG />
        </div>
    );
}

export default Home;
