import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

interface AnalyticsContextType {
  trackEvent: (eventName: string, eventParams?: { [key: string]: any }) => void;
  trackPageView: (pageTitle?: string) => void;
}

const AnalyticsContext = React.createContext<AnalyticsContextType | null>(null);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const trackPageView = (pageTitle?: string) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: pageTitle || document.title,
        page_location: window.location.href
      });
    }
  };

  const trackEvent = (eventName: string, eventParams?: { [key: string]: any }) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, {
        ...eventParams,
        page_path: location.pathname + location.search,
        page_location: window.location.href
      });
    }
  };

  // Track page views automatically
  useEffect(() => {
    trackPageView();
  }, [location]);

  return (
    <AnalyticsContext.Provider value={{ trackEvent, trackPageView }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = React.useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};