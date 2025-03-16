import { Button } from "@/components/ui/button";
import { CalendarPlus, Users } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative rounded-lg overflow-hidden">
      {/* Hero image - responsive height */}
      <div className="h-[300px] lg:h-[500px] bg-[url('https://picsum.photos/id/76/1500/1500')] bg-cover bg-center" />

      {/* Content container - below image on mobile, overlay on desktop */}
      <div className="p-6 space-y-6 bg-background lg:absolute lg:inset-0 lg:bg-black/60">
        <div className="lg:h-full lg:flex lg:flex-col lg:items-center lg:justify-center text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 lg:text-white">
            Discover Your Next Passion
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="flex items-center gap-2">
              <CalendarPlus className="h-5 w-5" aria-hidden="true" />
              <span>Join Event</span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="flex items-center gap-2 lg:text-white lg:border-white lg:hover:bg-white/20 lg:hover:text-white"
            >
              <Users className="h-5 w-5" aria-hidden="true" />
              <span>Host Event</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
