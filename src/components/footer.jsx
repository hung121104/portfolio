import React from "react";
import { Link } from "react-router-dom";

function Footer() {

  const linkAndIcon = [
    {
      link: "mailto:duonghungnguyen111204@gmail.com",
      icon: "/assets/socialSVG/linkedin-round-svgrepo-com.svg",
      name: "Email",
    },
    {
      link: "https://www.linkedin.com/in/nguyenduonghung/",
      icon: "/assets/socialSVG/linkedin-round-svgrepo-com.svg",
      name: "LinkedIn",
    },
    {
      link: "https://github.com/hung121104",
      icon: "/assets/socialSVG/github-142-svgrepo-com.svg",
      name: "GitHub",
    },
  ];

  return (
    <div className="flex justify-end items-center gap-5 my-4 page-container">

      
      {linkAndIcon.map(({ link, icon, name }) => (
        <Link
          key={name}
          to={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-end items-center bg-gray-500 p-0 rounded-full w-9 hover:w-30 h-9 overflow-hidden text-black text-xs duration-300 ease-in-out"
        >
          <h1 className="mx-2">{name}</h1>
          <img
            src={icon}
            alt={name}
            className="bg-white rounded-full ring-2 ring-black ring-inset w-9 h-9"
          />
        </Link>
      ))}
    </div>
  );
}

export default Footer;
