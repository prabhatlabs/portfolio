import ConnectWithMe from "@/app/v1/_cards/ConnectWithMe";
import MyInfo from "@/app/v1/_cards/MyInfo";
import Projects from "@/app/v1/_cards/Projects";
import Skills from "@/app/v1/_cards/Skills";
import WorkExp from "@/app/v1/_cards/WorkExp";
import BoxAnimatedBG from "@/components/BoxAnimatedBG";
import StatusBar from "@/components/StatusBar";

function V1() {
    return (
        <div className="h-dvh lg:overflow-y-hidden font-mono w-full relative">
            <StatusBar />

            <div className="pb-96 md:pb-10 mt-8 relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[320px_1fr] xl:grid-cols-[384px_1fr] gap-4 lg:gap-0">
                <div className="pr-4 pl-4 pt-4 pb-0 lg:pr-0 lg:pl-4 lg:pb-4 z-10 flex flex-col gap-4 md:max-w-xl lg:max-w-xs xl:max-w-sm w-full mx-auto lg:mx-0 lg:h-[calc(100dvh-4rem)] lg:overflow-y-auto hideScrollbar">
                    <MyInfo />
                    <ConnectWithMe />
                    <Skills />
                </div>
                <div className="py-0 lg:py-4 z-10 flex flex-col w-full gap-4 lg:h-[calc(100dvh-4rem)] lg:overflow-y-auto hideScrollbar">
                    <div className="flex flex-col xl:flex-row items-start gap-4 md:max-w-xl lg:max-w-full w-full px-4 mx-auto lg:mx-0">
                        <WorkExp />
                        <Projects />
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 text-xs w-full text-center py-2 px-4">
                • Prabhat Mishra • © 2025 • All Rights Reserved •
            </div>
            <BoxAnimatedBG />
        </div>
    );
}

export default V1;
