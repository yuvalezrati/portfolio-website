"use client";

import Image, { type ImageProps } from "next/image";

/** next/image that "develops" like a print in the tray: washed out and soft until loaded. */
export default function DevelopingImage({ alt, onLoad, ...props }: ImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      data-develop=""
      onLoad={(e) => {
        e.currentTarget.dataset.developed = "";
        onLoad?.(e);
      }}
    />
  );
}
