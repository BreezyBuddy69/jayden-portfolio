import { useEffect, useRef, type ReactNode } from 'react';

const HUE: Record<string, number> = {
  blue: 220, purple: 280, green: 120, red: 0, orange: 30,
};

const SIZE_CLASS: Record<string, string> = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96',
};

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glowColor?: keyof typeof HUE;
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

export function GlowCard({
  children,
  className = '',
  style,
  glowColor = 'blue',
  size = 'md',
  width,
  height,
  customSize = false,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const hue = HUE[glowColor] ?? 220;

  useEffect(() => {
    const card = cardRef.current;
    const spot = spotRef.current;
    if (!card || !spot) return;

    const onMove = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      spot.style.background =
        `radial-gradient(280px circle at ${x}px ${y}px, hsl(${hue} 100% 65% / 0.13), transparent 80%)`;
    };

    const onLeave = () => {
      spot.style.background = 'none';
    };

    document.addEventListener('pointermove', onMove);
    card.addEventListener('pointerleave', onLeave);
    return () => {
      document.removeEventListener('pointermove', onMove);
      card.removeEventListener('pointerleave', onLeave);
    };
  }, [hue]);

  const sizeClass = customSize ? '' : (SIZE_CLASS[size] ?? '');

  const boxStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    ...(width !== undefined ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height !== undefined ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
    ...style,
  };

  return (
    <div ref={cardRef} style={boxStyle} className={`rounded-2xl ${sizeClass} ${className}`}>
      <div
        ref={spotRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          borderRadius: 'inherit',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

export { GlowCard as default };
