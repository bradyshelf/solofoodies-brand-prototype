
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Instagram, Facebook, Twitter } from 'lucide-react';

interface SocialLinksBlockProps {
  data: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  isEditing: boolean;
  onChange: (data: any) => void;
}

const SocialLinksBlock = ({ data, isEditing, onChange }: SocialLinksBlockProps) => {
  const hasData = data.instagram || data.facebook || data.twitter;
  
  if (!hasData && !isEditing) return null;

  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Instagram className="w-5 h-5" />
          Social Media
        </CardTitle>
        <p className="text-sm text-gray-500">
          Add your social media handles to help influencers find and connect with you
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="flex items-center gap-2">
            <Instagram className="w-4 h-4" />
            Instagram
          </Label>
          {isEditing ? (
            <Input
              value={data.instagram || ''}
              onChange={(e) => handleChange('instagram', e.target.value)}
              placeholder="@your_handle"
            />
          ) : (
            data.instagram && (
              <a 
                href={`https://instagram.com/${data.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {data.instagram}
              </a>
            )
          )}
        </div>

        <div>
          <Label className="flex items-center gap-2">
            <Facebook className="w-4 h-4" />
            Facebook
          </Label>
          {isEditing ? (
            <Input
              value={data.facebook || ''}
              onChange={(e) => handleChange('facebook', e.target.value)}
              placeholder="facebook.com/yourpage"
            />
          ) : (
            data.facebook && (
              <a 
                href={data.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {data.facebook}
              </a>
            )
          )}
        </div>

        <div>
          <Label className="flex items-center gap-2">
            <Twitter className="w-4 h-4" />
            Twitter/X
          </Label>
          {isEditing ? (
            <Input
              value={data.twitter || ''}
              onChange={(e) => handleChange('twitter', e.target.value)}
              placeholder="@your_handle"
            />
          ) : (
            data.twitter && (
              <a 
                href={`https://twitter.com/${data.twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {data.twitter}
              </a>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialLinksBlock;
