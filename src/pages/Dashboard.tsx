
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Users, MessageSquare, TrendingUp, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Active Collaborations',
      value: '12',
      change: '+2 this week',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      title: 'Total Reach',
      value: '2.4M',
      change: '+12% this month',
      icon: TrendingUp,
      color: 'text-green-500'
    },
    {
      title: 'Messages',
      value: '48',
      change: '8 unread',
      icon: MessageSquare,
      color: 'text-purple-500'
    },
    {
      title: 'Performance',
      value: '94%',
      change: 'Engagement rate',
      icon: BarChart3,
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your restaurant.</p>
            </div>
            <Button 
              onClick={() => navigate('/collaborations')}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              View Collaborations
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Collaborations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">@foodie_madrid</p>
                  <p className="text-sm text-gray-500">Weekend Brunch Experience</p>
                </div>
                <Badge>Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">@taste_explorer</p>
                  <p className="text-sm text-gray-500">Dinner for Two</p>
                </div>
                <Badge variant="outline">Pending</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => navigate('/collaborations/create')}
              >
                Create New Collaboration
              </Button>
              <Button className="w-full justify-start" variant="outline">
                Browse Influencers
              </Button>
              <Button className="w-full justify-start" variant="outline">
                View Messages
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
