
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { RestaurantProvider } from "@/contexts/RestaurantContext";
import { Sheet, SheetContent } from '@/components/ui/sheet';
import ProfileSidebar from '@/components/ProfileSidebar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const queryClient = new QueryClient();

const App = () => {
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <RestaurantProvider>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Solo Foodies</h1>
                <p className="text-gray-600 mb-8">Profile Sidebar Demo</p>
                <Button 
                  onClick={() => setIsProfileSidebarOpen(true)}
                  className="flex items-center space-x-2"
                >
                  <Menu className="w-4 h-4" />
                  <span>Open Profile Sidebar</span>
                </Button>
              </div>

              {/* Profile Sidebar Sheet */}
              <Sheet open={isProfileSidebarOpen} onOpenChange={setIsProfileSidebarOpen}>
                <SheetContent side="right" className="w-80 p-0">
                  <ProfileSidebar onClose={() => setIsProfileSidebarOpen(false)} />
                </SheetContent>
              </Sheet>
            </div>
          </RestaurantProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
