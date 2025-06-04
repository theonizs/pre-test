// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="flex items-center justify-center text-center text-sm text-gray-500 py-6 border-t">
      <div className="flex items-center justify-center max-w-[1920px] w-full px-6">
        © {new Date().getFullYear()} Yong Profile. All rights reserved.
      </div>
    </footer>
  );
}
