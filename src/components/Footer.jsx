import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const socialLinks = [
  { href: "https://instagram.com/edc_tiet", icon: <FaInstagram /> },
  { href: "https://www.linkedin.com/school/entrepreneurship-development-cell-thapar-university/", icon: <FaLinkedin /> },
  { href: "https://twitter.com/edctiet", icon: <FaTwitter /> },
];

const Footer = () => {
  return (
    <footer className="w-screen py-4 text-black">
      <div className="container mx-auto flex flex-row items-center justify-between gap-4 px-4">
        <p className="text-center text-sm font-light md:text-left">
          ©Thapar Venture Club 2025. All rights reserved
        </p>

        <div className="flex justify-center gap-4">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="container mx-auto flex items-center px-6 text-black transition-colors duration-500 ease-in-out hover:text-gray-500"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
