import React from 'react';
import { Book, BookOpen, Clock } from 'lucide-react';
import type { ReadingStats } from '../../types/progress';

interface ProgressStatsProps {
  stats: ReadingStats;
}

export const ProgressStats: React.FC<ProgressStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        icon={Book}
        title="اليوم"
        value={stats.today.pages}
        label="صفحة"
        subValue={stats.today.verses}
        subLabel="آية"
      />
      <StatCard
        icon={BookOpen}
        title="هذا الأسبوع"
        value={stats.thisWeek.pages}
        label="صفحة"
        subValue={stats.thisWeek.verses}
        subLabel="آية"
      />
      <StatCard
        icon={Clock}
        title="متوسط القراءة اليومي"
        value={stats.average.pagesPerDay}
        label="صفحة"
        subValue={stats.average.versesPerDay}
        subLabel="آية"
      />
    </div>
  );
};

interface StatCardProps {
  icon: React.FC<any>;
  title: string;
  value: number;
  label: string;
  subValue: number;
  subLabel: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  title,
  value,
  label,
  subValue,
  subLabel
}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
    <div className="flex items-center gap-4 mb-4">
      <div className="bg-primary/10 p-3 rounded-lg">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
    </div>
    <div className="space-y-2">
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-primary">{value}</span>
        <span className="text-text-secondary">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-semibold text-secondary">{subValue}</span>
        <span className="text-text-secondary">{subLabel}</span>
      </div>
    </div>
  </div>
);