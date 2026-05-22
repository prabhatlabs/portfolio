import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { myInfo } from "@/data/pages";
import { getIcon } from "@/lib/icon";
import Link from "next/link";

export function Footer({ asNav }: { asNav?: boolean }) {
    return (
        <div
            className={`${asNav ? "border-b sm:py-6 " : "border-t py-4 sm:py-6 "}`}
        >
            <div
                className={`flex ${asNav ? "" : "flex-col sm:flex-row"} items-center justify-between gap-1 sm:gap-4 sm:border-y px-4 sm:px-6 relative`}
            >
                {asNav ? (
                    <>
                        <span className="text-muted-foreground text-[10px] font-mono absolute bottom-full left-2 hidden sm:block mb-7">
                            max-w-3xl mx-auto
                        </span>
                        <span className="text-muted-foreground text-[10px] font-mono absolute bottom-full right-6 hidden sm:block mb-1">
                            flex items-center justify-between gap-4
                        </span>
                    </>
                ) : (
                    <span className="text-muted-foreground text-[10px] font-mono absolute bottom-full right-6 hidden sm:block mb-1">
                        flex items-center
                    </span>
                )}
                <div
                    className={
                        asNav
                            ? "w-full sm:w-fit"
                            : "w-fit text-center sm:text-left"
                    }
                >
                    {asNav ? (
                        <h2 className="text-2xl font-bold">
                            prabhatlabs
                            <span className="text-foreground/60">.dev</span>
                        </h2>
                    ) : (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Link href={"/"} className="hover:underline">
                                prabhatlabs.dev &copy;{" "}
                                {new Date().getFullYear()}
                            </Link>
                            <span>•</span>
                            <Link href={"/blog"} className="hover:underline">
                                All Blogs
                            </Link>
                        </div>
                    )}
                </div>
                {!asNav ? (
                    <div className="flex items-center md:border-r">
                        {myInfo.contacts.map((contact) => {
                            const Icon = getIcon(contact.iconName);
                            return (
                                <Link
                                    key={contact.name}
                                    href={contact.url}
                                    className={`p-2 text-foreground duration-300 group md:border-l`}
                                >
                                    <Icon className="size-5 transition-transform group-hover:rotate-3 group-hover:-translate-y-1" />
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <ThemeToggle className="border-x rounded-none" />
                )}
            </div>
        </div>
    );
}
