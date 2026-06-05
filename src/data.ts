import { ActorProject, DialectCoachProject, VoiceDemo, PersonalDetails, SkillItem } from './types';

export const personalDetails: PersonalDetails = {
  age: 30,
  height: "5'2\"",
  weight: "48 kg",
  currentLocation: "Mumbai, India",
  hometown: "Guskara, West Bengal",
  languages: ["English", "Hindi", "Bengali", "Marathi", "Urdu"]
};

export const bioSummary = {
  actorProfile: "A trained actor with 10+ years of experience in theatre and screen, Husne Shabnam brings a strong foundation in performance, movement, and voice. With work across web series, films, and international platforms, she blends emotional depth with physical awareness in her craft.",
  actingApproach: "Husne’s work is rooted in theatre discipline, combining emotional authenticity with strong physical and vocal awareness. Her training in movement, yoga, and martial arts allows her to approach characters with depth, control, and fluidity.",
  coachProfile: "Born and raised in the heart of Bengal, Husne Shabnam brings deep cultural authenticity and linguistic precision to her work. Currently based in Mumbai, she works across film, streaming, and global productions as a dialect coach and actor with 5+ years of professional coaching experience.",
  coachApproach: "Husne's process combines linguistic accuracy with performance psychology. Her coaching ensures that actors not only sound authentic but embody the cultural and emotional truth of the language.",
  coachPositioning: [
    "Experienced with globally distributed streaming content and high-budget productions.",
    "Strong understanding of cross-cultural storytelling dynamics.",
    "Comfortable working with international actors, high-profile casts, and professional crews.",
    "Focused on realism, phonetic clarity, and performance-driven dialect work."
  ]
};

export const actorProjects: ActorProject[] = [
  {
    id: "act-1",
    project: "Tribhuvan Mishra: CA Topper",
    year: "2024",
    role: "Primary Character – Reeta",
    director: "Amrit Raj Gupta",
    platform: "Netflix",
    featured: true,
    synopsis: "An elegant, critically-acclaimed satirical drama series where Husne delivers a scene-stealing performance as a key recurring supporting character."
  },
  {
    id: "act-2",
    project: "Lust Stories 3",
    year: "TBA",
    role: "Primary Character – Mishty",
    director: "Vishal Bhardwaj",
    platform: "Netflix",
    featured: true,
    synopsis: "Collaborator in legendary director Vishal Bhardwaj's segment, handling a nuanced, character-driven leading role."
  },
  {
    id: "act-3",
    project: "Hero Kaun",
    year: "2025",
    role: "Lead – Lily",
    director: "Arpita Pattanayak",
    platform: "YouTube",
    featured: true,
    synopsis: "A suspenseful drama showcasing her versatility and emotional spectrum in a principal character role."
  },
  {
    id: "act-4",
    project: "Rocky Aur Rani Kii Prem Kahaani",
    year: "2023",
    role: "Cameo",
    director: "Karan Johar",
    platform: "Amazon Prime Video",
    synopsis: "A specialized performance cameo and collaborative contribution to Karan Johar's box office blockbuster."
  },
  {
    id: "act-5",
    project: "Brown",
    year: "TBA",
    role: "Cameo (Actor & Singer) – Nisha",
    director: "Abhinay Deo",
    platform: "ZEE Studios",
    synopsis: "Dual talent showcase combining her acting presence and formal singing training in a cameo performance."
  },
  {
    id: "act-6",
    project: "Jharokh",
    year: "2021",
    role: "Lead – Draupadi",
    director: "Aneek Chaudhuri",
    platform: "Amazon Prime Video / Apple TV",
    synopsis: "A spectacular translation of Draupadi's epic journey in building an avant-garde arthouse cinematic project."
  },
  {
    id: "act-7",
    project: "Robindronath Ekhane Kawkhono Khete Asenni",
    year: "2021",
    role: "Primary Cast – Somarani",
    director: "Srijit Mukherji",
    platform: "Hoichoi",
    synopsis: "A highly-rated Bengali mystery thriller series with a sharp, dark and enigmatic execution."
  }
];

