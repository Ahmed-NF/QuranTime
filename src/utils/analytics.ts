// Initialize Google Analytics
export const initializeAnalytics = () => {
  // Load the GA4 script
  const script = document.createElement('script');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-70TWXB44HB';
  script.async = true;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-70TWXB44HB');
};