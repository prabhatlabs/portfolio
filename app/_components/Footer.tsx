import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Logo } from "./Logo";

export default function Footer() {
    return (
        <footer className="px-6 md:px-8 xl:px-20 py-10 md:py-14 lg:py-20 relative border-t">
            <div className="flex justify-between items-center">
                <Logo className="w-40 md:w-60" />
                <ThemeToggle />
            </div>
            <p className="text-muted-foreground text-xs">
                <span>
                    {"Build by"}{" "}
                    <a
                        href="https://github.com/prabhatlabs"
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                    >
                        prabhatlabs
                    </a>
                </span>{" "}
                <span>{`• prabhatlabs.dev © 2025 • All rights reserved.`}</span>
            </p>
        </footer>
    );
}
