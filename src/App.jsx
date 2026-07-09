import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

/* ---------- data ---------- */

const NAV_LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const SERVICES = [
  { title: 'Backend Development', items: ['Django', 'DRF', 'REST APIs', 'JWT', 'WebSockets'] },
  { title: 'Frontend Development', items: ['React.js', 'Next.js', 'Tailwind', 'JavaScript', 'HTML / CSS'] },
  { title: 'AI Engineering', items: ['LangGraph', 'LangChain', 'RAG', 'ChromaDB', 'Groq'] },
  { title: 'Tooling & Infra', items: ['Git', 'GitHub', 'Docker', 'AWS', 'PostgreSQL', 'MySQL'] },
];

const PROJECTS = [
  {
    name: 'Akila Eyewear',
    tag: 'E-commerce · Virtual Try-On',
    desc: 'Full-stack eyewear platform with a real-time virtual try-on built on MediaPipe face tracking and Three.js, plus JWT auth and role-based access.',
    tech: ['Django REST Framework', 'Next.js', 'MediaPipe', 'Three.js'],
    href: 'https://github.com/ansoncodes/akila-eyewear',
  },
  {
    name: 'Text-To-SQL AI',
    tag: 'AI Agent · RAG',
    desc: 'A LangGraph agent that turns natural language into SQL — relevance checks, RAG schema retrieval with ChromaDB, and read-only safety guards.',
    tech: ['LangGraph', 'ChromaDB', 'Groq', 'Streamlit'],
    href: 'https://github.com/ansoncodes/Text-To-SQL-AI',
  },
  {
    name: '404 CarCare',
    tag: 'Multi-tenant SaaS',
    desc: 'Automotive service platform with three role-based portals, real-time job tracking, booking-scoped chat and automated Django Signals notifications.',
    tech: ['Django REST Framework', 'Next.js', 'TailwindCSS'],
    href: 'https://github.com/ansoncodes/404-carcare',
  },
];

const EXPERIENCE = [
  { role: 'Software Developer', org: 'SMEC Technologies', date: '2026 — Now' },
  { role: 'Python Developer Intern', org: 'SMEC Technologies', date: '2026' },
  { role: 'Full-Stack Developer Trainee', org: 'SMEC Technologies', date: '2025' },
  { role: 'Summer Intern', org: 'Cisco Networking Academy', date: '2024' },
];

const CONTACTS = [
  { label: 'Email', value: 'ansonantony783@gmail.com', href: 'mailto:ansonantony783@gmail.com' },
  { label: 'LinkedIn', value: 'in/anson-codes', href: 'https://www.linkedin.com/in/anson-codes/' },
  { label: 'GitHub', value: 'github.com/ansoncodes', href: 'https://github.com/ansoncodes' },
  { label: 'Phone', value: '+91 7907121020', href: 'tel:+917907121020' },
];

/* ---------- helpers ---------- */

const RollingText = ({ children, className = '' }) => (
  <span className={`roll ${className}`}>
    <span className="roll-inner">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  </span>
);

/* Circular arrow that flies out top-right and a copy flies in from bottom-left on group hover */
const ArrowChip = ({ size = 'md', variant = 'solid' }) => {
  const dims = { sm: 'w-7 h-7', md: 'w-8 h-8', lg: 'w-11 h-11 sm:w-14 sm:h-14' };
  const icons = { sm: 14, md: 16, lg: 24 };
  const dim = dims[size];
  const icon = icons[size];
  const skin =
    variant === 'solid'
      ? 'bg-[var(--cream)] text-[#111]'
      : 'border border-current/25 text-current group-hover:bg-[var(--blue)] group-hover:border-[var(--blue)] group-hover:text-white';
  const ease = 'transition-transform duration-[550ms] ease-[cubic-bezier(.76,0,.24,1)]';
  return (
    <span className={`relative grid place-items-center rounded-full overflow-hidden shrink-0 ${dim} ${skin}`}>
      <ArrowUpRight size={icon} className={`absolute ${ease} group-hover:translate-x-[160%] group-hover:-translate-y-[160%]`} />
      <ArrowUpRight size={icon} className={`absolute ${ease} -translate-x-[160%] translate-y-[160%] group-hover:translate-x-0 group-hover:translate-y-0`} />
    </span>
  );
};

