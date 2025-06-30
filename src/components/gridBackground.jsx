import React from "react";
import PropTypes from "prop-types";
import { cn } from "../lib/utils";

/**
 * DynamicGridPattern renders a customizable grid of divs.
 * @param {number} numOfRows - Number of rows in the grid.
 * @param {number} numOfCols - Number of columns in the grid.
 * @param {string} className - Additional class names for grid cells.
 */
export function DynamicGridPattern({ numOfRows = 25, numOfCols = 25, className = "" }) {
  // Generate arrays for rows and columns
  const rows = Array.from({ length: numOfRows });
  const cols = Array.from({ length: numOfCols });

  return (
    <div
    style={{
      transform: `skewX(-48deg) skewY(14deg) scale(0.675) `
    }}
      className="absolute left-1/2 top-0 flex -translate-x-1/3 translate-y-1 p-4"
      aria-hidden="true"
    >
      {rows.map((_, rowIdx) => (
        <div key={rowIdx} className="relative h-8 w-16 border-l border-gray-900">
          {cols.map((_, colIdx) => (
            <div
              key={colIdx}
              className={cn(
                "bg-squared hover:-translate-x-6 hover:-translate-y-3 hover:bg-squared-hover relative h-8 w-16 border-r border-t border-gray-700 transition-all duration-1000 hover:duration-0",
                className
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

DynamicGridPattern.propTypes = {
  numOfRows: PropTypes.number,
  numOfCols: PropTypes.number,
  className: PropTypes.string,
};