export const coachProjects: DialectCoachProject[] = [
  {
    id: "coach-1",
    project: "Rocky Aur Rani Kii Prem Kahaani",
    year: "2023",
    director: "Karan Johar",
    producerStudio: "Dharma Productions",
    platform: "Amazon Prime Video",
    actorsCoached: ["Shabana Azmi", "Alia Bhatt", "Namit Das"],
    dialectNotes: "Bengali dialect coaching",
    testimonial: "Helped screen legend Shabana Azmi and superstar Alia Bhatt master complex regional linguistic patterns, earning critical acclaim for the authenticity of the Bengali lines in the movie."
  },
  {
    id: "coach-2",
    project: "Pippa",
    year: "2023",
    director: "Raja Krishna Menon",
    producerStudio: "RSVP Movies",
    platform: "Amazon Prime Video",
    actorsCoached: ["Inaamulhaq"],
    dialectNotes: "Bangladeshi Bengali dialect",
    testimonial: "Detailed phonetic map training and syllable pacing adjustments to achieve a historic East Bengal dialect structure."
  },
  {
    id: "coach-3",
    project: "PhonePe National Campaign",
    year: "2023",
    director: "—",
    producerStudio: "PhonePe",
    platform: "Digital Campaign",
    actorsCoached: ["Amitabh Bachchan"],
    dialectNotes: "Commercial dialect coaching",
    testimonial: "Instructed legendary Indian icon Amitabh Bachchan on precise regional inflections for a massive nationwide marketing spotlight."
  },
  {
    id: "coach-4",
    project: "In Bloom – Alta",
    year: "2024",
    director: "Priyanka Banerjee",
    producerStudio: "MTV Staying Alive Foundation, Bill & Melinda Gates Foundation",
    platform: "YouTube",
    actorsCoached: ["Mazel Vyas"],
    dialectNotes: "Short film anthology project"
  },
  {
    id: "coach-5",
    project: "Brown (Upcoming Series)",
    year: "Upcoming",
    director: "Abhinay Deo",
    producerStudio: "ZEE Studios",
    platform: "TBA",
    actorsCoached: ["Karisma Kapoor", "Surya Sharma"],
    dialectNotes: "Series dialect coaching"
  },
  {
    id: "coach-6",
    project: "The Revolutionaries (Upcoming Series)",
    year: "Upcoming",
    director: "Nikkhil Advani",
    producerStudio: "Emmay Entertainment / Amazon Prime Video",
    platform: "TBA",
    actorsCoached: ["Bhuvan Bam"],
    dialectNotes: "Series dialect coaching"
  },
  {
    id: "coach-7",
    project: "EKA (Upcoming)",
    year: "Upcoming",
    director: "Suman Sen",
    producerStudio: "—",
    platform: "TBA",
    actorsCoached: ["Rakeysh Omprakash Mehra"],
    dialectNotes: "Dialect coaching & linguistic mapping"
  }
];

export const AIISPartner = {
  institution: "American Institute of Indian Studies",
  period: "2017–2020",
  role: "Bengali Language Partner",
  details: [
    "Taught Bengali to American university students in immersive language programs.",
    "Specialized in phonetic training, conversational fluency, and colloquial idioms.",
    "Formulated dynamic curricula focusing on cultural immersion and performative learning modules."
  ]
};

