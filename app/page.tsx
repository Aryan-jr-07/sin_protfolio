'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import './globals.css';

// ─── Typewriter Phrases ──────────────────────────────────────────────────────
const PHRASES = [
  'Full Stack Developer',
  'B.Tech AI Engineer Student',
  'Open Source Contributor',
  'Three.js 3D Visualizer Dev',
  'Competitive Programmer'
];

// ─── Education Timeline Data ─────────────────────────────────────────────────
interface EducationEvent {
  degree: string;
  institution: string;
  date: string;
  grade: string;
  desc: string;
}

const EDUCATION_EVENTS: EducationEvent[] = [
  {
    degree: 'Bachelor of Technology (Artificial Intelligence)',
    institution: 'Newton School of Technology, Rishihood University',
    date: '2024 - 2028',
    grade: 'Grade: 6.5 / 10.0',
    desc: 'Specializing in machine learning paradigms, data structure algorithms, and high-performance full-stack web and mobile systems.'
  },
  {
    degree: 'Intermediate (Class XII)',
    institution: 'B.L. Indo Anglian Public School',
    date: '2023 - 2024',
    grade: 'Grade: 74.0%',
    desc: 'Core coursework focused on Physics, Chemistry, Advanced Mathematics, and Computer Science foundations.'
  },
  {
    degree: 'Matriculation (Class X)',
    institution: 'St. Xavier’s High School',
    date: '2021 - 2022',
    grade: 'Grade: 82.0%',
    desc: 'Foundational secondary school education with academic highlights in mathematics, science, and computer logic.'
  }
];

// ─── Beyond Code Identities ───────────────────────────────────────────────
const ACTIVITIES = [
  { icon: '⚽', identity: 'Footballer', color: '#16a34a', badge: 'National Level', hobby: 'Hobby' },
  { icon: '🏊', identity: 'Swimmer', color: '#0284c7', badge: 'College Level', hobby: 'Hobby' },
  { icon: '🎾', identity: 'Tennis Player', color: '#ca8a04', badge: 'College Level', hobby: 'Hobby' },
  { icon: '🏀', identity: 'Basketball Player', color: '#ea580c', badge: 'School Level', hobby: 'Hobby' },
  { icon: '🔧', identity: 'Open Source Contributor', color: '#7c3aed', badge: 'Hacktoberfest L4', hobby: 'Hobby' },
];


