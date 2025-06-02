
import { User, Award, Coffee, Zap } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Award size={24} />, number: '50+', label: 'Projects Completed' },
    { icon: <Coffee size={24} />, number: '2+', label: 'Years Experience' },
    { icon: <User size={24} />, number: '30+', label: 'Happy Clients' },
    { icon: <Zap size={24} />, number: '100%', label: 'Passion' },
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-yellow-400">Me</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Passionate designer and developer with a keen eye for detail and user experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-yellow-400">My Story</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              I'm a creative professional who bridges the gap between design and development. 
              With a background in both UX/UI design and front-end development, I create 
              digital experiences that are not only visually stunning but also highly functional.
            </p>
            <p className="text-gray-300 mb-8 leading-relaxed">
              My approach combines user-centered design principles with cutting-edge technology 
              to deliver solutions that exceed expectations. I believe in the power of clean code, 
              intuitive interfaces, and meaningful interactions.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="text-yellow-400 mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-1 rounded-2xl">
              <div className="bg-gray-800 p-8 rounded-2xl">
                <h4 className="text-xl font-bold mb-4 text-yellow-400">Quick Facts</h4>
                <ul className="space-y-3 text-gray-300">
                  <li>🎨 Specialized in modern UI/UX design</li>
                  <li>⚡ Expert in React, TypeScript, and Tailwind</li>
                  <li>🚀 Performance optimization enthusiast</li>
                  <li>🌟 Always learning new technologies</li>
                  <li>☕ Fueled by coffee and creativity</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
