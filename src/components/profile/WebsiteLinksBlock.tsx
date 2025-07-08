
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ExternalLink, Globe } from 'lucide-react';

interface WebsiteLinksData {
  website_url: string;
  booking_url?: string;
  shop_url?: string;
  instagram_url?: string;
  facebook_url?: string;
}

interface WebsiteLinksBlockProps {
  data: WebsiteLinksData;
  onChange: (data: WebsiteLinksData) => void;
  isEditing: boolean;
}

const WebsiteLinksBlock = ({ data, onChange, isEditing }: WebsiteLinksBlockProps) => {
  // Only show if any links exist or if editing
  const hasLinks = data.website_url || data.booking_url || data.shop_url || data.instagram_url || data.facebook_url;
  
  if (!hasLinks && !isEditing) {
    return null;
  }

  const linkFields = [
    { key: 'website_url', label: 'Sitio Web Principal', placeholder: 'https://turestaurante.com' },
    { key: 'booking_url', label: 'Enlace de Reservas', placeholder: 'https://reservas.turestaurante.com' },
    { key: 'shop_url', label: 'Tienda Online', placeholder: 'https://tienda.turestaurante.com' },
    { key: 'instagram_url', label: 'Instagram', placeholder: 'https://instagram.com/turestaurante' },
    { key: 'facebook_url', label: 'Facebook', placeholder: 'https://facebook.com/turestaurante' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center space-x-2">
          <Globe className="w-5 h-5" />
          <span>Enlaces y Redes Sociales</span>
        </CardTitle>
        <p className="text-sm text-gray-600">Añade tus enlaces web, reservas, tienda online y redes sociales.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {linkFields.map((field) => (
          <div key={field.key}>
            <Label className="text-sm text-gray-600">{field.label}</Label>
            {isEditing ? (
              <Input
                value={data[field.key as keyof WebsiteLinksData] || ''}
                onChange={(e) => onChange({...data, [field.key]: e.target.value})}
                placeholder={field.placeholder}
                type="url"
              />
            ) : (
              data[field.key as keyof WebsiteLinksData] && (
                <a 
                  href={data[field.key as keyof WebsiteLinksData]} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <span>{data[field.key as keyof WebsiteLinksData]}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default WebsiteLinksBlock;
