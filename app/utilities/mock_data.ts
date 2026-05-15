// export const ARTISTS = [
//   {
//     id: 1,
//     name: "Luna Aria",
//     genre: "Jazz & Soul",
//     location: "New York, NY",
//     rating: 4.9,
//     reviews: 142,
//     price: 1200,
//     priceUnit: "per event",
//     image: "https://api.dicebear.com/7.x/personas/svg?seed=luna",
//     verified: true,
//     featured: true,
//     bio: "Award-winning jazz vocalist with over 15 years of performance experience across major venues worldwide.",
//     categories: ["Jazz", "Soul", "Live Music"],
//     availability: "Available",
//     social: { instagram: "lunaaria", twitter: "lunamusic" },
//   },
//   {
//     id: 2,
//     name: "Marcus Reed",
//     genre: "Electronic & DJ",
//     location: "Los Angeles, CA",
//     rating: 4.8,
//     reviews: 98,
//     price: 800,
//     priceUnit: "per set",
//     image: "https://api.dicebear.com/7.x/personas/svg?seed=marcus",
//     verified: true,
//     featured: true,
//     bio: "Internationally recognized DJ and producer with residencies at top clubs in Ibiza and Las Vegas.",
//     categories: ["Electronic", "House", "DJ Sets"],
//     availability: "Available",
//   },
//   {
//     id: 3,
//     name: "Sofia Belle",
//     genre: "Classical Violin",
//     location: "Chicago, IL",
//     rating: 4.7,
//     reviews: 63,
//     price: 950,
//     priceUnit: "per event",
//     image: "https://api.dicebear.com/7.x/personas/svg?seed=sofia",
//     verified: false,
//     featured: false,
//     bio: "Classically trained violinist performing everything from baroque to contemporary fusion.",
//     categories: ["Classical", "Orchestral", "Chamber Music"],
//     availability: "Busy",
//   },
//   {
//     id: 4,
//     name: "The Groove Band",
//     genre: "Pop & Rock",
//     location: "Nashville, TN",
//     rating: 4.6,
//     reviews: 215,
//     price: 2500,
//     priceUnit: "per show",
//     image: "https://api.dicebear.com/7.x/personas/svg?seed=groove",
//     verified: true,
//     featured: false,
//     bio: "High-energy 5-piece band covering all your favorite hits from the 70s to today.",
//     categories: ["Pop", "Rock", "Cover Band"],
//     availability: "Available",
//   },
//   {
//     id: 5,
//     name: "Amara Flow",
//     genre: "R&B & Neo-Soul",
//     location: "Atlanta, GA",
//     rating: 4.9,
//     reviews: 87,
//     price: 1500,
//     priceUnit: "per event",
//     image: "https://api.dicebear.com/7.x/personas/svg?seed=amara",
//     verified: true,
//     featured: true,
//     bio: "Soulful vocalist blending R&B, gospel, and neo-soul into unforgettable live experiences.",
//     categories: ["R&B", "Neo-Soul", "Gospel"],
//     availability: "Available",
//   },
//   {
//     id: 6,
//     name: "DJ Pulse",
//     genre: "Hip-Hop & Rap",
//     location: "Miami, FL",
//     rating: 4.5,
//     reviews: 44,
//     price: 600,
//     priceUnit: "per set",
//     image: "https://api.dicebear.com/7.x/personas/svg?seed=pulse",
//     verified: false,
//     featured: false,
//     bio: "Miami's hottest DJ bringing the most energetic hip-hop sets to every event.",
//     categories: ["Hip-Hop", "Rap", "DJ Sets"],
//     availability: "Busy",
//   },
// ];

// export const CATEGORIES = [
//   {
//     id: 1,
//     name: "Jazz & Soul",
//     icon: "music",
//     count: 48,
//     color: "#7C3AED",
//     bg: "#EDE9FE",
//   },
//   {
//     id: 2,
//     name: "Electronic & DJ",
//     icon: "play",
//     count: 93,
//     color: "#4F46E5",
//     bg: "#E0E7FF",
//   },
//   {
//     id: 3,
//     name: "Classical",
//     icon: "music",
//     count: 35,
//     color: "#0891B2",
//     bg: "#E0F2FE",
//   },
//   {
//     id: 4,
//     name: "Pop & Rock",
//     icon: "music",
//     count: 121,
//     color: "#059669",
//     bg: "#D1FAE5",
//   },
//   {
//     id: 5,
//     name: "Hip-Hop & Rap",
//     icon: "music",
//     count: 67,
//     color: "#D97706",
//     bg: "#FEF3C7",
//   },
//   {
//     id: 6,
//     name: "R&B & Neo-Soul",
//     icon: "heart",
//     count: 55,
//     color: "#DC2626",
//     bg: "#FEE2E2",
//   },
// ];

