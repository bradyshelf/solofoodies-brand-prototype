
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Users } from 'lucide-react';

interface CollabPreferencesBlockProps {
  preferences: string[];
  onChange: (preferences: string[]) => void;
  isEditing: boolean;
}

const collaborationTypes = [
  { id: 'influencer-visits', label: 'Visitas de influencers' },
  { id: 'product-sendouts', label: 'Envío de productos' },
  { id: 'menu-collaborations', label: 'Colaboraciones de menú' },
  { id: 'recipe-content', label: 'Contenido de recetas con productos' },
  { id: 'sponsored-content', label: 'Contenido patrocinado' },
  { id: 'event-invitations', label: 'Invitaciones a eventos' }
];

const CollabPreferencesBlock = ({ preferences, onChange, isEditing }: CollabPreferencesBlockProps) => {
  // Only show if there are preferences selected or if editing
  if (preferences.length === 0 && !isEditing) {
    return null;
  }

  const handlePreferenceChange = (preferenceId: string, checked: boolean) => {
    if (checked) {
      onChange([...preferences, preferenceId]);
    } else {
      onChange(preferences.filter(p => p !== preferenceId));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <span>Preferencias de Colaboración</span>
        </CardTitle>
        <p className="text-sm text-gray-600">Selecciona qué tipos de colaboraciones te interesan para ayudar a los influencers a entender tus necesidades.</p>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-3">
            {collaborationTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox
                  id={type.id}
                  checked={preferences.includes(type.id)}
                  onCheckedChange={(checked) => handlePreferenceChange(type.id, checked as boolean)}
                />
                <Label htmlFor={type.id} className="text-sm cursor-pointer">
                  {type.label}
                </Label>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {preferences.map((prefId) => {
              const type = collaborationTypes.find(t => t.id === prefId);
              return type ? (
                <div key={prefId} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">{type.label}</span>
                </div>
              ) : null;
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CollabPreferencesBlock;
