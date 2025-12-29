import { Logo } from "./Logo";

export default function Footer() {
    return (
        <footer className="px-8 md:px-14 lg:px-20 py-10 md:py-14 lg:py-20 relative">
            <div className="flex flex-col gap-8 items-center">
                <Logo className="w-40 md:w-60" />
            </div>
            <p className="text-muted-foreground text-center w-full text-xs">
                <span>
                    {"Build by"}{" "}
                    <a
                        href="https://github.com/IsayAyase"
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                    >
                        IsayAyase
                    </a>
                </span>{" "}
                <span>{`• prabhatlabs.dev © 2025 • All rights reserved.`}</span>
            </p>
        </footer>
    );
}
