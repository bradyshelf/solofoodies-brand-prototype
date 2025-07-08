
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Users } from 'lucide-react';
import { CollaborationPreferences } from '@/types/profile';

interface CollaborationPreferencesBlockProps {
  data: CollaborationPreferences;
  isEditing: boolean;
  onChange: (data: CollaborationPreferences) => void;
}

const CollaborationPreferencesBlock = ({ data, isEditing, onChange }: CollaborationPreferencesBlockProps) => {
  const hasData = data.types && data.types.length > 0;
  
  if (!hasData && !isEditing) return null;

  const collaborationOptions = [
    { value: 'influencer_visits', label: 'Influencer visits' },
    { value: 'product_sendouts', label: 'Product send-outs' },
    { value: 'menu_collaborations', label: 'Menu collaborations' },
    { value: 'recipe_content', label: 'Recipe content with your product' },
    { value: 'sponsored_content', label: 'Sponsored content' },
    { value: 'event_invitations', label: 'Event invitations' }
  ];

  const togglePreference = (value: string) => {
    const currentTypes = data.types || [];
    const updatedTypes = currentTypes.includes(value as any)
      ? currentTypes.filter(type => type !== value)
      : [...currentTypes, value as any];
    
    onChange({ types: updatedTypes });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Collaboration Preferences
        </CardTitle>
        <p className="text-sm text-gray-500">
          What kinds of collaborations are you open to? This helps influencers understand how to work with you.
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {collaborationOptions.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={option.value}
              checked={data.types?.includes(option.value as any) || false}
              onCheckedChange={() => togglePreference(option.value)}
              disabled={!isEditing}
            />
            <Label 
              htmlFor={option.value}
              className={`text-sm ${!isEditing ? 'cursor-default' : 'cursor-pointer'}`}
            >
              {option.label}
            </Label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CollaborationPreferencesBlock;
