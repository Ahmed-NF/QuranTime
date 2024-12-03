import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AudioProvider } from './contexts/AudioContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ReciterProvider } from './contexts/ReciterContext';
import { FocusProvider } from './contexts/FocusContext';
import { LandingPage } from './pages/LandingPage';
import { BrowsePage } from './pages/BrowsePage';
import { SurahPage } from './pages/SurahPage';
import { ProgressPage } from './pages/ProgressPage';
import { QuizPage } from './pages/QuizPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { SettingsPage } from './pages/SettingsPage';
import { Layout } from './components/layout/Layout';
import { initializeAnalytics } from './utils/analytics';
import { AnalyticsProvider } from './contexts/AnalyticsContext';

// Initialize analytics when the app loads
initializeAnalytics();

function App() {
  return (
    <Router>
      <AnalyticsProvider>
        <LoadingProvider>
          <ThemeProvider>
            <ReciterProvider>
              <AudioProvider>
                <FocusProvider>
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route element={<Layout />}>
                      <Route path="/browse" element={<BrowsePage />} />
                      <Route path="/surah/:englishName" element={<SurahPage />} />
                      <Route path="/progress" element={<ProgressPage />} />
                      <Route path="/quiz" element={<QuizPage />} />
                      <Route path="/bookmarks" element={<BookmarksPage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                    </Route>
                  </Routes>
                </FocusProvider>
              </AudioProvider>
            </ReciterProvider>
          </ThemeProvider>
        </LoadingProvider>
      </AnalyticsProvider>
    </Router>
  );
}

export default App;