// ─── Projects Data ───────────────────────────────────────────────────────────
interface ProjectItem {
  id: string;
  title: string;
  desc: string;
  longDesc: string;
  tags: string[];
  category: 'web' | 'ml' | '3d';
  features: string[];
  liveLink: string;
  gitLink: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'skincare-service',
    title: 'Skincare Service',
    desc: 'An elegant e-commerce and booking platform for skincare products and services.',
    longDesc: 'A beautifully designed web application for a modern skincare brand. It includes features for browsing products, booking services, and learning about skincare routines.',
    tags: ['Next.js', 'React', 'Tailwind CSS'],
    category: 'web',
    features: [
      'Premium UI: Built with a modern, clean aesthetic tailored for health and beauty brands.',
      'Responsive Design: Ensures a smooth shopping and booking experience across all devices.'
    ],
    liveLink: 'https://skincare-psi-ebon.vercel.app/',
    gitLink: 'https://github.com/Aryan-jr-07/skincare'
  },
  {
    id: 'rafting-service',
    title: 'Rafting Service',
    desc: 'A responsive landing page and service platform for a rafting business.',
    longDesc: 'A sample web application built to showcase a rafting and adventure sports business. Features a clean, responsive layout designed for optimal user experience.',
    tags: ['React', 'CSS', 'Vite'],
    category: 'web',
    features: [
      'Responsive Design: Optimized for seamless viewing across mobile and desktop devices.',
      'Modern UI/UX: Intuitive interface with engaging visual elements for adventure seekers.'
    ],
    liveLink: 'https://raft-sample.netlify.app/',
    gitLink: 'https://github.com/Aryan-jr-07/rafting-sample'
  },
  {
    id: 'twinstack',
    title: 'TwinStack',
    desc: 'A modern web application built with TypeScript and Vite.',
    longDesc: 'TwinStack is a web application designed for high performance and scalability. Developed using TypeScript and bundled with Vite.',
    tags: ['TypeScript', 'Vite', 'React'],
    category: 'web',
    features: [
      'Modern Stack: Built using Vite for fast compilation and HMR.',
      'Type Safety: Fully written in TypeScript for reliable code.'
    ],
    liveLink: 'https://twinstack.pakhsa.in/',
    gitLink: 'https://github.com/Aryan-jr-07/TS'
  },
  {
    id: 'eventsphere',
    title: 'EventSphere',
    desc: 'A production-ready event ticketing platform implementing modular N-Tier architecture and secure payment verification.',
    longDesc: 'EventSphere is an enterprise-grade event management platform. It features a formal N-Tier layered architecture (Controllers/Services/Repositories) with Dependency Injection for modularity, server-side HMAC-SHA256 signature verification for Razorpay payment checkouts, and custom Supabase session state persistence.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Three.js', 'Razorpay', 'NextAuth'],
    category: 'web',
    features: [
      'Lead Full-Stack Architecture: Spearheaded a team of 5 using Next.js 16 and DI.',
      'Secure Payment Pipeline: Implemented HMAC-SHA256 Razorpay signatures and gateway bypass for free passes.',
      'Advanced 3D UX: Implemented immersive Three.js particles and luxury dark-mode aesthetics.',
      'OTP Verification System: Integrated SMTP OTP validation with session-aware Supabase persistence.',
      'Encrypted Passes: Created QR-code tickets containing encrypted metadata for secure scanner checks.'
    ],
    liveLink: 'https://project-event-sphere.vercel.app/',
    gitLink: 'https://github.com/vanshpanwar2024/eventSphere'
  },
  {
    id: 'fakenews',
    title: 'FakeNewsDetection',
    desc: 'A machine learning web service classifying article veracity using a fine-tuned DistilBERT model and RAG.',
    longDesc: 'A full-stack ML service that classifies news claims extracted from texts, URLs, or PDFs. Utilizes a PyTorch fine-tuned DistilBERT transformer model with context verification via RAG to output confidence scores and claim summaries.',
    tags: ['Python', 'PyTorch', 'Transformers', 'FastAPI', 'Docker', 'RAG'],
    category: 'ml',
    features: [
      'DistilBERT Classifier: Fine-tuned transformer models via PyTorch to predict article veracity with high accuracy.',
      'Fact-Checking Engine: Implemented Retrieval-Augmented Generation (RAG) to gather context and compute verdicts.',
      'FastAPI & Docker: Exposed server endpoints via FastAPI and containerized utilizing Docker Compose.'
    ],
    liveLink: 'https://huggingface.co/spaces/aryanjr07/FakeNewsDetection',
    gitLink: 'https://github.com/deepak-pandey-10/FakeNewsDetection'
  },
  {
    id: 'marlboro',
    title: 'Marlboro 3D Visualizer',
    desc: 'An immersive product showcase built with scroll-bound transformations and optimized GPU rendering.',
    longDesc: 'A high-end 3D product visualizer designed to highlight hardware capabilities. Implements matrix coordinate transformations to map 2D user scrolling depth into 3D rotations, optimizing vertex rendering to run smoothly at 60 FPS on mobile browsers.',
    tags: ['React', 'TypeScript', 'Framer Motion', 'Tailwind', 'Three.js', 'Radix UI'],
    category: '3d',
    features: [
      'Scroll-bound Emergence: Engineered cigarette pack translations across 600vh scroll paths using Framer Motion.',
      'Ignition effects: Designed lighter sparks, smoke, and flames using CSS keyframe animations.',
      'TypeScript & Radix: Component-driven architecture using accessible, reusable modular elements.'
    ],
    liveLink: 'https://marlbooro.netlify.app/',
    gitLink: 'https://github.com/Aryan-jr-07/marlboro'
  },
  {
    id: 'artisan',
    title: 'Artisan Welfare Analytics',
    desc: 'A full-stack data analytics dashboard ranking state-wise disparities in Indian artisan welfare benefits.',
    longDesc: 'Artisan Welfare Analytics provides government and policy researchers with structural insights into benefit distributions. Integrates a smart spreadsheet normalization engine with Express server routing and MongoDB storage.',
    tags: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB'],
    category: 'web',
    features: [
      'Welfare Indexing: Concocted an Artisan Support Index (ASI) scoring algorithm (weighted on coverage, growth, and consistency) to rank all Indian states.',
      'Interactive Dashboard: Created year-wise trends, bar charts, and top/bottom rankings utilizing Recharts modules.',
      'Upload Normalization: Designed a smart Excel/CSV ingestion pipeline supporting flexible schemas.'
    ],
    liveLink: 'https://artisan-welfare-analytics.vercel.app/',
    gitLink: 'https://github.com/Aryan-jr-07/Artisan-WELFARE-ANALYTICS'
  }
];


