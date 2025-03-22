import { Event } from "../types";
import { PictureType } from "../types/picture";

// Using string literals directly since the enums are not exported from event.ts

export const mockGroups = [
  { id: "1", title: "First group" },
  { id: "2", title: "Second group" },
  { id: "3", title: "Third group" },
];

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
