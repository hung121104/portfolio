import React from "react";
import IsoGrid from "../components/isoGrid";


function Home() {
  return (
    <div className="outline-1 outline-white min-h-56 size-full overflow-hidden page-container">
      <IsoGrid/>
      <div className="flex justify-between">
        <div className="flex flex-col items-start">
          <h1 className="font-bold text-4xl">hello,I'm Hung</h1>
          <p className="mt-4">I'm a creative software developer. I specialize in UI design and crafting engaging user experiences with great attention to detail.</p>
        </div>
        <img
          src="/assets/aboutMe/_NPA1230 (2).JPG"
          alt=""
          className="w-[clamp(300px,70%,450px)]"
        />
      </div>
    </div>
  );
}

export default Home;
