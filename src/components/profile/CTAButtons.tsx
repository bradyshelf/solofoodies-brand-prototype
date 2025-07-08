
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ExternalLink, Plus, Trash2 } from 'lucide-react';
import { CTAButton } from '@/types/profile';

interface CTAButtonsProps {
  buttons: CTAButton[];
  isEditing: boolean;
  onChange: (buttons: CTAButton[]) => void;
}

const CTAButtons = ({ buttons, isEditing, onChange }: CTAButtonsProps) => {
  const activeButtons = buttons.filter(btn => btn.isActive && btn.link);
  const hasActiveButtons = activeButtons.length > 0;
  
  if (!hasActiveButtons && !isEditing) return null;

  const ctaTypes = [
    { value: 'reserve', label: 'Reserve a Table' },
    { value: 'shop', label: 'Buy Our Products' },
    { value: 'sample', label: 'Request Sample' },
    { value: 'contact', label: 'Contact Us' },
    { value: 'custom', label: 'Custom' }
  ];

  const addButton = () => {
    if (buttons.length >= 2) return;
    
    const newButton: CTAButton = {
      id: Math.random().toString(36).substr(2, 9),
      label: '',
      type: 'custom',
      link: '',
      isActive: true
    };
    onChange([...buttons, newButton]);
  };

  const updateButton = (index: number, field: keyof CTAButton, value: any) => {
    const updatedButtons = [...buttons];
    updatedButtons[index] = { ...updatedButtons[index], [field]: value };
    
    // Auto-set label based on type
    if (field === 'type' && value !== 'custom') {
      const typeData = ctaTypes.find(t => t.value === value);
      if (typeData) {
        updatedButtons[index].label = typeData.label;
      }
    }
    
    onChange(updatedButtons);
  };

  const removeButton = (index: number) => {
    const updatedButtons = buttons.filter((_, i) => i !== index);
    onChange(updatedButtons);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            Call-to-Action Buttons
          </CardTitle>
          {isEditing && buttons.length < 2 && (
            <Button variant="outline" size="sm" onClick={addButton}>
              <Plus className="w-4 h-4 mr-2" />
              Add Button
            </Button>
          )}
        </div>
        <p className="text-sm text-gray-500">
          Add up to 2 action buttons for your profile (e.g., "Reserve a Table", "Buy Our Wine")
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {buttons.map((button, index) => (
          <div key={button.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={button.isActive}
                  onCheckedChange={(checked) => updateButton(index, 'isActive', checked)}
                  disabled={!isEditing}
                />
                <Label>Active</Label>
              </div>
              {isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeButton(index)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Button Type</Label>
                {isEditing ? (
                  <Select
                    value={button.type}
                    onValueChange={(value) => updateButton(index, 'type', value)}
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
                ) : (
                  <p className="text-gray-900">{button.type}</p>
                )}
              </div>
              <div>
                <Label>Button Text</Label>
                {isEditing ? (
                  <Input
                    value={button.label}
                    onChange={(e) => updateButton(index, 'label', e.target.value)}
                    placeholder="Button text"
                    disabled={button.type !== 'custom'}
                  />
                ) : (
                  <p className="text-gray-900">{button.label}</p>
                )}
              </div>
            </div>

            <div>
              <Label>Link</Label>
              {isEditing ? (
                <Input
                  value={button.link}
                  onChange={(e) => updateButton(index, 'link', e.target.value)}
                  placeholder="https://example.com"
                />
              ) : (
                button.link && (
                  <a 
                    href={button.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {button.link}
                  </a>
                )
              )}
            </div>
          </div>
        ))}

        {/* Preview active buttons */}
        {!isEditing && activeButtons.length > 0 && (
          <div className="pt-4 border-t">
            <Label className="text-sm text-gray-600 mb-3 block">Preview</Label>
            <div className="flex gap-2">
              {activeButtons.map((button) => (
                <Button
                  key={button.id}
                  onClick={() => window.open(button.link, '_blank')}
                  className="flex-1"
                >
                  {button.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CTAButtons;
