import { myInfo } from "@/data/pages";
import Link from "next/link";
import { SkillsMarquee } from "./SkillsMarquee";

export default function MyInfo() {
    const mostActiveContact = myInfo.contacts[0];
    return (
        <section className="px-6 md:px-8 xl:px-20 py-12 md:py-20 lg:py-24 border-b relative flex justify-between gap-8">
            <div className="flex flex-col gap-2 w-full max-w-xl">
                <div className="inline-flex items-center gap-2 text-xs md:text-sm">
                    <Link
                        href={mostActiveContact?.url}
                        target={mostActiveContact?.target}
                        className="px-2 py-1 bg-foreground text-background"
                    >
                        <mostActiveContact.icon className="size-4" />
                    </Link>
                    <span className="w-full">
                        Primary platform where I am most active.
                        <Link
                            href={mostActiveContact?.url}
                            target={mostActiveContact?.target}
                            className="text-muted-foreground underline"
                        >
                            link
                        </Link>
                    </span>
                </div>
                <h1 className="text-4xl font-semibold">{myInfo.name}</h1>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed md:leading-loose">
                    {myInfo.description}
                </p>
                <SkillsMarquee speed={40} />
            </div>
            {/* <div className="relative h-full w-full">
                <div className="absolute right-0 top-0 h-full w-[300px]">
                    <SmokeThrust />
                </div>
            </div> */}
        </section>
    );
}
