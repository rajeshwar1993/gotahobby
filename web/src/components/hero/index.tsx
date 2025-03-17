import { Button } from "@/components/ui/button";
import { CalendarPlus, Users } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative rounded-xl overflow-hidden">
      {/* Gradient overlay for the hero image */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-700/40 z-10" />

      {/* Hero image with parallax effect */}
      <div
        className="h-[400px] lg:h-[600px] bg-cover bg-center transform transition-transform duration-700 hover:scale-105"
        style={{
          backgroundImage: `url('https://picsum.photos/id/76/1500/1500')`,
        }}
      />

      {/* Content with improved typography and positioning */}
      <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl lg:text-6xl font-bold text-white drop-shadow-md">
            Discover Your Next <span className="text-primary-100">Passion</span>
          </h1>

          <p className="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">
            Connect with like-minded enthusiasts and explore exciting new
            hobbies
          </p>

          {/* Modern CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-600 text-white rounded-full px-8 shadow-lg"
            >
              <CalendarPlus className="h-5 w-5 mr-2" aria-hidden="true" />
              <span>Join Event</span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/20 rounded-full px-8 backdrop-blur-sm"
            >
              <Users className="h-5 w-5 mr-2" aria-hidden="true" />
              <span>Host Event</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
