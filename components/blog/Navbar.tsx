import Link from "next/link";
import { ThemeToggle } from "../ui/ThemeToggle";

export default function Navbar() {
    return (
        <nav className="w-full py-6 md:py-8">
            <div className="max-w-3xl px-6 mx-auto flex justify-between items-center gap-6">
                <Link
                    href={"/"}
                    className="text-2xl md:text-3xl font-bold transition-colors"
                >
                    prabhatlabs
                    <span className="text-foreground/60">.dev</span>
                </Link>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
