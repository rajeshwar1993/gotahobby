"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageModal } from "../image-modal";
import { useRef, useState } from "react";
import { Picture } from "@/types";

// Gallery Component
export const Gallery = ({ images }: { images: Picture[] }) => {
  const [selectedImage, setSelectedImage] = useState<Picture | null>(null);
  const galleryArea = useRef<HTMLDivElement | null>(null);

  const scrollGallery = (direction: "left" | "right") => {
    const scrollAmount = direction === "left" ? -400 : 400;
    galleryArea.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Scroll Buttons - Only visible on desktop */}
      {images.length > 2 && (
        <>
          <button
            onClick={() => scrollGallery("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-background rounded-full p-2 shadow-md hover:bg-accent"
            aria-label="Scroll gallery left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => scrollGallery("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-background rounded-full p-2 shadow-md hover:bg-accent"
            aria-label="Scroll gallery right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Scrollable Gallery */}
      <div
        ref={galleryArea}
        id="gallery-scroll"
        className="flex overflow-x-auto gap-4 pb-4 scroll-smooth hide-scrollbar"
        role="region"
        aria-label="Event gallery"
      >
        {images.map((image, index) => (
          <button
            key={index}
            className="flex-none transition-transform hover:scale-105"
            onClick={() => setSelectedImage(image)}
            aria-label={`View gallery image ${index + 1}`}
          >
            <img
              src={image.src}
              alt={`Event gallery image ${index + 1}`}
              className="w-[200px] h-[200px] md:w-[400px] md:h-[400px] object-cover rounded-lg"
            />
          </button>
        ))}
      </div>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

      {/* Custom CSS for hiding scrollbar while maintaining functionality */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
