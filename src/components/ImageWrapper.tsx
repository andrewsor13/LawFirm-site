"use client";
import Image, { ImageProps } from "next/image";

export default function ImageWrapper({
  alt,
  ...props
}: ImageProps & { alt: string }) {
  return <Image alt={alt} {...props} />;
}
