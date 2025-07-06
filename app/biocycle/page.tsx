"use client";

import { useEffect, useState, useRef } from "react";
import BioCycleNavigation from "./components/BioCycleNavigation";
import HeroSection from "./components/HeroSection";
import SustainabilitySection from "./components/SustainabilitySection";
import CleanEnergySection from "./components/CleanEnergySection";
import ProductSpecifications from "./components/ProductSpecifications";
import AboutSection from "./components/AboutSection";
import BiomassBenefits from "./components/BiomassBenefits";
import IndustriesServed from "./components/IndustriesServed";
import SellRawMaterial from "./components/SellRawMaterial";
import BiomassProcess from "./components/BiomassProcess";
import Contact from "./components/contact";
import BioCycleFooter from "./components/BioCycleFooter";


export default function BiomassWebsite() {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo({ top: 0, behavior: "instant" });

    // Create intersection observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          setVisibleElements((prev) => {
            const updated = new Set(prev);
            if (entry.isIntersecting) {
              updated.add(id); // add when in view
            } else {
              updated.delete(id); // remove when out of view
            }
            return updated;
          });
        });
      },
      {
        threshold: 0.25, // adjust for smoother timing
        rootMargin: "0px",
      }
    );

    // Observe all elements with data-animate
    const animatedElements = document.querySelectorAll("[data-animate]");
    animatedElements.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getAnimationClass = (elementId: string, animationType = "fade-up") => {
    const baseClasses = "transition-all duration-1000 ease-out";
    const isVisible = visibleElements.has(elementId);

    switch (animationType) {
      case "fade-up":
        return `${baseClasses} ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`;
      case "fade-down":
        return `${baseClasses} ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        }`;
      case "fade-left":
        return `${baseClasses} ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        }`;
      case "fade-right":
        return `${baseClasses} ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
        }`;
      case "scale":
        return `${baseClasses} ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`;
      case "rotate":
        return `${baseClasses} ${
          isVisible ? "opacity-100 rotate-0" : "opacity-0 rotate-12"
        }`;
      default:
        return `${baseClasses} ${isVisible ? "opacity-100" : "opacity-0"}`;
    }
  };

  return (
    <div className="scrollbar-bicycle h-screen overflow-y-scroll overflow-x-hidden">

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        <BioCycleNavigation />

        <HeroSection
          getAnimationClass={getAnimationClass}
          scrollToSection={scrollToSection}
        />

        <SustainabilitySection getAnimationClass={getAnimationClass} />
        <CleanEnergySection getAnimationClass={getAnimationClass} />
        <ProductSpecifications getAnimationClass={getAnimationClass} />
        <AboutSection getAnimationClass={getAnimationClass} />
        <BiomassBenefits getAnimationClass={getAnimationClass} />
        <IndustriesServed getAnimationClass={getAnimationClass} />
        <SellRawMaterial
          getAnimationClass={getAnimationClass}
          scrollToSection={scrollToSection}
        />
        <BiomassProcess getAnimationClass={getAnimationClass} />
        <Contact getAnimationClass={getAnimationClass} />
        <BioCycleFooter />
      </div>
    </div>
  );
}
