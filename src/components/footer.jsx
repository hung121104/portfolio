import React, { useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [activeButton, setActiveButton] = useState(null);

  const linkAndIcon = [
    {
      link: "mailto:duonghungnguyen111204@gmail.com",
      icon: "/assets/socialSVG/mail-alt-svgrepo-com.svg",
      name: "Email",
    },
    {
      link: "https://www.linkedin.com/in/nguyenduonghung/",
      icon: "/assets/socialSVG/linkedin-161-svgrepo-com.svg",
      name: "LinkedIn",
    },
    {
      link: "https://github.com/hung121104",
      icon: "/assets/socialSVG/github-svgrepo-com.svg",
      name: "GitHub",
    },
  ];

  return (
    <div className="flex justify-end items-center gap-5 my-4 page-container">
      {linkAndIcon.map(({ link, icon, name }) => {
        const isActive = activeButton === name;

        return (
          <Link
            key={name}
            to={link}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setActiveButton(name)}
            className={`flex justify-end items-center ${isActive ? "bg-linear-40 from-white from-0% to-24dp to-70%" : "bg-24dp"}  p-0 rounded-full h-9 overflow-hidden text-black text-xs duration-300 ease-in-out ${
              isActive ? "w-30" : "w-9"
            }`}
          >
            <h1 className="mx-2">{name}</h1>
            <img
              src={icon}
              alt={name}
              className={`p-2 w-9 h-9`}
            />
          </Link>
        );
      })}
    </div>
  );
}

export default Footer;
