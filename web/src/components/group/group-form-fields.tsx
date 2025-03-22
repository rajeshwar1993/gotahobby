"use client";

import { MapPinIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TagInput } from "@/components/ui/tag-input";

// Define the form data type
export interface GroupFormData {
  name: string;
  bio: string;
  location: string;
  tags: string[];
}

// Define the form errors type
export interface GroupFormErrors {
  name?: string;
  bio?: string;
  location?: string;
  tags?: string;
  _form?: string;
}

interface GroupFormFieldsProps {
  formData: GroupFormData;
  errors: GroupFormErrors;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onTagsChange: (tags: string[]) => void;
}

export function GroupFormFields({
  formData,
  errors,
  onChange,
  onTagsChange,
}: GroupFormFieldsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Left Column - Group Details */}
      <div className="flex-1 space-y-6">
        {/* Group Title */}
        <div className="space-y-2">
          <Label htmlFor="name">Group Title</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Enter group title"
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        {/* Group Bio */}
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={onChange}
            placeholder="Describe your group"
            className={`min-h-[120px] ${
              errors.bio ? "border-destructive" : ""
            }`}
          />
          {errors.bio && (
            <p className="text-sm text-destructive">{errors.bio}</p>
          )}
        </div>

        {/* Group Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={onChange}
              placeholder="Enter location"
              className={`pl-10 ${errors.location ? "border-destructive" : ""}`}
            />
          </div>
          {errors.location && (
            <p className="text-sm text-destructive">{errors.location}</p>
          )}
        </div>
      </div>

      {/* Right Column - Tags and Preview */}
      <div className="flex-1 space-y-6">
        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <TagInput
              tags={formData.tags}
              onTagsChange={onTagsChange}
              error={errors.tags}
              placeholder="Add a tag"
            />
          </CardContent>
        </Card>

        {/* Preview Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">
                {formData.name || "Group Title"}
              </h3>

              {formData.location && (
                <div className="flex items-start gap-2">
                  <MapPinIcon className="h-5 w-5 text-muted-foreground mt-1" />
                  <div className="flex flex-col">
                    <span className="font-semibold">{formData.location}</span>
                  </div>
                </div>
              )}

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {formData.bio && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold mb-1">About</h4>
                  <p className="text-sm text-muted-foreground">
                    {formData.bio}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Validation function for form data
export function validateGroupForm(formData: GroupFormData): GroupFormErrors {
  const errors: GroupFormErrors = {};
  let isValid = true;

  if (!formData.name.trim()) {
    errors.name = "Title is required";
    isValid = false;
  }

  if (!formData.bio.trim()) {
    errors.bio = "Bio is required";
    isValid = false;
  }

  if (!formData.location.trim()) {
    errors.location = "Location is required";
    isValid = false;
  }

  if (formData.tags.length === 0) {
    errors.tags = "At least one tag is required";
    isValid = false;
  }

  return errors;
}
