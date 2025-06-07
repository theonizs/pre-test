"use client"; // <-- ทำให้เป็น Client Component

import React, { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 150);
  }, [isLoading]);

  if (isLoading) {
    // กำลังตรวจสอบ Authen, แสดง Loading Spinner
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-150px)]">
        <Loader2Icon className="animate-spin h-[60px] w-[60px] text-blue-200" />
      </div>
    );
  }
  return <>{children}</>;
};

export default AuthGuard;
