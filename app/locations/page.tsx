import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbListJsonLd, buildWebPageJsonLd } from "@/lib/json-ld";
import { cities, lastUpdated } from "@/data/locations";
import envvars from "@/lib/envvars";
import { GeistPixelSquare } from "geist/font/pixel";
import type { Metadata } from "next";
import Link from "next/link";
import BorderLayoutForStaticPages from "@/components/BorderLayoutForStaticPages";

export const metadata: Metadata = {
    title: "About — Location & Background",
    description:
        "Prabhat Mishra is a software developer from Chhattisgarh, India. He works remotely and has experience building SaaS products for teams across India.",
    openGraph: {
        title: "About Prabhat Mishra — Location & Background",
        description:
            "Software developer from Central India, working remotely.",
    },
};

const breadcrumbLd = buildBreadcrumbListJsonLd([
    { name: "Home", url: envvars.BASE_URL },
    { name: "Locations", url: `${envvars.BASE_URL}/locations` },
]);

const webPageLd = buildWebPageJsonLd(
    "About Prabhat Mishra — Location & Background",
    "Prabhat Mishra is a software developer from Chhattisgarh, India, working remotely.",
    `${envvars.BASE_URL}/locations`,
    "Software Development",
);

export default function LocationsPage() {
    return (
        <>
            <JsonLd jsonLd={webPageLd} />
            <JsonLd jsonLd={breadcrumbLd} />
            <BorderLayoutForStaticPages
                title="Locations"
                desc="Where I'm from and the regions I'm connected to."
                lastUpdated={lastUpdated}
            >
                <div className="pt-4">
                    <p className="text-muted-foreground text-sm px-6 ">
                        I&apos;m a software developer from{" "}
                        <strong>Chhattisgarh, India</strong>. I&apos;ve worked
                        remotely with companies in Noida, Pune, Jaipur,
                        Bengaluru, and Sri Lanka.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 p-6">
                        {cities.map((city) => (
                            <Link
                                key={city.slug}
                                href={`/locations/${city.slug}`}
                                className="border px-3 py-2 hover:bg-foreground/5 transition-colors"
                            >
                                <span className="text-sm font-medium">
                                    {city.name}
                                </span>
                                <span className="text-xs text-muted-foreground ml-2">
                                    {city.state}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </BorderLayoutForStaticPages>
        </>
    );
}
