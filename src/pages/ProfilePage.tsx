import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Edit, Plus, MapPin, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductsExperiencesTab from '@/components/profile/ProductsExperiencesTab';
import AddressHoursBlock from '@/components/profile/AddressHoursBlock';
import CustomCTABlock from '@/components/profile/CustomCTABlock';
import CollabPreferencesBlock from '@/components/profile/CollabPreferencesBlock';
import WebsiteLinksBlock from '@/components/profile/WebsiteLinksBlock';

interface RestaurantProfile {
  id?: string;
  restaurant_name: string;
  description: string;
  cuisine_type: string;
}

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  contact_person: string;
}

interface ProductExperience {
  id: string;
  title: string;
  description: string;
  image?: string;
  externalLink?: string;
  category: 'Product' | 'Event' | 'Box' | 'Workshop' | 'Other';
  tags?: string[];
}

interface ProductsExperiencesData {
  items: ProductExperience[];
  customCTA?: {
    text: string;
    url: string;
  };
}

interface CustomCTA {
  id: string;
  type: string;
  label: string;
  url: string;
}

interface AddressHoursData {
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  opening_hours?: string;
}

interface WebsiteLinksData {
  website_url: string;
  booking_url?: string;
  shop_url?: string;
  instagram_url?: string;
  facebook_url?: string;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Core profile data
  const [profile, setProfile] = useState<RestaurantProfile>({
    restaurant_name: 'Pollos Hermanos',
    description: 'Authentic Mexican cuisine with the finest ingredients',
    cuisine_type: 'Mexican'
  });

  // Modular block data
  const [addressHours, setAddressHours] = useState<AddressHoursData>({
    address: 'Calle Gran Vía, 28',
    city: 'Madrid',
    state: 'Madrid',
    zip_code: '28013',
    phone: '+34 912 345 678',
    opening_hours: 'Lunes a Viernes: 12:00 - 24:00\nSábados y Domingos: 11:00 - 01:00'
  });

  const [websiteLinks, setWebsiteLinks] = useState<WebsiteLinksData>({
    website_url: 'https://polloshermanos.es',
    booking_url: '',
    shop_url: '',
    instagram_url: '',
    facebook_url: ''
  });

  const [customCTAs, setCustomCTAs] = useState<CustomCTA[]>([
    {
      id: '1',
      type: 'reserve',
      label: 'Reservar Mesa',
      url: 'https://polloshermanos.es/reservas'
    }
  ]);

  const [collabPreferences, setCollabPreferences] = useState<string[]>([
    'influencer-visits',
    'sponsored-content'
  ]);

  const [locations, setLocations] = useState<Location[]>([]);
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [newLocation, setNewLocation] = useState<Omit<Location, 'id'>>({
    name: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    phone: '',
    contact_person: ''
  });

  const [productsExperiences, setProductsExperiences] = useState<ProductsExperiencesData>({
    items: [],
    customCTA: undefined
  });

  const handleSave = () => {
    console.log('Profile saved:', {
      profile,
      addressHours,
      websiteLinks,
      customCTAs,
      collabPreferences,
      locations,
      productsExperiences
    });
    setIsEditing(false);
  };

  const handleAddLocation = () => {
    const location: Location = {
      id: Math.random().toString(36).substr(2, 9),
      ...newLocation
    };
    setLocations([...locations, location]);
    setNewLocation({
      name: '',
      address: '',
      city: '',
      state: '',
      zip_code: '',
      phone: '',
      contact_person: ''
    });
    setShowAddLocation(false);
  };

