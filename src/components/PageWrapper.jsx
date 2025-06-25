// src/components/PageWrapper.jsx
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function PageWrapper({ children }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const el = wrapperRef.current;
    gsap.fromTo(
      el,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );

    return () => {
      gsap.to(el, {
        x: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      });
    };
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
