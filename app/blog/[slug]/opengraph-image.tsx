import { getPostMetaBySlug } from "@/lib/blogs";
import { ImageResponse } from "next/og";

export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
    const { slug } = await params;
    const post = await getPostMetaBySlug(slug);

    return new ImageResponse(
        <div
            style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                background:
                    "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
                padding: "60px 80px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "-50%",
                    right: "-30%",
                    width: "80%",
                    height: "200%",
                    background:
                        "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
                    borderRadius: "50%",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "-20%",
                    left: "-10%",
                    width: "50%",
                    height: "80%",
                    background:
                        "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
                    borderRadius: "50%",
                }}
            />
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                }}
            >
                <div
                    style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#3b82f6",
                    }}
                />
                <span
                    style={{
                        fontSize: "18px",
                        color: "#3b82f6",
                        fontFamily: "Geist",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                    }}
                >
                    prabhatlabs.dev
                </span>
                {post?.date && (
                    <>
                        <div
                            style={{
                                width: "4px",
                                height: "4px",
                                borderRadius: "50%",
                                background: "#6b7280",
                            }}
                        />
                        <span
                            style={{
                                fontSize: "16px",
                                color: "#6b7280",
                                fontFamily: "Geist",
                            }}
                        >
                            {new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </span>
                    </>
                )}
            </div>
            <div
                style={{
                    fontSize: "48px",
                    fontWeight: 700,
                    color: "#f9fafb",
                    fontFamily: "Geist Bold",
                    lineHeight: 1.2,
                    maxWidth: "900px",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
            >
                {post?.title || "Blog Post"}
            </div>
            {post?.description && (
                <p
                    style={{
                        fontSize: "22px",
                        color: "#9ca3af",
                        fontFamily: "Geist",
                        marginTop: "24px",
                        maxWidth: "800px",
                        lineHeight: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {post.description}
                </p>
            )}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginTop: "40px",
                }}
            >
                <div
                    style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: "#3b82f6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "18px",
                        fontFamily: "Geist Bold",
                    }}
                >
                    PM
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <span
                        style={{
                            fontSize: "18px",
                            color: "#f9fafb",
                            fontFamily: "Geist",
                        }}
                    >
                        Prabhat Mishra
                    </span>
                    <span
                        style={{
                            fontSize: "14px",
                            color: "#6b7280",
                            fontFamily: "Geist",
                        }}
                    >
                        Software Developer
                    </span>
                </div>
                {post?.tags && post.tags.length > 0 && (
                    <div
                        style={{
                            display: "flex",
                            gap: "8px",
                            marginLeft: "20px",
                        }}
                    >
                        {post.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                style={{
                                    fontSize: "13px",
                                    color: "#9ca3af",
                                    fontFamily: "Geist",
                                    padding: "4px 12px",
                                    borderRadius: "999px",
                                    border: "1px solid #374151",
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>,
        {
            ...size,
        },
    );
}
