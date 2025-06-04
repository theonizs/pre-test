"use client";

import { Button } from "@/components/ui/button";
import { LogOutIcon, LogInIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { logout } from "@/app/actions/auth";
import { useAuth } from "@/stores/useAuth";
import Avatar from "./Avatar";
import { StaticImageData } from "next/image";
interface Item {
  label: string;
  value: string;
  link?: string;
}

type DropDownMenuProp = {
  title: string;
  btnTitle: string;
  items: Item[];
  className?: string;
  image?: StaticImageData;
};

const MyDropdown: React.FC<DropDownMenuProp> = ({
  title,
  btnTitle,
  items,
  className,
  image,
}) => {
  const router = useRouter();
  const { isAuthenticated, setLogout } = useAuth();
  const handleClick = (value: string) => {
    router.push(value);
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      setLogout();
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="h-[42px] px-3">
            <Button variant="outline">
              <Avatar src={image} priority={true} alt="User X" size="small" />
              {btnTitle}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={`${className} w-56`}>
            <DropdownMenuLabel>{title}</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              {items.map((item) => (
                <DropdownMenuItem
                  key={item.value}
                  onClick={() => handleClick(item.link || item.value)}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleLogout}>
                <LogOutIcon />
                Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={handleLogin}
          className="w-[150px] mt-2 text-sm text-white hover:text-white bg-sky-500 hover:bg-sky-700 cursor-pointer px-6 py-1 rounded-lg duration-150"
        >
          <LogInIcon />
          Login
        </Button>
      )}
    </div>
  );
};

export default MyDropdown;
