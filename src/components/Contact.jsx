import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

const socialLinks = [
  { href: "https://instagram.com/edc_tiet", icon: <FaInstagram /> },
  { href: "https://www.linkedin.com/school/entrepreneurship-development-cell-thapar-university/", icon: <FaLinkedin /> },
  { href: "https://twitter.com/edctiet", icon: <FaTwitter /> },
];

const Contact = () => {
  return (
    <div id="contact" className="min-h-screen w-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center py-10 pb-24 w-full max-w-screen-xl md:flex-row md:items-center md:justify-between">
        <div className="relative size-full items-start">
          <AnimatedTitle
            title="Contact Us"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />
        </div>

        <div className="flex justify-center items-center gap-10 mt-8 md:mt-0">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#fdf0d5] text-7xl transition-all duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
