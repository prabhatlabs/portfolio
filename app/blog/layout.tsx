import BlogFooter from "@/components/blog/Footer";
import Navbar from "@/components/blog/Navbar";
import { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow py-2 px-6 max-w-3xl mx-auto w-full">
                {children}
            </main>
            <BlogFooter />
        </div>
    );
}