type ProjectFilter = 'all' | 'web' | 'ml' | '3d';

export default function Page() {

  // ── Scroll Tracking & Navigation ──────────────────────────────────────────
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [revealedSections, setRevealedSections] = useState<Record<string, boolean>>({ about: true });

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);

      if (window.scrollY > 40) {
        setIsHeaderScrolled(true);
      } else {
        setIsHeaderScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section Observer (Scroll Spy & Reveal trigger)
  useEffect(() => {
    const sections = document.querySelectorAll('section.content-section');
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -35% 0px', // updates active state in mid viewport
      threshold: 0.05
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveSection(id);
          setRevealedSections(prev => ({ ...prev, [id]: true }));
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  // ── Custom Cursor ──────────────────────────────────────────────────────────
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    let mouseX = -200, mouseY = -200;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      el.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onOver = (e: Event) => {
      const target = e.target as Element;
      if (target.closest('a, button, select, input, textarea, .clickable, .project-card, .timeline-card, .filter-btn')) {
        el.classList.add('hover');
      }
    };
    const onOut = (e: Event) => {
      const target = e.target as Element;
      if (target.closest('a, button, select, input, textarea, .clickable, .project-card, .timeline-card, .filter-btn')) {
        el.classList.remove('hover');
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      window.addEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // ── Typewriter Effect ──────────────────────────────────────────────────────
  const [typedText, setTypedText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = PHRASES[phraseIdx] || '';
    let t: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (charIdx < phrase.length) {
        t = setTimeout(() => {
          setTypedText(phrase.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        }, 80);
      } else {
        t = setTimeout(() => setIsDeleting(true), 2200);
      }
    } else {
      if (charIdx > 0) {
        t = setTimeout(() => {
          setTypedText(phrase.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        }, 40);
      } else {
        setIsDeleting(false);
        setPhraseIdx(p => (p + 1) % PHRASES.length);
      }
    }
    return () => clearTimeout(t);
  }, [charIdx, isDeleting, phraseIdx]);

  // ── Stats Count Up (triggered on scroll observation) ──────────────────────
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsCounts, setStatsCounts] = useState([0, 0, 0, 0]);
  const [hasCounted, setHasCounted] = useState(false);

  useEffect(() => {
    const element = statsRef.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasCounted) {
        setHasCounted(true);
        const targets = [1400, 630, 50, 25];
        const start = performance.now();
        let animationFrameId: number;

        const animate = (timestamp: number) => {
          const elapsed = timestamp - start;
          const progress = Math.min(elapsed / 1200, 1);

          setStatsCounts(targets.map(target => Math.floor(progress * target)));

          if (progress < 1) {
            animationFrameId = requestAnimationFrame(animate);
          }
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
      }
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [hasCounted]);

  // ── Projects Filtering & Modal ─────────────────────────────────────────────
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const filteredProjects = useMemo(() => {
    if (projectFilter === 'all') return PROJECTS_DATA;
    return PROJECTS_DATA.filter(p => p.category === projectFilter);
  }, [projectFilter]);

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);


  // ── Form State & Validations ────────────────────────────────────────────────
  const [formData, setFormData] = useState({ name: '', subject: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', subject: '', email: '', message: '' });
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'name' && value.trim() === '') error = 'Name is required';
    if (name === 'email') {
      if (value.trim() === '') {
        error = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(value)) {
        error = 'Invalid email address';
      }
    }
    if (name === 'subject' && value.trim() === '') error = 'Subject is required';
    if (name === 'message') {
      if (value.trim() === '') {
        error = 'Message is required';
      } else if (value.length > 500) {
        error = 'Message is too long (max 500 chars)';
      }
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 500) return;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const valid = ['name', 'email', 'subject', 'message'].every(f =>
      validateField(f, formData[f as keyof typeof formData])
    );
    if (!valid) return;

    setFormState('sending');
    const mailtoUrl = `mailto:aryanjr2010@gmail.com?subject=${encodeURIComponent(
      `Portfolio Contact [${formData.subject}] from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Hi Aryan,\n\nYou received a new message from your portfolio contact form:\n\n` +
      `-----------------------------------------\n` +
      `Name: ${formData.name}\nEmail: ${formData.email}\nSubject Type: ${formData.subject}\n` +
      `-----------------------------------------\n\nMessage:\n${formData.message}\n\n-----------------------------------------`
    )}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
      setFormState('sent');
      setFormData({ name: '', subject: '', email: '', message: '' });
      setTimeout(() => setFormState('idle'), 3000);
    }, 800);
  };

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ── Falling Leaves Effect ─────────────────────────────────────────────────
  useEffect(() => {
    const LEAF_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path d="M20 2 C10 8, 2 20, 20 38 C38 20, 30 8, 20 2Z" fill="rgba(196,135,58,0.65)" /></svg>`;
    const SWAYS = ['leafSway1', 'leafSway2', 'leafSway3'];

    const spawnLeaf = () => {
      const container = document.getElementById('leaves-container');
      if (!container) return;
      const leaf = document.createElement('div');
      leaf.className = 'leaf';
      const size = 14 + Math.random() * 18;
      const leftPos = Math.random() * 100;
      const duration = 9 + Math.random() * 9;
      const delay = Math.random() * 3;
      const sway = SWAYS[Math.floor(Math.random() * SWAYS.length)];
      leaf.style.cssText = `left:${leftPos}vw;width:${size}px;height:${size}px;animation:${sway} ${duration}s ${delay}s linear forwards;`;
      leaf.innerHTML = LEAF_SVG;
      container.appendChild(leaf);
      setTimeout(() => leaf.remove(), (duration + delay) * 1000);
    };

    const intervalId = setInterval(spawnLeaf, 1500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {/* ── Custom Cursor Follower ── */}
      <div ref={cursorRef} className="cursor-follower" aria-hidden="true" />

      {/* ── Reading Progress Bar ── */}
      <div className="scroll-progress-container" aria-hidden="true">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* ── Dynamic Glowing Orbs Backdrop ── */}
      <div className="bg-warmth" aria-hidden="true">
        <div className="bg-warmth-1" />
        <div className="bg-warmth-2" />
        <div className="bg-warmth-3" />
      </div>
      {/* ── Edge Vignette ── */}
      <div className="bg-vignette" aria-hidden="true" />
      {/* ── Falling Leaves Container ── */}
      <div className="leaves-container" id="leaves-container" aria-hidden="true" />

      {/* ── Floating Toast Success Notification ── */}
      <div className={`toast ${formState === 'sent' ? 'show' : ''}`}>
        Redirecting to mail client... Message saved!
      </div>

      {/* ── STICKY FLOATING HEADER ── */}
      <header className={`floating-header ${isHeaderScrolled ? 'scrolled' : ''}`}>
        <a href="#" className="header-logo" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>
          Aryan<span className="dot">.</span>
        </a>

        <div className="header-actions">
          <a href="https://calendly.com/" target="_blank" rel="noopener noreferrer" className="btn">
            Book Meeting
          </a>
        </div>
      </header>

      {/* ── MAIN LAYOUT GRID ── */}
      <main className="app-container">

        {/* LEFT COLUMN: Fixed Sticky Profile Details Panel (Desktops) */}
        <aside className="sidebar-wrapper">
          <div className="sidebar-panel">
            <div className="sidebar-profile">
              <div className="profile-avatar-container">
                <img src="/avatar.png" alt="Aryan Avatar" className="profile-avatar" />
              </div>

              <div className="hero-badge">
                <span className="availability-dot" />
                Active Developer
              </div>

              <h1 className="sidebar-title">Aryan</h1>
              <p className="sidebar-bio">
                B.Tech Artificial Intelligence student. Full Stack Developer, 3D Visualizer &amp; Open Source Contributor.
              </p>

              <p className="hero-typewriter">
                Coding with&nbsp;
                <span className="typewriter-highlight">
                  {typedText}
                  <span className="typewriter-cursor">|</span>
                </span>
              </p>

              {/* Scroll-Spy Side Menu */}
              <nav className="sidebar-nav" aria-label="Portfolio sections">
                <button
                  className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                  onClick={() => scrollTo('about')}
                >
                  <span><span className="nav-num">01.</span>Summary &amp; Timeline</span>
                  <span className="nav-arrow">→</span>
                </button>
                <button
                  className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
                  onClick={() => scrollTo('skills')}
                >
                  <span><span className="nav-num">02.</span>Skills &amp; Stats</span>
                  <span className="nav-arrow">→</span>
                </button>
                <button
                  className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                  onClick={() => scrollTo('projects')}
                >
                  <span><span className="nav-num">03.</span>Selected Work</span>
                  <span className="nav-arrow">→</span>
                </button>
                <button
                  className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                  onClick={() => scrollTo('contact')}
                >
                  <span><span className="nav-num">04.</span>Get In Touch</span>
                  <span className="nav-arrow">→</span>
                </button>
              </nav>
            </div>

            <div className="sidebar-footer">
              <div className="social-links">
                <a href="https://github.com/Aryan-jr-07" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/aryan-25800a301/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="https://leetcode.com/u/dodo_07/" target="_blank" rel="noopener noreferrer" className="social-link" title="LeetCode" aria-label="LeetCode">
                  {/* LeetCode official icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                  </svg>
                </a>
                <a href="https://codeforces.com/profile/aryan_jr07" target="_blank" rel="noopener noreferrer" className="social-link" title="Codeforces" aria-label="Codeforces">
                  {/* Codeforces official icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" />
                  </svg>
                </a>
              </div>

              <a href="Resume-aryan.pdf" download className="btn btn-ghost" style={{ width: '100%' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download CV (PDF)
              </a>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: Scrolling Sections Viewport */}
        <div className="content-wrapper">

          {/* INLINE PROFILE HEADER (Visible on small screens/tablets only) */}
          <header className="hero-inline-panel" aria-label="Profile Summary">
            <div className="sidebar-profile">
              <div className="profile-avatar-container" style={{ margin: '0 auto 16px auto' }}>
                <img src="/avatar.png" alt="Aryan Avatar" className="profile-avatar" />
              </div>

              <div className="hero-badge">
                <span className="availability-dot" />
                Active Developer
              </div>

              <h1 className="sidebar-title" style={{ fontSize: '2rem' }}>Aryan</h1>
              <p className="sidebar-bio">
                B.Tech Artificial Intelligence student at NST. Full Stack Developer, 3D Visualizer &amp; Open Source Contributor.
              </p>

              <p className="hero-typewriter">
                Coding with&nbsp;
                <span className="typewriter-highlight">
                  {typedText}
                  <span className="typewriter-cursor">|</span>
                </span>
              </p>

              <div className="cta-btn-group">
                <a href="Resume-aryan.pdf" download className="btn btn-ghost">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Resume PDF
                </a>
                <a href="https://github.com/Aryan-jr-07" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  GitHub Profile
                </a>
              </div>

              <div className="social-links">
                <a href="https://github.com/Aryan-jr-07" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/aryan-25800a301/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="https://leetcode.com/u/dodo_07/" target="_blank" rel="noopener noreferrer" className="social-link" title="LeetCode" aria-label="LeetCode">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                  </svg>
                </a>
                <a href="https://codeforces.com/profile/aryan_jr07" target="_blank" rel="noopener noreferrer" className="social-link" title="Codeforces" aria-label="Codeforces">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" />
                  </svg>
                </a>
              </div>
            </div>
          </header>

          {/* SECTION 1: ABOUT & TIMELINE */}
          <section className={`content-section ${revealedSections.about ? 'active-spy' : ''}`} id="about">
            <div className="section-header">
              <span className="section-number">01 / PROFILE</span>
              <h2 className="section-title">Summary &amp; Background</h2>
            </div>

            <div className="bento-card about-grid">

              {/* ── Bio block ── */}
              <div className="about-bio-block">
                <p className="about-bio-lead">
                  AI Engineering student &amp; Full Stack Developer — shipping real-world web apps, ML models, and 3D experiences.
                </p>
                <p className="about-bio-sub">
                  Competitive programmer active on LeetCode &amp; Codeforces. Open source contributor with a Hacktoberfest Level 4 badge.
                </p>

                {/* Quick stat chips */}
                <div className="about-chips">
                  <span className="about-chip">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                    </svg>
                    LeetCode 1400+
                  </span>
                  <span className="about-chip">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                      <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" />
                    </svg>
                    Codeforces 630+
                  </span>
                  <span className="about-chip">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    Hacktoberfest L4
                  </span>
                </div>
              </div>


              {/* ── Divider ── */}
              <div className="about-divider" />

              {/* ── Education Timeline ── */}
              <div className="about-timeline-section">
                <h3 className="about-subsection-label">Academic Journey</h3>
                <div className="timeline-container">
                  {EDUCATION_EVENTS.map((event, index) => (
                    <div className="timeline-item" key={index}>
                      <div className="timeline-dot" aria-hidden="true" />
                      <div className="timeline-card">
                        <div className="timeline-header">
                          <div style={{ flex: 1 }}>
                            <span className="timeline-degree">{event.degree}</span>
                            <span className="timeline-inst">{event.institution}</span>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                            <span className="timeline-date">{event.date}</span>
                            <span className="timeline-grade">{event.grade}</span>
                          </div>
                        </div>
                        <p className="timeline-desc">{event.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Beyond Code — Identity Cards ── */}
              <div className="about-divider" />
              <div className="about-timeline-section">
                <h3 className="about-subsection-label">Beyond Code</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                  {ACTIVITIES.map((act, index) => (
                    <div key={index} className="activity-flip-card" aria-label={act.identity}>
                      {/* Front — visible by default */}
                      <div className="activity-flip-front" style={{ '--card-color': act.color } as React.CSSProperties}>
                        <span className="activity-flip-icon">{act.icon}</span>
                        <p className="activity-flip-identity">{act.identity}</p>
                      </div>
                      {/* Back — revealed on hover */}
                      <div className="activity-flip-back" style={{ '--card-color': act.color } as React.CSSProperties}>
                        <span className="activity-flip-icon" style={{ fontSize: '1.5rem' }}>{act.icon}</span>
                        <span className="activity-flip-stat">{act.badge}</span>
                        <span className="activity-flip-stat">{act.hobby}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 2: SKILLS & STATS */}
          <section className={`content-section ${revealedSections.skills ? 'active-spy' : ''}`} id="skills">
            <div className="section-header">
              <span className="section-number">02 / CAPABILITIES</span>
              <h2 className="section-title">Skills &amp; Stats</h2>
            </div>

            <div className="bento-card skills-container">
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                An organic map of programming syntaxes, framework suites, and database models that form my standard engineering stack:
              </p>

              <div>
                {/* Languages & Databases */}
                <div className="skills-category">
                  <h3 className="skills-category-title">Languages &amp; Databases</h3>
                  <div className="skills-grid">
                    {[
                      'TypeScript', 'JavaScript', 'Python', 'C',
                      'HTML', 'CSS',
                      'SQL', 'PostgreSQL', 'MySQL', 'MongoDB'
                    ].map(s => (
                      <div key={s} className="skill-chip">{s}</div>
                    ))}
                  </div>
                </div>

                {/* Frameworks & Packages */}
                <div className="skills-category" style={{ marginTop: '18px' }}>
                  <h3 className="skills-category-title">Frameworks &amp; Packages</h3>
                  <div className="skills-grid">
                    {[
                      'Next.js', 'React', 'Node.js', 'Express.js',
                      'Three.js', 'React Native', 'Prisma ORM',
                      'Pandas', 'PyTorch', 'FastAPI'
                    ].map(s => (
                      <div key={s} className="skill-chip">{s}</div>
                    ))}
                  </div>
                </div>

                {/* DevOps & Infrastructure */}
                <div className="skills-category" style={{ marginTop: '18px' }}>
                  <h3 className="skills-category-title">DevOps &amp; Infrastructure</h3>
                  <div className="skills-grid">
                    {[
                      'Git & GitHub', 'Docker', 'Docker Compose',
                      'AWS', 'Firebase', 'Hugging Face',
                      'Postman', 'Figma', 'Data Structures & Algorithms'
                    ].map(s => (
                      <div key={s} className="skill-chip">{s}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Competitive Programming Stats Grid (Count-Up Animation) */}
              <div ref={statsRef} className="stats-grid">
                <a href="https://leetcode.com/u/dodo_07/" target="_blank" rel="noopener noreferrer" className="stat-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <span className="stat-number">{statsCounts[0]}</span>
                  <span className="stat-label">LeetCode Rating</span>
                </a>
                <a href="https://codeforces.com/profile/aryan_jr07" target="_blank" rel="noopener noreferrer" className="stat-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <span className="stat-number">{statsCounts[1]}</span>
                  <span className="stat-label">Codeforces Rating</span>
                </a>
                <div className="stat-card">
                  <span className="stat-number">{statsCounts[2]}+</span>
                  <span className="stat-label">Problems Solved</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">{statsCounts[3]}+</span>
                  <span className="stat-label">Skills Mastered</span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: PROJECTS */}
          <section className={`content-section ${revealedSections.projects ? 'active-spy' : ''}`} id="projects">
            <div className="section-header">
              <span className="section-number">03 / ENGINEERING</span>
              <h2 className="section-title">Selected Projects</h2>
            </div>

            <div className="filter-bar">
              {(['all', 'web', 'ml', '3d'] as ProjectFilter[]).map(filter => (
                <button
                  key={filter}
                  className={`filter-btn ${projectFilter === filter ? 'active' : ''}`}
                  onClick={() => setProjectFilter(filter)}
                >
                  {filter === 'all' ? 'ALL PROJECTS' :
                    filter === 'web' ? 'WEB & APPS' :
                      filter === 'ml' ? 'AI / ML PIPELINES' : '3D / CREATIVE'}
                </button>
              ))}
            </div>

            <div className="projects-grid">
              {filteredProjects.map(project => (
                <article className="project-card" key={project.id}>
                  <div className="project-card-header">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.desc}</p>

                    <div className="project-tags">
                      {project.tags.slice(0, 3).map(tag => (
                        <span className="project-tag" key={tag}>{tag}</span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="project-tag" style={{ background: 'transparent', border: '1px solid var(--border-color)' }}>
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    className="project-link-action clickable"
                    onClick={() => setActiveModalProject(project)}
                    style={{ background: 'transparent', border: 'none', textAlign: 'left' }}
                  >
                    Technical Specifications ↗
                  </button>
                </article>
              ))}
            </div>
          </section>

          {/* SECTION 4: CONTACT & TESTIMONIALS */}
          <section className={`content-section ${revealedSections.contact ? 'active-spy' : ''}`} id="contact">
            <div className="section-header">
              <span className="section-number">04 / COLLABORATE</span>
              <h2 className="section-title">Get In Touch</h2>
            </div>

            <div className="bento-card contact-layout">
              <div className="contact-info-panel">
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '8px' }}>
                  Have an interesting project or a technical role to fill? Drop a line and let's coordinate!
                </p>

                <div className="contact-card">
                  <div className="contact-icon-box" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className="contact-card-content">
                    <h4>Email</h4>
                    <p>
                      <a href="mailto:aryanjr2010@gmail.com">
                        aryanjr2010@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="contact-icon-box" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className="contact-card-content">
                    <h4>Phone</h4>
                    <p>
                      <a href="tel:+918002858802">+91 80028 58802</a>
                    </p>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="contact-icon-box" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className="contact-card-content">
                    <h4>Location</h4>
                    <p>Delhi-NCR, India</p>
                  </div>
                </div>
              </div>

              {/* Form panel */}
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`form-control ${errors.name ? 'error' : ''}`}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                    />
                    {errors.name && <span className="error-msg">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="subject">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      className={`form-control ${errors.subject ? 'error' : ''}`}
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="">Select subject...</option>
                      <option value="freelance">Freelance Contract</option>
                      <option value="job">Full-time Opportunity</option>
                      <option value="hello">General Inquiry</option>
                    </select>
                    {errors.subject && <span className="error-msg">{errors.subject}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${errors.email ? 'error' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                  />
                  {errors.email && <span className="error-msg">{errors.email}</span>}
                </div>

                <div className="form-group textarea-container">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className={`form-control ${errors.message ? 'error' : ''}`}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe details regarding your project scope..."
                  />
                  <span className={`char-counter ${formData.message.length >= 500 ? 'limit' : ''}`}>
                    {formData.message.length}/500
                  </span>
                  {errors.message && <span className="error-msg">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  className="btn"
                  disabled={formState === 'sending'}
                  style={{ alignSelf: 'flex-start', marginTop: '12px' }}
                >
                  {formState === 'sending' ? (
                    <>
                      <span className="availability-dot" style={{ background: '#fff', animation: 'pulse 1s infinite' }} />
                      Sending...
                    </>
                  ) : formState === 'sent' ? 'Sent!' : 'Send Message'}
                </button>
              </form>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Aryan. Built with Next.js, TypeScript &amp; Vanilla CSS.</p>
            <button
              className="back-to-top-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to Top"
            >
              ▲
            </button>
          </footer>

        </div>
      </main>

      {/* ─── DYNAMIC SPECIFICATION DETAILS MODAL OVERLAY ─── */}
      <div
        className={`modal-overlay ${activeModalProject ? 'active' : ''}`}
        onClick={() => setActiveModalProject(null)}
      >
        {activeModalProject && (
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveModalProject(null)} aria-label="Close details">
              ✕
            </button>

            <header className="modal-header">
              <span className="modal-subtitle">
                {activeModalProject.category === 'web' ? 'WEB & APPLICATION' :
                  activeModalProject.category === 'ml' ? 'AI & MACHINE LEARNING' : '3D CREATIVE PIPELINE'} SPECIFICATION
              </span>
              <h2 className="modal-project-title">{activeModalProject.title}</h2>
            </header>

            <div className="modal-body">
              <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.92rem', lineHeight: '1.6' }}>
                {activeModalProject.longDesc}
              </p>

              <h4 className="modal-section-title">Technical Accomplishments &amp; Features</h4>
              <ul className="modal-features-list">
                {activeModalProject.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <h4 className="modal-section-title">Core Technology Stack</h4>
              <div className="skills-grid" style={{ marginTop: '10px' }}>
                {activeModalProject.tags.map(tag => (
                  <span className="skill-chip" key={tag} style={{ cursor: 'default' }}>{tag}</span>
                ))}
              </div>
            </div>

            <footer className="modal-footer">
              <a href={activeModalProject.liveLink} target="_blank" rel="noopener noreferrer" className="btn">
                Launch Live Demo
              </a>
              <a href={activeModalProject.gitLink} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                View Source Code
              </a>
            </footer>
          </div>
        )}
      </div>
    </>
  );
}


