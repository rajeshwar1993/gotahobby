import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { Search } from "lucide-react";

export default async function Navbar() {
  return (
    <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-primary-100 dark:border-primary-900 z-[1]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">Got a Hobby</h1>

        <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8 relative">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for events..."
              className="w-full pl-10 focus-within:ring-primary/50 transition-all border-primary-100 dark:border-primary-900"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="h-8 w-8 rounded-full bg-primary/10 ring-2 ring-primary overflow-hidden flex items-center justify-center">
            <div className="text-primary text-xs font-bold">JD</div>
          </div>
        </div>
      </div>
    </header>
  );
}
