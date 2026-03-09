"use client";

import { useState } from "react";
import { myInfo } from "@/data/pages";
import Link from "next/link";
import AmbientHoverGrid from "./AmbientHoverGrid";
import { getIcon } from "@/lib/icons";
import { FormattedText } from "./FormattedText";

export default function MyInfo() {
    const [showAll, setShowAll] = useState(false);
    const mostActiveContact = myInfo.contacts[0];
    const descriptionsToShow = showAll
        ? myInfo.description
        : myInfo.description.slice(0, 1);
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
                            const IconComponent = getIcon(
                                mostActiveContact.iconName,
                            );
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
                {descriptionsToShow.map((item, index) => (
                    <p
                        key={index}
                        className="text-xs md:text-sm text-muted-foreground leading-relaxed"
                    >
                        <FormattedText
                            text={item}
                            pipeClassName="text-foreground"
                            boldClassName="text-foreground"
                        />
                    </p>
                ))}
                {myInfo.description.length > 1 && (
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-xs md:text-sm text-muted-foreground underline hover:text-foreground transition-colors"
                    >
                        {showAll ? "Show less" : "Show more"}
                    </button>
                )}
            </div>
            <div className="shrink-0 hidden md:flex justify-center items-center flex-1">
                <AmbientHoverGrid />
            </div>
        </section>
    );
}
