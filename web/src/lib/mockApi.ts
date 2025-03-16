import { EventCardProps } from "@/components/event-card";

/**
 * Mock function to simulate fetching upcoming events from an API
 */
export async function getUpcomingEvents(): Promise<EventCardProps[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      image: "https://picsum.photos/id/1/500/500",
      title: "Photography Workshop",
      date: "Nov 28",
      time: "2:00 PM",
      location: "Downtown Studio",
      price: "45",
      attendees: 28,
    },
    {
      image: "https://picsum.photos/id/10/500/500",
      title: "Cooking Class: Italian Cuisine",
      date: "Dec 5",
      time: "6:30 PM",
      location: "Culinary Institute",
      price: "60",
      attendees: 42,
    },
    {
      image: "https://picsum.photos/id/15/500/500",
      title: "Yoga for Beginners",
      date: "Nov 30",
      time: "9:00 AM",
      location: "Wellness Center",
      price: "25",
      attendees: 15,
    },
    {
      image: "https://picsum.photos/id/20/500/500",
      title: "Pottery Class",
      date: "Dec 10",
      time: "4:00 PM",
      location: "Art Studio",
      price: "50",
      attendees: 12,
    },
    {
      image: "https://picsum.photos/id/25/500/500",
      title: "Guitar Lessons",
      date: "Dec 3",
      time: "7:00 PM",
      location: "Music School",
      price: "35",
      attendees: 8,
    },
    {
      image: "https://picsum.photos/id/30/500/500",
      title: "Hiking Adventure",
      date: "Dec 12",
      time: "8:00 AM",
      location: "Mountain Trails",
      price: "15",
      attendees: 20,
    },
  ];
}

/**
 * Mock function to simulate fetching popular events from an API
 */
export async function getPopularEvents(): Promise<EventCardProps[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 700));

  return [
    {
      image: "https://picsum.photos/id/40/500/500",
      title: "Wine Tasting Tour",
      date: "Dec 15",
      time: "5:00 PM",
      location: "Vineyard Valley",
      price: "75",
      attendees: 65,
      status: "Confirmed",
    },
    {
      image: "https://picsum.photos/id/42/500/500",
      title: "Jazz Night",
      date: "Dec 8",
      time: "8:00 PM",
      location: "Blue Note Club",
      price: "30",
      attendees: 120,
    },
    {
      image: "https://picsum.photos/id/45/500/500",
      title: "Painting Workshop",
      date: "Dec 20",
      time: "3:00 PM",
      location: "Creative Space",
      price: "40",
      attendees: 35,
    },
    {
      image: "https://picsum.photos/id/48/500/500",
      title: "Salsa Dancing",
      date: "Dec 18",
      time: "7:30 PM",
      location: "Dance Studio",
      price: "25",
      attendees: 50,
      status: "Confirmed",
    },
    {
      image: "https://picsum.photos/id/50/500/500",
      title: "Book Club Meeting",
      date: "Dec 7",
      time: "6:00 PM",
      location: "City Library",
      price: "Free",
      attendees: 25,
    },
    {
      image: "https://picsum.photos/id/55/500/500",
      title: "Craft Beer Festival",
      date: "Dec 22",
      time: "4:00 PM",
      location: "Riverside Park",
      price: "50",
      attendees: 200,
      status: "Pending",
    },
  ];
}
