
import { ExternalLink, Github, Eye } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Modern e-commerce solution with advanced filtering, payment integration, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      github: '#',
      live: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates and team features.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80',
      tech: ['Vue.js', 'Firebase', 'Tailwind CSS'],
      github: '#',
      live: '#',
      featured: false
    },
    {
      id: 3,
      title: 'AI-Powered Analytics',
      description: 'Business intelligence dashboard with machine learning insights and data visualization.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      tech: ['React', 'Python', 'TensorFlow', 'D3.js'],
      github: '#',
      live: '#',
      featured: true
    },
    {
      id: 4,
      title: 'Social Media App',
      description: 'Mobile-first social platform with real-time chat and content sharing capabilities.',
      image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&w=800&q=80',
      tech: ['React Native', 'GraphQL', 'MongoDB'],
      github: '#',
      live: '#',
      featured: false
    }
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-yellow-400">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A selection of my recent work showcasing different technologies and design approaches.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className={`group relative overflow-hidden rounded-2xl bg-gray-800 hover:bg-gray-700 transition-all duration-300 ${
              project.featured ? 'lg:col-span-2' : ''
            }`}>
              <div className={`${project.featured ? 'md:flex' : ''}`}>
                <div className={`relative overflow-hidden ${project.featured ? 'md:w-1/2' : ''}`}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                </div>
                
                <div className={`p-6 ${project.featured ? 'md:w-1/2 md:flex md:flex-col md:justify-center' : ''}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    {project.featured && (
                      <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="bg-gray-900 text-yellow-400 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a 
                      href={project.github}
                      className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors"
                    >
                      <Github size={20} />
                      <span>Code</span>
                    </a>
                    <a 
                      href={project.live}
                      className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors"
                    >
                      <ExternalLink size={20} />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="#"
            className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-yellow-400 text-yellow-400 rounded-full font-semibold hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300"
          >
            <Eye className="mr-2" size={20} />
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
