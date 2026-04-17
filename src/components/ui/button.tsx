import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition duration-300 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20 disabled:pointer-events-none disabled:opacity-50 motion-safe:hover:-translate-y-0.5 font-sans [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"

    const variants = {
      default: "bg-diners-blue-sky text-white shadow-[0_14px_30px_rgba(0,163,224,0.22)] hover:bg-diners-hover hover:shadow-[0_18px_36px_rgba(0,108,115,0.28)]",
      destructive: "bg-diners-blue-sky text-white shadow-[0_14px_30px_rgba(0,163,224,0.22)] hover:bg-diners-hover",
      outline: "border border-diners-blue-sky bg-white text-diners-blue-sky shadow-sm hover:border-diners-hover hover:bg-diners-hover hover:text-white",
      secondary: "bg-diners-blue-sky text-white shadow-[0_14px_30px_rgba(0,163,224,0.18)] hover:bg-diners-hover",
      ghost: "text-diners-blue-sky hover:bg-diners-blue-sky/10 hover:text-diners-hover",
      link: "text-diners-blue-sky underline-offset-4 hover:text-diners-hover hover:underline",
    }

    const sizes = {
      default: "h-11 px-5 py-2",
      sm: "h-9 px-4 text-xs",
      lg: "h-12 px-8",
      icon: "h-9 w-9",
    }

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ""}`

    return (
      <Comp
        className={combinedClassName}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
