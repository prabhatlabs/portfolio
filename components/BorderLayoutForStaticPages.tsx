import { myInfo } from "@/data/root";
import envvars from "@/lib/envvars";
import { formatDateMMMMDDYYYY } from "@/lib/time";
import { GeistPixelSquare } from "geist/font/pixel";
import Link from "next/link";
import { ThemeToggle } from "./ui/ThemeToggle";

export default function BorderLayoutForStaticPages({
    title,
    desc,
    lastUpdated,
    additionalHeaderComponent,
    children,
}: {
    title: string;
    desc: string;
    lastUpdated: string | Date;
    additionalHeaderComponent?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div className="overflow-hidden lg:p-6">
            <ThemeToggle className="fixed z-10 top-0 right-0 md:m-6 border-l border-b hover:border" />
            <div className="lg:h-[calc(100dvh-48px)] h-dvh overflow-auto relative border">
                <div className="z-10 max-w-3xl mx-auto relative sm:border-x min-h-full">
                    <div className="border-b ">
                        <div className="p-4 md:p-6">
                            <h1
                                className={`text-3xl sm:text-4xl ${GeistPixelSquare.className}`}
                            >
                                {title}
                            </h1>
                            <p className="text-muted-foreground/70 text-sm font-mono mt-1.5">
                                {desc}
                            </p>
                            {additionalHeaderComponent && <div className="mt-2">{additionalHeaderComponent}</div>}
                        </div>
                    </div>

                    <div className="h-full">{children}</div>

                    <div className="border-t  text-muted-foreground flex items-center justify-between text-xs py-1 px-2">
                        <p>
                            Last updated: {formatDateMMMMDDYYYY(lastUpdated)}.{" "}
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
