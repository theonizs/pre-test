export interface WebAppManifest {
  name: string;
  short_name?: string;
  description?: string;
  start_url?: string;
  display?: "standalone" | "fullscreen" | "minimal-ui" | "browser";
  background_color?: string;
  theme_color?: string;
  icons: WebAppIcon[];
}

export interface WebAppIcon {
  src: string;
  sizes?: string;
  type?: string;
  purpose?: "any" | "maskable" | "monochrome";
}
