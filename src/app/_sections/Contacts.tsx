import HoverBold from "@/components/HoverBold";
import { contactsData } from "@/data/data";
import { IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import { Fragment } from "react";

const ibmPlexMono = IBM_Plex_Mono({
    weight: "300",
    subsets: ["latin"],
});

const Contacts = () => {
    return (
        <div
            id="contacts"
            className="grid grid-cols-1 h-fit gap-4 grid-auto-block mb-4"
        >
            <div
                className={`${ibmPlexMono.className} text-xs md:text-sm text-pink-500 h-20 flex flex-col justify-end`}
            >
                <h6>{contactsData.title}</h6>
            </div>
            <div className="h-full bg-background">
                <Link href={`mailto:${contactsData.mail}`}>
                    <HoverBold
                        text={contactsData.mail}
                        highlightedIndexs={{
                            start: 12,
                            end: 17,
                        }}
                        className="tracking-tighter text-balance text-5xl sm:text-6xl lg:text-7xl xl:text-8xl px-2"
                    />
                </Link>
            </div>

            <div
                className={`text-[14px] md:text-[16px] xl:text-lg bg-background`}
            >
                <p className="text-foreground/70">{contactsData.description}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                    {contactsData.links.map((link, index) => (
                        <Fragment key={index}>
                            <Link target="_blank" href={link.url}>
                                {link.name}
                            </Link>
                            {index !== contactsData.links.length - 1 && (
                                <span> • </span>
                            )}
                        </Fragment>
                    ))}
                </div>
            </div>

            <div className="">
                <h6
                    className={`${ibmPlexMono.className} text-center text-sm`}
                >{`prabhatlabs.dev © ${new Date().getFullYear()}`}</h6>
            </div>
        </div>
    );
};

export default Contacts;
