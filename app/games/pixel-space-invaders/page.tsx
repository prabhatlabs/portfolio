import GameContainer from "./GameContainer";

export const metadata = {
    title: "Pixel Space Invaders",
    description: "A mini pixel space arcade game hidden in my portfolio.",
};

export default function GamePage() {
    return (
        <div className="z-10 flex flex-col items-center gap-8 w-full max-w-4xl pt-8">
            <div className="w-full flex justify-center">
                <GameContainer />
            </div>
        </div>
    );
}
