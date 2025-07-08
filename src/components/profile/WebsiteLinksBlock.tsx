
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, Globe, Instagram, Facebook, Twitter } from 'lucide-react';

interface WebsiteLinksData {
  website_url?: string;
  booking_url?: string;
  shop_url?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
}

interface WebsiteLinksBlockProps {
  data: WebsiteLinksData;
  isEditing: boolean;
  onChange: (data: WebsiteLinksData) => void;
}

const WebsiteLinksBlock = ({ data, isEditing, onChange }: WebsiteLinksBlockProps) => {
  const hasData = data.website_url || data.booking_url || data.shop_url || data.instagram || data.facebook || data.twitter;
  
  if (!hasData && !isEditing) return null;

  const handleChange = (field: keyof WebsiteLinksData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Website & Social Links
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm text-gray-600">Website</Label>
          <p className="text-xs text-gray-500 mb-2">Your main website or homepage</p>
          {isEditing ? (
            <Input
              value={data.website_url || ''}
              onChange={(e) => handleChange('website_url', e.target.value)}
              placeholder="https://your-website.com"
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
          <Label className="text-sm text-gray-600">Booking/Reservation Link</Label>
          <p className="text-xs text-gray-500 mb-2">Add your reservation link here. If you don't take reservations, leave this blank.</p>
          {isEditing ? (
            <Input
              value={data.booking_url || ''}
              onChange={(e) => handleChange('booking_url', e.target.value)}
              placeholder="https://reservations.example.com"
            />
          ) : (
            data.booking_url && (
              <a 
                href={data.booking_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Make a Reservation
              </a>
            )
          )}
        </div>

        <div>
          <Label className="text-sm text-gray-600">Shop/Store Link</Label>
          <p className="text-xs text-gray-500 mb-2">Link to your online store or shop. Leave blank if you don't sell products online.</p>
          {isEditing ? (
            <Input
              value={data.shop_url || ''}
              onChange={(e) => handleChange('shop_url', e.target.value)}
              placeholder="https://shop.example.com"
            />
          ) : (
            data.shop_url && (
              <a 
                href={data.shop_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit Our Shop
              </a>
            )
          )}
        </div>

        <div className="border-t pt-4">
          <Label className="text-sm text-gray-600 mb-3 block">Social Media</Label>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Instagram className="w-4 h-4 text-pink-600" />
              <div className="flex-1">
                {isEditing ? (
                  <Input
                    value={data.instagram || ''}
                    onChange={(e) => handleChange('instagram', e.target.value)}
                    placeholder="@username or full URL"
                  />
                ) : (
                  data.instagram && (
                    <span className="text-gray-900">{data.instagram}</span>
                  )
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Facebook className="w-4 h-4 text-blue-600" />
              <div className="flex-1">
                {isEditing ? (
                  <Input
                    value={data.facebook || ''}
                    onChange={(e) => handleChange('facebook', e.target.value)}
                    placeholder="@username or full URL"
                  />
                ) : (
                  data.facebook && (
                    <span className="text-gray-900">{data.facebook}</span>
                  )
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Twitter className="w-4 h-4 text-blue-400" />
              <div className="flex-1">
                {isEditing ? (
                  <Input
                    value={data.twitter || ''}
                    onChange={(e) => handleChange('twitter', e.target.value)}
                    placeholder="@username or full URL"
                  />
                ) : (
                  data.twitter && (
                    <span className="text-gray-900">{data.twitter}</span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebsiteLinksBlock;
