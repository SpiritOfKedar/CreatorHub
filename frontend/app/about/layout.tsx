"use client";

import { useEffect } from "react";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Hide the global footer from root layout when on about page
    const rootFooter = document.querySelector("body > footer");
    if (rootFooter) {
      (rootFooter as HTMLElement).style.display = "none";
    }

    return () => {
      // Restore footer visibility when leaving about page
      if (rootFooter) {
        (rootFooter as HTMLElement).style.display = "";
      }
    };
  }, []);

  return <>{children}</>;
}
