import { Event } from "../types";
import { PictureType } from "../types/picture";

// Using string literals directly since the enums are not exported from event.ts

export const mockEvents: Event[] = [
  // Event 1: Published, Offline event
  {
    id: "event-1",
    created_at: "2025-01-15T09:00:00Z",
    title: "Photography Workshop",
    bannerImage: {
      id: "img-1",
      type: PictureType.EVENT_BANNER,
      src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      alt: "Photography workshop banner",
      createdAt: "2025-01-10T14:30:00Z",
    },
    bio: {
      text: "Join us for a hands-on photography workshop where you'll learn essential techniques from professional photographers. Perfect for beginners and intermediate photographers looking to improve their skills.",
    },
    tags: [
      { id: "tag-1", value: "photography" },
      { id: "tag-2", value: "workshop" },
      { id: "tag-3", value: "creative" },
    ],
    timing: {
      tbd: false,
      startDate: "2025-04-15T10:00:00Z",
      endDate: "2025-04-15T16:00:00Z",
    },
    location: {
      tdb: false,
      location: {
        type: "OFFLINE" as any,
        details: {
          address: "123 Creative Studio",
          city: "San Francisco",
          state: "CA",
          country: "USA",
          postalCode: "94105",
          coordinates: {
            latitude: 37.7749,
            longitude: -122.4194,
          },
          mapLocationUrl:
            "https://maps.example.com/location/123-creative-studio",
        },
      },
    },
    flagDates: {
      rsvpStart: "2025-03-01T00:00:00Z",
      rsvpEnd: "2025-04-10T23:59:59Z",
    },
    groupID: "1",
    attendies: [
      {
        id: "user-1",
        name: "Alex Johnson",
        picture: "https://randomuser.me/api/portraits/women/1.jpg",
        registrationDate: "2025-03-02T15:30:00Z",
        status: "confirmed" as any,
      },
      {
        id: "user-2",
        name: "Michael Chen",
        picture: "https://randomuser.me/api/portraits/men/2.jpg",
        registrationDate: "2025-03-05T09:45:00Z",
        status: "confirmed" as any,
      },
      {
        id: "user-3",
        name: "Sarah Williams",
        picture: "https://randomuser.me/api/portraits/women/3.jpg",
        registrationDate: "2025-03-10T14:20:00Z",
        status: "waiting" as any,
      },
    ],
    host: [
      {
        id: "host-1",
        displayName: "Emma Davis",
        displayPicture: {
          id: "host-pic-1",
          type: PictureType.PROFILE_PICTURE,
          src: "https://randomuser.me/api/portraits/women/20.jpg",
          alt: "Emma Davis profile picture",
          createdAt: "2024-12-01T10:00:00Z",
        },
      },
    ],
    discussion: [
      {
        id: "comment-1",
        created_at: "2025-03-15T08:30:00Z",
        isParentComment: true,
        childComments: ["comment-2"],
        author: "user-2",
        commentData: {
          text: "Will we need to bring our own cameras?",
        },
      },
      {
        id: "comment-2",
        created_at: "2025-03-15T09:45:00Z",
        isParentComment: false,
        parentId: "comment-1",
        author: "host-1",
        commentData: {
          text: "Yes, please bring your own camera. Any type is fine, even smartphone cameras will work!",
        },
      },
    ],
    photos: [
      {
        id: "event-photo-1",
        type: PictureType.EVENT_GALLERY,
        src: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d",
        alt: "Previous workshop photo",
        caption: "From our last photography workshop",
        createdAt: "2025-01-20T11:30:00Z",
      },
    ],
    capacity: 15,
    status: "published" as any,
    fee: {
      amount: 75,
      currency: "USD",
    },
    isPublic: true,
  },

  // Event 2: Draft, Online event
  {
    id: "event-2",
    created_at: "2025-02-10T14:20:00Z",
    title: "Virtual Book Club: Science Fiction Month",
    bio: {
      text: "Join our monthly book club, this time focusing on classic and modern science fiction. We'll be discussing themes, characters, and the impact of these works on society and technology.",
    },
    tags: [
      { id: "tag-4", value: "book-club" },
      { id: "tag-5", value: "science-fiction" },
      { id: "tag-6", value: "literature" },
    ],
    timing: {
      tbd: false,
      startDate: "2025-05-20T19:00:00Z",
      endDate: "2025-05-20T21:00:00Z",
    },
    location: {
      tdb: false,
      location: {
        type: "ONLINE" as any,
        details: {
          conferenceURL: "https://meet.example.com/book-club-may",
          conferencePassord: "books2025",
        },
      },
    },
    flagDates: {
      rsvpStart: "2025-04-20T00:00:00Z",
      rsvpEnd: "2025-05-19T23:59:59Z",
    },
    groupID: "2",
    attendies: [],
    host: [
      {
        id: "host-2",
        displayName: "Robert Kim",
        displayPicture: {
          id: "host-pic-2",
          type: PictureType.PROFILE_PICTURE,
          src: "https://randomuser.me/api/portraits/men/25.jpg",
          alt: "Robert Kim profile picture",
          createdAt: "2024-11-15T16:45:00Z",
        },
      },
    ],
    discussion: [],
    photos: [],
    capacity: 30,
    status: "draft" as any,
    fee: {
      amount: 0,
      currency: "USD",
    },
    isPublic: false,
  },

  // Event 3: Cancelled, Hybrid event
  {
    id: "event-3",
    created_at: "2025-01-05T11:15:00Z",
    title: "Annual Tech Conference 2025",
    bannerImage: {
      id: "img-3",
      type: PictureType.EVENT_BANNER,
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
      alt: "Tech conference banner",
      createdAt: "2025-01-02T09:20:00Z",
    },
    bio: {
      text: "Our annual technology conference brings together industry leaders, innovators, and enthusiasts to discuss the latest trends and advancements in technology. This year's theme is 'AI and Sustainability'.",
    },
    tags: [
      { id: "tag-7", value: "technology" },
      { id: "tag-8", value: "conference" },
      { id: "tag-9", value: "AI" },
      { id: "tag-10", value: "sustainability" },
    ],
    timing: {
      tbd: false,
      startDate: "2025-03-25T08:00:00Z",
      endDate: "2025-03-27T18:00:00Z",
    },
    location: {
      tdb: false,
      location: {
        type: "BOTH" as any,
        offlineDetails: {
          address: "Tech Convention Center",
          city: "Boston",
          state: "MA",
          country: "USA",
          postalCode: "02110",
          coordinates: {
            latitude: 42.3601,
            longitude: -71.0589,
          },
          mapLocationUrl:
            "https://maps.example.com/location/tech-convention-center",
        },
        onlineDetails: {
          conferenceURL: "https://stream.example.com/tech-conf-2025",
          conferencePassord: "tech2025",
        },
      },
    },
    flagDates: {
      rsvpStart: "2025-01-10T00:00:00Z",
      rsvpEnd: "2025-03-15T23:59:59Z",
    },
    groupID: "3",
    attendies: [
      {
        id: "user-4",
        name: "David Wilson",
        picture: "https://randomuser.me/api/portraits/men/4.jpg",
        registrationDate: "2025-01-15T10:30:00Z",
        status: "cancelled" as any,
      },
      {
        id: "user-5",
        name: "Jennifer Lopez",
        picture: "https://randomuser.me/api/portraits/women/5.jpg",
        registrationDate: "2025-01-20T16:15:00Z",
        status: "cancelled" as any,
      },
    ],
    host: [
      {
        id: "host-3",
        displayName: "Tech Industry Association",
      },
    ],
    discussion: [
      {
        id: "comment-3",
        created_at: "2025-02-10T13:45:00Z",
        isParentComment: true,
        childComments: ["comment-4"],
        author: "user-4",
        commentData: {
          text: "Will refunds be processed automatically?",
        },
      },
      {
        id: "comment-4",
        created_at: "2025-02-10T14:30:00Z",
        isParentComment: false,
        parentId: "comment-3",
        author: "host-3",
        commentData: {
          text: "Yes, all registrants will receive full refunds within 5-7 business days.",
        },
      },
    ],
    photos: [],
    capacity: 500,
    status: "cancelled" as any,
    fee: {
      amount: 299,
      currency: "USD",
    },
    isPublic: true,
  },

  // Event 4: Finished, Offline event
  {
    id: "event-4",
    created_at: "2024-11-20T08:30:00Z",
    title: "Winter Hiking Expedition",
    bannerImage: {
      id: "img-4",
      type: PictureType.EVENT_BANNER,
      src: "https://images.unsplash.com/photo-1551632811-561732d1e306",
      alt: "Winter hiking banner",
      createdAt: "2024-11-15T10:45:00Z",
    },
    bio: {
      text: "Experience the beauty of winter landscapes on our guided hiking expedition. Suitable for intermediate hikers, this event includes professional guides, safety equipment, and hot beverages.",
    },
    tags: [
      { id: "tag-11", value: "hiking" },
      { id: "tag-12", value: "winter" },
      { id: "tag-13", value: "outdoors" },
    ],
    timing: {
      tbd: false,
      startDate: "2025-01-15T08:00:00Z",
      endDate: "2025-01-15T16:00:00Z",
    },
    location: {
      tdb: false,
      location: {
        type: "OFFLINE" as any,
        details: {
          address: "Mountain Trail Entrance",
          city: "Denver",
          state: "CO",
          country: "USA",
          postalCode: "80205",
          coordinates: {
            latitude: 39.7392,
            longitude: -104.9903,
          },
          mapLocationUrl:
            "https://maps.example.com/location/mountain-trail-entrance",
        },
      },
    },
    flagDates: {
      rsvpStart: "2024-12-01T00:00:00Z",
      rsvpEnd: "2025-01-10T23:59:59Z",
    },
    groupID: "1",
    attendies: [
      {
        id: "user-6",
        name: "Chris Taylor",
        picture: "https://randomuser.me/api/portraits/men/6.jpg",
        registrationDate: "2024-12-05T11:20:00Z",
        status: "confirmed" as any,
      },
      {
        id: "user-7",
        name: "Amanda Garcia",
        picture: "https://randomuser.me/api/portraits/women/7.jpg",
        registrationDate: "2024-12-10T09:15:00Z",
        status: "confirmed" as any,
      },
      {
        id: "user-8",
        name: "James Smith",
        picture: "https://randomuser.me/api/portraits/men/8.jpg",
        registrationDate: "2024-12-15T14:30:00Z",
        status: "confirmed" as any,
      },
      {
        id: "user-9",
        name: "Sophia Lee",
        picture: "https://randomuser.me/api/portraits/women/9.jpg",
        registrationDate: "2024-12-20T16:45:00Z",
        status: "confirmed" as any,
      },
    ],
    host: [
      {
        id: "host-4",
        displayName: "Mountain Explorers Club",
        displayPicture: {
          id: "host-pic-4",
          type: PictureType.PROFILE_PICTURE,
          src: "https://images.unsplash.com/photo-1551632811-561732d1e306",
          alt: "Mountain Explorers Club logo",
          createdAt: "2024-10-01T09:00:00Z",
        },
      },
    ],
    discussion: [
      {
        id: "comment-5",
        created_at: "2025-01-20T10:30:00Z",
        isParentComment: true,
        childComments: [],
        author: "user-7",
        commentData: {
          text: "The hike was amazing! The views were breathtaking and our guide was very knowledgeable.",
        },
      },
    ],
    photos: [
      {
        id: "event-photo-2",
        type: PictureType.EVENT_GALLERY,
        src: "https://images.unsplash.com/photo-1551632811-561732d1e306",
        alt: "Group photo at summit",
        caption: "Our group at the summit",
        createdAt: "2025-01-15T15:30:00Z",
      },
      {
        id: "event-photo-3",
        type: PictureType.EVENT_GALLERY,
        src: "https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a",
        alt: "Winter landscape",
        caption: "Beautiful winter landscape",
        createdAt: "2025-01-15T12:45:00Z",
      },
    ],
    capacity: 12,
    status: "finished" as any,
    fee: {
      amount: 45,
      currency: "USD",
    },
    isPublic: true,
  },

  // Event 5: Published, TBD timing and location
  {
    id: "event-5",
    created_at: "2025-02-25T15:40:00Z",
    title: "Summer Music Festival 2025",
    bannerImage: {
      id: "img-5",
      type: PictureType.EVENT_BANNER,
      src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
      alt: "Music festival banner",
      createdAt: "2025-02-20T11:30:00Z",
    },
    bio: {
      text: "Get ready for the biggest music event of the summer! Featuring top artists across multiple genres, food vendors, art installations, and more. Exact date and venue to be announced soon.",
    },
    tags: [
      { id: "tag-14", value: "music" },
      { id: "tag-15", value: "festival" },
      { id: "tag-16", value: "summer" },
      { id: "tag-17", value: "entertainment" },
    ],
    timing: {
      tbd: true,
    },
    location: {
      tbd: true,
      location: null,
    },
    flagDates: {
      rsvpStart: "2025-04-01T00:00:00Z",
      rsvpEnd: "2025-06-30T23:59:59Z",
    },
    groupID: "3",
    attendies: [
      {
        id: "user-10",
        name: "Ryan Johnson",
        picture: "https://randomuser.me/api/portraits/men/10.jpg",
        registrationDate: "2025-04-05T09:30:00Z",
        status: "applied" as any,
      },
      {
        id: "user-11",
        name: "Emily Brown",
        picture: "https://randomuser.me/api/portraits/women/11.jpg",
        registrationDate: "2025-04-10T14:15:00Z",
        status: "applied" as any,
      },
    ],
    host: [
      {
        id: "host-5",
        displayName: "City Entertainment Group",
        displayPicture: {
          id: "host-pic-5",
          type: PictureType.PROFILE_PICTURE,
          src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
          alt: "City Entertainment Group logo",
          createdAt: "2024-12-15T10:30:00Z",
        },
      },
    ],
    discussion: [
      {
        id: "comment-6",
        created_at: "2025-03-05T13:20:00Z",
        isParentComment: true,
        childComments: ["comment-7"],
        author: "user-10",
        commentData: {
          text: "Any hints on which artists will be performing?",
        },
      },
      {
        id: "comment-7",
        created_at: "2025-03-06T09:45:00Z",
        isParentComment: false,
        parentId: "comment-6",
        author: "host-5",
        commentData: {
          text: "We'll be announcing the first wave of artists next month. Stay tuned!",
        },
      },
    ],
    photos: [],
    capacity: 2000,
    status: "published" as any,
    fee: {
      amount: 150,
      currency: "USD",
    },
    isPublic: true,
  },
];

