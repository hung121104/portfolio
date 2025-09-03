import React, { useState } from "react";


function Home() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="mt-12 min-h-56 size-full overflow-hidden page-container">
      <div className="flex justify-between gap-2">
        <div className="flex flex-col items-start bg-4dp p-3 rounded-2xl">
          <h1 className="font-bold text-4xl">Hello,I'm Hung</h1>
          <p className="mt-4">I'm a creative software developer. I specialize in UI design and crafting engaging user experiences with great attention to detail.</p>
        </div>
        <div className="relative w-[clamp(300px,70%,450px)]">
          {!imageLoaded && (
            <div className="absolute inset-0 rounded-lg animate-pulse" />
          )}
          <img
            src="/assets/aboutMe/_NPA1230 (2).webp"
            alt="Hung - Software Developer"
            className="rounded-xl w-full"
            loading="eager"
            fetchPriority="high"
            width="450"
            height="auto"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
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
