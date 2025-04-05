"use client"

import { ToggleButton } from "@mui/material"
import type { ToggleButtonProps } from "@mui/material"
import React from "react"

export interface ToggleProps extends Omit<ToggleButtonProps, "value" | "onChange"> {
  pressed?: boolean
  onPressedChange?: (pressed: boolean) => void
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ pressed, onPressedChange, children, ...props }, ref) => {
    const handleChange = () => {
      onPressedChange?.(!pressed)
    }

    return (
      <ToggleButton ref={ref} value="toggle" selected={pressed} onChange={handleChange} {...props}>
        {children}
      </ToggleButton>
    )
  },
)
Toggle.displayName = "Toggle"

export { Toggle }

