import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Terminal, ChevronDown, GitBranch } from 'lucide-react';

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
    <span className="text-zinc-400">{dir}</span>
    <span className="text-zinc-600">$</span>
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
      { threshold: 0.1 }
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

const TerminalWindow = ({ title, children, className = '' }) => (
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

      <div className="relative scanlines p-5 sm:p-8 font-mono">{children}</div>

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
    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-float-orb-1"></div>
    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float-orb-2"></div>

    <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]"></div>

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
    const onScroll = () => {
      const doc = document.documentElement;
      // At (or near) the bottom of the page, the last section is active
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        setActive(NAV_LINKS[NAV_LINKS.length - 1]);
        return;
      }
      const pos = window.scrollY + window.innerHeight * 0.35;
      let current = NAV_LINKS[0];
      for (const id of NAV_LINKS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= pos) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <nav className="fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-auto">
      <div className="bg-black/80 backdrop-blur-md border border-zinc-800 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between sm:justify-start gap-3 sm:gap-6 text-xs sm:text-sm font-mono overflow-x-auto no-scrollbar">
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

const Section = ({ id, title, children }) => (
  <section id={id} className="px-4 py-20 sm:py-24 relative z-10 scroll-mt-14">
    <div className="max-w-3xl mx-auto">
      <Reveal>
        <p className="font-mono text-sm text-emerald-400 mb-2">~/{id}</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">{title}</h2>
        {children}
      </Reveal>
    </div>
  </section>
);

const SKILL_GROUPS = [
  { label: 'Backend', skills: ['Django', 'DRF', 'REST APIs', 'JWT', 'WebSockets'] },
  { label: 'Frontend', skills: ['React.js', 'HTML', 'CSS', 'Tailwind', 'JavaScript'] },
  { label: 'Languages', skills: ['Python', 'JavaScript', 'SQL'] },
  { label: 'Databases', skills: ['MySQL', 'PostgreSQL'] },
  { label: 'DevTools', skills: ['Git', 'GitHub', 'Docker', 'AWS', 'Postman', 'Figma'] },
];

const EXPERIENCE = [
  {
    role: 'Software Developer',
    org: 'SMEC Technologies · Full-time',
    date: 'Jun 2026 - Present · Kochi, Kerala',
    points: ['Building web applications with Django & Django REST Framework'],
  },
  {
    role: 'Python Developer Intern',
    org: 'SMEC Technologies · Internship',
    date: 'Jan 2026 - Mar 2026 · Kochi, Kerala',
    points: [
      'Developed and maintained web applications using Python & Django',
      'Built and integrated REST APIs with PostgreSQL/MySQL databases',
      'Implemented authentication, authorization & role-based access control',
      'Participated in code reviews, bug fixing & Git workflows',
    ],
  },
  {
    role: 'Full-Stack Developer Trainee',
    org: 'SMEC Technologies · Apprenticeship',
    date: 'Jun 2025 - Dec 2025 · Kochi, Kerala',
    points: [
      'Built backend-focused web apps with Django & DRF, React frontends',
      'Designed database models, REST APIs & role-based access control',
      'Worked with asynchronous messaging for notifications',
      'Collaborated in Agile teams using Git/GitHub & code reviews',
    ],
  },
  {
    role: 'Summer Intern',
    org: 'Cisco Networking Academy · Internship',
    date: 'May 2024 - Jul 2024 · Remote',
    points: [
      'Core security concepts, threat analysis & network defense',
      'Hands-on simulations with Cisco Packet Tracer',
    ],
  },
];

const CERTIFICATIONS = ['AWS DeepRacer', 'Cybersecurity Essentials', 'Google Cloud', 'Big Data', 'IoT Edge ML', 'Packet Tracer'];

