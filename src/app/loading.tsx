import { Logo } from "./_components/Logo";

const Loading = () => {
    return (
        <div className="w-full h-full p-4 flex items-center justify-center animate-pulse">
            <Logo className="w-40 md:w-60 xl:w-full" />
        </div>
    );
};

export default Loading;
