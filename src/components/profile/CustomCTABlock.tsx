
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, ExternalLink } from 'lucide-react';

interface CustomCTA {
  id: string;
  type: string;
  label: string;
  url: string;
}

interface CustomCTABlockProps {
  ctas: CustomCTA[];
  onChange: (ctas: CustomCTA[]) => void;
  isEditing: boolean;
}

const ctaTypes = [
  { value: 'reserve', label: 'Reservar Mesa' },
  { value: 'shop', label: 'Comprar Productos' },
  { value: 'sample', label: 'Solicitar Muestra' },
  { value: 'contact', label: 'Contactar' },
  { value: 'menu', label: 'Ver Carta' },
  { value: 'custom', label: 'Personalizado' }
];

const CustomCTABlock = ({ ctas, onChange, isEditing }: CustomCTABlockProps) => {
  // Only show if there are CTAs or if editing
  if (ctas.length === 0 && !isEditing) {
    return null;
  }

  const addCTA = () => {
    if (ctas.length >= 2) return; // Limit to 2 CTAs
    
    const newCTA: CustomCTA = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'reserve',
      label: 'Reservar Mesa',
      url: ''
    };
    onChange([...ctas, newCTA]);
  };

  const updateCTA = (id: string, field: keyof CustomCTA, value: string) => {
    const updatedCTAs = ctas.map(cta => 
      cta.id === id ? { ...cta, [field]: value } : cta
    );
    
    // Auto-update label when type changes (unless it's custom)
    if (field === 'type' && value !== 'custom') {
      const typeConfig = ctaTypes.find(t => t.value === value);
      if (typeConfig) {
        updatedCTAs.forEach(cta => {
          if (cta.id === id && cta.type !== 'custom') {
            cta.label = typeConfig.label;
          }
        });
      }
    }
    
    onChange(updatedCTAs);
  };

  const removeCTA = (id: string) => {
    onChange(ctas.filter(cta => cta.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center space-x-2">
              <ExternalLink className="w-5 h-5" />
              <span>Botones de Acción</span>
            </CardTitle>
            <p className="text-sm text-gray-600">Añade hasta 2 botones personalizados (reservas, tienda, contacto, etc.)</p>
          </div>
          {isEditing && ctas.length < 2 && (
            <Button variant="outline" size="sm" onClick={addCTA}>
              <Plus className="w-4 h-4 mr-2" />
              Añadir
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {ctas.map((cta) => (
          <div key={cta.id} className="border rounded-lg p-4 space-y-3">
            {isEditing ? (
              <>
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Configurar Botón</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCTA(cta.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
                
                <div>
                  <Label className="text-sm text-gray-600">Tipo de Botón</Label>
                  <Select
                    value={cta.type}
                    onValueChange={(value) => updateCTA(cta.id, 'type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ctaTypes.map((type) => (
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
                      placeholder="Ej. Comprar Ahora"
                    />
                  </div>
                )}

                <div>
                  <Label className="text-sm text-gray-600">Enlace de Destino</Label>
                  <Input
                    value={cta.url}
                    onChange={(e) => updateCTA(cta.id, 'url', e.target.value)}
                    placeholder="https://ejemplo.com"
                    type="url"
                  />
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{cta.label}</p>
                  <p className="text-sm text-gray-600">{cta.url}</p>
                </div>
                <Button asChild>
                  <a href={cta.url} target="_blank" rel="noopener noreferrer">
                    {cta.label}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CustomCTABlock;
