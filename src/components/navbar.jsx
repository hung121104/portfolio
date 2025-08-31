import React from "react";
import useHoverBox from "../hook/useHoverBox.js";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const { box, handleEnter, handleLeave } = useHoverBox();

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav className="flex justify-between my-4 page-container">
      <Link className="my-auto font-bold text-2xl">NGUYEN DUONG HUNG</Link>
      <ul className="relative flex nav-container">
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
          <span className="top-full left-0 absolute bg-white rounded-2xl w-full h-0.5 transition-all duration-300 ease-in-out" />
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
