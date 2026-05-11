import React, { memo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const COLORS = [
  "rgba(139,92,246, 0.92)",
  "rgba(139,92,246, 0.70)",
  "rgba(255, 130, 60, 0.82)",
  "rgba(255, 160, 80, 0.72)",
  "rgba(109,40,217, 0.88)",
  "rgba(255, 200, 90, 0.62)",
  "rgba(139,92,246, 0.52)",
  "rgba(180, 55, 18, 0.78)",
  "rgba(255, 145, 50, 0.68)",
];

const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

// Each cell is memoized — only re-renders when hovered
const GridCell = memo(function GridCell({ showPlus }: { showPlus: boolean }) {
  return (
    <motion.div
      whileHover={{ backgroundColor: getRandomColor(), transition: { duration: 0 } }}
      className="w-16 h-8 border-r border-t relative"
      style={{ borderColor: "rgba(139,92,246,0.13)" }}
    >
      {showPlus && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="absolute h-6 w-10 -top-[14px] -left-[22px] pointer-events-none"
          style={{ color: "rgba(139,92,246,0.18)", strokeWidth: "1px" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
      )}
    </motion.div>
  );
});

// 80 cols × 90 rows = 7200 cells — enough to cover 1440p+ after skew/scale
const OUTER = 80;
const INNER = 90;

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  return (
    <div
      style={{
        transform: `translate(-45%,-55%) skewX(-48deg) skewY(14deg) scale(0.675) translateZ(0)`,
      }}
      className={cn(
        "absolute left-0 top-0 flex p-4 z-0",
        className
      )}
      {...rest}
    >
      {Array.from({ length: OUTER }, (_, i) => (
        <div
          key={i}
          className="w-16 h-8 border-l relative"
          style={{ borderColor: "rgba(139,92,246,0.13)" }}
        >
          {Array.from({ length: INNER }, (_, j) => (
            <GridCell key={j} showPlus={j % 2 === 0 && i % 2 === 0} />
          ))}
        </div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
