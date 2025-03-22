"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  GroupFormFields,
  GroupFormData,
  GroupFormErrors,
  validateGroupForm,
} from "@/components/group/group-form-fields";
import { Group } from "@/types";
import { mockGroups } from "@/mocks/data";

// Server action response type
interface EditGroupActionResponse {
  success: boolean;
  errors?: GroupFormErrors;
}

// Empty server action (to be implemented later)
async function updateGroupAction(
  groupId: string,
  formData: FormData
): Promise<EditGroupActionResponse> {
  // This is a placeholder for the actual server action implementation
  return {
    success: true,
  };
}

// Mock function to fetch group data (to be replaced with actual API call)
const fetchGroupData = async (groupId: string): Promise<Group | null> => {
  // Find the group with matching ID
  const group = mockGroups.find((group) => group.id === groupId);

  // Simulate API behavior - return null if not found
  if (!group) {
    return null;
  }

  // Simulate network delay for realism
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Type assertion to ensure the mock data conforms to the Group type
  return group as unknown as Group;
};

export default function EditGroupPage({
  params,
}: {
  params: { groupId: string };
}) {
  const router = useRouter();
  const { groupId } = params;

  const [formData, setFormData] = useState<GroupFormData>({
    name: "",
    bio: "",
    location: "",
    tags: [],
  });
  const [errors, setErrors] = useState<GroupFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Load group data
  useEffect(() => {
    const loadGroupData = async () => {
      try {
        setIsLoading(true);
        const group = await fetchGroupData(groupId);

        if (!group) {
          setLoadError("Group not found");
          return;
        }

        // Initialize form with group data
        setFormData({
          name: group.name,
          bio: group.bio?.text || "",
          location: group.location,
          tags: group.tags.map((tag) => tag.value),
        });
      } catch (error) {
        setLoadError("Failed to load group data");
        console.error("Error loading group:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGroupData();
  }, [groupId]);

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
      const response = await updateGroupAction(groupId, formDataObj);

      if (response.success) {
        // Redirect to the group page
        router.push(`/group/${groupId}`);
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

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading group data...</h2>
          <p className="text-muted-foreground">Please wait</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-4">Error Loading Group</h1>
        <p className="text-muted-foreground mb-4">{loadError}</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Page Title */}
      <section className="mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-foreground">
          Edit Group
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

        {/* Submit Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg z-40">
          <div className="mx-auto max-w-4xl flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/group/${groupId}`)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-40"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
