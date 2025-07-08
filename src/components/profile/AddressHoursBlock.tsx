
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Clock } from 'lucide-react';

interface AddressHoursData {
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  opening_hours?: string;
}

interface AddressHoursBlockProps {
  data: AddressHoursData;
  onChange: (data: AddressHoursData) => void;
  isEditing: boolean;
}

const AddressHoursBlock = ({ data, onChange, isEditing }: AddressHoursBlockProps) => {
  // Only show if any address data exists or if editing
  const hasAddressData = data.address || data.city || data.state || data.zip_code || data.phone || data.opening_hours;
  
  if (!hasAddressData && !isEditing) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center space-x-2">
          <MapPin className="w-5 h-5" />
          <span>Ubicación y Horarios</span>
        </CardTitle>
        <p className="text-sm text-gray-600">Añade tu dirección y horarios de apertura. Los clientes podrán encontrarte más fácilmente.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm text-gray-600">Dirección</Label>
          {isEditing ? (
            <Input
              value={data.address}
              onChange={(e) => onChange({...data, address: e.target.value})}
              placeholder="Calle Gran Vía, 28"
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
                onChange={(e) => onChange({...data, city: e.target.value})}
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
                onChange={(e) => onChange({...data, state: e.target.value})}
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
              onChange={(e) => onChange({...data, zip_code: e.target.value})}
              placeholder="28013"
            />
          ) : (
            data.zip_code && <p className="text-gray-900">{data.zip_code}</p>
          )}
        </div>

        <div>
          <Label className="text-sm text-gray-600">Teléfono</Label>
          {isEditing ? (
            <Input
              value={data.phone}
              onChange={(e) => onChange({...data, phone: e.target.value})}
              placeholder="+34 912 345 678"
            />
          ) : (
            data.phone && <p className="text-gray-900">{data.phone}</p>
          )}
        </div>

        <div>
          <Label className="text-sm text-gray-600">Horarios de apertura</Label>
          {isEditing ? (
            <Textarea
              value={data.opening_hours || ''}
              onChange={(e) => onChange({...data, opening_hours: e.target.value})}
              placeholder="Lunes a Viernes: 12:00 - 24:00&#10;Sábados y Domingos: 11:00 - 01:00"
              rows={3}
            />
          ) : (
            data.opening_hours && (
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-gray-500 mt-1" />
                <p className="text-gray-900 whitespace-pre-line">{data.opening_hours}</p>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressHoursBlock;
