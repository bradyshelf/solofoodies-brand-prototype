
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RestaurantProvider } from "@/contexts/RestaurantContext";
import MainApp from "./pages/MainApp";
import SubscriptionManagementPage from "./pages/SubscriptionManagementPage";
import ProfilePage from "./pages/ProfilePage";
import CollaborationsPage from "./pages/CollaborationsPage";
import CreateCollaborationPage from "./pages/CreateCollaborationPage";
import LocationSelectionPage from "./pages/LocationSelectionPage";
import FoodieSelectionPage from "./pages/FoodieSelectionPage";
import ColabDetail from "./pages/ColabDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RestaurantProvider>
          <Routes>
            <Route path="/" element={<MainApp />} />
            <Route path="/dashboard" element={<MainApp />} />
            <Route path="/subscription-management" element={<SubscriptionManagementPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/collaborations" element={<CollaborationsPage />} />
            <Route path="/collaborations/create" element={<CreateCollaborationPage />} />
            <Route path="/collaborations/location" element={<LocationSelectionPage />} />
            <Route path="/collaborations/foodies" element={<FoodieSelectionPage />} />
            <Route path="/collaboration/:id" element={<ColabDetail />} />
            <Route path="*" element={<MainApp />} />
          </Routes>
        </RestaurantProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
