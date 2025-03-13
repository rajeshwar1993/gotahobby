"use server";

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// Define validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

// Define return type for the action
type ActionResponse = {
  success: boolean;
  errors?: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
};

// Define type for field errors to ensure type safety
type FieldErrors = NonNullable<ActionResponse["errors"]>;
type FieldErrorKey = keyof FieldErrors;

export async function loginAction(formData: FormData): Promise<ActionResponse> {
  // Extract form data
  const email = formData.get("email");
  const password = formData.get("password");

  // Validate inputs
  const validationResult = loginSchema.safeParse({ email, password });

  if (!validationResult.success) {
    // Convert Zod errors into a more friendly format
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

  // Initialize Supabase client
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: validationResult.data.email,
      password: validationResult.data.password,
    });

    if (error) {
      // Handle authentication errors
      return {
        success: false,
        errors: {
          _form: [
            error.message === "Invalid login credentials"
              ? "Invalid email or password"
              : "An error occurred during login. Please try again.",
          ],
        },
      };
    }

    if (data.user) {
      // Successful login
      redirect("/");
    }

    return {
      success: true,
    };
  } catch (_) {
    // Handle unexpected errors
    return {
      success: false,
      errors: {
        _form: ["An unexpected error occurred. Please try again later."],
      },
    };
  }
}
