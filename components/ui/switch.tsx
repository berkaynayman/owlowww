import { Switch as MuiSwitch, FormControlLabel } from "@mui/material"
import type { SwitchProps as MuiSwitchProps } from "@mui/material"
import React from "react"

export interface SwitchProps extends MuiSwitchProps {
  label?: React.ReactNode
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(({ label, ...props }, ref) => {
  if (label) {
    return <FormControlLabel control={<MuiSwitch ref={ref} {...props} />} label={label} />
  }
  return <MuiSwitch ref={ref} {...props} />
})
Switch.displayName = "Switch"

export { Switch }

