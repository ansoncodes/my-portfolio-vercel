import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Terminal, ChevronDown, ChevronUp } from 'lucide-react';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const TerminalWindow = ({ title, children, className = "" }) => (
    <div className={`w-full ${className}`}>
      <div className="bg-zinc-900 rounded-t-lg border border-zinc-800 px-4 py-3 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 text-center text-sm text-zinc-500 font-mono">
          {title}
        </div>
      </div>
      <div className="bg-black/90 backdrop-blur-sm border-x border-b border-zinc-800 rounded-b-lg p-6 font-mono">
        {children}
      </div>
    </div>
  );

  const projects = [
    {
      name: 'MovieMate',
      desc: 'Full-stack application to track movies and TV shows with watch status, ratings, reviews, and season-wise episode progress. Integrated Google Gemini API for AI-based review summaries.',
      tech: ['Django REST Framework', 'React.js', 'SQLite', 'Gemini API'],
      github: 'https://github.com/ansoncodes/moviemate',
      live: 'https://moviemate-front.vercel.app/dashboard'
    },
    {
      name: 'Cartzy',
      desc: 'Multi-vendor e-commerce platform with 35+ APIs. Built Seller dashboard, Admin product management, and real-time order tracking using WebSockets. Integrated Google OAuth2 and Razorpay payment gateway.',
      tech: ['Django', 'Django Templates', 'WebSockets', 'Google OAuth2', 'Razorpay'],
      github: 'https://github.com/smec-community-dev/cartzy-abhiram-anson/tree/dev'
    },
    {
      name: 'AI Image Caption Generator',
      desc: 'Multimodal AI pipeline using pre-trained ViT-GPT2 for image captioning and Glow-TTS for text-to-speech conversion. Performed image preprocessing and model inference using PyTorch.',
      tech: ['PyTorch', 'ViT-GPT2', 'Glow-TTS'],
      github: 'https://github.com/ansoncodes/AI-Image-Caption-Generator-Using-ViT-GPT2-and-TTS'
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/70 rounded-full blur-3xl animate-float-orb-1"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/70 rounded-full blur-3xl animate-float-orb-2"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/60 rounded-full blur-3xl animate-float-orb-3"></div>
        
        <div 
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.8) 0%, rgba(16, 185, 129, 0.2) 70%, transparent 100%)',
            animation: 'float-orb-1 15s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.8) 0%, rgba(6, 182, 212, 0.2) 70%, transparent 100%)',
            animation: 'float-orb-2 18s ease-in-out infinite 2s'
          }}
        />
        
        {Array.from({ length: 40 }).map((_, i) => {
          const x = (i * 31) % 100;
          const y = (i * 47) % 100;
          const size = 1 + (i % 5);
          const delay = i % 3 === 0 ? 'animation-delay-2000' : i % 3 === 1 ? 'animation-delay-4000' : 'animation-delay-6000';
          const particleType = i % 3;
          const bgColor = particleType === 0 ? 'bg-emerald-400/60' : 
                         particleType === 1 ? 'bg-cyan-400/60' : 'bg-purple-400/60';
          
          return (
            <div
              key={i}
              className={`absolute rounded-full ${bgColor} shadow-lg animate-float-particle ${delay}`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
              }}
            />
          );
        })}
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.15)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]"></div>
        
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: `${mousePosition.x - 192}px`,
            top: `${mousePosition.y - 192}px`,
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)',
            boxShadow: '0 0 120px 60px rgba(16, 185, 129, 0.2)'
          }}
        />
        
        <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />
      </div>

      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300">
        <div className="bg-black/80 backdrop-blur-md border border-zinc-800 rounded-full px-6 py-3 flex gap-6 text-sm font-mono">
          <a href="#home" className="text-zinc-400 hover:text-emerald-400 transition">home</a>
          <a href="#about" className="text-zinc-400 hover:text-emerald-400 transition">about</a>
          <a href="#skills" className="text-zinc-400 hover:text-emerald-400 transition">skills</a>
          <a href="#projects" className="text-zinc-400 hover:text-emerald-400 transition">projects</a>
          <a href="#experience" className="text-zinc-400 hover:text-emerald-400 transition">experience</a>
          <a href="#contact" className="text-zinc-400 hover:text-emerald-400 transition">contact</a>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center px-4 py-20 relative z-10">
        <div className="max-w-4xl w-full space-y-8">
          <TerminalWindow title="anson@portfolio: ~">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-emerald-400">
                <Terminal size={20} />
                <span>$ whoami</span>
              </div>
              <div className="space-y-3 pl-6">
                <h1 className="text-4xl md:text-6xl font-bold text-white">M A Anson</h1>
                <p className="text-xl md:text-2xl text-cyan-400">Full-Stack Developer</p>
                <p className="text-zinc-400 flex items-center gap-2">
                  <MapPin size={16} className="text-emerald-400" />
                  Kochi, Kerala
                </p>
              </div>
              <div className="pl-6 pt-4 border-t border-zinc-800">
                <p className="text-zinc-300 mb-4">$ echo $EXPERTISE</p>
                <p className="text-zinc-400 pl-4">Django • React • REST APIs • WebSockets • JWT Auth</p>
              </div>
              <div className="flex gap-4 pl-6">
                <a href="https://github.com/ansoncodes" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-zinc-800/50 hover:bg-emerald-500/20 border border-zinc-700 hover:border-emerald-500/50 rounded transition flex items-center gap-2">
                  <Github size={16} />
                  <span className="text-sm">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/anson-codes/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-zinc-800/50 hover:bg-cyan-500/20 border border-zinc-700 hover:border-cyan-500/50 rounded transition flex items-center gap-2">
                  <Linkedin size={16} />
                  <span className="text-sm">LinkedIn</span>
                </a>
                <a href="mailto:ansonantony783@gmail.com" className="px-4 py-2 bg-zinc-800/50 hover:bg-purple-500/20 border border-zinc-700 hover:border-purple-500/50 rounded transition flex items-center gap-2">
                  <Mail size={16} />
                  <span className="text-sm">Email</span>
                </a>
              </div>
            </div>
          </TerminalWindow>
          
          <div className="flex justify-center animate-bounce">
            <a href="#about" className="text-zinc-600 hover:text-emerald-400 transition">
              <ChevronDown size={32} />
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="min-h-screen flex items-center justify-center px-4 py-20 relative z-10">
        <div className="max-w-4xl w-full space-y-8">
          <div className="flex justify-center animate-bounce">
            <a href="#home" className="text-zinc-600 hover:text-emerald-400 transition">
              <ChevronUp size={32} />
            </a>
          </div>
          
          <TerminalWindow title="anson@portfolio: ~/about">
            <div className="space-y-6">
              <div className="text-emerald-400">$ cat about.txt</div>
              <div className="space-y-4 pl-6 text-zinc-300">
                <p>Full-stack developer specializing in Django REST Framework and React.js</p>
                <p>Building scalable web applications with clean, modular code</p>
                <p>Passionate about REST APIs, authentication systems, and seamless UX</p>
              </div>
              
              <div className="pt-6 border-t border-zinc-800">
                <div className="text-cyan-400 mb-4">$ cat education.json</div>
                <div className="pl-6 space-y-2">
                  <p className="text-white">BTech in Computer Science and Engineering (AI & ML)</p>
                  <p className="text-zinc-400">Karunya Institute of Technology and Sciences</p>
                  <p className="text-zinc-500 text-sm">2021 - 2025</p>
                </div>
              </div>
            </div>
          </TerminalWindow>
          
          <div className="flex justify-center animate-bounce">
            <a href="#skills" className="text-zinc-600 hover:text-emerald-400 transition">
              <ChevronDown size={32} />
            </a>
          </div>
        </div>
      </section>

      <section id="skills" className="min-h-screen flex items-center justify-center px-4 py-20 relative z-10">
        <div className="max-w-4xl w-full space-y-8">
          <div className="flex justify-center animate-bounce">
            <a href="#about" className="text-zinc-600 hover:text-emerald-400 transition">
              <ChevronUp size={32} />
            </a>
          </div>
          
          <TerminalWindow title="anson@portfolio: ~/skills">
            <div className="space-y-6">
              <div className="text-emerald-400">$ ls -la skills/</div>
              
              <div className="space-y-4 pl-6">
                <div className="space-y-2">
                  <div className="text-cyan-400">→ Backend/</div>
                  <div className="pl-6 flex flex-wrap gap-2">
                    {['Django', 'DRF', 'REST APIs', 'JWT', 'WebSockets'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-zinc-800/50 border border-zinc-700 rounded text-sm text-zinc-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-cyan-400">→ Frontend/</div>
                  <div className="pl-6 flex flex-wrap gap-2">
                    {['React.js', 'HTML', 'CSS', 'Tailwind', 'JavaScript'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-zinc-800/50 border border-zinc-700 rounded text-sm text-zinc-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-cyan-400">→ Languages/</div>
                  <div className="pl-6 flex flex-wrap gap-2">
                    {['Python', 'JavaScript', 'SQL'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-zinc-800/50 border border-zinc-700 rounded text-sm text-zinc-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-cyan-400">→ Databases/</div>
                  <div className="pl-6 flex flex-wrap gap-2">
                    {['MySQL', 'PostgreSQL'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-zinc-800/50 border border-zinc-700 rounded text-sm text-zinc-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-cyan-400">→ DevTools/</div>
                  <div className="pl-6 flex flex-wrap gap-2">
                    {['Git', 'GitHub', 'Docker', 'AWS', 'Postman', 'Figma'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-zinc-800/50 border border-zinc-700 rounded text-sm text-zinc-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TerminalWindow>
          
          <div className="flex justify-center animate-bounce">
            <a href="#projects" className="text-zinc-600 hover:text-emerald-400 transition">
              <ChevronDown size={32} />
            </a>
          </div>
        </div>
      </section>

      <section id="projects" className="min-h-screen flex items-center justify-center px-4 py-20 relative z-10">
        <div className="max-w-4xl w-full space-y-8">
          <div className="flex justify-center animate-bounce">
            <a href="#skills" className="text-zinc-600 hover:text-emerald-400 transition">
              <ChevronUp size={32} />
            </a>
          </div>
          
          <TerminalWindow title="anson@portfolio: ~/projects">
            <div className="space-y-6">
              <div className="text-emerald-400">$ cat projects.json</div>
              
              <div className="space-y-6 pl-6">
                {projects.map((project, i) => (
                  <div key={i} className="border-l-2 border-emerald-500/30 pl-4 space-y-3 hover:border-emerald-500 transition">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="text-xl font-bold text-cyan-400">{project.name}</h3>
                      <div className="flex gap-2">
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-3 py-1 bg-zinc-800/50 hover:bg-emerald-500/20 border border-zinc-700 hover:border-emerald-500/50 rounded transition flex items-center gap-1.5 text-sm"
                          >
                            <Github size={14} />
                            <span>GitHub</span>
                          </a>
                        )}
                        {project.live && (
                          <a 
                            href={project.live} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-3 py-1 bg-zinc-800/50 hover:bg-cyan-500/20 border border-zinc-700 hover:border-cyan-500/50 rounded transition flex items-center gap-1.5 text-sm"
                          >
                            <ExternalLink size={14} />
                            <span>Live</span>
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-zinc-300 text-sm">{project.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 bg-zinc-800/50 border border-zinc-700 rounded text-zinc-400">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TerminalWindow>
          
          <div className="flex justify-center animate-bounce">
            <a href="#experience" className="text-zinc-600 hover:text-emerald-400 transition">
              <ChevronDown size={32} />
            </a>
          </div>
        </div>
      </section>

      <section id="experience" className="min-h-screen flex items-center justify-center px-4 py-20 relative z-10">
        <div className="max-w-4xl w-full space-y-8">
          <div className="flex justify-center animate-bounce">
            <a href="#projects" className="text-zinc-600 hover:text-emerald-400 transition">
              <ChevronUp size={32} />
            </a>
          </div>
          
          <TerminalWindow title="anson@portfolio: ~/experience">
            <div className="space-y-6">
              <div className="text-emerald-400">$ git log --work-history</div>
              
              <div className="space-y-6 pl-6">
                <div className="space-y-2">
                  <p className="text-cyan-400 font-semibold">Python Full Stack Developer Intern</p>
                  <p className="text-zinc-400">SMECLabs, Kochi</p>
                  <ul className="text-sm text-zinc-500 space-y-1 pl-4">
                    <li>• Built REST APIs with Django REST Framework</li>
                    <li>• Implemented JWT authentication & role-based permissions</li>
                    <li>• Developed React frontends with reusable components</li>
                    <li>• Optimized SQL queries & Git workflows</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="text-cyan-400 font-semibold">Cisco-AICTE Virtual Internship</p>
                  <p className="text-zinc-400">Cyber Security</p>
                  <ul className="text-sm text-zinc-500 space-y-1 pl-4">
                    <li>• Network security, routing & firewall configurations</li>
                    <li>• Hands-on simulations with Cisco Packet Tracer</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-zinc-800">
                  <div className="text-purple-400 mb-3">$ ls certifications/</div>
                  <div className="flex flex-wrap gap-2 pl-4">
                    {['AWS DeepRacer', 'Cybersecurity Essentials', 'Google Cloud', 'Big Data', 'IoT Edge ML', 'Packet Tracer'].map((cert) => (
                      <span key={cert} className="text-xs px-3 py-1 bg-zinc-800/50 border border-zinc-700 rounded text-zinc-400">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TerminalWindow>
          
          <div className="flex justify-center animate-bounce">
            <a href="#contact" className="text-zinc-600 hover:text-emerald-400 transition">
              <ChevronDown size={32} />
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center px-4 py-20 relative z-10">
        <div className="max-w-4xl w-full space-y-8">
          <div className="flex justify-center animate-bounce">
            <a href="#experience" className="text-zinc-600 hover:text-emerald-400 transition">
              <ChevronUp size={32} />
            </a>
          </div>
          
          <TerminalWindow title="anson@portfolio: ~/contact">
            <div className="space-y-6">
              <div className="text-emerald-400">$ cat contact.vcf</div>
              
              <div className="space-y-4 pl-6">
                <a href="mailto:ansonantony783@gmail.com" className="flex items-center gap-3 text-zinc-300 hover:text-emerald-400 transition group">
                  <Mail size={18} className="text-cyan-400 group-hover:text-emerald-400 transition" />
                  <span>ansonantony783@gmail.com</span>
                </a>
                <a href="tel:7907121020" className="flex items-center gap-3 text-zinc-300 hover:text-emerald-400 transition group">
                  <Phone size={18} className="text-cyan-400 group-hover:text-emerald-400 transition" />
                  <span>+91 7907121020</span>
                </a>
                <a href="https://github.com/ansoncodes" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-300 hover:text-emerald-400 transition group">
                  <Github size={18} className="text-cyan-400 group-hover:text-emerald-400 transition" />
                  <span>github.com/ansoncodes</span>
                </a>
                <a href="https://www.linkedin.com/in/anson-codes/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-300 hover:text-emerald-400 transition group">
                  <Linkedin size={18} className="text-cyan-400 group-hover:text-emerald-400 transition" />
                  <span>linkedin.com/in/anson-codes</span>
                </a>
                <div className="flex items-center gap-3 text-zinc-300">
                  <MapPin size={18} className="text-cyan-400" />
                  <span>Kochi, Kerala, India</span>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-800 pl-6">
                <p className="text-zinc-500 text-sm">$ echo "Let's build something amazing together"</p>
                <p className="text-zinc-400 mt-2">Open to new opportunities and collaborations</p>
              </div>
            </div>
          </TerminalWindow>

          <div className="text-center text-zinc-600 text-sm font-mono">
            <p>© 2026 M A Anson • Built with React & Tailwind CSS</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;