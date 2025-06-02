
import { Code, Palette, Smartphone, Database, Globe, Zap } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      icon: <Code size={32} />,
      title: 'Frontend Development',
      skills: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'HTML5/CSS3'],
      level: 95
    },
    {
      icon: <Palette size={32} />,
      title: 'UI/UX Design',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
      level: 90
    },
    {
      icon: <Smartphone size={32} />,
      title: 'Mobile Development',
      skills: ['React Native', 'Flutter', 'iOS', 'Android', 'PWA'],
      level: 85
    },
    {
      icon: <Database size={32} />,
      title: 'Backend & Database',
      skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Firebase'],
      level: 80
    },
    {
      icon: <Globe size={32} />,
      title: 'Web Technologies',
      skills: ['Tailwind CSS', 'SASS', 'GraphQL', 'REST APIs', 'Webpack'],
      level: 92
    },
    {
      icon: <Zap size={32} />,
      title: 'Tools & Others',
      skills: ['Git', 'Docker', 'AWS', 'Testing', 'CI/CD'],
      level: 88
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-gray-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-yellow-400">Skills</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit for creating exceptional digital experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105">
              <div className="text-yellow-400 mb-4">{category.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-white">{category.title}</h3>
              
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">Proficiency</span>
                  <span className="text-sm text-yellow-400">{category.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${category.level}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="inline-block bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
