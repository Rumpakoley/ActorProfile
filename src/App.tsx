import React, { useState, useEffect } from 'react';
import { 
  personalDetails, 
  bioSummary, 
  actorProjects, 
  coachProjects, 
  skillsList, 
  otherWorkList, 
  voiceReels, 
  AIISPartner, 
  portraitGallery 
} from './data';
import { 
  ActorProject, 
  DialectCoachProject, 
  VoiceDemo 
} from './types';
import { 
  motion, 
  AnimatePresence 
} from 'motion/react';
import { 
  User, 
  Film, 
  Mic, 
  Mail, 
  Phone, 
  Instagram, 
  CheckCircle, 
  MapPin, 
  Sparkles, 
  Award, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ClipboardCopy, 
  ArrowRight, 
  Layers, 
  Search, 
  TrendingUp, 
  Send,
  Sliders,
  ChevronRight,
  Info
} from 'lucide-react';

export default function App() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'actor' | 'coach'>('actor');
  
  // Hero portrait archetype selector
  const [selectedArchetypeIndex, setSelectedArchetypeIndex] = useState<number>(0);
  
  // Search and filters for Acting Projects
  const [actingSearchQuery, setActingSearchQuery] = useState('');
  const [actingPlatformFilter, setActingPlatformFilter] = useState('All');
  
  // Search and filters for Coaching Projects
  const [coachSearchQuery, setCoachSearchQuery] = useState('');
  
  // Custom Voice Demo Player State
  const [activeReelIndex, setActiveReelIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSeconds, setPlaybackSeconds] = useState<number>(0);
  const [playbackVolume, setPlaybackVolume] = useState<number>(80);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [waveformBars, setWaveformBars] = useState<number[]>([]);

  // Sound effect / voice simulation helpers
  useEffect(() => {
    // Generate static visual waveform bars for selected reel
    const barsCount = 28;
    const initialBars = Array.from({ length: barsCount }, () => Math.floor(Math.random() * 60) + 10);
    setWaveformBars(initialBars);
    setPlaybackSeconds(0);
    setIsPlaying(false);
  }, [activeReelIndex]);

  // Handle active audio timer simulation
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackSeconds((prev) => {
          const maxSec = parseDurationToSeconds(voiceReels[activeReelIndex].duration);
          if (prev >= maxSec) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });

        // Randomize waveform bars slightly to show active pulses
        setWaveformBars((prevBars) => 
          prevBars.map((b) => Math.max(10, Math.min(100, b + (Math.random() * 30 - 15))))
        );
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeReelIndex]);

  // Convert duration string "M:SS" to number of seconds
  const parseDurationToSeconds = (durationStr: string): number => {
    const parts = durationStr.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    }
    return 60;
  };

  // Convert seconds to human representation "M:SS"
  const formatSeconds = (totalSec: number): string => {
    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Portfolio Booking form states
  const [bookingFormData, setBookingFormData] = useState({
    clientName: '',
    clientEmail: '',
    projectName: '',
    serviceType: 'Acting Audition',
    platformTarget: 'Netflix',
    estimatedBudget: 'Standard Industry Rate',
    messageDetails: ''
  });
  
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitted'>('idle');
  const [savedBookings, setSavedBookings] = useState<any[]>([]);

  // Load from local storage
  useEffect(() => {
    const stored = localStorage.getItem('husne_bookings');
    if (stored) {
      try {
        setSavedBookings(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Form submit handler
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingFormData.clientName || !bookingFormData.clientEmail || !bookingFormData.projectName) {
      alert("Please provide at least a name, email, and project name.");
      return;
    }

    const newBooking = {
      ...bookingFormData,
      id: "booking-" + Date.now(),
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'Awaiting Response / Review'
    };

    const updated = [newBooking, ...savedBookings];
    setSavedBookings(updated);
    localStorage.setItem('husne_bookings', JSON.stringify(updated));
    setBookingStatus('submitted');
  };

  // Form reset handler
  const resetForm = () => {
    setBookingFormData({
      clientName: '',
      clientEmail: '',
      projectName: '',
      serviceType: 'Acting Audition',
      platformTarget: 'Netflix',
      estimatedBudget: 'Standard Industry Rate',
      messageDetails: ''
    });
    setBookingStatus('idle');
  };

  // Copy status handler
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  // Filtering actor projects
  const filteredActorProjects = actorProjects.filter((proj) => {
    const matchesSearch = 
      proj.project.toLowerCase().includes(actingSearchQuery.toLowerCase()) || 
      proj.role.toLowerCase().includes(actingSearchQuery.toLowerCase()) || 
      proj.director.toLowerCase().includes(actingSearchQuery.toLowerCase());
    
    const matchesPlatform = actingPlatformFilter === 'All' || proj.platform === actingPlatformFilter;
    
    return matchesSearch && matchesPlatform;
  });

  // Filtering coach projects
  const filteredCoachProjects = coachProjects.filter((proj) => {
    const matchesSearch = 
      proj.project.toLowerCase().includes(coachSearchQuery.toLowerCase()) ||
      proj.dialectNotes.toLowerCase().includes(coachSearchQuery.toLowerCase()) ||
      proj.director.toLowerCase().includes(coachSearchQuery.toLowerCase()) ||
      proj.actorsCoached.some(actor => actor.toLowerCase().includes(coachSearchQuery.toLowerCase()));
    
    return matchesSearch;
  });

  // Headshots selector archetype click
  const handleArchetypeClick = (index: number) => {
    setSelectedArchetypeIndex(index);
  };

  return (
    <div className="relative min-h-screen bg-ink-black text-warm-beige noise-overlay selection:bg-sepia-beige selection:text-ink-black pb-20">
      
      {/* GLOWING AMBIENT BACKGROUND DECORATION */}
      <div className="absolute top-0 right-[10%] w-[35rem] h-[35rem] rounded-full bg-sepia-beige/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[5%] w-[40rem] h-[40rem] rounded-full bg-sepia-beige/3 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[30rem] h-[30rem] rounded-full bg-sepia-beige/4 blur-[110px] pointer-events-none" />

      {/* HEADER NAVIGATION */}
      <header id="nav-header" className="sticky top-0 z-50 bg-ink-black/90 backdrop-blur-md border-b border-warm-beige/10 py-5 px-6 md:px-12 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-none border border-sepia-beige flex items-center justify-center bg-sepia-beige/10">
              <span className="font-serif font-bold text-xs text-sepia-beige tracking-wider">HS</span>
            </div>
            <div>
              <h1 id="brand-title" className="font-serif text-lg tracking-[0.25em] font-black text-warm-beige uppercase">
                Husne Shabnam
              </h1>
              <p className="font-mono text-[9px] tracking-widest text-[#F5F5F5]/40 uppercase mt-[2px]">
                Equity / Cine Artist • Bengali Dialect Specialist
              </p>
            </div>
          </div>

          {/* DUAL PILLAR TOGGLE CONTROLLER */}
          <div id="pillar-toggles" className="flex items-center bg-[#111] p-1 rounded-none border border-warm-beige/10">
            <button 
              id="btn-tab-actor"
              onClick={() => setActiveTab('actor')}
              className={`px-6 py-2 rounded-none text-[10px] font-mono tracking-widest uppercase transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'actor' 
                  ? 'bg-sepia-beige text-ink-black font-bold shadow-md' 
                  : 'text-warm-beige/60 hover:text-warm-beige hover:bg-warm-beige/5'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              The Actor
            </button>
            <button 
              id="btn-tab-coach"
              onClick={() => setActiveTab('coach')}
              className={`px-6 py-2 rounded-none text-[10px] font-mono tracking-widest uppercase transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'coach' 
                  ? 'bg-sepia-beige text-ink-black font-bold shadow-md' 
                  : 'text-warm-beige/60 hover:text-warm-beige hover:bg-warm-beige/5'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              Dialect Coach
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION WITH ARCHETYPE SWITCHER */}
      <section id="hero-display" className="max-w-7xl mx-auto px-4 md:px-12 pt-12 pb-20 relative overflow-hidden">
        {/* Massive Background Typography Watermark */}
        <div className="absolute top-1/2 left-4 -translate-y-1/2 z-0 opacity-5 pointer-events-none select-none">
          <h1 className="display-bg-name italic text-warm-beige">SHABNAM</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
          
          {/* LEFT COLUMN: INTERACTIVE LOOKBOOK HEADSHOT FRAME */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div id="portrait-wrapper" className="relative group w-full max-w-sm aspect-[3/4] rounded-none overflow-hidden border border-warm-beige/10 shadow-2xl bg-charcoal-medium">
              
              {/* IMAGE SHOWCASE */}
              <AnimatePresence mode="wait">
                <motion.img 
                  key={selectedArchetypeIndex}
                  src={portraitGallery[selectedArchetypeIndex].imagePath}
                  alt={portraitGallery[selectedArchetypeIndex].title}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover grayscale transition-all duration-700"
                />
              </AnimatePresence>

              {/* OVERLAY BADGE */}
              <div className="absolute top-4 left-4 bg-ink-black/90 backdrop-blur-md border border-sepia-beige/30 px-3 py-1.5 rounded-none font-mono text-[10px] uppercase tracking-wider text-sepia-beige flex items-center gap-1.5 font-bold">
                <Sparkles className="w-3 h-3 animate-spin duration-3000 text-sepia-beige" />
                Archetype: {portraitGallery[selectedArchetypeIndex].category}
              </div>

              {/* BRIEF IMAGE CAPTION */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink-black via-ink-black/80 to-transparent p-6 pt-16">
                <span className="font-mono text-xs text-sepia-beige tracking-wider uppercase font-bold">
                  {portraitGallery[selectedArchetypeIndex].title}
                </span>
                <p className="text-xs text-warm-beige/70 mt-1 line-clamp-2 italic font-serif">
                  {portraitGallery[selectedArchetypeIndex].description}
                </p>
              </div>
            </div>

            {/* SELECTION GALLERY THUMBNAILS - Sizing matches 3:4 Aspect ratio */}
            <div id="gallery-anchors" className="grid grid-cols-4 gap-2 w-full max-w-sm mt-3">
              {portraitGallery.map((p, idx) => (
                <button
                  key={p.category}
                  id={`btn-archetype-${idx}`}
                  onClick={() => handleArchetypeClick(idx)}
                  className={`relative aspect-[3/4] rounded-none overflow-hidden border transition-all ${
                    selectedArchetypeIndex === idx 
                      ? 'border-sepia-beige ring-2 ring-sepia-beige/40 scale-[1.02]' 
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                  title={`View ${p.title}`}
                >
                  <img 
                    src={p.imagePath} 
                    alt={p.category} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-ink-black/30 flex items-end justify-center pb-1">
                    <span className="font-mono text-[9px] tracking-tighter uppercase font-bold text-white truncate px-1 text-center bg-black/60 rounded-none w-11/12">
                      {p.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: CORE METADATA & STATEMENT */}
          <div className="lg:col-span-7 flex flex-col justify-end">
            <div className="mb-8">
              <span className="text-sepia-beige text-xs uppercase tracking-[0.35em] font-extrabold block mb-4">
                {activeTab === 'actor' ? 'Leading Dame | Screen & Stage' : 'Bengali Dialect Coach | Industry Elite'}
              </span>
              <h1 className="display-name text-warm-beige">
                HUSNE<br/><span className="italic font-serif font-black">SHABNAM</span>
              </h1>
            </div>

            {/* HIGHLIGHT STICKER CHIPS */}
            <div className="flex flex-wrap gap-2 pt-1 mb-6">
              <span className="px-3 py-1.5 rounded-none bg-charcoal-medium border border-warm-beige/10 font-mono text-xs text-warm-beige/85 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sepia-beige" />
                Mumbai / West Bengal
              </span>
              <span className="px-3 py-1.5 rounded-none bg-charcoal-medium border border-warm-beige/10 font-mono text-xs text-warm-beige/85">
                10+ Years Theatre Experience
              </span>
              <span className="px-3 py-1.5 rounded-none bg-charcoal-medium border border-warm-beige/10 font-mono text-xs text-warm-beige/85">
                5 Languages
              </span>
            </div>

            {/* PHYSICAL AND CASTING FACTS PANEL */}
            <div id="specs-card" className="bg-charcoal-medium/30 rounded-none p-5 border border-warm-beige/10 grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <span className="font-mono text-[10px] uppercase text-warm-beige/40 block">Height</span>
                <span className="font-serif text-lg font-bold text-white">{personalDetails.height}</span>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-warm-beige/40 block">Weight</span>
                <span className="font-serif text-lg font-bold text-white">{personalDetails.weight}</span>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-warm-beige/40 block">Casting Age Range</span>
                <span className="font-serif text-lg font-bold text-white">25 – 35 Years</span>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-warm-beige/40 block font-bold">Speciality Dialect</span>
                <span className="font-serif text-base font-bold text-sepia-beige">Bengali • East Bengal</span>
              </div>
            </div>

            <p className="text-base leading-relaxed text-warm-beige/80 mb-8 max-w-xl">
              {activeTab === 'actor' ? bioSummary.actorProfile : bioSummary.coachProfile}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a 
                href="#booking-anchor" 
                className="px-6 py-4 bg-sepia-beige text-ink-black font-bold rounded-none hover:bg-sepia-beige/90 transition-all font-mono text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2"
              >
                Request Casting / Consultation
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button 
                id="btn-copy-email-hero"
                onClick={() => copyToClipboard('husneshabnam.connect@gmail.com', 'email')}
                className="px-6 py-4 border border-warm-beige/20 bg-charcoal-medium hover:bg-warm-beige/5 text-warm-beige/90 rounded-none transition-all font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <ClipboardCopy className="w-3.5 h-3.5" />
                {copiedText === 'email' ? 'Copied Email Address!' : 'Copy Direct Contact Email'}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* DWELL PILLAR COMPONENT CONTAINER */}
      <main id="main-portfolio-content" className="max-w-7xl mx-auto px-4 md:px-12 py-6">
        <AnimatePresence mode="wait">
          
          {/* THE ACTOR PILLAR LAYOUT */}
          {activeTab === 'actor' && (
            <motion.div
              key="actor-pillar"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* CORE DETAILS ROW */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* APPROACH AND ETHOS CARD */}
                <div id="actor-philosophy" className="lg:col-span-2 bg-charcoal-medium p-8 rounded-2xl border border-warm-beige/15 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="font-mono text-xs text-sepia-beige uppercase tracking-widest block">Acting Methodology</span>
                    <h3 className="font-serif text-2xl font-bold italic text-white">"A delicate bridge from theatrical roots to streaming realism."</h3>
                    <p className="text-warm-beige/80 leading-relaxed text-sm">
                      {bioSummary.actingApproach}
                    </p>
                  </div>
                  
                  {/* QUOTE STAMP */}
                  <div className="border-t border-warm-beige/10 pt-6 mt-6 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full border border-sepia-beige flex items-center justify-center bg-sepia-beige/10 italic text-sepia-beige font-serif font-semibold text-lg">“</div>
                    <div>
                      <p className="font-serif text-sm italic font-medium">"Husne embodies structural control; each step from the Kalaripayattu stance manifests in her vocal stability."</p>
                      <p className="font-mono text-[9px] text-warm-beige/40 uppercase tracking-widest mt-0.5">— Theatre Critic & Choreographer</p>
                    </div>
                  </div>
                </div>

                {/* LANGUAGES AND SKILLS CHIPBOARD */}
                <div id="actor-skillsets" className="bg-charcoal-medium/60 p-8 rounded-2xl border border-warm-beige/10 space-y-6">
                  <div className="space-y-2">
                    <span className="font-mono text-xs text-sepia-beige uppercase tracking-widest block">Fluency Matrice</span>
                    <h4 className="font-serif text-xl font-bold text-white">Vocals & Language Dialects</h4>
                  </div>
                  
                  <div className="space-y-3">
                    {/* LANG LIST */}
                    <div className="flex flex-wrap gap-1.5 pb-4 border-b border-warm-beige/10">
                      {personalDetails.languages.map((lang) => (
                        <span key={lang} className="px-2.5 py-1 bg-ink-black border border-sepia-beige/20 text-sepia-beige font-mono text-[10px] rounded">
                          {lang} (Fluent)
                        </span>
                      ))}
                    </div>

                    {/* PHYSICAL SPEC SKILLS */}
                    <div className="space-y-3">
                      <span className="font-mono text-[10px] text-warm-beige/40 uppercase tracking-wider block">Specialist Training</span>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center bg-ink-black/40 p-2 rounded">
                          <span className="text-light">Theatre Discipline</span>
                          <span className="font-mono text-[10px] text-sepia-beige px-2 py-0.5 bg-sepia-beige/5 rounded border border-sepia-beige/10">10+ Years</span>
                        </div>
                        <div className="flex justify-between items-center bg-ink-black/40 p-2 rounded">
                          <span className="text-light">Movement Training</span>
                          <span className="font-mono text-[10px] text-sepia-beige px-2 py-0.5 bg-sepia-beige/5 rounded border border-sepia-beige/10">Advanced</span>
                        </div>
                        <div className="flex justify-between items-center bg-ink-black/40 p-2 rounded">
                          <span className="text-light">Yoga & Breathwork</span>
                          <span className="font-mono text-[10px] text-sepia-beige px-2 py-0.5 bg-sepia-beige/5 rounded border border-sepia-beige/10">Advanced</span>
                        </div>
                        <div className="flex justify-between items-center bg-ink-black/40 p-2 rounded">
                          <span className="text-light">Kalaripayattu Martial Arts</span>
                          <span className="font-mono text-[10px] text-warm-beige/55 px-2 py-0.5 bg-warm-beige/5 rounded border border-warm-beige/10">Beginner</span>
                        </div>
                        <div className="flex justify-between items-center bg-ink-black/40 p-2 rounded">
                          <span className="text-light">Singing Skills</span>
                          <span className="font-mono text-[10px] text-sepia-beige px-2 py-0.5 bg-sepia-beige/5 rounded border border-sepia-beige/10">Vocalist</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* FILMOGRAPHY FILTER & SEARCH TABLE */}
              <div id="theatrical-filmography" className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-mono text-xs text-sepia-beige uppercase tracking-widest block">Theatrical Experience</span>
                    <h3 className="font-serif text-3xl font-bold text-white">Film & Web Series Selected Work</h3>
                  </div>

                  {/* FILTER CONTROLS */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Search Field */}
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-warm-beige/40" />
                      <input 
                        type="text" 
                        placeholder="Search projects, directors..."
                        value={actingSearchQuery}
                        onChange={(e) => setActingSearchQuery(e.target.value)}
                        className="bg-charcoal-medium/80 border border-warm-beige/10 rounded-lg pl-9 pr-4 py-1.5 font-mono text-xs text-white focus:outline-none focus:ring-1 focus:ring-sepia-beige focus:border-sepia-beige w-56 placeholder:text-warm-beige/30"
                      />
                    </div>

                    {/* Platform Selector */}
                    <div className="flex items-center bg-charcoal-medium/80 border border-warm-beige/10 rounded-lg p-1">
                      {['All', 'Netflix', 'Amazon Prime Video', 'Hoichoi'].map((plat) => (
                        <button
                          key={plat}
                          onClick={() => setActingPlatformFilter(plat)}
                          className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-all ${
                            actingPlatformFilter === plat 
                              ? 'bg-sepia-beige text-ink-black font-semibold' 
                              : 'text-warm-beige/60 hover:text-white'
                          }`}
                        >
                          {plat === 'Amazon Prime Video' ? 'Prime' : plat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* THE FILMOGRAPHY TABLE GRID */}
                <div className="bg-charcoal-medium/30 rounded-2xl border border-warm-beige/10 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans text-sm">
                      <thead>
                        <tr className="bg-charcoal-medium/80 text-warm-beige/50 border-b border-warm-beige/10 text-xs font-mono tracking-widest uppercase">
                          <th className="p-4 pl-6">Project Name</th>
                          <th className="p-4">Role Assigned</th>
                          <th className="p-4">Director</th>
                          <th className="p-4">Platform</th>
                          <th className="p-4 text-right pr-6">Production Year</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-warm-beige/10">
                        {filteredActorProjects.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="p-12 text-center text-warm-beige/40 font-mono text-xs">
                              No projects matches your filter adjustments. Try clearing query.
                            </td>
                          </tr>
                        ) : (
                          filteredActorProjects.map((p) => (
                            <tr key={p.id} className="hover:bg-charcoal-medium/40 transition-all duration-150 group">
                              <td className="p-4 pl-6 font-serif font-semibold text-white group-hover:text-sepia-beige duration-150">
                                <div>
                                  <span>{p.project}</span>
                                  {p.featured && (
                                    <span className="ml-2 inline-block px-1.5 py-0.5 rounded bg-sepia-beige/10 border border-sepia-beige/25 text-[8px] font-mono text-sepia-beige align-middle uppercase tracking-wider">
                                      Principal
                                    </span>
                                  )}
                                </div>
                                {p.synopsis && (
                                  <p className="text-xs text-warm-beige/55 mt-1 font-sans font-normal line-clamp-2 max-w-lg">
                                    {p.synopsis}
                                  </p>
                                )}
                              </td>
                              <td className="p-4 font-mono text-xs font-medium text-warm-beige/80">
                                {p.role}
                              </td>
                              <td className="p-4 text-warm-beige/70">
                                {p.director}
                              </td>
                              <td className="p-4">
                                <span className={`inline-block px-2.5 py-1 text-[10px] font-mono rounded tracking-wide ${
                                  p.platform === 'Netflix' ? 'bg-red-950/40 text-red-400 border border-red-900/30' :
                                  p.platform === 'Amazon Prime Video' ? 'bg-blue-950/40 text-blue-400 border border-blue-900/30' :
                                  p.platform === 'Hoichoi' ? 'bg-orange-950/40 text-orange-400 border border-orange-900/30' :
                                  'bg-zinc-800/60 text-zinc-300'
                                }`}>
                                  {p.platform}
                                </span>
                              </td>
                              <td className="p-4 text-right pr-6 font-mono text-xs text-warm-beige/60">
                                {p.year}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* BRING IN COMMERCIALS & FORMATS */}
                <div id="commercial-matrix" className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-charcoal-medium/20 rounded-2xl p-6 border border-warm-beige/10">
                  {otherWorkList.map((item) => (
                    <div key={item.category} className="space-y-2">
                      <span className="font-mono text-[10px] text-sepia-beige uppercase tracking-wider block">{item.category} Matrix</span>
                      <h4 className="font-serif text-lg font-bold text-white">{item.category} & Formats</h4>
                      <p className="text-sm text-warm-beige/70 leading-relaxed">
                        {item.details}
                      </p>
                    </div>
                  ))}
                </div>

              </div>

            </motion.div>
          )}

          {/* THE DIALECT COACH PILLAR LAYOUT */}
          {activeTab === 'coach' && (
            <motion.div
              key="coach-pillar"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* TOP PROFILE INTRO */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* METHOD AND APPROACH */}
                <div id="coach-mindset" className="lg:col-span-2 bg-charcoal-medium p-8 rounded-2xl border border-warm-beige/15 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="font-mono text-xs text-sepia-beige uppercase tracking-widest block">Linguistic Coaching Architecture</span>
                    <h3 className="font-serif text-3xl font-bold text-white">"Authenticity is not just about phonetics; it represents deep posture and memory."</h3>
                    <p className="text-warm-beige/85 leading-relaxed text-sm">
                      {bioSummary.coachApproach}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-warm-beige/10 pt-6">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase text-sepia-beige block">Linguistic Core</span>
                      <p className="text-xs text-warm-beige/75">Native Bengali + specialized Bangladeshi dialects and phonetic alignment blueprints.</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase text-sepia-beige block">Coaching Method</span>
                      <p className="text-xs text-warm-beige/75">Integrating actor script mapping (pitch contours & vowel modification) with Stanislavskian character goals.</p>
                    </div>
                  </div>
                </div>

                {/* THE STAR-STUDDED COACHING HIGHLIGHT */}
                <div id="coaching-highlights" className="bg-sepia-beige p-8 rounded-2xl text-ink-black flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="h-7 w-7 rounded bg-black/10 flex items-center justify-center font-mono font-black text-xs">★</div>
                    <span className="font-mono text-[10px] uppercase font-black tracking-widest text-ink-black/60 block">Industry Showcase</span>
                    <h4 className="font-serif text-2xl font-black leading-tight">Master Coaching for Indian Cinema Elite</h4>
                    <p className="text-xs text-ink-black/80 font-medium leading-relaxed mt-2">
                      Trusted by A-list legendary directors like <strong>Karan Johar</strong>, <strong>Abhinay Deo</strong>, and <strong>Nikkhil Advani</strong> to coach superstars.
                    </p>
                  </div>

                  {/* MINI STAR ROSTER */}
                  <div className="space-y-2 border-t border-ink-black/15 pt-4">
                    <p className="font-mono text-[9px] uppercase font-black text-ink-black/50 tracking-wider">Acclaimed Cast List Coached:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["Alia Bhatt", "Amitabh Bachchan", "Shabana Azmi", "Karisma Kapoor", "Bhuvan Bam"].map((star) => (
                        <span key={star} className="px-2 py-0.5 rounded bg-ink-black text-warm-beige font-mono text-[9px] font-semibold tracking-wider">
                          {star}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* SEARCHABLE DIALECT EXPERIENCE RECORD */}
              <div id="coaching-history" className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-mono text-xs text-sepia-beige uppercase tracking-widest block">Linguistic Blueprints</span>
                    <h3 className="font-serif text-3xl font-bold text-white">Auteur Screen Coach Record</h3>
                  </div>

                  {/* QUICK SEARCH FOR COACHING RECORD */}
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-warm-beige/40" />
                    <input 
                      type="text" 
                      placeholder="Search coached actors, projects, etc..."
                      value={coachSearchQuery}
                      onChange={(e) => setCoachSearchQuery(e.target.value)}
                      className="bg-charcoal-medium/80 border border-warm-beige/10 rounded-lg pl-9 pr-4 py-1.5 font-mono text-xs text-white focus:outline-none focus:ring-1 focus:ring-sepia-beige focus:border-sepia-beige w-64 placeholder:text-warm-beige/30"
                    />
                  </div>
                </div>

                {/* THE COACHING GRID SHOWCASE */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCoachProjects.length === 0 ? (
                    <div className="col-span-full bg-charcoal-medium/10 border border-warm-beige/5 rounded-2xl p-12 text-center text-warm-beige/40 font-mono text-xs">
                      No matching projects. Try adjust search.
                    </div>
                  ) : (
                    filteredCoachProjects.map((p) => (
                      <div 
                        key={p.id} 
                        className="bg-charcoal-medium/40 border border-warm-beige/10 rounded-xl p-6 flex flex-col justify-between hover:border-sepia-beige/40 duration-300 group"
                      >
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <span className="font-mono text-[10px] text-sepia-beige px-2 py-0.5 rounded bg-sepia-beige/5 border border-sepia-beige/10">
                              {p.dialectNotes}
                            </span>
                            <span className="font-mono text-xs text-warm-beige/40">{p.year !== '—' ? p.year : 'Upcoming'}</span>
                          </div>

                          <div className="space-y-1">
                            <h4 className="font-serif text-xl font-bold text-white group-hover:text-sepia-beige duration-150">
                              {p.project}
                            </h4>
                            <p className="font-mono text-[10.5px] text-warm-beige/40 uppercase tracking-wider">
                              Director: {p.director !== '—' ? p.director : 'TBA'} • Studio: {p.producerStudio !== '—' ? p.producerStudio : 'Independent'}
                            </p>
                          </div>

                          {/* ACTORS LIST HIGHLIGHT */}
                          <div className="bg-ink-black/40 p-3 rounded-lg space-y-1.5">
                            <span className="font-mono text-[9px] uppercase tracking-wider text-warm-beige/40">Coached Actors Highlight:</span>
                            <div className="flex flex-wrap gap-1">
                              {p.actorsCoached.map((act) => (
                                <span key={act} className="px-1.5 py-0.5 rounded bg-charcoal-medium border border-warm-beige/10 font-mono text-[9px] text-white">
                                  {act}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* BRIEF TESTIMONIAL OR DETAILS IF EXISTS */}
                        {p.testimonial && (
                          <div className="border-t border-warm-beige/5 pt-4 mt-4 font-serif italic text-xs text-warm-beige/65 leading-relaxed">
                            "{p.testimonial}"
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* AIIS PARTNER CARD */}
                <div id="aiis-partner-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-charcoal-medium/20 rounded-2xl p-8 border border-warm-beige/10 items-center">
                  <div className="lg:col-span-4 space-y-2">
                    <span className="font-mono text-[10px] text-sepia-beige uppercase tracking-wider block">Academic Foundation</span>
                    <h4 className="font-serif text-2xl font-bold text-white">
                      {AIISPartner.institution}
                    </h4>
                    <p className="font-mono text-xs text-sepia-beige">{AIISPartner.period} • {AIISPartner.role}</p>
                  </div>
                  <div className="lg:col-span-8">
                    <ul className="space-y-2.5 text-sm text-warm-beige/85">
                      {AIISPartner.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-sepia-beige shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* INTERACTIVE VOICE REEL DUBBING PLAYER MODULE */}
      <section id="audio-visualizers" className="max-w-7xl mx-auto px-4 md:px-12 py-12">
        <div className="bg-gradient-to-br from-charcoal-medium to-ink-black rounded-3xl border border-warm-beige/15 p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT AREA: PLAYER TRACK CONTROL PANEL */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-1">
                <span className="font-mono text-xs text-sepia-beige tracking-widest uppercase flex items-center gap-2">
                  <Mic className="w-4 h-4 text-sepia-beige" />
                  VOICE & MULTILINGUAL REEL
                </span>
                <h3 className="font-serif text-3xl font-extrabold text-white">
                  Linguistic Vocal Range
                </h3>
                <p className="text-sm text-warm-beige/60">
                  Multilingual dubbing (English, Hindi, Bengali) with expert modulations. Play below to listen.
                </p>
              </div>

              {/* LIST OF TRACKS */}
              <div id="reels-tracklist" className="space-y-2">
                {voiceReels.map((reel, rIdx) => (
                  <button
                    key={reel.id}
                    onClick={() => {
                      setActiveReelIndex(rIdx);
                      setIsPlaying(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      activeReelIndex === rIdx 
                        ? 'bg-sepia-beige/12 border-sepia-beige/40 shadow-inner' 
                        : 'bg-ink-black/40 border-warm-beige/5 hover:border-warm-beige/20 hover:bg-charcoal-medium/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-mono text-xs ${
                        activeReelIndex === rIdx 
                          ? 'bg-sepia-beige text-ink-black font-semibold' 
                          : 'bg-charcoal-medium text-warm-beige/50'
                      }`}>
                        {rIdx + 1}
                      </div>
                      <div>
                        <h4 className={`font-serif text-sm ${activeReelIndex === rIdx ? 'text-sepia-beige font-bold' : 'text-white'}`}>
                          {reel.title}
                        </h4>
                        <p className="font-sans text-[11px] text-warm-beige/40">{reel.accent}</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-warm-beige/40">{reel.duration}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT AREA: THE IMPOSSIBLY BEAUTIFUL GRAPHIC WAVEFORM & CONTROLS */}
            <div className="lg:col-span-7 bg-ink-black/60 rounded-2xl border border-warm-beige/10 p-6 md:p-8 space-y-6">
              
              {/* CURRENT SELECTED REEL DETAIL */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-warm-beige/15 pb-6">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-sepia-beige">Active Dubbing Reel</span>
                  <h4 className="font-serif text-xl font-bold text-white mt-1">
                    {voiceReels[activeReelIndex].title}
                  </h4>
                  <p className="text-xs text-warm-beige/70 mt-1 max-w-md">
                    {voiceReels[activeReelIndex].description}
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-sepia-beige/10 border border-sepia-beige/30 text-sepia-beige font-mono text-[10px] rounded uppercase font-semibold">
                    {voiceReels[activeReelIndex].accent}
                  </span>
                </div>
              </div>

              {/* SIMULATED AUDIO PULSE WAVEFORM CANVAS */}
              <div className="space-y-2">
                <div className="h-28 bg-charcoal-medium/30 rounded-xl border border-warm-beige/5 flex items-end justify-between p-4 px-6 gap-1 relative overflow-hidden">
                  
                  {/* Backdrop glowing visual */}
                  <div className={`absolute inset-0 bg-sepia-beige/3 transition-all duration-1000 blur-md pointer-events-none ${isPlaying ? 'scale-110 opacity-100' : 'scale-95 opacity-30'}`} />

                  {/* Waveform Bars */}
                  {waveformBars.map((bHeight, index) => {
                    const isPassed = (index / waveformBars.length) < (playbackSeconds / parseDurationToSeconds(voiceReels[activeReelIndex].duration));
                    return (
                      <div 
                        key={index} 
                        className={`w-full max-w-[8px] rounded-full transition-all duration-300 ${
                          isPlaying 
                            ? isPassed ? 'bg-sepia-beige shadow-inner' : 'bg-sepia-beige/20'
                            : 'bg-warm-beige/25'
                        }`}
                        style={{ height: `${bHeight}%`, minHeight: '6px' }}
                      />
                    );
                  })}
                </div>

                {/* TIMELINE TIMER TEXTS */}
                <div className="flex justify-between items-center px-1">
                  <span className="font-mono text-[10px] text-sepia-beige">{formatSeconds(playbackSeconds)}</span>
                  <div className="flex items-center gap-1 font-mono text-[8px] tracking-widest text-warm-beige/30 uppercase">
                    {isPlaying && <span className="h-1.5 w-1.5 bg-red-600 rounded-full animate-ping inline-block" />}
                    {isPlaying ? 'ACTIVE MODULATION DECODE' : 'STANDBY AUDITION'}
                  </div>
                  <span className="font-mono text-[10px] text-warm-beige/40">{voiceReels[activeReelIndex].duration}</span>
                </div>
              </div>

              {/* CONSOLE CONTROLS row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-5 bg-charcoal-medium/40 p-4 rounded-xl border border-warm-beige/5">
                
                {/* Play, Next buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (playbackSeconds === 0 && !isPlaying) {
                        setPlaybackSeconds(1); // initiate timer
                      }
                      setIsPlaying(!isPlaying);
                    }}
                    className={`h-11 w-11 rounded-full flex items-center justify-center transition-all ${
                      isPlaying 
                        ? 'bg-red-600 text-white hover:bg-red-700' 
                        : 'bg-sepia-beige text-ink-black hover:bg-sepia-beige/90 scale-102 font-bold shadow'
                    }`}
                    title={isPlaying ? "Pause Demo Simulation" : "Play Demo Simulation"}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-ink-black ml-0.5" />}
                  </button>

                  <button
                    onClick={() => {
                      setActiveReelIndex((prev) => (prev + 1) % voiceReels.length);
                    }}
                    className="h-9 px-4 rounded-lg bg-墨 border border-warm-beige/10 text-xs font-mono tracking-widest uppercase hover:bg-warm-beige/5 text-warm-beige/80 transition-all"
                  >
                    Nxt Demo Reel
                  </button>
                </div>

                {/* Simulated Volume bar */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-warm-beige/60 hover:text-white transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <div className="relative w-28 h-1 bg-warm-beige/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${isMuted ? 'bg-red-900/50' : 'bg-sepia-beige'}`} 
                      style={{ width: isMuted ? '0%' : `${playbackVolume}%` }} 
                    />
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : playbackVolume}
                      onChange={(e) => {
                        setPlaybackVolume(Number(e.target.value));
                        if(isMuted) setIsMuted(false);
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full"
                    />
                  </div>
                  <span className="font-mono text-[9px] text-warm-beige/50 w-7 text-right">
                    {isMuted ? 'Muted' : `${playbackVolume}%`}
                  </span>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* PORTFOLIO LOOKBOOK GALLERY */}
      <section id="full-lookbook" className="max-w-7xl mx-auto px-4 md:px-12 py-10 space-y-6">
        <div className="space-y-1">
          <span className="font-mono text-xs text-sepia-beige tracking-widest uppercase block">Portfolio Artifacts</span>
          <h3 className="font-serif text-3xl font-extrabold text-white">Full Archetype Gallery lookbook</h3>
          <p className="text-sm text-warm-beige/60 max-w-xl">
            A diverse range of casting look representations covering historical themes, athletic posture controls, modern theatrical, and professional styling.
          </p>
        </div>

        {/* LOOKBOOK IMAGES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portraitGallery.map((gi, index) => (
            <div 
              key={gi.title}
              onClick={() => handleArchetypeClick(index)}
              className={`bg-charcoal-medium/50 border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 group ${
                selectedArchetypeIndex === index 
                  ? 'border-sepia-beige ring-2 ring-sepia-beige/30' 
                  : 'border-warm-beige/10 hover:border-warm-beige/25 hover:-translate-y-1'
              }`}
            >
              <div className="aspect-[3/4] overflow-hidden relative">
                <img 
                  src={gi.imagePath} 
                  alt={gi.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                />
                <div className="absolute top-3 left-3 bg-ink-black/85 border border-warm-beige/10 px-2 py-0.5 rounded text-[9px] font-mono tracking-wider uppercase text-sepia-beige">
                  {gi.category}
                </div>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-serif text-sm font-semibold text-white group-hover:text-sepia-beige duration-250">
                  {gi.title}
                </h4>
                <p className="text-[11px] text-warm-beige/50 line-clamp-2">
                  {gi.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE BOOKING DESK & CONTACT ROW */}
      <section id="booking-anchor" className="max-w-7xl mx-auto px-4 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* THE CONTACT BOARD (Left) */}
          <div className="lg:col-span-5 bg-charcoal-medium p-8 rounded-3xl border border-warm-beige/15 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="font-mono text-xs text-sepia-beige tracking-widest uppercase block">Direct Line</span>
                <h3 className="font-serif text-3xl font-extrabold text-white">Representative & Booking Desk</h3>
                <p className="text-sm text-warm-beige/60">
                  Reach out directly to schedule acting auditions, dubbing contracts, theatrical dialect coaching scripts, or casting inquiries.
                </p>
              </div>

              {/* CARD DETS */}
              <div className="space-y-3 pt-2">
                
                <div className="flex items-center gap-4 bg-ink-black/40 p-3.5 rounded-xl border border-warm-beige/5 group">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-charcoal-medium border border-warm-beige/10 flex items-center justify-center text-sepia-beige">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-warm-beige/40 block">Email Address</span>
                    <button 
                      onClick={() => copyToClipboard('husneshabnam.connect@gmail.com', 'email-details')}
                      className="font-serif text-sm font-bold text-white hover:text-sepia-beige hover:underline text-left duration-150 block"
                    >
                      husneshabnam.connect@gmail.com
                    </button>
                    <span className="font-mono text-[8px] text-sepia-beige block mt-0.5 mt-0.5">
                      {copiedText === 'email-details' ? '✓ Copied Address' : 'Copy Email Address'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-ink-black/40 p-3.5 rounded-xl border border-warm-beige/5">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-charcoal-medium border border-warm-beige/10 flex items-center justify-center text-sepia-beige">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-warm-beige/40 block">Casting Hotline</span>
                    <button 
                      onClick={() => copyToClipboard('+918240526006', 'phone')}
                      className="font-mono text-sm font-semibold text-white hover:text-sepia-beige block duration-150 text-left"
                    >
                      +91 8240526006
                    </button>
                    <span className="font-mono text-[8px] text-sepia-beige block mt-0.5">
                      {copiedText === 'phone' ? '✓ Copied Number' : 'Copy Direct Hotline'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-ink-black/40 p-3.5 rounded-xl border border-warm-beige/5">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-charcoal-medium border border-warm-beige/10 flex items-center justify-center text-sepia-beige">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-warm-beige/40 block">Instagram Link</span>
                    <a 
                      href="https://www.instagram.com/husn_e_shabnam?igsh=Ymt5MWF2eG4yNTR1&utm_source=qr" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-serif text-sm font-bold text-white hover:text-sepia-beige hover:underline flex items-center gap-1.5 duration-150"
                    >
                      @husn_e_shabnam
                      <ArrowRight className="w-3 h-3" />
                    </a>
                    <span className="font-mono text-[8px] text-warm-beige/40 block mt-0.5">Follow and direct message</span>
                  </div>
                </div>

              </div>
            </div>

            {/* PERSISTED SUBMISSION HISTORY LIST */}
            {savedBookings.length > 0 && (
              <div className="space-y-3 border-t border-warm-beige/10 pt-6">
                <span className="font-mono text-[9.5px] uppercase tracking-widest text-sepia-beige font-semibold block">Pending Bookings Log ({savedBookings.length})</span>
                <div className="max-h-44 overflow-y-auto space-y-2 pr-2">
                  {savedBookings.map((b: any) => (
                    <div key={b.id} className="bg-ink-black/60 border border-warm-beige/5 p-3 rounded-xl space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <h5 className="font-serif text-xs font-semibold text-white truncate max-w-xs">{b.projectName}</h5>
                        <span className="font-mono text-[8px] text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-1.5 py-0.5 rounded uppercase">Submitted</span>
                      </div>
                      <p className="text-[10px] text-warm-beige/50">Requested service: {b.serviceType} ({b.platformTarget})</p>
                      <div className="flex justify-between items-center text-[9px] pt-1">
                        <span className="text-sepia-beige font-mono">{b.submittedAt}</span>
                        <span className="text-white/30 italic">{b.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* THE BOOKING REQUEST FORM (Right) */}
          <div className="lg:col-span-7 bg-charcoal-medium/50 rounded-3xl border border-warm-beige/12 p-8 flex flex-col justify-between">
            {bookingStatus === 'submitted' ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 animate-fade-in">
                <div className="h-16 w-16 bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-serif text-2xl font-bold text-white">Proposal Transmitted successfully!</h4>
                  <p className="text-sm text-warm-beige/70 max-w-md mx-auto">
                    Husne Shabnam's casting rep will review your project proposal details (<strong>{bookingFormData.projectName}</strong>) and follow up at <strong>{bookingFormData.clientEmail}</strong> within 48 business hours.
                  </p>
                </div>
                <div className="bg-ink-black/40 border border-warm-beige/5 p-4 rounded-xl text-left text-xs space-y-2 w-full max-w-md mx-auto font-mono">
                  <span className="text-sepia-beige uppercase text-[9px] tracking-wider block border-b border-warm-beige/10 pb-1.5">TRANSMITTED METADATA RECONCILE:</span>
                  <div className="flex justify-between"><span className="text-warm-beige/40">Requester:</span> <span className="text-white">{bookingFormData.clientName}</span></div>
                  <div className="flex justify-between"><span className="text-warm-beige/40">Category:</span> <span className="text-white">{bookingFormData.serviceType}</span></div>
                  <div className="flex justify-between"><span className="text-warm-beige/40">Target Platform:</span> <span className="text-white">{bookingFormData.platformTarget}</span></div>
                  <div className="flex justify-between"><span className="text-warm-beige/40">Estimated Budget:</span> <span className="text-white">{bookingFormData.estimatedBudget}</span></div>
                </div>
                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 bg-sepia-beige text-ink-black font-semibold rounded-lg hover:bg-sepia-beige/90 transition-all font-mono text-xs uppercase tracking-wider"
                >
                  Draft Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <span className="font-mono text-xs text-sepia-beige uppercase tracking-widest block">Interactive Booking Deck</span>
                  <h4 className="font-serif text-2xl font-bold text-white">Consolidated Casting Matrix</h4>
                  <p className="text-xs text-warm-beige/50">Submit project parameters to directly schedule dial-in times or audition recordings.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* CLIENT NAME */}
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase text-warm-beige/50 block">Your Full Name / Agency</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Dharma Productions Casting"
                      value={bookingFormData.clientName}
                      onChange={(e) => setBookingFormData({...bookingFormData, clientName: e.target.value})}
                      className="w-full bg-ink-black border border-warm-beige/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sepia-beige focus:border-sepia-beige placeholder:text-warm-beige/25"
                    />
                  </div>

                  {/* CLIENT EMAIL */}
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase text-warm-beige/50 block">Contact Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. casting@producer.com"
                      value={bookingFormData.clientEmail}
                      onChange={(e) => setBookingFormData({...bookingFormData, clientEmail: e.target.value})}
                      className="w-full bg-ink-black border border-warm-beige/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sepia-beige focus:border-sepia-beige placeholder:text-warm-beige/25"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* PROJECT NAME */}
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase text-warm-beige/50 block">Project Title</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Untitled Drama Series"
                      value={bookingFormData.projectName}
                      onChange={(e) => setBookingFormData({...bookingFormData, projectName: e.target.value})}
                      className="w-full bg-ink-black border border-warm-beige/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sepia-beige focus:border-sepia-beige placeholder:text-warm-beige/25"
                    />
                  </div>

                  {/* SERVICE TYPE */}
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase text-warm-beige/50 block">Requested Services</label>
                    <select 
                      value={bookingFormData.serviceType}
                      onChange={(e) => setBookingFormData({...bookingFormData, serviceType: e.target.value})}
                      className="w-full bg-ink-black border border-warm-beige/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sepia-beige focus:border-sepia-beige"
                    >
                      <option value="Acting Audition">Theatrical Acting Audition</option>
                      <option value="Dialect Coaching Series">Bengali Dialect Coaching (Series)</option>
                      <option value="Dialect Coaching Film">Bengali Dialect Coaching (Film)</option>
                      <option value="Dubbing / Sync Recording">Multilingual Sync Dubbing</option>
                      <option value="Academic Lecture / Workshop">Linguistic Partner / Workshop</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* PLATFORM SCOPE */}
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase text-warm-beige/50 block">Distribution Platform target</label>
                    <select 
                      value={bookingFormData.platformTarget}
                      onChange={(e) => setBookingFormData({...bookingFormData, platformTarget: e.target.value})}
                      className="w-full bg-ink-black border border-warm-beige/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sepia-beige focus:border-sepia-beige"
                    >
                      <option value="Netflix">Netflix Originals</option>
                      <option value="Amazon Prime Video">Amazon Prime Video</option>
                      <option value="Hotstar / Disney">Hotstar / Disney+</option>
                      <option value="ZEE Studios / SonyLIV">ZEE Studios / SonyLIV</option>
                      <option value="Hoichoi / Regional">Hoichoi / Bengali Regional</option>
                      <option value="Theatrical Film Release">Theatrical Film Release</option>
                      <option value="Digital Campaign / Other">Digital Commercial Campaign</option>
                    </select>
                  </div>

                  {/* ESTIMATED BUDGET CATEGORY */}
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase text-warm-beige/50 block">Approximate Budget Category</label>
                    <select 
                      value={bookingFormData.estimatedBudget}
                      onChange={(e) => setBookingFormData({...bookingFormData, estimatedBudget: e.target.value})}
                      className="w-full bg-ink-black border border-warm-beige/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sepia-beige focus:border-sepia-beige"
                    >
                      <option value="Standard Association Rate">Standard Association Guild Rate</option>
                      <option value="Indie Film Tier">Indie Film Scale / Grant Fund</option>
                      <option value="High Production Scale">High Production Commercial budget</option>
                      <option value="To Be Discussed / Open">To Be Negotiated on Call</option>
                    </select>
                  </div>
                </div>

                {/* ADDITIONAL MESSAGE DETAILS */}
                <div className="space-y-1">
                  <label className="font-mono text-[10px] uppercase text-warm-beige/50 block">Brief Creative Summary / Rehearsal Schedule</label>
                  <textarea 
                    rows={3}
                    placeholder="Provide audition scripts, dialect needs, or brief notes about the character archetype..."
                    value={bookingFormData.messageDetails}
                    onChange={(e) => setBookingFormData({...bookingFormData, messageDetails: e.target.value})}
                    className="w-full bg-ink-black border border-warm-beige/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sepia-beige focus:border-sepia-beige placeholder:text-warm-beige/25 resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-sepia-beige hover:bg-sepia-beige/95 text-ink-black font-semibold rounded-lg transition-all font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Transmit Casting Request Reconcile
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* FOOTER CODA */}
      <footer id="footer-coda" className="max-w-7xl mx-auto px-4 md:px-12 pt-16 border-t border-warm-beige/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h5 className="font-serif text-base tracking-widest font-black uppercase text-warm-beige">HUSNE SHABNAM</h5>
            <p className="font-sans text-xs text-warm-beige/40 mt-1">
              Experienced Theatre and Screen Artist • Industry Dialect Specialist.
            </p>
          </div>

          <p className="font-mono text-[10px] text-warm-beige/35 text-center">
            © {new Date().getFullYear()} Husne Shabnam. All Rights Reserved. Mumbai & West Bengal.
          </p>
        </div>
      </footer>

    </div>
  );
}
