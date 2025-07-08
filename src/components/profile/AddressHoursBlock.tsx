
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin } from 'lucide-react';

interface AddressHoursData {
  address: string;
  city: string;
  state: string;
  zip_code: string;
  opening_hours: string;
}

interface AddressHoursBlockProps {
  data: AddressHoursData;
  onUpdate: (data: AddressHoursData) => void;
  isEditing: boolean;
}

const AddressHoursBlock = ({ data, onUpdate, isEditing }: AddressHoursBlockProps) => {
  // Only render if we have data or are editing
  const hasData = data.address || data.city || data.state || data.zip_code || data.opening_hours;
  
  if (!hasData && !isEditing) {
    return null;
  }

  const handleChange = (field: keyof AddressHoursData, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-blue-500" />
          <CardTitle className="text-lg">Dirección y Horarios</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm text-gray-600">
            Dirección
            <span className="text-xs text-gray-400 block">
              Añade tu dirección física si tienes una ubicación que los clientes pueden visitar
            </span>
          </Label>
          {isEditing ? (
            <Input
              value={data.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Calle Mayor, 15"
            />
          ) : (
            data.address && <p className="text-gray-900">{data.address}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-sm text-gray-600">Ciudad</Label>
            {isEditing ? (
              <Input
                value={data.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="Madrid"
              />
            ) : (
              data.city && <p className="text-gray-900">{data.city}</p>
            )}
          </div>
          <div>
            <Label className="text-sm text-gray-600">Provincia</Label>
            {isEditing ? (
              <Input
                value={data.state}
                onChange={(e) => handleChange('state', e.target.value)}
                placeholder="Madrid"
              />
            ) : (
              data.state && <p className="text-gray-900">{data.state}</p>
            )}
          </div>
        </div>

        <div>
          <Label className="text-sm text-gray-600">Código Postal</Label>
          {isEditing ? (
            <Input
              value={data.zip_code}
              onChange={(e) => handleChange('zip_code', e.target.value)}
              placeholder="28013"
            />
          ) : (
            data.zip_code && <p className="text-gray-900">{data.zip_code}</p>
          )}
        </div>

        <div>
          <Label className="text-sm text-gray-600">
            Horarios de apertura
            <span className="text-xs text-gray-400 block">
              Indica cuándo pueden visitarte los clientes
            </span>
          </Label>
          {isEditing ? (
            <Textarea
              value={data.opening_hours}
              onChange={(e) => handleChange('opening_hours', e.target.value)}
              placeholder="Lun-Vie: 12:00-16:00, 19:00-23:00&#10;Sáb-Dom: 12:00-23:00"
              rows={3}
            />
          ) : (
            data.opening_hours && (
              <div className="whitespace-pre-line text-gray-900">
                {data.opening_hours}
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressHoursBlock;
