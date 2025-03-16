"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mock authentication logic
    const authenticateUser = (email: string, password: string) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === "richard@gmail.com" && password === "password123") {
            resolve("Authenticated");
          } else {
            reject("Invalid credentials");
          }
        }, 1000);
      });
    };

    try {
        const result = await authenticateUser(email, password);
        console.log(result);
        // Store authentication token in localStorage
        localStorage.setItem("authToken", "your-auth-token");
        // Redirect to the dashboard
        router.push("/dashboard");
      } catch (error) {
        console.error(error);
        alert("Authentication failed. Please check your credentials.");
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {/* Main Container */}
      {/* Left Side - Login Form */}
      <div className="w-1/2 p-20 flex flex-col items-center justify-center bg-white">
        <h1 className="text-4xl font-bold mb-4">WELCOME BACK</h1>
        <p className="text-gray-600 mb-8">
          Welcome back! Please enter your details.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[350px] p-2 border rounded-md"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <Input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[350px] p-2 border rounded-md"
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex w-[350px] items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password
            </a>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            className="w-[350px] bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          >
            Sign in
          </Button>
        </form>
      </div>

      {/* Right Side - Image/Background */}
      <div className="w-1/2 bg-cover bg-center">
        <Image
          src="/login-photo.png"
          alt="Login"
          width={500}
          height={800}
          objectFit="cover"
          className="w-screen h-screen p-3"
        />
      </div>
    </div>
  );
}
