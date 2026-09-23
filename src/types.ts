export interface ActorProject {
  id: string;
  project: string;
  role: string;
  director: string;
  platform: string;
  year: string;
  featured?: boolean;
  synopsis?: string;
  imageUrl?: string;
}

export interface DialectCoachProject {
  id: string;
  project: string;
  year: string;
  director: string;
  producerStudio: string;
  platform: string;
  actorsCoached: string[];
  dialectNotes: string;
  notes?: string;
  testimonial?: string;
  audioUrl?: string;
}

export interface VoiceDemo {
  id: string;
  title: string;
  description: string;
  accent: string;
  duration: string;
  audioUrl?: string; // We will generate an interactive waveform audio player that mocks sound playback smoothly
}

export interface PersonalDetails {
  age: number;
  height: string;
  weight: string;
  currentLocation: string;
  hometown: string;
  languages: string[];
}

export interface SkillItem {
  name: string;
  category: 'Acting' | 'Movement/Physical' | 'Vocal/Dialect' | 'Other';
  level?: 'Expert' | 'Intermediate' | 'Beginner' | string;
}

export interface PressArticle {
  id: string;
  publication: string;
  author: string;
  authorRole?: string;
  date: string;
  readTime: string;
  headline: string;
  subheadline: string;
  url: string;
  imageUrl: string;
  badge: string;
  excerpt: string;
  pullQuote: string;
  pullQuoteSpeaker: string;
  keyQuotes: {
    topic: string;
    quote: string;
  }[];
  fullStory: {
    sectionHeading?: string;
    paragraphs: string[];
  }[];
}
