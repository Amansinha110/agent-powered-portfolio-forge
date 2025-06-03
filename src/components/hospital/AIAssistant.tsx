
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Brain, MessageCircle, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";

interface AIInsight {
  id: string;
  type: 'recommendation' | 'alert' | 'prediction' | 'optimization';
  title: string;
  description: string;
  confidence: number;
  timestamp: string;
  priority: 'low' | 'medium' | 'high';
}

interface AIAssistantProps {
  userRole: 'admin' | 'doctor' | 'nurse';
}

const AIAssistant: React.FC<AIAssistantProps> = ({ userRole }) => {
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; message: string; timestamp: string }>>([
    {
      sender: 'ai',
      message: 'Hello! I\'m your AI assistant. I can help you with patient insights, schedule optimization, and medical recommendations. How can I assist you today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [insights, setInsights] = useState<AIInsight[]>([
    {
      id: '1',
      type: 'alert',
      title: 'High Patient Load Detected',
      description: 'Emergency department is experiencing 150% capacity. Consider activating overflow protocols.',
      confidence: 0.92,
      timestamp: new Date().toLocaleString(),
      priority: 'high'
    },
    {
      id: '2',
      type: 'recommendation',
      title: 'Schedule Optimization',
      description: 'Dr. Wilson could accommodate 3 more patients between 2-4 PM based on historical patterns.',
      confidence: 0.87,
      timestamp: new Date().toLocaleString(),
      priority: 'medium'
    },
    {
      id: '3',
      type: 'prediction',
      title: 'Seasonal Flu Outbreak Prediction',
      description: 'Based on regional data, expect 25% increase in respiratory cases over next 2 weeks.',
      confidence: 0.78,
      timestamp: new Date().toLocaleString(),
      priority: 'medium'
    },
    {
      id: '4',
      type: 'optimization',
      title: 'Resource Allocation',
      description: 'Cardiology department shows optimal utilization. Consider reallocating 2 nurses to general ward.',
      confidence: 0.84,
      timestamp: new Date().toLocaleString(),
      priority: 'low'
    }
  ]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      sender: 'user' as const,
      message: newMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Based on the current patient data, I recommend scheduling a follow-up appointment for high-risk patients within 48 hours.",
        "I've analyzed the recent admission patterns. The emergency department typically sees peak loads between 2-6 PM on weekdays.",
        "The patient's symptoms suggest a possible cardiovascular condition. I recommend immediate ECG and blood pressure monitoring.",
        "Based on historical data, this patient has a 15% higher risk of complications. Consider extended monitoring.",
        "I've identified potential drug interactions in the current prescription. Please review the medication list.",
        "The lab results show elevated markers. I suggest consulting with a specialist within 24 hours."
      ];

      const aiMessage = {
        sender: 'ai' as const,
        message: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date().toLocaleTimeString()
      };

      setChatMessages(prev => [...prev, aiMessage]);
    }, 1500);

    setNewMessage('');
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'recommendation': return <Lightbulb className="h-5 w-5 text-yellow-500" />;
      case 'prediction': return <TrendingUp className="h-5 w-5 text-blue-500" />;
      case 'optimization': return <Brain className="h-5 w-5 text-green-500" />;
      default: return <Brain className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Chat Interface */}
        <Card className="h-96">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              AI Medical Assistant
            </CardTitle>
            <CardDescription>Get instant medical insights and recommendations</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ask about patient care, schedules, or medical insights..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights Dashboard */}
        <Card className="h-96">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Insights Dashboard
            </CardTitle>
            <CardDescription>Real-time AI-powered hospital insights</CardDescription>
          </CardHeader>
          <CardContent className="overflow-y-auto">
            <div className="space-y-4">
              {insights.map((insight) => (
                <div
                  key={insight.id}
                  className={`p-4 rounded-lg border-2 ${getPriorityColor(insight.priority)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getInsightIcon(insight.type)}
                      <h4 className="font-semibold">{insight.title}</h4>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(insight.confidence * 100)}% confidence
                    </Badge>
                  </div>
                  <p className="text-sm mt-2">{insight.description}</p>
                  <p className="text-xs opacity-70 mt-2">{insight.timestamp}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Predictive Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Patient Readmission Risk</span>
                <Badge variant="outline">12% avg</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Equipment Failure Prediction</span>
                <Badge variant="outline">2 alerts</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Staff Burnout Index</span>
                <Badge variant="outline">Low risk</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Drug Interaction Monitor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Interactions</span>
                <Badge variant="destructive">3 critical</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Allergic Reactions</span>
                <Badge variant="outline">0 today</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Dosage Alerts</span>
                <Badge className="bg-yellow-100 text-yellow-800">5 warnings</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Efficiency Optimizer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Bed Utilization</span>
                <Badge className="bg-green-100 text-green-800">87% optimal</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Schedule Gaps</span>
                <Badge variant="outline">4 slots</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Wait Time Reduction</span>
                <Badge className="bg-blue-100 text-blue-800">-15 min</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIAssistant;
