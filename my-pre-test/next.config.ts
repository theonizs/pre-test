import type { NextConfig } from "next";
// import withPWA from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
  // turbopack: {
  //   // ...
  // },
  // reactStrictMode: true,
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en",
  // },
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
};

export default nextConfig;

// const withPWAConfig = withPWA({
//   dest: "./src/app", // destination directory for the PWA files
//   // we can write `import { myFunction } from "@/lib/myFunction"`.
//   register: true,
// });

// export default withPWAConfig(nextConfig);
