
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Clock } from 'lucide-react';
import { AddressBlock as AddressBlockType } from '@/types/profile';

interface AddressBlockProps {
  data: AddressBlockType;
  isEditing: boolean;
  onChange: (data: AddressBlockType) => void;
}

const AddressBlock = ({ data, isEditing, onChange }: AddressBlockProps) => {
  const hasData = data.address || data.city || data.opening_hours;
  
  if (!hasData && !isEditing) return null;

  const handleChange = (field: keyof AddressBlockType, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Location & Hours
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm text-gray-600">Address</Label>
          <p className="text-xs text-gray-500 mb-2">Your restaurant's physical location</p>
          {isEditing ? (
            <Input
              value={data.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Street address"
            />
          ) : (
            <p className="text-gray-900">{data.address}</p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-sm text-gray-600">City</Label>
            {isEditing ? (
              <Input
                value={data.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="City"
              />
            ) : (
              <p className="text-gray-900">{data.city}</p>
            )}
          </div>
          <div>
            <Label className="text-sm text-gray-600">State</Label>
            {isEditing ? (
              <Input
                value={data.state}
                onChange={(e) => handleChange('state', e.target.value)}
                placeholder="State"
              />
            ) : (
              <p className="text-gray-900">{data.state}</p>
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
              value={data.opening_hours}
              onChange={(e) => handleChange('opening_hours', e.target.value)}
              placeholder="Mon-Fri: 9am-10pm, Sat-Sun: 10am-11pm"
              rows={2}
            />
          ) : (
            <p className="text-gray-900 whitespace-pre-line">{data.opening_hours}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressBlock;
