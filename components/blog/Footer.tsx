import Link from "next/link";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiBuymeacoffee } from "react-icons/si";

export default function BlogFooter() {
    return (
        <footer className="w-full py-6 md:py-8">
            <div className="max-w-3xl px-6 mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col items-center md:items-start gap-1">
                    <Link href={"/"} className="text-2xl md:text-3xl font-bold">
                        prabhatlabs
                        <span className="text-foreground/60">.dev</span>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                        prabhatlabs.dev © {new Date().getFullYear()}. All rights
                        reserved.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        className="text-muted-foreground hover:text-[#FFDD00] transition-colors"
                        href={"https://www.buymeacoffee.com/prabhatlabs"}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Buy me a coffee"
                    >
                        <SiBuymeacoffee size={20} />
                    </Link>
                    <Link
                        className="text-muted-foreground hover:text-blue-500 transition-colors"
                        href={"https://x.com/prabhatlabs"}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaTwitter size={20} />
                    </Link>
                    <Link
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        href={"https://github.com/prabhatlabs"}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaGithub size={20} />
                    </Link>
                    <Link
                        className="text-muted-foreground hover:text-blue-600 transition-colors"
                        href={"https://linkedin.com/in/prabhatm8000"}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaLinkedin size={20} />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
