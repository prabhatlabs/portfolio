import { contactsData } from "@/data/data";
import { IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";

const ibmPlexMono = IBM_Plex_Mono({
    weight: "400",
    subsets: ["latin"],
});

const Navbar = () => {
    return (
        <nav className="px-4 sm:px-6 h-12 w-full fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-2 border-b border-border bg-background">
            <div className={`flex items-center gap-2`}>
                <h3 className={`text-lg sm:text-xl ${ibmPlexMono.className}`}>
                    prabhatlabs.dev
                </h3>
            </div>
            <div className="flex items-center justify-end gap-2 sm:gap-4 text-foreground/50">
                {contactsData.links.map((item) => (
                    <Link
                        key={item.name}
                        href={item.url}
                        className={`hover:text-foreground`}
                        target={item.blank ? "_blank" : "_self"}
                    >
                        {item.icon}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
