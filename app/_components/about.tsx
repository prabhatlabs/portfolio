import { LineShadowText } from "@/components/ui/line-shadow-text";
import RenderText from "@/components/ui/render-text";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { myInfo } from "@/data/pages";
import Image from "next/image";

export function About() {
    return (
        <div className="py-4 sm:py-6 relative mt-6 sm:mt-8 md:mt-10">
            {/* image */}
            <div className="flex items-center w-full border-y">
                <div className="sm:w-4 md:w-6 shrink-0"></div>
                <div className="flex items-center w-full sm:border-x">
                    <div className="p-0.5 w-fit h-fit shrink-0 border-r">
                        <Image
                            src={myInfo.imageUrl}
                            alt="Prabhat Mishra"
                            width={100}
                            height={100}
                            className="object-cover size-[50px] border  "
                        />
                    </div>
                    <div className="w-full h-[54px] bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_2px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/5 dark:[--pattern-fg:var(--color-white)]/10"></div>
                    <ThemeToggle className="hover:bg-muted dark:hover:bg-muted w-[54px] h-[54px] rounded-none border-l" />
                </div>
                <div className="sm:w-4 md:w-6 shrink-0"></div>
            </div>

            <div className="my-4 flex items-center w-full border-y">
                <div className="sm:w-4 md:w-6 shrink-0"></div>
                <div className="sm:border-x px-2">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
                        {myInfo.name}
                    </h1>
                    <h3 className="text-xl sm:text-2xl md:text-3xl">
                        <LineShadowText
                            className="italic"
                            shadowColor={"var(--foreground)"}
                        >
                            Software
                        </LineShadowText>
                        <LineShadowText
                            className="italic ml-1"
                            shadowColor={"var(--foreground)"}
                        >
                            Developer
                        </LineShadowText>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">
                        <RenderText>{myInfo.description}</RenderText>
                    </p>
                </div>
                <div className="sm:w-4 md:w-6 shrink-0"></div>
            </div>
        </div>
    );
}
