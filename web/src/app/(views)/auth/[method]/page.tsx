import React from "react";
import LoginPage from "./LoginForm";
import SignupPage from "./SignupForm";

// Main AuthPage component
const AuthPage = async ({
  params,
}: {
  params: Promise<{ method: "login" | "signup" }>;
}) => {
  const method = (await params).method;

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full">
        {method === "login" ? <LoginPage /> : <SignupPage />}
      </div>
    </div>
  );
};

export default AuthPage;
