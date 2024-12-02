import { VERSES, ADHKAR } from '../data/verses';

export const getRandomContent = () => {
  const showAdhkar = Math.random() > 0.5;
  
  if (showAdhkar) {
    const randomIndex = Math.floor(Math.random() * ADHKAR.length);
    return {
      type: 'dhikr',
      content: ADHKAR[randomIndex]
    };
  }
  
  const randomIndex = Math.floor(Math.random() * VERSES.length);
  return {
    type: 'verse',
    content: VERSES[randomIndex]
  };
};