import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './App.css';
import logoImg from './assets/logo.png';
import profileImg from './assets/dexterprofile.png';

/* Resume file served from the /public folder — Vite/CRA expose everything in
   /public at the site root, so this resolves to /Nanda_Kumar_Executive_Resume.docx */
const RESUME_FILE = '/Nanda_Kumar_Executive_Resume.docx';
const RESUME_FILE_NAME = 'Nanda_Kumar_Executive_Resume.docx';

/* ============================================================
   DATA
   ============================================================ */

const THEMES = [
  { id: 'executive-blue', label: 'Executive Blue', swatch: '#1E40AF' },
  { id: 'dark-executive', label: 'Dark Executive', swatch: '#3B82F6' },
  { id: 'emerald-energy', label: 'Emerald Energy', swatch: '#15803D' },
  { id: 'black-gold', label: 'Premium Black Gold', swatch: '#D4AF37' },
];

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'industries', label: 'Industries' },
  { id: 'career', label: 'Career' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

const HERO_STATS = [
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '%+', label: 'Target Achievement' },
  { value: 30, suffix: '+', label: 'Countries' },
  { value: 15, suffix: '+', label: 'Top Companies,TOP500' },
];

const TIMELINE = [
  { year: '2016', role: 'Machanical Engineer', company: 'Donper Comperssor Ltd,CO.', note: 'Refrigeration Machanical Engineer worked in R&D depts,work with Brazil R&D team.' },
  { year: '2018', role: 'Field Application Engineer', company: 'Donper Comperssor Ltd,CO.', note: 'Serve for South Asia customers,indlucing BOSCH, Liebherr，Haier，Midea, Panasonic.etc.' },
  { year: '2019', role: 'Sales Manager', company: 'Market Union Group', note: 'Leading Europe trading project,learing rapidly in the TOP10 Chinese trading company.' },
  { year: '2021', role: 'Senior Sales Manager', company: 'SPELAB Auto Parts Ltd,CO.', note: 'Research in aftersales auto parts filed, improving quarterly sales by 20%.' },
  { year: '2023', role: 'Senior Project Manager', company: 'SREAL Exchange Heater Ltd,CO.', note: 'Leading the KA projects, work with AirLiquid, Siemens, AirProducts, Ingersoll Rand.ect.' },
  { year: '2026', role: 'Senior Deputy Manager', company: 'China GUOMAO Group', note: 'Headed Sales Support for 30+ distributors,focus in South Africa Market, cut receivables by 15%.' },
  ];

/* Industries worked across — each maps to a distinct chapter of the career */
const INDUSTRIES = [
  {
    slug: 'printing-imaging',
    icon: 'printer',
    title: 'Refrigeration Industry',
    years: '2016 — 2019 · 3+ Yrs',
    note: 'Started to work as an engineer,grew in R&D.Then serve the market,connected with South Asia Market. Travelled India, Bangaladesh, Pakistan, Indoneisa, Vietnam, Thailand, Australia and so on.Served.Work with BOSCH, Liebherr，Haier，Midea, Panasonic, Polytron(India), Walton(Bangladesh), Videocon(India).etc. ', 
  },
  {
    slug: 'energy-ev',
    icon: 'energy',
    title: 'Comestic and Auto Parts Industry',
    years: '2019 — 2023 · 5+ Yrs',
    note: 'Established stable private and business relationships with many customers ,improved skills via cooperation and connecting with customers .',
  },
     {
    slug: 'energy-ev',
    icon: 'energy',
    title: 'Energy Industry',
    years: '2023 — 2026 · 3+ Yrs',
    note: 'Focus on KEY customers. Leading energy equipments projects with huge TOP5 companies.Work with AirLiquide, Siemens Energy, Air Products, Linde, IngerSoll Rand.ect.',
  },
];

