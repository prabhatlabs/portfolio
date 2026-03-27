import { myInfo } from "@/data/pages";
import { getIcon } from "@/lib/icon";
import Link from "next/link";

export function Footer({ asNav }: { asNav?: boolean }) {
    return (
        <div className={`p-4 sm:p-6 ${asNav ? "border-b" : ""}`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
                <div className="text-center sm:text-start">
                    <h2 className="text-2xl font-bold">prabhatlabs</h2>
                    {!asNav && (
                        <p className="text-xs text-muted-foreground">
                            prabhatlabs.dev &copy; {new Date().getFullYear()}
                        </p>
                    )}
                </div>
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
            </div>
        </div>
    );
}
