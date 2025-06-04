"use client";
import { useAuth } from "@/stores/useAuth";
import Avatar from "@/components/myUi/Avatar";
import myProfileImage from "@/images/android-chrome-192x192.png";

export default function MyProfilePage() {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <Avatar
        src={myProfileImage}
        priority={true}
        alt="User X"
        size="large"
        className="mr-3"
      />
      <h1 className="text-xl font-semibold">Welcome, {user?.name}</h1>
    </div>
  );
}
