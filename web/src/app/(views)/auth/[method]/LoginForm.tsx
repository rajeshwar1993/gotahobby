"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Lock } from "lucide-react";
import { loginAction } from "../loignAction";
import Form from "next/form";

// Email Input Component
const EmailInput = ({ error }: { error?: string }) => (
  <div className="space-y-2">
    <div className="relative">
      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      <Input
        type="email"
        name="email"
        placeholder="Enter your email"
        className="pl-10"
      />
    </div>
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

// Password Input Component
const PasswordInput = ({ error }: { error?: string }) => (
  <div className="space-y-2">
    <div className="relative">
      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      <Input
        type="password"
        name="password"
        placeholder="Enter your password"
        className="pl-10"
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

// Main Login Form Component
const LoginForm = () => {
  const [errors, setErrors] = useState<{
    email?: string[];
    password?: string[];
    _form?: string[];
  }>();

  async function handleSubmit(formData: FormData) {
    const response = await loginAction(formData);
    if (!response.success) {
      setErrors(response.errors);
    }
  }

  return (
    <Form action={handleSubmit} className="w-full">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-gray-500">
            Sign in to your account to continue
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <FormError error={errors?._form?.[0]} />
          <EmailInput error={errors?.email?.[0]} />
          <PasswordInput error={errors?.password?.[0]} />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full h-12">
          Sign In
        </Button>

        {/* Sign Up Link */}
        <p className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <a href="/auth/signup" className="text-primary hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </Form>
  );
};

// Main Login Page Component
const LoginPage = () => {
  return (
    <div className="container mx-auto flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
