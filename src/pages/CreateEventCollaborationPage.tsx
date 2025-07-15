import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ArrowLeft, MapPin, Calendar, Clock, Users, Camera } from 'lucide-react';
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
      selectedDays
    };
    
    console.log('Creating event collaboration:', eventData);
    console.log("Navigating to collaborations...");
    navigate('/collaborations');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/collaborations')} 
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Create Event Invitation</h1>
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
              Create an event invitation to collaborate with food content creators at your establishment.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Basic Event Information */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-orange-500" />
              Event Details
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                <Input
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="Enter event name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <Input
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    placeholder="Enter event location"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {eventTypes.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={type.id}
                        checked={selectedEventTypes.includes(type.id)}
                        onCheckedChange={() => handleEventTypeToggle(type.id)}
                      />
                      <label htmlFor={type.id} className="text-sm text-gray-700">
                        {type.name}
                      </label>
                    </div>
                  ))}
                </div>
                
                {selectedEventTypes.includes('other') && (
                  <div className="mt-3">
                    <Input
                      value={customEventType}
                      onChange={(e) => setCustomEventType(e.target.value)}
                      placeholder="Specify other event type"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Date & Time */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-orange-500" />
              Date & Time
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
                <Input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Creator Arrival Time</label>
                <Input
                  type="time"
                  value={creatorArrivalTime}
                  onChange={(e) => setCreatorArrivalTime(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Guests & RSVP */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-orange-500" />
              Guest Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Guest Cap</label>
                <Input
                  type="number"
                  value={guestCap}
                  onChange={(e) => setGuestCap(e.target.value)}
                  placeholder="Maximum number of guests"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">RSVP Deadline</label>
                <Input
                  type="date"
                  value={rsvpDeadline}
                  onChange={(e) => setRsvpDeadline(e.target.value)}
                />
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="plus-one"
                  checked={canBringPlusOne}
                  onCheckedChange={(checked) => setCanBringPlusOne(checked === true)}
                />
                <label htmlFor="plus-one" className="text-sm text-gray-700">
                  Allow creators to bring a plus one
                </label>
              </div>
            </div>
          </section>

          {/* Event Expectations */}
          <section>
            <h2 className="text-lg font-semibold mb-4">What to Expect</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {expectations.map((expectation) => (
                <div key={expectation.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={expectation.id}
                    checked={selectedExpectations.includes(expectation.id)}
                    onCheckedChange={() => handleExpectationToggle(expectation.id)}
                  />
                  <label htmlFor={expectation.id} className="text-sm text-gray-700">
                    {expectation.name}
                  </label>
                </div>
              ))}
            </div>
          </section>

          {/* Additional Info */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Additional Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dress Code</label>
                <Input
                  value={dressCode}
                  onChange={(e) => setDressCode(e.target.value)}
                  placeholder="Casual, business casual, formal, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Description</label>
                <Textarea
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  placeholder="Describe the event, atmosphere, and what creators can expect"
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </section>

          {/* Content Creation */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Camera className="w-5 h-5 mr-2 text-orange-500" />
              Content Creation
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content Creation Encouraged?</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="content-creation"
                      value="yes"
                      checked={contentCreationEncouraged === 'yes'}
                      onChange={(e) => setContentCreationEncouraged(e.target.value)}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="content-creation"
                      value="no"
                      checked={contentCreationEncouraged === 'no'}
                      onChange={(e) => setContentCreationEncouraged(e.target.value)}
                      className="mr-2"
                    />
                    No
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="content-creation"
                      value="required"
                      checked={contentCreationEncouraged === 'required'}
                      onChange={(e) => setContentCreationEncouraged(e.target.value)}
                      className="mr-2"
                    />
                    Required
                  </label>
                </div>
              </div>
              
              {contentCreationEncouraged !== 'no' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content Types</label>
                    <Input
                      value={contentTypes}
                      onChange={(e) => setContentTypes(e.target.value)}
                      placeholder="Instagram posts, stories, reels, etc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hashtags</label>
                    <Input
                      value={hashtags}
                      onChange={(e) => setHashtags(e.target.value)}
                      placeholder="#yourrestaurant #foodie #event"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Accounts to Tag</label>
                    <Input
                      value={accountsToTag}
                      onChange={(e) => setAccountsToTag(e.target.value)}
                      placeholder="@yourrestaurant @chefname"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Messaging Tone</label>
                    <Input
                      value={messagingTone}
                      onChange={(e) => setMessagingTone(e.target.value)}
                      placeholder="Fun and casual, professional, creative, etc."
                    />
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Compensation */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Compensation</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="paid-collab"
                  checked={isPaidCollab}
                  onCheckedChange={(checked) => setIsPaidCollab(checked === true)}
                />
                <label htmlFor="paid-collab" className="text-sm text-gray-700">
                  This is a paid collaboration
                </label>
              </div>
              
              {isPaidCollab && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Compensation Details</label>
                  <Textarea
                    value={compensation}
                    onChange={(e) => setCompensation(e.target.value)}
                    placeholder="Describe the compensation (monetary amount, products, etc.)"
                    className="min-h-[80px]"
                  />
                </div>
              )}
            </div>
          </section>

          {/* Participation Flow */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Participation Flow</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">How should creators participate?</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="participation-flow"
                      value="invite-only"
                      checked={participationFlow === 'invite-only'}
                      onChange={(e) => setParticipationFlow(e.target.value)}
                      className="mr-2"
                    />
                    Invite only (you'll invite specific creators)
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="participation-flow"
                      value="application"
                      checked={participationFlow === 'application'}
                      onChange={(e) => setParticipationFlow(e.target.value)}
                      className="mr-2"
                    />
                    Open application (creators can apply)
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="participation-flow"
                      value="first-come"
                      checked={participationFlow === 'first-come'}
                      onChange={(e) => setParticipationFlow(e.target.value)}
                      className="mr-2"
                    />
                    First come, first served
                  </label>
                </div>
              </div>
              
              {participationFlow === 'application' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Custom Application Question</label>
                  <Textarea
                    value={customQuestion}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                    placeholder="What would you like to ask creators when they apply?"
                    className="min-h-[80px]"
                  />
                </div>
              )}
            </div>
          </section>

          {/* Available Days */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Available Days</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {days.map((day) => (
                <div key={day.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={day.id}
                    checked={selectedDays.includes(day.id)}
                    onCheckedChange={() => handleDayToggle(day.id)}
                  />
                  <label htmlFor={day.id} className="text-sm text-gray-700">
                    {day.name}
                  </label>
                </div>
              ))}
            </div>
          </section>

          {/* Create Button */}
          <div className="pt-6">
            <Button 
              onClick={handleCreateEvent}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            >
              Create Event Invitation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventCollaborationPage;