import React from 'react';
import { format, eachDayOfInterval, subDays, isSameDay } from 'date-fns';
import { ar } from 'date-fns/locale';

interface HeatmapData {
  date: Date;
  value: number;
}

interface ProgressHeatmapProps {
  data: HeatmapData[];
  days?: number;
}

export const ProgressHeatmap: React.FC<ProgressHeatmapProps> = ({ 
  data,
  days = 60
}) => {
  const today = new Date();
  const startDate = subDays(today, days - 1);
  
  const dates = eachDayOfInterval({ start: startDate, end: today });
  
  const getIntensity = (value: number) => {
    if (value === 0) return 'bg-gray-100';
    if (value < 5) return 'bg-primary/20';
    if (value < 10) return 'bg-primary/40';
    if (value < 15) return 'bg-primary/60';
    return 'bg-primary/80';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
      <h3 className="text-xl font-semibold mb-6">نشاط القراءة</h3>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(14px,1fr))] gap-1">
        {dates.map((date) => {
          const dayData = data.find(d => isSameDay(d.date, date));
          const value = dayData?.value || 0;
          
          return (
            <div
              key={date.toISOString()}
              className={`aspect-square rounded-sm ${getIntensity(value)} transition-colors duration-200 hover:scale-125 group relative`}
              title={`${format(date, 'dd/MM/yyyy')} - ${value} صفحة`}
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {format(date, 'dd MMMM', { locale: ar })}
                <br />
                {value} صفحة
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-end gap-2 text-sm text-text-secondary">
        <span>أقل</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-gray-100" />
          <div className="w-3 h-3 rounded-sm bg-primary/20" />
          <div className="w-3 h-3 rounded-sm bg-primary/40" />
          <div className="w-3 h-3 rounded-sm bg-primary/60" />
          <div className="w-3 h-3 rounded-sm bg-primary/80" />
        </div>
        <span>أكثر</span>
      </div>
    </div>
  );
};