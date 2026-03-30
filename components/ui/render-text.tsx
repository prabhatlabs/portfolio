/**
 * Renders text with inline formatting (bold, italic, and line breaks) from a string.
 *
 * @param children - The text to render, with inline formatting delimiters (inclose in `**` for bold, `||` for italic, `\\\\` for line breaks).
 */
export default function RenderText({ children }: { children: string }) {
    return children
        .split(/(\*\*[^*]+\*\*|\|\|[^|]+\|\||\\\\)/)
        .map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**"))
                return (
                    <span key={i} className="font-semibold text-foreground">
                        {part.slice(2, -2)}
                    </span>
                );
            if (part.startsWith("||") && part.endsWith("||"))
                return (
                    <span key={i} className="text-foreground italic">
                        {part.slice(2, -2)}
                    </span>
                );
            if (part === "\\\\") return <br key={i} />;
            return (
                <span key={i} className="text-muted-foreground">
                    {part}
                </span>
            );
        });
}
