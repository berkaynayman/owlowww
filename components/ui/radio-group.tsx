import { RadioGroup as MuiRadioGroup, FormControl, FormLabel, FormControlLabel, Radio } from "@mui/material"
import type { RadioGroupProps as MuiRadioGroupProps } from "@mui/material"
import React from "react"

export interface RadioGroupProps extends MuiRadioGroupProps {
  label?: React.ReactNode
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(({ label, children, ...props }, ref) => {
  return (
    <FormControl ref={ref}>
      {label && <FormLabel>{label}</FormLabel>}
      <MuiRadioGroup {...props}>{children}</MuiRadioGroup>
    </FormControl>
  )
})
RadioGroup.displayName = "RadioGroup"

export interface RadioGroupItemProps {
  value: string
  label: React.ReactNode
  disabled?: boolean
  className?: string
}

export const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ value, label, disabled, className, ...props }, ref) => {
    return (
      <FormControlLabel
        value={value}
        control={<Radio ref={ref} {...props} />}
        label={label}
        disabled={disabled}
        className={className}
      />
    )
  },
)
RadioGroupItem.displayName = "RadioGroupItem"

