import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft, Package, Globe, MapPin, X, Search, Check, Users, Plus, Minus, Euro } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { CollaborationPhotoUpload } from '@/components/CollaborationPhotoUpload';

const postalCollaborationSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  quantityPerCreator: z.number().min(1, 'Quantity must be at least 1'),
  retailValue: z.number().optional(),
  productVariations: z.string().optional(),
  shippingScope: z.enum(['global', 'specific']),
  selectedCountry: z.string().optional(),
  selectedCities: z.array(z.string()).optional(),
  zoneName: z.string().optional(),
});

type PostalCollaborationForm = z.infer<typeof postalCollaborationSchema>;

// Mock data - in a real app, these would come from an API
const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
];

const citiesByCountry: Record<string, string[]> = {
  US: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego'],
  CA: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City'],
  UK: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Liverpool', 'Newcastle', 'Sheffield'],
  AU: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra'],
  DE: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund'],
  FR: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier'],
  ES: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Palma'],
};

const CreatePostalCollaborationPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  
  const [collaborationPhoto, setCollaborationPhoto] = useState<string | null>(null);
  const [requirements, setRequirements] = useState('');

  const form = useForm<PostalCollaborationForm>({
    resolver: zodResolver(postalCollaborationSchema),
    defaultValues: {
      productName: '',
      description: '',
      quantityPerCreator: 1,
      retailValue: undefined,
      productVariations: '',
      shippingScope: 'global',
      selectedCountry: '',
      selectedCities: [],
      zoneName: '',
    },
  });

  const watchedShippingScope = form.watch('shippingScope');
  const watchedCountry = form.watch('selectedCountry');

  const onSubmit = async (data: PostalCollaborationForm) => {
    setIsSubmitting(true);
    try {
      console.log('Postal collaboration data:', data);
      // TODO: Implement actual submission logic
      // For now, just navigate back
      navigate('/collaborations');
    } catch (error) {
      console.error('Error creating postal collaboration:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/collaborations');
  };

  const handleCountryToggle = (countryCode: string) => {
    const updatedCountries = selectedCountries.includes(countryCode)
      ? selectedCountries.filter(c => c !== countryCode)
      : [...selectedCountries, countryCode];
    
    setSelectedCountries(updatedCountries);
    form.setValue('selectedCountry', updatedCountries[0] || '');
    
    // If switching to specific countries mode, update shipping scope
    if (updatedCountries.length > 0) {
      form.setValue('shippingScope', 'specific');
    } else {
      form.setValue('shippingScope', 'global');
    }
  };

  const handleCityToggle = (city: string) => {
    const updatedCities = selectedCities.includes(city)
      ? selectedCities.filter(c => c !== city)
      : [...selectedCities, city];
    
    setSelectedCities(updatedCities);
    form.setValue('selectedCities', updatedCities);
  };

  const handleShippingScopeChange = (scope: string) => {
    form.setValue('shippingScope', scope as 'global' | 'specific');
    if (scope === 'global') {
      form.setValue('selectedCountry', '');
      setSelectedCountries([]);
      setSelectedCities([]);
      form.setValue('selectedCities', []);
    }
  };

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSelectedCitiesCount = (countryCode: string) => {
    const countryCities = citiesByCountry[countryCode] || [];
    return selectedCities.filter(city => countryCities.includes(city)).length;
  };

  const getTotalCitiesCount = (countryCode: string) => {
    return citiesByCountry[countryCode]?.length || 0;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/collaborations')} 
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Crear Envío</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">i</span>
            </div>
            <p className="text-sm text-blue-800">
              Configura una colaboración para enviar productos a creadores para reseñas
            </p>
          </div>
        </div>

        {/* Photo Upload Section */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <CollaborationPhotoUpload 
            value={collaborationPhoto}
            onChange={setCollaborationPhoto}
          />
        </div>

        <div className="border-t border-gray-200 my-8"></div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Product Information */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <Package className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-semibold">Información del Producto</h2>
              </div>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del Producto *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ej., Mezcla de Café Artesanal"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Requisitos *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Breve descripción del producto y lo que te gustaría que los creadores destaquen..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="quantityPerCreator"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cantidad por Creador *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            placeholder="1"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="retailValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor de Venta (Opcional)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                          />
                        </FormControl>
                        <p className="text-xs text-gray-500 mt-1">
                          Para transparencia con creadores y audiencia
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="productVariations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Variaciones del Producto (Opcional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Flavor: Vanilla, Chocolate; Size: Small, Medium, Large"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-xs text-gray-500 mt-1">
                        Specify any flavors, sizes, colors, or other variations available
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            {/* Requirements Section */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-orange-500">📝</span>
                <h2 className="text-lg font-semibold">Requisitos</h2>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">Describe lo que esperas de esta colaboración</p>
                <Textarea
                  placeholder="Describe lo que esperas de esta colaboración"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="text-right text-xs text-gray-400 mt-1">{requirements.length}/500</div>
              </div>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            {/* Shipping Information */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-semibold">Zona de Envío</h2>
              </div>
              
              <div className="space-y-6">
                {/* Zone Name */}
                <FormField
                  control={form.control}
                  name="zoneName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de zona</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ej., Internacional, Nacional"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-xs text-gray-500 mt-1">
                        Los clientes no verán esto
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Shipping Zones Section */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Zonas de envío</Label>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar países y regiones para envío"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Countries List */}
                  <div className="border rounded-lg max-h-80 overflow-y-auto">
                    {filteredCountries.map((country) => (
                      <div key={country.code} className="border-b last:border-b-0">
                        <div className="flex items-center justify-between p-4 hover:bg-gray-50">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id={country.code}
                              checked={selectedCountries.includes(country.code)}
                              onCheckedChange={() => handleCountryToggle(country.code)}
                            />
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{country.flag}</span>
                              <span className="font-medium">{country.name}</span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {selectedCountries.includes(country.code) && 
                              `${getSelectedCitiesCount(country.code)} de ${getTotalCitiesCount(country.code)} provincias`
                            }
                          </div>
                        </div>

                        {/* Cities for selected country - shows for ANY selected country */}
                        {selectedCountries.includes(country.code) && (
                          <div className="px-12 pb-4 bg-gray-50">
                            <div className="grid grid-cols-2 gap-2">
                              {citiesByCountry[country.code]?.map((city) => (
                                <div key={city} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`${country.code}-${city}`}
                                    checked={selectedCities.includes(city)}
                                    onCheckedChange={() => handleCityToggle(city)}
                                  />
                                  <label 
                                    htmlFor={`${country.code}-${city}`} 
                                    className="text-sm cursor-pointer"
                                  >
                                    {city}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Shipping Scope Options - Only Global option remains */}
                  <div className="space-y-3 mt-6">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="global"
                        name="shippingScope"
                        value="global"
                        checked={watchedShippingScope === 'global'}
                        onChange={() => handleShippingScopeChange('global')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <label htmlFor="global" className="flex items-center space-x-2 cursor-pointer">
                        <Globe className="w-4 h-4" />
                        <div>
                          <div className="font-medium">Enviar a todos los países</div>
                          <div className="text-xs text-gray-500">Disponible mundialmente</div>
                        </div>
                      </label>
                    </div>
            </div>

                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold mb-4">Vista previa</h3>
              <Card className="bg-gray-900 text-white">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="font-semibold text-lg">
                      {form.watch('productName') || 'Nombre del producto'}
                    </div>
                    
                    {form.watch('description') && (
                      <div className="text-sm text-gray-300">
                        <span className="font-medium">Requisitos: </span>
                        {form.watch('description')}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">Cantidad: {form.watch('quantityPerCreator') || 1}</span>
                    </div>
                    
                    {form.watch('retailValue') && (
                      <div className="flex items-center space-x-2">
                        <Euro className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">Valor: €{form.watch('retailValue')}</span>
                      </div>
                    )}
                    
                    {form.watch('productVariations') && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">🎨</span>
                        <span className="text-sm">Variaciones: {form.watch('productVariations')}</span>
                      </div>
                    )}
                    
                    {form.watch('zoneName') && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">Zona: {form.watch('zoneName')}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">
                        {watchedShippingScope === 'global' 
                          ? 'Envío mundial' 
                          : selectedCountries.length > 0
                            ? `Envío a ${selectedCountries.map(code => countries.find(c => c.code === code)?.name).join(', ')}`
                            : 'Seleccionar países'
                        }
                      </span>
                    </div>
                    
                    {selectedCities.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">🏙️</span>
                        <span className="text-sm">Ciudades: {selectedCities.join(', ')}</span>
                      </div>
                     )}
                     
                     {requirements && (
                       <div className="text-sm text-gray-300">
                         <span className="font-medium">Requisitos adicionales: </span>
                         {requirements}
                       </div>
                     )}
                     
                    
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            >
              {isSubmitting ? 'Creando...' : 'Crear Colaboración'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePostalCollaborationPage;
