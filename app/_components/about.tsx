import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { myInfo } from "@/data/pages";
import Image from "next/image";

export function About() {
    return (
        <div className="p-4 sm:p-6 border-b relative">
            <ThemeToggle className="absolute top-0 right-0 m-6 hover:bg-muted dark:hover:bg-muted" />
            <div className="flex flex-col md:flex-row md:gap-4">
                {/* image */}
                <div className="p-2 pb-0 border   rounded-md w-fit h-fit shrink-0">
                    <Image
                        src={myInfo.imageUrl}
                        alt="Prabhat Mishra"
                        width={100}
                        height={100}
                        className="rounded-sm object-cover size-[100px] border  "
                    />
                    <p className="pb-0.5 text-muted-foreground font-mono text-xs text-center w-full">
                        me.webp
                    </p>
                </div>

                <div className="my-2">
                    <h1 className="text-3xl font-bold">{myInfo.name}</h1>
                    <h3 className="text-xl">{myInfo.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">
                        {myInfo.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
