"use client";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Landing from "@/components/Landing";
import Selling from "@/components/Selling";
import { SectionKeys } from "@/types/type";
import React, { useRef } from "react";
export default function Home() {
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const sellingRef = useRef<HTMLDivElement>(null);
  const collabRef = useRef<HTMLDivElement>(null);
  // function to scroll to View
  const scrollToSection = (section: SectionKeys) => {
    switch (section) {
      case "home":
        homeRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "about":
        aboutRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "selling":
        sellingRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "collab":
        collabRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        console.warn(`unhandled Key: ${section}`);

        break;
    }
  };
  return (
    <>
      <Landing section={homeRef} scroll={scrollToSection} />
      <About section={aboutRef} />
      <Selling section={sellingRef} />
      <Footer section={collabRef} />
    </>
  );
}
