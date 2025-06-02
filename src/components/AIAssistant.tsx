
import { useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your AI assistant. I can help you learn more about this portfolio, the projects, skills, or answer any questions you might have. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "Tell me about the projects",
    "What technologies are used?",
    "How can I contact the owner?",
    "What's the experience level?"
  ];

  const aiResponses = {
    "projects": "This portfolio showcases various projects including an e-commerce platform with React and Node.js, a task management app with Vue.js, an AI-powered analytics dashboard, and a social media app with React Native. Each project demonstrates different technical skills and design approaches.",
    "technologies": "The main technologies featured include React, TypeScript, Node.js, Vue.js, React Native, Python, PostgreSQL, MongoDB, Tailwind CSS, and various modern web development tools. There's also expertise in UI/UX design tools like Figma and Adobe XD.",
    "contact": "You can reach out through the contact form on this page, or via email at hello@portfolio.com. You can also connect on GitHub and LinkedIn through the social links in the hero section.",
    "experience": "With 2+ years of experience, 50+ completed projects, and 30+ happy clients, this portfolio demonstrates a strong foundation in both design and development. The focus is on creating user-centered solutions with modern technologies.",
    "default": "I'd be happy to help you learn more about this portfolio! You can ask me about the projects, technologies used, experience, or how to get in touch. What would you like to know?"
  };

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('project')) return aiResponses.projects;
    if (message.includes('technolog') || message.includes('skill') || message.includes('stack')) return aiResponses.technologies;
    if (message.includes('contact') || message.includes('email') || message.includes('reach')) return aiResponses.contact;
    if (message.includes('experience') || message.includes('background') || message.includes('level')) return aiResponses.experience;
    
    return aiResponses.default;
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(message),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-yellow-400 text-gray-900 p-4 rounded-full shadow-lg hover:bg-yellow-300 transition-all duration-300 hover:scale-110"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 h-96 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gray-800 p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Bot size={18} className="text-gray-900" />
              </div>
              <div>
                <h3 className="font-semibold text-white">AI Assistant</h3>
                <p className="text-xs text-gray-400">Ask me anything about this portfolio</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-yellow-400 text-gray-900' 
                    : 'bg-gray-800 text-white'
                }`}>
                  <div className="flex items-start space-x-2">
                    {message.sender === 'ai' && (
                      <Bot size={16} className="text-yellow-400 mt-1 flex-shrink-0" />
                    )}
                    {message.sender === 'user' && (
                      <User size={16} className="text-gray-700 mt-1 flex-shrink-0" />
                    )}
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-white p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot size={16} className="text-yellow-400" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="p-4 border-t border-gray-700">
              <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 p-2 rounded-lg transition-colors text-left"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-700">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputMessage);
              }}
              className="flex space-x-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-yellow-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="bg-yellow-400 text-gray-900 p-2 rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
