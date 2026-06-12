"use client";

import { useContributionData } from "@/hooks/use-contributions";
import { ContributionData, ContributionDay } from "@/types/contributions";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const LEVEL_BG_COLORS = [
    "bg-foreground/10",
    "bg-foreground/30",
    "bg-foreground/55",
    "bg-foreground/80",
    "bg-foreground/95",
];

const LEVEL_ALPHAS = [0.1, 0.3, 0.55, 0.8, 0.95];

/**
 * Resolves the actual rgb() value of `text-foreground` by temporarily
 * mounting a hidden element with that class and reading its computed color.
 * This works correctly in both light and dark mode since Tailwind/shadcn
 * updates the CSS variable on <html> when the theme changes.
 */
const resolveForegroundColor = (): [number, number, number] => {
    const tmp = document.createElement("div");
    tmp.className = "text-foreground";
    tmp.style.visibility = "hidden";
    tmp.style.position = "absolute";
    tmp.style.pointerEvents = "none";
    document.body.appendChild(tmp);

    // Force the browser to give us rgb() by drawing onto a canvas
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = getComputedStyle(tmp).color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;

    document.body.removeChild(tmp);
    return [r, g, b];
};

export function Stats({
    loading,
    data,
}: {
    loading: boolean;
    data: ContributionData;
}) {
    return (
        <div className="flex gap-3 md:gap-5 text-muted-foreground text-xs">
            {loading ? (
                <>
                    <span className="w-[110px] h-4 rounded-sm bg-foreground/10 animate-pulse"></span>
                    <span className="w-[98px] h-4 rounded-sm bg-foreground/10 animate-pulse"></span>
                    <span className="w-[86px] h-4 rounded-sm bg-foreground/10 animate-pulse"></span>
                </>
            ) : (
                <>
                    <span>
                        <span className="text-foreground font-semibold">
                            {data.totalContributions.toLocaleString()}
                        </span>{" "}
                        contributions
                    </span>
                    <span>
                        <span className="text-foreground font-semibold">
                            {data.currentStreak}d
                        </span>{" "}
                        current streak
                    </span>
                    <span>
                        <span className="text-foreground font-semibold">
                            {data.longestStreak}d
                        </span>{" "}
                        max streak
                    </span>
                </>
            )}
        </div>
    );
}

function MonthLabels({
    weeks,
    cellSize,
    gap,
}: {
    weeks: { days: ContributionDay[] }[];
    cellSize: number;
    gap: number;
}) {
    const labels: { label: string; index: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, i) => {
        const firstValid = week.days.find((d) => d.date);
        if (!firstValid) return;
        const month = new Date(firstValid.date).getMonth();
        if (month !== lastMonth) {
            labels.push({
                label: new Date(firstValid.date).toLocaleString("default", {
                    month: "short",
                }),
                index: i,
            });
            lastMonth = month;
        }
    });

    const totalCellWidth = cellSize + gap;

    return (
        <div
            className="relative h-5"
            style={{ width: weeks.length * totalCellWidth }}
        >
            {labels.map(({ label, index }) => (
                <span
                    key={label + index}
                    className="absolute text-[10px] text-muted-foreground/70"
                    style={{ left: index * totalCellWidth }}
                >
                    {label}
                </span>
            ))}
        </div>
    );
}

function DayLabels({ cellSize, gap }: { cellSize: number; gap: number }) {
    const days = ["", "Mon", "", "Wed", "", "Fri", ""];
    const totalCellHeight = cellSize + gap;
    return (
        <div className="flex flex-col mr-2">
            {days.map((d, i) => (
                <div
                    key={i}
                    style={{
                        height: totalCellHeight,
                        lineHeight: `${totalCellHeight}px`,
                    }}
                    className="text-[10px] text-muted-foreground/50 text-right"
                >
                    {d}
                </div>
            ))}
        </div>
    );
}

function Tooltip({ day }: { day: ContributionDay | null }) {
    if (!day || !day.date) return null;
    return (
        <div className="px-2 py-1 rounded-md bg-popover/5 backdrop-blur-sm border border-border text-xs text-popover-foreground shadow-lg">
            <span className="font-semibold">{day.count}</span> contributions on{" "}
            {new Date(day.date + "T00:00:00").toLocaleDateString("default", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
            })}
        </div>
    );
}

