export interface Event {
  _id?: string;
  title: string;
  date: string;
  end_date?: string;
  venue: string;
  format: string;
  cover_image?: string;
  registration_link?: string;
  is_upcoming: boolean;
  description?: string;
  prize_pool?: string;
  created_at?: string;
}

export interface TeamMember {
  _id?: string;
  name: string;
  role: string;
  image?: string;
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    portfolio?: string;
  };
  created_at?: string;
}

export interface Chapter {
  _id?: string;
  college: string;
  city: string;
  lead: string;
  logo?: string;
  created_at?: string;
}

export interface GalleryImage {
  _id?: string;
  url: string;
  created_at?: string;
}

export interface Sponsor {
  _id?: string;
  name: string;
  logo: string;
  category?: string;
  created_at?: string;
}
