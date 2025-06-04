"use client";
import { useAuth, type User } from "@/stores/useAuth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { login, logout } from "@/app/actions/auth";
export default function LoginBtn() {
  const router = useRouter();
  const { isAuthenticated, isLoading, setUser } = useAuth();

  const handleLogin = async () => {
    const formLogin = { email: "test@test.com", password: "test@" };
    const result = await login(formLogin);

    if (result && result.success) {
      setUser({ user: result.user as User, token: result.token as string });
      router.push("/my-profile");
      return;
    } else {
      console.log("Error: ", result.error);
    }
  };

  const handleLogout = async () => {
    console.log("456546456456546");
    await logout();

    router.push("/");
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
  // };

  if (!isAuthenticated) {
    return (
      <div className="p-4">
        <Button
          disabled={isLoading}
          onClick={handleLogin}
          className="w-[150px] mt-2 text-sm text-white hover:text-white bg-sky-500 hover:bg-sky-700 cursor-pointer px-6 py-1 rounded-lg duration-150"
        >
          {isLoading && <Loader2 className="animate-spin" />}
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Button
        disabled={isLoading}
        onClick={handleLogout}
        className="w-[150px] mt-2 text-sm text-sky-500 bg-sky-100 hover:bg-sky-300 border-sky-500 px-6 py-1 rounded-lg duration-150"
      >
        {isLoading && <Loader2 className="animate-spin" />}
        {isLoading ? "Loading..." : "Logout"}
      </Button>
    </div>
  );
}
