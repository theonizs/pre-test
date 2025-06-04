import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
    </div>
  );
}
