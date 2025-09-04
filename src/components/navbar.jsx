import React, { useRef, useEffect, useState } from "react";
import useHoverBox from "../hook/useHoverBox.js";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { motion } from "framer-motion";

function Navbar() {
  const { box, handleEnter, handleLeave } = useHoverBox();
  const containerRef = useRef(null);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav className="flex justify-between my-4 page-container">
      <Link className="my-auto font-bold text-2xl">NGUYEN DUONG HUNG</Link>
      <motion.div
        ref={containerRef}
        className="z-10 bg-1dp bg-bg-base px-2 rounded-2xl nav-container"
        drag
        dragConstraints="parent" // Use parent as constraint instead
        dragMomentum={false}
        whileTap={{ cursor: "grabbing" }}
        dragElastic={0.1}
      >
        <ul className="relative flex">
          {box ? (
            <span
              className="absolute bg-primary invert rounded-2xl transition-all duration-300 ease-in-out pointer-events-none"
              //keep the inline styling tailwind render can cause issues
              style={{
                top: box.top,
                left: box.left,
                width: box.width,
                height: box.height,
              }}
            />
          ) : (
            <span className="top-full left-1/2 absolute bg-primary rounded-2xl w-[85%] h-0.5 transition-all -translate-x-1/2 duration-300 ease-in-out" />
          )}
          {links.map((item) => (
            <li
              key={item.label}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              <Link
                className="flex justify-center items-center p-3 w-20 font-bold text-white"
                to={item.to}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {box ? (
            <span
              className="absolute bg-white rounded-2xl transition-all duration-300 ease-in-out pointer-events-none mix-blend-difference"
              //keep the inline styling tailwind render can cause issues
              style={{
                top: box.top,
                left: box.left,
                width: box.width,
                height: box.height,
              }}
            />
          ) : (
            <span className="top-full left-1/2 absolute bg-primary rounded-2xl w-[85%] h-0.5 transition-all -translate-x-1/2 duration-300 ease-in-out" />
          )}
        </ul>
      </motion.div>
    </nav>
  );
}

export default Navbar;
