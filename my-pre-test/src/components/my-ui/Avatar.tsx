import React from "react";
import Image, { StaticImageData } from "next/image";

interface AvatarProps {
  src?: string | StaticImageData;
  alt?: string;
  size?: "small" | "medium" | "large" | "xlarge";
  rounded?: boolean;
  priority?: boolean;
  className?: string; // เพิ่ม className prop
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  size = "medium",
  rounded = true,
  priority = false,
  className = "", // กำหนด default เป็น string ว่าง
}) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
    xlarge: "w-24 h-24",
  };

  const roundedClasses = rounded ? "rounded-full" : "rounded-md";

  const containerClasses = `relative flex-shrink-0 overflow-hidden ${sizeClasses[size]} ${roundedClasses} ${className}`;

  return (
    <div className={containerClasses}>
      {src ? (
        <Image
          className="object-cover w-full h-full"
          src={src}
          alt={alt}
          fill
          priority={priority}
          style={{ objectFit: "cover" }}
          sizes={`(max-width: 640px) ${
            size === "small" ? "8vw" : size === "medium" ? "12vw" : "16vw"
          }, ${
            size === "small" ? "80px" : size === "medium" ? "120px" : "160px"
          }`}
        />
      ) : (
        <div
          className={`flex items-center justify-center w-full h-full bg-gray-200 text-gray-600 ${roundedClasses}`}
        >
          {alt.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default Avatar;
