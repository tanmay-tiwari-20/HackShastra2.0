export interface Event {
  _id?: string;
  title: string;
  date: string;
  venue: string;
  format: string;
  reach: string;
  cover_image?: string;
  registration_link?: string;
  is_upcoming: boolean;
  description?: string;
  created_at?: string;
}
