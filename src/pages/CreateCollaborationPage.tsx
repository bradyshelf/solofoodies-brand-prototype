import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, MapPin, Users, Percent, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateCollaborationPage = () => {
  const navigate = useNavigate();
  
  // Form state
  const [selectedLocations, setSelectedLocations] = useState<string[]>(['local-valencia']);
  const [minFollowers, setMinFollowers] = useState([10]);
  const [foodieCount, setFoodieCount] = useState(1);
  const [creditType, setCreditType] = useState<'percentage' | 'euro'>('percentage');
  const [discountPercentage, setDiscountPercentage] = useState([100]);
  const [selectedDays, setSelectedDays] = useState<string[]>(['lunes', 'martes']);
  const [description, setDescription] = useState('');

  const locations = [
    { id: 'local-valencia', name: 'Local Valencia', address: 'Calle Colon, 27', selected: true },
    { id: 'sucursal-barcelona', name: 'Sucursal Barcelona', address: 'Passeig de Gràcia, 92', selected: false },
    { id: 'sede-central', name: 'Sede Central', address: 'Calle Gran Vía, 45', selected: false }
  ];

  const days = [
    { id: 'lunes', name: 'Lunes', selected: true },
    { id: 'martes', name: 'Martes', selected: true },
    { id: 'miercoles', name: 'Miércoles', selected: false },
    { id: 'jueves', name: 'Jueves', selected: false },
    { id: 'viernes', name: 'Viernes', selected: false },
    { id: 'sabado', name: 'Sábado', selected: false },
    { id: 'domingo', name: 'Domingo', selected: false }
  ];

  const handleLocationSelect = (locationId: string, checked: boolean) => {
    if (checked) {
      setSelectedLocations(prev => [...prev, locationId]);
    } else {
      setSelectedLocations(prev => prev.filter(id => id !== locationId));
    }
  };

  const handleDayToggle = (dayId: string) => {
    setSelectedDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(id => id !== dayId)
        : [...prev, dayId]
    );
  };

  const handleCreateCollaboration = () => {
    const collaborationData = {
      locations: selectedLocations,
      minFollowers: minFollowers[0],
      foodieCount,
      creditType,
      discountPercentage: discountPercentage[0],
      availableDays: selectedDays,
      description
    };
    
    console.log('Creating collaboration:', collaborationData);
    navigate('/collaborations');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/collaborations')} 
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Crear Colaboración</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">i</span>
            </div>
            <p className="text-sm text-blue-800">
              Define las condiciones de tu colaboración y recibe solicitudes de foodies interesados
            </p>
          </div>
        </div>

        {/* Location Selection */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-semibold">Ubicación (1)</h2>
              </div>
              <button className="text-blue-600 text-sm">Seleccionar todo</button>
            </div>
            
            <div className="space-y-3">
              {locations.map((location) => (
                <Card key={location.id} className="border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <Checkbox
                        checked={location.id === 'local-valencia' || selectedLocations.includes(location.id)}
                        onCheckedChange={(checked) => handleLocationSelect(location.id, !!checked)}
                        className="w-6 h-6"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{location.name}</h3>
                        <p className="text-sm text-gray-500">{location.address}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button variant="outline" className="w-full justify-center text-gray-600">
                <Plus className="w-4 h-4 mr-2" />
                Añadir ubicación
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Followers Section */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold">Seguidores</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Mínimo seguidores: {minFollowers[0]}k</span>
                </div>
                <Slider
                  value={minFollowers}
                  onValueChange={setMinFollowers}
                  max={50}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1k</span>
                  <span>foodies disponibles</span>
                  <span>50k</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Participants Section */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold">Participantes</h2>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-4">Acompañantes máx por foodie</p>
              <div className="flex items-center justify-center space-x-6">
                <button
                  onClick={() => setFoodieCount(Math.max(1, foodieCount - 1))}
                  className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"
                >
                  <Minus className="w-5 h-5" />
                </button>
                
                <div className="text-center">
                  <div className="text-2xl font-bold">Foodie + {foodieCount}</div>
                  <div className="text-sm text-orange-500">Acompañante máx</div>
                </div>
                
                <button
                  onClick={() => setFoodieCount(foodieCount + 1)}
                  className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credit Section */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Percent className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold">Crédito</h2>
            </div>
            
            <div className="space-y-4">
              {/* Credit Type Toggle */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setCreditType('percentage')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    creditType === 'percentage'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  %
                </button>
                <button
                  onClick={() => setCreditType('euro')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    creditType === 'euro'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  €
                </button>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                  {creditType === 'percentage' ? `${discountPercentage[0]}%` : `${discountPercentage[0]}€`}
                </div>
                <Slider
                  value={discountPercentage}
                  onValueChange={setDiscountPercentage}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Days */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-orange-500">⏰</span>
              <h2 className="text-lg font-semibold">Días disponibles (4)</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {days.slice(0, 6).map((day) => (
                <button
                  key={day.id}
                  onClick={() => handleDayToggle(day.id)}
                  className={`p-3 rounded-lg text-sm font-medium ${
                    (day.id === 'lunes' || day.id === 'martes') || selectedDays.includes(day.id)
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {day.name}
                </button>
              ))}
            </div>
            <div className="flex justify-center mt-2">
              <button
                key={days[6].id}
                onClick={() => handleDayToggle(days[6].id)}
                className={`p-3 rounded-lg text-sm font-medium w-[calc(50%-0.25rem)] ${
                  selectedDays.includes(days[6].id)
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {days[6].name}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-orange-500">📝</span>
              <h2 className="text-lg font-semibold">Descripción</h2>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Describe lo que espera de esta colaboración</p>
              <Textarea
                placeholder="Describe lo que espera de esta colaboración"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="text-right text-xs text-gray-400 mt-1">500/500</div>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Vista previa</h3>
            <Card className="bg-gray-900 text-white">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Local Valencia</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Mín. {minFollowers[0]}k seguidores</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Foodie +{foodieCount} acompañantes máx.</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Percent className="w-4 h-4" />
                    <span className="text-sm">
                      {creditType === 'percentage' ? `${discountPercentage[0]}% Descuento` : `${discountPercentage[0]}€ Crédito`}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">📅</span>
                    <span className="text-sm">lunes, martes, +2 más</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Create Button */}
        <Button 
          onClick={handleCreateCollaboration}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Crear colaboración
        </Button>
      </div>
    </div>
  );
};

export default CreateCollaborationPage;
