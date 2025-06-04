"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { login } from "@/app/actions/auth";
import { useAuth } from "@/stores/useAuth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/stores/useAuth";
import LoginForm from "@/components/login/LoginForm";
export default function ProfilePage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleLoginSubmit = async (values: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setApiError(null);

    try {
      // Call your server action
      const result = await login(values); // Make sure your login action accepts an object, not FormData

      console.log("vcxccxvasd", result);
      if (result?.success) {
        setUser({ user: result.user as User, token: result.token as string });
        router.push("/my-profile");
      } else if (result?.error) {
        setApiError(result.error);
      }
    } catch (error) {
      console.error("Login API error:", error);
      setApiError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <LoginForm onSubmit={handleLoginSubmit} isLoading={loading} />
      <div className="mt-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <p>Hint</p>
          </TooltipTrigger>
          <TooltipContent>
            <p>username: test@test.com</p>
            <p>password: test@@</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {apiError && <p className="text-red-500 mt-4 text-center">{apiError}</p>}
    </div>
  );
}
