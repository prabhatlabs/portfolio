import { myInfo } from "@/data/pages";
import { getIcon } from "@/lib/icon";
import Link from "next/link";

export default function BlogFooter() {
    return (
        <footer className="w-full py-6 md:py-8 border-t mt-16 sm:mt-20 md:mt-24">
            <div className="max-w-3xl px-6 mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
                <div className="flex flex-col items-center md:items-start gap-1">
                    <Link href={"/"} className="text-lg md:text-xl font-bold">
                        prabhatlabs
                        <span className="text-foreground/60">.dev</span>
                    </Link>
                    <p className="text-xs text-muted-foreground">
                        prabhatlabs.dev © {new Date().getFullYear()}. All rights
                        reserved.
                    </p>
                </div>

                <div className="flex items-center">
                    {myInfo.contacts.map((contact) => {
                        const Icon = getIcon(contact.iconName);
                        return (
                            <Link
                                key={contact.name}
                                href={contact.url}
                                className="p-2 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors duration-300"
                            >
                                <Icon className="size-5" />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </footer>
    );
}
