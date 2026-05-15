import { icons } from "@/app/utilities/icons";

//components
export type IconName = keyof typeof icons;

export type User = {
  _id?: string;
  role: "user" | "artist" | "admin" | "subadmin";
  name: string;
  email: string;
  password: string;
  phone: string;
  avatarUrl?: string;
  isActive: boolean;
};

export type SignupErrors = {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  phone?: string;
  form?: string;
};

// category
export interface CategoryGenre {
  genre: string;
  name: string;
}

export interface Category {
  _id?: string;
  slug?: string;
  name: string;
  description: string;
  genres: CategoryGenre[];
  img_link: File | string;
}

// artist

export interface ArtistAchievement {
  name: string;
  for: string;
  year: string;
}

export interface ArtistGallery {
  type: "photo" | "video";
  link: string;
}

export interface ArtistLanguage {
  name: string;
}

export interface ArtistUser {
  _id: string;
  name: string;
}

export interface ArtistCategory {
  _id: string;
  name: string;
}

export interface Artist {
  _id?: string;
  stage_name: string;
  user: ArtistUser | null;
  category: ArtistCategory | null;
  is_travel_flexible: boolean;
  short_desc: string;
  img_link: File | string;
  story_img_link: File | string;
  bio: string;
  gender: string;
  gallery: ArtistGallery[];
  performing_members: number;
  offstage_members: number;
  achievements: ArtistAchievement[];
  genres: string[];
  event_types: string[];
  is_available: boolean;
  is_verified: boolean;
  is_featured: boolean;
  perform_locations: string[];
  languages: ArtistLanguage[];
}

// package

export interface ExtraIncludedPackage {
  title: string;
  price: string;
  description: string;
}
export interface PackageArtist {
  _id: string;
  stage_name: string;
}

export interface Package {
  _id?: string;
  artist: PackageArtist | null;
  title: string;
  description?: string;
  price: number;
  duration_minutes: number;
  capacity: number;
  extras: ExtraIncludedPackage[];
}

// Booking

export interface BookingUser {
  _id: string;
  name: string;
  email: string;
}

export interface BookingArtist {
  _id: string;
  stage_name: string;
}

export interface BookingPackage {
  _id: string;
  title: string;
  capacity: number;
}

export interface BookingPayment {
  _id: string;
  payment_id: string;
}

export interface Booking {
  _id?: string;
  booking_id?: string;
  user: BookingUser | string | null;
  artist: BookingArtist | string | null;
  package: BookingPackage | string | null;
  payment: BookingPayment | string | null;
  event_type: string;
  event_date: string | Date;
  event_time: string;
  admin_note: string;
  accepted_by_user: boolean;
  accepted_by_artist: boolean;
  contract_term: string;
  attendees: number;
  budget: number;
  event_loc: string;
  status: "pending" | "in_progress" | "approved" | "cancel";
}

export type BookingFormData = Omit<
  Booking,
  "_id" | "user" | "artist" | "package" | "payment"
> & {
  user?: string | null;
  artist?: string | null;
  package?: string | null;
  payment?: string | null;
};

export interface BookingFormErrors {
  package?: string;
  event_date?: string;
  event_time?: string;
  event_loc?: string;
  event_type?: string;
  attendees?: string;
  budget?: string;
  contract_term?: string;
  admin_note?: string;
  accepted_by_artist?: string;
  accepted_by_user?: string;
  user?: string;
  artist?: string;
}
