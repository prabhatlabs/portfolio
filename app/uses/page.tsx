import BorderLayoutForStaticPages from "@/components/BorderLayoutForStaticPages";
import { lastUpdated, usesEntries } from "@/data/uses";
import { getIcon } from "@/lib/icon";
import { GeistPixelSquare } from "geist/font/pixel";
import type { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
    title: "Uses",
    description: "Tools, languages, and frameworks I use daily.",
};

export default function UsesPage() {
    return (
        <BorderLayoutForStaticPages
            title="Uses"
            desc="Tools, languages, and frameworks I work with."
            lastUpdated={lastUpdated}
        >
            <div className="relative">
                <span className="text-muted-foreground/50 text-[10px] font-mono absolute top-0 left-4 md:left-6 mb-1">
                    flex flex-wrap gap-1 px-5.5 relative mb-6
                </span>
                <div className="pt-4">
                    {usesEntries.map((entry) => (
                        <Fragment key={entry.category}>
                            <div className="border-y px-4 md:px-6 py-2 mb-4 md:mb-6">
                                <h2
                                    className={`text-lg sm:text-xl ${GeistPixelSquare.className}`}
                                >
                                    {entry.category}
                                </h2>
                            </div>
                            <div className="flex flex-wrap gap-1 px-4 md:px-6 relative mb-4 md:mb-6">
                                {entry.items.map((item) => {
                                    const Icon = getIcon(item.iconName);
                                    return (
                                        <div
                                            key={item.name}
                                            className="relative flex w-fit h-fit justify-center items-center gap-1.5 p-1.5 bg-foreground/5 border transition-colors duration-300"
                                        >
                                            <Icon className="size-4" />
                                            <span className="text-sm">
                                                {item.name}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
        </BorderLayoutForStaticPages>
    );
}
