import Section1 from "@/components/home/Section-1";
export default function Home() {
  return (
    <div className="p-4">
      <div className="flex flex-col items-center justify-center">
        <div className="text-4xl font-bold text-center flex items-center justify-center max-w-[1920px] w-full px-6 mb-4">
          This is the home page
        </div>
      </div>

      <div className="p-4">
        <Section1 />
      </div>
    </div>
  );
}
