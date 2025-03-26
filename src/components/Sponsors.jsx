import React, { useEffect, useRef } from "react";
import gsap from "gsap"; // Import GSAP once

import sponsor1 from "/img/sponsor1.png";
import sponsor2 from "/img/sponsor2.png";
import sponsor3 from "/img/sponsor3.png";
import sponsor4 from "/img/sponsor4.png";
import sponsor5 from "/img/sponsor5.png";
import sponsor6 from "/img/sponsor6.png";
import AnimatedTitle from "./AnimatedTitle";

const logos = [
  { src: sponsor1, alt: "Sponsor 1" },
  { src: sponsor2, alt: "Sponsor 2" },
  { src: sponsor3, alt: "Sponsor 3" },
  { src: sponsor4, alt: "Sponsor 4" },
  { src: sponsor5, alt: "Sponsor 5" },
  { src: sponsor6, alt: "Sponsor 6" },
];

const Sponsors = () => {
  const tickerRef = useRef(null); 

  // GSAP ticker animation
  useEffect(() => {
    const tickerElement = tickerRef.current;

    if (tickerElement) {
      gsap.to(tickerElement, {
        x: "-50%",
        duration: 20, 
        repeat: -1, 
        ease: "linear",
      });
    }

    return () => {
      gsap.killTweensOf(tickerRef.current);
    };
  }, []);

  return (
    <div id="sponsors" className="py-8 md:py-12 bg-[#fdf0d5] min-h-screen w-full">
      <div className="flex flex-col items-center py-10 pb-24">

        {/* Animated Title */}
        <div className="relative w-full">
          <AnimatedTitle
            title="Sponsors"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />
        </div>
      </div>

      {/* Sponsors Ticker */}
      <div className="container mx-auto">
        <div className="overflow-hidden relative">
          <div ref={tickerRef} className="flex gap-14">
            {/* Duplicate logos to create a continuous loop effect */}
            {[...logos, ...logos].map((logo, index) => (
              <img
                key={index}
                src={logo.src}
                alt={logo.alt}
                className="logo-ticker-image w-32 h-auto"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
