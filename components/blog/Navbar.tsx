import Link from "next/link";
import { FaTwitter } from "react-icons/fa6";
import { ThemeToggle } from "../ui/ThemeToggle";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-screen z-50 px-3 py-5">
            <div className="relative z-10 py-3 px-5 bg-foreground/5 border rounded-lg max-w-3xl mx-auto flex justify-between items-center backdrop-blur-xs shadow-[inset_0_-3px_20px_color-mix(in_oklab,var(--foreground)15%,transparent)]">
                <Link href={"/"} className="text-2xl font-bold">
                    prabhatlabs
                    <span className="text-foreground/60">.dev</span>
                </Link>
                <div className="flex items-center gap-2">
                    <Link
                        className="hover:text-blue-500"
                        href={"https://x.com/prabhatlabs"}
                    >
                        <FaTwitter />{" "}
                    </Link>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
