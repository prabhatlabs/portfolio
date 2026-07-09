import BorderLayoutForStaticPages from "@/components/BorderLayoutForStaticPages";
import JsonLd from "@/components/JsonLd";
import { lastUpdated, nowEntries } from "@/data/now";
import envvars from "@/lib/envvars";
import { buildBreadcrumbListJsonLd, buildWebPageJsonLd } from "@/lib/json-ld";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Now",
    description:
        "What Prabhat Mishra is working on now — current projects, learning goals, and open source contributions.",
    openGraph: {
        title: "Now — Prabhat Mishra",
        description:
            "Currently: building rum-core SaaS, exploring WebRTC, and contributing to open source.",
    },
};

const breadcrumbLd = buildBreadcrumbListJsonLd([
    { name: "Home", url: envvars.BASE_URL },
    { name: "Now", url: `${envvars.BASE_URL}/now` },
]);

const webPageLd = buildWebPageJsonLd(
    "Now — Prabhat Mishra",
    "What Prabhat Mishra is working on right now.",
    `${envvars.BASE_URL}/now`,
    "Current Projects",
);

export default function NowPage() {
    return (
        <>
            <JsonLd jsonLd={webPageLd} />
            <JsonLd jsonLd={breadcrumbLd} />
            <BorderLayoutForStaticPages
                title="Now"
                desc="What I'm focused on right now."
                lastUpdated={lastUpdated}
            >
                <div className="relative">
                    <span className="text-muted-foreground/50 text-[10px] font-mono absolute top-0 left-6 mb-1">
                        relative pt-4
                    </span>
                    <div className="pt-4">
                        {nowEntries.map((entry) => (
                            <section
                                key={entry.title}
                                className="border-t py-4 px-4 md:px-6"
                            >
                                <h2 className="text-xl font-semibold">
                                    {entry.title}
                                </h2>
                                <p className="text-muted-foreground mt-1">
                                    {entry.description}
                                </p>
                            </section>
                        ))}
                    </div>
                </div>
            </BorderLayoutForStaticPages>
        </>
    );
}
