import { Checkbox as MuiCheckbox, FormControlLabel } from "@mui/material"
import type { CheckboxProps as MuiCheckboxProps } from "@mui/material"
import React from "react"

export interface CheckboxProps extends MuiCheckboxProps {
  label?: React.ReactNode
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(({ label, ...props }, ref) => {
  if (label) {
    return <FormControlLabel control={<MuiCheckbox ref={ref} {...props} />} label={label} />
  }
  return <MuiCheckbox ref={ref} {...props} />
})
Checkbox.displayName = "Checkbox"

export { Checkbox }

