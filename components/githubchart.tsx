"use client";

import { useContributionData } from "@/hooks/use-contributions";
import {
    CellRendererProps,
    ContributionData,
    ContributionDay,
    ContributionWeek,
} from "@/types/contributions";
import { useState } from "react";

const LEVEL_COLORS = [
    "bg-muted dark:bg-muted/70",
    "bg-emerald-200 dark:bg-emerald-900/60",
    "bg-emerald-400 dark:bg-emerald-700/80",
    "bg-emerald-600 dark:bg-emerald-500",
    "bg-emerald-700 dark:bg-emerald-400",
];

export function DefaultCellRenderer({ day, size }: CellRendererProps) {
    if (day.count === -1) return <div style={{ width: size, height: size }} />;
    return (
        <div
            style={{ width: size, height: size }}
            className={`transition-all duration-150 hover:ring-1 hover:ring-emerald-400/60 hover:scale-110 ${LEVEL_COLORS[day.level]}`}
        />
    );
}

export function Stats({
    loading,
    data,
}: {
    loading: boolean;
    data: ContributionData;
}) {
    return (
        <div className="flex gap-3 md:gap-5 mb-4 text-muted-foreground text-xs">
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

function MonthLabels({ weeks }: { weeks: ContributionWeek[] }) {
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

    return (
        <div
            className="relative h-5 w-[800px] flex justify-between mb-1"
            style={
                {
                    // display: "grid",
                    // gridTemplateColumns: `repeat(${weeks.length}, 1fr)`,
                }
            }
        >
            {labels.map(({ label, index }) => (
                <span
                    key={label + index}
                    className="text-[10px] text-muted-foreground/70 w-full"
                    style={{ left: `${(index / weeks.length) * 100}%` }}
                >
                    {label}
                </span>
            ))}
        </div>
    );
}

function DayLabels({ cellSize, gap }: { cellSize: number; gap: number }) {
    const days = ["", "Mon", "", "Wed", "", "Fri", ""];
    return (
        <div className="flex flex-col mr-2" style={{ gap }}>
            {days.map((d, i) => (
                <div
                    key={i}
                    style={{ height: cellSize, lineHeight: `${cellSize}px` }}
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
        <div className="fixed z-50 pointer-events-none px-2 py-1 rounded-md bg-popover border border-border text-xs text-popover-foreground shadow-lg">
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
        showLeft: boolean;
    } | null>(null);

    if (error) {
        return (
            <div className={`text-sm text-destructive ${className}`}>
                Failed to load: {error}
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className={`select-none ${className}`}>
            {/* Stats */}
            {showStats && <Stats loading={loading} data={data} />}

            {/* Grid */}
            <div className="flex w-full ">
                {/*{showLabels && <DayLabels cellSize={cellSize} gap={gap} />}*/}
                <div className="flex flex-col overflow-x-auto">
                    {showLabels && <MonthLabels weeks={data.weeks} />}

                    {loading ? (
                        <div
                            className="h-[102px] w-full animate-pulse bg-foreground/10 rounded"
                            style={{ gap }}
                        ></div>
                    ) : error ? (
                        <div
                            className="h-[102px] w-full bg-foreground/10 rounded flex items-center justify-center"
                            style={{ gap }}
                        >
                            Something went wrong!
                        </div>
                    ) : (
                        <div className="flex w-full" style={{ gap }}>
                            {data.weeks.map((week, wi) => (
                                <div
                                    key={wi}
                                    className="flex flex-col"
                                    style={{ gap }}
                                >
                                    {week.days.map((day, di) => (
                                        <div
                                            key={di}
                                            onMouseEnter={(e) => {
                                                if (day.date)
                                                    setTooltip({
                                                        day,
                                                        x: e.clientX,
                                                        y: e.clientY,
                                                        showLeft:
                                                            e.clientX >
                                                            window.innerWidth /
                                                                2,
                                                    });
                                            }}
                                            onMouseMove={(e) => {
                                                if (day.date)
                                                    setTooltip({
                                                        day,
                                                        x: e.clientX,
                                                        y: e.clientY,
                                                        showLeft:
                                                            e.clientX >
                                                            window.innerWidth /
                                                                2,
                                                    });
                                            }}
                                            onMouseLeave={() =>
                                                setTooltip(null)
                                            }
                                        >
                                            <DefaultCellRenderer
                                                day={day}
                                                size={cellSize}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Legend */}
            <div className="flex justify-end items-center gap-1 mt-3 text-[10px] text-muted-foreground/60">
                <span>Less</span>
                {LEVEL_COLORS.map((c, i) => (
                    <div
                        key={i}
                        style={{ width: cellSize, height: cellSize }}
                        className={`${c}`}
                    />
                ))}
                <span>More</span>
            </div>

            {/* Tooltip */}
            {tooltip && (
                <div
                    style={{
                        position: "fixed",
                        left: tooltip.showLeft
                            ? tooltip.x - 230
                            : tooltip.x + 10,
                        top: tooltip.y - 30,
                        pointerEvents: "none",
                        zIndex: 50,
                    }}
                >
                    <Tooltip day={tooltip.day} />
                </div>
            )}
        </div>
    );
}
