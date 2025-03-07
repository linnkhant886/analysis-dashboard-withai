import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {/* Main Container */}
      {/* Left Side - Login Form */}
      <div className="w-1/2 p-20 flex flex-col items-center justify-center bg-white">
        <h1 className="text-4xl font-bold mb-4">WELCOME BACK</h1>
        <p className="text-gray-600 mb-8">
          Welcome back! Please enter your details.
        </p>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <Input
            type="email"
            placeholder="Enter your email"
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
        <Button className="w-[350px] bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
          Sign in
        </Button>
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
