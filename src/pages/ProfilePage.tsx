
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ModularProfile } from '@/types/profile';
import AddressBlock from '@/components/profile/AddressBlock';
import ProductBlock from '@/components/profile/ProductBlock';
import CTAButtons from '@/components/profile/CTAButtons';
import CollaborationPreferencesBlock from '@/components/profile/CollaborationPreferencesBlock';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ModularProfile>({
    name: 'Pollos Hermanos',
    description: 'Authentic Mexican cuisine with the finest ingredients',
    phone: '+34 912 345 678',
    website_url: 'https://polloshermanos.es',
    
    address_block: {
      address: 'Calle Gran Vía, 28',
      city: 'Madrid',
      state: 'Madrid',
      zip_code: '28013',
      opening_hours: 'Mon-Fri: 12pm-11pm\nSat-Sun: 11am-12am'
    },
    
    menu_block: {
      dishes: []
    },
    
    product_block: {
      products: [
        {
          id: '1',
          name: 'Signature Hot Sauce',
          description: 'Our famous homemade hot sauce with a perfect blend of spices',
          price: '€12.99',
          sku: 'PH-HS-001',
          order_link: 'https://shop.polloshermanos.es/hot-sauce'
        }
      ]
    },
    
    media_block: {
      images: []
    },
    
    cta_buttons: [
      {
        id: '1',
        label: 'Reserve a Table',
        type: 'reserve',
        link: 'https://reservations.polloshermanos.es',
        isActive: true
      },
      {
        id: '2',
        label: 'Buy Our Products',
        type: 'shop',
        link: 'https://shop.polloshermanos.es',
        isActive: true
      }
    ],
    
    collaboration_preferences: {
      types: ['influencer_visits', 'product_sendouts', 'sponsored_content']
    },
    
    social_links: {
      instagram: '@polloshermanos_madrid'
    }
  });

  const handleSave = () => {
    console.log('Profile saved:', profile);
    setIsEditing(false);
  };

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-semibold">EDITAR PERFIL</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Image & Basic Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src="/lovable-uploads/26ce4d51-7cef-481d-8b86-af6c758c3760.png"
                  alt="Restaurant"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="space-y-2">
                  <div>
                    <Label className="text-sm text-gray-600">Name</Label>
                    {isEditing ? (
                      <Input
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        placeholder="Business name"
                      />
                    ) : (
                      <p className="font-medium">{profile.name}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Username</Label>
                    <p className="text-gray-500">@{profile.name?.toLowerCase().replace(/\s+/g, '') || 'username'}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label className="text-sm text-gray-600">Description</Label>
              <p className="text-xs text-gray-500 mb-2">Tell people about your business</p>
              {isEditing ? (
                <Textarea
                  value={profile.description}
                  onChange={(e) => setProfile({...profile, description: e.target.value})}
                  placeholder="Describe your business..."
                  rows={3}
                />
              ) : (
                <p className="text-gray-900">{profile.description}</p>
              )}
            </div>
            
            <div>
              <Label className="text-sm text-gray-600">Phone</Label>
              {isEditing ? (
                <Input
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  placeholder="Phone number"
                />
              ) : (
                <p className="text-gray-900">{profile.phone}</p>
              )}
            </div>

            <div>
              <Label className="text-sm text-gray-600">Website</Label>
              {isEditing ? (
                <Input
                  value={profile.website_url}
                  onChange={(e) => setProfile({...profile, website_url: e.target.value})}
                  placeholder="https://your-website.com"
                />
              ) : (
                <a 
                  href={profile.website_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {profile.website_url}
                </a>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Modular Blocks */}
        <AddressBlock
          data={profile.address_block}
          isEditing={isEditing}
          onChange={(data) => setProfile({...profile, address_block: data})}
        />

        <ProductBlock
          data={profile.product_block}
          isEditing={isEditing}
          onChange={(data) => setProfile({...profile, product_block: data})}
        />

        <CTAButtons
          buttons={profile.cta_buttons}
          isEditing={isEditing}
          onChange={(buttons) => setProfile({...profile, cta_buttons: buttons})}
        />

        <CollaborationPreferencesBlock
          data={profile.collaboration_preferences}
          isEditing={isEditing}
          onChange={(data) => setProfile({...profile, collaboration_preferences: data})}
        />

        {/* Save Button */}
        {isEditing && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
            <div className="flex space-x-3">
              <Button onClick={handleSave} className="flex-1">
                Guardar cambios
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
