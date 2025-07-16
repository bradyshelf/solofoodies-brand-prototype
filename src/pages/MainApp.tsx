
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRestaurants } from '@/contexts/RestaurantContext';

const MainApp = () => {
  const navigate = useNavigate();
  const { restaurants, activeRestaurant } = useRestaurants();

  console.log('MainApp - restaurants:', restaurants);
  console.log('MainApp - activeRestaurant:', activeRestaurant);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center space-y-6">
            <div className="flex items-center gap-2 justify-center mb-8">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">SF</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Solo Foodies</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-gray-900">Restaurant Management</h1>
              <p className="text-gray-600">Manage your restaurants and collaborations</p>
              
              <div className="flex flex-col gap-3">
                <Button 
                  onClick={() => {
                    console.log('Navigating to collaborations...');
                    navigate('/collaborations');
                  }}
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-50"
                >
                  <Users className="w-4 h-4 mr-2" />
                  View Collaborations
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainApp;