const CAREER = [
  {
    slug: 'enzolt-energy',
    company: 'China International Trading Supply Chain Ltd,Co Pvt. Ltd.',
    initials: 'EE',
    role: 'Business Development Manager',
    years: 'May 2026 — Present',
    location: 'Chennai',
    summary: 'Leading channel sales strategy for solar and energy solutions, building a fresh dealer-distributor network from the ground up in India’s clean-energy transition.',
    achievements: [
      'Appointed and activated a multi-city dealer network within the first month',
      'Owning annual targets end-to-end: pipeline, funnel, corrective action',
      'Designed dealer incentive schemes to drive channel engagement',
    ],
    tech: ['Channel Strategy', 'B2B & B2C', 'Market Mapping', 'MIS Reporting'],
  },
  {
    slug: 'fujifilm-regional-sales-manager',
    company: 'Fujifilm India Pvt. Ltd.',
    initials: 'FJ',
    role: 'Regional Business Development Manager',
    years: 'Apr 2017 — Dec 2022',
    location: 'Chennai',
    summary: 'Owned South India’s channel P&L — from distributor relationships to territory strategy — sustaining 100%+ quota delivery across the region.',
    achievements: [
      'Consistently converted prospects into long-term, high-value accounts',
      'Ran store audits & sales training to lift dealer sell-through',
      'Optimized regional budget for maximum promotional ROI',
    ],
    tech: ['Territory Strategy', 'Key Accounts', 'Budget Ownership', 'Negotiation'],
  },
  {
    slug: 'fujifilm-head-sales-support',
    company: 'Fujifilm India Pvt. Ltd.',
    initials: 'FJ',
    role: 'Head — Sales Support (Deputy Manager)',
    years: 'Apr 2015 — Mar 2017',
    location: 'Chennai',
    summary: 'Bridged field sales and operations for 50+ distributors PAN-India, engineering process gains that protected cash flow and inventory accuracy.',
    achievements: [
      'Tradeshows & roadshows lifted qualified leads by 25%',
      'Reduced receivables by 15% and billing errors by 18%',
      'Maintained 98% inventory accuracy across South India',
    ],
    tech: ['SAP SD', 'Credit Control', 'Channel Onboarding', 'Stock Planning'],
  },
  {
    slug: 'fujifilm-sales-coordinator',
    company: 'Fujifilm India Pvt. Ltd.',
    initials: 'FJ',
    role: 'Sales Coordinator — Senior Executive',
    years: 'Apr 2009 — Mar 2015',
    location: 'Chennai',
    summary: 'Rose through three coordination roles, becoming the trusted link between PAN-India distributors, MIS reporting, and senior leadership.',
    achievements: [
      'Improved quarterly sales performance by 10% via SAP analytics',
      'Handled billing accuracy for 100+ distributor accounts',
      'Central escalation point, lifting partner retention',
    ],
    tech: ['SAP MIS', 'Pricing & Credit Notes', 'Escalation Management'],
  },
  {
    slug: 'em-sons-imaging',
    company: 'Em Sons Imaging Pvt. Ltd.',
    initials: 'ES',
    role: 'Sales & Service Engineer',
    years: 'Apr 2007 — Mar 2009',
    location: 'Chennai',
    summary: 'Transitioned into client-facing technical sales and service operations, delivering equipment demonstrations, SLA compliance, and customer relationship management.',
    achievements: [
      'Resolved 90% of customer technical issues within SLA timelines',
      'Handled client account onboarding and technical support across South region',
      'Built early foundations in technical selling and direct account ownership',
    ],
    tech: ['Technical Sales', 'SLA Resolution', 'Client Support', 'Account Management'],
  },
  {
    slug: 'digital-photo-supply',
    company: 'Digital Photo Supply',
    initials: 'DP',
    role: 'Technical Engineer',
    years: 'Jun 2004 — Mar 2007',
    location: 'Chennai',
    summary: 'Foundational technical role managing installation, maintenance, technical analysis, and troubleshooting for minilab photofinishing machinery.',
    achievements: [
      'Installed, serviced, and maintained minilab hardware across client accounts',
      'Managed daily billing systems and inventory management with high precision',
      'Established core technical diagnostics and equipment maintenance skillset',
    ],
    tech: ['Technical Analysis', 'Equipment Maintenance', 'Billing Systems', 'Diagnostics'],
  },
];

const EDUCATION = [

  {
    degree: 'Bachelor of Machanical Design and Application ',
    institution: 'Hubei Polytechnic University ',
    year: '2012',
  },

];

const METRICS = [
  { value: 19, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '+%', label: 'Target Achievement' },
  { value: 50, suffix: '+', label: 'Dealer Network' },
  { value: 25, suffix: '%', label: 'Lead Generation Growth' },
  { value: 20, suffix: '%', label: 'Customer Inquiry Growth' },
  { value: 15, suffix: '%', label: 'Receivable Reduction' },
];

