import { myInfo } from "@/data/root";
import envvars from "@/lib/envvars";
import { GeistPixelSquare } from "geist/font/pixel";
import Link from "next/link";

export default function BorderLayoutForStaticPages({
    title,
    desc,
    lastUpdated,
    children,
}: {
    title: string;
    desc: string;
    lastUpdated: string;
    children: React.ReactNode;
}) {
    return (
        <div className="overflow-hidden lg:p-6">
            <div className="lg:h-[calc(100dvh-48px)] h-dvh overflow-auto relative border">
                <div className="z-10 max-w-3xl mx-auto relative">
                    <div className="border-b border-x">
                        <div className="p-4 md:px-6">
                            <h1
                                className={`text-3xl sm:text-4xl ${GeistPixelSquare.className}`}
                            >
                                {title}
                            </h1>
                            <p className="text-muted-foreground/70 text-xs font-mono mt-1.5">
                                {desc}
                            </p>
                        </div>
                    </div>

                    <div className="border-x h-full">{children}</div>

                    <div className="border-t border-x text-muted-foreground flex items-center justify-between text-xs py-1 px-2">
                        <p>
                            Last updated: {lastUpdated}.{" "}
                            <Link
                                href={envvars.BASE_URL}
                                className="hover:underline transition-all duration-300"
                            >
                                prabhatlabs.dev
                            </Link>{" "}
                            &copy; 2026
                        </p>
                        <div className="flex gap-2 items-center">
                            {myInfo.contacts.slice(0, 3).map((contact) => (
                                <Link
                                    key={contact.name}
                                    href={contact.url}
                                    className="hover:underline transition-all duration-300"
                                >
                                    {contact.name}.com
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