export const mockGroups = [
  // Group 1: Photography Enthusiasts
  {
    id: "1",
    created_at: "2024-10-15T08:30:00Z",
    name: "Photography Enthusiasts",
    coverPicture: {
      id: "group-cover-1",
      type: PictureType.GROUP_BANNER,
      src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      alt: "Photography group banner",
      createdAt: "2024-10-10T14:30:00Z",
    },
    bio: {
      text: "A community of photography lovers ranging from beginners to professionals. We share techniques, organize workshops, photo walks, and exhibitions. Join us to improve your skills and connect with fellow photographers.",
    },
    location: "San Francisco, CA",
    photos: [
      {
        id: "group-photo-1",
        type: PictureType.GROUP_GALLERY,
        src: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d",
        alt: "Group photo walk",
        caption: "Our last photo walk at Golden Gate Park",
        createdAt: "2024-12-15T11:30:00Z",
      },
      {
        id: "group-photo-2",
        type: PictureType.GROUP_GALLERY,
        src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
        alt: "Photography workshop",
        caption: "Portrait photography workshop",
        createdAt: "2025-01-20T10:45:00Z",
      },
    ],
    tags: [
      { id: "tag-1", value: "photography" },
      { id: "tag-2", value: "creative" },
      { id: "tag-3", value: "art" },
      { id: "tag-18", value: "workshops" },
    ],
    memberCount: 156,
    events: [mockEvents[0], mockEvents[3]], // Photography Workshop and Winter Hiking
    hosts: [
      {
        id: "host-1",
        displayName: "Emma Davis",
        displayPicture: {
          id: "host-pic-1",
          type: PictureType.PROFILE_PICTURE,
          src: "https://randomuser.me/api/portraits/women/20.jpg",
          alt: "Emma Davis profile picture",
          createdAt: "2024-12-01T10:00:00Z",
        },
      },
    ],
    discussion: [
      {
        id: "group-comment-1",
        created_at: "2025-02-10T09:15:00Z",
        isParentComment: true,
        childComments: ["group-comment-2"],
        author: "user-1",
        commentData: {
          text: "Does anyone have recommendations for a good beginner DSLR camera?",
        },
      },
      {
        id: "group-comment-2",
        created_at: "2025-02-10T10:30:00Z",
        isParentComment: false,
        parentId: "group-comment-1",
        author: "host-1",
        commentData: {
          text: "The Canon EOS Rebel series or Nikon D3500 are great options for beginners. We'll discuss more at our next meetup!",
        },
      },
    ],
    members: [
      {
        id: "user-1",
        displayName: "Alex Johnson",
        displayPicture: {
          id: "user-pic-1",
          type: PictureType.PROFILE_PICTURE,
          src: "https://randomuser.me/api/portraits/women/1.jpg",
          alt: "Alex Johnson profile picture",
          createdAt: "2024-11-05T14:20:00Z",
        },
      },
      {
        id: "user-2",
        displayName: "Michael Chen",
        displayPicture: {
          id: "user-pic-2",
          type: PictureType.PROFILE_PICTURE,
          src: "https://randomuser.me/api/portraits/men/2.jpg",
          alt: "Michael Chen profile picture",
          createdAt: "2024-11-10T09:45:00Z",
        },
      },
    ],
  },

  // Group 2: Book Lovers Club
  {
    id: "2",
    created_at: "2024-09-20T14:45:00Z",
    name: "Book Lovers Club",
    coverPicture: {
      id: "group-cover-2",
      type: PictureType.GROUP_BANNER,
      src: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
      alt: "Book club banner",
      createdAt: "2024-09-15T11:20:00Z",
    },
    bio: {
      text: "A diverse community of book enthusiasts who meet monthly to discuss literature across all genres. We organize reading challenges, author talks, and literary events. All reading levels welcome!",
    },
    location: "Boston, MA",
    photos: [
      {
        id: "group-photo-3",
        type: PictureType.GROUP_GALLERY,
        src: "https://images.unsplash.com/photo-1530538987395-032d1800fdd4",
        alt: "Monthly book discussion",
        caption: "January book club meeting",
        createdAt: "2025-01-25T18:30:00Z",
      },
    ],
    tags: [
      { id: "tag-4", value: "book-club" },
      { id: "tag-5", value: "literature" },
      { id: "tag-19", value: "reading" },
      { id: "tag-20", value: "discussion" },
    ],
    memberCount: 89,
    events: [mockEvents[1]], // Virtual Book Club
    hosts: [
      {
        id: "host-2",
        displayName: "Robert Kim",
        displayPicture: {
          id: "host-pic-2",
          type: PictureType.PROFILE_PICTURE,
          src: "https://randomuser.me/api/portraits/men/25.jpg",
          alt: "Robert Kim profile picture",
          createdAt: "2024-11-15T16:45:00Z",
        },
      },
    ],
    discussion: [
      {
        id: "group-comment-3",
        created_at: "2025-02-15T19:20:00Z",
        isParentComment: true,
        childComments: [],
        author: "user-5",
        commentData: {
          text: "I just finished this month's book and can't wait to discuss it at our next meeting!",
        },
      },
    ],
    members: [
      {
        id: "user-5",
        displayName: "Jennifer Lopez",
        displayPicture: {
          id: "user-pic-5",
          type: PictureType.PROFILE_PICTURE,
          src: "https://randomuser.me/api/portraits/women/5.jpg",
          alt: "Jennifer Lopez profile picture",
          createdAt: "2024-10-20T16:15:00Z",
        },
      },
      {
        id: "user-11",
        displayName: "Emily Brown",
        displayPicture: {
          id: "user-pic-11",
          type: PictureType.PROFILE_PICTURE,
          src: "https://randomuser.me/api/portraits/women/11.jpg",
          alt: "Emily Brown profile picture",
          createdAt: "2024-12-10T14:15:00Z",
        },
      },
    ],
  },

  // Group 3: Tech Innovators Network
  {
    id: "3",
    created_at: "2024-08-05T10:15:00Z",
    name: "Tech Innovators Network",
    coverPicture: {
      id: "group-cover-3",
      type: PictureType.GROUP_BANNER,
      src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      alt: "Tech network banner",
      createdAt: "2024-08-01T09:30:00Z",
    },
    bio: {
      text: "A professional network for tech enthusiasts, developers, and entrepreneurs. We host conferences, hackathons, and networking events to foster innovation and collaboration in the tech industry.",
    },
    location: "Boston, MA",
    photos: [
      {
        id: "group-photo-4",
        type: PictureType.GROUP_GALLERY,
        src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
        alt: "Annual hackathon",
        caption: "Winners of our 2024 Hackathon",
        createdAt: "2024-11-30T20:15:00Z",
      },
      {
        id: "group-photo-5",
        type: PictureType.GROUP_GALLERY,
        src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
        alt: "Networking event",
        caption: "Tech networking mixer",
        createdAt: "2025-01-15T19:45:00Z",
      },
    ],
    tags: [
      { id: "tag-7", value: "technology" },
      { id: "tag-9", value: "AI" },
      { id: "tag-21", value: "networking" },
      { id: "tag-22", value: "innovation" },
    ],
    memberCount: 312,
    events: [mockEvents[2], mockEvents[4]], // Tech Conference and Music Festival
    hosts: [
      {
        id: "host-3",
        displayName: "Tech Industry Association",
      },
    ],
    discussion: [
      {
        id: "group-comment-4",
        created_at: "2025-02-20T11:45:00Z",
        isParentComment: true,
        childComments: ["group-comment-5"],
        author: "user-4",
        commentData: {
          text: "Is anyone interested in forming a study group for the upcoming AI certification?",
        },
      },
      {
        id: "group-comment-5",
        created_at: "2025-02-20T13:10:00Z",
        isParentComment: false,
        parentId: "group-comment-4",
        author: "user-10",
        commentData: {
          text: "I'm interested! Let's coordinate a time that works for everyone.",
        },
      },
    ],
    members: [
      {
        id: "user-4",
        displayName: "David Wilson",
        displayPicture: {
          id: "user-pic-4",
          type: PictureType.PROFILE_PICTURE,
          src: "https://randomuser.me/api/portraits/men/4.jpg",
          alt: "David Wilson profile picture",
          createdAt: "2024-09-15T10:30:00Z",
        },
      },
      {
        id: "user-10",
        displayName: "Ryan Johnson",
        displayPicture: {
          id: "user-pic-10",
          type: PictureType.PROFILE_PICTURE,
          src: "https://randomuser.me/api/portraits/men/10.jpg",
          alt: "Ryan Johnson profile picture",
          createdAt: "2024-10-05T09:30:00Z",
        },
      },
    ],
  },

  // Group 4: Outdoor Adventure Club
  {
    id: "4",
    created_at: "2024-11-10T09:00:00Z",
    name: "Outdoor Adventure Club",
    coverPicture: {
      id: "group-cover-4",
      type: PictureType.GROUP_BANNER,
      src: "https://images.unsplash.com/photo-1551632811-561732d1e306",
      alt: "Outdoor adventure banner",
      createdAt: "2024-11-05T10:45:00Z",
    },
    bio: {
      text: "For nature lovers and adventure seekers! We organize hiking trips, camping weekends, rock climbing sessions, and other outdoor activities for all skill levels.",
    },
    location: "Denver, CO",
    photos: [
      {
        id: "group-photo-6",
        type: PictureType.GROUP_GALLERY,
        src: "https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a",
        alt: "Group hiking trip",
        caption: "Summit hike in Rocky Mountain National Park",
        createdAt: "2024-12-20T16:30:00Z",
      },
      {
        id: "group-photo-7",
        type: PictureType.GROUP_GALLERY,
        src: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d",
        alt: "Rock climbing session",
        caption: "Beginner rock climbing class",
        createdAt: "2025-01-10T14:20:00Z",
      },
    ],
    tags: [
      { id: "tag-11", value: "hiking" },
      { id: "tag-13", value: "outdoors" },
      { id: "tag-23", value: "adventure" },
      { id: "tag-24", value: "nature" },
    ],
    memberCount: 178,
    events: [], // No specific events linked yet
    hosts: [
      {
        id: "host-4",
        displayName: "Mountain Explorers Club",
        displayPicture: {
          id: "host-pic-4",
          type: PictureType.PROFILE_PICTURE,
          src: "https://images.unsplash.com/photo-1551632811-561732d1e306",
          alt: "Mountain Explorers Club logo",
          createdAt: "2024-10-01T09:00:00Z",
        },
      },
    ],
    discussion: [
      {
        id: "group-comment-6",
        created_at: "2025-02-25T08:45:00Z",
        isParentComment: true,
        childComments: ["group-comment-7"],
        author: "user-7",
        commentData: {
          text: "What equipment do you recommend for beginners joining the overnight camping trip?",
        },
      },
      {
        id: "group-comment-7",
        created_at: "2025-02-25T10:15:00Z",
        isParentComment: false,
        parentId: "group-comment-6",
        author: "host-4",
        commentData: {
          text: "We'll send out a detailed equipment list next week, but basics include a good sleeping bag, comfortable backpack, and weather-appropriate clothing. We have some tents available to borrow!",
        },
      },
    ],
    members: [
      {
        id: "user-7",
        displayName: "Amanda Garcia",
        displayPicture: {
          id: "user-pic-7",
          type: PictureType.PROFILE_PICTURE,
          src: "https://randomuser.me/api/portraits/women/7.jpg",
          alt: "Amanda Garcia profile picture",
          createdAt: "2024-11-10T09:15:00Z",
        },
      },
      {
        id: "user-8",
        displayName: "James Smith",
        displayPicture: {
          id: "user-pic-8",
          type: PictureType.PROFILE_PICTURE,
          src: "https://randomuser.me/api/portraits/men/8.jpg",
          alt: "James Smith profile picture",
          createdAt: "2024-11-15T14:30:00Z",
        },
      },
    ],
  },

  // Group 5: Urban Artists Collective
  {
    id: "5",
    created_at: "2024-12-05T13:30:00Z",
    name: "Urban Artists Collective",
    coverPicture: {
      id: "group-cover-5",
      type: PictureType.GROUP_BANNER,
      src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b",
      alt: "Urban art collective banner",
      createdAt: "2024-12-01T11:45:00Z",
    },
    bio: {
      text: "A community for urban artists of all disciplines - painters, sculptors, street artists, digital creators, and more. We collaborate on projects, share resources, and organize exhibitions to showcase our work.",
    },
    location: "New York, NY",
    photos: [
      {
        id: "group-photo-8",
        type: PictureType.GROUP_GALLERY,
        src: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8",
        alt: "Community mural project",
        caption: "Our collaborative mural in Brooklyn",
        createdAt: "2025-01-30T15:20:00Z",
      },
      {
        id: "group-photo-9",
        type: PictureType.GROUP_GALLERY,
        src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
        alt: "Art exhibition",
        caption: "Opening night of our winter exhibition",
        createdAt: "2025-02-15T19:30:00Z",
      },
    ],
    tags: [
      { id: "tag-25", value: "art" },
      { id: "tag-26", value: "urban" },
      { id: "tag-27", value: "creative" },
      { id: "tag-28", value: "community" },
    ],
    memberCount: 124,
    events: [], // No specific events linked yet
    hosts: [
      {
        id: "host-6",
        displayName: "Maya Rodriguez",
        displayPicture: {
          id: "host-pic-6",
          type: PictureType.PROFILE_PICTURE,
          src: "https://randomuser.me/api/portraits/women/30.jpg",
          alt: "Maya Rodriguez profile picture",
          createdAt: "2024-11-25T14:10:00Z",
        },
      },
    ],
    discussion: [
      {
        id: "group-comment-8",
        created_at: "2025-03-01T16:20:00Z",
        isParentComment: true,
        childComments: [],
        author: "host-6",
        commentData: {
          text: "We're looking for volunteers to help organize our spring exhibition. If you're interested, please message me directly!",
        },
      },
    ],
    members: [
      {
        id: "user-3",
        displayName: "Sarah Williams",
        displayPicture: {
          id: "user-pic-3",
          type: PictureType.PROFILE_PICTURE,
          src: "https://randomuser.me/api/portraits/women/3.jpg",
          alt: "Sarah Williams profile picture",
          createdAt: "2024-12-10T14:20:00Z",
        },
      },
      {
        id: "user-9",
        displayName: "Sophia Lee",
        displayPicture: {
          id: "user-pic-9",
          type: PictureType.PROFILE_PICTURE,
          src: "https://randomuser.me/api/portraits/women/9.jpg",
          alt: "Sophia Lee profile picture",
          createdAt: "2024-12-20T16:45:00Z",
        },
      },
    ],
  },
];