export const skillsList: SkillItem[] = [
  // Acting
  { name: "Theatre (10+ Years)", category: "Acting", level: "Expert" },
  { name: "Stanislavski System & Method Action", category: "Acting", level: "Expert" },
  { name: "Character Script Analysis", category: "Acting", level: "Expert" },
  
  // Movement
  { name: "Yoga & Breathwork (Pranayama)", category: "Movement/Physical", level: "Expert" },
  { name: "Movement Training & Body Control", category: "Movement/Physical", level: "Expert" },
  { name: "Kalaripayattu (Indian Martial Art)", category: "Movement/Physical", level: "Beginner" },
  { name: "Contemporary / Free Flow Dance", category: "Movement/Physical", level: "Intermediate" },
  { name: "Swimming", category: "Movement/Physical", level: "Intermediate" },
  
  // Vocal
  { name: "Singing (Classical & Folk)", category: "Vocal/Dialect", level: "Expert" },
  { name: "Diction & Phonetic Coaching", category: "Vocal/Dialect", level: "Expert" },
  { name: "Accent & Syllable Mapping", category: "Vocal/Dialect", level: "Expert" },
  { name: "Multilingual Dubbing & Sync Dubbing", category: "Vocal/Dialect", level: "Expert" },
  { name: "Character Accent Voices & Modulation", category: "Vocal/Dialect", level: "Expert" }
];

export const otherWorkList = [
  { category: "Commercials", details: "Yokohama Tyres, Amway India, Plix Life, Lux Cozi, and more." },
  { category: "Formats", details: "Music Videos, Short Films, Independent Documentaries, and TVCs." }
];

export const voiceReels: VoiceDemo[] = [
  {
    id: "voice-1",
    title: "Bengali Native Dialogue & Monologue",
    description: "Deep, authentic, emotionally expressive monologue with rich cultural inflection and precise breath control.",
    accent: "Standard Bengali (West Bengal & Shuddh)",
    duration: "1:24"
  },
  {
    id: "voice-2",
    title: "Bangladeshi Dialect (Regional Performance)",
    description: "A softer, melodic accent with regional Bangladeshi colloquial structures and speech patterns.",
    accent: "Standard Bangladeshi (Dhaka / East Bengal)",
    duration: "1:08"
  },
  {
    id: "voice-3",
    title: "Hindi-Bengali Accent Modulation",
    description: "Designed for character-inflected dubbing, capturing the delicate lilt of a native Bengali speaker speaking Hindi.",
    accent: "Hindi with delicate Bengali Lilt",
    duration: "0:45"
  },
  {
    id: "voice-4",
    title: "English Corporate & Narrative Dubbing",
    description: "Neutral global accent with crisp syllable articulation, deep narration range, and professional cadence.",
    accent: "Neutral English (Global / Indian International)",
    duration: "1:40"
  },
  {
    id: "voice-5",
    title: "High-Energy Animation Accent / Character",
    description: "Dynamic vocal shift demonstrating extensive range and playful pitch control, excellent for anime and cartoons.",
    accent: "Character/Expressive High-Pitch Voice",
    duration: "0:52"
  }
];

export const portraitGallery = [
  {
    title: "Theatrical Dramatic Profile",
    description: "Black and white emotional depth study.",
    imagePath: "/src/assets/images/husne_cinematic_bw_1780647337773.png",
    aspectRatio: "3:4",
    category: "Theatrical"
  },
  {
    title: "Traditional Indian Expression",
    description: "Serene posture representing authentic South Asian heritage and stage roles in custom handloomed saree.",
    imagePath: "/src/assets/images/husne_traditional_saree_1780647353617.png",
    aspectRatio: "3:4",
    category: "Traditional"
  },
  {
    title: "Bodily Awareness & Athletic",
    description: "High-energy movement training, showcasing strength and physical yoga disciplines.",
    imagePath: "/src/assets/images/husne_athletic_movement_1780647368168.png",
    aspectRatio: "3:4",
    category: "Physical"
  },
  {
    title: "Professional Linguistic Profile",
    description: "Friendly, intellectual studio capture illustrating her coaching and language training persona.",
    imagePath: "/src/assets/images/husne_dialect_coach_1780647382729.png",
    aspectRatio: "3:4",
    category: "Coaching"
  }
];
