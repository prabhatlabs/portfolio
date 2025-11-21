import Footer from "@/components/Footer";
import MyAdsPageSide from "@/components/MyAdsPageSide";
import NavBar from "@/components/Navbar";
import { PageRenderer } from "@/components/PageRenderer";
import LayoutContextProvider from "@/contexts/LayoutContext";
import { myInfoPage } from "@/data/pages";

export default function MyPage() {
    return (
        <div className="relative max-w-3xl mx-auto">
            <LayoutContextProvider>
                <NavBar />
                <MyAdsPageSide />
                <div className="min-h-dvh mx-auto w-full h-full p-4 mb-8 md:mb-12 lg:mb-16">
                    <PageRenderer page={myInfoPage} />
                </div>
                <Footer />
            </LayoutContextProvider>
        </div>
    );
}
