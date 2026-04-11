export interface ContributionDay {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4; // 0 = none, 4 = max
}

export interface ContributionWeek {
    days: ContributionDay[];
}

export interface ContributionData {
    weeks: ContributionWeek[];
    totalContributions: number;
    longestStreak: number;
    currentStreak: number;
}

export interface CellRendererProps {
    day: ContributionDay;
    size: number;
}
