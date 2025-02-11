// components/search/search-header.tsx
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchHeaderProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export function SearchHeader({ query, onQueryChange }: SearchHeaderProps) {
  return (
    <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 border-b">
      <div className="container max-w-3xl mx-auto px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search events, workshops, classes..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
    </div>
  );
}
