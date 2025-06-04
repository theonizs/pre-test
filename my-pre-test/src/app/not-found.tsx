"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-full flex flex-col items-center justify-center text-center p-6 bg-white">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-500 mb-6">
        ขออภัย! หน้าที่คุณค้นหาไม่มีอยู่ในระบบ
      </p>
      <Link href="/">
        <Button>กลับหน้าแรก</Button>
      </Link>
    </div>
  );
}
