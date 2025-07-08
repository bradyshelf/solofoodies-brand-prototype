
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ExternalLink, Plus, Trash2 } from 'lucide-react';

interface CustomCTA {
  id: string;
  type: 'booking' | 'shop' | 'sample' | 'contact' | 'custom';
  label: string;
  url: string;
}

interface CustomCTABlockProps {
  ctas: CustomCTA[];
  onUpdate: (ctas: CustomCTA[]) => void;
  isEditing: boolean;
}

const CTA_TYPES = [
  { value: 'booking', label: 'Reservar Mesa' },
  { value: 'shop', label: 'Comprar Ahora' },
  { value: 'sample', label: 'Solicitar Muestra' },
  { value: 'contact', label: 'Contactar' },
  { value: 'custom', label: 'Personalizado' }
];

const CustomCTABlock = ({ ctas, onUpdate, isEditing }: CustomCTABlockProps) => {
  // Only render if we have CTAs or are editing
  const hasData = ctas.length > 0;
  
  if (!hasData && !isEditing) {
    return null;
  }

  const addCTA = () => {
    if (ctas.length >= 2) return; // Maximum 2 CTAs
    
    const newCTA: CustomCTA = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'booking',
      label: 'Reservar Mesa',
      url: ''
    };
    onUpdate([...ctas, newCTA]);
  };

  const updateCTA = (id: string, field: keyof CustomCTA, value: string) => {
    const updatedCTAs = ctas.map(cta => {
      if (cta.id === id) {
        const updated = { ...cta, [field]: value };
        // Auto-update label when type changes (unless it's custom)
        if (field === 'type' && value !== 'custom') {
          const typeConfig = CTA_TYPES.find(t => t.value === value);
          if (typeConfig) {
            updated.label = typeConfig.label;
          }
        }
        return updated;
      }
      return cta;
    });
    onUpdate(updatedCTAs);
  };

  const removeCTA = (id: string) => {
    onUpdate(ctas.filter(cta => cta.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ExternalLink className="w-5 h-5 text-green-500" />
            <CardTitle className="text-lg">Botones de Acción</CardTitle>
          </div>
          {isEditing && ctas.length < 2 && (
            <Button variant="outline" size="sm" onClick={addCTA}>
              <Plus className="w-4 h-4 mr-2" />
              Añadir CTA
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-500">
          Añade hasta 2 botones de acción principales para dirigir a tus visitantes (reservas, compras, contacto, etc.)
        </p>
        
        {ctas.map((cta, index) => (
          <div key={cta.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Botón {index + 1}</h4>
              {isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCTA(cta.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              )}
            </div>
            
            {isEditing ? (
              <>
                <div>
                  <Label className="text-sm text-gray-600">Tipo de Acción</Label>
                  <Select 
                    value={cta.type} 
                    onValueChange={(value) => updateCTA(cta.id, 'type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CTA_TYPES.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {cta.type === 'custom' && (
                  <div>
                    <Label className="text-sm text-gray-600">Texto del Botón</Label>
                    <Input
                      value={cta.label}
                      onChange={(e) => updateCTA(cta.id, 'label', e.target.value)}
                      placeholder="Ej. Ver Carta"
                    />
                  </div>
                )}
                
                <div>
                  <Label className="text-sm text-gray-600">URL de Destino</Label>
                  <Input
                    value={cta.url}
                    onChange={(e) => updateCTA(cta.id, 'url', e.target.value)}
                    placeholder="https://..."
                    type="url"
                  />
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <p className="font-medium">{cta.label}</p>
                <p className="text-sm text-gray-600">{cta.url}</p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CustomCTABlock;
