import { GeistPixelSquare } from "geist/font/pixel";

export default function loading() {
    return (
        <div className="p-6 h-dvh w-screen flex items-center justify-center">
            <h5 className={`text-2xl font-bold ${GeistPixelSquare.className}`}>
                prabhatlabs
                <span className="text-muted-foreground">.dev</span>
            </h5>
        </div>
    );
}
