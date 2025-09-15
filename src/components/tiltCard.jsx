import React, { useRef, useCallback } from "react";
import "../styles/card.css";
import { main } from "framer-motion/client";

const GlossyCard = ({
  srcBG,
  srcMain,
  srcIcon,
  alt = "Tilt Card Image",
  width = 400,
  height = 600,
  padding = 16,
}) => {
  const cardRef = useRef(null);
  const glossRef = useRef(null);
  const holoRef = useRef(null);
  const rafRef = useRef(null);

  const updateTilt = useCallback((clientX, clientY) => {
    const card = cardRef.current;
    const gloss = glossRef.current;
    const holo = holoRef.current;
    if (!card || !gloss || !holo) return; // <- ensure holo exists

    // ensure fast interactive transition while moving
    card.style.setProperty(
      "--card-transition",
      "transform 160ms cubic-bezier(0.22,1,0.36,1)"
    );
    gloss.style.setProperty(
      "--gloss-transition",
      "opacity 220ms cubic-bezier(0.22,1,0.36,1), transform 220ms cubic-bezier(0.22,1,0.36,1)"
    );
    card.style.setProperty("--card-opacity", "1");

    // Get card's position and dimensions on screen
    const cardRect = card.getBoundingClientRect();

    // Calculate the center point of the card
    const centerX = cardRect.left + cardRect.width / 2;
    const centerY = cardRect.top + cardRect.height / 2;

    // Calculate distance from center as percentage (-1 to 1)
    const deltaX = (clientX - centerX) / (cardRect.width / 2);
    const deltaY = (clientY - centerY) / (cardRect.height / 2);

    // Clamp values to prevent extreme rotation
    const clampedX = Math.max(-1, Math.min(1, deltaX));
    const clampedY = Math.max(-1, Math.min(1, deltaY));

    // Update CSS custom properties for smooth tilt animation
    card.style.setProperty("--mouse-x", -clampedX);
    card.style.setProperty("--mouse-y", -clampedY);

    // Calculate gloss opacity based on distance from center (max 0.6)
    const glossOpacity = Math.min(
      0.6,
      Math.abs(clampedX) * 0.4 + Math.abs(clampedY) * 0.4
    );

    // Apply gloss effect: opacity and position based on tilt direction
    gloss.style.opacity = glossOpacity;

    // while dragging/moving we don't want the holo to animate (snappy)
    // remove any transition so transforms apply immediately
    holo.style.transition = "none";

    gloss.style.transform = `translate3d(${clampedX * 50}%, ${
      clampedY * 50
    }%, 0) scale(2)`;
    holo.style.transform = `translate3d(${clampedX * 50}%, ${
      clampedY * 50
    }%, 0) scale(2)`;
  }, []);

  const resetTilt = useCallback(() => {
    const card = cardRef.current;
    const gloss = glossRef.current;
    const holo = holoRef.current;
    if (!card || !gloss) return;

    // slower, smooth snap-back
    card.style.setProperty(
      "--card-transition",
      "transform 600ms cubic-bezier(0.22,1,0.36,1)"
    );
    gloss.style.setProperty(
      "--gloss-transition",
      "opacity 520ms cubic-bezier(0.22,1,0.36,1), transform 520ms cubic-bezier(0.22,1,0.36,1)"
    );
    card.style.setProperty("--card-opacity", "0");

    card.style.setProperty("--mouse-x", 0);
    card.style.setProperty("--mouse-y", 0);

    gloss.style.opacity = "0";
    gloss.style.transform = "translate3d(0%, 0%, 0) scale(2)";

    // reset holo with an animated transition
    if (holo) {
      // set a transition so the holo eases back to its resting state
      holo.style.transition =
        "transform 600ms cubic-bezier(0.22,1,0.36,1), filter 600ms cubic-bezier(0.22,1,0.36,1)";
      // animate transform back to identity
      holo.style.transform = "translate3d(0%, 0%, 0) scale(1)";
      // if you previously set filters on holo, animate them back to neutral
      holo.style.filter = "";
      // optional: clear transition after it's done to avoid interfering with next interaction
      setTimeout(() => {
        if (holo) holo.style.transition = "none";
      }, 620);
    }
  }, []);

  // --- pointer-based handlers (replace separate mouse/touch handlers) ---
  const handlePointerMove = useCallback(
    (e) => {
      // cancel any pending frame
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const { clientX, clientY } = e;
      rafRef.current = requestAnimationFrame(() =>
        updateTilt(clientX, clientY)
      );
    },
    [updateTilt]
  );

  const handlePointerLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    resetTilt();
  }, [resetTilt]);

  const handlePointerDown = useCallback((e) => {
    const card = cardRef.current;
    try {
      if (card && typeof card.setPointerCapture === "function")
        card.setPointerCapture(e.pointerId);
    } catch (err) {
      // ignore (older browsers)
    }
  }, []);

  const handlePointerUp = useCallback(
    (e) => {
      const card = cardRef.current;
      try {
        if (
          card &&
          typeof card.releasePointerCapture === "function" &&
          card.hasPointerCapture?.(e.pointerId)
        ) {
          card.releasePointerCapture(e.pointerId);
        }
      } catch (err) {
        // ignore
      }
      // finalize on pointer up
      resetTilt();
    },
    [resetTilt]
  );
  // --- end pointer handlers ---

  return (
    <div
      className="flex justify-center items-center perspective-distant"
      style={{
        width: `${width + padding}px`,
        height: `${height + padding}px`,
      }}
    >
      <div
        id="card"
        ref={cardRef}
        // pointer events replace mouse + touch handlers
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerLeave}
        className="relative shadow-lg border-1 border-primary rounded-xl overflow-hidden perspective-distant transition-all backface-hidden cursor-pointer select-none will-change-transform"
        style={{
          /* keep sizing and touch action here, move transition & transform to CSS vars */
          width: `${width - padding}px`,
          height: `${height - padding}px`,
          touchAction: "none", // Prevent default touch behaviors
        }}
      >
        <img
          src={srcBG}
          alt={alt}
          className="top-0 left-0 absolute rounded-xl w-full object-cover pointer-events-none select-none no-drag"
          draggable={false}
        />

        <div
          className="relative opacity-20 w-full h-full overflow-hidden perspective-distant pointer-events-none holographic no-drag"
          style={{
            transform: `rotateX(calc(var(--mouse-y, 0) * -16deg)) rotateY(calc(var(--mouse-x, 0) * 16deg)) translateZ(-100px) scale(1.7)`,
            /* only set this when srcIcon is dynamic; if undefined, CSS fallback is used */
            ...(srcIcon ? { "--holo-mask": `url(${srcIcon})` } : {}),
          }}
        >
          <img
            ref={holoRef}
            src={"/assets/aboutMe/holographic.webp"}
            alt={alt}
            className="top-0 left-0 z-1 absolute rounded-xl w-full h-full object-cover pointer-events-none select-none no-drag"
            draggable={false}
          />
        </div>

        <img
          src={srcMain}
          alt={alt}
          className="block top-0 left-0 z-3 absolute rounded-xl w-full h-full object-cover pointer-events-none select-none z3 no-drag"
          draggable={false}
        />
        <div
          ref={glossRef}
          className="top-0 left-0 z-4 absolute opacity-0 rounded-full w-full h-full pointer-events-none gloss"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0) 70%)",
            transition: "0.1s ease-out", // small fallback, JS will update --gloss-transition
          }}
        />
      </div>
    </div>
  );
};

export default GlossyCard;
