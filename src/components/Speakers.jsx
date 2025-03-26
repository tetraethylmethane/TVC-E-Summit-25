import { useState, useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";

// BentoTilt Component
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
        className="absolute inset-0 size-full object-cover object-center rounded"
        autoPlay
        loop
        muted
      />
      <div className="relative z-10 flex flex-col justify-between py-36 px-5 text-[#fdf0d5]">
        <h1 className="bento-title special-font mb-0 mt-auto">{title}</h1>
        {description && <p className="text-white text-xs md:text-base">{description}</p>}
      </div>
    </div>
  );
};

const cardData = [
  { src: "videos/Ashneer_Grover.mp4", title: "Ashneer Grover", description: "Former managing director of BharatPe" },
  { src: "videos/Tanu_Jain.mp4", title: "Dr. Tanu Jain", description: "Ex-Bureaucrat Teacher & Founder of Tathastu ICS" },
  { src: "videos/Ankush_Singla.mp4", title: "Ankush Singla", description: "CEO of Coding Ninjas" },
  { src: "videos/Himeesh_Madaan.mp4", title: "Himeesh Madaan", description: "Entrepreneur, Performance Coach & Writer" },
  { src: "videos/Prateek_Mittal.mp4", title: "Prateek Mittal", description: "Executive Director of Sushma Group Ltd." },
  { src: "videos/Anubhav_Singh_Bassi.mp4", title: "Anubhav Singh Bassi", description: "Indian Actor, YouTuber & Stand-Up Comedian" },
  { src: "videos/Jaspreet_Singh.mp4", title: "Jaspreet Singh", description: "CEO of Briefs Media, Canadian Writer & Chemist" },
  { src: "videos/Aakash_Anand.mp4", title: "Aakash Anand", description: "CEO of Bella Vita Organic" },
];

const Speakers = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div id="speakers" className="min-h-dvh w-screen bg-black text-white/50">
        <div className="flex size-full flex-col items-center py-10 pb-24">
          <p className="font-general text-sm uppercase md:text-[10px]">Here are our</p>

          <div className="relative size-full mt-10 mb-12 px-4">
            <AnimatedTitle
              title="Speakers"
              containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
            />
          </div>

          {/* Grid Layout for Bento Cards with adjusted gap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 md:gap-8">
            {cardData.map((card, index) => (
              <BentoTilt
                key={index}
                className={`bento-tilt_1 p-4 row-span-1 md:col-span-1 md:row-span-2`}
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
      </div>
    </div>
  </section>
);

export default Speakers;
