import React from "react";
import { Link } from "react-router-dom";

import "../styles/navbar.css"

function Navbar() {
  return (
    <nav className="absolute top-0 left-1/2 -translate-x-1/2">
      <ul className="grid grid-cols-2 gap-14 h-10 my-5">
        <li className="flex justify-center items-center ">
          <Link to="/" className="flex items-center justify-center text-lg text-center p-2 hover:text-cyan-200 w-full h-full nav-link">
            Home
          </Link>
        </li>
        <li className="flex justify-center items-center">
          <Link to="/about" className="flex items-center justify-center text-lg text-center p-2 hover:text-cyan-300 w-full h-full nav-link">
            About Me
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
