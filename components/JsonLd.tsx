export default function JsonLd({ jsonLd }: { jsonLd: string }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
    );
}
