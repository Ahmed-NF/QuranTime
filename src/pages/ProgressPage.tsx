import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../components/ui/BackButton';
import { ProgressOverview } from '../components/progress/ProgressOverview';
import { ProgressGoals, DEFAULT_GOALS } from '../components/progress/ProgressGoals';
import { ProgressChart } from '../components/progress/ProgressChart';
import { ProgressHeatmap } from '../components/progress/ProgressHeatmap';
import { useReadingProgress } from '../hooks/useReadingProgress';

export const ProgressPage: React.FC = () => {
  const navigate = useNavigate();
  const { stats } = useReadingProgress();

  // Calculate streak and update goals
  const streak = stats.weeklyData.reduce((count, day) => {
    return day.pages > 0 ? count + 1 : 0;
  }, 0);

  const goals = DEFAULT_GOALS.map(goal => {
    if (goal.id === 'daily-pages') {
      return { ...goal, current: stats.today.pages };
    }
    if (goal.id === 'weekly-khatma') {
      return { ...goal, current: stats.thisWeek.pages };
    }
    if (goal.id === 'streak') {
      return { ...goal, current: streak };
    }
    return goal;
  });

  // Generate heatmap data
  const heatmapData = stats.weeklyData.map(day => ({
    date: new Date(day.date),
    value: day.pages
  }));

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <BackButton onClick={() => navigate('/')} />
        </div>

        <h1 className="text-3xl font-bold mb-8 text-primary text-center">
          تقدم القراءة
        </h1>

        <div className="grid gap-6">
          <ProgressOverview
            totalPages={stats.thisWeek.pages}
            totalVerses={stats.thisWeek.verses}
            streak={streak}
            averageDaily={stats.average.pagesPerDay}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProgressGoals goals={goals} />
            <ProgressChart data={stats.weeklyData} />
          </div>

          <ProgressHeatmap data={heatmapData} />
        </div>
      </div>
    </div>
  );
};