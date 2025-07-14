import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, MapPin, Users, Clock, Star, Plus, Minus, Camera, Gift, MessageSquare, Calendar, CreditCard, Settings, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateCollaborationPage = () => {
  const navigate = useNavigate();
  
  // Form state
  const [selectedLocations, setSelectedLocations] = useState<string[]>(['valencia']);
  const [minFollowers, setMinFollowers] = useState([10000]);
  const [maxFollowers, setMaxFollowers] = useState([100000]);
  const [foodieCount, setFoodieCount] = useState(1);
  const [additionalGuests, setAdditionalGuests] = useState(1);
  const [creditType, setCreditType] = useState('percentage');
  const [discountPercentage, setDiscountPercentage] = useState([100]);
  const [fixedAmount, setFixedAmount] = useState([50]);
  const [selectedDays, setSelectedDays] = useState<string[]>(['lunes', 'martes']);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [collaborationType, setCollaborationType] = useState('public');
  const [contentRequirements, setContentRequirements] = useState<string[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState('dine-in');
  const [specialRequests, setSpecialRequests] = useState('');
  const [hashtagRequirements, setHashtagRequirements] = useState('');
  const [mentionRequirements, setMentionRequirements] = useState('');
  const [deadline, setDeadline] = useState('');
  const [budget, setBudget] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState<string[]>([]);
  const [genderPreference, setGenderPreference] = useState('any');
  const [experienceLevel, setExperienceLevel] = useState<string[]>([]);
  const [collaborationTitle, setCollaborationTitle] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [isExclusive, setIsExclusive] = useState(false);
  const [allowNegotiation, setAllowNegotiation] = useState(true);

  const locations = [
    { id: 'valencia', name: 'Local Valencia', address: 'Calle Colón, 27' },
    { id: 'barcelona', name: 'Sucursal Barcelona', address: 'Passeig de Gràcia, 92' },
    { id: 'madrid', name: 'Sede Central', address: 'Calle Gran Vía, 45' },
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

  const timeSlots = [
    { id: 'morning', name: 'Mañana (9:00-12:00)' },
    { id: 'lunch', name: 'Almuerzo (12:00-16:00)' },
    { id: 'afternoon', name: 'Tarde (16:00-19:00)' },
    { id: 'dinner', name: 'Cena (19:00-23:00)' }
  ];

  const contentTypes = [
    { id: 'instagram-post', name: 'Instagram Post' },
    { id: 'instagram-story', name: 'Instagram Story' },
    { id: 'instagram-reel', name: 'Instagram Reel' },
    { id: 'tiktok-video', name: 'TikTok Video' },
    { id: 'youtube-video', name: 'YouTube Video' },
    { id: 'blog-post', name: 'Blog Post' },
    { id: 'review', name: 'Google/Yelp Review' }
  ];

  const foodCategories = [
    { id: 'italian', name: 'Italiana' },
    { id: 'mediterranean', name: 'Mediterránea' },
    { id: 'asian', name: 'Asiática' },
    { id: 'mexican', name: 'Mexicana' },
    { id: 'vegan', name: 'Vegana' },
    { id: 'healthy', name: 'Saludable' },
    { id: 'desserts', name: 'Postres' },
    { id: 'drinks', name: 'Bebidas' }
  ];

  const influencerAgeRanges = [
    { id: '18-24', name: '18-24 años' },
    { id: '25-34', name: '25-34 años' },
    { id: '35-44', name: '35-44 años' },
    { id: '45+', name: '45+ años' }
  ];

  const experienceLevels = [
    { id: 'beginner', name: 'Principiante (< 1 año)' },
    { id: 'intermediate', name: 'Intermedio (1-3 años)' },
    { id: 'advanced', name: 'Avanzado (3-5 años)' },
    { id: 'expert', name: 'Experto (5+ años)' }
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

  const handleTimeSlotToggle = (slotId: string) => {
    setSelectedTimeSlots(prev => 
      prev.includes(slotId) 
        ? prev.filter(id => id !== slotId)
        : [...prev, slotId]
    );
  };

  const handleContentRequirementToggle = (contentId: string) => {
    setContentRequirements(prev => 
      prev.includes(contentId) 
        ? prev.filter(id => id !== contentId)
        : [...prev, contentId]
    );
  };

  const handleCategoryToggle = (categoryId: string) => {
    setCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAgeRangeToggle = (ageId: string) => {
    setAgeRange(prev => 
      prev.includes(ageId) 
        ? prev.filter(id => id !== ageId)
        : [...prev, ageId]
    );
  };

  const handleExperienceToggle = (expId: string) => {
    setExperienceLevel(prev => 
      prev.includes(expId) 
        ? prev.filter(id => id !== expId)
        : [...prev, expId]
    );
  };

  const handleCreateCollaboration = () => {
    const collaborationData = {
      title: collaborationTitle,
      locations: selectedLocations,
      minFollowers: minFollowers[0],
      maxFollowers: maxFollowers[0],
      foodieCount,
      additionalGuests,
      creditType,
      discountPercentage: discountPercentage[0],
      fixedAmount: fixedAmount[0],
      availableDays: selectedDays,
      timeSlots: selectedTimeSlots,
      description,
      collaborationType,
      contentRequirements,
      deliveryMethod,
      specialRequests,
      hashtagRequirements,
      mentionRequirements,
      deadline,
      budget,
      categories,
      ageRange,
      genderPreference,
      experienceLevel,
      isUrgent,
      isExclusive,
      allowNegotiation
    };
    
    console.log('Creating collaboration:', collaborationData);
    navigate('/collaborations');
  };

  const formatFollowerCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}k`;
    return count.toString();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/collaborations')} 
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
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
          
          {/* Collaboration Title */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Settings className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold">Información Básica</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título de la colaboración
                </label>
                <Input
                  value={collaborationTitle}
                  onChange={(e) => setCollaborationTitle(e.target.value)}
                  placeholder="Ej: Visita a nuestro nuevo local de Valencia"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de colaboración
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCollaborationType('public')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      collaborationType === 'public'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Pública
                  </button>
                  <button
                    onClick={() => setCollaborationType('private')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      collaborationType === 'private'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Privada
                  </button>
                  <button
                    onClick={() => setCollaborationType('invite-only')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      collaborationType === 'invite-only'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Solo invitación
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={isUrgent}
                    onCheckedChange={(checked) => setIsUrgent(!!checked)}
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Urgente
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={isExclusive}
                    onCheckedChange={(checked) => setIsExclusive(!!checked)}
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Exclusivo
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={allowNegotiation}
                    onCheckedChange={(checked) => setAllowNegotiation(!!checked)}
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Permitir negociación
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Ubicación */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-semibold">Ubicación ({selectedLocations.length})</h2>
              </div>
              <button 
                onClick={() => setSelectedLocations(locations.map(l => l.id))}
                className="text-blue-600 text-sm hover:text-blue-700"
              >
                Seleccionar todo
              </button>
            </div>
            
            <div className="space-y-2">
              {locations.map((location) => (
                <div 
                  key={location.id}
                  className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedLocations.includes(location.id)
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handleLocationSelect(location.id, !selectedLocations.includes(location.id))}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    selectedLocations.includes(location.id) ? 'bg-blue-600' : 'bg-gray-300'
                  }`}></div>
                  <div className="flex-1">
                    <div className="font-medium">{location.name}</div>
                    <div className="text-sm text-gray-600">{location.address}</div>
                  </div>
                </div>
              ))}
              <button className="w-full p-3 border border-dashed border-gray-300 rounded-lg text-gray-600 text-sm flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors">
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
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Mínimo seguidores: {formatFollowerCount(minFollowers[0])}</span>
                  <span className="text-sm text-gray-600">foodies disponibles: 30k</span>
                </div>
                <Slider
                  value={minFollowers}
                  onValueChange={setMinFollowers}
                  max={1000000}
                  min={1000}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1k</span>
                  <span>1M</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Máximo seguidores: {formatFollowerCount(maxFollowers[0])}</span>
                  <span className="text-sm text-gray-600">Sin límite superior</span>
                </div>
                <Slider
                  value={maxFollowers}
                  onValueChange={setMaxFollowers}
                  max={1000000}
                  min={minFollowers[0]}
                  step={1000}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Demographics */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Star className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold">Demografia del Influencer</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Edad preferida
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {influencerAgeRanges.map((age) => (
                    <button
                      key={age.id}
                      onClick={() => handleAgeRangeToggle(age.id)}
                      className={`p-3 rounded-lg text-sm font-medium ${
                        ageRange.includes(age.id)
                          ? 'bg-gray-900 text-white'
                          : 'bg-white border border-gray-200 text-gray-600'
                      }`}
                    >
                      {age.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Género
                </label>
                <div className="flex space-x-2">
                  {[
                    { id: 'any', name: 'Cualquiera' },
                    { id: 'female', name: 'Femenino' },
                    { id: 'male', name: 'Masculino' }
                  ].map((gender) => (
                    <button
                      key={gender.id}
                      onClick={() => setGenderPreference(gender.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        genderPreference === gender.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {gender.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nivel de experiencia
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {experienceLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => handleExperienceToggle(level.id)}
                      className={`p-3 rounded-lg text-sm font-medium ${
                        experienceLevel.includes(level.id)
                          ? 'bg-gray-900 text-white'
                          : 'bg-white border border-gray-200 text-gray-600'
                      }`}
                    >
                      {level.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Food Categories */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Gift className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold">Categorías de Comida</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {foodCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryToggle(category.id)}
                  className={`p-3 rounded-lg text-sm font-medium ${
                    categories.includes(category.id)
                      ? 'bg-gray-900 text-white'
                      : 'bg-white border border-gray-200 text-gray-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Participantes */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold">Participantes</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-4">Número de foodies</p>
                <div className="flex items-center justify-center space-x-6">
                  <button
                    onClick={() => setFoodieCount(Math.max(1, foodieCount - 1))}
                    className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold">{foodieCount}</div>
                    <div className="text-sm text-orange-500">Foodies</div>
                  </div>
                  
                  <button
                    onClick={() => setFoodieCount(foodieCount + 1)}
                    className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-4">Acompañantes máx por foodie</p>
                <div className="flex items-center justify-center space-x-6">
                  <button
                    onClick={() => setAdditionalGuests(Math.max(0, additionalGuests - 1))}
                    className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold">Foodie + {additionalGuests}</div>
                    <div className="text-sm text-orange-500">Acompañantes máx</div>
                  </div>
                  
                  <button
                    onClick={() => setAdditionalGuests(additionalGuests + 1)}
                    className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Crédito */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold">Crédito</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => setCreditType('percentage')}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    creditType === 'percentage' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  %
                </button>
                <button
                  onClick={() => setCreditType('fixed')}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    creditType === 'fixed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  €
                </button>
              </div>
              
              {creditType === 'percentage' ? (
                <div className="text-center">
                  <div className="text-6xl font-bold mb-4">{discountPercentage[0]}%</div>
                  <Slider
                    value={discountPercentage}
                    onValueChange={setDiscountPercentage}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-6xl font-bold mb-4">{fixedAmount[0]}€</div>
                  <Slider
                    value={fixedAmount}
                    onValueChange={setFixedAmount}
                    max={500}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Delivery Method */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Gift className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold">Método de Entrega</h2>
            </div>
            
            <div className="flex space-x-2">
              {[
                { id: 'dine-in', name: 'Comer en el local' },
                { id: 'takeaway', name: 'Para llevar' },
                { id: 'delivery', name: 'Delivery' }
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setDeliveryMethod(method.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    deliveryMethod === method.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {method.name}
                </button>
              ))}
            </div>
          </div>

          {/* Días disponibles */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold">Días disponibles ({selectedDays.length})</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {days.slice(0, 6).map((day) => (
                <button
                  key={day.id}
                  onClick={() => handleDayToggle(day.id)}
                  className={`p-3 rounded-lg text-sm font-medium ${
                    selectedDays.includes(day.id)
                      ? 'bg-gray-900 text-white'
                      : 'bg-white border border-gray-200 text-gray-600'
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
                    : 'bg-white border border-gray-200 text-gray-600'
                }`}
              >
                {days[6].name}
              </button>
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold">Horarios Disponibles</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => handleTimeSlotToggle(slot.id)}
                  className={`p-3 rounded-lg text-sm font-medium ${
                    selectedTimeSlots.includes(slot.id)
                      ? 'bg-gray-900 text-white'
                      : 'bg-white border border-gray-200 text-gray-600'
                  }`}
                >
                  {slot.name}
                </button>
              ))}
            </div>
          </div>

          {/* Content Requirements */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Camera className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold">Requisitos de Contenido</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {contentTypes.map((content) => (
                <button
                  key={content.id}
                  onClick={() => handleContentRequirementToggle(content.id)}
                  className={`p-3 rounded-lg text-sm font-medium ${
                    contentRequirements.includes(content.id)
                      ? 'bg-gray-900 text-white'
                      : 'bg-white border border-gray-200 text-gray-600'
                  }`}
                >
                  {content.name}
                </button>
              ))}
            </div>
          </div>

          {/* Social Media Requirements */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <MessageSquare className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold">Requisitos de Redes Sociales</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hashtags requeridos
                </label>
                <Input
                  value={hashtagRequirements}
                  onChange={(e) => setHashtagRequirements(e.target.value)}
                  placeholder="Ej: #mirestaurante #colaboracion #foodie"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Menciones requeridas
                </label>
                <Input
                  value={mentionRequirements}
                  onChange={(e) => setMentionRequirements(e.target.value)}
                  placeholder="Ej: @mirestaurante @chefprincipal"
                />
              </div>
            </div>
          </div>

          {/* Budget & Timeline */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold">Presupuesto y Cronograma</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Presupuesto total (opcional)
                </label>
                <Input
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Ej: 500€"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha límite para aplicar
                </label>
                <Input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <MessageSquare className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold">Descripción</h2>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Describe lo que espera de esta colaboración</p>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe lo que espera de esta colaboración..."
                className="min-h-[100px] resize-none"
              />
              <div className="text-right text-xs text-gray-400 mt-1">{description.length}/800</div>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Settings className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold">Solicitudes Especiales</h2>
            </div>
            
            <div>
              <Textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Cualquier solicitud especial, restricciones dietéticas, horarios específicos, etc."
                className="min-h-[80px] resize-none"
              />
            </div>
          </div>

          {/* Vista previa */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="w-5 h-5 text-orange-500" />
              <h3 className="font-semibold">Vista previa</h3>
            </div>
            <Card className="bg-gray-900 text-white">
              <CardContent className="p-4">
                <div className="space-y-2">
                  {collaborationTitle && (
                    <div className="font-semibold text-lg mb-2">{collaborationTitle}</div>
                  )}
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">
                      {selectedLocations.length > 0 
                        ? locations.find(l => l.id === selectedLocations[0])?.name
                        : 'Sin ubicación seleccionada'
                      }
                    </span>
                  </div>
                  {selectedLocations.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">
                        {locations.find(l => l.id === selectedLocations[0])?.address}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Mín. {formatFollowerCount(minFollowers[0])} seguidores</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">
                      {foodieCount} Foodie{foodieCount > 1 ? 's' : ''} + {additionalGuests} acompañantes máx.
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4" />
                    <span className="text-sm">
                      {creditType === 'percentage' 
                        ? `${discountPercentage[0]}% Descuento`
                        : `${fixedAmount[0]}€ Crédito`
                      }
                    </span>
                  </div>
                  {selectedDays.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">
                        {selectedDays.slice(0, 2).map(dayId => 
                          days.find(d => d.id === dayId)?.name.toLowerCase()
                        ).join(', ')}
                        {selectedDays.length > 2 && `, +${selectedDays.length - 2} más`}
                      </span>
                    </div>
                  )}
                  {contentRequirements.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Camera className="w-4 h-4" />
                      <span className="text-sm">
                        {contentRequirements.length} tipo{contentRequirements.length > 1 ? 's' : ''} de contenido requerido{contentRequirements.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                  {collaborationType === 'urgent' && (
                    <div className="bg-red-600 text-white px-2 py-1 rounded text-xs inline-block">
                      URGENTE
                    </div>
                  )}
                  {isExclusive && (
                    <div className="bg-yellow-600 text-white px-2 py-1 rounded text-xs inline-block">
                      EXCLUSIVO
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Create Button */}
          <Button 
            onClick={handleCreateCollaboration}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Crear colaboración
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCollaborationPage;