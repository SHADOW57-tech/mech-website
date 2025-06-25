import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Loader() {
  const loaderRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      loaderRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
    );
  }, []);

  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div ref={loaderRef} className="text-center text-white space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500 border-opacity-50 mx-auto" />
        <p className="text-lg font-semibold tracking-wide">Loading, please wait...</p>
      </div>
    </div>
  );
}
