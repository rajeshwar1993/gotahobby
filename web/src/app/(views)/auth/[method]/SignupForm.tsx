"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Lock, User } from "lucide-react";
import { signupAction } from "../signupAction";

// Display Name Input Component
const DisplayNameInput = ({ error }: { error?: string }) => (
  <div className="space-y-2">
    <div className="relative">
      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      <Input
        type="text"
        name="displayName"
        placeholder="Enter your display name"
        className="pl-10 h-12 bg-gray-50"
      />
    </div>
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

// Email Input Component
const EmailInput = ({ error }: { error?: string }) => (
  <div className="space-y-2">
    <div className="relative">
      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      <Input
        type="email"
        name="email"
        placeholder="Enter your email"
        className="pl-10 h-12 bg-gray-50"
      />
    </div>
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

// Password Input Component
const PasswordInput = ({
  name,
  placeholder,
  error,
}: {
  name: string;
  placeholder: string;
  error?: string;
}) => (
  <div className="space-y-2">
    <div className="relative">
      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      <Input
        type="password"
        name={name}
        placeholder={placeholder}
        className="pl-10 h-12 bg-gray-50"
      />
    </div>
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

// Form Error Component
const FormError = ({ error }: { error?: string }) =>
  error ? (
    <Alert variant="destructive">
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  ) : null;

// Main Signup Form Component
const SignupForm = () => {
  const [errors, setErrors] = useState<{
    displayName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    _form?: string[];
  }>();

  async function handleSubmit(formData: FormData) {
    const response = await signupAction(formData);
    if (!response.success) {
      setErrors(response.errors);
    }
  }

  return (
    <form action={handleSubmit} className="w-full">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-gray-500">
            Enter your information to get started
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <FormError error={errors?._form?.[0]} />
          <DisplayNameInput error={errors?.displayName?.[0]} />
          <EmailInput error={errors?.email?.[0]} />
          <PasswordInput
            name="password"
            placeholder="Create a password"
            error={errors?.password?.[0]}
          />
          <PasswordInput
            name="confirmPassword"
            placeholder="Confirm your password"
            error={errors?.confirmPassword?.[0]}
          />
        </div>

        {/* Password Requirements */}
        <div className="text-sm text-gray-500 space-y-2">
          <p>Password must:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Be at least 8 characters</li>
            <li>Include one uppercase letter</li>
            <li>Match the confirmation password</li>
          </ul>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full h-12">
          Create Account
        </Button>

        {/* Sign In Link */}
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <a href="/auth/login" className="text-primary hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </form>
  );
};

// Main Signup Page Component
const SignupPage = () => {
  return (
    <div className="w-full md:flex md:items-center md:justify-center">
      <div className="w-full md:min-h-0 flex items-center  p-8 md:p-12 md:rounded-2xl md:max-w-md mx-auto">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
