
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, ExternalLink, Upload } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductExperience {
  id: string;
  title: string;
  description: string;
  image?: string;
  externalLink?: string;
  category: 'Product' | 'Event' | 'Box' | 'Workshop' | 'Other';
  tags?: string[];
}

interface ProductsExperiencesData {
  items: ProductExperience[];
  customCTA?: {
    text: string;
    url: string;
  };
}

interface ProductsExperiencesTabProps {
  data: ProductsExperiencesData;
  onUpdate: (data: ProductsExperiencesData) => void;
  isEditing: boolean;
}

const ProductsExperiencesTab = ({ data, onUpdate, isEditing }: ProductsExperiencesTabProps) => {
  const [newItem, setNewItem] = useState<Omit<ProductExperience, 'id'>>({
    title: '',
    description: '',
    category: 'Product',
    externalLink: '',
    tags: []
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddItem = () => {
    if (!newItem.title.trim()) return;
    
    const item: ProductExperience = {
      id: Math.random().toString(36).substr(2, 9),
      ...newItem
    };
    
    onUpdate({
      ...data,
      items: [...data.items, item]
    });
    
    setNewItem({
      title: '',
      description: '',
      category: 'Product',
      externalLink: '',
      tags: []
    });
    setShowAddForm(false);
  };

  const handleDeleteItem = (id: string) => {
    onUpdate({
      ...data,
      items: data.items.filter(item => item.id !== id)
    });
  };

  const handleCTAUpdate = (field: 'text' | 'url', value: string) => {
    onUpdate({
      ...data,
      customCTA: {
        ...data.customCTA,
        [field]: value
      }
    });
  };

  if (!isEditing && data.items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.items.map((item) => (
          <Card key={item.id} className="relative">
            <CardContent className="p-4">
              {isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
              
              {item.image && (
                <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                
                {item.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                )}
                
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {item.externalLink && (
                  <a
                    href={item.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Ver más
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Item Form */}
      {isEditing && (
        <>
          {!showAddForm ? (
            <Button
              variant="outline"
              onClick={() => setShowAddForm(true)}
              className="w-full border-dashed"
            >
              <Plus className="w-4 h-4 mr-2" />
              Añadir producto o experiencia
            </Button>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Nuevo producto o experiencia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Título *</Label>
                  <Input
                    value={newItem.title}
                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                    placeholder="Ej. Salsa Picante Artesanal"
                  />
                </div>
                
                <div>
                  <Label>Descripción</Label>
                  <Textarea
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    placeholder="Describe tu producto o experiencia (máx. 140 caracteres)"
                    maxLength={140}
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {newItem.description.length}/140 caracteres
                  </p>
                </div>
                
                <div>
                  <Label>Categoría</Label>
                  <Select
                    value={newItem.category}
                    onValueChange={(value: ProductExperience['category']) => 
                      setNewItem({...newItem, category: value})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Product">Producto</SelectItem>
                      <SelectItem value="Event">Evento</SelectItem>
                      <SelectItem value="Box">Caja/Kit</SelectItem>
                      <SelectItem value="Workshop">Taller</SelectItem>
                      <SelectItem value="Other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Enlace externo</Label>
                  <Input
                    value={newItem.externalLink}
                    onChange={(e) => setNewItem({...newItem, externalLink: e.target.value})}
                    placeholder="https://tienda.ejemplo.com/producto"
                    type="url"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={handleAddItem} className="flex-1">
                    Añadir
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Custom CTA Section */}
      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Botón personalizado (opcional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Texto del botón</Label>
              <Input
                value={data.customCTA?.text || ''}
                onChange={(e) => handleCTAUpdate('text', e.target.value)}
                placeholder="Ej. Comprar Ahora, Solicitar Muestra"
              />
            </div>
            <div>
              <Label>URL de destino</Label>
              <Input
                value={data.customCTA?.url || ''}
                onChange={(e) => handleCTAUpdate('url', e.target.value)}
                placeholder="https://tu-tienda.com"
                type="url"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Custom CTA Button Display */}
      {!isEditing && data.customCTA?.text && data.customCTA?.url && (
        <div className="text-center pt-4">
          <a
            href={data.customCTA.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            {data.customCTA.text}
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </div>
      )}
    </div>
  );
};

export default ProductsExperiencesTab;
