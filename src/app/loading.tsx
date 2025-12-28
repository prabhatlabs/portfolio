import { Logo } from "./_components/Logo";

const Loading = () => {
    return (
        <div className="w-dvw h-dvh p-4 flex items-center justify-center animate-pulse">
            <Logo className="w-60 md:w-full" />
        </div>
    );
};

export default Loading;