const Reveal = ({ children, delay = 0, className = '', as: Tag = 'div' }) => {
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
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

const SectionLabel = ({ index, children }) => (
  <div className="flex items-center gap-3 eyebrow text-[#111]">
    <span className="text-[var(--blue)]">{index}</span>
    <span className="w-8 h-px bg-[#111]/30" />
    <span>{children}</span>
  </div>
);

/* ---------- sections ---------- */

const Nav = () => {
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 400 && y > last.current);
      last.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-transform duration-500 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
        <a href="#top" className="font-display font-800 text-lg tracking-tight" style={{ fontWeight: 800 }}>
          ANSON<span className="text-[var(--blue)]">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {NAV_LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="text-[#111]/70 hover:text-[#111] transition-colors">
              <RollingText>{l.label}</RollingText>
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="group flex items-center gap-2 rounded-full bg-[#111] text-[var(--cream)] text-sm font-medium pl-5 pr-2 py-2 hover:bg-[var(--blue)] transition-colors"
        >
          <RollingText>Get in touch</RollingText>
          <ArrowChip size="sm" />
        </a>
      </nav>
    </header>
  );
};

const Hero = () => (
  <section id="top" className="relative px-5 sm:px-8 pt-32 sm:pt-40 pb-16">
    <div className="mx-auto max-w-7xl">
      <Reveal className="flex items-center justify-between eyebrow text-[#111]/60 mb-10">
        <span>Full-Stack &amp; AI Developer</span>
        <span className="hidden sm:block">© 2026 — Kochi, India</span>
      </Reveal>

      <Reveal delay={80} className="flex items-center gap-3 mb-6">
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-[var(--blue)] animate-pulse" />
        <span className="text-base sm:text-lg text-[#111]/70">Hey, I'm Anson 👋</span>
      </Reveal>

      <Reveal delay={140}>
        <h1 className="display-hero text-[15vw] sm:text-[12vw] lg:text-[10.5rem] leading-[0.9]">
          From idea
          <br />
          to <span className="text-[var(--blue)]">deployment.</span>
        </h1>
      </Reveal>

      <div className="mt-12 grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16 items-end">
        <Reveal delay={220} as="p" className="max-w-xl text-lg sm:text-xl text-[#111]/70 leading-relaxed">
          I'm a full-stack and AI developer crafting clean, scalable web
          applications with Django, React and modern AI — built to move fast,
          stay simple, and perform in the real world.
        </Reveal>

        <Reveal delay={300} className="flex flex-wrap gap-4 lg:justify-end">
          <a
            href="#work"
            className="group flex items-center gap-2 rounded-full bg-[#111] text-[var(--cream)] font-medium pl-6 pr-2 py-3 hover:bg-[var(--blue)] transition-colors"
          >
            <RollingText>View my work</RollingText>
            <ArrowChip size="md" />
          </a>
          <a
            href="https://github.com/ansoncodes?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center rounded-full border border-[#111]/20 font-medium px-6 py-3 hover:border-[#111] transition-colors"
          >
            <RollingText>GitHub</RollingText>
          </a>
        </Reveal>
      </div>
    </div>
  </section>
);

