import { contactLinksArray } from "@/data/pages";
import Link from "next/link";
import { Logo } from "./Logo";
import { getIcon } from "@/lib/icons";

export default function NavBar() {
    return (
        <nav className="px-6 md:px-8 xl:px-20 py-4 md:py-0 border-b flex items-center justify-between sticky top-0 z-50 bg-background">
            {/* <h4 className="text-2xl">prabhatlabs</h4> */}
            <Link href={"/"}>
                <Logo className="w-60 md:w-fit" />
            </Link>
            <div className="hidden md:flex justify-end">
                {contactLinksArray.map((item) => {
                    const IconComponent = getIcon(item.iconName);
                    return (
                        <Link
                            key={item.name}
                            href={item.url}
                            target={item.target}
                            className="px-4 py-8 hover:bg-secondary flex items-center gap-2"
                        >
                            <IconComponent className="size-5" />
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
