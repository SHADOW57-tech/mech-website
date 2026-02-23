import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import allData from "../data/PartsData";
import Floatbutton from "../components/Floatbutton";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  const heroRef = useRef(null);
  const carRef = useRef(null);
  const sectionRefs = useRef([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const featuredParts = allData.slice(0, 4);

  const testimonials = [
    {
      name: "Michael A.",
      text: "Best auto parts supplier I’ve used. Fast delivery and great quality.",
    },
    {
      name: "Sarah K.",
      text: "Their brake pads are top quality. My car feels brand new.",
    },
    {
      name: "David T.",
      text: "Professional service and very affordable pricing.",
    },
  ];


  useEffect(() => {

    // Hero animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );


    // Floating car animation
    if (carRef.current) {
      gsap.to(carRef.current, {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }


    // Scroll animations
    sectionRefs.current.forEach((section) => {
      if (!section) return;

      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );
    });


    // Testimonial slider
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 4000);


    return () => {
      clearInterval(interval);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };

  }, []);



  return (
    <div className="bg-black text-white overflow-hidden">

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center text-center px-6"
      >

        {/* Background */}
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover opacity-80"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70')",
          }}
        />

        <div className="relative z-10 max-w-4xl">

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Premium <span className="text-red-600">Auto Parts</span>
          </h1>

          <p className="mt-6 text-gray-400 text-lg">
            High performance parts engineered for durability and reliability.
          </p>

          <div className="mt-8 flex gap-4 justify-center">

            <Link
              to="/parts"
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition hover:scale-105"
            >
              Shop Now
            </Link>

            <Link
              to="/contact"
              className="border border-gray-500 px-6 py-3 rounded-lg hover:border-red-600 hover:text-red-500 transition"
            >
              Contact Us
            </Link>

          </div>

        </div>


        {/* Floating Car */}
        <img
          ref={carRef}
          src="https://pngimg.com/uploads/car/car_PNG1667.png"
          alt="Car"
          className="absolute bottom-10 w-80 md:w-96 opacity-90"
        />

      </section>



      {/* FEATURED PARTS */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="py-20 px-6 bg-gray-900"
      >

        <h2 className="text-4xl font-bold text-center mb-12">
          Featured Parts
        </h2>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">

          {featuredParts.map((part) => (

            <div
              key={part.id}
              className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition"
            >

              <img
                src={part.image}
                alt={part.name}
                className="h-32 object-contain mx-auto"
              />

              <h4 className="mt-4 font-semibold">
                {part.name}
              </h4>

              <p className="text-red-500 font-bold mt-2">
                ₦{Number(part.price).toLocaleString()}
              </p>

            </div>

          ))}

        </div>

      </section>



      {/* TESTIMONIALS */}
      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className="py-20 px-6 text-center"
      >

        <h2 className="text-4xl font-bold mb-10">
          What Customers Say
        </h2>


        <div className="max-w-3xl mx-auto transition-all duration-700">

          <p className="text-xl text-gray-300 italic">
            "{testimonials[currentTestimonial].text}"
          </p>

          <h4 className="mt-6 text-red-500 font-bold">
            - {testimonials[currentTestimonial].name}
          </h4>

        </div>

      </section>



      {/* CTA */}
      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className="py-20 px-6 bg-gradient-to-r from-red-700 to-red-600 text-center"
      >

        <h2 className="text-4xl font-bold mb-6">
          Ready to Upgrade Your Ride?
        </h2>


        <Link
          to="/parts"
          className="bg-black px-8 py-3 rounded-lg hover:bg-gray-800 transition hover:scale-105"
        >
          Browse Parts Now
        </Link>

      </section>
       <Floatbutton/>

    </div>
  );
}
