import React from 'react';
import { Target, Award, Trophy } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  icon: React.FC<any>;
}

interface ProgressGoalsProps {
  goals: Goal[];
}

export const ProgressGoals: React.FC<ProgressGoalsProps> = ({ goals }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
      <h3 className="text-xl font-semibold mb-6">الأهداف</h3>
      <div className="space-y-6">
        {goals.map((goal) => (
          <GoalItem key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
};

const GoalItem: React.FC<{ goal: Goal }> = ({ goal }) => {
  const progress = (goal.current / goal.target) * 100;
  const isComplete = progress >= 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            isComplete ? 'bg-green-100' : 'bg-primary/10'
          }`}>
            <goal.icon className={`w-5 h-5 ${
              isComplete ? 'text-green-600' : 'text-primary'
            }`} />
          </div>
          <span className="font-medium">{goal.title}</span>
        </div>
        <span className="text-sm text-text-secondary">
          {goal.current} / {goal.target} {goal.unit}
        </span>
      </div>
      <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            isComplete ? 'bg-green-500' : 'bg-primary'
          }`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
};

export const DEFAULT_GOALS: Goal[] = [
  {
    id: 'daily-pages',
    title: 'القراءة اليومية',
    target: 20,
    current: 0,
    unit: 'صفحة',
    icon: Target
  },
  {
    id: 'weekly-khatma',
    title: 'ختمة أسبوعية',
    target: 604,
    current: 0,
    unit: 'صفحة',
    icon: Award
  },
  {
    id: 'streak',
    title: 'المداومة',
    target: 30,
    current: 0,
    unit: 'يوم',
    icon: Trophy
  }
];