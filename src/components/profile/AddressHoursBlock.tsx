
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Clock } from 'lucide-react';

interface AddressHoursData {
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  opening_hours?: string;
}

interface AddressHoursBlockProps {
  data: AddressHoursData;
  isEditing: boolean;
  onChange: (data: AddressHoursData) => void;
}

const AddressHoursBlock = ({ data, isEditing, onChange }: AddressHoursBlockProps) => {
  const hasData = data.address || data.city || data.opening_hours;
  
  if (!hasData && !isEditing) return null;

  const handleChange = (field: keyof AddressHoursData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Location & Hours
        </CardTitle>
        <p className="text-sm text-gray-500">
          Add your physical location and opening hours. Skip this section if you don't have a physical location.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm text-gray-600">Address</Label>
          <p className="text-xs text-gray-500 mb-2">Your business's physical location</p>
          {isEditing ? (
            <Input
              value={data.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Street address"
            />
          ) : (
            data.address && <p className="text-gray-900">{data.address}</p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-sm text-gray-600">City</Label>
            {isEditing ? (
              <Input
                value={data.city || ''}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="City"
              />
            ) : (
              data.city && <p className="text-gray-900">{data.city}</p>
            )}
          </div>
          <div>
            <Label className="text-sm text-gray-600">State</Label>
            {isEditing ? (
              <Input
                value={data.state || ''}
                onChange={(e) => handleChange('state', e.target.value)}
                placeholder="State"
              />
            ) : (
              data.state && <p className="text-gray-900">{data.state}</p>
            )}
          </div>
        </div>

        <div>
          <Label className="text-sm text-gray-600 flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Opening Hours
          </Label>
          <p className="text-xs text-gray-500 mb-2">When are you open? (e.g., Mon-Fri 9am-10pm)</p>
          {isEditing ? (
            <Textarea
              value={data.opening_hours || ''}
              onChange={(e) => handleChange('opening_hours', e.target.value)}
              placeholder="Mon-Fri: 9am-10pm, Sat-Sun: 10am-11pm"
              rows={2}
            />
          ) : (
            data.opening_hours && (
              <p className="text-gray-900 whitespace-pre-line">{data.opening_hours}</p>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressHoursBlock;
