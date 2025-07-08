
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChefHat, Plus, Trash2 } from 'lucide-react';
import { MenuBlock as MenuBlockType } from '@/types/profile';

interface MenuBlockProps {
  data: MenuBlockType;
  isEditing: boolean;
  onChange: (data: MenuBlockType) => void;
}

const MenuBlock = ({ data, isEditing, onChange }: MenuBlockProps) => {
  const hasData = data.dishes && data.dishes.length > 0;
  
  if (!hasData && !isEditing) return null;

  const addDish = () => {
    const newDish = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      description: '',
      price: ''
    };
    onChange({ dishes: [...data.dishes, newDish] });
  };

  const updateDish = (index: number, field: string, value: string) => {
    const updatedDishes = [...data.dishes];
    updatedDishes[index] = { ...updatedDishes[index], [field]: value };
    onChange({ dishes: updatedDishes });
  };

  const removeDish = (index: number) => {
    const updatedDishes = data.dishes.filter((_, i) => i !== index);
    onChange({ dishes: updatedDishes });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="w-5 h-5" />
            Menu
          </CardTitle>
          {isEditing && (
            <Button variant="outline" size="sm" onClick={addDish}>
              <Plus className="w-4 h-4 mr-2" />
              Add Dish
            </Button>
          )}
        </div>
        <p className="text-sm text-gray-500">
          Add your signature dishes or popular menu items. If you don't want to showcase specific dishes, skip this section.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.dishes.map((dish, index) => (
          <div key={dish.id} className="border rounded-lg p-4 space-y-3">
            {isEditing && (
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDish(index)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Dish Name</Label>
                {isEditing ? (
                  <Input
                    value={dish.name}
                    onChange={(e) => updateDish(index, 'name', e.target.value)}
                    placeholder="e.g., Signature Paella"
                  />
                ) : (
                  <p className="font-medium">{dish.name}</p>
                )}
              </div>
              <div>
                <Label>Price</Label>
                {isEditing ? (
                  <Input
                    value={dish.price}
                    onChange={(e) => updateDish(index, 'price', e.target.value)}
                    placeholder="e.g., €18.50"
                  />
                ) : (
                  <p className="font-medium text-green-600">{dish.price}</p>
                )}
              </div>
            </div>

            <div>
              <Label>Description</Label>
              {isEditing ? (
                <Textarea
                  value={dish.description}
                  onChange={(e) => updateDish(index, 'description', e.target.value)}
                  placeholder="Brief description of the dish"
                  rows={2}
                />
              ) : (
                <p className="text-gray-600">{dish.description}</p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MenuBlock;
