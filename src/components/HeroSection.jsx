import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import heroVideo from "../videos/background-video.mp4";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });

    tl.fromTo(
      heroRef.current.querySelector(".hero-title"),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1 }
    ).fromTo(
      heroRef.current.querySelector(".hero-text"),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1 },
      "-=0.6"
    ).fromTo(
      heroRef.current.querySelectorAll(".hero-btn"),
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, stagger: 0.2 },
      "-=0.6"
    );
  }, []);

  return (
    <section
      ref={heroRef} // ✅ Add this line
      className="relative bg-gray-900 text-white py-20 px-4 text-center overflow-hidden"
      style={{ height: "80vh" }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold hero-title">
          Drive In with Problems, <br /> Drive Out with Confidence
        </h1>
        <p className="mt-4 text-lg text-gray-300 hero-text">
          Fast, affordable car repairs and genuine parts in one spot.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <a href="/book" className="hero-btn bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded">
            Book Repair
          </a>
          <a href="/parts" className="hero-btn bg-white text-black hover:bg-gray-200 px-6 py-3 rounded">
            Order Parts
          </a>
        </div>
      </div>
    </section>
  );
}
