import { ImageResponse } from "next/og";

export const alt = "Software Developer Locations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        <div
            style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
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
            </div>
            <div
                style={{
                    fontSize: "52px",
                    fontWeight: 700,
                    color: "#f9fafb",
                    fontFamily: "Geist Bold",
                    lineHeight: 1.2,
                    textAlign: "center",
                }}
            >
                Software Developer
            </div>
            <div
                style={{
                    fontSize: "28px",
                    color: "#9ca3af",
                    fontFamily: "Geist",
                    marginTop: "12px",
                    textAlign: "center",
                }}
            >
                Available across India — Remote & Freelance
            </div>
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
                <div style={{
                    display: "contents"
                }}>
                    <span
                        style={{
                            fontSize: "20px",
                            color: "#f9fafb",
                            fontFamily: "Geist",
                        }}
                    >
                        Prabhat Mishra
                    </span>
                    <span
                        style={{
                            fontSize: "15px",
                            color: "#6b7280",
                            fontFamily: "Geist",
                            display: "block",
                        }}
                    >
                        TypeScript · React · Next.js · Node.js · Go
                    </span>
                </div>
            </div>
        </div>,
        {
            ...size,
        },
    );
}
