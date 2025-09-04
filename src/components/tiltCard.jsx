import React, { useRef, useCallback } from "react";
import "../styles/card.css";

const GlossyCard = ({
  src,
  alt = "Tilt Card Image",
  width = 400,
  height = 600,
  padding = 16,
}) => {
  const cardRef = useRef(null);
  const glossRef = useRef(null);
  const rafRef = useRef(null);

  const updateTilt = useCallback((clientX, clientY) => {
    const card = cardRef.current;
    const gloss = glossRef.current;
    if (!card || !gloss) return;

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
    card.style.setProperty("--mouse-x", clampedX);
    card.style.setProperty("--mouse-y", clampedY);

    // Calculate gloss opacity based on distance from center (max 0.6)
    const glossOpacity = Math.min(
      0.6,
      Math.abs(clampedX) * 0.4 + Math.abs(clampedY) * 0.4
    );

    // Apply gloss effect: opacity and position based on tilt direction
    gloss.style.opacity = glossOpacity;
    gloss.style.transform = `translate3d(${clampedX * -50}%, ${
      clampedY * -50
    }%, 0) scale(2)`;
  }, []);

  /**
   * Resets the card to its original position (no tilt, no gloss)
   */
  const resetTilt = useCallback(() => {
    const card = cardRef.current;
    const gloss = glossRef.current;
    if (!card || !gloss) return;

    // Reset tilt values to 0 (center position)
    card.style.setProperty("--mouse-x", 0);
    card.style.setProperty("--mouse-y", 0);

    // Hide gloss effect and reset its position
    gloss.style.opacity = "0";
    gloss.style.transform = "translate3d(0%, 0%, 0) scale(2)";
  }, []);

  /**
   * Handles mouse movement over the card (desktop interaction)
   * @param {MouseEvent} e - Mouse event object
   */
  const handleMouseMove = useCallback(
    (e) => {
      // Cancel any pending animation frame to avoid stacking
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Schedule update for next frame for smooth 60fps animation
      rafRef.current = requestAnimationFrame(() => {
        updateTilt(e.clientX, e.clientY);
      });
    },
    [updateTilt]
  );

  /**
   * Handles mouse leaving the card area (desktop interaction)
   */
  const handleMouseLeave = useCallback(() => {
    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Reset card to original state
    resetTilt();
  }, [resetTilt]);

  /**
   * Handles initial touch on the card (mobile interaction)
   * @param {TouchEvent} e - Touch event object
   */
  const handleTouchStart = useCallback(
    (e) => {
      e.preventDefault(); // Prevent scrolling

      // Get the first touch point coordinates
      const touch = e.touches[0];
      if (touch) {
        updateTilt(touch.clientX, touch.clientY);
      }
    },
    [updateTilt]
  );

  /**
   * Handles touch movement across the card (mobile drag interaction)
   * @param {TouchEvent} e - Touch event object
   */
  const handleTouchMove = useCallback(
    (e) => {
      e.preventDefault(); // Prevent scrolling

      // Cancel any pending animation frame to avoid stacking
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Schedule update for next frame for smooth animation
      rafRef.current = requestAnimationFrame(() => {
        // Get current touch position
        const touch = e.touches[0];
        if (touch) {
          updateTilt(touch.clientX, touch.clientY);
        }
      });
    },
    [updateTilt]
  );

  /**
   * Handles touch end/cancel events (mobile interaction complete)
   * @param {TouchEvent} e - Touch event object
   */
  const handleTouchEnd = useCallback(
    (e) => {
      e.preventDefault(); // Prevent any default touch behavior

      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      // Reset card to original state
      resetTilt();
    },
    [resetTilt]
  );

  return (
    <div
      className="flex justify-center items-center"
      style={{
        perspective: "1000px",
        width: `${width + padding}px`,
        height: `${height + padding}px`,
      }}
    >
      <div
        id="card"
        ref={cardRef}
        // Mouse events
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        // Touch events
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="relative shadow-lg rounded-xl overflow-hidden transition-all backface-hidden cursor-pointer select-none will-change-transform"
        style={{
          width: `${width - padding}px`,
          height: `${height - padding}px`,
          touchAction: "none", // Prevent default touch behaviors
          transition: "all 0.2s ease", // using inline to avoid tailwind slow render
          transformStyle: "preserve-3d",
          transform: `rotateX(calc(var(--mouse-y, 0) * -15deg)) rotateY(calc(var(--mouse-x, 0) * 15deg))`,
        }}
      >
        <img
          src={src}
          alt={alt}
          className="block rounded-xl w-full h-full object-cover pointer-events-none select-none"
          style={{
            WebkitUserDrag: "none",
            userDrag: "none",
          }}
          draggable={false}
        />
        <div
          ref={glossRef}
          className="top-0 left-0 absolute opacity-0 rounded-full w-full h-full pointer-events-none will-change-[transform,opacity]"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0) 70%)",
            transition: "0.1s ease-out",
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
};

export default GlossyCard;
