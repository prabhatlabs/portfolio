import Footer from "@/components/Footer"
import MyAdsPageSide from "@/components/MyAdsPageSide"
import NavBar from "@/components/NavBar"
import type { ReactNode } from "react"

function layout({ children }: { children: ReactNode }) {
    return (
        <div className="relative">
            <NavBar />
            <MyAdsPageSide />
            <div className="max-w-3xl min-h-dvh mx-auto w-full h-full p-4 mb-8 md:mb-12 lg:mb-16">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default layout
