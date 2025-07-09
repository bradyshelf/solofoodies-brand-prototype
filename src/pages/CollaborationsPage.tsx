
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, Users, DollarSign, Calendar, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CollaborationsPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: '',
    minFollowers: '',
    maxFollowers: '',
    participants: '',
    credit: '',
    availableDays: [] as string[],
    description: ''
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleDayToggle = (day: string) => {
    setFormData(prev => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter(d => d !== day)
        : [...prev.availableDays, day]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create Collaboration</h1>
            <p className="text-gray-600">Set up your new influencer partnership</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <MapPin className="w-5 h-5 mr-2 text-red-500" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="location">Restaurant Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter your restaurant address"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Followers Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Users className="w-5 h-5 mr-2 text-red-500" />
                Followers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minFollowers">Minimum Followers</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, minFollowers: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select minimum" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1000">1K+</SelectItem>
                      <SelectItem value="5000">5K+</SelectItem>
                      <SelectItem value="10000">10K+</SelectItem>
                      <SelectItem value="50000">50K+</SelectItem>
                      <SelectItem value="100000">100K+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="maxFollowers">Maximum Followers</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, maxFollowers: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select maximum" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10000">10K</SelectItem>
                      <SelectItem value="50000">50K</SelectItem>
                      <SelectItem value="100000">100K</SelectItem>
                      <SelectItem value="500000">500K</SelectItem>
                      <SelectItem value="unlimited">No limit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Participants Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Users className="w-5 h-5 mr-2 text-red-500" />
                Participants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="participants">Number of People</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, participants: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of participants" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 person</SelectItem>
                    <SelectItem value="2">2 people</SelectItem>
                    <SelectItem value="3">3 people</SelectItem>
                    <SelectItem value="4">4 people</SelectItem>
                    <SelectItem value="5">5+ people</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Credit Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <DollarSign className="w-5 h-5 mr-2 text-red-500" />
                Credit / Discount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="credit">Offer Value</Label>
                <Input
                  id="credit"
                  placeholder="e.g., €50 credit, 50% discount, Free meal"
                  value={formData.credit}
                  onChange={(e) => setFormData(prev => ({ ...prev, credit: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Available Days Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Calendar className="w-5 h-5 mr-2 text-red-500" />
                Available Days
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {days.map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox
                      id={day}
                      checked={formData.availableDays.includes(day)}
                      onCheckedChange={() => handleDayToggle(day)}
                    />
                    <Label htmlFor={day} className="text-sm font-medium">
                      {day}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Description Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="description">Collaboration Details</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you're looking for, any special requirements, content expectations, etc."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Create Collaboration
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollaborationsPage;
