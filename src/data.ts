import { ActorProject, DialectCoachProject, VoiceDemo, PersonalDetails, SkillItem, PressArticle } from './types';

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
    id: "act-2",
    project: "Lust Stories 3",
    year: "TBA",
    role: "Primary Character – Mishty",
    director: "Vishal Bhardwaj",
    platform: "Netflix",
    featured: true,
    synopsis: "Collaborator in legendary director Vishal Bhardwaj's segment, handling a nuanced, character-driven leading role.",
    imageUrl: "https://res.cloudinary.com/dpdtsaalf/image/upload/v1790003443/photo_c6c4ly.avif"
  },
  {
    id: "act-4",
    project: "Rocky Aur Rani Kii Prem Kahaani",
    year: "2023",
    role: "Cameo",
    director: "Karan Johar",
    platform: "Amazon Prime Video",
    synopsis: "A specialized performance cameo and collaborative contribution to Karan Johar's box office blockbuster.",
    imageUrl: "https://res.cloudinary.com/dpdtsaalf/image/upload/v1781356994/MV5BMzE0Yzc4OGItODY3ZC00ZDgyLWI0NjUtZWM3OGMxNjEzNDYyXkEyXkFqcGc._V1__v0hpum.jpg"
  },
  {
    id: "act-1",
    project: "Tribhuvan Mishra: CA Topper",
    year: "2024",
    role: "Primary Character – Reeta",
    director: "Amrit Raj Gupta",
    platform: "Netflix",
    featured: true,
    synopsis: "An elegant, critically-acclaimed satirical drama series where Husne delivers a scene-stealing performance as a key recurring supporting character.",
    imageUrl: "https://res.cloudinary.com/dpdtsaalf/image/upload/v1781355234/MV5BOGMyOWU0MzAtNWYyZi00NWE4LWIwNGUtODMxYjdjY2Y4MTU3XkEyXkFqcGc._V1__t2u21i.jpg"
  },
  {
    id: "act-3",
    project: "Hero Kaun",
    year: "2025",
    role: "Lead – Lily",
    director: "Arpita Pattanayak",
    platform: "YouTube",
    featured: true,
    synopsis: "A suspenseful drama showcasing her versatility and emotional spectrum in a principal character role.",
    imageUrl: "https://res.cloudinary.com/dpdtsaalf/image/upload/v1781356377/maxresdefault_odpsrq.jpg"
  },
  {
    id: "act-5",
    project: "Brown",
    year: "TBA",
    role: "Cameo (Actor & Singer) – Nisha",
    director: "Abhinay Deo",
    platform: "ZEE Studios",
    synopsis: "Dual talent showcase combining her acting presence and formal singing training in a cameo performance.",
    imageUrl: "https://res.cloudinary.com/dpdtsaalf/image/upload/v1781357444/Brown__2026_TV_series_q4ro5i.jpg"
  },
  {
    id: "act-6",
    project: "Jharokh",
    year: "2021",
    role: "Lead – Draupadi",
    director: "Aneek Chaudhuri",
    platform: "Amazon Prime Video / Apple TV",
    synopsis: "A spectacular translation of Draupadi's epic journey in building an avant-garde arthouse cinematic project.",
    imageUrl: "https://res.cloudinary.com/dpdtsaalf/image/upload/v1781357863/57144253a2c2bc3486d68f38cafa8b944555b7bc6d161c6fc0bd9be5f26bef76_hkzyyu.jpg"
  },
  {
    id: "act-7",
    project: "Robindronath Ekhane Kawkhono Khete Asenni",
    year: "2021",
    role: "Primary Cast – Somarani",
    director: "Srijit Mukherji",
    platform: "Hoichoi",
    synopsis: "A highly-rated Bengali mystery thriller series with a sharp, dark and enigmatic execution.",
    imageUrl: "https://res.cloudinary.com/dpdtsaalf/image/upload/v1781358096/MV5BNDhkNTYyNTAtOWNmNy00ZDc0LWEyZTQtNzExMjQzODEwYjBlXkEyXkFqcGc._V1_FMjpg_UX1000__qjsbwq.jpg"
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
    project: "For National Ad Campaign",
    year: "2023",
    director: "—",
    producerStudio: "National Campaign",
    platform: "Digital Campaign",
    actorsCoached: ["Amitabh Bachchan"],
    dialectNotes: "Commercial dialect coaching",
    testimonial: "Instructed legendary Indian icon Amitabh Bachchan on precise regional inflections for a massive nationwide marketing spotlight.",
    audioUrl: "https://res.cloudinary.com/dpdtsaalf/video/upload/v1790180750/WhatsApp_Audio_2026-09-21_at_11.07.05_PM_m1z4js.mp4"
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
    project: "Brown",
    year: "Upcoming",
    director: "Abhinay Deo",
    producerStudio: "ZEE Studios",
    platform: "TBA",
    actorsCoached: ["Karisma Kapoor", "Surya Sharma"],
    dialectNotes: "Series dialect coaching"
  },
  {
    id: "coach-6",
    project: "The Revolutionaries",
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
    imagePath: "https://res.cloudinary.com/dpdtsaalf/image/upload/v1781353663/69e21bd4-1ad9-4c4c-9b09-3ac1f35e5195_yzqzwc.jpg",
    aspectRatio: "3:4",
    category: "Theatrical"
  },
  {
    title: "Traditional Indian Expression",
    description: "Serene posture representing authentic South Asian heritage and stage roles in custom handloomed saree.",
    imagePath: "https://res.cloudinary.com/dpdtsaalf/image/upload/v1781353664/15B86EEA-BCE4-48FF-B916-2F9ABBDE9A8F_unsbgt.jpg",
    aspectRatio: "3:4",
    category: "Traditional"
  },
  {
    title: "Bodily Awareness & Athletic",
    description: "High-energy movement training, showcasing strength and physical yoga disciplines.",
    imagePath: "https://res.cloudinary.com/dpdtsaalf/image/upload/v1781353664/7F54452A-4121-49B7-AC0C-6C23DAFBC3BB_hqt3sw.jpg",
    aspectRatio: "3:4",
    category: "Physical"
  },
  {
    title: "Professional Linguistic Profile",
    description: "Friendly, intellectual studio capture illustrating her coaching and language training persona.",
    imagePath: "https://res.cloudinary.com/dpdtsaalf/image/upload/v1781353672/_DSC2189_zajqzg.jpg",
    aspectRatio: "3:4",
    category: "Coaching"
  }
];

