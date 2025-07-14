import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ArrowLeft, MapPin, Calendar, Clock, Users, Camera, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateEventCollaborationPage = () => {
  const navigate = useNavigate();
  
  // Form state
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [customEventType, setCustomEventType] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [creatorArrivalTime, setCreatorArrivalTime] = useState('');
  const [rsvpDeadline, setRsvpDeadline] = useState('');
  const [guestCap, setGuestCap] = useState('');
  const [canBringPlusOne, setCanBringPlusOne] = useState(false);
  const [eventDescription, setEventDescription] = useState('');
  const [selectedExpectations, setSelectedExpectations] = useState<string[]>([]);
  const [dressCode, setDressCode] = useState('');
  const [contentCreationEncouraged, setContentCreationEncouraged] = useState('yes');
  const [additionalGuests, setAdditionalGuests] = useState(1);
  const [contentTypes, setContentTypes] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [accountsToTag, setAccountsToTag] = useState('');
  const [messagingTone, setMessagingTone] = useState('');
  const [isPaidCollab, setIsPaidCollab] = useState(false);
  const [compensation, setCompensation] = useState('');
  const [participationFlow, setParticipationFlow] = useState('invite-only');
  const [customQuestion, setCustomQuestion] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [discountPercentage, setDiscountPercentage] = useState(100);

  const eventTypes = [
    { id: 'private-event', name: 'Private event' },
    { id: 'public-event', name: 'Public event' },
    { id: 'pop-up', name: 'Pop-up' },
    { id: 'launch-party', name: 'Launch party' },
    { id: 'workshop-class', name: 'Workshop / Class' },
    { id: 'brand-experience', name: 'Brand experience' },
    { id: 'other', name: 'Other' }
  ];

  const expectations = [
    { id: 'food-drinks', name: 'Food & drinks' },
    { id: 'gift-bag', name: 'Gift bag / product sampling' },
    { id: 'live-music', name: 'Live music / DJ' },
    { id: 'brand-presentation', name: 'Brand presentation' },
    { id: 'networking', name: 'Networking / Creator meet-up' },
    { id: 'giveaways', name: 'Giveaways or contests' },
    { id: 'photography', name: 'Professional photography' }
  ];

  const days = [
    { id: 'lunes', name: 'Lunes' },
    { id: 'martes', name: 'Martes' },
    { id: 'miercoles', name: 'Miércoles' },
    { id: 'jueves', name: 'Jueves' },
    { id: 'viernes', name: 'Viernes' },
    { id: 'sabado', name: 'Sábado' },
    { id: 'domingo', name: 'Domingo' }
  ];

  const handleEventTypeToggle = (typeId: string) => {
    setSelectedEventTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleExpectationToggle = (expectationId: string) => {
    setSelectedExpectations(prev => 
      prev.includes(expectationId) 
        ? prev.filter(id => id !== expectationId)
        : [...prev, expectationId]
    );
  };

  const handleDayToggle = (dayId: string) => {
    setSelectedDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(id => id !== dayId)
        : [...prev, dayId]
    );
  };

  const handleCreateEvent = () => {
    const eventData = {
      eventName,
      eventLocation,
      selectedEventTypes,
      customEventType,
      eventDate,
      startTime,
      endTime,
      creatorArrivalTime,
      rsvpDeadline,
      guestCap,
      canBringPlusOne,
      eventDescription,
      selectedExpectations,
      dressCode,
      contentCreationEncouraged,
      additionalGuests,
      contentTypes,
      hashtags,
      accountsToTag,
      messagingTone,
      isPaidCollab,
      compensation,
      participationFlow,
      customQuestion,
      selectedDays,
      discountPercentage
    };
    
    console.log('Creating event collaboration:', eventData);
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
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-2">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">i</span>
            </div>
            <p className="text-sm text-blue-800">
              Define las condiciones de tu colaboración y recibe solicitudes de foodies interesados
            </p>
          </div>
        </div>

        {/* Grey Container */}
        <div className="bg-gray-50 rounded-lg p-6 space-y-6">
          
          {/* Ubicación */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-semibold">Ubicación (1)</h2>
              </div>
              <button className="text-blue-600 text-sm">Seleccionar todo</button>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div>
                  <div className="font-medium">Local Valencia</div>
                  <div className="text-sm text-gray-600">Calle Colón, 27</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-lg">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div>
                  <div className="font-medium">Sucursal Barcelona</div>
                  <div className="text-sm text-gray-600">Passeig de Gràcia, 92</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-lg">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div>
                  <div className="font-medium">Sede Central</div>
                  <div className="text-sm text-gray-600">Calle Gran Vía, 45</div>
                </div>
              </div>
              <button className="w-full p-3 border border-dashed border-gray-300 rounded-lg text-gray-600 text-sm flex items-center justify-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Añadir ubicación</span>
              </button>
            </div>
          </div>

          {/* Seguidores */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold">Seguidores</h2>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Mínimo seguidores: 10k</span>
                <span className="text-sm text-gray-600">foodies disponibles: 30k</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  value="10000"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1k</span>
                  <span>100k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Participantes */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold">Participantes</h2>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-4">Acompañantes máx por foodie</p>
              <div className="flex items-center justify-center space-x-6">
                <button
                  onClick={() => setAdditionalGuests(Math.max(0, additionalGuests - 1))}
                  className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"
                >
                  <Minus className="w-5 h-5" />
                </button>
                
                <div className="text-center">
                  <div className="text-2xl font-bold">Foodie + {additionalGuests}</div>
                  <div className="text-sm text-orange-500">Acompañantes máx</div>
                </div>
                
                <button
                  onClick={() => setAdditionalGuests(additionalGuests + 1)}
                  className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Crédito */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-orange-500">💰</span>
              <h2 className="text-lg font-semibold">Crédito</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                  %
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">
                  €
                </button>
              </div>
              
              <div className="text-center">
                <div className="text-6xl font-bold mb-4">{discountPercentage}%</div>
                <div className="relative mb-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full absolute top-1/2 transform -translate-y-1/2" style={{left: `${discountPercentage}%`}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Días disponibles */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold">Días disponibles (4)</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleDayToggle('lunes')}
                className={`p-3 rounded-lg text-sm font-medium ${
                  selectedDays.includes('lunes')
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-600'
                }`}
              >
                Lunes
              </button>
              <button
                onClick={() => handleDayToggle('martes')}
                className={`p-3 rounded-lg text-sm font-medium ${
                  selectedDays.includes('martes')
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-600'
                }`}
              >
                Martes
              </button>
              <button
                onClick={() => handleDayToggle('miercoles')}
                className={`p-3 rounded-lg text-sm font-medium ${
                  selectedDays.includes('miercoles')
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-600'
                }`}
              >
                Miércoles
              </button>
              <button
                onClick={() => handleDayToggle('jueves')}
                className={`p-3 rounded-lg text-sm font-medium ${
                  selectedDays.includes('jueves')
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-600'
                }`}
              >
                Jueves
              </button>
              <button
                onClick={() => handleDayToggle('viernes')}
                className={`p-3 rounded-lg text-sm font-medium ${
                  selectedDays.includes('viernes')
                    ? 'bg-white border border-gray-200 text-gray-600'
                    : 'bg-white border border-gray-200 text-gray-600'
                }`}
              >
                Viernes
              </button>
              <button
                onClick={() => handleDayToggle('sabado')}
                className={`p-3 rounded-lg text-sm font-medium ${
                  selectedDays.includes('sabado')
                    ? 'bg-white border border-gray-200 text-gray-600'
                    : 'bg-white border border-gray-200 text-gray-600'
                }`}
              >
                Sábado
              </button>
              <div className="col-span-2 flex justify-center">
                <button
                  onClick={() => handleDayToggle('domingo')}
                  className={`p-3 rounded-lg text-sm font-medium w-32 ${
                    selectedDays.includes('domingo')
                      ? 'bg-white border border-gray-200 text-gray-600'
                      : 'bg-white border border-gray-200 text-gray-600'
                  }`}
                >
                  Domingo
                </button>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-orange-500">📝</span>
              <h2 className="text-lg font-semibold">Descripción</h2>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Describe lo que espera de esta colaboración</p>
              <Textarea
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder="Describe lo que espera de esta colaboración"
                className="min-h-[100px] resize-none"
              />
              <div className="text-right text-xs text-gray-400 mt-1">500/800</div>
            </div>
          </div>

          {/* Vista previa */}
          <div>
            <h3 className="font-semibold mb-4">Vista previa</h3>
            <Card className="bg-gray-900 text-white">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Local Valencia</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Calle Colón, 27</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Mín. 10k seguidores</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Foodie +{additionalGuests} acompañantes máx.</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-500">💰</span>
                    <span className="text-sm">{discountPercentage}% Descuento</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">lunes, martes, +2 más</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Create Button */}
          <Button 
            onClick={handleCreateEvent}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Crear colaboración
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateEventCollaborationPage;