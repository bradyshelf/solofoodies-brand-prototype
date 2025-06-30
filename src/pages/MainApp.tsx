
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Menu, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfileSidebar from '@/components/ProfileSidebar';

const MainApp = () => {
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">SF</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Solo Foodies</span>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Restaurant Management</h1>
          <p className="text-gray-600">Manage your restaurants and subscriptions</p>
          
          <div className="flex flex-col gap-3">
            <Button 
              onClick={() => setIsProfileSidebarOpen(true)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Menu className="w-4 h-4 mr-2" />
              Open Restaurant Menu
            </Button>
            
            <Button 
              onClick={() => navigate('/subscription-management')}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Manage Subscriptions
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Sidebar Sheet */}
      <Sheet open={isProfileSidebarOpen} onOpenChange={setIsProfileSidebarOpen}>
        <SheetContent side="right" className="w-80 p-0">
          <ProfileSidebar onClose={() => setIsProfileSidebarOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MainApp;
