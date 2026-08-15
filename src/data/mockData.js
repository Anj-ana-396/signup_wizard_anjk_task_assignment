// Mock Data for Cascading Selects, Vibe Tags, and Pre-set Avatars

export const STATES_AND_CITIES = [
  {
    state: "California",
    cities: [
      {
        name: "Los Angeles",
        colleges: [
          "University of California, Los Angeles (UCLA)",
          "University of Southern California (USC)",
          "Loyola Marymount University",
          "California State University, Los Angeles"
        ]
      },
      {
        name: "San Francisco",
        colleges: [
          "San Francisco State University",
          "University of San Francisco",
          "UC San Francisco",
          "Academy of Art University"
        ]
      },
      {
        name: "Berkeley",
        colleges: [
          "University of California, Berkeley (UC Berkeley)",
          "Berkeley City College"
        ]
      },
      {
        name: "San Diego",
        colleges: [
          "UC San Diego (UCSD)",
          "San Diego State University (SDSU)",
          "University of San Diego"
        ]
      }
    ]
  },
  {
    state: "New York",
    cities: [
      {
        name: "New York City",
        colleges: [
          "Columbia University",
          "New York University (NYU)",
          "Cornell Tech",
          "Fordham University",
          "City University of New York (CUNY)"
        ]
      },
      {
        name: "Ithaca",
        colleges: [
          "Cornell University",
          "Ithaca College"
        ]
      },
      {
        name: "Buffalo",
        colleges: [
          "University at Buffalo (UB)",
          "Buffalo State University"
        ]
      }
    ]
  },
  {
    state: "Texas",
    cities: [
      {
        name: "Austin",
        colleges: [
          "University of Texas at Austin (UT Austin)",
          "St. Edward's University",
          "Austin Community College"
        ]
      },
      {
        name: "Houston",
        colleges: [
          "University of Houston",
          "Rice University",
          "Texas Southern University"
        ]
      },
      {
        name: "Dallas",
        colleges: [
          "Southern Methodist University (SMU)",
          "University of Texas at Dallas (UTD)"
        ]
      }
    ]
  },
  {
    state: "Maharashtra",
    cities: [
      {
        name: "Mumbai",
        colleges: [
          "IIT Bombay",
          "St. Xavier's College, Mumbai",
          "University of Mumbai",
          "NMIMS Mumbai",
          "Veermata Jijabai Technological Institute (VJTI)"
        ]
      },
      {
        name: "Pune",
        colleges: [
          "COEP Technological University",
          "Symbiosis International University",
          "FLAME University",
          "Savitribai Phule Pune University"
        ]
      }
    ]
  },
  {
    state: "Karnataka",
    cities: [
      {
        name: "Bengaluru",
        colleges: [
          "IISc Bangalore",
          "IIM Bangalore",
          "RV College of Engineering (RVCE)",
          "Christ University",
          "BMS College of Engineering"
        ]
      }
    ]
  },
  {
    state: "Delhi NCR",
    cities: [
      {
        name: "New Delhi",
        colleges: [
          "IIT Delhi",
          "Delhi University (DU) - SRCC / St. Stephen's",
          "Jawaharlal Nehru University (JNU)",
          "Delhi Technological University (DTU)"
        ]
      }
    ]
  }
];

export const VIBE_INTERESTS = [
  { id: "house_parties", name: "House Parties", icon: "🎉", desc: "Cozy backyard & living room vibes" },
  { id: "techno_rave", name: "Techno & EDM Raves", icon: "⚡", desc: "Late night beats & neon lights" },
  { id: "rooftop_chill", name: "Rooftop Drinks", icon: "🍸", desc: "Sunset cocktails & chill convos" },
  { id: "board_games", name: "Board Game Nights", icon: "🎲", desc: "Catan, Poker & Trivia fun" },
  { id: "tech_startups", name: "Tech & Hackathons", icon: "🚀", desc: "Building products & networking" },
  { id: "sports_fitness", name: "Sports & Turf Nights", icon: "⚽", desc: "Pickleball, Football & Runs" },
  { id: "live_music", name: "Live Jam Sessions", icon: "🎸", desc: "Indie bands & open mic vibes" },
  { id: "foodie_tours", name: "Food Crawls", icon: "🍕", desc: "Late night tacos & street food" },
  { id: "photo_content", name: "Content & Photo", icon: "📸", desc: "Aesthetic shots & Reels" },
  { id: "campus_events", name: "Campus Fest Squad", icon: "🎓", desc: "College fests & club events" }
];

export const AVATAR_PRESETS = [
  { id: "av1", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", label: "Neon Cyber" },
  { id: "av2", url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80", label: "Urban Vibe" },
  { id: "av3", url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80", label: "Sunset Glow" },
  { id: "av4", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", label: "Retro Chill" },
  { id: "av5", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", label: "Electric Pink" },
  { id: "av6", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", label: "Midnight Blue" }
];

export const PRONOUN_OPTIONS = [
  "He / Him",
  "She / Her",
  "They / Them",
  "Ze / Zir",
  "Prefer not to say"
];

export const ACADEMIC_YEARS = [
  "1st Year (Freshman)",
  "2nd Year (Sophomore)",
  "3rd Year (Junior)",
  "4th Year (Senior)",
  "Postgraduate / Master's",
  "Recent Graduate / Alumni"
];
