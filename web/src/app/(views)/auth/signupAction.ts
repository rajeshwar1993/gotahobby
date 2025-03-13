"use server";

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// Define validation schema
const signupSchema = z
  .object({
    displayName: z
      .string()
      .min(1, { message: "Display name is required" })
      .max(50, { message: "Display name cannot exceed 50 characters" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Define return type for the action
type ActionResponse = {
  success: boolean;
  errors?: {
    displayName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    _form?: string[];
  };
};

// Define type for field errors to ensure type safety
type FieldErrors = NonNullable<ActionResponse["errors"]>;
type FieldErrorKey = keyof FieldErrors;

export async function signupAction(
  formData: FormData
): Promise<ActionResponse> {
  let supabase;
  let isLoginSuccess = true;

  try {
    supabase = await createClient();
  } catch (_) {
    return {
      success: false,
      errors: {
        _form: ["Failed to initialize authentication"],
      },
    };
  }

  // Extract and validate form data
  const rawFormData = {
    displayName: formData.get("displayName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  // Validate inputs
  const validationResult = signupSchema.safeParse(rawFormData);

  if (!validationResult.success) {
    const fieldErrors: FieldErrors = {};

    validationResult.error.issues.forEach((issue) => {
      const path = issue.path[0] as FieldErrorKey;
      if (!fieldErrors[path]) {
        fieldErrors[path] = [];
      }
      fieldErrors[path]!.push(issue.message);
    });

    return {
      success: false,
      errors: fieldErrors,
    };
  }

  const { displayName, email, password } = validationResult.data;

  try {
    // Sign up user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    if (authError) {
      return {
        success: false,
        errors: {
          _form: [
            authError.message === "User already registered"
              ? "An account with this email already exists"
              : "An error occurred during signup. Please try again.",
          ],
        },
      };
    }

    if (!authData.user?.id) {
      return {
        success: false,
        errors: {
          _form: ["Failed to create user account"],
        },
      };
    }

    // Create user record in database
    const { error: dbError } = await supabase.from("users").insert({
      id: authData.user.id,
      displayName: displayName,
      email: email,
    });

    if (dbError) {
      // Attempt to clean up the auth user if db insertion fails
      await supabase.auth.admin.deleteUser(authData.user.id);

      return {
        success: false,
        errors: {
          _form: ["Failed to create user profile. Please try again."],
        },
      };
    }
  } catch (error) {
    isLoginSuccess = false;
    // Handle unexpected errors
    return {
      success: false,
      errors: {
        _form: ["An unexpected error occurred. Please try again later."],
      },
    };
  } finally {
    if (isLoginSuccess) redirect("/");
    return {
      success: isLoginSuccess,
      errors: isLoginSuccess
        ? {
            _form: ["An unexpected error occurred. Please try again later."],
          }
        : undefined,
    };
  }
}
