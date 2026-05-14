import { LineShadowText } from "@/components/ui/line-shadow-text";
import RenderText from "@/components/ui/render-text";
import { VisitorCounter } from "@/components/VisitorCounter";
import { myInfo } from "@/data/pages";
import { getIcon } from "@/lib/icon";
import { Gamepad2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function About({
    isTerminalOpen,
    setIsTerminalOpen,
}: {
    isTerminalOpen?: boolean;
    setIsTerminalOpen?: (value: boolean) => void;
}) {
    return (
        <div className="py-4 sm:py-6 relative mt-6 sm:mt-8 md:mt-10">
            {/* image */}
            <div className="flex items-center w-full border border-x-border/10 relative">
                <div className="absolute bottom-full left-0 my-1 px-4 sm:px-6 w-full flex justify-between items-center font-mono text-[10px]">
                    <div>
                        <span className="p-1 h-px w-px animate-pulse absolute top-1/2 -translate-y-1/2 rounded-full bg-green-500"></span>
                        <span className="ml-3.5">Open to work</span>
                    </div>
                    <VisitorCounter />
                </div>
                <div className="animate-line-shadow w-4 md:w-6 shrink-0 h-[54px] bg-[repeating-linear-gradient(315deg,color-mix(in_oklab,var(--border)60%,transparent)_0,color-mix(in_oklab,var(--border)60%,transparent)_2px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed"></div>
                <div className="flex items-center w-full">
                    <div className="p-0.5 w-fit h-fit shrink-0 border-x">
                        <Image
                            src={myInfo.imageUrl}
                            alt="Prabhat Mishra"
                            width={100}
                            height={100}
                            className="object-cover size-[50px] border grayscale-50"
                        />
                    </div>
                    <div className="animate-line-shadow w-full h-[54px] bg-[repeating-linear-gradient(315deg,color-mix(in_oklab,var(--border)60%,transparent)_0,color-mix(in_oklab,var(--border)60%,transparent)_2px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed"></div>
                </div>
            </div>

            {/* about */}
            <div className="my-4 flex items-center w-full h-full border-y relative">
                <div className="w-4 md:w-6 shrink-0 h-80 sm:h-60 md:h-55 border-r"></div>
                <div className="px-2 h-80 sm:h-60 md:h-55 flex flex-col justify-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold flex gap-2 sm:gap-3 md:gap-4 items-center">
                        {myInfo.name.split(" ").map((char, index) => (
                            <span
                                key={index}
                                className={`${index === 0 ? "text-foreground" : "text-foreground/60"}`}
                            >
                                {char}
                            </span>
                        ))}
                    </h1>
                    <h3 className="text-xl sm:text-2xl md:text-3xl">
                        <LineShadowText
                            className="italic"
                            shadowColor={"var(--foreground)"}
                        >
                            Software
                        </LineShadowText>
                        <LineShadowText
                            className="italic ml-1 text-foreground/60"
                            shadowColor={"var(--foreground)"}
                        >
                            Developer
                        </LineShadowText>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 mb-1.5">
                        <RenderText>{myInfo.description}</RenderText>
                    </p>
                </div>
                <div className="w-4 md:w-6 shrink-0 h-80 sm:h-60 md:h-55 border-l"></div>
            </div>

            {/* contacts */}
            <div className="my-4 flex items-center w-full ml-px border-y relative">
                <span className="absolute bottom-full my-0.5 left-4 md:left-6 font-mono text-[10px] text-muted-foreground">
                    flex items-center w-fit
                </span>
                <div className="w-4 md:w-6 shrink-0"></div>
                <div className="flex items-center w-fit border-x">
                    {myInfo.contacts.map((contact, index) => {
                        const Icon = getIcon(contact.iconName);
                        return (
                            <Link
                                key={contact.name}
                                href={contact.url}
                                className={`p-2 text-foreground duration-300 group ${index !== 0 ? "border-l" : ""}`}
                            >
                                <Icon className="size-5 transition-transform group-hover:rotate-3 group-hover:-translate-y-1" />
                            </Link>
                        );
                    })}
                </div>
                <div className="absolute top-0 bottom-0 right-4 md:right-6 flex items-center">
                    <Link
                        href="/games"
                        className="hidden md:flex items-center gap-1.5 px-3 h-full border-x font-mono text-xs text-muted-foreground hover:text-primary transition-all duration-300 hover:bg-primary/5 group"
                    >
                        <Gamepad2 className="size-3.5 group-hover:rotate-12 transition-transform" />
                        <span className="whitespace-nowrap">Arcade</span>
                    </Link>
                    {/*<button
                        onClick={() => setIsTerminalOpen?.(true)}
                        className="px-3 h-full border-x flex items-center font-mono text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer whitespace-nowrap outline-none"
                    >
                        {"> cli"}
                    </button>*/}
                </div>
            </div>
        </div>
    );
}
