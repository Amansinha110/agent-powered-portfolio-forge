
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus, Search, User } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  contact: string;
  email: string;
  schedule: {
    [key: string]: { start: string; end: string; available: boolean };
  };
  status: 'available' | 'busy' | 'off-duty';
  experience: number;
  department: string;
}

interface DoctorManagementProps {
  userRole: 'admin' | 'doctor' | 'nurse';
}

const DoctorManagement: React.FC<DoctorManagementProps> = ({ userRole }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingDoctor, setIsAddingDoctor] = useState(false);
  const [newDoctor, setNewDoctor] = useState<Omit<Doctor, 'id'>>({
    name: '',
    specialization: '',
    contact: '',
    email: '',
    schedule: {},
    status: 'available',
    experience: 0,
    department: ''
  });

  useEffect(() => {
    // Load doctors from localStorage
    const savedDoctors = localStorage.getItem('hospital_doctors');
    if (savedDoctors) {
      setDoctors(JSON.parse(savedDoctors));
    } else {
      // Initialize with demo data
      const demoDoctors: Doctor[] = [
        {
          id: '1',
          name: 'Dr. Sarah Wilson',
          specialization: 'Cardiology',
          contact: '+1-555-0201',
          email: 'sarah.wilson@hospital.com',
          schedule: {
            'Monday': { start: '09:00', end: '17:00', available: true },
            'Tuesday': { start: '09:00', end: '17:00', available: true },
            'Wednesday': { start: '09:00', end: '17:00', available: true },
            'Thursday': { start: '09:00', end: '17:00', available: true },
            'Friday': { start: '09:00', end: '17:00', available: true }
          },
          status: 'available',
          experience: 15,
          department: 'Cardiology'
        },
        {
          id: '2',
          name: 'Dr. Michael Chen',
          specialization: 'Neurology',
          contact: '+1-555-0202',
          email: 'michael.chen@hospital.com',
          schedule: {
            'Monday': { start: '08:00', end: '16:00', available: true },
            'Tuesday': { start: '08:00', end: '16:00', available: true },
            'Wednesday': { start: '08:00', end: '16:00', available: true },
            'Thursday': { start: '08:00', end: '16:00', available: true },
            'Friday': { start: '08:00', end: '16:00', available: true }
          },
          status: 'busy',
          experience: 12,
          department: 'Neurology'
        }
      ];
      setDoctors(demoDoctors);
      localStorage.setItem('hospital_doctors', JSON.stringify(demoDoctors));
    }
  }, []);

  const handleAddDoctor = () => {
    const doctor: Doctor = {
      ...newDoctor,
      id: Date.now().toString()
    };
    
    const updatedDoctors = [...doctors, doctor];
    setDoctors(updatedDoctors);
    localStorage.setItem('hospital_doctors', JSON.stringify(updatedDoctors));
    
    setNewDoctor({
      name: '',
      specialization: '',
      contact: '',
      email: '',
      schedule: {},
      status: 'available',
      experience: 0,
      department: ''
    });
    setIsAddingDoctor(false);
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'off-duty': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Doctor Management</CardTitle>
              <CardDescription>Manage doctor profiles and schedules</CardDescription>
            </div>
            {userRole === 'admin' && (
              <Dialog open={isAddingDoctor} onOpenChange={setIsAddingDoctor}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Doctor
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Doctor</DialogTitle>
                    <DialogDescription>Enter doctor information below</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="doctorName">Full Name</Label>
                      <Input
                        id="doctorName"
                        value={newDoctor.name}
                        onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Input
                        id="specialization"
                        value={newDoctor.specialization}
                        onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={newDoctor.department}
                        onChange={(e) => setNewDoctor({ ...newDoctor, department: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience (years)</Label>
                      <Input
                        id="experience"
                        type="number"
                        value={newDoctor.experience || ''}
                        onChange={(e) => setNewDoctor({ ...newDoctor, experience: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctorContact">Contact Number</Label>
                      <Input
                        id="doctorContact"
                        value={newDoctor.contact}
                        onChange={(e) => setNewDoctor({ ...newDoctor, contact: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctorEmail">Email</Label>
                      <Input
                        id="doctorEmail"
                        type="email"
                        value={newDoctor.email}
                        onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddingDoctor(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddDoctor}>
                      Add Doctor
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search doctors by name, specialization, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="grid gap-4">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{doctor.name}</h3>
                        <p className="text-gray-600">
                          {doctor.specialization} • {doctor.experience} years experience
                        </p>
                        <p className="text-gray-500 text-sm">{doctor.contact} • {doctor.email}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={getStatusColor(doctor.status)}>
                        {doctor.status}
                      </Badge>
                      <Badge variant="outline">{doctor.department}</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Weekly Schedule:</h4>
                    <div className="grid grid-cols-5 gap-2 text-xs">
                      {Object.entries(doctor.schedule).map(([day, schedule]) => (
                        <div key={day} className="p-2 bg-gray-50 rounded">
                          <div className="font-medium">{day.slice(0, 3)}</div>
                          <div className="text-gray-600">
                            {schedule.start} - {schedule.end}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorManagement;
