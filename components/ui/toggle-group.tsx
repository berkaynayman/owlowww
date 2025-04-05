"use client"

import { ToggleButtonGroup, ToggleButton } from "@mui/material"
import type { ToggleButtonGroupProps } from "@mui/material"
import React from "react"

export interface ToggleGroupProps extends Omit<ToggleButtonGroupProps, "value" | "onChange"> {
  value?: string
  onValueChange?: (value: string) => void
  type?: "single" | "multiple"
}

export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ value, onValueChange, type = "single", children, ...props }, ref) => {
    const handleChange = (_: React.MouseEvent<HTMLElement>, newValue: string | null) => {
      if (type === "single") {
        onValueChange?.(newValue || "")
      }
    }

    return (
      <ToggleButtonGroup ref={ref} value={value} onChange={handleChange} exclusive={type === "single"} {...props}>
        {children}
      </ToggleButtonGroup>
    )
  },
)
ToggleGroup.displayName = "ToggleGroup"

export interface ToggleGroupItemProps {
  value: string
  children: React.ReactNode
  disabled?: boolean
  className?: string
}

export const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ value, children, disabled, className, ...props }, ref) => {
    return (
      <ToggleButton ref={ref} value={value} disabled={disabled} className={className} {...props}>
        {children}
      </ToggleButton>
    )
  },
)
ToggleGroupItem.displayName = "ToggleGroupItem"

