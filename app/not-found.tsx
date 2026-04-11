import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background text-foreground relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />
            </div>

            {/* 404 Text */}
            <div className="text-center space-y-6">
                <div className="relative">
                    <h1
                        className="text-[12rem] sm:text-[16rem] font-bold leading-none tracking-tighter font-mono select-none"
                        style={{
                            background:
                                "repeating-linear-gradient(315deg, color-mix(in oklab, var(--border) 60%, transparent) 0, color-mix(in oklab, var(--border) 60%, transparent) 2px, transparent 0, transparent 50%)",
                            backgroundSize: "10px 10px",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            color: "transparent",
                            animation: "line-shadow 10s linear infinite",
                        }}
                    >
                        404
                    </h1>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl sm:text-8xl font-bold">
                            404
                        </span>
                    </div>
                </div>

                <div className="space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-semibold">
                        Page not found
                    </h2>
                    <p className="text-muted-foreground max-w-md mx-auto text-lg">
                        Bahut tej ho rahe ho???{" "}
                        <span className="inline-block animate-wiggle">
                            ¯\_(ツ)_/¯
                        </span>
                    </p>
                </div>

                <Button asChild className="mt-8" size="lg">
                    <Link href="/">User go back!!!</Link>
                </Button>
            </div>

            {/* Floating code snippet decoration */}
            <div className="absolute bottom-12 left-6 sm:left-12 max-w-xs font-mono text-sm text-muted-foreground/50 hidden sm:block">
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4">
                    <span className="text-primary">const</span>{" "}
                    <span className="text-secondary-foreground">status</span>{" "}
                    <span className="text-muted-foreground">=</span>{" "}
                    <span className="text-chart-2">404</span>;
                    <br />
                    <span className="text-primary">const</span>{" "}
                    <span className="text-secondary-foreground">message</span>{" "}
                    <span className="text-muted-foreground">=</span>{" "}
                    <span className="text-chart-3">
                        &quot;Lost in the void&quot;
                    </span>
                    ;
                </div>
            </div>
        </div>
    );
}
