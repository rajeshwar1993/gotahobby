"use client";

import { useState } from "react";
import { XCircleIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  error?: string;
  placeholder?: string;
}

export function TagInput({
  tags,
  onTagsChange,
  error,
  placeholder = "Add a tag",
}: TagInputProps) {
  const [tagInput, setTagInput] = useState("");

  // Handle tag input
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  // Add a tag
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      onTagsChange([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // Remove a tag
  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  // Handle tag input key press (add tag on Enter)
  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={tagInput}
          onChange={handleTagInputChange}
          onKeyDown={handleTagKeyPress}
          placeholder={placeholder}
          className={error ? "border-destructive" : ""}
        />
        <Button type="button" onClick={addTag} variant="outline">
          Add
        </Button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className="bg-muted text-muted-foreground px-3 py-1 rounded-md text-sm flex items-center gap-1"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-muted-foreground hover:text-destructive"
            >
              <XCircleIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
