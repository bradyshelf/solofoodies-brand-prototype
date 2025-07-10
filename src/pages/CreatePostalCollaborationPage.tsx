
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
import { ArrowLeft, Package, Globe, MapPin, X } from 'lucide-react';
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
});

type PostalCollaborationForm = z.infer<typeof postalCollaborationSchema>;

// Mock data - in a real app, these would come from an API
const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
];

const citiesByCountry: Record<string, string[]> = {
  US: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego'],
  CA: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City'],
  UK: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Liverpool', 'Newcastle', 'Sheffield'],
  AU: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra'],
  DE: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund'],
  FR: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier'],
};

const CreatePostalCollaborationPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

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

  const handleCityToggle = (city: string) => {
    const updatedCities = selectedCities.includes(city)
      ? selectedCities.filter(c => c !== city)
      : [...selectedCities, city];
    
    setSelectedCities(updatedCities);
    form.setValue('selectedCities', updatedCities);
  };

  const removeCityTag = (city: string) => {
    const updatedCities = selectedCities.filter(c => c !== city);
    setSelectedCities(updatedCities);
    form.setValue('selectedCities', updatedCities);
  };

  const handleCountryChange = (country: string) => {
    form.setValue('selectedCountry', country);
    setSelectedCities([]);
    form.setValue('selectedCities', []);
  };

  const handleShippingScopeChange = (scope: string) => {
    form.setValue('shippingScope', scope as 'global' | 'country' | 'cities');
    if (scope !== 'cities') {
      setSelectedCities([]);
      form.setValue('selectedCities', []);
    }
    if (scope === 'global') {
      form.setValue('selectedCountry', '');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
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
                  <span>Shipping Locations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="shippingScope"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipping Availability *</FormLabel>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="global"
                            name="shippingScope"
                            value="global"
                            checked={field.value === 'global'}
                            onChange={() => handleShippingScopeChange('global')}
                            className="w-4 h-4 text-blue-600"
                          />
                          <label htmlFor="global" className="flex items-center space-x-2 cursor-pointer">
                            <Globe className="w-4 h-4" />
                            <div>
                              <div className="font-medium">Global</div>
                              <div className="text-xs text-gray-500">Ship to all countries</div>
                            </div>
                          </label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="country"
                            name="shippingScope"
                            value="country"
                            checked={field.value === 'country'}
                            onChange={() => handleShippingScopeChange('country')}
                            className="w-4 h-4 text-blue-600"
                          />
                          <label htmlFor="country" className="flex items-center space-x-2 cursor-pointer">
                            <MapPin className="w-4 h-4" />
                            <div>
                              <div className="font-medium">Specific Country</div>
                              <div className="text-xs text-gray-500">Ship to one country only</div>
                            </div>
                          </label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="cities"
                            name="shippingScope"
                            value="cities"
                            checked={field.value === 'cities'}
                            onChange={() => handleShippingScopeChange('cities')}
                            className="w-4 h-4 text-blue-600"
                          />
                          <label htmlFor="cities" className="flex items-center space-x-2 cursor-pointer">
                            <MapPin className="w-4 h-4" />
                            <div>
                              <div className="font-medium">Specific Cities</div>
                              <div className="text-xs text-gray-500">Ship to selected cities only</div>
                            </div>
                          </label>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Country Selection */}
                {(watchedShippingScope === 'country' || watchedShippingScope === 'cities') && (
                  <div className="space-y-3 pl-6 border-l-2 border-gray-100">
                    <FormField
                      control={form.control}
                      name="selectedCountry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Country</FormLabel>
                          <Select onValueChange={handleCountryChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country.code} value={country.code}>
                                  {country.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* City Selection */}
                {watchedShippingScope === 'cities' && watchedCountry && (
                  <div className="space-y-3 pl-6 border-l-2 border-gray-100">
                    <div>
                      <Label>Select Cities</Label>
                      <p className="text-xs text-gray-500 mt-1">Choose specific cities within {countries.find(c => c.code === watchedCountry)?.name}</p>
                    </div>

                    {/* Selected Cities Tags */}
                    {selectedCities.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {selectedCities.map((city) => (
                          <div
                            key={city}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {city}
                            <button
                              type="button"
                              onClick={() => removeCityTag(city)}
                              className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* City Checkboxes */}
                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-md p-3">
                      {citiesByCountry[watchedCountry]?.map((city) => (
                        <div key={city} className="flex items-center space-x-2">
                          <Checkbox
                            id={city}
                            checked={selectedCities.includes(city)}
                            onCheckedChange={() => handleCityToggle(city)}
                          />
                          <label htmlFor={city} className="text-sm cursor-pointer">
                            {city}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
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
