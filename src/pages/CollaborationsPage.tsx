import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Plus, Pause, Play, ChevronDown, ChevronUp } from 'lucide-react';
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
      title: "Colaboración",
      description: "Colaboración exclusiva para influencers de cocina catalana",
      date: "09/01/24",
      location: "Barcelona",
      companions: "2 acompañantes máx.",
      period: "15/01/24 - 15/02/24",
      discount: "50€ Descuento",
      schedule: "viernes, sábado, domingo"
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
                {activeCollaborations.map((collaboration) => (
                  <Card key={collaboration.id} className="border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">{collaboration.title}</h3>
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
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {collaboration.location}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {collaboration.companions}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4M3 7h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                          </svg>
                          {collaboration.period}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a .5.5 0 11-1 0 .5.5 0 011 0z" />
                          </svg>
                          {collaboration.discount}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {collaboration.schedule}
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Ver Detalles
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
                {pausedCollaborations.map((collaboration) => (
                  <Card key={collaboration.id} className="border-gray-200 bg-gray-50">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">{collaboration.title}</h3>
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
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {collaboration.location}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {collaboration.companions}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4M3 7h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                          </svg>
                          {collaboration.period}
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Ver Detalles
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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