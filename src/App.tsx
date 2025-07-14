import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ContactSupportPage from "./pages/ContactSupportPage.tsx";
import ScrollToTop from "./components/ScrollToTop";
import TermsOfService from './components/TermsOfService';
import CookiePolicy from './components/CookiePolicy';
import GDPRCompliance from './components/GDPRCompliance';
import AIUsagePolicy from './components/AIUsagePolicy';
import Roadmap from './components/Roadmap';
import NewsletterPage from "./components/NewsletterPage.tsx";
import Mission from './components/Mission';
<<<<<<< HEAD
import ArticlePage from "./components/ArticlePage.tsx";
=======
import { initGA, trackPageView } from "./analytics";
>>>>>>> 117b2f4b771f5299a9e1509878de099f4bb851a1

const queryClient = new QueryClient();

// Analytics tracking wrapper component
function TrackingWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return <>{children}</>;
}

// Main App Routes component
function AppRoutes() {
  return (
      <TrackingWrapper>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<ContactSupportPage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/gdpr" element={<GDPRCompliance />} />
          <Route path="/ai-usage" element={<AIUsagePolicy />} />
          <Route path="/roadmap" element={<Roadmap />} />
<<<<<<< HEAD
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/newsletter/:id" element={<ArticlePage />} />
=======
          <Route path="/mission" element={<Mission />} />
>>>>>>> 117b2f4b771f5299a9e1509878de099f4bb851a1
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TrackingWrapper>
  );
}

const App = () => {
  // Initialize Google Analytics on app startup
  useEffect(() => {
    initGA();
  }, []);

  return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
  );
};

export default App;