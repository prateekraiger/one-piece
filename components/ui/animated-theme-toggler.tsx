import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun, Sparkles } from "lucide-react"
import { flushSync } from "react-dom"

import { cn } from "@/lib/utils"
// @ts-ignore
import { useGear5 } from "@/components/Gear5Context"

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Gear 5 Integration
  const { isGear5 } = useGear5()

  useEffect(() => {
    const updateTheme = () => {
      // If Gear 5 is active, we force "light" mode visually in the toggler,
      // though the actual theme might be controlled by Gear 5 styles globally.
      if (isGear5) {
        setIsDark(false)
        return
      }
      setIsDark(document.documentElement.classList.contains("dark"))
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [isGear5])

  const toggleTheme = useCallback(async () => {
    // If Gear 5 is active, the toggler might just play a sound or do a fun animation
    // instead of actually toggling the theme, since Gear 5 enforces its own theme.
    // Or we can allow it to toggle off Gear 5? No, usually theme togglers just toggle light/dark.
    // Converting to "Sun God" logic: If Gear 5 is on, clicking this might just "laugh".
    // For now, let's keep it standard but add visual flair.

    if (isGear5) return // Disable standard toggle in Gear 5 to prevent conflicts

    if (!buttonRef.current) return

    await document.startViewTransition(() => {
      flushSync(() => {
        const newTheme = !isDark
        setIsDark(newTheme)
        document.documentElement.classList.toggle("dark")
        localStorage.setItem("theme", newTheme ? "dark" : "light")
      })
    }).ready

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    )

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }, [isDark, duration, isGear5])

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        "relative rounded-full p-2 transition-all duration-500 ease-in-out hover:scale-110 active:scale-95",
        isGear5
          ? "bg-white text-sky-500 shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:shadow-[0_0_30px_rgba(56,189,248,0.8)] animate-bounce-slow"
          : "bg-transparent text-foreground hover:bg-accent",
        className
      )}
      {...props}
      title={isGear5 ? "Nika Mode Active" : "Toggle Theme"}
    >
      <div className="relative">
        {isGear5 ? (
          <div className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]">
             {/* Sun God Nika Icon Representation */}
            <Sun className="h-6 w-6 animate-[spin_10s_linear_infinite]" />
            <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-sky-400 animate-pulse" />
          </div>
        ) : (
          isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
