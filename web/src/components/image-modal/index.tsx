"use client";

import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Picture } from "@/types";

// Image Modal Component
export const ImageModal = ({
  image,
  onClose,
}: {
  image: Picture;
  onClose: () => void;
}) => {
  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:text-white"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </Button>
        <img
          src={image.url}
          alt="Full screen view"
          className="max-h-[90vh] max-w-[90vw] object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};
