import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Footer() {
    return (
        <footer className="px-8 md:px-14 lg:px-20 py-10 md:py-14 lg:py-20">
            <div className="flex items-center justify-between gap-4">
                <p className="text-muted-foreground text-center w-full">
                    © {new Date().getFullYear()} Prabhat Labs. All rights
                    reserved.
                </p>
                <ThemeToggle />
            </div>
        </footer>
    );
}
