"use client";

import React, { useState, useEffect, ReactNode } from "react";

interface LazyHydrateProps {
  children: ReactNode;
  delay?: number;
  onIdle?: boolean;
  ssrHeight?: string | number;
  className?: string;
}

/**
 * LazyHydrate defers the rendering of its children to avoid TBT during the initial mount/load.
 * This is effective for "below-the-fold" content that doesn't need to be immediate.
 */
export default function LazyHydrate({ 
  children, 
  delay = 800, 
  onIdle = true,
  ssrHeight = 0,
  className = ""
}: LazyHydrateProps) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const trigger = () => setShouldRender(true);

    if (onIdle && typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(() => {
        timer = setTimeout(trigger, delay);
      });
    } else {
      timer = setTimeout(trigger, delay);
    }

    return () => clearTimeout(timer);
  }, [delay, onIdle]);

  if (!shouldRender) {
    // Return a placeholder with reserved height to prevent CLS ☝️🎬
    return <div className={className} style={{ height: ssrHeight, minHeight: ssrHeight }} aria-hidden="true" />;
  }

  return <>{children}</>;
}
