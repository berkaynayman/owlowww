import { Alert as MuiAlert, AlertTitle } from "@mui/material"
import type { AlertProps as MuiAlertProps } from "@mui/material"
import React from "react"

export interface AlertProps extends MuiAlertProps {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert ref={ref} {...props} />
})
Alert.displayName = "Alert"

export { Alert, AlertTitle }

