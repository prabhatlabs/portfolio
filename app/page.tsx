import Bg from "@/components/bg";
import { themes } from "@/lib/themes";
import { MyPageContent } from "./_components/MyPageContent";
import { BgThemeProvider } from "@/components/bg-theme-provider";

// Force dynamic rendering to ensure a random theme on each request
export const dynamic = "force-dynamic";

// Calculate it outside to satisfy React's purity rules during the render phase.
// In a "force-dynamic" server component, this will still be executed on the server.
const getRandomIndex = () => Math.floor(Math.random() * themes.length);

export default function MyPage() {
    const initialThemeIndex = getRandomIndex();

    return (
        <BgThemeProvider initialThemeIndex={initialThemeIndex}>
            <div className="min-h-dvh h-full overflow-auto relative">
                <Bg />
                <MyPageContent />
            </div>
        </BgThemeProvider>
    );
}
