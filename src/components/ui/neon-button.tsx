import React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const ORANGE = '#eb5e28'

const buttonVariants = cva(
  'relative group border text-white mx-auto text-center rounded-full font-medium tracking-wide cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-[rgba(235,94,40,0.10)] hover:bg-[rgba(235,94,40,0.18)] border-[rgba(235,94,40,0.45)] hover:border-[rgba(235,94,40,0.80)]',
        solid: 'bg-[#eb5e28] hover:bg-[#d4521f] border-transparent text-white',
        ghost: 'border-[rgba(255,255,255,0.18)] bg-transparent hover:border-[rgba(255,255,255,0.38)] hover:bg-[rgba(255,255,255,0.06)]',
      },
      size: {
        default: 'px-7 py-[14px] text-[12px]',
        sm: 'px-5 py-[10px] text-[11px]',
        lg: 'px-10 py-[18px] text-[13px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface NeonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  neon?: boolean
  asChild?: boolean
}

const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, neon = true, size, variant, children, style, ...props }, ref) => {
    const isDefault = !variant || variant === 'default'
    const isGhost = variant === 'ghost'

    const boxShadow = isDefault
      ? '0 0 14px rgba(235,94,40,0.15), inset 0 1px 0 rgba(255,120,60,0.12)'
      : undefined

    return (
      <button
        className={cn(
          buttonVariants({ variant, size }),
          'transition-all duration-300',
          'hover:[box-shadow:0_0_32px_rgba(235,94,40,0.35),inset_0_1px_0_rgba(255,120,60,0.22)]',
          'uppercase letter-spacing-[0.14em]',
          className
        )}
        style={{
          letterSpacing: '0.14em',
          boxShadow: isDefault ? boxShadow : undefined,
          ...style,
        }}
        ref={ref}
        {...props}
      >
        {/* Top shimmer line */}
        <span
          className={cn(
            'absolute top-0 left-6 right-6 h-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500',
            'bg-gradient-to-r from-transparent to-transparent',
            neon && (isGhost ? 'hidden' : 'block')
          )}
          style={{
            background: `linear-gradient(90deg, transparent, ${ORANGE}88, transparent)`,
          }}
        />

        {children}

        {/* Bottom shimmer line */}
        <span
          className={cn(
            'absolute inset-x-6 h-px -bottom-px pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-500',
            neon && (isGhost ? 'hidden' : 'block')
          )}
          style={{
            background: `linear-gradient(90deg, transparent, ${ORANGE}CC, transparent)`,
          }}
        />
      </button>
    )
  }
)

NeonButton.displayName = 'NeonButton'

export { NeonButton, buttonVariants }
