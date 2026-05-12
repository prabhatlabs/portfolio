import BlogFooter from "@/components/blog/Footer";
import { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="grow px-6 max-w-3xl mx-auto w-full">
                {children}
            </main>
            <BlogFooter />
        </div>
    );
}
