"use client";

import { memo } from "react";

interface CustomIframeProps {
  src: string;
  title: string;
  className?: string;
  loading?: "lazy" | "eager";
  sandbox?: string;
  allow?: string;
}

function CustomIframeComponent({
  src,
  title,
  className = "w-full h-full border-0 scale-90 hover:scale-95 transition-transform duration-500",
  loading = "lazy",
  sandbox = "allow-same-origin allow-scripts allow-popups allow-forms",
  allow,
}: CustomIframeProps) {
  // Use src as key to ensure iframe only recreates when src changes
  return (
    <iframe
      key={src}
      src={src}
      className={className}
      title={title}
      loading={loading}
      sandbox={sandbox}
      allow={allow}
    />
  );
}

// Memoize the component to prevent unnecessary re-renders
export const CustomIframe = memo(CustomIframeComponent);
CustomIframe.displayName = "CustomIframe";

