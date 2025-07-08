
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Users } from 'lucide-react';

interface CollabPreferencesData {
  preferences: string[];
}

interface CollabPreferencesBlockProps {
  data: CollabPreferencesData;
  onUpdate: (data: CollabPreferencesData) => void;
  isEditing: boolean;
}

const COLLABORATION_OPTIONS = [
  { id: 'influencer-visits', label: 'Visitas de influencers' },
  { id: 'product-sendouts', label: 'Envío de productos' },
  { id: 'menu-collaborations', label: 'Colaboraciones de menú' },
  { id: 'recipe-content', label: 'Contenido de recetas con tu producto' },
  { id: 'sponsored-content', label: 'Contenido patrocinado' },
  { id: 'event-invitations', label: 'Invitaciones a eventos' }
];

const CollabPreferencesBlock = ({ data, onUpdate, isEditing }: CollabPreferencesBlockProps) => {
  // Only render if we have preferences or are editing
  const hasData = data.preferences.length > 0;
  
  if (!hasData && !isEditing) {
    return null;
  }

  const handlePreferenceChange = (preferenceId: string, checked: boolean) => {
    if (checked) {
      onUpdate({
        preferences: [...data.preferences, preferenceId]
      });
    } else {
      onUpdate({
        preferences: data.preferences.filter(p => p !== preferenceId)
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-purple-500" />
          <CardTitle className="text-lg">Preferencias de Colaboración</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm text-gray-600">
            ¿Qué tipos de colaboraciones te interesan?
            <span className="text-xs text-gray-400 block">
              Esto ayuda a los influencers a entender mejor cómo pueden trabajar contigo
            </span>
          </Label>
          
          {isEditing ? (
            <div className="space-y-3 mt-3">
              {COLLABORATION_OPTIONS.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={data.preferences.includes(option.id)}
                    onCheckedChange={(checked) => 
                      handlePreferenceChange(option.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={option.id} className="text-sm font-normal">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-3">
              {data.preferences.length > 0 ? (
                <ul className="space-y-1">
                  {data.preferences.map((prefId) => {
                    const option = COLLABORATION_OPTIONS.find(opt => opt.id === prefId);
                    return option ? (
                      <li key={prefId} className="text-gray-900 text-sm">
                        • {option.label}
                      </li>
                    ) : null;
                  })}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No hay preferencias seleccionadas</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CollabPreferencesBlock;
