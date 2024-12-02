export interface DailyStats {
  pages: number;
  verses: number;
}

export interface AverageStats {
  pagesPerDay: number;
  versesPerDay: number;
}

export interface WeeklyData {
  date: string;
  dayName: string;
  pages: number;
  verses: number;
}

export interface ReadingStats {
  today: DailyStats;
  thisWeek: DailyStats;
  average: AverageStats;
  weeklyData: WeeklyData[];
}