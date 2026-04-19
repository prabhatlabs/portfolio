import { myInfo } from "@/data/pages";
import { getIcon } from "@/lib/icon";
import Link from "next/link";

export function Footer({ asNav }: { asNav?: boolean }) {
    return (
        <div className={`py-4 sm:py-6 ${asNav ? "border-b" : "border-t"}`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 sm:border-y px-4 sm:px-6 relative">
                <span className="text-muted-foreground text-[10px] font-mono absolute bottom-full left-2 hidden sm:block mb-1.5">
                    max-w-3xl mx-auto
                </span>
                <span className="text-muted-foreground text-[10px] font-mono absolute top-full left-6 hidden sm:block mt-1.5">
                    flex items-center justify-between gap-4
                </span>
                <div
                    className={
                        asNav
                            ? "w-full sm:w-fit"
                            : "w-fit text-center sm:text-left"
                    }
                >
                    <h2 className="text-2xl font-bold">
                        prabhatlabs
                        {asNav && (
                            <span className="text-foreground/60">.dev</span>
                        )}
                    </h2>
                    {!asNav && (
                        <p className="text-xs text-muted-foreground">
                            prabhatlabs.dev &copy; {new Date().getFullYear()}
                        </p>
                    )}
                </div>
                {!asNav && (
                    <div className="flex gap-2 items-center">
                        {myInfo.contacts.map((contact) => {
                            const Icon = getIcon(contact.iconName);
                            return (
                                <Link
                                    key={contact.name}
                                    href={contact.url}
                                    className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors duration-300"
                                >
                                    <Icon className="size-5" />
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
