import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Plus, Pause, Play, ChevronDown, ChevronUp, MapPin, Users, Calendar, Percent, Clock, Package, PartyPopper } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CollaborationTypeSelector } from '@/components/CollaborationTypeSelector';
import { PauseCollaborationDialog } from '@/components/PauseCollaborationDialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const CollaborationsPage = () => {
  const navigate = useNavigate();
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [showPauseDialog, setShowPauseDialog] = useState(false);
  const [collaborationToPause, setCollaborationToPause] = useState<number | null>(null);
  const [pausedCollaborationsOpen, setPausedCollaborationsOpen] = useState(false);
  
  // Mock data for active and paused collaborations
  const [activeCollaborations, setActiveCollaborations] = useState([
    {
      id: 1,
      type: "influencer-visit",
      title: "Colaboración",
      description: "Colaboración para promocionar nuestro nuevo menú mediterráneo",
      date: "31/12/23",
      location: "Valencia, Madrid",
      companions: "3 acompañantes máx.",
      period: "14/01/24 - 14/02/24",
      discount: "20% Descuento",
      schedule: "lunes, martes, miércoles"
    },
    {
      id: 2,
      type: "product-sendout",
      title: "Colaboración",
      description: "Envío de productos gourmet exclusivos para review",
      date: "09/01/24",
      productDetails: "Kit degustación premium",
      estimatedValue: "75€ valor estimado",
      deliveryTime: "3-5 días laborables",
      requirements: "Post en Instagram + Stories"
    },
    {
      id: 3,
      type: "event-invitation",
      title: "Colaboración", 
      description: "Invitación exclusiva al lanzamiento de nuestra nueva carta",
      date: "15/01/24",
      eventLocation: "Barcelona, Eixample",
      eventDate: "20/02/24 - 19:30h",
      attendees: "50 invitados máx.",
      dresscode: "Smart casual",
      includes: "Cena + bebidas + networking"
    }
  ]);
  
  const [pausedCollaborations, setPausedCollaborations] = useState<typeof activeCollaborations>([]);

  const handleCreateCollaboration = () => {
    setShowTypeSelector(true);
  };

  const handlePauseClick = (collaborationId: number) => {
    setCollaborationToPause(collaborationId);
    setShowPauseDialog(true);
  };

  const handlePauseConfirm = () => {
    if (collaborationToPause !== null) {
      const collaboration = activeCollaborations.find(c => c.id === collaborationToPause);
      if (collaboration) {
        // Move from active to paused
        setActiveCollaborations(prev => prev.filter(c => c.id !== collaborationToPause));
        setPausedCollaborations(prev => [...prev, collaboration]);
      }
    }
    setShowPauseDialog(false);
    setCollaborationToPause(null);
  };

  const handleResumeCollaboration = (collaborationId: number) => {
    const collaboration = pausedCollaborations.find(c => c.id === collaborationId);
    if (collaboration) {
      // Move from paused to active
      setPausedCollaborations(prev => prev.filter(c => c.id !== collaborationId));
      setActiveCollaborations(prev => [...prev, collaboration]);
    }
  };

  const getCollaborationTypeInfo = (type: string) => {
    switch (type) {
      case 'influencer-visit':
        return { label: 'Visita Influencer', color: 'bg-blue-100 text-blue-800' };
      case 'product-sendout':
        return { label: 'Delivery', color: 'bg-orange-100 text-orange-800' };
      case 'event-invitation':
        return { label: 'Evento', color: 'bg-green-100 text-green-800' };
      default:
        return { label: 'Colaboración', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const renderCollaborationDetails = (collaboration: any) => {
    if (collaboration.type === 'product-sendout') {
      return (
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Package className="w-4 h-4 mr-2" />
            {collaboration.productDetails}
          </div>
          <div className="flex items-center">
            <Percent className="w-4 h-4 mr-2" />
            {collaboration.estimatedValue}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {collaboration.deliveryTime}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            {collaboration.requirements}
          </div>
        </div>
      );
    }

    if (collaboration.type === 'event-invitation') {
      return (
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            {collaboration.eventLocation}
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {collaboration.eventDate}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            {collaboration.attendees}
          </div>
          <div className="flex items-center">
            <PartyPopper className="w-4 h-4 mr-2" />
            {collaboration.includes}
          </div>
        </div>
      );
    }

    // Default: influencer-visit
    return (
      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          {collaboration.location}
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-2" />
          Foodie+ {collaboration.companions}
        </div>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          {collaboration.period}
        </div>
        <div className="flex items-center">
          <Percent className="w-4 h-4 mr-2" />
          {collaboration.discount}
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          {collaboration.schedule}
        </div>
      </div>
    );
  };

  const handleTypeSelected = (type: string) => {
    console.log('Selected collaboration type:', type);
    
    // Route to appropriate flow based on type
    switch (type) {
      case 'influencer-visit':
        navigate('/collaborations/create');
        break;
      case 'product-sendout':
        navigate('/collaborations/create-postal');
        break;
      case 'event-invitation':
        navigate('/collaborations/create-event');
        break;
      default:
        navigate('/collaborations/create');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 pb-4 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900 uppercase tracking-wide">COLABORACIONES</h1>
            <Search className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Active Collaborations Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Colaboraciones Activas ({activeCollaborations.length})</h2>
            
            {activeCollaborations.length === 0 ? (
              <Card className="border-gray-200">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500 mb-4">
                    No tienes colaboraciones activas
                  </p>
                  <button 
                    onClick={handleCreateCollaboration}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Crear colaboración
                  </button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {activeCollaborations.map((collaboration) => {
                  const typeInfo = getCollaborationTypeInfo(collaboration.type);
                  return (
                    <Card key={collaboration.id} className="border-gray-200">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-medium text-gray-900">{collaboration.title}</h3>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                                {typeInfo.label}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{collaboration.description}</p>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-400">
                            <span className="text-xs">{collaboration.date}</span>
                            <button className="hover:text-gray-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button 
                              className="hover:text-yellow-600"
                              onClick={() => handlePauseClick(collaboration.id)}
                            >
                              <Pause className="w-4 h-4 text-yellow-500" />
                            </button>
                            <button className="hover:text-gray-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        {renderCollaborationDetails(collaboration)}
                        
                        <div className="flex justify-end">
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 616 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Ver Detalles
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Paused Collaborations Section */}
          {pausedCollaborations.length > 0 && (
            <Collapsible open={pausedCollaborationsOpen} onOpenChange={setPausedCollaborationsOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-0 hover:no-underline">
                <h2 className="text-lg font-semibold text-gray-900">
                  Colaboraciones Pausadas ({pausedCollaborations.length})
                </h2>
                {pausedCollaborationsOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </CollapsibleTrigger>
              
              <CollapsibleContent className="space-y-4 mt-4">
                {pausedCollaborations.map((collaboration) => {
                  const typeInfo = getCollaborationTypeInfo(collaboration.type);
                  return (
                    <Card key={collaboration.id} className="border-gray-200 bg-gray-50">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-medium text-gray-900">{collaboration.title}</h3>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                                {typeInfo.label}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{collaboration.description}</p>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Pausada
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-400">
                            <span className="text-xs">{collaboration.date}</span>
                            <button className="hover:text-gray-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button 
                              className="hover:text-green-600"
                              onClick={() => handleResumeCollaboration(collaboration.id)}
                            >
                              <Play className="w-4 h-4 text-green-500" />
                            </button>
                            <button className="hover:text-gray-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        {renderCollaborationDetails(collaboration)}
                        
                        <div className="flex justify-end">
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 616 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Ver Detalles
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Bottom Create Button */}
          <div className="fixed bottom-6 left-6 right-6 max-w-4xl mx-auto">
            <Button 
              onClick={handleCreateCollaboration}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Crear colaboración
            </Button>
          </div>
        </div>
      </div>

      {/* Collaboration Type Selector Modal */}
      <CollaborationTypeSelector
        open={showTypeSelector}
        onOpenChange={setShowTypeSelector}
        onTypeSelected={handleTypeSelected}
      />
      
      {/* Pause Collaboration Dialog */}
      <PauseCollaborationDialog
        open={showPauseDialog}
        onOpenChange={setShowPauseDialog}
        onConfirm={handlePauseConfirm}
        collaborationTitle={
          collaborationToPause 
            ? activeCollaborations.find(c => c.id === collaborationToPause)?.title 
            : undefined
        }
      />
    </div>
  );
};

export default CollaborationsPage;