export function ContributionChart({
    username,
    cellSize = 12,
    gap = 3,
    showStats = true,
    showLabels = true,
    className = "",
}: {
    username: string;
    cellSize?: number;
    gap?: number;
    showStats?: boolean;
    showLabels?: boolean;
    className?: string;
}) {
    const { data, loading, error } = useContributionData(username);
    const [tooltip, setTooltip] = useState<{
        day: ContributionDay;
        x: number;
        y: number;
    } | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    const TOOLTIP_WIDTH = 220;
    const TOOLTIP_HEIGHT = 50;
    const OFFSET = 12;

    const getTooltipStyle = (x: number, y: number) => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const left =
            x + OFFSET + TOOLTIP_WIDTH > vw
                ? x - TOOLTIP_WIDTH - OFFSET
                : x + OFFSET;

        const top =
            y + OFFSET + TOOLTIP_HEIGHT > vh
                ? y - TOOLTIP_HEIGHT - OFFSET
                : y + OFFSET;

        return { left, top };
    };

    const drawChart = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || !data) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Resolve the foreground color from Tailwind at draw time so it
        // always reflects the current theme (light or dark).
        const [r, g, b] = resolveForegroundColor();
        const levelColors = LEVEL_ALPHAS.map(
            (a) => `rgba(${r}, ${g}, ${b}, ${a})`,
        );

        const dpr = window.devicePixelRatio || 1;
        const totalCellWidth = cellSize + gap;
        const totalCellHeight = cellSize + gap;
        const weeksCount = data.weeks.length;
        const canvasWidth = weeksCount * totalCellWidth;
        const canvasHeight = 7 * totalCellHeight;

        canvas.width = canvasWidth * dpr;
        canvas.height = canvasHeight * dpr;
        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;
        ctx.scale(dpr, dpr);

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        data.weeks.forEach((week, wi) => {
            week.days.forEach((day, di) => {
                if (day.count === -1) return;

                const x = wi * totalCellWidth;
                const y = di * totalCellHeight;

                ctx.fillStyle = levelColors[day.level];
                ctx.beginPath();
                ctx.roundRect(x, y, cellSize, cellSize, 0);
                ctx.fill();
            });
        });
    }, [data, cellSize, gap]);

    useEffect(() => {
        drawChart();
    }, [drawChart]);

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setContainerWidth(entry.contentRect.width);
            }
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Re-draw whenever the theme class changes on <html> (Tailwind dark mode)
    useEffect(() => {
        const handleThemeChange = () => drawChart();
        const observer = new MutationObserver(handleThemeChange);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });
        return () => observer.disconnect();
    }, [drawChart]);

    const getDayAtPosition = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!data) return null;
        const canvas = canvasRef.current;
        if (!canvas) return null;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const totalCellWidth = cellSize + gap;
        const totalCellHeight = cellSize + gap;

        const weekIndex = Math.floor(x / totalCellWidth);
        const dayIndex = Math.floor(y / totalCellHeight);

        if (weekIndex < 0 || weekIndex >= data.weeks.length) return null;
        if (dayIndex < 0 || dayIndex >= 7) return null;

        const day = data.weeks[weekIndex].days[dayIndex];
        if (!day || day.count === -1) return null;

        return day;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const day = getDayAtPosition(e);
        if (day && day.date) {
            setTooltip({ day, x: e.clientX, y: e.clientY });
        } else {
            setTooltip(null);
        }
    };

    const handleMouseLeave = () => {
        setTooltip(null);
    };

    if (error) {
        return (
            <div className={`text-sm text-destructive ${className}`}>
                Failed to load: {error}
            </div>
        );
    }

    if (!data) return null;

    const totalCellWidth = cellSize + gap;
    const totalCellHeight = cellSize + gap;
    const canvasWidth = data.weeks.length * totalCellWidth;
    const canvasHeight = 7 * totalCellHeight;

    return (
        <div className={`select-none space-y-3 ${className}`} ref={containerRef}>
            {showStats && <Stats loading={loading} data={data} />}

            <div className="flex w-full overflow-x-auto">
                <div className="flex flex-col">
                    {showLabels && (
                        <div className="h-5 mb-1">
                            <MonthLabels
                                weeks={data.weeks}
                                cellSize={cellSize}
                                gap={gap}
                            />
                        </div>
                    )}

                    {loading ? (
                        <div
                            className="h-[102px] w-full animate-pulse bg-foreground/10 rounded"
                            style={{ gap }}
                        />
                    ) : (
                        <div className="flex w-full">
                            {showLabels && (
                                <DayLabels cellSize={cellSize} gap={gap} />
                            )}
                            <canvas
                                ref={canvasRef}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                style={{
                                    width: `${canvasWidth}px`,
                                    height: `${canvasHeight}px`,
                                }}
                                className="cursor-pointer"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-end items-center gap-1 text-[10px] text-muted-foreground/60">
                <span>Less</span>
                {LEVEL_BG_COLORS.map((c, i) => (
                    <div
                        key={i}
                        style={{ width: cellSize, height: cellSize }}
                        className={`rounded-xs ${c}`}
                    />
                ))}
                <span>More</span>
            </div>

            {tooltip &&
                createPortal(
                    <div
                        style={{
                            position: "fixed",
                            ...getTooltipStyle(tooltip.x, tooltip.y),
                            pointerEvents: "none",
                            zIndex: 9999,
                        }}
                    >
                        <Tooltip day={tooltip.day} />
                    </div>,
                    document.body,
                )}
        </div>
    );
}
