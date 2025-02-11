import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative h-[500px] rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-[url('/api/placeholder/1200/500')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Discover Your Next Passion
        </h2>
        <Button size="lg" className="bg-white text-black hover:bg-white/90">
          Browse Events
        </Button>
      </div>
    </div>
  );
}
