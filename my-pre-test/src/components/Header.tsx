// components/Header.tsx
"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import myProfileImage from "@/images/android-chrome-192x192.png";
import { useAuthStore } from "@/stores/useAuth";
import DropdownMenu from "@/components/my-ui/DropDownMenu";
import { Button } from "@/components/ui/button";
import AuthGuard from "@/components/AuthGuard";
import Avatar from "./my-ui/Avatar";

export default function Header() {
  const { isAuthenticated, user } = useAuthStore();

  const dropdownOptions = [
    { value: "1", label: "Profile", link: "/my-profile" },
    { value: "2", label: "Component", link: "/my-component" },
  ];

  return (
    <AuthGuard>
      <header className="sticky top-0 z-50 flex items-center justify-center px-4 py-3 border-b bg-white shadow-xs">
        {!isAuthenticated ? (
          <div className="flex items-center justify-between max-w-[1920px] w-full px-6">
            <Link href="/" className="flex items-center text-lg font-semibold">
              Not authenticated
            </Link>

            <Sheet>
              <SheetTrigger className="md:hidden">
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-3/4">
                <SheetHeader>
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                  <SheetDescription className="flex flex-col space-y-4 mt-4">
                    <SheetClose asChild>
                      <Link href="/login" className="hover:underline">
                        login
                      </Link>
                    </SheetClose>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>

            <nav className="hidden md:flex gap-6">
              <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
              </Button>
            </nav>
          </div>
        ) : (
          <div className="flex items-center justify-between max-w-[1920px] w-full px-6">
            <Link href="/" className="flex items-center text-lg font-semibold">
              {isAuthenticated ? " Authenticated" : " Not authenticated"}
            </Link>

            <Sheet>
              <SheetTrigger className="md:hidden">
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex">
                      <Avatar
                        src={myProfileImage}
                        priority={true}
                        alt="User X"
                        size="small"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium leading-none">
                          {user?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </SheetTitle>
                  <SheetDescription className="flex flex-col space-y-4 mt-4">
                    <SheetClose asChild>
                      <Link href="/my-profile" className="hover:underline">
                        Profile
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/my-component" className="hover:underline">
                        Component
                      </Link>
                    </SheetClose>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>

            <nav className="hidden md:flex gap-6">
              <DropdownMenu
                image={myProfileImage}
                title={"User menu"}
                btnTitle={user?.name || ""}
                items={dropdownOptions}
              />
            </nav>
          </div>
        )}
      </header>
    </AuthGuard>
  );
}