export const pressArticles: PressArticle[] = [
  {
    id: "filmibeat-lust-stories-3",
    publication: "Filmibeat",
    author: "Abhishek Ranjit",
    authorRole: "Assistant Editor",
    date: "September 22, 2026",
    readTime: "4 min read",
    headline: "Lust Stories 3: Husne Shabnam On Working With Aditi Rao Hydari, Vishal Bhardwaj's Unique Process",
    subheadline: "Exclusive interview on portraying Mishty, secret tissue-paper auditions, and sharing screen space with Aditi Rao Hydari and Gajraj Rao.",
    url: "https://www.filmibeat.com/bollywood/ott/2026/lust-stories-3-husne-shabnam-on-working-with-aditi-rao-hydari-vishal-bhardwaj-unique-process-532109.html",
    imageUrl: "https://images.filmibeat.com/img/2026/09/luststories3husneshabnaminterview-67331790095966.jpg",
    badge: "Filmibeat Exclusive",
    excerpt: "Actress and dialect coach Husne Shabnam, currently seen as Mishty in Netflix's Lust Stories 3, opens up about Vishal Bhardwaj's secret audition process, sisterhood, and starstruck moments alongside Aditi Rao Hydari.",
    pullQuote: "Sir came to each of us and handed us a small piece of tissue paper with our character name written on it. When I opened mine and saw Mishty, it was such a simple but memorable moment.",
    pullQuoteSpeaker: "Husne Shabnam on discovering her Lust Stories 3 role",
    keyQuotes: [
      {
        topic: "On The Secret Tissue-Paper Auditions",
        quote: "We began with a table read where all six of us were present. Sir introduced us to the world and the characters but deliberately kept our individual character identities a secret. None of us knew who was playing whom. We were asked to prepare all the dialogues, so all six girls learned the dialogues of every character. The characters were finally revealed during our look test. Sir came to each of us and handed us a small piece of tissue paper with our character name written on it. I remember feeling like I was waiting for my examination result! When I opened mine and saw Mishty, it was such a memorable moment."
      },
      {
        topic: "On Her Character 'Mishty'",
        quote: "Mishty is a young, lower-middle-class Muslim girl from Hyderabad who is studying Urdu literature. She is curious, playful and mischievous, especially around her closest group of girlfriends. They have created their own safe space where they can talk about things they wouldn't discuss openly elsewhere - relationships, desire, marriage, sex and all the questions they have about what comes next."
      },
      {
        topic: "On Working with Aditi Rao Hydari",
        quote: "I was genuinely very excited to meet Aditi because I have admired her work for years. She is incredibly graceful, beautiful and such a wonderful artist. I was honestly quite starstruck. I remember telling her, 'Baji, aap itni khoobsurat kyun ho? Main apne aap ko control nahi kar paa rahi hoon!' I was genuinely that overwhelmed every time I saw her on set."
      },
      {
        topic: "On Gajraj Rao's Improvisations",
        quote: "Gajraj sir is such a brilliant improviser. He brought so much spontaneity to Abbu Jaan that we were always curious to see what he would do next. There was a scene where he improvised something so naturally that, for a moment, I actually wondered whether it was scripted."
      }
    ],
    fullStory: [
      {
        sectionHeading: "Stepping into Netflix's Lust Stories 3",
        paragraphs: [
          "Actress and dialect coach Husne Shabnam, who is currently seen as Mishty in Netflix's Lust Stories 3, features in the Vishal Bhardwaj-directed segment of the anthology alongside Aditi Rao Hydari and Siddharth.",
          "In an exclusive conversation with Filmibeat Assistant Editor Abhishek Ranjit, Shabnam opens up about her character, working with Vishal Bhardwaj and her experience on set."
        ]
      },
      {
        sectionHeading: "The World of Mishty",
        paragraphs: [
          "Talking about Mishty, Husne says: 'Mishty is a young, lower-middle-class Muslim girl from Hyderabad who is studying Urdu literature. She is at an interesting transitional point in her life, approaching her final college examination. In the world she comes from, completing college also means stepping into marriage and adulthood. While education is important to her, there is also an underlying expectation that she will eventually get married and build her life around her husband and family.'",
          "She adds: 'Mishty has grown up in an environment where conversations around relationships and sexuality are not openly encouraged. Dating or having a boyfriend is simply not an option for girls like her. But she is curious, playful and mischievous, especially around her closest group of girlfriends. They have created their own safe space where they can talk about things they wouldn't discuss openly elsewhere — relationships, desire, marriage, sex and all the questions they have about what comes next.'"
        ]
      },
      {
        sectionHeading: "The Unique Audition: Secret Tissue Papers",
        paragraphs: [
          "For her, working with Vishal Bhardwaj was a particularly special experience. Recalling the unique process through which the cast discovered their characters, she says: 'Honestly, working with Vishal sir was beyond a dream for me. I had never imagined that I would get an opportunity to work with a filmmaker like him, and even today, it feels surreal.'",
          "She recalls: 'We began with a table read where all six of us were present. Sir introduced us to the world and the characters but deliberately kept our individual character identities a secret. None of us knew who was playing whom. We were asked to prepare all the dialogues, so all six girls learned the dialogues of every character.'",
          "'The characters were finally revealed during our look test. Sir came to each of us and handed us a small piece of tissue paper with our character name written on it. I remember feeling like I was waiting for my examination result! When I opened mine and saw Mishty, it was such a simple but memorable moment,' she adds."
        ]
      },
      {
        sectionHeading: "Sharing the Screen with Aditi Rao Hydari & Gajraj Rao",
        paragraphs: [
          "Husne also fondly remembers sharing screen space with Aditi Rao Hydari, Siddharth and Gajraj Rao in Lust Stories 3.",
          "Recalling her first interaction with Aditi, she says: 'I was genuinely very excited to meet Aditi because I have admired her work for years. She is incredibly graceful, beautiful and such a wonderful artist. I was honestly quite starstruck. I remember telling her, \"Baji, aap itni khoobsurat kyun ho? Main apne aap ko control nahi kar paa rahi hoon!\" I was genuinely that overwhelmed every time I saw her on set.'",
          "Talking about her co-stars, she says: 'Aditi and Siddharth are both incredibly talented, but neither of them makes you feel intimidated. They are very easy to be around, and that really helped me as an actor. Working with Gajraj Rao sir was a huge learning experience. Gajraj sir is such a brilliant improviser. He brought so much spontaneity to Abbu Jaan that we were always curious to see what he would do next. There was a scene where he improvised something so naturally that, for a moment, I actually wondered whether it was scripted.'",
          "Known for her work as a dialect coach on films including Rocky Aur Rani Kii Prem Kahaani, as well as acting projects such as Tribhuvan Mishra CA Topper, The Revolutionaries and Brown, Shabnam is now looking forward to entertaining the audience with her charm and skills."
        ]
      }
    ]
  }
];

