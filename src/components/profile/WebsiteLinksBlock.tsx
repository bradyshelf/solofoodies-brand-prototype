
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'lucide-react';

interface WebsiteLinksData {
  website_url: string;
  booking_url: string;
  shop_url: string;
  instagram_url: string;
  tiktok_url: string;
}

interface WebsiteLinksBlockProps {
  data: WebsiteLinksData;
  onUpdate: (data: WebsiteLinksData) => void;
  isEditing: boolean;
}

const WebsiteLinksBlock = ({ data, onUpdate, isEditing }: WebsiteLinksBlockProps) => {
  // Only render if we have data or are editing
  const hasData = Object.values(data).some(value => value.trim() !== '');
  
  if (!hasData && !isEditing) {
    return null;
  }

  const handleChange = (field: keyof WebsiteLinksData, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Link className="w-5 h-5 text-blue-500" />
          <CardTitle className="text-lg">Enlaces y Redes Sociales</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm text-gray-600">
            Sitio web principal
            <span className="text-xs text-gray-400 block">
              Tu página web oficial o landing page
            </span>
          </Label>
          {isEditing ? (
            <Input
              value={data.website_url}
              onChange={(e) => handleChange('website_url', e.target.value)}
              placeholder="https://turestaurante.com"
              type="url"
            />
          ) : (
            data.website_url && (
              <a 
                href={data.website_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {data.website_url}
              </a>
            )
          )}
        </div>

        <div>
          <Label className="text-sm text-gray-600">
            Enlace de reservas
            <span className="text-xs text-gray-400 block">
              Añade tu enlace de reservas aquí. Si no tomas reservas, déjalo en blanco
            </span>
          </Label>
          {isEditing ? (
            <Input
              value={data.booking_url}
              onChange={(e) => handleChange('booking_url', e.target.value)}
              placeholder="https://reservas.turestaurante.com"
              type="url"
            />
          ) : (
            data.booking_url && (
              <a 
                href={data.booking_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {data.booking_url}
              </a>
            )
          )}
        </div>

        <div>
          <Label className="text-sm text-gray-600">
            Tienda online
            <span className="text-xs text-gray-400 block">
              Enlace a tu tienda donde vendes productos (salsas, bebidas, merch, etc.)
            </span>
          </Label>
          {isEditing ? (
            <Input
              value={data.shop_url}
              onChange={(e) => handleChange('shop_url', e.target.value)}
              placeholder="https://tienda.turestaurante.com"
              type="url"
            />
          ) : (
            data.shop_url && (
              <a 
                href={data.shop_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {data.shop_url}
              </a>
            )
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-sm text-gray-600">Instagram</Label>
            {isEditing ? (
              <Input
                value={data.instagram_url}
                onChange={(e) => handleChange('instagram_url', e.target.value)}
                placeholder="https://instagram.com/turestaurante"
                type="url"
              />
            ) : (
              data.instagram_url && (
                <a 
                  href={data.instagram_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  @{data.instagram_url.split('/').pop()}
                </a>
              )
            )}
          </div>
          
          <div>
            <Label className="text-sm text-gray-600">TikTok</Label>
            {isEditing ? (
              <Input
                value={data.tiktok_url}
                onChange={(e) => handleChange('tiktok_url', e.target.value)}
                placeholder="https://tiktok.com/@turestaurante"
                type="url"
              />
            ) : (
              data.tiktok_url && (
                <a 
                  href={data.tiktok_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  @{data.tiktok_url.split('/').pop()}
                </a>
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebsiteLinksBlock;
