import { Select as MuiSelect, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material"
import type { SelectProps as MuiSelectProps } from "@mui/material"
import React from "react"

export interface SelectProps extends MuiSelectProps {
  label?: string
  helperText?: React.ReactNode
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ label, helperText, children, ...props }, ref) => {
    const id = React.useId()
    const labelId = `${id}-label`
    const helperTextId = `${id}-helper-text`

    return (
      <FormControl ref={ref} fullWidth>
        {label && <InputLabel id={labelId}>{label}</InputLabel>}
        <MuiSelect labelId={labelId} aria-describedby={helperText ? helperTextId : undefined} label={label} {...props}>
          {children}
        </MuiSelect>
        {helperText && <FormHelperText id={helperTextId}>{helperText}</FormHelperText>}
      </FormControl>
    )
  },
)
Select.displayName = "Select"

export interface SelectItemProps {
  value: string | number
  children: React.ReactNode
  disabled?: boolean
  className?: string
}

export const SelectItem = React.forwardRef<HTMLLIElement, SelectItemProps>(
  ({ value, children, disabled, className, ...props }, ref) => {
    return (
      <MenuItem ref={ref} value={value} disabled={disabled} className={className} {...props}>
        {children}
      </MenuItem>
    )
  },
)
SelectItem.displayName = "SelectItem"

