import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
//import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CookiePolicy from './components/CookiePolicy';
import GDPRCompliance from './components/GDPRCompliance';
import AIUsagePolicy from './components/AIUsagePolicy';
import Roadmap from './components/Roadmap';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <Routes>
  <Route path="/" element={<Index />} />
  <Route path="/terms" element={<TermsOfService />} />
  <Route path="/cookie-policy" element={<CookiePolicy />} />
  <Route path="/gdpr" element={<GDPRCompliance />} />
  <Route path="/ai-usage" element={<AIUsagePolicy />} />
  <Route path="/roadmap" element={<Roadmap />} />
  <Route path="*" element={<NotFound />} />
</Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
