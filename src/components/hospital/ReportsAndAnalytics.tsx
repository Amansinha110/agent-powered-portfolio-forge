
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, TrendingUp, Users, Calendar } from "lucide-react";

interface ReportsAndAnalyticsProps {
  userRole: 'admin' | 'doctor' | 'nurse';
}

const ReportsAndAnalytics: React.FC<ReportsAndAnalyticsProps> = ({ userRole }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedReport, setSelectedReport] = useState('overview');

  const reportData = {
    overview: {
      totalPatients: 1234,
      newPatients: 156,
      appointments: 342,
      revenue: 125000,
      occupancyRate: 87,
      avgWaitTime: 23
    },
    departments: [
      { name: 'Emergency', patients: 245, utilization: 95 },
      { name: 'Cardiology', patients: 123, utilization: 78 },
      { name: 'Neurology', patients: 89, utilization: 82 },
      { name: 'Pediatrics', patients: 167, utilization: 71 },
      { name: 'Orthopedics', patients: 134, utilization: 85 }
    ],
    doctors: [
      { name: 'Dr. Sarah Wilson', appointments: 45, rating: 4.8 },
      { name: 'Dr. Michael Chen', appointments: 38, rating: 4.7 },
      { name: 'Dr. Emily Rodriguez', appointments: 42, rating: 4.9 },
      { name: 'Dr. James Thompson', appointments: 35, rating: 4.6 }
    ]
  };

  const generateReport = () => {
    // Simulate report generation
    console.log(`Generating ${selectedReport} report for ${selectedPeriod}`);
    alert(`${selectedReport.charAt(0).toUpperCase() + selectedReport.slice(1)} report for the last ${selectedPeriod} has been generated and will be downloaded shortly.`);
  };

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Reports & Analytics
          </CardTitle>
          <CardDescription>Generate comprehensive hospital reports and view analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <label htmlFor="period">Time Period:</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="reportType">Report Type:</label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">Overview</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="patient">Patient Analytics</SelectItem>
                  <SelectItem value="staff">Staff Performance</SelectItem>
                  <SelectItem value="department">Department Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={generateReport}>
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold">{reportData.overview.totalPatients.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Patients</p>
                <p className="text-2xl font-bold">{reportData.overview.newPatients}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Appointments</p>
                <p className="text-2xl font-bold">{reportData.overview.appointments}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold">${reportData.overview.revenue.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Occupancy Rate</p>
                <p className="text-2xl font-bold">{reportData.overview.occupancyRate}%</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Optimal</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Wait Time</p>
                <p className="text-2xl font-bold">{reportData.overview.avgWaitTime}m</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
          <CardDescription>Utilization and patient load by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportData.departments.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold">{dept.name}</h3>
                  <p className="text-gray-600">{dept.patients} patients this {selectedPeriod}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${dept.utilization}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{dept.utilization}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Doctor Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Doctor Performance</CardTitle>
          <CardDescription>Appointment load and patient ratings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportData.doctors.map((doctor, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{doctor.name}</h3>
                    <p className="text-gray-600">{doctor.appointments} appointments</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">⭐ {doctor.rating}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Patient Flow Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Patient flow chart visualization would go here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Revenue chart visualization would go here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsAndAnalytics;
