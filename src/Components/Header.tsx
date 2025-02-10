"use client";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { Burger, em } from "@mantine/core";
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

const navLinks = (row: boolean, clicked: any) => {
  const handleClick = () => {
    if (clicked) clicked();
  };

  return links.map((link) => {
    return (
      <Link
        onClick={handleClick}
        key={link.id}
        className={`${row ? "flex flex-col items-center" : ""} font-semibold text-xl`}
        href={link.href}
        style={{ color: '#877337', fontFamily: 'Kings' }}
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
        height: "100px",
        backgroundImage: "url('/assets/header.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        position: "relative",
      }}
    >
      <nav
        className={`flex ${show ? "translate-y-0" : "-translate-y-28"
          } ${shadow ? "shadow-[0px_10px_30px_-10px_#020c1b]" : ""
          } transition-transform duration-500 ease-in-out fixed w-full z-50 h-28 px-10 justify-between items-center xs-mx:px-4 xs-mx:h-20`}
        style={{
          position: "absolute",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          zIndex: 999,
        }}
      >
      {/* > */}
        <Link href="/" style={{ display: "inline-block" }}>
          <Image
            src={"/assets/homeicon.png"}
            alt={"Home Button"}
            width={550}
            height={450}
            sizes='{isMobile ? 45 : 60}'
            className=""
          />
        </Link>
{/* Header ka Burger Icon */}
      {/* <Burger
        className='!z-50 !relative'
        color='#877337'
        lineSize={4}
        size={size}
        opened={opened}
        onClick={toggle}
      /> */}
        <div>
          <SideBar />
        </div>
      </nav>
    </header>
  );
};

export default Header;
export { navLinks };