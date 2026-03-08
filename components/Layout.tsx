import NavBar from "@/app/_components/NavBar";
import Footer from "@/app/_components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="transition-colors duration-500 ease-in-out relative max-w-6xl mx-auto min-h-dvh overflow-x-hidden">
            <div className="border-r border-l">
                <NavBar />
                {children}
            </div>
            <Footer />
        </div>
    );
}
