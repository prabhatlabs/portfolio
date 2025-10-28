import Footer from "@/components/Footer"
import MyAdsPageSide from "@/components/MyAdsPageSide"
import NavBar from "@/components/Navbar"
import LayoutContextProvider from "@/contexts/LayoutContext"
import type { ReactNode } from "react"

function layout({ children }: { children: ReactNode }) {
    return (
        <div className="relative max-w-[1920px] mx-auto">
            <LayoutContextProvider>
                <NavBar />
                <MyAdsPageSide />
                <div className="max-w-3xl min-h-dvh mx-auto w-full h-full p-4 mb-8 md:mb-12 lg:mb-16">
                    {children}
                </div>
                <Footer />
            </LayoutContextProvider>
        </div>
    )
}

export default layout
