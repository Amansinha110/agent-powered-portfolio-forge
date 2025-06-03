
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import AIAssistant from '../components/AIAssistant';
import Navigation from '../components/Navigation';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      
      {/* Hospital Management System Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Latest Project</h2>
          <Card className="mb-8 bg-white text-gray-900">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">Advanced Hospital Management System</CardTitle>
                  <CardDescription className="text-lg mt-2">
                    Comprehensive healthcare management with AI-powered features
                  </CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800">Live Demo</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">1,234</div>
                  <div className="text-sm text-gray-600">Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">45</div>
                  <div className="text-sm text-gray-600">Doctors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">89</div>
                  <div className="text-sm text-gray-600">Appointments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">15</div>
                  <div className="text-sm text-gray-600">AI Insights</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">TypeScript</Badge>
                <Badge variant="outline">AI Integration</Badge>
                <Badge variant="outline">Real-time Analytics</Badge>
                <Badge variant="outline">Patient Management</Badge>
                <Badge variant="outline">Doctor Scheduling</Badge>
              </div>
              <Button 
                size="lg" 
                onClick={() => navigate('/hospital')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                View Hospital Management System
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Contact />
      <AIAssistant />
    </div>
  );
};

export default Index;
