import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import LandingPage from './pages/LandingPage';
import WorkPage from './pages/WorkPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminAnalyticsPage from './pages/AdminAnalyticsPage';
import { useVisitorTracking } from './hooks/useVisitorTracking';

function PortfolioApp() {
  // Silent background privacy-conscious visitor tracking
  useVisitorTracking();

  return (
    <Routes>
      {/* Main portfolio homepage directly at root */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Clean section placeholders */}
      <Route path="/work" element={<WorkPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Private Admin Analytics Portal */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />

      {/* Redirect legacy /krupabt and any unknown routes to root */}
      <Route path="/krupabt/*" element={<Navigate to="/" replace />} />
      <Route path="/krupabt" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <PortfolioApp />
      </BrowserRouter>
    </ThemeProvider>
  );
}
