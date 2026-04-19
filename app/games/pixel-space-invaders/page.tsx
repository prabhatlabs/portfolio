import GameContainer from "./GameContainer";

export const metadata = {
    title: "Pixel Space Invaders",
    description: "A mini pixel space arcade game hidden in my portfolio.",
};

export default function GamePage() {
    return (
        <div className="z-10 flex flex-col items-center justify-center w-full h-screen overflow-hidden">
            <GameContainer />
        </div>
    );
}
