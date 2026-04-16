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

    const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"

    const variants = {
      default: "bg-diners-blue-sky text-white shadow hover:bg-diners-hover",
      destructive: "bg-diners-blue-sky text-white shadow-sm hover:bg-diners-hover",
      outline: "border border-diners-gray-4 bg-background shadow-sm hover:border-diners-hover hover:bg-diners-blue-sky/8 hover:text-diners-hover",
      secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-diners-hover",
      ghost: "hover:bg-diners-blue-sky/10 hover:text-diners-hover",
      link: "text-primary underline-offset-4 hover:underline",
    }

    const sizes = {
      default: "h-10 px-5 py-2",
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
