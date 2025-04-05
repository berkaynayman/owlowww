import { FormLabel } from "@mui/material"
import type { FormLabelProps } from "@mui/material"
import React from "react"

export interface LabelProps extends FormLabelProps {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ children, ...props }, ref) => {
  return (
    <FormLabel ref={ref} {...props}>
      {children}
    </FormLabel>
  )
})
Label.displayName = "Label"

export { Label }

