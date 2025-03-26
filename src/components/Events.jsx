import { useState, useEffect, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";


export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

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

export const BentoCard = ({ src, title, description, venue, overview, isComingSoon, eventDate }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const currentDate = new Date();
      const targetDate = new Date(eventDate);

      const diff = targetDate - currentDate; // time in milliseconds

      if (diff <= 0) {
        setTimeLeft(null); // Event has passed, no countdown
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [eventDate]);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-yellow-200">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base text-white">{description}</p>
          )}

          {/* Venue Section */}
          {venue && (
            <p className="mt-3 max-w-64 text-xs md:text-base text-white">
              <strong>Venue:</strong> {venue}
            </p>
          )}

          {/* Event Overview Section */}
          {overview && (
            <p className="mt-3 max-w-64 text-xs md:text-base text-white">
              <strong>Overview:</strong> {overview}
            </p>
          )}
        </div>

        {isComingSoon && timeLeft && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/50"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(188, 188, 183, 0.53), #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">Coming Soon in:</p>
            <p className="relative z-20 ml-2 text-lg font-bold">
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </p>
          </div>
        )}

        {isComingSoon && !timeLeft && (
          <p className="text-xs text-white opacity-50">Event has started!</p>
        )}
      </div>
    </div>
  );
};

const Events = () => (
  <section className="bg-black pb-52">
    <div id="events" className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-white">
          Where ideas turn into real breakthroughs and dreams start to come alive. 
          With a focus on innovation and a lineup of amazing events, you&apos;re in for 
          an experience that could totally change how you view success. 
          Say goodbye to the ordinary and get ready for something unforgettable!
        </p>
        <p className="max-w-md font-circular-web text-lg text-white opacity-50">
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-4/5 overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/Baggage_Battles.mp4"
          title="Baggage Battles"
          venue="Activity Space 2"
          overview="Bid on mystery bags filled with unclaimed items, test your instincts, and uncover hidden treasures or surprises!"
          isComingSoon
          eventDate="2025-02-09T15:00:00"
        />
      </BentoTilt>



      <BentoTilt className="border-hsla relative mb-7 h-96 w-4/5 overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
            src="videos/Newmi_X_TVC.mp4"
            title="Newmi X TVC"
            
            description="Details for the event will be available soon. Stay tuned!"
            isComingSoon
            eventDate="2025-02-12T15:00:00"
          />
      </BentoTilt>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-4/5 overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
            src="videos/Venture_Verse.mp4"
            title="Venture Verse"
            
            description="Details for the event will be available soon. Stay tuned!"
            isComingSoon
            eventDate="2025-02-15T15:00:00"
          />
      </BentoTilt>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-4/5 overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
            src="videos/Opening_Ceremony.mp4"
            title="Opening Ceremony"
            
            description="Details for the event will be available soon. Stay tuned!"
            isComingSoon
            eventDate="2025-02-20T15:00:00"
          />
      </BentoTilt>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-4/5 overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
            src="videos/Internship_Fair.mp4"
            title="Internship Fair"
            
            description="Details for the event will be available soon. Stay tuned!"
            isComingSoon
            eventDate="2025-02-21T15:00:00"
          />
      </BentoTilt>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-4/5 overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
            src="videos/Biz_Conclave_YT_Connect.mp4"
            title="Biz-Conclave & YT-Connect"
            
            description="Details for the event will be available soon. Stay tuned!"
            isComingSoon
            eventDate="2025-02-22T15:00:00"
          />
      </BentoTilt>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-4/5 overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
            src="videos/Unwind.mp4"
            title="Unwind"
            
            description="Details for the event will be available soon. Stay tuned!"
            isComingSoon
            eventDate="2025-02-23T15:00:00"
          />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-yellow-200 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
            More comming soon.
            </h1>
            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

      </div>
    </div>
  </section>
);

export default Events;
