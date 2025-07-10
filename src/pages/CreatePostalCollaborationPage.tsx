
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
import { ArrowLeft, Package, Globe, MapPin } from 'lucide-react';

const postalCollaborationSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  quantityPerCreator: z.number().min(1, 'Quantity must be at least 1'),
  retailValue: z.number().optional(),
  productVariations: z.string().optional(),
  shippingScope: z.enum(['domestic', 'international']),
});

type PostalCollaborationForm = z.infer<typeof postalCollaborationSchema>;

const CreatePostalCollaborationPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PostalCollaborationForm>({
    resolver: zodResolver(postalCollaborationSchema),
    defaultValues: {
      productName: '',
      description: '',
      quantityPerCreator: 1,
      retailValue: undefined,
      productVariations: '',
      shippingScope: 'domestic',
    },
  });

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
                  <span>Shipping Scope</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="shippingScope"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipping Availability *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select shipping scope" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="domestic">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" />
                              <div>
                                <div className="font-medium">Domestic Only</div>
                                <div className="text-xs text-gray-500">
                                  Ship within your country only
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="international">
                            <div className="flex items-center space-x-2">
                              <Globe className="w-4 h-4" />
                              <div>
                                <div className="font-medium">International</div>
                                <div className="text-xs text-gray-500">
                                  Ship worldwide (additional costs may apply)
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
