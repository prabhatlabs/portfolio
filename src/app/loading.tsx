import { Logo } from "./_components/Logo";

const Loading = () => {
    return (
        <div className="w-dvw h-dvh p-4 flex items-center justify-center animate-pulse">
            <Logo />
        </div>
    );
};

export default Loading;
