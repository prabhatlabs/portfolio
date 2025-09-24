import HoverBold from "@/components/HoverBold";
import { Button } from "@/components/ui/button";
import { myInfoData } from "@/data/data";
import { IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";

const ibmPlexMono = IBM_Plex_Mono({
    weight: "300",
    subsets: ["latin"],
});

const Hero = () => {
    return (
        <div className="grid grid-cols-1 h-fit gap-4 grid-auto-block">
            <div
                className={`${ibmPlexMono.className} text-xs md:text-sm text-cyan-500 h-20 flex flex-col justify-end`}
            >
                <h6 className="bg-background w-full">
                    {myInfoData.description}
                </h6>
            </div>
            <div className="h-full">
                <HoverBold
                    text={myInfoData.title}
                    highlightedIndexs={{
                        start: 35,
                        end: 44,
                    }}
                    className="tracking-tighter md:text-balance text-5xl sm:text-6xl lg:text-7xl xl:text-8xl"
                />
            </div>
            {/* <div
                className={`text-foreground/70 flex flex-col text-[14px] md:text-[16px] xl:text-lg xl:leading-6`}
            >
                {myInfoData.details.map((detail, index) => (
                    <p key={index} className="max-w-4xl">
                        {detail}
                    </p>
                ))}
            </div> */}
            <div className="w-full bg-background">
                <Link href="#contacts">
                    <Button variant={"default"} className="rounded-none">
                        {"Let's Talk Tech"}
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Hero;
