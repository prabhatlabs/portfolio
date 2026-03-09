import { cn } from "@/lib/utils";

interface FormattedTextProps {
    text: string;
    pipeClassName?: string;
    boldClassName?: string;
}

export function FormattedText({
    text,
    pipeClassName,
    boldClassName,
}: FormattedTextProps) {
    return (
        <>
            {text.split("||").map((part, i) =>
                i % 2 === 1 ? (
                    <span key={i} className={cn("font-bold italic", pipeClassName)}>
                        {part
                            .split("**")
                            .map((boldPart, j) =>
                                j % 2 === 1 ? (
                                    <span key={j} className={cn("font-bold", boldClassName)}>
                                        {boldPart}
                                    </span>
                                ) : (
                                    <span key={j}>{boldPart}</span>
                                ),
                            )}
                    </span>
                ) : (
                    <span key={i}>
                        {part
                            .split("**")
                            .map((boldPart, j) =>
                                j % 2 === 1 ? (
                                    <span key={j} className={cn("font-bold", boldClassName)}>
                                        {boldPart}
                                    </span>
                                ) : (
                                    <span key={j}>{boldPart}</span>
                                ),
                            )}
                    </span>
                ),
            )}
        </>
    );
}
