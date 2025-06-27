import React from "react";
import HeroSection from "../components/HeroSection";

import Footer from "../components/Footer";
import BookAndOrder from "./BookAndOrder";
import PartsGrid from "../components/PartsGrid";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BookAndOrder />
      <PartsGrid />
      <Footer/>
    </>
  );
}
