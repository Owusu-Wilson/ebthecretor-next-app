"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (!cookiesAccepted) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-primary text-primary-foreground p-4 flex justify-between items-center">
      <p className="text-sm mr-4">
        This site uses cookies to offer you a better browsing experience.
      </p>
      <Button onClick={acceptCookies} variant="outline" className="whitespace-nowrap bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
        Accept Cookies
      </Button>
    </div>
  );
}
