
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Search, Clock } from "lucide-react";

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes: string;
  duration: number;
}

interface AppointmentSystemProps {
  userRole: 'admin' | 'doctor' | 'nurse';
}

const AppointmentSystem: React.FC<AppointmentSystemProps> = ({ userRole }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isBookingAppointment, setIsBookingAppointment] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, 'id'>>({
    patientId: '',
    patientName: '',
    doctorId: '',
    doctorName: '',
    date: '',
    time: '',
    type: '',
    status: 'scheduled',
    notes: '',
    duration: 30
  });

  useEffect(() => {
    // Load appointments from localStorage
    const savedAppointments = localStorage.getItem('hospital_appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    } else {
      // Initialize with demo data
      const demoAppointments: Appointment[] = [
        {
          id: '1',
          patientId: '1',
          patientName: 'John Doe',
          doctorId: '1',
          doctorName: 'Dr. Sarah Wilson',
          date: new Date().toISOString().split('T')[0],
          time: '10:00',
          type: 'Consultation',
          status: 'scheduled',
          notes: 'Regular checkup for hypertension',
          duration: 30
        },
        {
          id: '2',
          patientId: '2',
          patientName: 'Jane Smith',
          doctorId: '2',
          doctorName: 'Dr. Michael Chen',
          date: new Date().toISOString().split('T')[0],
          time: '14:00',
          type: 'Follow-up',
          status: 'scheduled',
          notes: 'Follow-up for neurological assessment',
          duration: 45
        }
      ];
      setAppointments(demoAppointments);
      localStorage.setItem('hospital_appointments', JSON.stringify(demoAppointments));
    }
  }, []);

  const handleBookAppointment = () => {
    const appointment: Appointment = {
      ...newAppointment,
      id: Date.now().toString()
    };
    
    const updatedAppointments = [...appointments, appointment];
    setAppointments(updatedAppointments);
    localStorage.setItem('hospital_appointments', JSON.stringify(updatedAppointments));
    
    setNewAppointment({
      patientId: '',
      patientName: '',
      doctorId: '',
      doctorName: '',
      date: '',
      time: '',
      type: '',
      status: 'scheduled',
      notes: '',
      duration: 30
    });
    setIsBookingAppointment(false);
  };

  const handleStatusChange = (appointmentId: string, newStatus: Appointment['status']) => {
    const updatedAppointments = appointments.map(apt =>
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    );
    setAppointments(updatedAppointments);
    localStorage.setItem('hospital_appointments', JSON.stringify(updatedAppointments));
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !selectedDate || appointment.date === selectedDate;
    return matchesSearch && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no-show': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Appointment System</CardTitle>
              <CardDescription>Manage patient appointments and schedules</CardDescription>
            </div>
            <Dialog open={isBookingAppointment} onOpenChange={setIsBookingAppointment}>
              <DialogTrigger asChild>
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Book New Appointment</DialogTitle>
                  <DialogDescription>Schedule a new patient appointment</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="appointmentPatient">Patient Name</Label>
                    <Input
                      id="appointmentPatient"
                      value={newAppointment.patientName}
                      onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })}
                      placeholder="Enter patient name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointmentDoctor">Doctor Name</Label>
                    <Input
                      id="appointmentDoctor"
                      value={newAppointment.doctorName}
                      onChange={(e) => setNewAppointment({ ...newAppointment, doctorName: e.target.value })}
                      placeholder="Enter doctor name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointmentDate">Date</Label>
                    <Input
                      id="appointmentDate"
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointmentTime">Time</Label>
                    <Select value={newAppointment.time} onValueChange={(value) => setNewAppointment({ ...newAppointment, time: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {generateTimeSlots().map(time => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointmentType">Appointment Type</Label>
                    <Select value={newAppointment.type} onValueChange={(value) => setNewAppointment({ ...newAppointment, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Consultation">Consultation</SelectItem>
                        <SelectItem value="Follow-up">Follow-up</SelectItem>
                        <SelectItem value="Emergency">Emergency</SelectItem>
                        <SelectItem value="Surgery">Surgery</SelectItem>
                        <SelectItem value="Therapy">Therapy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointmentDuration">Duration (minutes)</Label>
                    <Select value={newAppointment.duration.toString()} onValueChange={(value) => setNewAppointment({ ...newAppointment, duration: parseInt(value) })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="appointmentNotes">Notes</Label>
                    <Textarea
                      id="appointmentNotes"
                      value={newAppointment.notes}
                      onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                      placeholder="Enter appointment notes or special instructions..."
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsBookingAppointment(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleBookAppointment}>
                    Book Appointment
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="dateFilter">Filter by date:</Label>
              <Input
                id="dateFilter"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="border-l-4 border-l-purple-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {appointment.patientName} → {appointment.doctorName}
                        </h3>
                        <p className="text-gray-600">
                          {appointment.date} at {appointment.time} • {appointment.type}
                        </p>
                        <p className="text-gray-500 text-sm">Duration: {appointment.duration} minutes</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                      {(userRole === 'admin' || userRole === 'doctor') && (
                        <Select 
                          value={appointment.status} 
                          onValueChange={(value: Appointment['status']) => handleStatusChange(appointment.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="no-show">No Show</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>
                  
                  {appointment.notes && (
                    <div className="mt-4">
                      <span className="font-medium">Notes:</span>
                      <p className="text-gray-600">{appointment.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentSystem;
