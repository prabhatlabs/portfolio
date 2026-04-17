import Image from "next/image";

export default function RandomShit() {
    const arr = Array.from({ length: 65 });

    return (
        <div className="w-full h-50 sm:h-75 overflow-hidden flex items-center justify-center mask-x-from-85% mask-y-from-70%">
            <div className="grid grid-cols-[repeat(13,40px)] sm:grid-cols-[repeat(13,56px)] grid-rows-[repeat(5,40px)] sm:grid-rows-[repeat(5,56px)] border-t border-l">
                {arr.map((_, i) => (
                    <div
                        key={i}
                        className="w-10 h-10 sm:w-14 sm:h-14 border-r border-b flex items-center justify-center"
                    >
                        {(i === 42 || i === 21) && (
                            <Image
                                src="/me.webp"
                                className="w-full h-full p-1 sm:hidden"
                                alt="me"
                                width={56}
                                height={56}
                            />
                        )}
                        {(i === 49 || i === 15) && (
                            <Image
                                src="/me.webp"
                                className="w-full h-full p-1 hidden sm:block"
                                alt="me"
                                width={56}
                                height={56}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
