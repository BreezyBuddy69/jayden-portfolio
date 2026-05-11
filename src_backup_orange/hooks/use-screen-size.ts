import { useEffect, useState } from "react"

const SCREEN_SIZES = ["xs", "sm", "md", "lg", "xl", "2xl"] as const
export type ScreenSize = (typeof SCREEN_SIZES)[number]

const sizeOrder: Record<ScreenSize, number> = {
  xs: 0, sm: 1, md: 2, lg: 3, xl: 4, "2xl": 5,
}

export interface ComparableScreenSize {
  value: ScreenSize
  lessThan(other: ScreenSize): boolean
  greaterThan(other: ScreenSize): boolean
  lessThanOrEqual(other: ScreenSize): boolean
  greaterThanOrEqual(other: ScreenSize): boolean
  equals(other: ScreenSize): boolean
}

function makeComparable(value: ScreenSize): ComparableScreenSize {
  const order = sizeOrder[value]
  return {
    value,
    lessThan: (o) => order < sizeOrder[o],
    greaterThan: (o) => order > sizeOrder[o],
    lessThanOrEqual: (o) => order <= sizeOrder[o],
    greaterThanOrEqual: (o) => order >= sizeOrder[o],
    equals: (o) => value === o,
  }
}

const useScreenSize = (): ComparableScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>("xs")

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      if (w >= 1536) setScreenSize("2xl")
      else if (w >= 1280) setScreenSize("xl")
      else if (w >= 1024) setScreenSize("lg")
      else if (w >= 768) setScreenSize("md")
      else if (w >= 640) setScreenSize("sm")
      else setScreenSize("xs")
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return makeComparable(screenSize)
}

export { useScreenSize }
