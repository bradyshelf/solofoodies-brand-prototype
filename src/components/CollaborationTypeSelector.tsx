
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Users, Package, Calendar, ArrowRight } from 'lucide-react';

interface CollaborationTypeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTypeSelected: (type: string) => void;
}

const collaborationTypes = [
  {
    id: 'influencer-visit',
    title: 'Influencer Visit',
    description: 'Invite creators to visit your restaurant for a dining experience',
    icon: Users,
    isDefault: true
  },
  {
    id: 'product-sendout',
    title: 'Delivery',
    description: 'Send products to creators for unboxing and review content',
    icon: Package,
    isDefault: false
  },
  {
    id: 'event-invitation',
    title: 'Event',
    description: 'Invite creators to special events, launches, or gatherings',
    icon: Calendar,
    isDefault: false
  }
];

export const CollaborationTypeSelector = ({ 
  open, 
  onOpenChange, 
  onTypeSelected 
}: CollaborationTypeSelectorProps) => {
  const [selectedType, setSelectedType] = useState('influencer-visit');

  const handleContinue = () => {
    onTypeSelected(selectedType);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            ¿Qué tipo de colaboración quieres crear?
          </DialogTitle>
          <p className="text-sm text-gray-600 text-center mt-2">
            Elige cómo te gustaría colaborar con creadores. Esto nos ayuda a personalizar el proceso según tus necesidades.
          </p>
        </DialogHeader>

        <div className="py-6">
          <RadioGroup 
            value={selectedType} 
            onValueChange={setSelectedType}
            className="space-y-4"
          >
            {collaborationTypes.map((type) => {
              const IconComponent = type.icon;
              
              // Define colors based on collaboration type
              const getColorClasses = (typeId: string, isSelected: boolean) => {
                if (!isSelected) {
                  return {
                    card: 'border-gray-200 hover:border-gray-300',
                    iconBg: 'bg-gray-100',
                    iconColor: 'text-gray-600'
                  };
                }
                
                switch (typeId) {
                  case 'product-sendout':
                    return {
                      card: 'border-orange-500 bg-orange-50',
                      iconBg: 'bg-orange-100',
                      iconColor: 'text-orange-600'
                    };
                  case 'event-invitation':
                    return {
                      card: 'border-green-500 bg-green-50',
                      iconBg: 'bg-green-100',
                      iconColor: 'text-green-600'
                    };
                  default: // influencer-visit
                    return {
                      card: 'border-blue-500 bg-blue-50',
                      iconBg: 'bg-blue-100',
                      iconColor: 'text-blue-600'
                    };
                }
              };
              
              const colors = getColorClasses(type.id, selectedType === type.id);
              
              return (
                <Card 
                  key={type.id} 
                  className={`cursor-pointer transition-all border-2 ${colors.card}`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <RadioGroupItem 
                        value={type.id} 
                        className="mt-1"
                      />
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`p-2 rounded-lg ${colors.iconBg}`}>
                          <IconComponent className={`w-5 h-5 ${colors.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-gray-900">
                              {type.title}
                            </h3>
                            {type.isDefault && (
                              <span className="px-2 py-1 text-xs bg-orange-100 text-orange-600 rounded-full">
                                Recomendado
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </RadioGroup>
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleContinue}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Continuar
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
