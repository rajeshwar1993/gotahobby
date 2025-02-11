import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 bg-background border-b z-[1]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Got a Hobby</h1>

        <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
          <Input
            type="search"
            placeholder="Search for events..."
            className="w-full"
          />
        </div>

        <div className="flex items-center space-x-4">
          <Image
            src="/api/placeholder/32/32"
            alt="Profile"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
      </div>
    </header>
  );
}
