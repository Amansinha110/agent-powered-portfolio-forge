
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, UserPlus, Activity, Brain, FileText } from "lucide-react";
import PatientManagement from '../components/hospital/PatientManagement';
import DoctorManagement from '../components/hospital/DoctorManagement';
import AppointmentSystem from '../components/hospital/AppointmentSystem';
import AIAssistant from '../components/hospital/AIAssistant';
import ReportsAndAnalytics from '../components/hospital/ReportsAndAnalytics';
import AuthenticationForm from '../components/hospital/AuthenticationForm';

const HospitalDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'doctor' | 'nurse'>('admin');

  if (!isAuthenticated) {
    return <AuthenticationForm onLogin={setIsAuthenticated} onRoleChange={setUserRole} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Hospital Management System
            </h1>
            <p className="text-gray-600">Advanced healthcare management with AI assistance</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="px-4 py-2">
              Role: {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </Badge>
            <Button 
              variant="outline" 
              onClick={() => setIsAuthenticated(false)}
            >
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-blue-100">+20.1% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Doctors</CardTitle>
              <UserPlus className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-green-100">+2 new this week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-orange-100">12 pending confirmations</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Insights</CardTitle>
              <Brain className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-purple-100">New recommendations</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="patients">
            <PatientManagement userRole={userRole} />
          </TabsContent>

          <TabsContent value="doctors">
            <DoctorManagement userRole={userRole} />
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentSystem userRole={userRole} />
          </TabsContent>

          <TabsContent value="ai-assistant">
            <AIAssistant userRole={userRole} />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsAndAnalytics userRole={userRole} />
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Hospital Analytics</CardTitle>
                <CardDescription>Comprehensive analytics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Patient Flow Analytics</h3>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Patient flow chart visualization</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Department Performance</h3>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Department metrics visualization</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HospitalDashboard;
