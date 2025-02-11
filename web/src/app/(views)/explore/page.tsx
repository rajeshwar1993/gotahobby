// app/search/page.tsx
"use client";

import React from "react";
import { Search, MapPin, Share2, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = [
  { name: "All", active: true },
  { name: "Music", active: false },
  { name: "Tech", active: false },
  { name: "Food", active: false },
  { name: "Art", active: false },
  { name: "Business", active: false },
  { name: "Sports", active: false },
  { name: "Health", active: false },
];

// Mock events data - replace with your actual data
const events = [
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
    title: "Photography Workshop",
    date: "Nov 28",
    time: "2:00 PM",
    location: "Downtown Studio",
    price: "45",
    attendees: 28,
  },
  {
    image: "https://picsum.photos/id/15/500/500",
    title: "Photography Workshop",
    date: "Nov 28",
    time: "2:00 PM",
    location: "Downtown Studio",
    price: "45",
    attendees: 28,
  },
  {
    image: "https://picsum.photos/id/4/500/500",
    title: "Photography Workshop",
    date: "Nov 28",
    time: "2:00 PM",
    location: "Downtown Studio",
    price: "45",
    attendees: 28,
  },
];

// Category Filter Component
const CategoryFilter = ({ categories }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
      {categories.map((category) => (
        <Button
          key={category.name}
          variant={category.active ? "default" : "outline"}
          className="rounded-full whitespace-nowrap"
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

// Search Header Component
const SearchHeader = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Find your next event</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input placeholder="Search events..." className="pl-10 w-full" />
        </div>
        <div className="flex-1 relative">
          <MapPin
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input placeholder="Location" className="pl-10 w-full" />
        </div>
        <Button className="w-full md:w-auto">Search</Button>
      </div>
    </div>
  );
};

// Event Card Component
const EventCard = ({ event }) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
        <p className="text-gray-600 mb-2">{event.venue}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>{event.date}</span>
          <span>•</span>
          <span>{event.time}</span>
        </div>
        <Badge variant="secondary" className="mt-2">
          {event.category}
        </Badge>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t flex justify-between">
        <span className="font-semibold">{event.price}</span>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Share2 size={18} />
          </Button>
          <Button variant="ghost" size="icon">
            <Heart size={18} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

// Filter Bar Component
const FilterBar = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">Popular Events</h2>
      <div className="flex gap-4">
        <Button variant="outline">Filters</Button>
        <select className="border rounded-md px-3 py-2">
          <option>Sort by: Featured</option>
          <option>Date</option>
          <option>Price</option>
        </select>
      </div>
    </div>
  );
};

// Main Search Page Component
const EventSearchPage = () => {
  return (
    <>
      <SearchHeader />
      <div className="w-full max-w-7xl mx-auto px-4 pb-12">
        <CategoryFilter categories={categories} />
        <FilterBar />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>
    </>
  );
};

export default EventSearchPage;
