
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Package, Plus, Trash2 } from 'lucide-react';
import { ProductBlock as ProductBlockType } from '@/types/profile';

interface ProductBlockProps {
  data: ProductBlockType;
  isEditing: boolean;
  onChange: (data: ProductBlockType) => void;
}

const ProductBlock = ({ data, isEditing, onChange }: ProductBlockProps) => {
  const hasData = data.products && data.products.length > 0;
  
  if (!hasData && !isEditing) return null;

  const addProduct = () => {
    const newProduct = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      description: '',
      price: '',
      sku: '',
      order_link: ''
    };
    onChange({ products: [...data.products, newProduct] });
  };

  const updateProduct = (index: number, field: string, value: string) => {
    const updatedProducts = [...data.products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    onChange({ products: updatedProducts });
  };

  const removeProduct = (index: number) => {
    const updatedProducts = data.products.filter((_, i) => i !== index);
    onChange({ products: updatedProducts });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Products
          </CardTitle>
          {isEditing && (
            <Button variant="outline" size="sm" onClick={addProduct}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          )}
        </div>
        <p className="text-sm text-gray-500">
          Add any packaged products (sauces, drinks, merch, etc.) you offer. If you don't sell products, skip this section.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.products.map((product, index) => (
          <div key={product.id} className="border rounded-lg p-4 space-y-3">
            {isEditing && (
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProduct(index)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Product Name</Label>
                {isEditing ? (
                  <Input
                    value={product.name}
                    onChange={(e) => updateProduct(index, 'name', e.target.value)}
                    placeholder="e.g., Signature Hot Sauce"
                  />
                ) : (
                  <p className="font-medium">{product.name}</p>
                )}
              </div>
              <div>
                <Label>Price</Label>
                {isEditing ? (
                  <Input
                    value={product.price}
                    onChange={(e) => updateProduct(index, 'price', e.target.value)}
                    placeholder="e.g., €15.99"
                  />
                ) : (
                  <p className="font-medium text-green-600">{product.price}</p>
                )}
              </div>
            </div>

            <div>
              <Label>Description</Label>
              {isEditing ? (
                <Textarea
                  value={product.description}
                  onChange={(e) => updateProduct(index, 'description', e.target.value)}
                  placeholder="Brief description of the product"
                  rows={2}
                />
              ) : (
                <p className="text-gray-600">{product.description}</p>
              )}
            </div>

            <div>
              <Label>Order Link</Label>
              <p className="text-xs text-gray-500 mb-2">Where can customers buy this product?</p>
              {isEditing ? (
                <Input
                  value={product.order_link}
                  onChange={(e) => updateProduct(index, 'order_link', e.target.value)}
                  placeholder="https://shop.example.com/product"
                />
              ) : (
                product.order_link && (
                  <a 
                    href={product.order_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Product
                  </a>
                )
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProductBlock;
