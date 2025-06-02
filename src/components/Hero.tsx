
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          <span className="text-white">CREATIVE</span>
          <br />
          <span className="text-yellow-400">PORTFOLIO</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in animation-delay-200">
          UX/UI DESIGNER & DEVELOPER
        </p>
        
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto animate-fade-in animation-delay-400">
          Crafting digital experiences that blend creativity with functionality. 
          Specializing in modern web development and user-centered design.
        </p>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-12 animate-fade-in animation-delay-600">
          <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 hover:scale-110">
            <Github size={20} />
          </a>
          <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 hover:scale-110">
            <Linkedin size={20} />
          </a>
          <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 hover:scale-110">
            <Mail size={20} />
          </a>
        </div>

        {/* CTA Button */}
        <a 
          href="#projects"
          className="inline-flex items-center px-8 py-4 bg-yellow-400 text-gray-900 rounded-full font-semibold hover:bg-yellow-300 transition-all duration-300 hover:scale-105 animate-fade-in animation-delay-800"
        >
          View My Work
          <ArrowDown className="ml-2" size={20} />
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
