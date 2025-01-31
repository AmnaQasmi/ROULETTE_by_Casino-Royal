"use client";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { em } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import './styles.css';

const links = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Sign Up", href: "/" },
  { id: 3, name: "Login", href: "/login" },
  { id: 4, name: "About Rules", href: "/aboutrules" },
  { id: 5, name: "Contact Us", href: "/contact" },
];


const navLinks = (col: boolean, clicked: any) => {
  const handleClick = () => {
    if (clicked) clicked();
  };

  return links.map((link) => {
    return (
      <Link
        onClick={handleClick}
        key={link.id} // Using unique id as key
        className={`${col ? "flex flex-col items-center" : ""} font-semibold text-xl`}
        href={link.href}
        style={{ color: '#877337', fontFamily: 'Kings'}} //Inline Css k Style ko override karna
      >
        {link.name}
      </Link>
    );
  });
};


const Header = () => {
  const isMobile = useMediaQuery(`(max-width: ${em(476)})`);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shadow, setShadow] = useState(false);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 70) setShow(false);
    else setShow(true);
    if (window.scrollY > 70) setShadow(true);
    else setShadow(false);
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <header
    style={{
      width: "100%",
      height: "100px", // Adjust height as needed
      backgroundImage: "url('/assets/header.png')", // Background image
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      display: "flex", // Flexbox for horizontal alignment
      alignItems: "center", // Center vertically
      justifyContent: "space-between", // Space between logo and sidebar
      padding: "0 20px", // Padding for spacing
      position: "relative", // To allow absolute positioning for child elements
    }}
  >
      <nav
        className={`flex ${
          show ? "translate-y-0" : "-translate-y-28"
        } ${
          shadow ? "shadow-[0px_10px_30px_-10px_#020c1b]" : ""
        } transition-transform duration-500 ease-in-out fixed w-full font-[Kings] z-10 h-28 px-10 justify-between items-center xs-mx:px-4 xs-mx:h-20`}
      >
    {/* Home Button on the top-left */}
    <Link href="/" style={{ display: "inline-block" }}>
      <Image
        src={"/assets/homeicon.png"}
        alt={"Home Button"}
        width={650} // Adjust size as needed
        height={550}
        className=""
      />
    </Link>
    {/* Navigation Links */}
        <div className="bs:flex font-[Kings] gap-9 hidden">{navLinks(false, null)}</div>
  
    {/* Sidebar on the top-right */}
    <div
      // style={{
      //   position: "absolute",
      //   // zIndex : "-z-10",
      //   top: "50%", // Align vertically to the center of header
      //   right: "20px", // Adjust spacing from the right
      //   transform: "translateY(-50%)", // Center the sidebar vertically
      // }}
      className="font-[Kings]"
    >
      <SideBar />
    </div>
    </nav>
  </header>
  
  
  );
};

export default Header;
export { navLinks };
