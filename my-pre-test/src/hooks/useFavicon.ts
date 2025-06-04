"use client";

import { useEffect } from "react";

interface UseFaviconOptions {
  href: string;
  type?:
    | "image/svg+xml"
    | "image/png"
    | "image/x-icon"
    | "image/webp"
    | "image/avif";
  sizes?: string;
}

export const useFavicon = ({
  href,
  type = "image/png",
  sizes,
}: UseFaviconOptions): void => {
  useEffect(() => {
    const link: HTMLLinkElement | null =
      document.querySelector("link[rel*='icon']");

    if (link) {
      link.href = href;
      link.type = type;
      if (sizes) link.setAttribute("sizes", sizes);
    } else {
      const newLink = document.createElement("link");
      newLink.rel = "icon";
      newLink.href = href;
      newLink.type = type;
      if (sizes) newLink.sizes = sizes;
      document.head.appendChild(newLink);
    }
  }, [href, type, sizes]);
};

// SVG favicon hook
export const useSvgFavicon = (isDarkMode: boolean): void => {
  useFavicon({
    href: isDarkMode ? "/favicon-dark.svg" : "/favicon-light.svg",
    type: "image/svg+xml",
  });
};
