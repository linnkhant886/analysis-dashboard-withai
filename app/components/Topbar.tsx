"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./ModeToggle";



export default function TopBar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
      <div className="flex flex-1 items-center gap-4 md:gap-8">
        <div className="ml-auto flex items-center gap-4">
          <ModeToggle />

          <div className="flex items-center gap-2 ">
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="User"
              />
              <AvatarFallback>R</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Hello, Richard</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
