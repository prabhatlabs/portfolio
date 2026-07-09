export type NowEntry = {
    title: string;
    description: string;
};

export const nowEntries: NowEntry[] = [
    {
        title: "Building rum-core SaaS",
        description:
            "Scaling the Real User Monitoring platform with an event-driven pre-aggregation pipeline across 34 Turso/SQLite tables, Bun/Elysia backend on Cloudflare Workers, and a Next.js dashboard. Focused on keeping per-request costs near zero while handling high-throughput telemetry ingestion.",
    },
    {
        title: "Self-Hosted Live Classroom Platform",
        description:
            "Architected a full-stack live classroom platform with LiveKit replacing Zoom — handling 10+ concurrent classes and 200+ simultaneous students. Recently cut dashboard load time by 94% (52s → ~3s) through server-driven MongoDB queries, index optimization across 100+ models, and eliminating BSON deserialization bottlenecks.",
    },
    {
        title: "Writing & Open Source",
        description:
            "Published a guide on building a self-hosted reverse port-forwarding tool in Go (Go Tunnel), and a practical approach to creating an MDX-powered blog with GitHub and Bun. Maintaining Go Tunnel and building privacy-first developer tools.",
    },
    {
        title: "Systems Design & Performance",
        description:
            "Deep-diving into event-driven architectures, microservices patterns, and large-scale database optimization. Recent work includes MongoDB aggregation pipeline tuning (25% load reduction), compound indexing on 16 models, and cutting read-heavy endpoint latency by 40-60% across a production platform.",
    },
];

export const lastUpdated = "July 2026";
