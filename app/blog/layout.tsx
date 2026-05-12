import Navbar from "@/components/blog/Navbar";
import { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Navbar />
            <div className="pt-26 md:pt-32 px-3 max-w-3xl mx-auto">
                {children}
            </div>
        </div>
    );
}