export const BOOKINGS = [
  {
    id: 1,
    artist: "Luna Aria",
    event: "Corporate Gala",
    date: "Jun 14, 2025",
    time: "7:00 PM",
    venue: "Grand Hyatt, NYC",
    status: "confirmed",
    amount: 1200,
  },
  {
    id: 2,
    artist: "Marcus Reed",
    event: "Wedding Reception",
    date: "Jul 3, 2025",
    time: "5:00 PM",
    venue: "The Rosewood, LA",
    status: "pending",
    amount: 800,
  },
  {
    id: 3,
    artist: "The Groove Band",
    event: "Birthday Party",
    date: "May 28, 2025",
    time: "8:00 PM",
    venue: "Private Venue, Nashville",
    status: "completed",
    amount: 2500,
  },
  {
    id: 4,
    artist: "Amara Flow",
    event: "Charity Concert",
    date: "Aug 19, 2025",
    time: "6:30 PM",
    venue: "City Park Amphitheater",
    status: "confirmed",
    amount: 1500,
  },
];

export const EVENT_TYPES = [
  // Access Type
  {
    label: "Private",
    value: "private",
  },
  {
    label: "Public",
    value: "public",
  },

  // Business & Professional
  {
    label: "Corporate",
    value: "corporate",
  },
  {
    label: "Conference",
    value: "conference",
  },
  {
    label: "Seminar",
    value: "seminar",
  },
  {
    label: "Workshop",
    value: "workshop",
  },
  {
    label: "Training Session",
    value: "training",
  },
  {
    label: "Networking Event",
    value: "networking",
  },
  {
    label: "Product Launch",
    value: "product_launch",
  },
  {
    label: "Job Fair / Career Expo",
    value: "job_fair",
  },
  {
    label: "Startup Pitch",
    value: "startup_pitch",
  },

  // Entertainment & Culture
  {
    label: "Concert",
    value: "concert",
  },
  {
    label: "Music Festival",
    value: "music_festival",
  },
  {
    label: "DJ Night",
    value: "dj_night",
  },
  {
    label: "Theatre / Drama",
    value: "theatre",
  },
  {
    label: "Comedy Show",
    value: "comedy",
  },
  {
    label: "Movie Premiere",
    value: "movie_premiere",
  },
  {
    label: "Art Exhibition",
    value: "art_exhibition",
  },
  {
    label: "Cultural Festival",
    value: "cultural_festival",
  },
  {
    label: "Fashion Show",
    value: "fashion_show",
  },

  // Sports & Fitness
  {
    label: "Cricket Match",
    value: "cricket",
  },
  {
    label: "Football Match",
    value: "football",
  },
  {
    label: "Badminton Tournament",
    value: "badminton",
  },
  {
    label: "Marathon / Run",
    value: "marathon",
  },
  {
    label: "Gym / Fitness Event",
    value: "fitness",
  },
  {
    label: "Esports Tournament",
    value: "esports",
  },

  // Personal & Social
  {
    label: "Wedding",
    value: "wedding",
  },
  {
    label: "Birthday Party",
    value: "birthday",
  },
  {
    label: "Anniversary",
    value: "anniversary",
  },
  {
    label: "Engagement",
    value: "engagement",
  },
  {
    label: "Family Gathering",
    value: "family_gathering",
  },
  {
    label: "Reunion",
    value: "reunion",
  },

  // Education & Learning
  {
    label: "School Event",
    value: "school",
  },
  {
    label: "College / University Event",
    value: "college",
  },
  {
    label: "Tech Talk",
    value: "tech_talk",
  },
  {
    label: "Hackathon",
    value: "hackathon",
  },
  {
    label: "Coding Bootcamp",
    value: "bootcamp",
  },

  // Religious & Community
  {
    label: "Religious Gathering",
    value: "religious",
  },
  {
    label: "Charity Event",
    value: "charity",
  },
  {
    label: "Fundraiser",
    value: "fundraiser",
  },
  {
    label: "Community Meetup",
    value: "community",
  },
  {
    label: "Political Rally",
    value: "political",
  },

  // Food & Lifestyle
  {
    label: "Food Festival",
    value: "food_festival",
  },
  {
    label: "Cooking Workshop",
    value: "cooking_workshop",
  },
  {
    label: "Wine Tasting",
    value: "wine_tasting",
  },
  {
    label: "Travel Meetup",
    value: "travel",
  },

  // Online / Hybrid
  {
    label: "Online Event",
    value: "online",
  },
  {
    label: "Webinar",
    value: "webinar",
  },
  {
    label: "Live Stream",
    value: "livestream",
  },
  {
    label: "Hybrid Event",
    value: "hybrid",
  },

  // Other
  {
    label: "Exhibition",
    value: "exhibition",
  },
  {
    label: "Trade Show",
    value: "trade_show",
  },
  {
    label: "Award Ceremony",
    value: "award",
  },
  {
    label: "Open Mic",
    value: "open_mic",
  },
  {
    label: "Book Launch",
    value: "book_launch",
  },
  {
    label: "Other",
    value: "other",
  },
];