const EXPERTISE = [
  'Field Sales', 'Business Development', 'Dealer Appointment', 'Channel Expansion',
  'Marketing', 'Key Account Management', 'B2B Sales', 'Retail Sales',
  'Distribution Strategy', 'Sales Leadership', 'Technical Analysis', 'SOP', 'CRM','6 SEGMA'
  'Advanced Excel', 'Negotiation', 'Forecasting', 'Relationship Building', 'Market Expansion',
];

const SKILL_GROUPS = [
  {
    title: 'Business Skills',
    icon: 'briefcase',
    skills: [
      { name: 'Channel Development', value: 98 },
      { name: 'Distributor Management', value: 96 },
      { name: 'B2B Sales', value: 95 },
      { name: 'Marketing', value: 93 },
    ],
  },
  {
    title: 'Leadership Skills',
    icon: 'compass',
    skills: [
      { name: 'Team Leadership', value: 95 },
      { name: 'Negotiation', value: 97 },
      { name: 'Strategic Planning', value: 94 },
      { name: 'Mentoring & Training', value: 92 },
    ],
  },
  {
    title: 'Technical Skills',
    icon: 'chip',
    skills: [
      { name: 'SOP', value: 90 },
      { name: 'CRM Systems', value: 92 },
      { name: 'Advanced Excel', value: 94 },
      { name: 'Technical Analysis', value: 93 },
    ],
  },
];

const ACHIEVEMENTS = [
  { value: '100%+', label: 'Target Achievement', note: 'Sustained across 13+ years at Fujifilm India through active channel engagement.', big: true },
  { value: '50+', label: 'Distributors', note: 'Built and maintained PAN-India as Head of Sales Support.' },
  { value: '25%', label: 'Lead Growth', note: 'From tradeshows, roadshows & regional marketing events.' },
  { value: '20%', label: 'Customer Growth', note: 'Through targeted promotional campaigns & dealer meets.' },
  { value: '15%', label: 'Receivables Cut', note: 'Via SAP-based credit control and MIS optimization.' },
  { value: '95%', label: 'Escalations Resolved', note: 'Within 48 hours — protecting partner retention.' },
];

const DIFFERENTIATORS = [
  { title: 'Strategic Thinking', note: 'Reads markets ahead of the curve and turns insight into territory plans.' },
  { title: 'People Leadership', note: 'Builds field teams that hit targets and stay motivated doing it.' },
  { title: 'Channel Expansion', note: 'A proven hand at appointing and activating dealer networks fast.' },
  { title: 'Market Intelligence', note: 'Competitive analysis that sharpens positioning, not just reports it.' },
  { title: 'Negotiation', note: 'Closes high-value accounts while protecting long-term margins.' },
  { title: 'Business Ownership', note: 'Ran an independent venture — thinks and acts like an owner, not a hire.' },
  { title: 'Problem Solving', note: 'Resolves distributor & customer escalations before they become churn.' },
];

const CONTACT_INFO = [
  { label: 'Phone', value: '+86 176 6504 5566', href: 'tel:+8617665045566', icon: 'phone' },
  { label: 'Email', value: 'dexter0714@foxmail.com', href: 'mailto:dexter0714@foxmail.com', icon: 'mail' },
  { label: 'LinkedIn', value: 'dextertrader', href: 'https://linkedin.com/in/dextertrader', icon: 'linkedin' },
  { label: 'Location', value: 'Yiwu,Zhejiang,CN', href: null, icon: 'pin' },
  { label: 'Availability', value: 'Available in 30 Days', href: null, icon: 'clock' },
];

/* ============================================================
   ICONS (inline SVG, no libraries)
   ============================================================ */