const PROJECTS = [
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

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden font-sans">
      <Background />
      <Nav />

      {/* Hero — the terminal is the hook */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-3xl w-full space-y-10">
          <Reveal>
            <TerminalWindow title="anson@portfolio: ~">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Terminal size={18} className="text-emerald-400 shrink-0" />
                  <Prompt cmd="whoami" />
                </div>
                <div className="space-y-3 pl-6">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">M A Anson</h1>
                  <p className="text-lg sm:text-xl text-zinc-300 min-h-[1.75rem]">
                    <TypeWriter words={TYPEWRITER_WORDS} />
                  </p>
                  <p className="text-zinc-500 flex items-center gap-2 text-sm">
                    <MapPin size={15} className="text-emerald-400" />
                    Kochi, Kerala, India
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 pl-6 pt-2">
                  <a href="https://github.com/ansoncodes" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-zinc-800/50 hover:bg-emerald-500/10 border border-zinc-700 hover:border-emerald-500/50 rounded transition flex items-center gap-2 text-sm">
                    <Github size={15} />
                    <span>GitHub</span>
                  </a>
                  <a href="https://www.linkedin.com/in/anson-codes/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-zinc-800/50 hover:bg-emerald-500/10 border border-zinc-700 hover:border-emerald-500/50 rounded transition flex items-center gap-2 text-sm">
                    <Linkedin size={15} />
                    <span>LinkedIn</span>
                  </a>
                  <a href="mailto:ansonantony783@gmail.com" className="px-4 py-2 bg-zinc-800/50 hover:bg-emerald-500/10 border border-zinc-700 hover:border-emerald-500/50 rounded transition flex items-center gap-2 text-sm">
                    <Mail size={15} />
                    <span>Email</span>
                  </a>
                </div>
                <div className="pl-6">
                  <Prompt cmd={<Cursor />} />
                </div>
              </div>
            </TerminalWindow>
          </Reveal>

          <div className="flex justify-center">
            <a href="#about" className="text-zinc-700 hover:text-emerald-400 transition animate-bounce">
              <ChevronDown size={28} />
            </a>
          </div>
        </div>
      </section>

      <Section id="about" title="About">
        <div className="space-y-4 text-zinc-400 leading-relaxed">
          <p>Full-stack developer specializing in Django REST Framework and React.js.</p>
          <p>I build scalable web applications with clean, modular code — and I'm passionate about REST APIs, authentication systems, and seamless UX.</p>
        </div>

        <div className="mt-12">
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">Education</p>
          <p className="text-white font-medium">BTech in Computer Science and Engineering (AI & ML)</p>
          <p className="text-zinc-400 mt-1">Karunya Institute of Technology and Sciences</p>
          <p className="font-mono text-sm text-zinc-500 mt-1">Aug 2021 - May 2025</p>
        </div>
      </Section>

      <Section id="skills" title="Skills">
        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">{group.label}</p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="font-mono text-xs px-3 py-1.5 bg-zinc-900/70 border border-zinc-800 hover:border-emerald-500/40 hover:text-emerald-300 rounded text-zinc-300 transition">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="projects" title="Projects">
        <div className="divide-y divide-zinc-800/70">
          {PROJECTS.map((project) => (
            <div key={project.name} className="py-10 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <h3 className="text-lg sm:text-xl font-semibold text-white">{project.name}</h3>
                <div className="flex gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-mono text-sm text-zinc-400 hover:text-emerald-400 transition"
                    >
                      <Github size={15} />
                      <span>Code</span>
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-mono text-sm text-zinc-400 hover:text-emerald-400 transition"
                    >
                      <ExternalLink size={15} />
                      <span>Live</span>
                    </a>
                  )}
                </div>
              </div>
              <p className="mt-3 text-zinc-400 leading-relaxed">{project.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="font-mono text-xs px-2.5 py-1 bg-zinc-900/70 border border-zinc-800 rounded text-zinc-500">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <a
          href="https://github.com/ansoncodes?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center gap-2 font-mono text-sm text-emerald-400 hover:text-emerald-300 transition"
        >
          <span>view all repositories</span>
          <span aria-hidden>→</span>
        </a>
      </Section>

      <Section id="experience" title="Experience">
        <div className="border-l border-zinc-800 pl-8 space-y-12">
          {EXPERIENCE.map((job) => (
            <div key={job.role + job.date} className="relative">
              <span className="absolute -left-[37px] top-2 w-2 h-2 rounded-full bg-emerald-500" />
              <h3 className="text-white font-semibold">{job.role}</h3>
              <p className="text-zinc-400 mt-1">{job.org}</p>
              <p className="font-mono text-sm text-zinc-500 mt-1">{job.date}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-zinc-400">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-emerald-500/70 shrink-0">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">Certifications</p>
          <div className="flex flex-wrap gap-2">
            {CERTIFICATIONS.map((cert) => (
              <span key={cert} className="font-mono text-xs px-3 py-1.5 bg-zinc-900/70 border border-zinc-800 hover:border-emerald-500/40 hover:text-emerald-300 rounded text-zinc-400 transition">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section id="contact" title="Contact">
        <p className="text-zinc-400 leading-relaxed mb-10">
          Open to new opportunities and collaborations — let's build something amazing together.
        </p>

        <div className="space-y-4">
          <a href="mailto:ansonantony783@gmail.com" className="flex items-center gap-3 text-zinc-300 hover:text-emerald-400 transition w-fit">
            <Mail size={17} className="text-zinc-500" />
            <span>ansonantony783@gmail.com</span>
          </a>
          <a href="tel:7907121020" className="flex items-center gap-3 text-zinc-300 hover:text-emerald-400 transition w-fit">
            <Phone size={17} className="text-zinc-500" />
            <span>+91 7907121020</span>
          </a>
          <a href="https://github.com/ansoncodes" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-300 hover:text-emerald-400 transition w-fit">
            <Github size={17} className="text-zinc-500" />
            <span>github.com/ansoncodes</span>
          </a>
          <a href="https://www.linkedin.com/in/anson-codes/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-300 hover:text-emerald-400 transition w-fit">
            <Linkedin size={17} className="text-zinc-500" />
            <span>linkedin.com/in/anson-codes</span>
          </a>
          <div className="flex items-center gap-3 text-zinc-300">
            <MapPin size={17} className="text-zinc-500" />
            <span>Kochi, Kerala, India</span>
          </div>
        </div>
      </Section>

      <footer className="px-4 pb-10 relative z-10">
        <p className="text-center text-zinc-600 text-sm font-mono">© 2026 M A Anson • Built with React & Tailwind CSS</p>
      </footer>
    </div>
  );
}

export default App;
