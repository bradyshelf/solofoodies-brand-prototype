
import { useState } from 'react';
import { 
  User, 
  Bell, 
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import RestaurantSwitcher from './RestaurantSwitcher';
import AddRestaurantDialog from './AddRestaurantDialog';
import PlanSelectionDialog from './PlanSelectionDialog';
import { useRestaurants } from '@/contexts/RestaurantContext';

interface ProfileSidebarProps {
  onClose: () => void;
}

const ProfileSidebar = ({ onClose }: ProfileSidebarProps) => {
  const { signOut, userRole } = useAuth();
  const navigate = useNavigate();
  const [isAddRestaurantOpen, setIsAddRestaurantOpen] = useState(false);
  const [planSelectionDialogOpen, setPlanSelectionDialogOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<{ id: number; name: string } | null>(null);
  const { restaurants } = useRestaurants();

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const handleAddRestaurant = () => {
    setIsAddRestaurantOpen(true);
  };

  const handleRestaurantAdded = (restaurant: any) => {
    console.log('New restaurant added:', restaurant);
  };

  const handleReactivate = (restaurantId: number) => {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (restaurant) {
      setSelectedRestaurant({ id: restaurantId, name: restaurant.name });
      setPlanSelectionDialogOpen(true);
    }
  };

  const handleClosePlanSelectionDialog = () => {
    setPlanSelectionDialogOpen(false);
    setSelectedRestaurant(null);
  };

  const menuItems = [
    {
      title: "Mi perfil",
      icon: User,
      onClick: () => {
        console.log("Navigate to profile");
        onClose();
      }
    },
    {
      title: "Suscripción",
      icon: Bell,
      onClick: () => {
        navigate('/subscription-management');
        onClose();
      },
      showForRoles: ['restaurant']
    }
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => {
    if (item.showForRoles) {
      return item.showForRoles.includes(userRole || '');
    }
    return true;
  });

  const policyItems = [
    {
      title: "Políticas de privacidad",
      onClick: () => {
        console.log("Navigate to privacy policy");
        onClose();
      }
    },
    {
      title: "Condiciones de uso y contratación",
      onClick: () => {
        console.log("Navigate to terms of service");
        onClose();
      }
    },
    {
      title: "Política de cookies",
      onClick: () => {
        console.log("Navigate to cookie policy");
        onClose();
      }
    }
  ];

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header with Restaurant Switcher */}
      {userRole === 'restaurant' ? (
        <RestaurantSwitcher onAddRestaurant={handleAddRestaurant} onReactivate={handleReactivate} />
      ) : (
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
              <img
                src="/lovable-uploads/26ce4d51-7cef-481d-8b86-af6c758c3760.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Pollos Hermanos</h3>
              <p className="text-sm text-gray-500">@usuarioinstagram</p>
            </div>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div className="flex-1 px-4 py-4">
        <div className="space-y-1">
          {filteredMenuItems.map((item) => (
            <button
              key={item.title}
              onClick={item.onClick}
              className="w-full flex items-center px-3 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <item.icon className="w-5 h-5 mr-3 text-gray-600" />
              <span className="text-base text-gray-900">{item.title}</span>
            </button>
          ))}
        </div>

        {/* Separator */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Policy Items */}
        <div className="space-y-1">
          {policyItems.map((item) => (
            <button
              key={item.title}
              onClick={item.onClick}
              className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span className="text-sm text-gray-600">{item.title}</span>
            </button>
          ))}
        </div>

        {/* Solofoodies Branding */}
        <div className="mt-6 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">SF</span>
            </div>
            <span className="text-sm font-medium">Solofoodies</span>
          </div>
        </div>
      </div>

      {/* Footer - Sign Out */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center px-3 py-3 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="text-base">Cerrar sesión</span>
        </button>
      </div>

      {/* Add Restaurant Dialog */}
      <AddRestaurantDialog
        isOpen={isAddRestaurantOpen}
        onClose={() => setIsAddRestaurantOpen(false)}
        onAdd={handleRestaurantAdded}
      />

      {/* Plan Selection Dialog for Reactivation */}
      <PlanSelectionDialog
        isOpen={planSelectionDialogOpen}
        onClose={handleClosePlanSelectionDialog}
        restaurantName={selectedRestaurant?.name || ''}
      />
    </div>
  );
};

export default ProfileSidebar;
