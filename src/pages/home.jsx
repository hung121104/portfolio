import React, { useState } from "react";
import GlossyCard from "../components/tiltCard";

function Home() {
  return (
    <div className="mt-12 min-h-56 size-full page-container">
      <div className="flex justify-between gap-2">
        <div className="flex flex-col items-start bg-4dp p-3 rounded-2xl">
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
        {/* <div className="flex-shrink-0">          
          <img
            src="/assets/aboutMe/_NPA1230 (2)compress.webp"
            alt="Hung - Software Developer"
            className="rounded-xl w-[400px] object-cover"
            width="400"
            loading="eager" // Fix Load Delay
            fetchPriority="high" // Fix Load Delay
            decoding="async" // Fix Render Delay
          />
        </div> */}
      </div>

      <div>
        <h1>Experiences</h1>
        <h2>Internship</h2>
        <p>Internship at UTA company from 1/2025 to 5/2025</p>
      </div>
    </div>
  );
}

export default Home;
