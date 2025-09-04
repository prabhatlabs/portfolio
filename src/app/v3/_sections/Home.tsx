import HoverBold from "@/components/HoverBold";
import { myInfoData } from "@/data/data";

function Home() {
    return (
        <div
            id="home"
            className="relative pt-28 pb-2 w-full overflow-hidden flex items-center"
        >
            <HoverBold text={myInfoData.title} />
        </div>
    );
}

export default Home;
