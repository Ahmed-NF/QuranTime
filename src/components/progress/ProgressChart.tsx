import React from 'react';
import type { WeeklyData } from '../../types/progress';

interface ProgressChartProps {
  data: WeeklyData[];
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  const maxPages = Math.max(...data.map(d => d.pages));

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
      <h3 className="text-lg font-semibold mb-6">إحصائيات الأسبوع</h3>
      <div className="h-64 flex items-end gap-4">
        {data.map((day, index) => (
          <div
            key={day.date}
            className="flex-1 flex flex-col items-center gap-2"
          >
            <div className="w-full relative">
              <div
                className="w-full bg-primary/20 rounded-t-lg transition-all duration-500"
                style={{
                  height: `${(day.pages / maxPages) * 100}%`,
                  minHeight: day.pages > 0 ? '20px' : '4px'
                }}
              >
                <div className="absolute -top-8 right-0 left-0 text-center">
                  <span className="text-sm font-medium text-primary">
                    {day.pages}
                  </span>
                </div>
              </div>
            </div>
            <span className="text-sm text-text-secondary">
              {day.dayName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};