const Icon = ({ name, size = 20 }) => {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'phone': return <svg {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
    case 'mail': return <svg {...p}><path d="M4 4h16v16H4z" /><path d="m22 6-10 7L2 6" /></svg>;
    case 'linkedin': return <svg {...p}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>;
    case 'pin': return <svg {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;
    case 'clock': return <svg {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>;
    case 'briefcase': return <svg {...p}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>;
    case 'compass': return <svg {...p}><circle cx="12" cy="12" r="10" /><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z" /></svg>;
    case 'chip': return <svg {...p}><rect x="6" y="6" width="12" height="12" rx="1" /><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" /></svg>;
    case 'printer': return <svg {...p}><path d="M6 9V2h12v7" /><rect x="4" y="9" width="16" height="8" rx="1" /><path d="M6 17h12v5H6z" /></svg>;
    case 'energy': return <svg {...p}><path d="M13 2 4 14h6l-1 8 9-12h-6z" /></svg>;
    case 'education': return <svg {...p}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 6 3 6 3s6-1 6-3v-5" /></svg>;
    case 'menu': return <svg {...p}><path d="M3 12h18M3 6h18M3 18h18" /></svg>;
    case 'close': return <svg {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>;
    case 'download': return <svg {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5M12 15V3" /></svg>;
    case 'arrow': return <svg {...p}><path d="M5 12h14M13 5l7 7-7 7" /></svg>;
    case 'sun': return <svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>;
    default: return null;
  }
};

/* ============================================================
   HOOKS
   ============================================================ */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .counter, .bar-fill');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function Counter({ target, suffix = '', duration = 1600 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const start = performance.now();
            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setVal(Math.round(target * eased));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);
  return <span ref={ref} className="counter-value">{val}{suffix}</span>;
}

function ProgressBar({ name, value }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.setProperty('--target-width', `${value}%`);
            el.classList.add('animate');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);
  return (
    <div className="skill-row">
      <div className="skill-row-head">
        <span>{name}</span>
        <span className="skill-value">{value}%</span>
      </div>
      <div className="bar-track">
        <div ref={ref} className="bar-fill" />
      </div>
    </div>
  );
}

/* ============================================================
   MAIN APP
   ============================================================ */

export default function App() {
  const [theme, setTheme] = useState('executive-blue');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [themePickerOpen, setThemePickerOpen] = useState(false);
  const glowRef = useRef(null);
  const heroRef = useRef(null);

  const navIds = useMemo(() => NAV_LINKS.map((n) => n.id), []);
  const active = useActiveSection(navIds);
  useReveal();

  useEffect(() => {
    const stored = window.localStorage ? localStorage.getItem('nk-theme') : null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('nk-theme', theme); } catch (e) { /* noop */ }
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!glowRef.current) return;
    glowRef.current.style.setProperty('--mx', `${e.clientX}px`);
    glowRef.current.style.setProperty('--my', `${e.clientY}px`);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = RESUME_FILE;
    link.download = RESUME_FILE_NAME;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app" onMouseMove={onMouseMove}>
      <div ref={glowRef} className="mouse-glow" aria-hidden="true" />

      {/* NAVBAR */}
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <a href="#home" className="brand" onClick={(e) => { e.preventDefault(); scrollTo('home'); }} aria-label="Dexter, home">
            <span className="brand-mark">
              <img src={logoImg} alt="Dexter logo" className="brand-logo" />
            </span>
            <span className="brand-text">
              <span className="brand-name">Dexter</span>
              <span className="brand-role">Business Development Manager · Business Development</span>
            </span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                className={`nav-link ${active === link.id ? 'active' : ''}`}
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="navbar-actions">
            <div className="theme-switch">
              <button
                className="theme-trigger"
                onClick={() => setThemePickerOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={themePickerOpen}
                aria-label="Choose theme"
              >
                <Icon name="sun" size={17} />
                <span className="theme-dot" style={{ background: THEMES.find(t => t.id === theme)?.swatch }} />
              </button>
              {themePickerOpen && (
                <div className="theme-menu" role="menu">
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      role="menuitem"
                      className={`theme-option ${theme === t.id ? 'selected' : ''}`}
                      onClick={() => { setTheme(t.id); setThemePickerOpen(false); }}
                    >
                      <span className="theme-swatch" style={{ background: t.swatch }} />
                      {t.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="hamburger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            {NAV_LINKS.map((link) => (
              <button key={link.id} className={`mobile-link ${active === link.id ? 'active' : ''}`} onClick={() => scrollTo(link.id)}>
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main>
        {/* HERO */}
        <section id="home" className="hero" ref={heroRef}>
          <div className="hero-bg" aria-hidden="true">
            <span className="blob blob-1" />
            <span className="blob blob-2" />
            <span className="blob blob-3" />
            <span className="grid-overlay" />
          </div>

          <div className="hero-inner">
            <div className="hero-left reveal fade-right">
              <span className="badge">Currently Business Development Manager at China International Trading Supply Chain Ltd,Co</span>
              <h1 className="hero-heading">
                <span className="gradient-text">Dexter</span>
              </h1>
              <p className="hero-subheading">Business Development Manager · Channel Development · Business Growth Strategist</p>
              <p className="hero-summary">
                A Senior sales &amp; channel leader with <strong>19+ years</strong> of B2B techno-sales experience in the <strong>Image Printing Industry</strong> — including <strong>13+ years</strong> inside a leading Japanese MNC — building dealer-distributor networks that scale. In 2026, made a deliberate move into the <strong>Energy &amp; EV</strong> sector to help lead India's clean-energy transition, now driving <strong>channel strategy, network expansion and field sales leadership</strong> at China International Trading Supply Chain Ltd,Co.
              </p>

              <div className="hero-cta">
                <button className="btn btn-primary magnetic" onClick={handleDownloadResume}>
                  <Icon name="download" size={18} /> Download Resume
                </button>
                <button className="btn btn-ghost magnetic" onClick={() => scrollTo('contact')}>
                  Contact Me <Icon name="arrow" size={16} />
                </button>
              </div>
            </div>

            <div className="hero-right reveal fade-left">
              <div className="profile-card glass">
                <div className="profile-head">
                  <div className="profile-avatar">RN</div>
                  <div>
                    <p className="profile-name">Dexter</p>
                    <p className="profile-tag">Sales &amp; Channel Management Leader</p>
                  </div>
                </div>
                <ul className="profile-list">
                  <li><span>Experience</span><strong>10+ Years</strong></li>
                  <li><span>Current Company</span><strong>China International Trading Supply Chain Ltd,Co</strong></li>
                  <li><span>Location</span><strong>Yiwu,Zhejiang,China</strong></li>
                  <li><span>Phone</span><strong>+86 176 6504 5566</strong></li>
                  <li><span>Email</span><strong className="truncate">dexter0714@foxmail.com</strong></li>
                  <li><span>LinkedIn</span><strong>dextertrader</strong></li>
                  <li><span>Availability</span><strong className="available">Available in 30 Days</strong></li>
                </ul>

                <div className="profile-stats">
                  {HERO_STATS.map((s) => (
                    <div className="mini-stat" key={s.label}>
                      <span className="mini-stat-value"><Counter target={s.value} suffix={s.suffix} /></span>
                      <span className="mini-stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="scroll-indicator" aria-hidden="true"><span /></div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section about">
          <div className="section-inner">
            <div className="about-grid">
              <div className="about-text reveal fade-right">
                <p className="eyebrow">About</p>
                <h2 className="section-title">Driving Revenue Through Relationships</h2>
                <p className="section-lead">
                  What started as a technical role installing photo-lab equipment in 2004 grew, over two
                  decades, into a career built on one idea: revenue follows relationships. Thirteen-plus
                  years inside Fujifilm India taught the discipline of channel management at scale — dealer
                  onboarding, territory planning, SAP-driven forecasting — while an independent venture in
                  imaging solutions (2022–2026) sharpened business ownership and P&amp;L accountability. That
                  foundation now powers a deliberate second act: leading channel sales for China International Trading Supply Chain Ltd,Co in
                  India's fast-growing energy and EV market. Click any item below to view Career Highlights.
                </p>
              </div>

              <div className="about-image-wrap reveal fade-left">
                <div className="about-image-card glass">
                  <img src={profileImg} alt="Dexter Profile" className="about-img" />
                </div>
              </div>
            </div>

            <div className="timeline">
              {TIMELINE.map((t, i) => (
                <div className={`timeline-item reveal ${i % 2 === 0 ? 'fade-right' : 'fade-left'}`} key={t.year + t.role}>
                  <div className="timeline-marker">
                    <span className={`timeline-dot ${t.current ? 'current' : ''}`} />
                  </div>
                  <div
                    className="timeline-content glass clickable"
                    role="button"
                    tabIndex={0}
                    onClick={() => scrollTo('career')}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollTo('career'); } }}
                    title="Go to Career Highlights"
                  >
                    <span className="timeline-year">{t.year}</span>
                    <h3>{t.role}</h3>
                    <p className="timeline-company">{t.company}</p>
                    <p className="timeline-note">{t.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INDUSTRY EXPERIENCE */}
        <section id="industries" className="section industries">
          <div className="section-inner">
            <p className="eyebrow reveal fade-up">Industry Experience</p>
            <h2 className="section-title reveal fade-up">Industries I've Worked In</h2>
            <p className="section-lead reveal fade-up">
              Two distinct categories, one transferable playbook: build the channel, back the dealer, own the number.
            </p>

            <div className="industries-grid">
              {INDUSTRIES.map((ind) => (
                <div
                  className="industry-card glass clickable reveal fade-up"
                  key={ind.slug}
                  role="button"
                  tabIndex={0}
                  onClick={() => scrollTo('career')}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollTo('career'); } }}
                >
                  <span className="industry-icon"><Icon name={ind.icon} size={22} /></span>
                  <span className="industry-years">{ind.years}</span>
                  <h3>{ind.title}</h3>
                  <p>{ind.note}</p>
                  <span className="career-card-hint">
                    Go to Career Highlights <Icon name="arrow" size={14} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAREER HIGHLIGHTS */}
        <section id="career" className="section career">
          <div className="section-inner">
            <p className="eyebrow reveal fade-up">Career</p>
            <h2 className="section-title reveal fade-up">Career Highlights</h2>
            <p className="section-lead reveal fade-up">Two decades of channel leadership and technical expertise across two industries, one operating philosophy.</p>

            <div className="career-grid">
              {CAREER.map((c) => (
                <article className="career-card glass tilt reveal fade-up" key={c.slug}>
                  <div className="career-card-head">
                    <div className="company-logo">{c.initials}</div>
                    <div>
                      <h3>{c.role}</h3>
                      <p className="career-company">{c.company}</p>
                    </div>
                  </div>
                  <div className="career-meta">
                    <span>{c.years}</span>
                    <span>{c.location}</span>
                  </div>
                  <p className="career-summary">{c.summary}</p>
                  <ul className="career-achievements">
                    {c.achievements.map((a) => <li key={a}>{a}</li>)}
                  </ul>
                  <div className="career-tags">
                    {c.tech.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION & QUALIFICATIONS */}
        <section id="education" className="section education">
          <div className="section-inner">
            <p className="eyebrow reveal fade-up">Education</p>
            <h2 className="section-title reveal fade-up">Education &amp; Qualifications</h2>
            <p className="section-lead reveal fade-up">Strong academic foundation bridging technical skills, computer applications, and business administration.</p>

            <div className="education-grid">
              {EDUCATION.map((edu, idx) => (
                <div className="education-card glass reveal fade-up" key={edu.degree} style={{ transitionDelay: `${idx * 80}ms` }}>
                  <div className="education-icon">
                    <Icon name="education" size={24} />
                  </div>
                  <div className="education-content">
                    <span className="education-year">{edu.year}</span>
                    <h3>{edu.degree}</h3>
                    <p className="education-institution">{edu.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KEY METRICS */}
        <section className="section metrics">
          <div className="section-inner">
            <p className="eyebrow reveal fade-up">By The Numbers</p>
            <h2 className="section-title reveal fade-up">Key Metrics</h2>
            <div className="metrics-grid">
              {METRICS.map((m) => (
                <div className="metric-card glass reveal fade-up" key={m.label}>
                  <span className="metric-value"><Counter target={m.value} suffix={m.suffix} /></span>
                  <span className="metric-label">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CORE EXPERTISE */}
        <section className="section expertise">
          <div className="section-inner">
            <p className="eyebrow reveal fade-up">Core Expertise</p>
            <h2 className="section-title reveal fade-up">Where I Create Value</h2>
            <div className="expertise-grid">
              {EXPERTISE.map((e, i) => (
                <div
                  className="expertise-chip glass clickable reveal fade-up"
                  style={{ transitionDelay: `${(i % 6) * 40}ms` }}
                  key={e}
                  onClick={() => scrollTo('career')}
                >
                  {e}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section skills">
          <div className="section-inner">
            <p className="eyebrow reveal fade-up">Skills</p>
            <h2 className="section-title reveal fade-up">Capability Breakdown</h2>
            <div className="skills-grid">
              {SKILL_GROUPS.map((g) => (
                <div
                  className="skill-card glass clickable reveal fade-up"
                  key={g.title}
                  onClick={() => scrollTo('career')}
                >
                  <div className="skill-card-head">
                    <span className="skill-icon"><Icon name={g.icon} size={20} /></span>
                    <h3>{g.title}</h3>
                  </div>
                  {g.skills.map((s) => <ProgressBar key={s.name} name={s.name} value={s.value} />)}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section id="achievements" className="section achievements">
          <div className="section-inner">
            <p className="eyebrow reveal fade-up">Achievements</p>
            <h2 className="section-title reveal fade-up">Proof, Not Promises</h2>
            <div className="bento">
              {ACHIEVEMENTS.map((a) => (
                <div className={`bento-card glass reveal fade-up ${a.big ? 'bento-big' : ''}`} key={a.label}>
                  <span className="bento-value">{a.value}</span>
                  <span className="bento-label">{a.label}</span>
                  <p className="bento-note">{a.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DIFFERENTIATORS */}
        <section className="section differentiators">
          <div className="section-inner">
            <p className="eyebrow reveal fade-up">What Makes Me Different</p>
            <h2 className="section-title reveal fade-up">Beyond The Resume</h2>
            <div className="diff-grid">
              {DIFFERENTIATORS.map((d) => (
                <div className="diff-card reveal fade-up" key={d.title}>
                  <h3>{d.title}</h3>
                  <p>{d.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HIRING MANAGER / DARK CTA */}
        <section className="section hiring">
          <div className="section-inner">
            <p className="eyebrow light reveal fade-up">For Hiring Managers</p>
            <h2 className="section-title light reveal fade-up">Why Hire Me?</h2>
            <div className="hiring-grid">
              <div className="hiring-col reveal fade-up">
                <h3>Revenue Growth</h3>
                <p>100%+ target achievement sustained across 13+ years — not a single quarter, a career pattern.</p>
              </div>
              <div className="hiring-col reveal fade-up">
                <h3>Dealer Network Expansion</h3>
                <p>Built and activated 50+ distributor relationships PAN-India, and did it again from zero at Enzolt.</p>
              </div>
              <div className="hiring-col reveal fade-up">
                <h3>Leadership Excellence</h3>
                <p>Hired, mentored and led field sales teams to consistent, on-ground execution.</p>
              </div>
            </div>

            <div className="hiring-cta reveal fade-up">
              <h3>Let's Build Business Together</h3>
              <div className="hero-cta">
                <button className="btn btn-primary magnetic" onClick={() => scrollTo('contact')}>
                  Schedule Discussion <Icon name="arrow" size={16} />
                </button>
                <button className="btn btn-outline-light magnetic" onClick={handleDownloadResume}>
                  <Icon name="download" size={18} /> Download Resume
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section contact">
          <div className="section-inner">
            <p className="eyebrow reveal fade-up">Contact</p>
            <h2 className="section-title reveal fade-up">Let's Start The Conversation</h2>
            <p className="section-lead reveal fade-up">Immediately available and open to Business Development Manager &amp; Channel Development roles in Chennai, Dubai and the wider Middle East.</p>

            <div className="contact-grid">
              {CONTACT_INFO.map((c) => (
                <div className="contact-card glass reveal fade-up" key={c.label}>
                  <span className="contact-icon"><Icon name={c.icon} size={20} /></span>
                  <span className="contact-label">{c.label}</span>
                  {c.href ? <a className="contact-value" href={c.href} target={c.icon === 'linkedin' ? '_blank' : undefined} rel="noreferrer">{c.value}</a> : <span className="contact-value">{c.value}</span>}
                </div>
              ))}
            </div>

            <div className="contact-actions reveal fade-up">
              <a className="btn btn-primary magnetic" href="tel:+919791067951"><Icon name="phone" size={17} /> Call</a>
              <a className="btn btn-secondary magnetic" href="mailto:erpnanda@gmail.com"><Icon name="mail" size={17} /> Email</a>
              <a className="btn btn-ghost magnetic" href="https://linkedin.com/in/nanda-kumar-ababbb81" target="_blank" rel="noreferrer"><Icon name="linkedin" size={17} /> LinkedIn</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <p className="footer-name">Dexter</p>
            <p className="footer-role">Business Development Manager · Business Development</p>
          </div>
          <div className="footer-social">
            <a href="tel:+919791067951" aria-label="Call"><Icon name="phone" size={17} /></a>
            <a href="mailto:erpnanda@gmail.com" aria-label="Email"><Icon name="mail" size={17} /></a>
            <a href="https://linkedin.com/in/nanda-kumar-ababbb81" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" size={17} /></a>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} Dexter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
