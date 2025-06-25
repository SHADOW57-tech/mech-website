import React from "react";
import HeroSection from "../components/HeroSection";
import RepairForm from "../components/RepairForm";
import PartsGrid from "../components/PartsGrid";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <RepairForm />
      <PartsGrid />
      <Footer/>
    </>
  );
}
