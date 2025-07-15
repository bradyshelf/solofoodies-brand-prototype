import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ArrowLeft, MapPin, Calendar, Clock, Users, Camera, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CollaborationPhotoUpload } from '@/components/CollaborationPhotoUpload';

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
  const [collaborationPhoto, setCollaborationPhoto] = useState<string | null>(null);

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
      customQuestion
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
          <h1 className="text-lg font-semibold text-gray-900">Crear Evento</h1>
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
              Crea un evento especial e invita a creadores para que participen y generen contenido
            </p>
          </div>
        </div>

        {/* Photo Upload Section */}
        <CollaborationPhotoUpload 
          value={collaborationPhoto}
          onChange={setCollaborationPhoto}
        />

        {/* Event Basics */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-semibold">Información del Evento</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del evento
              </label>
              <Input
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Ej: Lanzamiento de nueva colección"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación del evento
              </label>
              <Input
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                placeholder="Dirección completa del evento"
              />
            </div>
          </div>
        </div>

        {/* Event Type */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-semibold">Tipo de Evento</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {eventTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleEventTypeToggle(type.id)}
                className={`p-3 rounded-lg text-sm font-medium text-left ${
                  selectedEventTypes.includes(type.id)
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
          
          {selectedEventTypes.includes('other') && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Especifica el tipo de evento
              </label>
              <Input
                value={customEventType}
                onChange={(e) => setCustomEventType(e.target.value)}
                placeholder="Ej: Cata de vinos, Showcooking, etc."
              />
            </div>
          )}
        </div>

        {/* Timing & Attendance */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-semibold">Horarios y Asistencia</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha del evento
              </label>
              <Input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hora de inicio
                </label>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hora de fin
                </label>
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hora de llegada de creadores (opcional)
              </label>
              <Input
                type="time"
                value={creatorArrivalTime}
                onChange={(e) => setCreatorArrivalTime(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha límite RSVP
              </label>
              <Input
                type="date"
                value={rsvpDeadline}
                onChange={(e) => setRsvpDeadline(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número máximo de invitados
              </label>
              <Input
                type="number"
                value={guestCap}
                onChange={(e) => setGuestCap(e.target.value)}
                placeholder="Ej: 50"
              />
            </div>

            {/* Additional Guests Section */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Users className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-semibold">Acompañantes</h3>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-4">Acompañantes máximo por foodie</p>
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

            <div className="flex items-center space-x-3">
              <Checkbox
                checked={canBringPlusOne}
                onCheckedChange={(checked) => setCanBringPlusOne(!!checked)}
              />
              <label className="text-sm font-medium text-gray-700">
                ¿Pueden los creadores traer un acompañante?
              </label>
            </div>
          </div>
        </div>

        {/* Event Agenda */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-orange-500">📝</span>
            <h2 className="text-lg font-semibold">Agenda del Evento</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción del evento
              </label>
              <Textarea
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder="Describe qué pasará en el evento y por qué los creadores deberían asistir"
                className="min-h-[100px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Qué pueden esperar?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {expectations.map((expectation) => (
                  <button
                    key={expectation.id}
                    onClick={() => handleExpectationToggle(expectation.id)}
                    className={`p-3 rounded-lg text-sm font-medium text-left ${
                      selectedExpectations.includes(expectation.id)
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {expectation.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código de vestimenta / Tema (opcional)
              </label>
              <Input
                value={dressCode}
                onChange={(e) => setDressCode(e.target.value)}
                placeholder="Ej: Casual elegante, temática años 80"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Se fomenta la creación de contenido?
              </label>
              <div className="flex space-x-2">
                {[
                  { id: 'yes', name: 'Sí' },
                  { id: 'no', name: 'No' }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setContentCreationEncouraged(option.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      contentCreationEncouraged === option.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content & Collaboration Expectations */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Camera className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-semibold">Expectativas de Contenido</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Qué tipo de contenido esperas que publiquen?
              </label>
              <Textarea
                value={contentTypes}
                onChange={(e) => setContentTypes(e.target.value)}
                placeholder="Ej: Stories, Reels, Video recap, Menciones de producto, Cobertura del evento"
                className="min-h-[80px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hashtags a usar
              </label>
              <Input
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                placeholder="Ej: #MiMarcaEvent #Lanzamiento2024"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cuentas a etiquetar
              </label>
              <Input
                value={accountsToTag}
                onChange={(e) => setAccountsToTag(e.target.value)}
                placeholder="Ej: @mimarca @eventospop"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sugerencias de tono/mensaje (opcional)
              </label>
              <Textarea
                value={messagingTone}
                onChange={(e) => setMessagingTone(e.target.value)}
                placeholder="Describe el tono o mensaje que te gustaría que transmitan"
                className="min-h-[80px]"
              />
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                checked={isPaidCollab}
                onCheckedChange={(checked) => setIsPaidCollab(!!checked)}
              />
              <label className="text-sm font-medium text-gray-700">
                Colaboración pagada
              </label>
            </div>

            {isPaidCollab && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compensación
                </label>
                <Input
                  value={compensation}
                  onChange={(e) => setCompensation(e.target.value)}
                  placeholder="Ej: 500€ por creador, productos valorados en 200€"
                />
              </div>
            )}
          </div>
        </div>

        {/* Participation Flow */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-orange-500">🙋‍♀️</span>
            <h2 className="text-lg font-semibold">Flujo de Participación</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setParticipationFlow('invite-only')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  participationFlow === 'invite-only'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Solo por invitación
              </button>
              <button
                onClick={() => setParticipationFlow('open-applications')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  participationFlow === 'open-applications'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Aplicaciones abiertas
              </button>
            </div>

            {participationFlow === 'open-applications' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pregunta personalizada (opcional)
                </label>
                <Input
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder="Ej: Cuéntanos por qué te gustaría unirte a este evento"
                />
              </div>
            )}
          </div>
        </div>

        {/* Preview */}
        <div>
          <h3 className="font-semibold mb-4">Vista previa</h3>
          <Card className="bg-gray-900 text-white">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="font-semibold text-lg">
                  {eventName || 'Nombre del evento'}
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{eventLocation || 'Ubicación'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{eventDate || 'Fecha'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{startTime && endTime ? `${startTime} - ${endTime}` : 'Horario'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{guestCap ? `Máx. ${guestCap} invitados` : 'Sin límite'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Foodie +{additionalGuests} acompañantes máx.</span>
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
          Crear evento
        </Button>
      </div>
    </div>
  );
};

export default CreateEventCollaborationPage;