  const handleDeleteLocation = (id: string) => {
    setLocations(locations.filter(loc => loc.id !== id));
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
                    <Label className="text-sm text-gray-600">Nombre</Label>
                    {isEditing ? (
                      <Input
                        value={profile.restaurant_name}
                        onChange={(e) => setProfile({...profile, restaurant_name: e.target.value})}
                        placeholder="Nombre del restaurante"
                      />
                    ) : (
                      <p className="font-medium">{profile.restaurant_name || 'Nombre del restaurante'}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Nombre de usuario</Label>
                    <p className="text-gray-500">@{profile.restaurant_name?.toLowerCase().replace(/\s+/g, '') || 'usuario'}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* General Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Información General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm text-gray-600">Biografía</Label>
              {isEditing ? (
                <Textarea
                  value={profile.description}
                  onChange={(e) => setProfile({...profile, description: e.target.value})}
                  placeholder="Describe tu restaurante..."
                  rows={3}
                />
              ) : (
                <p className="text-gray-900">{profile.description || 'Describe tu restaurante...'}</p>
              )}
            </div>
            
            <div>
              <Label className="text-sm text-gray-600">Tipo de cocina</Label>
              {isEditing ? (
                <Input
                  value={profile.cuisine_type}
                  onChange={(e) => setProfile({...profile, cuisine_type: e.target.value})}
                  placeholder="Ej. Mexicana, Italiana, Fusión"
                />
              ) : (
                <p className="text-gray-900">{profile.cuisine_type || 'Tipo de cocina'}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm text-gray-600">Ocultar perfil</Label>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Modular Blocks - Only show if they have content or if editing */}
        <AddressHoursBlock
          data={addressHours}
          onChange={setAddressHours}
          isEditing={isEditing}
        />

        <WebsiteLinksBlock
          data={websiteLinks}
          onChange={setWebsiteLinks}
          isEditing={isEditing}
        />

        <CustomCTABlock
          ctas={customCTAs}
          onChange={setCustomCTAs}
          isEditing={isEditing}
        />

        <CollabPreferencesBlock
          preferences={collabPreferences}
          onChange={setCollabPreferences}
          isEditing={isEditing}
        />

        {/* Locations Section - Keep existing logic */}
        {(locations.length > 0 || isEditing) && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Mis ubicaciones</CardTitle>
                {isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddLocation(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Añadir
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {locations.map((location) => (
                <div key={location.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <h3 className="font-medium">{location.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{location.address}</p>
                      <p className="text-sm text-gray-600 mb-2">{location.city}, {location.state} {location.zip_code}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>PERSONA DE CONTACTO: {location.contact_person}</span>
                        <span>TELÉFONO: {location.phone}</span>
                      </div>
                    </div>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteLocation(location.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              {showAddLocation && isEditing && (
                <div className="border rounded-lg p-4 bg-blue-50">
                  <h3 className="font-medium text-blue-700 mb-4">Nueva ubicación</h3>
                  <div className="space-y-3">
                    <div>
                      <Label>Ubicación *</Label>
                      <Input
                        value={newLocation.name}
                        onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                        placeholder="Ej. Malasaña"
                      />
                    </div>
                    <div>
                      <Label>Calle *</Label>
                      <Input
                        value={newLocation.address}
                        onChange={(e) => setNewLocation({...newLocation, address: e.target.value})}
                        placeholder="Ej. Calle Mayor, 15"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Ciudad *</Label>
                        <Input
                          value={newLocation.city}
                          onChange={(e) => setNewLocation({...newLocation, city: e.target.value})}
                          placeholder="Ej. Madrid"
                        />
                      </div>
                      <div>
                        <Label>Provincia *</Label>
                        <Input
                          value={newLocation.state}
                          onChange={(e) => setNewLocation({...newLocation, state: e.target.value})}
                          placeholder="Ej. Salamanca"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>País *</Label>
                      <Input
                        value="España"
                        disabled
                      />
                    </div>
                    <div>
                      <Label>Persona de contacto *</Label>
                      <Input
                        value={newLocation.contact_person}
                        onChange={(e) => setNewLocation({...newLocation, contact_person: e.target.value})}
                        placeholder="Ej. María García"
                      />
                    </div>
                    <div>
                      <Label>Teléfono *</Label>
                      <Input
                        value={newLocation.phone}
                        onChange={(e) => setNewLocation({...newLocation, phone: e.target.value})}
                        placeholder="Ej. 912345678"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleAddLocation} className="flex-1">
                        Guardar ubicación
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowAddLocation(false)}
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Products & Experiences Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Productos y Experiencias</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductsExperiencesTab
              data={productsExperiences}
              onUpdate={setProductsExperiences}
              isEditing={isEditing}
            />
          </CardContent>
        </Card>

        {/* Business Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Datos de facturación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm text-gray-600">Razón social</Label>
              <p className="text-gray-900">LISA BURGER SL</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">CIF</Label>
              <p className="text-gray-900">B72613250</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Dirección</Label>
              <p className="text-gray-900">Calle Mesón de Paredes 5</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Ciudad</Label>
              <p className="text-gray-900">Madrid</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Est./Provincia</Label>
              <p className="text-gray-900">Madrid</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Código postal</Label>
              <p className="text-gray-900">28012</p>
            </div>
          </CardContent>
        </Card>

        {/* Billing Section */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-gray-600">Opciones de seguridad</Label>
                <Button variant="outline" className="w-full mt-2">
                  Cambiar plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

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
