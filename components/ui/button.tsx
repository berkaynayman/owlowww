import { Button as MuiButton } from "@mui/material"
import type { ButtonProps as MuiButtonProps } from "@mui/material"
import React from "react"

export interface ButtonProps extends MuiButtonProps {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ asChild = false, children, ...props }, ref) => {
  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      ...props,
      ref,
    })
  }
  return (
    <MuiButton ref={ref} {...props}>
      {children}
    </MuiButton>
  )
})
Button.displayName = "Button"

export { Button }

