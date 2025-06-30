import React from "react";
import { DynamicGridPattern } from "../components/gridBackground";

function Home() {
  return (
    <div className="page-container size-full min-h-56">
      <div className="relative w-full h-55 overflow-hidden bg-gray-800">
        <DynamicGridPattern numOfCols={50} numOfRows={65} />
      </div>
    </div>
  );
}

export default Home;
