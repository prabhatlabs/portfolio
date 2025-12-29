"use client";

import GitHubCalendar from "react-github-calendar";

export default function Contributions() {
    return (
        <section className="px-6 md:px-8 xl:px-20 py-10 md:py-14 lg:py-20 relative border-b flex justify-center flex-col gap-8">
            <h3>Contributions</h3>
            <div className="w-full flex justify-center items-center">
                <GitHubCalendar
                    username="IsayAyase"
                    blockSize={12}
                    blockMargin={4}
                    fontSize={12}
                    colorScheme={"light"}
                    theme={{
                        light: [
                            "color-mix(in oklab, var(--foreground) 15%, transparent)",
                            "color-mix(in oklab, var(--foreground) 35%, transparent)",
                            "color-mix(in oklab, var(--foreground) 55%, transparent)",
                            "color-mix(in oklab, var(--foreground) 75%, transparent)",
                            "hsl(var(--foreground))",
                        ],
                    }}
                />
            </div>
        </section>
    );
}
