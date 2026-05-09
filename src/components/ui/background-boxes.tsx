import React from "react";

// CSS-only grid — replaces the 15,000-element motion.div version.
// Same visual: skewed orange grid pattern, zero DOM cost.
const BoxesCore = ({ className }: { className?: string }) => {
  return (
    <div
      className={className}
      style={{
        transform: 'translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) translateZ(0)',
        position: 'absolute',
        left: '25%',
        top: '-25%',
        width: '250%',
        height: '250%',
        backgroundImage: `
          linear-gradient(rgba(235,94,40,0.13) 1px, transparent 1px),
          linear-gradient(90deg, rgba(235,94,40,0.13) 1px, transparent 1px)
        `,
        backgroundSize: '64px 32px',
        pointerEvents: 'none',
      }}
    />
  );
};

export const Boxes = React.memo(BoxesCore);
