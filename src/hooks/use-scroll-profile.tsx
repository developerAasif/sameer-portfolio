"use client";

import { useEffect, useState } from "react";

export function useScrollProfile() {
  const [showNavbarImage, setShowNavbarImage] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const profileSection = document.getElementById("home");
      if (profileSection) {
        const rect = profileSection.getBoundingClientRect();
        // Show navbar image when profile section is scrolled past
        setShowNavbarImage(rect.top < -200);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { showNavbarImage };
}

