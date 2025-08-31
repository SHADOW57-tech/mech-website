import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import heroVideo from "../videos/background-video.mp4";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      heroRef.current.querySelector(".hero-title"),
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        heroRef.current.querySelector(".hero-text"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.5"
      )
      .fromTo(
        heroRef.current.querySelectorAll(".hero-btn"),
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.3 },
        "-=0.3"
      );
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative bg-primary text-secondary py-20 px-4 text-center overflow-hidden"
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
        <h1 className="hero-title text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          Drive In with Problems, <br /> Drive Out with Confidence
        </h1>

        <p className="hero-text mt-4 text-lg text-gray-200">
          Fast, affordable car repairs and genuine parts in one spot.
        </p>

        <div className="mt-6 flex justify-center gap-6">
          {/* Emergency CTA */}
          <a
            href="/book"
            className="hero-btn bg-[#FF3B3B] hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-red-500/40 transition"
          >
            Book Repair
          </a>

          {/* Secondary CTA */}
          <a
            href="/parts"
            className="hero-btn bg-[#FFC107] hover:bg-yellow-600 text-black px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-yellow-400/40 transition"
          >
            Order Parts
          </a>
        </div>
      </div>
    </section>
  );
}
