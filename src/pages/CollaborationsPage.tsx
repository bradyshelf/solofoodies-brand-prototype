
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, MapPin, Users, DollarSign } from 'lucide-react';

interface Collaboration {
  id: string;
  title: string;
  restaurant: string;
  location: string;
  partySize: number;
  value: string;
  status: 'active' | 'pending' | 'completed';
  type: 'public' | 'private';
}

const CollaborationsPage = () => {
  const [collaborations] = useState<Collaboration[]>([
    {
      id: '1',
      title: 'Weekend Brunch Experience',
      restaurant: 'Pollos Hermanos',
      location: 'Madrid, Spain',
      partySize: 2,
      value: '€80',
      status: 'active',
      type: 'public'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Collaborations</h1>
            <p className="text-gray-600">Manage your influencer partnerships</p>
          </div>
          <Button className="bg-red-500 hover:bg-red-600">
            <Plus className="w-4 h-4 mr-2" />
            New Collaboration
          </Button>
        </div>

        <div className="grid gap-6">
          {collaborations.map((collab) => (
            <Card key={collab.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{collab.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {collab.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {collab.partySize} people
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {collab.value}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant={collab.type === 'public' ? 'default' : 'secondary'}>
                      {collab.type}
                    </Badge>
                    <Badge variant={collab.status === 'active' ? 'default' : 'outline'}>
                      {collab.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Restaurant: {collab.restaurant}</p>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollaborationsPage;
