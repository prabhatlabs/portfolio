import { contactLinksArray } from "@/data/pages";
import Link from "next/link";
import { Logo } from "./Logo";

export default function NavBar() {
    return (
        <nav className="px-6 md:px-8 xl:px-20 py-4 md:py-0 border-b flex items-center justify-between sticky top-0 z-50 bg-background">
            {/* <h4 className="text-2xl">prabhatlabs</h4> */}
            <Logo className="w-60 md:w-full" />
            <div className="hidden md:flex justify-end">
                {contactLinksArray.map((item) => (
                    <Link
                        key={item.name}
                        href={item.url}
                        target={item.target}
                        children={item.name}
                        className="px-4 py-8 hover:bg-secondary"
                    />
                ))}
            </div>
        </nav>
    );
}