const Services = () => (
  <section id="services" className="px-5 sm:px-8 py-24 sm:py-32">
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <SectionLabel index="01">Services</SectionLabel>
      </Reveal>
      <Reveal delay={80} as="h2" className="display-lg text-5xl sm:text-7xl mt-6 max-w-3xl">
        What I build for the web.
      </Reveal>

      <div className="mt-16 grid sm:grid-cols-2 gap-x-16 gap-y-14">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 80} className="border-t border-[#111]/15 pt-6">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-2xl sm:text-3xl font-semibold">{s.title}</h3>
              <span className="eyebrow text-[#111]/40">0{i + 1}</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {s.items.map((item) => (
                <span
                  key={item}
                  className="text-sm px-3.5 py-1.5 rounded-full border border-[#111]/15 text-[#111]/70 hover:border-[var(--blue)] hover:text-[var(--blue)] transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Work = () => (
  <section id="work" className="px-5 sm:px-8 py-24 sm:py-32">
    <div className="mx-auto max-w-7xl">
      <Reveal className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <SectionLabel index="02">Featured Work</SectionLabel>
          <h2 className="display-lg text-5xl sm:text-7xl mt-6">Selected projects.</h2>
        </div>
        <a
          href="https://github.com/ansoncodes?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-sm font-medium"
        >
          <RollingText>View all work</RollingText>
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[var(--blue)]" />
        </a>
      </Reveal>

      <div className="mt-14 border-t border-[#111]/15">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.name} delay={i * 60}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-b border-[#111]/15 py-8 sm:py-10 transition-colors hover:bg-[#111] hover:text-[var(--cream)] -mx-5 sm:-mx-8 px-5 sm:px-8"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-baseline gap-4 sm:gap-8">
                  <span className="eyebrow text-[var(--blue)] pt-2">0{i + 1}</span>
                  <div>
                    <h3 className="display-lg text-4xl sm:text-6xl">{p.name}</h3>
                    <p className="mt-2 eyebrow text-current/50">{p.tag}</p>
                  </div>
                </div>
                <ArrowChip size="lg" variant="outline" />
              </div>
              <div className="mt-6 grid lg:grid-cols-[1fr_auto] gap-4 lg:gap-16 items-end pl-0 sm:pl-16">
                <p className="max-w-xl text-base sm:text-lg text-current/70 leading-relaxed">{p.desc}</p>
                <div className="flex flex-wrap gap-2 lg:justify-end">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs px-3 py-1 rounded-full border border-current/25 text-current/70">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Experience = () => (
  <section id="experience" className="px-5 sm:px-8 py-24 sm:py-32">
    <div className="mx-auto max-w-7xl grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16">
      <div>
        <Reveal>
          <SectionLabel index="03">About</SectionLabel>
        </Reveal>
        <Reveal delay={80} as="h2" className="display-lg text-4xl sm:text-6xl mt-6">
          Building since 2021.
        </Reveal>
        <Reveal delay={160} as="p" className="mt-6 text-lg text-[#111]/70 leading-relaxed max-w-md">
          BTech in Computer Science &amp; Engineering (AI &amp; ML), Karunya Institute
          of Technology and Sciences — 2021 to 2025. Now shipping production web
          apps and AI systems at SMEC Technologies, Kochi.
        </Reveal>
      </div>

      <div className="lg:pt-2">
        {EXPERIENCE.map((job, i) => (
          <Reveal key={job.role} delay={i * 70}>
            <div className="group flex items-baseline justify-between gap-4 border-t border-[#111]/15 py-6 last:border-b">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold group-hover:text-[var(--blue)] transition-colors">
                  {job.role}
                </h3>
                <p className="mt-1 text-[#111]/55">{job.org}</p>
              </div>
              <span className="eyebrow text-[#111]/50 shrink-0">{job.date}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="px-5 sm:px-8 pt-24 sm:pt-32">
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <SectionLabel index="04">Contact</SectionLabel>
      </Reveal>

      <Reveal delay={80} as="h2" className="display-hero text-[16vw] sm:text-[13vw] lg:text-[13rem] mt-8 leading-[0.85]">
        Let's talk.
      </Reveal>

      <Reveal delay={160} as="p" className="mt-8 text-lg sm:text-xl text-[#111]/70 max-w-xl leading-relaxed">
        Have a project in mind, a role to fill, or just want to say hi? I'm open
        to new opportunities and collaborations.
      </Reveal>

      <div className="mt-14 grid sm:grid-cols-2 gap-x-16 gap-y-8 border-t border-[#111]/15 pt-10">
        {CONTACTS.map((c, i) => (
          <Reveal key={c.label} delay={i * 60}>
            <a
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group flex items-center justify-between border-b border-[#111]/15 pb-4"
            >
              <span>
                <span className="block eyebrow text-[#111]/45 mb-1">{c.label}</span>
                <span className="font-display text-2xl sm:text-3xl font-semibold group-hover:text-[var(--blue)] transition-colors">
                  {c.value}
                </span>
              </span>
              <ArrowUpRight className="w-6 h-6 text-[#111]/40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--blue)]" />
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const FOOTER_LINKS = [{ id: 'top', label: 'Home' }, ...NAV_LINKS];

const Footer = () => (
  <footer className="relative mt-28 bg-[#111] text-[var(--cream)] overflow-hidden rounded-t-[2rem] sm:rounded-t-[2.5rem]">
    {/* ghost wordmark */}
    <span className="pointer-events-none select-none absolute left-1/2 -translate-x-1/2 bottom-[-3.5vw] display-hero text-[27vw] leading-none text-white/[0.05] whitespace-nowrap">
      ANSON
    </span>

    <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 pt-16 sm:pt-20 pb-40 sm:pb-56">
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <h2 className="display-lg text-4xl sm:text-5xl leading-[1.03]">
          Scaling ideas
          <br />
          into products.
        </h2>

        <div>
          <p className="text-lg mb-5">/Quick links</p>
          <div className="flex flex-wrap gap-2.5 max-w-xs">
            {FOOTER_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="rounded-lg bg-[var(--cream)] text-[#111] text-sm font-medium px-4 py-2 hover:bg-[var(--blue)] hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-lg mb-5">/Contact</p>
          <a
            href="mailto:ansonantony783@gmail.com"
            className="text-[var(--cream)]/75 hover:text-[var(--blue)] transition-colors"
          >
            ansonantony783@gmail.com
          </a>
          <p className="mt-2 text-[var(--cream)]/50 text-sm">Kochi, Kerala, India</p>
        </div>
      </div>
    </div>

    <div className="relative z-10 border-t border-white/10 mx-auto max-w-7xl px-5 sm:px-8 py-5 flex items-center justify-between flex-wrap gap-2 eyebrow text-[var(--cream)]/45">
      <span>© 2026 M A Anson</span>
      <span>Built with React &amp; Tailwind</span>
    </div>
  </footer>
);

function App() {
  return (
    <div className="min-h-screen bg-[var(--cream)] text-[#111] overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <Services />
        <Work />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
