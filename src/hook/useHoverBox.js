import { useState } from "react";

export default function useHoverBox() {
  const [box, setBox] = useState(null);

  const handleEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect =
      e.currentTarget.parentElement.getBoundingClientRect();

    setBox({
      top: rect.top - parentRect.top,
      left: rect.left - parentRect.left,
      width: rect.width,
      height: rect.height,
    });
  };

  const handleLeave = () => setBox(null);

  return { box, handleEnter, handleLeave };
}
