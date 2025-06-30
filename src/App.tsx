
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { RestaurantProvider } from "@/contexts/RestaurantContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import ColabDetail from "./pages/ColabDetail";
import NotFound from "./pages/NotFound";
import ChatHome from "./pages/ChatHome";
import ChatConversation from "./pages/ChatConversation";
import CollaborationsPage from "./pages/CollaborationsPage";
import CreateCollaborationPage from "./pages/CreateCollaborationPage";
import LocationSelectionPage from "./pages/LocationSelectionPage";
import FoodieSelectionPage from "./pages/FoodieSelectionPage";
import ProfilePage from "./pages/ProfilePage";
import SubscriptionPage from "./pages/SubscriptionPage";
import SubscriptionManagementPage from "./pages/SubscriptionManagementPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import FoodieProfilePage from "./pages/FoodieProfilePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <RestaurantProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/foodie/:foodieId" 
                element={
                  <ProtectedRoute>
                    <FoodieProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/collaborations" 
                element={
                  <ProtectedRoute>
                    <CollaborationsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/collaborations/create" 
                element={
                  <ProtectedRoute>
                    <CreateCollaborationPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/collaborations/location" 
                element={
                  <ProtectedRoute>
                    <LocationSelectionPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/collaborations/foodies" 
                element={
                  <ProtectedRoute>
                    <FoodieSelectionPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/chat" 
                element={
                  <ProtectedRoute>
                    <ChatHome />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/chat/:chatId" 
                element={
                  <ProtectedRoute>
                    <ChatConversation />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/colab/:id" 
                element={
                  <ProtectedRoute>
                    <ColabDetail />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/subscription" 
                element={
                  <ProtectedRoute>
                    <SubscriptionPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/subscription-management" 
                element={
                  <ProtectedRoute>
                    <SubscriptionManagementPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </RestaurantProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
