import {
    ContributionData,
    ContributionDay,
    ContributionWeek,
} from "@/types/contributions";
import { useCallback, useEffect, useRef, useState } from "react";

function computeLevel(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
    if (count === 0) return 0;
    if (count <= max * 0.15) return 1;
    if (count <= max * 0.4) return 2;
    if (count <= max * 0.7) return 3;
    return 4;
}

function buildGrid(raw: Record<string, number>): ContributionData {
    const today = new Date();
    const max = Math.max(...Object.values(raw), 1);
    const weeks: ContributionWeek[] = [];

    // start from 52 weeks ago, aligned to Sunday
    const start = new Date(today);
    start.setDate(today.getDate() - 364);
    // rewind to Sunday
    start.setDate(start.getDate() - start.getDay());

    let streak = 0;
    let longestStreak = 0;
    let currentStreak = 0;
    let total = 0;
    let inStreak = true;

    const allDays: ContributionDay[] = [];

    for (let w = 0; w < 53; w++) {
        const week: ContributionDay[] = [];
        for (let d = 0; d < 7; d++) {
            const date = new Date(start);
            date.setDate(start.getDate() + w * 7 + d);
            if (date > today) {
                week.push({ date: "", count: -1, level: 0 }); // future placeholder
                continue;
            }
            const key = date.toISOString().split("T")[0];
            const count = raw[key] ?? 0;
            total += count;
            week.push({ date: key, count, level: computeLevel(count, max) });
            allDays.push({ date: key, count, level: computeLevel(count, max) });
        }
        weeks.push({ days: week });
    }

    // compute streaks (reverse order)
    for (let i = allDays.length - 1; i >= 0; i--) {
        if (allDays[i].count > 0) {
            streak++;
            longestStreak = Math.max(longestStreak, streak);
            if (inStreak) currentStreak = streak;
        } else {
            if (inStreak && i < allDays.length - 1) inStreak = false;
            streak = 0;
        }
    }

    return { weeks, totalContributions: total, longestStreak, currentStreak };
}

export function useContributionData(username: string) {
    const [data, setData] = useState<ContributionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const isMounted = useRef(false);

    const fetch_ = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/contributions?username=${username}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const raw: Record<string, number> = await res.json();
            setData(buildGrid(raw));
        } catch (e) {
            setError(e instanceof Error ? e.message : "Failed to load");
        } finally {
            setLoading(false);
        }
    }, [username]);

    useEffect(() => {
        if (isMounted.current) return;
        isMounted.current = true;
        fetch_();
    }, [fetch_]);

    return { data, loading, error, refetch: fetch_ };
}
