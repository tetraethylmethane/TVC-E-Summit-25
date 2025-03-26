import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(
        ".animated-word",
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.inOut",
          stagger: 0.02,
        },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={clsx("animated-title", containerClass)}>
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description }) => {
  return (
    <div className="relative size-full aspect-w-1 aspect-h-1">
      <video
        src={src}
        className="absolute inset-0 size-full object-cover object-center"
        autoPlay
        loop
        muted
      />
      <div className="relative z-10 flex flex-col justify-between py-36 px-5 text-[#fdf0d5]">
        <h1 className="bento-title special-font mb-4 mt-auto">{title}</h1>
        {description && <p className="text-white text-xs md:text-base">{description}</p>}
      </div>
    </div>
  );
};

const cardData = [
  { src: "img/feature-3.mp4", title: "Title 1", description: "" },
  { src: "img/feature-4.mp4", title: "Title 2", description: "" },
  { src: "img/feature-3.mp4", title: "Title 3", description: "" },
  { src: "img/feature-4.mp4", title: "Title 4", description: "" },
  { src: "img/feature-3.mp4", title: "Title 5", description: "" },
  { src: "img/feature-4.mp4", title: "Title 6", description: "" },
  { src: "img/feature-3.mp4", title: "Title 7", description: "" },
  { src: "img/feature-4.mp4", title: "Title 8", description: "" },
  // Add more data as necessary
];

const UpdatedCards = () => (
  <section className="bg-black pb-52">
    <div id="Cards" className="container m-auto md:px-10">
      {/* Animated Title */}
      <div className="relative w-full">
        <AnimatedTitle
          title="Sponsors"
          containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 py-10">
        {cardData.map((card, index) => (
          <BentoTilt
            key={index}
            className={`bento-tilt_1 row-span-1 md:col-span-1 ${index % 2 === 0 ? "md:ms-6 ms-14" : "md:me-6 me-14"} p-2 md:p-4`}
          >
            <BentoCard
              src={card.src}
              title={card.title}
              description={card.description}
            />
          </BentoTilt>
        ))}
      </div>
    </div>
  </section>
);

export default UpdatedCards;
