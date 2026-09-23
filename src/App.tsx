import React, { useState, useEffect, useRef } from 'react';
import { 
  personalDetails, 
  bioSummary, 
  actorProjects, 
  coachProjects, 
  skillsList, 
  otherWorkList, 
  voiceReels, 
  AIISPartner, 
  portraitGallery,
  pressArticles
} from './data';
import { 
  ActorProject, 
  DialectCoachProject, 
  VoiceDemo,
  PressArticle
} from './types';
import { 
  motion, 
  AnimatePresence 
} from 'motion/react';
import { 
  Film, 
  Mic, 
  Mail, 
  Phone, 
  Instagram, 
  CheckCircle, 
  MapPin, 
  Sparkles, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ClipboardCopy, 
  ArrowRight, 
  Search, 
  Send,
  Clock,
  BookOpen,
  ExternalLink,
  Quote,
  Newspaper,
  X
} from 'lucide-react';

export default function App() {
  // Navigation active tab (scroll sections focus helper)
  const [activeTab, setActiveTab] = useState<'actor' | 'coach'>('actor');
  
  // Hero portrait archetype selector
  const [selectedArchetypeIndex, setSelectedArchetypeIndex] = useState<number>(0);

  // Auto-cycle lookbook headshots, resetting timer on manual selection
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedArchetypeIndex((prev) => (prev + 1) % portraitGallery.length);
    }, 5000); // cycle every 5 seconds
    
    return () => clearInterval(interval);
  }, [selectedArchetypeIndex]);
  
  // Search and filters for Acting Projects
  const [actingSearchQuery, setActingSearchQuery] = useState('');
  const [actingPlatformFilter, setActingPlatformFilter] = useState('All');
  
  // Search and filters for Coaching Projects
  const [coachSearchQuery, setCoachSearchQuery] = useState('');
  
  // Custom Voice Reel Player State
  const [activeReelIndex, setActiveReelIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSeconds, setPlaybackSeconds] = useState<number>(0);
  const [playbackVolume, setPlaybackVolume] = useState<number>(80);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [waveformBars, setWaveformBars] = useState<number[]>([]);

  // Clock states
  const [istTime, setIstTime] = useState('');
  const [istDate, setIstDate] = useState('');
  const [localTime, setLocalTime] = useState('');
  const [localZone, setLocalZone] = useState('');

  // Active reading article for the reader modal
  const [readingArticle, setReadingArticle] = useState<PressArticle | null>(null);

  // Lock body scroll when article reader modal is active
  useEffect(() => {
    if (readingArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [readingArticle]);

  // Voice reels slider reference
  const sliderRef = useRef<HTMLDivElement>(null);

  // Dedicated coach audio player state
  const [playingCoachAudioId, setPlayingCoachAudioId] = useState<string | null>(null);
  const coachAudioRef = useRef<HTMLAudioElement | null>(null);

  const toggleCoachAudio = (id: string, url: string) => {
    if (isPlaying) {
      setIsPlaying(false);
    }

    if (!coachAudioRef.current) {
      coachAudioRef.current = new Audio(url);
      coachAudioRef.current.onended = () => setPlayingCoachAudioId(null);
    }

    if (playingCoachAudioId === id) {
      coachAudioRef.current.pause();
      setPlayingCoachAudioId(null);
    } else {
      coachAudioRef.current.src = url;
      coachAudioRef.current.play().catch((err) => {
        console.error("Audio playback error:", err);
      });
      setPlayingCoachAudioId(id);
    }
  };

  useEffect(() => {
    return () => {
      if (coachAudioRef.current) {
        coachAudioRef.current.pause();
        coachAudioRef.current = null;
      }
    };
  }, []);

  // Movie slider reference
  const movieSliderRef = useRef<HTMLDivElement>(null);

  // Coaching slider reference
  const coachSliderRef = useRef<HTMLDivElement>(null);

  // Timezone clocks updater
  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      
      // IST Date format
      const formatterDate = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      setIstDate(formatterDate.format(now));

      // IST Time format
      const formatterTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setIstTime(formatterTime.format(now));

      // Local Time format
      const localFormatterTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setLocalTime(localFormatterTime.format(now));

      // Local Zone name
      try {
        const zoneName = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/').pop()?.replace('_', ' ') || 'Local';
        setLocalZone(zoneName);
      } catch (e) {
        setLocalZone('Local Time');
      }
    };

    updateClocks();
    const clockInterval = setInterval(updateClocks, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  // Generate static visual waveform bars for selected reel
  useEffect(() => {
    const barsCount = 38;
    const initialBars = Array.from({ length: barsCount }, () => Math.floor(Math.random() * 60) + 15);
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
          prevBars.map((b) => Math.max(15, Math.min(100, b + (Math.random() * 24 - 12))))
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
      status: 'Awaiting Response'
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

  const handleArchetypeClick = (index: number) => {
    setSelectedArchetypeIndex(index);
    const heroDisplay = document.getElementById('hero-display');
    if (heroDisplay) {
      heroDisplay.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollMovieSlider = (direction: 'left' | 'right') => {
    if (movieSliderRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      movieSliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollCoachSlider = (direction: 'left' | 'right') => {
    if (coachSliderRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      coachSliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen cream text-[#0e0e0e] noise-overlay selection:bg-[#ffd177] selection:text-black pb-20">
      
      {/* FLOATING HEADER / MENU */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center bg-[#fff3db]/90 backdrop-blur-md border border-black/15 shadow-lg rounded-full py-1.5 px-3 sm:px-4 gap-1 sm:gap-2 max-w-[92vw]">
        <a href="#hero-display" className="px-3 py-1.5 rounded-full hover:bg-black/5 font-mono text-[10px] uppercase font-bold tracking-wider transition-all">
          gallery
        </a>
        <a href="#acting-timeline" className="px-3 py-1.5 rounded-full hover:bg-black/5 font-mono text-[10px] uppercase font-bold tracking-wider transition-all">
          exhibitions
        </a>
        <a href="#biography" className="px-3 py-1.5 rounded-full hover:bg-black/5 font-mono text-[10px] uppercase font-bold tracking-wider transition-all">
          biography
        </a>
        <a href="#cv-section" className="px-3 py-1.5 rounded-full hover:bg-black/5 font-mono text-[10px] uppercase font-bold tracking-wider transition-all">
          cv
        </a>
        <a href="#booking-contact" className="px-4 py-1.5 bg-[#0e0e0e] hover:bg-[#ffd177] hover:text-black text-white rounded-full font-mono text-[10px] uppercase font-bold tracking-wider transition-all shadow-sm">
          contact
        </a>
      </div>

      {/* HERO SECTION / ME-TOP */}
      <section id="hero-display" className="w-full min-h-[90vh] lg:h-screen flex flex-col lg:flex-row border-b-2 border-black relative overflow-hidden">
        
        {/* LEFT AREA: TYPOGRAPHIC SPLIT (Initials rotating seal, giant stacked name, spaced clocks) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 md:p-12 pt-28 pb-8 lg:pb-12 border-b-2 lg:border-b-0 lg:border-r-2 border-black bg-[#ffd177]">
          
          {/* Spaced Info/Clock Bar at the Top */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="flex flex-wrap justify-between items-center border-b border-black/10 pb-4 mb-6 font-mono text-[9px] md:text-[10.5px] font-black uppercase tracking-widest text-black gap-y-2"
          >
            <div>MUMBAI, INDIA</div>
            <div>{istDate}</div>
            <div>{istTime} IST / {localTime} LOCAL</div>
          </motion.div>

          {/* Stacked Name Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="my-auto py-8 space-y-4"
          >
            <div className="flex items-baseline flex-wrap gap-x-6 gap-y-4">
              <h1 className="h1 text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[6.5rem] xl:text-[8.5rem] leading-[0.75] font-black tracking-tighter">HUSNE</h1>
              
              {/* Embedded statement paragraph next to HUSNE */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="max-w-[260px] border-l-2 border-black pl-4 my-auto"
              >
                <p className="font-sans text-xs md:text-sm font-bold leading-normal text-black text-left">
                  Performing and dialect coaching across major streaming networks like Netflix and Hoichoi, blending 10+ years of theatrical discipline with screen realism.
                </p>
              </motion.div>
            </div>
            <div>
              <h1 className="h1 text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[6.5rem] xl:text-[8.5rem] leading-[0.75] font-black tracking-tighter">SHABNAM</h1>
            </div>
          </motion.div>

          {/* Bottom spacer */}
          <div className="h-6"></div>

        </div>

        {/* RIGHT AREA: FULL-HEIGHT PORTRAIT & FLOATING SWITCHER */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-0 bg-[#0e0e0e] overflow-hidden flex group"
        >
          
          {/* Full-height image */}
          <AnimatePresence mode="wait">
            <motion.img 
              key={selectedArchetypeIndex}
              src={portraitGallery[selectedArchetypeIndex].imagePath}
              alt={portraitGallery[selectedArchetypeIndex].title}
              referrerPolicy="no-referrer"
              initial={{ opacity: 0, filter: 'grayscale(100%)' }}
              animate={{ opacity: 1, filter: 'grayscale(100%)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover lookbook-portrait"
            />
          </AnimatePresence>

          {/* Archetype category label badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute top-6 left-6 bg-black text-[#ffd177] border border-[#ffd177]/20 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider flex items-center gap-1.5 font-bold shadow-md rounded"
          >
            <Sparkles className="w-3 h-3 text-[#ffd177] animate-spin" style={{ animationDuration: '4s' }} />
            Archetype: {portraitGallery[selectedArchetypeIndex].category}
          </motion.div>

          {/* Floating Archetype Switcher Menu overlay */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 p-2 rounded-full z-10 shadow-lg"
          >
            {portraitGallery.map((p, idx) => (
              <button
                key={p.category}
                onClick={() => setSelectedArchetypeIndex(idx)}
                className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all relative ${
                  selectedArchetypeIndex === idx 
                    ? 'border-[#ffd177] scale-110 shadow-md' 
                    : 'border-white/25 opacity-60 hover:opacity-100 hover:scale-105'
                }`}
                title={`Switch to ${p.title}`}
              >
                <img src={p.imagePath} alt={p.category} className="w-full h-full object-cover grayscale" />
              </button>
            ))}
          </motion.div>

          {/* Info Caption overlay on hover/hover gradient */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 text-white pt-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-mono text-[9px] text-[#ffd177] tracking-wider uppercase font-extrabold block">
              {portraitGallery[selectedArchetypeIndex].title}
            </span>
            <p className="text-xs text-white/75 mt-1 leading-relaxed font-serif italic">
              {portraitGallery[selectedArchetypeIndex].description}
            </p>
          </div>

        </motion.div>

      </section>

      {/* CORE INTRO STATEMENT CARD */}
      <section id="biography" className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="border-t-2 border-b-2 border-black/15 py-12">
          <div className="max-w-5xl">
            <h3 className="h3 leading-relaxed font-medium">
              I’m an Indian actor and dialect coach who grew up in Guskara, West Bengal, now living in Mumbai. I bring <span className="font-serif italic font-bold">deep cultural authenticity</span>, physical discipline, and linguistic precision to screen, stage, and streaming productions — caring just as much about subtext and posture as I do about accent phonetics.
            </h3>
          </div>
          <div className="flex flex-wrap gap-4 mt-8">
            <a href="#coaching-voice" className="px-5 py-3 border border-black hover:bg-[#ffd177] hover:text-black transition-all font-mono text-xs uppercase tracking-widest font-black">
              Listen to reels
            </a>
            <a href="#booking-contact" className="px-5 py-3 bg-[#0e0e0e] hover:bg-[#ffd177] hover:text-black text-[#f5f2eb] transition-all font-mono text-xs uppercase tracking-widest font-black shadow-sm">
              Book consultation
            </a>
            <button 
              onClick={() => copyToClipboard('husneshabnam.connect@gmail.com', 'hero-copy')}
              className="px-5 py-3 border border-black/15 bg-black/5 hover:bg-black/10 transition-all font-mono text-xs uppercase tracking-widest font-bold text-black"
            >
              {copiedText === 'hero-copy' ? '✓ Copied Address!' : 'Copy Direct Email'}
            </button>
          </div>
        </div>
      </section>

      {/* SECTION: SCREEN & STAGE HORIZONTAL SCROLLER / ACTING WORK (অভিনয়) */}
      <section id="acting-timeline" className="bg-[#ffd177] text-black border-t border-b border-black py-16 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs text-black/60 uppercase tracking-widest font-bold block">Stage & Screen Record</span>
              <h2 className="h2 text-black">I act screen & stage</h2>
            </div>
          </div>

          <p className="b2 text-black/70 max-w-xl leading-relaxed">
            Husne’s acting work is rooted in rigorous classical theatre discipline, merging Stanislavskian character studies with physical awareness to deliver realistic performances on screen.
          </p>

          {/* Acting search filter controls */}
          <div className="flex flex-wrap items-center gap-3 pt-2 pb-4">
            <div className="relative flex-1 max-w-xs">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black/50" />
              <input 
                type="text" 
                placeholder="Search films..."
                value={actingSearchQuery}
                onChange={(e) => setActingSearchQuery(e.target.value)}
                className="w-full bg-[#fff3db]/60 border border-black/30 rounded-full pl-9 pr-4 py-1.5 font-mono text-xs text-black focus:outline-none focus:ring-1 focus:ring-black placeholder:text-black/40"
              />
            </div>

            <div className="flex items-center bg-black/10 rounded-full p-1 gap-1">
              {['All', 'Netflix', 'Amazon Prime Video', 'Hoichoi'].map((plat) => (
                <button
                  key={plat}
                  onClick={() => setActingPlatformFilter(plat)}
                  className={`px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider transition-all ${
                    actingPlatformFilter === plat 
                      ? 'bg-[#0e0e0e] text-white font-bold' 
                      : 'text-black/60 hover:text-black'
                  }`}
                >
                  {plat === 'Amazon Prime Video' ? 'Prime' : plat}
                </button>
              ))}
            </div>
          </div>

          {/* Horizontally scrolling movie container */}
          <div 
            ref={movieSliderRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredActorProjects.length === 0 ? (
              <div className="snap-start shrink-0 w-full border-2 border-black border-dashed rounded-3xl p-12 text-center font-mono text-xs text-black/55 bg-black/5">
                No matching projects found.
              </div>
            ) : (
              filteredActorProjects.map((p, index) => {
                // Determine custom cover design based on index / platform
                let coverBg = 'bg-[#b91c1c]'; // Netflix Red
                let coverGraphic = null;

                if (p.project.includes('Lust Stories')) {
                  coverBg = 'bg-[#fda4af]'; // Pink
                  coverGraphic = (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                        <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-white/20" />
                        </div>
                      </div>
                    </div>
                  );
                } else if (p.project.includes('Tribhuvan Mishra')) {
                  coverBg = 'bg-[#b91c1c]'; // Netflix Red
                  coverGraphic = (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-black/40 flex items-center justify-center border border-white/10 animate-[spin_10s_linear_infinite]">
                        <div className="w-10 h-10 rounded-full bg-[#ffd177] flex items-center justify-center text-black font-serif font-black text-sm">CA</div>
                      </div>
                    </div>
                  );
                } else if (p.project.includes('Hero Kaun')) {
                  coverBg = 'bg-[#0f172a]'; // Slate
                  coverGraphic = (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center">
                            <span className="font-mono text-white/50 text-xl font-bold">?</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                } else if (p.project.includes('Rocky Aur Rani')) {
                  coverBg = 'bg-[#d97706]'; // Amber
                  coverGraphic = (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full border-4 border-[#ffd177] flex items-center justify-center bg-black/20">
                        <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-[#ffd177] animate-pulse" />
                        </div>
                      </div>
                    </div>
                  );
                } else if (p.project.includes('Brown')) {
                  coverBg = 'bg-[#78350f]'; // Brown
                  coverGraphic = (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-black/60 border border-white/20 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-[#78350f]" />
                      </div>
                    </div>
                  );
                } else if (p.project.includes('Jharokh')) {
                  coverBg = 'bg-[#475569]'; // Grey
                  coverGraphic = (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center">
                        <div className="w-12 h-12 border-2 border-white/20" />
                      </div>
                    </div>
                  );
                } else {
                  coverBg = 'bg-[#ea580c]'; // Hoichoi Orange
                  coverGraphic = (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full border border-white/40 flex items-center justify-center bg-[#ea580c]/60">
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                          <div className="w-4 h-4 bg-white rounded-full" />
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div 
                    key={p.id}
                    className="snap-start shrink-0 w-72 md:w-80 border-2 border-black bg-[#0e0e0e] text-[#f5f2eb] p-5 rounded-3xl flex flex-col justify-between h-[32rem] relative group hover:scale-[1.01] transition-transform duration-300"
                  >
                    <div>
                      {/* Cover art container */}
                      <div className={`aspect-square w-full rounded-2xl overflow-hidden relative border border-white/10 bg-[#080808] flex items-center justify-center ${p.imageUrl ? '' : coverBg}`}>
                        {p.imageUrl ? (
                          <>
                            {/* Ambient blurred backdrop for soft fill */}
                            <img
                              src={p.imageUrl}
                              alt=""
                              aria-hidden="true"
                              className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 scale-110 pointer-events-none"
                            />
                            <img
                              src={p.imageUrl}
                              alt={p.project}
                              className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          </>
                        ) : (
                          coverGraphic
                        )}
                        <div className="absolute bottom-3 left-3 z-20 bg-black/75 backdrop-blur-xs px-2 py-0.5 rounded text-[8px] font-mono tracking-wider uppercase text-[#ffd177] font-bold border border-white/10">
                          {p.year}
                        </div>
                      </div>

                      <div className="mt-4 space-y-1">
                        <h4 className="font-serif text-lg font-bold text-white group-hover:text-[#ffd177] transition-colors leading-tight line-clamp-2">
                          {p.project}
                        </h4>
                        <div className="flex justify-between items-center pt-1">
                          <span className="font-mono text-[10px] text-[#ffd177] uppercase tracking-widest font-black">
                            {p.platform}
                          </span>
                          {p.featured && (
                            <span className="text-[7.5px] font-mono bg-white/10 text-[#ffd177] border border-[#ffd177]/25 px-1.5 py-0.5 uppercase tracking-wider rounded">
                              Principal
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-4 mt-4 space-y-1">
                      <p className="font-sans text-xs text-white/80">
                        Role: <strong>{p.role}</strong>
                      </p>
                      <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest font-bold">
                        Director: {p.director}
                      </p>
                      {p.synopsis && (
                        <p className="font-sans text-[11px] text-white/50 line-clamp-2 leading-relaxed pt-1 border-t border-white/5 mt-1.5">
                          {p.synopsis}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Additional matrices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border-t border-black/10 pt-8">
            {otherWorkList.map((item) => (
              <div key={item.category} className="border border-black bg-[#fff3db] p-5 rounded-2xl shadow-sm">
                <span className="font-mono text-[9px] text-[#dca63d] uppercase tracking-wider block font-bold">{item.category} Matrix</span>
                <h5 className="font-serif text-base font-bold text-black mt-1">Acclaimed Format Portfolios</h5>
                <p className="b2 text-xs mt-2 text-black/75 leading-relaxed">
                  {item.details}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION: FEATURED PRESS & IN-DEPTH ARTICLES */}
      <section id="press-article" className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-black/10 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-xs text-[#dca63d] uppercase tracking-widest font-bold block">
              // Editorial Features &amp; Press Coverage
            </span>
            <h2 className="h2 text-black">In the news &amp; conversations</h2>
            <p className="b2 text-black/60 leading-relaxed">
              In-depth exclusive interviews, critical coverage, and creative insights from leading entertainment and cinema publications.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <span className="font-mono text-[11px] text-black/60 uppercase tracking-widest font-bold">
              {pressArticles.length} Featured {pressArticles.length === 1 ? 'Piece' : 'Pieces'}
            </span>
          </div>
        </div>

        {/* Featured Press Card */}
        <div className="space-y-8">
          {pressArticles.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="border-2 border-black bg-[#fff3db] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Left/Image Column */}
                <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-black overflow-hidden flex items-center justify-center group">
                  <img
                    src={article.imageUrl}
                    alt={article.headline}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Top-left Publication Pill */}
                  <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2 items-center">
                    <span className="bg-[#b91c1c] text-white font-mono text-[9px] uppercase tracking-widest font-black px-3 py-1 rounded-full shadow-md">
                      {article.badge}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md text-white font-mono text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border border-white/20">
                      {article.publication}
                    </span>
                  </div>

                  {/* Bottom Image Meta */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white/90 font-mono text-[10px]">
                    <span className="bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded border border-white/10 font-bold tracking-wider">
                      {article.date}
                    </span>
                    <span className="bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded border border-white/10 font-bold tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#ffd177]" />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                {/* Right/Content Column */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    
                    {/* Publication Tag & Byline */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/10 pb-3">
                      <span className="font-mono text-[10px] text-[#dca63d] uppercase tracking-widest font-black flex items-center gap-1.5">
                        <Newspaper className="w-3.5 h-3.5" />
                        {article.publication} OTT Spotlight
                      </span>
                      <span className="font-sans text-xs text-black/60">
                        By <strong className="text-black font-semibold">{article.author}</strong> ({article.authorRole})
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 
                      onClick={() => setReadingArticle(article)}
                      className="font-serif text-2xl sm:text-3xl font-black text-black leading-tight hover:text-[#b91c1c] transition-colors cursor-pointer"
                    >
                      {article.headline}
                    </h3>

                    {/* Excerpt */}
                    <p className="font-sans text-sm text-black/75 leading-relaxed">
                      {article.excerpt}
                    </p>

                    {/* Pull Quote Box */}
                    <div className="border-l-4 border-black bg-black/5 p-4 rounded-r-2xl space-y-2">
                      <div className="flex items-start gap-2">
                        <Quote className="w-4 h-4 text-[#dca63d] shrink-0 mt-0.5 fill-[#dca63d]" />
                        <p className="font-serif italic text-xs sm:text-sm text-black/90 leading-relaxed font-medium">
                          "{article.pullQuote}"
                        </p>
                      </div>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-black/50 text-right font-bold">
                        — {article.pullQuoteSpeaker}
                      </p>
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setReadingArticle(article)}
                      className="px-6 py-3.5 bg-[#0e0e0e] hover:bg-[#ffd177] hover:text-black text-white font-mono text-xs uppercase tracking-widest font-black rounded-full transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      Read Full Interview
                    </button>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3.5 border-2 border-black bg-transparent hover:bg-black/5 text-black font-mono text-xs uppercase tracking-widest font-black rounded-full transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Filmibeat Source</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>

              </div>

              {/* Key Quotes Highlights Bar */}
              <div className="border-t-2 border-black bg-white/40 p-6 md:p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-black/60 uppercase tracking-widest font-black flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#dca63d]" />
                      Interview Highlights &amp; Direct Quotes
                    </span>
                    <span className="font-mono text-[9px] text-black/40 uppercase">
                      Click quote to view complete interview
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {article.keyQuotes.slice(0, 4).map((kq, idx) => (
                      <div 
                        key={idx}
                        className="bg-white/80 border border-black/15 p-4 rounded-2xl hover:border-black transition-all space-y-2 group cursor-pointer"
                        onClick={() => setReadingArticle(article)}
                      >
                        <span className="font-mono text-[9px] text-[#b91c1c] uppercase tracking-wider font-extrabold block">
                          {kq.topic}
                        </span>
                        <p className="font-serif italic text-xs text-black/80 leading-relaxed line-clamp-3 group-hover:text-black">
                          "{kq.quote}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </section>

      {/* SECTION: DIALECT COACHING & VOICE REELS (MERGED) */}
      <section id="coaching-voice" className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-black/10 space-y-16">
        
        {/* Main Section Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="font-mono text-xs text-[#dca63d] uppercase tracking-widest font-bold block">Voice &amp; Dialect Blueprints</span>
          <h2 className="h2">I coach dialect &amp; live for voice</h2>
          <p className="b2 text-black/60 leading-relaxed">
            Combining phonetic accuracy with performance psychology. From detailed dialect mapping for major streaming networks like Netflix and Hoichoi, to capturing the emotional truth in multilingual voice reels, Husne balances vocal precision with physical embodiment.
          </p>
        </div>

        <div className="space-y-16">
          
          {/* Subsection 1: Dialect Coaching */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/10 pb-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-[#dca63d] uppercase tracking-widest font-bold block">01 / Dialect Coaching Portfolio</span>
                <h3 className="font-serif text-2xl font-bold">Linguistic Directing</h3>
              </div>
              
              {/* Filter Input */}
              <div className="relative w-full md:w-72">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-black/45" />
                <input 
                  type="text" 
                  placeholder="Filter coaching projects..."
                  value={coachSearchQuery}
                  onChange={(e) => setCoachSearchQuery(e.target.value)}
                  className="w-full bg-[#fff3db] border border-black/20 rounded-md pl-9 pr-4 py-1.5 font-mono text-xs text-black focus:outline-none focus:ring-1 focus:ring-[#ffd177] focus:border-black placeholder:text-black/35"
                />
              </div>
            </div>
            
            {/* Horizontally scrolling coaching container */}
            <div 
              ref={coachSliderRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredCoachProjects.length === 0 ? (
                <div className="snap-start shrink-0 w-full border-2 border-black border-dashed rounded-3xl p-12 text-center font-mono text-xs text-black/55 bg-black/5">
                  No matching projects found.
                </div>
              ) : (
                filteredCoachProjects.map((p) => (
                  <div 
                    key={p.id}
                    className="snap-start shrink-0 w-80 md:w-[28rem] border-2 border-black bg-[#0e0e0e] text-[#f5f2eb] p-6 rounded-3xl flex flex-col justify-between hover:scale-[1.01] duration-300 group"
                  >
                    <div className="flex flex-col justify-between h-full gap-4">
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          {/* Logo container */}
                          <div className="w-12 h-12 bg-[#ffd177] text-black shrink-0 flex items-center justify-center font-mono font-black text-xs rounded-xl">
                            <Mic className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-serif text-lg font-bold text-white group-hover:text-[#ffd177] transition-colors leading-tight">{p.project}</h4>
                            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest font-bold">
                              Director: {p.director} • Studio: {p.producerStudio}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="font-mono text-[9px] text-white/50 uppercase font-bold mr-1">Coached:</span>
                          {p.actorsCoached.map((act) => (
                            <span key={act} className="px-1.5 py-0.5 bg-white/10 border border-white/10 rounded font-mono text-[9px] text-white">
                              {act}
                            </span>
                          ))}
                        </div>

                        {p.audioUrl && (
                          <div className="bg-white/5 border border-[#ffd177]/40 hover:border-[#ffd177] rounded-2xl p-3 flex items-center justify-between gap-3 transition-colors mt-2">
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => toggleCoachAudio(p.id, p.audioUrl!)}
                                className="w-9 h-9 rounded-full bg-[#ffd177] text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow cursor-pointer shrink-0"
                                title={playingCoachAudioId === p.id ? "Pause Voice Clip" : "Play Voice Clip"}
                              >
                                {playingCoachAudioId === p.id ? (
                                  <Pause className="w-4 h-4 fill-black text-black" />
                                ) : (
                                  <Play className="w-4 h-4 fill-black text-black ml-0.5" />
                                )}
                              </button>
                              <div className="space-y-0.5 text-left">
                                <span className="font-mono text-[10px] text-[#ffd177] uppercase font-bold tracking-wider block">
                                  {playingCoachAudioId === p.id ? "Playing Voice Clip..." : "Listen to Campaign Voice"}
                                </span>
                                <span className="font-mono text-[9px] text-white/50 block">
                                  Dialect Coaching Recording
                                </span>
                              </div>
                            </div>
                            {playingCoachAudioId === p.id ? (
                              <div className="flex items-center gap-1 h-5 pr-2">
                                {[40, 90, 60, 100, 75, 50, 85].map((h, i) => (
                                  <div
                                    key={i}
                                    className="w-1 bg-[#ffd177] rounded-full animate-pulse"
                                    style={{
                                      height: `${h}%`,
                                      animationDelay: `${i * 120}ms`,
                                      animationDuration: '600ms'
                                    }}
                                  />
                                ))}
                              </div>
                            ) : (
                              <div className="pr-2">
                                <Volume2 className="w-4 h-4 text-[#ffd177]/60" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="border-t border-white/10 pt-4 flex flex-col justify-between gap-3">
                        <div className="flex items-center justify-between gap-1.5">
                          <span className="px-2 py-0.5 bg-[#ffd177] text-black border border-black font-mono text-[9px] uppercase tracking-wider font-extrabold rounded">
                            {p.dialectNotes}
                          </span>
                          <span className="font-mono text-xs text-white/60 font-bold block">{p.year}</span>
                        </div>

                        {p.testimonial && (
                          <p className="font-serif italic text-xs text-white/70 leading-relaxed pl-3 border-l-2 border-[#ffd177] line-clamp-3">
                            "{p.testimonial}"
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* AIIS Academic Partner banner */}
            <div className="border-2 border-black bg-[#fff3db] p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-3xl">
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-[#dca63d] uppercase tracking-wider font-bold block">Academic Pillar</span>
                <h4 className="font-serif text-xl font-bold text-black">{AIISPartner.institution}</h4>
                <p className="font-mono text-xs text-black/60">{AIISPartner.period} • {AIISPartner.role}</p>
              </div>
              <ul className="space-y-1.5 text-xs text-black/85 max-w-md">
                {AIISPartner.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#dca63d] shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Subsection 2: Voice Reels */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/10 pb-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-[#dca63d] uppercase tracking-widest font-bold block">02 / Vocal Range Showcase</span>
                <h3 className="font-serif text-2xl font-bold">Voice Reels Playlist</h3>
              </div>
            </div>

            {/* Horizontally scrolling swiper containers */}
            <div 
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {voiceReels.map((reel, index) => (
                <div 
                  key={reel.id}
                  onClick={() => {
                    setActiveReelIndex(index);
                    setIsPlaying(false);
                  }}
                  className={`snap-start shrink-0 w-72 md:w-80 border-2 cursor-pointer p-6 flex flex-col justify-between h-96 relative group transition-all duration-300 ${
                    activeReelIndex === index 
                      ? 'border-black bg-[#ffd177] text-black shadow-md scale-[1.01]' 
                      : 'border-black bg-[#0e0e0e] text-[#f5f2eb] hover:bg-[#0e0e0e]/95'
                  }`}
                >
                  {/* Decorative record ring */}
                  <div className={`absolute top-6 right-6 w-16 h-16 border rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-700 ${
                    activeReelIndex === index ? 'border-black/15 bg-black/5' : 'border-white/10 bg-white/5'
                  }`}>
                    <Mic className={`w-5 h-5 ${activeReelIndex === index ? 'text-black/30' : 'text-white/20'}`} />
                  </div>

                  <div className="space-y-4 pr-16">
                    <span className={`font-mono text-[10px] uppercase tracking-widest block font-bold ${
                      activeReelIndex === index ? 'text-black/55' : 'text-white/40'
                    }`}>
                      TRACK {index + 1}
                    </span>
                    <h4 className={`font-serif text-xl font-bold leading-tight transition-colors ${
                      activeReelIndex === index ? 'text-black' : 'text-white group-hover:text-[#ffd177]'
                    }`}>
                      {reel.title}
                    </h4>
                    <p className={`font-sans text-xs line-clamp-3 leading-relaxed ${
                      activeReelIndex === index ? 'text-black/80' : 'text-white/60'
                    }`}>
                      {reel.description}
                    </p>
                  </div>

                  <div className={`border-t pt-4 flex justify-between items-center ${
                    activeReelIndex === index ? 'border-black/10' : 'border-white/10'
                  }`}>
                    <div>
                      <span className={`font-mono text-[9px] uppercase tracking-wider block ${
                        activeReelIndex === index ? 'text-black/55' : 'text-white/40'
                      }`}>ACCENT LILT</span>
                      <span className={`font-sans text-xs font-bold ${
                        activeReelIndex === index ? 'text-black' : 'text-white'
                      }`}>{reel.accent}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`font-mono text-xs ${
                        activeReelIndex === index ? 'text-black/75' : 'text-white/55'
                      }`}>{reel.duration}</span>
                      {activeReelIndex === index && isPlaying ? (
                        <span className="w-2.5 h-2.5 bg-black rounded-full animate-ping" />
                      ) : (
                        <div className={`w-6 h-6 border rounded-full flex items-center justify-center text-[10px] ${
                          activeReelIndex === index ? 'border-black text-black' : 'border-white text-white'
                        }`}>▶</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* The visual player dashboard */}
            <div className="border-2 border-black p-6 bg-[#0e0e0e] text-[#f5f2eb] flex flex-col lg:flex-row items-center justify-between gap-6 rounded-3xl">
              
              {/* Player details */}
              <div className="space-y-1 w-full lg:w-96 shrink-0 text-left">
                <span className="font-mono text-[9px] text-[#ffd177] uppercase tracking-widest font-black block">Active Dubbing Tape</span>
                <h4 className="font-serif text-lg font-bold text-white leading-tight">
                  {voiceReels[activeReelIndex].title}
                </h4>
                <p className="font-sans text-xs text-white/70">
                  Accent: <strong>{voiceReels[activeReelIndex].accent}</strong>
                </p>
              </div>

              {/* Custom visualizer waveform */}
              <div className="w-full flex-1 space-y-2">
                <div className="h-16 bg-white/5 border border-white/10 flex items-end justify-between p-3 gap-0.5 relative overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-[#ffd177]/5 pointer-events-none" />
                  {waveformBars.map((bHeight, idx) => {
                    const isPassed = (idx / waveformBars.length) < (playbackSeconds / parseDurationToSeconds(voiceReels[activeReelIndex].duration));
                    return (
                      <div 
                        key={idx}
                        className={`w-full max-w-[6px] rounded-full transition-all duration-300 ${
                          isPlaying 
                            ? isPassed ? 'bg-[#ffd177]' : 'bg-white/10'
                            : 'bg-white/20'
                        }`}
                        style={{ height: `${bHeight}%`, minHeight: '4px' }}
                      />
                    );
                  })}
                </div>

                {/* Time display */}
                <div className="flex justify-between items-center text-xs font-mono text-white/50 px-1">
                  <span>{formatSeconds(playbackSeconds)}</span>
                  <span className="text-[8px] uppercase tracking-widest font-bold text-[#ffd177]">
                    {isPlaying ? '▶ DECIBEL DECODER MODULATING' : '■ TRACK STANDBY'}
                  </span>
                  <span>{voiceReels[activeReelIndex].duration}</span>
                </div>
              </div>

              {/* Player controls */}
              <div className="flex items-center gap-4 shrink-0 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 border-white/10 pt-4 lg:pt-0">
                
                {/* Play button */}
                <button 
                  onClick={() => {
                    if (playingCoachAudioId && coachAudioRef.current) {
                      coachAudioRef.current.pause();
                      setPlayingCoachAudioId(null);
                    }
                    if (playbackSeconds === 0 && !isPlaying) {
                      setPlaybackSeconds(1);
                    }
                    setIsPlaying(!isPlaying);
                  }}
                  className={`w-12 h-12 rounded-full border border-black flex items-center justify-center transition-all ${
                    isPlaying 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-[#ffd177] hover:bg-[#ffd177]/80 text-black'
                  }`}
                  title={isPlaying ? "Pause Tape" : "Play Tape"}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5 fill-black" />}
                </button>

                {/* Volume sliders */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-black/60 hover:text-black"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <div className="relative w-24 h-1 bg-black/15 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${isMuted ? 'bg-red-500' : 'bg-black'}`}
                      style={{ width: isMuted ? '0%' : `${playbackVolume}%` }}
                    />
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : playbackVolume}
                      onChange={(e) => {
                        setPlaybackVolume(Number(e.target.value));
                        if (isMuted) setIsMuted(false);
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full"
                    />
                  </div>
                  <span className="font-mono text-[9px] text-black/50 w-6 text-right">
                    {isMuted ? 'M' : `${playbackVolume}%`}
                  </span>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION: MOVEMENT & SKILLS */}
      <section id="cv-section" className="bg-[#0e0e0e] text-white border-t border-b border-black py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#ffd177] uppercase tracking-widest font-bold block">Artistry Flow</span>
              <h2 className="h2 text-white">Movement &amp; skills</h2>
            </div>
            <p className="font-sans text-sm text-white/60 leading-relaxed max-w-sm">
              Husne’s extensive movement routines, classical vocal singing training, and physical body disciplines represent the foundational craft she applies to character embodiment.
            </p>

            {/* CV Download Card */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
              <span className="font-mono text-[10px] text-[#ffd177] uppercase tracking-widest font-bold block">Download Profile PDFs</span>
              <div className="space-y-2.5">
                <a 
                  href="/HUSNE SHABNAM Resume .pdf" 
                  download
                  className="flex items-center justify-between p-3 bg-white/5 border border-white/10 hover:border-[#ffd177] hover:bg-white/10 transition-all rounded-xl group"
                >
                  <span className="font-mono text-[11px] text-white/80 group-hover:text-white">Husne Shabnam Resume</span>
                  <span className="font-mono text-[9px] text-[#ffd177] border border-[#ffd177]/25 px-2 py-0.5 rounded uppercase">PDF</span>
                </a>
                <a 
                  href="/HUSNE SHABNAM ( Acting profile )  2.pdf" 
                  download
                  className="flex items-center justify-between p-3 bg-white/5 border border-white/10 hover:border-[#ffd177] hover:bg-white/10 transition-all rounded-xl group"
                >
                  <span className="font-mono text-[11px] text-white/80 group-hover:text-white">Acting Profile</span>
                  <span className="font-mono text-[9px] text-[#ffd177] border border-[#ffd177]/25 px-2 py-0.5 rounded uppercase">PDF</span>
                </a>
                <a 
                  href="/HUSNE SHABNAM ( Dialect Coaching profile ) .pdf" 
                  download
                  className="flex items-center justify-between p-3 bg-white/5 border border-white/10 hover:border-[#ffd177] hover:bg-white/10 transition-all rounded-xl group"
                >
                  <span className="font-mono text-[11px] text-white/80 group-hover:text-white">Coaching Profile</span>
                  <span className="font-mono text-[9px] text-[#ffd177] border border-[#ffd177]/25 px-2 py-0.5 rounded uppercase">PDF</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: List Layout matching reference image */}
          <div className="lg:col-span-8 space-y-8">
            {skillsList.map((skill, idx) => {
              const numStr = String(idx + 1).padStart(2, '0');
              return (
                <motion.div 
                  key={skill.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05, ease: "easeOut" }}
                  className="border-b border-white/10 pb-8 space-y-3 group"
                >
                  {/* Number Badge */}
                  <span className="font-mono text-xs text-[#ffd177] font-bold tracking-widest block">
                    [{numStr}]
                  </span>
                  
                  {/* Skill Details Row */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    {/* Giant Uppercase Title */}
                    <h4 className="font-sans text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white/90 group-hover:text-[#ffd177] transition-colors leading-tight max-w-xl">
                      {skill.name}
                    </h4>
                    
                    {/* Badge on Right */}
                    <div className="shrink-0 flex items-center">
                      <span className="border border-[#ffd177]/30 text-[#ffd177] px-3 py-1 font-mono text-[9.5px] uppercase tracking-widest font-bold rounded">
                        LEVEL // {skill.level.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION: Q&A / INTERVIEW (প্রশ্নোত্তর) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#dca63d] uppercase tracking-widest font-bold block">Interview Dialogues</span>
              <h2 className="h2">Actor Q&amp;A session</h2>
            </div>
            <p className="b2 mt-4 max-w-sm text-black/60 font-sans leading-relaxed font-medium">
              Diving deep into the creative approach, rehearsal rituals, and off-camera lifestyle. Click on the direct booking matrix to consult.
            </p>
          </div>

          {/* Column 2: Typographic Interview rows */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="border-2 border-black bg-[#fff3db] p-6 space-y-3 rounded-3xl shadow-sm">
              <h4 className="b1 text-black font-black">Q: What makes a good actor, in your opinion?</h4>
              <p className="b2 leading-relaxed text-black/80 font-medium">
                I believe a good actor understands the absolute truth, the core purpose, and the cultural landscape of the character they portray. The performance can be highly stylized, but if it lacks emotional honesty and physical grounding, it fails to connect with the audience.
              </p>
            </div>

            <div className="border-2 border-black bg-[#fff3db] p-6 space-y-3 rounded-3xl shadow-sm">
              <h4 className="b1 text-black font-black">Q: How do you prepare for a dialect coaching contract?</h4>
              <p className="b2 leading-relaxed text-black/80 font-medium">
                My preparation is deeply phonetic and performative. I map out accent contours, syllable values, and vowel changes directly onto the scripts. But more importantly, I work with the actor on character psychology: understanding where the sound comes from physically and culturally in the body.
              </p>
            </div>

            <div className="border-2 border-black bg-[#fff3db] p-6 space-y-3 rounded-3xl shadow-sm">
              <h4 className="b1 text-black font-black">Q: What is your lifestyle like off-set?</h4>
              <p className="b2 leading-relaxed text-black/80 font-medium">
                I maintain a highly disciplined, structured lifestyle. You will see me sweating at movement classes, practicing Yoga &amp; Pranayama breathing patterns, cooking native regional recipes, or listening to dialect tapes to study speech structures. Continuous training is crucial for keeping the instrument ready.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION: CONTACT HOTLINE & BOOKING FORM (যোগাযোগ) */}
      <section id="booking-contact" className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Info desk */}
          <div className="lg:col-span-5 border-2 border-black bg-[#fff3db] p-8 flex flex-col justify-between space-y-8 rounded-3xl shadow-sm">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-[#dca63d] uppercase tracking-widest font-bold block">Representative Desk</span>
                <h3 className="h2">Hotline &amp; contact</h3>
              </div>
              <p className="b2 text-black/60 leading-relaxed font-medium">
                Connect directly for acting auditions, dialect coaching contracts, theatrical accent mapping, or project casting consultations.
              </p>

              {/* Direct links */}
              <div className="space-y-3 pt-2">
                
                <div className="flex items-center gap-4 bg-[#fff3db] border-2 border-black p-4 rounded-2xl shadow-sm group">
                  <div className="w-10 h-10 bg-black text-[#ffd177] flex items-center justify-center shrink-0 rounded-xl group-hover:bg-[#ffd177] group-hover:text-black transition-colors border border-black">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-black/40 block font-bold">Email address</span>
                    <button 
                      onClick={() => copyToClipboard('husneshabnam.connect@gmail.com', 'form-email')}
                      className="font-serif text-sm font-bold text-black hover:text-[#dca63d] hover:underline text-left duration-150 block"
                    >
                      husneshabnam.connect@gmail.com
                    </button>
                    <span className="font-mono text-[8.5px] text-[#dca63d] block mt-0.5 font-bold">
                      {copiedText === 'form-email' ? '✓ Copied Address' : 'Copy Email Address'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-[#fff3db] border-2 border-black p-4 rounded-2xl shadow-sm group">
                  <div className="w-10 h-10 bg-black text-[#ffd177] flex items-center justify-center shrink-0 rounded-xl group-hover:bg-[#ffd177] group-hover:text-black transition-colors border border-black">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-black/40 block font-bold">Hotline phone</span>
                    <button 
                      onClick={() => copyToClipboard('+918240526006', 'form-phone')}
                      className="font-mono text-sm font-bold text-black hover:text-[#dca63d] hover:underline text-left duration-150 block"
                    >
                      +91 8240526006
                    </button>
                    <span className="font-mono text-[8.5px] text-[#dca63d] block mt-0.5 font-bold">
                      {copiedText === 'form-phone' ? '✓ Copied Hotline' : 'Copy Direct Hotline'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-[#fff3db] border-2 border-black p-4 rounded-2xl shadow-sm group">
                  <div className="w-10 h-10 bg-black text-[#ffd177] flex items-center justify-center shrink-0 rounded-xl group-hover:bg-[#ffd177] group-hover:text-black transition-colors border border-black">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-black/40 block font-bold">Instagram profile</span>
                    <a 
                      href="https://www.instagram.com/husn_e_shabnam?igsh=Ymt5MWF2eG4yNTR1&utm_source=qr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-sm font-bold text-black hover:text-[#dca63d] hover:underline flex items-center gap-1 duration-150"
                    >
                      @husn_e_shabnam
                      <ArrowRight className="w-3 h-3 text-[#dca63d]" />
                    </a>
                    <span className="font-mono text-[8.5px] text-black/45 block mt-0.5">Follow and direct message</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Saved log list */}
            {savedBookings.length > 0 && (
              <div className="space-y-3 border-t-2 border-black/10 pt-6">
                <span className="font-mono text-[9px] uppercase tracking-widest text-black/50 font-bold block">
                  Pending proposals ({savedBookings.length})
                </span>
                <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
                  {savedBookings.map((b) => (
                    <div key={b.id} className="bg-[#fff3db] border-2 border-black p-3 rounded-xl text-xs space-y-1 shadow-sm">
                      <div className="flex justify-between items-center gap-2">
                        <span className="font-serif font-bold text-black truncate">{b.projectName}</span>
                        <span className="px-1.5 py-0.5 bg-[#ffd177] text-black border border-black font-mono text-[8px] uppercase rounded font-bold">
                          Transmitted
                        </span>
                      </div>
                      <p className="text-[10px] text-black/60 font-medium">Service: {b.serviceType} ({b.platformTarget})</p>
                      <div className="flex justify-between items-center text-[9px] pt-1 border-t border-black/10 mt-1">
                        <span className="text-black/60 font-mono font-bold">{b.submittedAt}</span>
                        <span className="text-[#dca63d] italic font-black">{b.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right panel: Form */}
          <div className="lg:col-span-7 border-2 border-black bg-[#fff3db] p-8 rounded-3xl shadow-sm">
            {bookingStatus === 'submitted' ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-5 animate-fade-in">
                <div className="w-16 h-16 bg-[#ffd177]/20 border-2 border-black rounded-full flex items-center justify-center text-[#dca63d]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif text-2xl font-black text-black">Proposal Transmitted!</h4>
                  <p className="text-xs text-black/60 max-w-sm mx-auto leading-relaxed">
                    Husne Shabnam's representative team will review your script parameters for <strong>{bookingFormData.projectName}</strong> and respond at <strong>{bookingFormData.clientEmail}</strong> within 48 hours.
                  </p>
                </div>
                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 bg-[#0e0e0e] hover:bg-[#ffd177] hover:text-black text-white font-mono text-xs uppercase tracking-widest font-black transition-all"
                >
                  Create another proposal
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="font-mono text-xs text-[#dca63d] uppercase tracking-wider block font-bold">Interactive Casting Deck</span>
                  <h4 className="font-serif text-xl font-bold text-black">Consolidated Audition Request</h4>
                  <p className="text-xs text-black/50">Submit project specifications to directly lock date blocks or rehearsal spaces.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase text-black/50 block font-bold">Your Name / Agency</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Dharma Casting Office"
                      value={bookingFormData.clientName}
                      onChange={(e) => setBookingFormData({...bookingFormData, clientName: e.target.value})}
                      className="w-full bg-[#fff3db] border border-black/20 rounded px-3 py-2 text-xs text-black focus:outline-none focus:ring-1 focus:ring-[#ffd177] focus:border-black placeholder:text-black/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase text-black/50 block font-bold">Contact Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. rep@agency.com"
                      value={bookingFormData.clientEmail}
                      onChange={(e) => setBookingFormData({...bookingFormData, clientEmail: e.target.value})}
                      className="w-full bg-[#fff3db] border border-black/20 rounded px-3 py-2 text-xs text-black focus:outline-none focus:ring-1 focus:ring-[#ffd177] focus:border-black placeholder:text-black/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase text-black/50 block font-bold">Project Title</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Rocky Aur Rani Sequel"
                      value={bookingFormData.projectName}
                      onChange={(e) => setBookingFormData({...bookingFormData, projectName: e.target.value})}
                      className="w-full bg-[#fff3db] border border-black/20 rounded px-3 py-2 text-xs text-black focus:outline-none focus:ring-1 focus:ring-[#ffd177] focus:border-black placeholder:text-black/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase text-black/50 block font-bold">Requested Service</label>
                    <select 
                      value={bookingFormData.serviceType}
                      onChange={(e) => setBookingFormData({...bookingFormData, serviceType: e.target.value})}
                      className="w-full bg-[#fff3db] border border-black/20 rounded px-3 py-2 text-xs text-black focus:outline-none focus:ring-1 focus:ring-[#ffd177] focus:border-black"
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
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase text-black/50 block font-bold">Platform Scope</label>
                    <select 
                      value={bookingFormData.platformTarget}
                      onChange={(e) => setBookingFormData({...bookingFormData, platformTarget: e.target.value})}
                      className="w-full bg-[#fff3db] border border-black/20 rounded px-3 py-2 text-xs text-black focus:outline-none focus:ring-1 focus:ring-[#ffd177] focus:border-black"
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
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] uppercase text-black/50 block font-bold">Budget Scale</label>
                    <select 
                      value={bookingFormData.estimatedBudget}
                      onChange={(e) => setBookingFormData({...bookingFormData, estimatedBudget: e.target.value})}
                      className="w-full bg-[#fff3db] border border-black/20 rounded px-3 py-2 text-xs text-black focus:outline-none focus:ring-1 focus:ring-[#ffd177] focus:border-black"
                    >
                      <option value="Standard Association Rate">Standard Association Guild Rate</option>
                      <option value="Indie Film Tier">Indie Film Scale / Grant Fund</option>
                      <option value="High Production Scale">High Production Commercial Budget</option>
                      <option value="To Be Discussed / Open">To Be Negotiated on Call</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[9px] uppercase text-black/50 block font-bold">Audition Script Notes / Dialect parameters</label>
                  <textarea 
                    rows={3}
                    placeholder="Provide character bio summaries, dialect scripts, or expected call sheet dates..."
                    value={bookingFormData.messageDetails}
                    onChange={(e) => setBookingFormData({...bookingFormData, messageDetails: e.target.value})}
                    className="w-full bg-[#fff3db] border border-black/20 rounded px-3 py-2 text-xs text-black focus:outline-none focus:ring-1 focus:ring-[#ffd177] focus:border-black placeholder:text-black/30 resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-[#0e0e0e] hover:bg-[#ffd177] hover:text-black text-white font-mono text-xs uppercase tracking-widest font-black transition-all flex items-center justify-center gap-2 shadow cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Transmit Casting Proposal
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* FOOTER CODA */}
      <footer className="max-w-7xl mx-auto px-6 md:px-12 pt-16 border-t border-black/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h5 className="font-serif text-lg font-black uppercase text-black">HUSNE SHABNAM</h5>
            <p className="font-sans text-xs text-black/40 mt-1">
              Equity / Cine Artist • Professional Theatrical Dialect Coach.
            </p>
          </div>

          <p className="font-mono text-[10px] text-black/35 text-center">
            © {new Date().getFullYear()} Husne Shabnam. All Rights Reserved. Mumbai &amp; West Bengal.
          </p>
        </div>
      </footer>

      {/* ARTICLE READER MODAL */}
      <AnimatePresence>
        {readingArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10"
            onClick={() => setReadingArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#fcfaf6] text-[#0e0e0e] max-w-3xl w-full max-h-[92vh] overflow-y-auto rounded-3xl border-2 border-black shadow-2xl p-6 sm:p-10 relative flex flex-col justify-between"
            >
              <div>
                {/* Sticky close & header bar */}
                <div className="flex items-center justify-between border-b-2 border-black/10 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-[#b91c1c] text-white font-mono text-[9px] uppercase tracking-widest font-black rounded-full">
                      {readingArticle.badge}
                    </span>
                    <span className="font-mono text-[10px] text-black/60 uppercase tracking-wider font-bold">
                      {readingArticle.publication} • {readingArticle.date}
                    </span>
                  </div>
                  <button
                    onClick={() => setReadingArticle(null)}
                    className="w-9 h-9 rounded-full bg-black/5 hover:bg-black text-black hover:text-white flex items-center justify-center transition-all cursor-pointer"
                    title="Close Reader"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Article Content */}
                <article className="space-y-6">
                  
                  {/* Headline */}
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-black leading-tight">
                    {readingArticle.headline}
                  </h2>

                  {/* Byline */}
                  <div className="flex flex-wrap items-center justify-between gap-2 py-2.5 border-y border-black/10 font-mono text-[11px] text-black/60">
                    <span>Reported by: <strong className="text-black">{readingArticle.author}</strong> ({readingArticle.authorRole})</span>
                    <span>Est. Read: {readingArticle.readTime}</span>
                  </div>

                  {/* Hero image with caption */}
                  <div className="rounded-2xl overflow-hidden border border-black/10 shadow-sm bg-black">
                    <img
                      src={readingArticle.imageUrl}
                      alt={readingArticle.headline}
                      className="w-full h-auto max-h-[400px] object-cover"
                    />
                    <div className="px-4 py-2 bg-black/90 text-white/60 font-mono text-[9px] flex justify-between items-center">
                      <span>Photo courtesy: Filmibeat / Netflix India</span>
                      <span>Lust Stories 3 Cast Feature</span>
                    </div>
                  </div>

                  {/* Subheadline Lead */}
                  <p className="font-sans text-base text-black/80 font-medium leading-relaxed italic border-l-4 border-[#ffd177] pl-4">
                    {readingArticle.subheadline}
                  </p>

                  {/* Story Paragraphs */}
                  <div className="space-y-8 font-sans text-sm sm:text-base text-black/85 leading-relaxed pt-2">
                    {readingArticle.fullStory.map((section, sIdx) => (
                      <div key={sIdx} className="space-y-3">
                        {section.sectionHeading && (
                          <h4 className="font-serif text-lg sm:text-xl font-bold text-black pt-2 border-b border-black/10 pb-1">
                            {section.sectionHeading}
                          </h4>
                        )}
                        {section.paragraphs.map((para, pIdx) => (
                          <p key={pIdx} className="leading-relaxed">
                            {para}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Pull Quote Spotlight in Modal */}
                  <div className="border-2 border-black bg-[#fff3db] p-6 rounded-2xl space-y-2 mt-6">
                    <Quote className="w-5 h-5 text-[#dca63d] fill-[#dca63d]" />
                    <p className="font-serif italic text-base sm:text-lg text-black font-semibold leading-snug">
                      "{readingArticle.pullQuote}"
                    </p>
                    <p className="font-mono text-[10px] text-black/60 uppercase tracking-widest text-right font-bold pt-1">
                      — {readingArticle.pullQuoteSpeaker}
                    </p>
                  </div>

                </article>
              </div>

              {/* Bottom Actions */}
              <div className="mt-10 pt-6 border-t-2 border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href={readingArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-[#0e0e0e] hover:bg-[#ffd177] hover:text-black text-white font-mono text-xs uppercase tracking-widest font-black rounded-full transition-all flex items-center justify-center gap-2 shadow"
                >
                  <span>Open Full Story on Filmibeat</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setReadingArticle(null)}
                  className="w-full sm:w-auto px-6 py-3 border-2 border-black hover:bg-black/5 text-black font-mono text-xs uppercase tracking-widest font-black rounded-full transition-all text-center cursor-pointer"
                >
                  Close Reader
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
