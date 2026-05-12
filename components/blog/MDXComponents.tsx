import Link from "next/link";
import Image from "next/image";

export const MDXComponents = {
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className="text-3xl font-bold mt-8 mb-4 scroll-mt-20" {...props}>
            {children}
        </h1>
    ),
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            className="text-2xl font-semibold mt-8 mb-4 scroll-mt-20"
            {...props}
        >
            {children}
        </h2>
    ),
    h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className="text-xl font-semibold mt-6 mb-3 scroll-mt-20" {...props}>
            {children}
        </h3>
    ),
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className="leading-7 mb-4" {...props}>
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
                    className="text-primary hover:underline"
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
        <ul className="list-disc list-inside mb-4 space-y-2" {...props}>
            {children}
        </ul>
    ),
    ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className="list-decimal list-inside mb-4 space-y-2" {...props}>
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
            className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground"
            {...props}
        >
            {children}
        </blockquote>
    ),
    code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <code className="px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
            {children}
        </code>
    ),
    pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
        <pre
            className="bg-muted p-4 rounded-lg overflow-x-auto mb-4 text-sm"
            {...props}
        >
            {children}
        </pre>
    ),
    img: ({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) => (
        <div className="relative w-full h-64 my-4">
            {src && typeof src === "string" && (
                <Image
                    src={src}
                    alt={alt || ""}
                    fill
                    className="object-cover rounded-lg"
                />
            )}
        </div>
    ),
    hr: () => <hr className="my-8 border-border" />,
    table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="overflow-x-auto my-4">
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
