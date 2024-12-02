import React from 'react';
import { Book, Clock, TrendingUp } from 'lucide-react';

interface ProgressOverviewProps {
  totalPages: number;
  totalVerses: number;
  streak: number;
  averageDaily: number;
}

export const ProgressOverview: React.FC<ProgressOverviewProps> = ({
  totalPages,
  totalVerses,
  streak,
  averageDaily
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={Book}
        title="الصفحات المقروءة"
        value={totalPages}
        label="صفحة"
      />
      <StatCard
        icon={TrendingUp}
        title="الآيات المقروءة"
        value={totalVerses}
        label="آية"
      />
      <StatCard
        icon={Clock}
        title="أيام متتالية"
        value={streak}
        label="يوم"
        highlight={streak >= 7}
      />
      <StatCard
        icon={Clock}
        title="المعدل اليومي"
        value={averageDaily}
        label="صفحة"
      />
    </div>
  );
};

interface StatCardProps {
  icon: React.FC<any>;
  title: string;
  value: number;
  label: string;
  highlight?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  title,
  value,
  label,
  highlight = false
}) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border transition-all duration-300 hover:shadow-md ${
    highlight ? 'border-secondary' : 'border-border'
  }`}>
    <div className="flex items-center gap-4 mb-4">
      <div className={`p-3 rounded-lg ${
        highlight ? 'bg-secondary/10' : 'bg-primary/10'
      }`}>
        <Icon className={`w-6 h-6 ${
          highlight ? 'text-secondary' : 'text-primary'
        }`} />
      </div>
      <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
    </div>
    <div className="flex items-baseline gap-2">
      <span className={`text-3xl font-bold ${
        highlight ? 'text-secondary' : 'text-primary'
      }`}>
        {value}
      </span>
      <span className="text-text-secondary">{label}</span>
    </div>
  </div>
);