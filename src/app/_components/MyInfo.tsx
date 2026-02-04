import { myInfo } from "@/data/pages";
import Link from "next/link";
import AmbientHoverGrid from "./AmbientHoverGrid";
import { SkillsMarquee } from "./SkillsMarquee";
import { getIcon } from "@/lib/icons";

export default function MyInfo() {
    const mostActiveContact = myInfo.contacts[0];
    return (
        <section className="px-6 md:px-8 xl:px-20 py-12 md:py-20 lg:py-24 border-b flex justify-between gap-8 w-full">
            <div className="space-y-3 w-full max-w-lg lg:max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs md:text-sm">
                    {myInfo.contacts.map((contact, index) => {
                        const IconComponent = getIcon(contact.iconName);
                        return (
                            <Link
                                key={index}
                                href={contact.url}
                                target={contact.target}
                                className="md:hidden px-2 py-1 bg-foreground text-background"
                            >
                                <IconComponent className="size-4" />
                            </Link>
                        );
                    })}

                    {/* for md and above */}
                    <Link
                        href={mostActiveContact?.url}
                        target={mostActiveContact?.target}
                        className="hidden md:block px-2 py-1 bg-foreground text-background"
                    >
                        {(() => {
                            const IconComponent = getIcon(mostActiveContact.iconName);
                            return <IconComponent className="size-4" />;
                        })()}
                    </Link>
                    <span className="hidden md:block w-full">
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
                <SkillsMarquee speed={30} />
            </div>
            <div className="shrink-0 hidden md:flex justify-center items-center flex-1">
                <AmbientHoverGrid />
            </div>
        </section>
    );
}
