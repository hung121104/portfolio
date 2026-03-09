import React, { useState } from "react";
import GlossyCard from "../components/tiltCard";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="mt-12 min-h-56 size-full page-container">
      <div className="flex justify-between gap-2">
        <div className="flex flex-col items-start bg-4dp p-3 border-[#404040] border-2 rounded-2xl">
          <h1 className="font-bold text-4xl">Hello,I'm Hung</h1>
          <p className="mt-4">
            I'm a creative software developer. I specialize in UI design and
            crafting engaging user experiences with great attention to detail.
          </p>
        </div>
        <GlossyCard
          srcBG="/assets/aboutMe/My_IMG_BG.webp"
          srcMain="/assets/aboutMe/My_IMG_Main.webp"
          srcIcon="/assets/techSVG/Tailwind_CSS.svg"
          width={400}
          height={600}
          alt="Project 1"
          padding={0}
        />
        {/* <div>
          <div className="rotate-x-60 rotate-y-25">
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="perspective-distant"
            >
              <svg
                className="translate-x-1/2"
                width="64"
                height="108"
                viewBox="0 0 64 108"
                fill="none"
              >
                <circle cx="1" cy="54" r="1" fill="#D9D9D9" />
                <path
                  d="M30.8232 100.072L7.5 107.428L13.9365 101.565C20.3944 99.9836 26.3576 97.1449 31.5576 93.3271L30.8232 100.072ZM49.8027 85.5L31.6357 107.428L36.541 89.1504C41.44 84.4682 45.3882 78.8002 48.0684 72.4648L49.8027 85.5ZM53.1768 35L63.1895 50L56.5 86L50.6523 64.5713C51.5324 60.8572 52 56.9832 52 53C52 45.661 50.4184 38.6914 47.5781 32.4131L53.1768 35ZM55.5 30.5L48 27L42.4805 23.6514C42.0207 23.0183 41.5469 22.3963 41.0586 21.7861H45.5947L55.5 30.5ZM38.4795 8L58 24.5L35.3467 15.7471C29.4047 10.4246 22.1835 6.50193 14.1992 4.5H21.5L38.4795 8ZM18.5 2.5L10 3.5H9.09277C6.77581 3.17097 4.40784 3 2 3C1.74434 3 1.48913 3.00204 1.23438 3.00586L7.5 0.5L18.5 2.5Z"
                  fill="#D9D9D9"
                />
              </svg>
            </motion.div>
          </div>
        </div> */}
      </div>

      <div className="bg-4dp mt-12 p-3 border-[#404040] border-2 rounded-2xl">
        <h1>Experiences</h1>
        <h2>Internship</h2>
        <p>Internship at UTA company from 1/2025 to 5/2025</p>
      </div>
    </div>
  );
}

export default Home;
