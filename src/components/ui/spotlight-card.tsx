import { useEffect, useRef, type ReactNode } from 'react';

const HUE: Record<string, { base: number; spread: number }> = {
  blue:   { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green:  { base: 120, spread: 200 },
  red:    { base: 0,   spread: 200 },
  orange: { base: 30,  spread: 120 },
};

const SIZE_CLASS: Record<string, string> = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96',
};

const GLOW_CSS = `
  [data-glow] {
    --border-size: 1.5px;
    --radius: 14;
    --spotlight-size: 300px;
  }
  [data-glow]::before,
  [data-glow]::after {
    pointer-events: none;
    content: "";
    position: absolute;
    inset: calc(var(--border-size) * -1);
    border: var(--border-size) solid transparent;
    border-radius: calc(var(--radius) * 1px);
    background-attachment: fixed;
    background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
    background-repeat: no-repeat;
    background-position: 50% 50%;
    mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
    -webkit-mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
    mask-clip: padding-box, border-box;
    -webkit-mask-clip: padding-box, border-box;
    mask-composite: intersect;
    -webkit-mask-composite: destination-in;
  }
  [data-glow]::before {
    background-image: radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(var(--hue, 30) 100% 65% / 0.90), transparent 100%
    );
    filter: brightness(2);
  }
  [data-glow]::after {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.6) calc(var(--spotlight-size) * 0.6) at
      calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(0 100% 100% / 0.70), transparent 100%
    );
  }
`;

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

let styleInjected = false;

export function GlowCard({
  children,
  className = '',
  style,
  glowColor = 'orange',
  size = 'md',
  width,
  height,
  customSize = false,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { base } = HUE[glowColor] ?? HUE.orange;

  useEffect(() => {
    if (styleInjected) return;
    styleInjected = true;
    const el = document.createElement('style');
    el.textContent = GLOW_CSS;
    document.head.appendChild(el);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onMove = (e: PointerEvent) => {
      card.style.setProperty('--x', e.clientX.toFixed(1));
      card.style.setProperty('--y', e.clientY.toFixed(1));
    };
    document.addEventListener('pointermove', onMove);
    return () => document.removeEventListener('pointermove', onMove);
  }, []);

  const sizeClass = customSize ? '' : (SIZE_CLASS[size] ?? '');

  const inlineStyle: React.CSSProperties = {
    '--hue': base,
    position: 'relative',
    overflow: 'hidden',
    ...(width  !== undefined ? { width:  typeof width  === 'number' ? `${width}px`  : width  } : {}),
    ...(height !== undefined ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
    ...style,
  } as React.CSSProperties;

  return (
    <div
      ref={cardRef}
      data-glow
      style={inlineStyle}
      className={`rounded-2xl ${sizeClass} ${className}`}
    >
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </div>
    </div>
  );
}

export { GlowCard as default };
