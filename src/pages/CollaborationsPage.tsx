
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CollaborationsPage = () => {
  const navigate = useNavigate();

  const handleCreateCollaboration = () => {
    navigate('/collaborations/create');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900 uppercase tracking-wide">COLABORACIONES</h1>
          <Search className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* My Collaborations Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Mis Colaboraciones (0)</h2>
          
          {/* Empty State Card */}
          <Card className="border-gray-200">
            <CardContent className="p-8 text-center">
              <p className="text-gray-500 mb-4">
                No has creado ninguna<br />
                colaboración todavía
              </p>
              <button 
                onClick={handleCreateCollaboration}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                + Crear colaboración
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Create Button */}
        <div className="fixed bottom-6 left-4 right-4">
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
  );
};

export default CollaborationsPage;
