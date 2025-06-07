"use client";
import { useAuthStore } from "@/stores/useAuth";
import Avatar from "@/components/my-ui/Avatar";
import myProfileImage from "@/images/android-chrome-192x192.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MyProfilePage() {
  const { user } = useAuthStore();

  return (
    <div className="p-4 flex items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center">
        <div className="text-4xl font-bold flex items-center justify-center max-w-[1920px] w-full px-6 mb-4">
          This is profile page
        </div>
        <Avatar
          src={myProfileImage}
          priority={true}
          alt="User X"
          size="xlarge"
          className="mr-3"
        />
        <h1 className="text-xl font-semibold">Welcome, {user?.name}</h1>
        <div className="p-4">
          <Button asChild>
            <Link href="/">home page</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
