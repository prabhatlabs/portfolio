import { getFullImageUrl } from "@/lib/image-helper";
import Image from "next/image";
import Link from "next/link";

export const MDXComponents = {
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className="text-4xl font-bold mt-6 mb-2 scroll-mt-20" {...props}>
            {children}
        </h1>
    ),
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
        const extractText = (node: any): string => {
            if (typeof node === "string") return node;
            if (Array.isArray(node)) return node.map(extractText).join("");
            if (node?.props?.children) return extractText(node.props.children);
            return "";
        };

        const text = extractText(children);
        const id = text
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-");

        return (
            <h2
                id={id}
                className="text-3xl font-semibold mt-6 mb-2 scroll-mt-20 group flex items-center gap-2"
                {...props}
            >
                {children}
                <a
                    href={`#${id}`}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary text-lg"
                    aria-label="Link to this section"
                >
                    #
                </a>
            </h2>
        );
    },
    h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
        const extractText = (node: any): string => {
            if (typeof node === "string") return node;
            if (Array.isArray(node)) return node.map(extractText).join("");
            if (node?.props?.children) return extractText(node.props.children);
            return "";
        };

        const text = extractText(children);
        const id = text
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-");

        return (
            <h3
                id={id}
                className="text-xl font-semibold mt-4 mb-1 scroll-mt-20 text-foreground/90"
                {...props}
            >
                {children}
            </h3>
        );
    },
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className="leading-6 text-sm mb-2 text-foreground/80" {...props}>
            {children}
        </p>
    ),
    a: ({
        children,
        href,
        ...props
    }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
        const isExternal = href?.startsWith("http");
        if (isExternal) {
            return (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline hover:text-blue-500"
                    {...props}
                >
                    {children}
                </a>
            );
        }
        return (
            <Link
                href={href || "#"}
                className="text-primary hover:underline"
                {...props}
            >
                {children}
            </Link>
        );
    },
    ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className="list-disc pl-4 mb-2 space-y-1" {...props}>
            {children}
        </ul>
    ),
    ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className="list-decimal pl-4 mb-2 space-y-1" {...props}>
            {children}
        </ol>
    ),
    li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
        <li {...props}>{children}</li>
    ),
    blockquote: ({
        children,
        ...props
    }: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote
            className="border-l-4 border-primary pl-4 italic my-2 text-muted-foreground"
            {...props}
        >
            {children}
        </blockquote>
    ),
    code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <code
            className="bg-foreground/5 px-1.5 py-0.5 rounded text-xs! font-mono"
            {...props}
        >
            {children}
        </code>
    ),
    pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
        <pre
            className="bg-foreground/5! p-4 border rounded-lg overflow-x-auto mb-2 text-xs!"
            {...props}
        >
            {children}
        </pre>
    ),
    img: ({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) => {
        const fullSrc = typeof src === "string" ? getFullImageUrl(src) : null;
        return (
            <div className="relative w-full h-full aspect-video my-2 bg-muted/50 border rounded-lg">
                {fullSrc ? (
                    <Image
                        src={fullSrc}
                        alt={alt || ""}
                        fill
                        className="object-contain rounded-lg w-full"
                        loading="eager"
                    />
                ) : (
                    <p className="text-muted-foreground text-xs md:text-sm">
                        {alt}
                    </p>
                )}
            </div>
        );
    },
    hr: () => <hr className="my-6 border-border" />,
    table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="overflow-x-auto my-2">
            <table className="w-full border-collapse" {...props}>
                {children}
            </table>
        </div>
    ),
    thead: ({
        children,
        ...props
    }: React.HTMLAttributes<HTMLTableSectionElement>) => (
        <thead className="bg-muted" {...props}>
            {children}
        </thead>
    ),
    tbody: ({
        children,
        ...props
    }: React.HTMLAttributes<HTMLTableSectionElement>) => (
        <tbody {...props}>{children}</tbody>
    ),
    tr: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr className="border-b border-border" {...props}>
            {children}
        </tr>
    ),
    th: ({
        children,
        ...props
    }: React.HTMLAttributes<HTMLTableCellElement>) => (
        <th className="px-4 py-2 text-left font-semibold" {...props}>
            {children}
        </th>
    ),
    td: ({
        children,
        ...props
    }: React.HTMLAttributes<HTMLTableCellElement>) => (
        <td className="px-4 py-2" {...props}>
            {children}
        </td>
    ),
};
