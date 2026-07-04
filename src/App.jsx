import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Terminal, ChevronDown, ChevronUp, GitBranch } from 'lucide-react';

const NAV_LINKS = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

const TYPEWRITER_WORDS = [
  'Full-Stack and AI Developer',
  'Python · Django · React.js',
  'Building AI-powered web apps',
];

const Prompt = ({ cmd, dir = '~' }) => (
  <div className="flex flex-wrap items-baseline gap-x-1.5 font-mono">
    <span className="text-emerald-400">anson@portfolio</span>
    <span className="text-zinc-600">:</span>
    <span className="text-cyan-400">{dir}</span>
    <span className="text-zinc-500">$</span>
    <span className="text-zinc-200">{cmd}</span>
  </div>
);

const TypeWriter = ({ words }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex % words.length];
    let delay = deleting ? 35 : 70;
    let action;
    if (!deleting && text === word) {
      delay = 2200;
      action = () => setDeleting(true);
    } else if (deleting && text === '') {
      delay = 400;
      action = () => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      };
    } else {
      action = () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }
    const timeout = setTimeout(action, delay);
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words]);

  return (
    <span>
      {text}
      <Cursor />
    </span>
  );
};

const Cursor = () => (
  <span className="cursor-blink inline-block w-[2px] h-[1.05em] bg-emerald-400/90 align-[-0.15em] ml-0.5" />
);

const Reveal = ({ children, className = '' }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}>
      {children}
    </div>
  );
};

const TerminalWindow = ({ title, path = '~', children, className = '' }) => (
  <div className={`w-full ${className}`}>
    <div className="relative rounded-xl overflow-hidden border border-zinc-800/80 bg-black/80 backdrop-blur-md terminal-shadow">
      <div className="bg-gradient-to-b from-zinc-800/80 to-zinc-900/90 border-b border-zinc-800 px-4 py-3 flex items-center gap-2">
        <div className="flex gap-2 group shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition flex items-center justify-center">
            <span className="text-[9px] leading-none font-bold text-red-950 opacity-0 group-hover:opacity-100 transition">×</span>
          </div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition flex items-center justify-center">
            <span className="text-[9px] leading-none font-bold text-yellow-950 opacity-0 group-hover:opacity-100 transition">−</span>
          </div>
          <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition flex items-center justify-center">
            <span className="text-[9px] leading-none font-bold text-green-950 opacity-0 group-hover:opacity-100 transition">+</span>
          </div>
        </div>
        <div className="flex-1 text-center text-sm text-zinc-500 font-mono truncate">{title}</div>
        <div className="w-[52px] shrink-0" />
      </div>

      <div className="relative scanlines p-4 sm:p-6 font-mono">{children}</div>

      <div className="border-t border-zinc-800/80 bg-zinc-900/60 px-4 py-1.5 flex items-center justify-between font-mono text-[10px] sm:text-xs text-zinc-600">
        <span className="flex items-center gap-1 text-emerald-500/70">
          <GitBranch size={11} />
          main
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
          online
        </span>
      </div>
    </div>
  </div>
);

const Background = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/25 rounded-full blur-3xl animate-float-orb-1"></div>
    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/25 rounded-full blur-3xl animate-float-orb-2"></div>
    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-orb-3"></div>

    {Array.from({ length: 20 }).map((_, i) => {
      const x = (i * 31) % 100;
      const y = (i * 47) % 100;
      const size = 1 + (i % 3);
      const delay = i % 3 === 0 ? 'animation-delay-2000' : i % 3 === 1 ? 'animation-delay-4000' : 'animation-delay-6000';
      const particleType = i % 3;
      const bgColor =
        particleType === 0 ? 'bg-emerald-400/40' : particleType === 1 ? 'bg-cyan-400/40' : 'bg-purple-400/40';

      return (
        <div
          key={i}
          className={`absolute rounded-full ${bgColor} animate-float-particle ${delay}`}
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
          }}
        />
      );
    })}

    <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.06)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]"></div>

    <div
      className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  </div>
);

const Nav = () => {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    NAV_LINKS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-auto">
      <div className="bg-black/80 backdrop-blur-md border border-zinc-800 rounded-full px-3 sm:px-6 py-2 sm:py-3 flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-mono overflow-x-auto">
        <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
        {NAV_LINKS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={`transition shrink-0 ${
              active === id ? 'text-emerald-400' : 'text-zinc-400 hover:text-emerald-400'
            }`}
          >
            {id}
          </a>
        ))}
      </div>
    </nav>
  );
};

