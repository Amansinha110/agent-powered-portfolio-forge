
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus, Search, User } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  address: string;
  medicalHistory: string;
  bloodType: string;
  emergencyContact: string;
  registrationDate: string;
  status: 'active' | 'discharged' | 'critical';
}

interface PatientManagementProps {
  userRole: 'admin' | 'doctor' | 'nurse';
}

const PatientManagement: React.FC<PatientManagementProps> = ({ userRole }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [newPatient, setNewPatient] = useState<Omit<Patient, 'id' | 'registrationDate'>>({
    name: '',
    age: 0,
    gender: '',
    contact: '',
    address: '',
    medicalHistory: '',
    bloodType: '',
    emergencyContact: '',
    status: 'active'
  });

  useEffect(() => {
    // Load patients from localStorage
    const savedPatients = localStorage.getItem('hospital_patients');
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients));
    } else {
      // Initialize with demo data
      const demoPatients: Patient[] = [
        {
          id: '1',
          name: 'John Doe',
          age: 35,
          gender: 'Male',
          contact: '+1-555-0123',
          address: '123 Main St, City',
          medicalHistory: 'Hypertension, Diabetes',
          bloodType: 'O+',
          emergencyContact: '+1-555-0124',
          registrationDate: new Date().toISOString(),
          status: 'active'
        },
        {
          id: '2',
          name: 'Jane Smith',
          age: 28,
          gender: 'Female',
          contact: '+1-555-0125',
          address: '456 Oak Ave, City',
          medicalHistory: 'Allergies to penicillin',
          bloodType: 'A+',
          emergencyContact: '+1-555-0126',
          registrationDate: new Date().toISOString(),
          status: 'active'
        }
      ];
      setPatients(demoPatients);
      localStorage.setItem('hospital_patients', JSON.stringify(demoPatients));
    }
  }, []);

  const handleAddPatient = () => {
    const patient: Patient = {
      ...newPatient,
      id: Date.now().toString(),
      registrationDate: new Date().toISOString()
    };
    
    const updatedPatients = [...patients, patient];
    setPatients(updatedPatients);
    localStorage.setItem('hospital_patients', JSON.stringify(updatedPatients));
    
    setNewPatient({
      name: '',
      age: 0,
      gender: '',
      contact: '',
      address: '',
      medicalHistory: '',
      bloodType: '',
      emergencyContact: '',
      status: 'active'
    });
    setIsAddingPatient(false);
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.contact.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'discharged': return 'bg-blue-100 text-blue-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Patient Management</CardTitle>
              <CardDescription>Manage patient records and information</CardDescription>
            </div>
            {(userRole === 'admin' || userRole === 'nurse') && (
              <Dialog open={isAddingPatient} onOpenChange={setIsAddingPatient}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Patient
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Patient</DialogTitle>
                    <DialogDescription>Enter patient information below</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={newPatient.name}
                        onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={newPatient.age || ''}
                        onChange={(e) => setNewPatient({ ...newPatient, age: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={newPatient.gender} onValueChange={(value) => setNewPatient({ ...newPatient, gender: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Select value={newPatient.bloodType} onValueChange={(value) => setNewPatient({ ...newPatient, bloodType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact Number</Label>
                      <Input
                        id="contact"
                        value={newPatient.contact}
                        onChange={(e) => setNewPatient({ ...newPatient, contact: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Emergency Contact</Label>
                      <Input
                        id="emergencyContact"
                        value={newPatient.emergencyContact}
                        onChange={(e) => setNewPatient({ ...newPatient, emergencyContact: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={newPatient.address}
                        onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="medicalHistory">Medical History</Label>
                      <Textarea
                        id="medicalHistory"
                        value={newPatient.medicalHistory}
                        onChange={(e) => setNewPatient({ ...newPatient, medicalHistory: e.target.value })}
                        placeholder="Enter medical history, allergies, previous conditions..."
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddingPatient(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddPatient}>
                      Add Patient
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
              placeholder="Search patients by name or contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="grid gap-4">
            {filteredPatients.map((patient) => (
              <Card key={patient.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{patient.name}</h3>
                        <p className="text-gray-600">
                          {patient.age} years old • {patient.gender} • {patient.bloodType}
                        </p>
                        <p className="text-gray-500 text-sm">{patient.contact}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(patient.status)}>
                      {patient.status}
                    </Badge>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Address:</span>
                      <p className="text-gray-600">{patient.address}</p>
                    </div>
                    <div>
                      <span className="font-medium">Emergency Contact:</span>
                      <p className="text-gray-600">{patient.emergencyContact}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium">Medical History:</span>
                      <p className="text-gray-600">{patient.medicalHistory || 'No significant medical history'}</p>
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

export default PatientManagement;
