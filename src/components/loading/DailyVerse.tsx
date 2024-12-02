import React from 'react';

interface DailyVerseProps {
  content: {
    type: 'verse' | 'dhikr';
    content: any;
  };
}

export const DailyVerse: React.FC<DailyVerseProps> = ({ content }) => {
  const isVerse = content.type === 'verse';
  const data = content.content;

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-primary mb-8 font-quran text-center">
        {isVerse ? 'القرآن الكريم' : 'أذكار وأدعية'}
      </h1>

      <div className="bg-white rounded-2xl p-8 shadow-lg border border-primary/10">
        <div className="space-y-6">
          <div className="text-3xl font-quran leading-relaxed text-text-primary text-center">
            {data.text}
          </div>
          
          {isVerse ? (
            <div className="flex items-center justify-center gap-3 text-sm text-text-secondary">
              <span className="bg-primary/5 px-4 py-2 rounded-full">سورة {data.surah}</span>
              <span className="bg-primary/5 px-4 py-2 rounded-full">الآية {data.ayahNumber}</span>
            </div>
          ) : (
            <div className="text-center">
              <span className="bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm inline-block">
                {data.count} مرات
              </span>
            </div>
          )}

          <div className="pt-6 border-t border-primary/10">
            <p className="text-lg text-text-secondary leading-relaxed text-center">
              {isVerse ? data.interpretation : data.virtue}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};