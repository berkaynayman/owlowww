import { TextField } from "@mui/material"
import type { TextFieldProps } from "@mui/material"
import React from "react"

export interface InputProps extends Omit<TextFieldProps, "variant"> {
  variant?: "outlined" | "filled" | "standard"
}

const Input = React.forwardRef<HTMLDivElement, InputProps>(({ variant = "outlined", ...props }, ref) => {
  return <TextField ref={ref} variant={variant} {...props} />
})
Input.displayName = "Input"

export { Input }

