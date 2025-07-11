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
import { ArrowLeft, Package, Globe, MapPin, X, Search, Check } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const postalCollaborationSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  quantityPerCreator: z.number().min(1, 'Quantity must be at least 1'),
  retailValue: z.number().optional(),
  productVariations: z.string().optional(),
  shippingScope: z.enum(['global', 'country', 'cities']),
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
  };

  const handleCityToggle = (city: string) => {
    const updatedCities = selectedCities.includes(city)
      ? selectedCities.filter(c => c !== city)
      : [...selectedCities, city];
    
    setSelectedCities(updatedCities);
    form.setValue('selectedCities', updatedCities);
  };

  const handleShippingScopeChange = (scope: string) => {
    form.setValue('shippingScope', scope as 'global' | 'country' | 'cities');
    if (scope !== 'cities') {
      setSelectedCities([]);
      form.setValue('selectedCities', []);
    }
    if (scope === 'global') {
      form.setValue('selectedCountry', '');
      setSelectedCountries([]);
    }
  };

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSelectedCitiesCount = () => {
    return selectedCities.length;
  };

  const getTotalCitiesCount = (countryCode: string) => {
    return citiesByCountry[countryCode]?.length || 0;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/collaborations')}
            className="mr-4 p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create Product Send-Out</h1>
            <p className="text-sm text-gray-600 mt-1">
              Set up a collaboration to send products to creators for review
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Product Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5" />
                  <span>Product Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Artisan Coffee Blend"
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
                      <FormLabel>Short Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief description of the product and what you'd like creators to highlight..."
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
                        <FormLabel>Quantity per Creator *</FormLabel>
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
                        <FormLabel>Retail Value (Optional)</FormLabel>
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
                          For transparency with creators and audience
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
                      <FormLabel>Product Variations (Optional)</FormLabel>
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
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Shipping Zone</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Zone Name */}
                <FormField
                  control={form.control}
                  name="zoneName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zone name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., International, Domestic"
                          {...field}
                        />
                      </FormControl>
                      <p className="text-xs text-gray-500 mt-1">
                        Customers won't see this
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Shipping Zones Section */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Shipping zones</Label>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search countries and regions to ship to"
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
                            {selectedCountries.includes(country.code) && watchedShippingScope === 'cities' && 
                              `${getSelectedCitiesCount()} of ${getTotalCitiesCount(country.code)} provinces`
                            }
                          </div>
                        </div>

                        {/* Cities for selected country */}
                        {selectedCountries.includes(country.code) && watchedShippingScope === 'cities' && (
                          <div className="px-12 pb-4 bg-gray-50">
                            <div className="grid grid-cols-2 gap-2">
                              {citiesByCountry[country.code]?.map((city) => (
                                <div key={city} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`${country.code}-${city}`}
                                    checked={selectedCities.includes(city)}
                                    onCheckedChange={() => handleCityToggle(city)}
                                  />
                                  <label htmlFor={`${country.code}-${city}`} className="text-sm cursor-pointer">
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

                  {/* Shipping Scope Options */}
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
                          <div className="font-medium">Ship to all countries</div>
                          <div className="text-xs text-gray-500">Available worldwide</div>
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="country"
                        name="shippingScope"
                        value="country"
                        checked={watchedShippingScope === 'country'}
                        onChange={() => handleShippingScopeChange('country')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <label htmlFor="country" className="flex items-center space-x-2 cursor-pointer">
                        <MapPin className="w-4 h-4" />
                        <div>
                          <div className="font-medium">Ship to selected countries</div>
                          <div className="text-xs text-gray-500">Choose specific countries above</div>
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="cities"
                        name="shippingScope"
                        value="cities"
                        checked={watchedShippingScope === 'cities'}
                        onChange={() => handleShippingScopeChange('cities')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <label htmlFor="cities" className="flex items-center space-x-2 cursor-pointer">
                        <MapPin className="w-4 h-4" />
                        <div>
                          <div className="font-medium">Ship to specific regions</div>
                          <div className="text-xs text-gray-500">Choose countries and regions above</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/collaborations')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? 'Creating...' : 'Create Collaboration'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePostalCollaborationPage;
