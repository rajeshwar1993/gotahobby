"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  GroupFormFields,
  GroupFormData,
  GroupFormErrors,
  validateGroupForm,
} from "@/components/group/group-form-fields";

// Server action response type
interface EditGroupActionResponse {
  success: boolean;
  errors?: GroupFormErrors;
}

// Empty server action (to be implemented later)
async function createGroupAction(
  formData: FormData
): Promise<EditGroupActionResponse> {
  // This is a placeholder for the actual server action implementation
  return {
    success: true,
  };
}

export default function CreateGroupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<GroupFormData>({
    name: "",
    bio: "",
    location: "",
    tags: [],
  });
  const [errors, setErrors] = useState<GroupFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof GroupFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Handle tags change
  const handleTagsChange = (newTags: string[]) => {
    setFormData((prev) => ({
      ...prev,
      tags: newTags,
    }));

    // Clear tag error if it exists
    if (errors.tags) {
      setErrors((prev) => ({
        ...prev,
        tags: undefined,
      }));
    }
  };

  // Validate form data
  const validateForm = (): boolean => {
    const newErrors = validateGroupForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("bio", formData.bio);
      formDataObj.append("location", formData.location);
      formData.tags.forEach((tag) => {
        formDataObj.append("tags", tag);
      });

      // Call the server action
      const response = await createGroupAction(formDataObj);

      if (response.success) {
        // Redirect to the group page or show success message
        router.push("/groups"); // Adjust the path as needed
      } else if (response.errors) {
        // Handle server-side validation errors
        setErrors(response.errors);
      }
    } catch (error) {
      // Handle unexpected errors
      setErrors({
        _form: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-20">
      {/* Page Title */}
      <section className="mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-foreground">
          Create New Group
        </h1>
      </section>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Form Error */}
        {errors._form && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md">
            {errors._form}
          </div>
        )}

        <GroupFormFields
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onTagsChange={handleTagsChange}
        />

        {/* Submit Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg z-40">
          <div className="mx-auto max-w-4xl flex justify-end">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-40"
            >
              {isSubmitting ? "Creating..." : "Create Group"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
