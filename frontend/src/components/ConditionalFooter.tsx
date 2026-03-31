"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Hide footer on login, signup, and verify email pages
  const hideFooterPaths = ["/login", "/signup", "/login/verify-email", "/role-selection"];
  const shouldHideFooter = hideFooterPaths.some(path => pathname === path);

  if (shouldHideFooter) {
    return null;
  }

  return <Footer />;
}