function App() {
  const projects = [
    {
      name: 'Akila Eyewear',
      desc: 'Full-stack eyewear e-commerce platform with product catalog, cart, wishlist, orders, reviews, and an admin console. Features a real-time virtual try-on built with MediaPipe face tracking and Three.js, plus JWT authentication with role-based access control.',
      tech: ['Django REST Framework', 'Next.js', 'MediaPipe', 'Three.js', 'JWT', 'Razorpay'],
      github: 'https://github.com/ansoncodes/akila-eyewear'
    },
    {
      name: 'Text-To-SQL AI',
      desc: 'Natural language to SQL agent built with LangGraph — routes questions through relevance checks, RAG-based schema retrieval with ChromaDB, SQL generation, and execution with stateful retry logic. Enforces read-only SQL safety by blocking destructive statements before execution.',
      tech: ['LangGraph', 'LangChain', 'ChromaDB', 'Sentence Transformers', 'Groq', 'Streamlit'],
      github: 'https://github.com/ansoncodes/Text-To-SQL-AI'
    },
    {
      name: '404 CarCare',
      desc: 'Multi-tenant automotive service platform for airport branches with three role-based portals — Admin, Supervisor, and Customer. Real-time job stage tracking with a live timeline, booking-scoped live chat, and automated notifications powered by Django Signals.',
      tech: ['Django REST Framework', 'Next.js', 'TailwindCSS'],
      github: 'https://github.com/ansoncodes/404-carcare'
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">
      <Background />
      <Nav />

      <section id="home" className="min-h-screen flex items-center justify-center px-4 py-20 relative z-10">
        <div className="max-w-4xl w-full space-y-8">
          <Reveal>
            <TerminalWindow title="anson@portfolio: ~" path="~">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Terminal size={20} className="text-emerald-400 shrink-0" />
                  <Prompt cmd="whoami" />
                </div>
                <div className="space-y-3 pl-6">
                  <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent">
                    M A Anson
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-cyan-400 min-h-[1.75rem] sm:min-h-[2rem]">
                    <TypeWriter words={TYPEWRITER_WORDS} />
                  </p>
                  <p className="text-zinc-400 flex items-center gap-2">
                    <MapPin size={16} className="text-emerald-400" />
                    Kochi, Kerala
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 sm:gap-4 pl-6 pt-4 border-t border-zinc-800">
                  <a href="https://github.com/ansoncodes" target="_blank" rel="noopener noreferrer" className="px-3 sm:px-4 py-2 bg-zinc-800/50 hover:bg-emerald-500/20 border border-zinc-700 hover:border-emerald-500/50 rounded transition flex items-center gap-2 text-sm">
                    <Github size={16} />
                    <span>GitHub</span>
                  </a>
                  <a href="https://www.linkedin.com/in/anson-codes/" target="_blank" rel="noopener noreferrer" className="px-3 sm:px-4 py-2 bg-zinc-800/50 hover:bg-cyan-500/20 border border-zinc-700 hover:border-cyan-500/50 rounded transition flex items-center gap-2 text-sm">
                    <Linkedin size={16} />
                    <span>LinkedIn</span>
                  </a>
                  <a href="mailto:ansonantony783@gmail.com" className="px-3 sm:px-4 py-2 bg-zinc-800/50 hover:bg-purple-500/20 border border-zinc-700 hover:border-purple-500/50 rounded transition flex items-center gap-2 text-sm">
                    <Mail size={16} />
                    <span>Email</span>
                  </a>
                </div>
                <div className="pl-6">
                  <Prompt cmd={<Cursor />} />
                </div>
              </div>
            </TerminalWindow>
          </Reveal>

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

          <Reveal>
            <TerminalWindow title="anson@portfolio: ~/about" path="~/about">
              <div className="space-y-6">
                <Prompt cmd="cat about.txt" dir="~/about" />
                <div className="space-y-4 pl-6 text-zinc-300">
                  <p>Full-stack developer specializing in Django REST Framework and React.js</p>
                  <p>Building scalable web applications with clean, modular code</p>
                  <p>Passionate about REST APIs, authentication systems, and seamless UX</p>
                </div>

                <div className="pt-6 border-t border-zinc-800 space-y-4">
                  <Prompt cmd="cat education.json" dir="~/about" />
                  <div className="pl-6 space-y-2">
                    <p className="text-white">BTech in Computer Science and Engineering (AI & ML)</p>
                    <p className="text-zinc-400">Karunya Institute of Technology and Sciences</p>
                    <p className="text-zinc-500 text-sm">Aug 2021 - May 2025</p>
                  </div>
                </div>
              </div>
            </TerminalWindow>
          </Reveal>

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

          <Reveal>
            <TerminalWindow title="anson@portfolio: ~/skills" path="~/skills">
              <div className="space-y-6">
                <Prompt cmd="ls -la skills/" dir="~/skills" />

                <div className="space-y-4 pl-6">
                  {[
                    { label: 'Backend', skills: ['Django', 'DRF', 'REST APIs', 'JWT', 'WebSockets'] },
                    { label: 'Frontend', skills: ['React.js', 'HTML', 'CSS', 'Tailwind', 'JavaScript'] },
                    { label: 'Languages', skills: ['Python', 'JavaScript', 'SQL'] },
                    { label: 'Databases', skills: ['MySQL', 'PostgreSQL'] },
                    { label: 'DevTools', skills: ['Git', 'GitHub', 'Docker', 'AWS', 'Postman', 'Figma'] },
                  ].map((group) => (
                    <div key={group.label} className="space-y-2">
                      <div className="text-cyan-400">→ {group.label}/</div>
                      <div className="pl-6 flex flex-wrap gap-2">
                        {group.skills.map((skill) => (
                          <span key={skill} className="px-3 py-1 bg-zinc-800/50 border border-zinc-700 hover:border-emerald-500/50 hover:text-emerald-300 rounded text-sm text-zinc-300 transition">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TerminalWindow>
          </Reveal>

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

          <Reveal>
            <TerminalWindow title="anson@portfolio: ~/projects" path="~/projects">
              <div className="space-y-6">
                <Prompt cmd="cat projects.json" dir="~/projects" />

                <div className="space-y-6 pl-6">
                  {projects.map((project, i) => (
                    <div key={i} className="border-l-2 border-emerald-500/30 pl-4 space-y-3 hover:border-emerald-500 hover:translate-x-1 transition-all">
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
                          <span key={tech} className="text-xs px-2 py-1 bg-zinc-800/50 border border-zinc-700 hover:border-emerald-500/50 rounded text-zinc-400 transition">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-zinc-800 pl-6 space-y-4">
                  <Prompt cmd="ls --all repos/" dir="~/projects" />
                  <a
                    href="https://github.com/ansoncodes?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800/50 hover:bg-emerald-500/20 border border-zinc-700 hover:border-emerald-500/50 rounded transition text-sm"
                  >
                    <Github size={16} />
                    <span>View More on GitHub</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </TerminalWindow>
          </Reveal>

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

          <Reveal>
            <TerminalWindow title="anson@portfolio: ~/experience" path="~/experience">
              <div className="space-y-6">
                <Prompt cmd="git log --work-history" dir="~/experience" />

                <div className="pl-6">
                  <div className="border-l border-zinc-800 pl-6 ml-1 space-y-8">
                    <div className="relative space-y-2">
                      <span className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-emerald-500" />
                      <p className="text-cyan-400 font-semibold">Software Developer</p>
                      <p className="text-zinc-400">SMEC Technologies · Full-time</p>
                      <p className="text-zinc-500 text-sm">Jun 2026 - Present · Kochi, Kerala</p>
                      <ul className="text-sm text-zinc-500 space-y-1 pl-4">
                        <li>• Building web applications with Django & Django REST Framework</li>
                      </ul>
                    </div>

                    <div className="relative space-y-2">
                      <span className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-cyan-500" />
                      <p className="text-cyan-400 font-semibold">Python Developer Intern</p>
                      <p className="text-zinc-400">SMEC Technologies · Internship</p>
                      <p className="text-zinc-500 text-sm">Jan 2026 - Mar 2026 · Kochi, Kerala</p>
                      <ul className="text-sm text-zinc-500 space-y-1 pl-4">
                        <li>• Developed and maintained web applications using Python & Django</li>
                        <li>• Built and integrated REST APIs with PostgreSQL/MySQL databases</li>
                        <li>• Implemented authentication, authorization & role-based access control</li>
                        <li>• Participated in code reviews, bug fixing & Git workflows</li>
                      </ul>
                    </div>

                    <div className="relative space-y-2">
                      <span className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-purple-500" />
                      <p className="text-cyan-400 font-semibold">Full-Stack Developer Trainee</p>
                      <p className="text-zinc-400">SMEC Technologies · Apprenticeship</p>
                      <p className="text-zinc-500 text-sm">Jun 2025 - Dec 2025 · Kochi, Kerala</p>
                      <ul className="text-sm text-zinc-500 space-y-1 pl-4">
                        <li>• Built backend-focused web apps with Django & DRF, React frontends</li>
                        <li>• Designed database models, REST APIs & role-based access control</li>
                        <li>• Worked with asynchronous messaging for notifications</li>
                        <li>• Collaborated in Agile teams using Git/GitHub & code reviews</li>
                      </ul>
                    </div>

                    <div className="relative space-y-2">
                      <span className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-yellow-500" />
                      <p className="text-cyan-400 font-semibold">Summer Intern</p>
                      <p className="text-zinc-400">Cisco Networking Academy · Internship</p>
                      <p className="text-zinc-500 text-sm">May 2024 - Jul 2024 · Remote</p>
                      <ul className="text-sm text-zinc-500 space-y-1 pl-4">
                        <li>• Core security concepts, threat analysis & network defense</li>
                        <li>• Hands-on simulations with Cisco Packet Tracer</li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-8 space-y-3">
                    <Prompt cmd="ls certifications/" dir="~/experience" />
                    <div className="flex flex-wrap gap-2 pl-4">
                      {['AWS DeepRacer', 'Cybersecurity Essentials', 'Google Cloud', 'Big Data', 'IoT Edge ML', 'Packet Tracer'].map((cert) => (
                        <span key={cert} className="text-xs px-3 py-1 bg-zinc-800/50 border border-zinc-700 hover:border-emerald-500/50 hover:text-emerald-300 rounded text-zinc-400 transition">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TerminalWindow>
          </Reveal>

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

          <Reveal>
            <TerminalWindow title="anson@portfolio: ~/contact" path="~/contact">
              <div className="space-y-6">
                <Prompt cmd="cat contact.vcf" dir="~/contact" />

                <div className="space-y-4 pl-6">
                  <a href="mailto:ansonantony783@gmail.com" className="flex items-center gap-3 text-zinc-300 hover:text-emerald-400 hover:translate-x-1 transition-all group">
                    <Mail size={18} className="text-cyan-400 group-hover:text-emerald-400 transition" />
                    <span>ansonantony783@gmail.com</span>
                  </a>
                  <a href="tel:7907121020" className="flex items-center gap-3 text-zinc-300 hover:text-emerald-400 hover:translate-x-1 transition-all group">
                    <Phone size={18} className="text-cyan-400 group-hover:text-emerald-400 transition" />
                    <span>+91 7907121020</span>
                  </a>
                  <a href="https://github.com/ansoncodes" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-300 hover:text-emerald-400 hover:translate-x-1 transition-all group">
                    <Github size={18} className="text-cyan-400 group-hover:text-emerald-400 transition" />
                    <span>github.com/ansoncodes</span>
                  </a>
                  <a href="https://www.linkedin.com/in/anson-codes/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-300 hover:text-emerald-400 hover:translate-x-1 transition-all group">
                    <Linkedin size={18} className="text-cyan-400 group-hover:text-emerald-400 transition" />
                    <span>linkedin.com/in/anson-codes</span>
                  </a>
                  <div className="flex items-center gap-3 text-zinc-300">
                    <MapPin size={18} className="text-cyan-400" />
                    <span>Kochi, Kerala, India</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-800 pl-6 space-y-2">
                  <Prompt cmd={'echo "Let\'s build something amazing together"'} dir="~/contact" />
                  <p className="text-zinc-400">Open to new opportunities and collaborations</p>
                </div>
              </div>
            </TerminalWindow>
          </Reveal>

          <div className="text-center text-zinc-600 text-sm font-mono">
            <p>© 2026 M A Anson • Built with React & Tailwind CSS</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
