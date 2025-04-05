import { Tooltip as MuiTooltip, type TooltipProps as MuiTooltipProps } from "@mui/material"
import React from "react"

export interface TooltipProps extends MuiTooltipProps {}

const Tooltip = ({ children, ...props }: TooltipProps) => {
  return <MuiTooltip {...props}>{children}</MuiTooltip>
}

export interface TooltipProviderProps {
  children: React.ReactNode
  delayDuration?: number
}

const TooltipProvider = ({ children, delayDuration }: TooltipProviderProps) => {
  return <>{children}</>
}

export interface TooltipTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

const TooltipTrigger = React.forwardRef<HTMLElement, TooltipTriggerProps>(
  ({ children, asChild = false, ...props }, ref) => {
    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        ref,
        ...props,
      })
    }
    return React.cloneElement(children as React.ReactElement, {
      ref,
      ...props,
    })
  },
)
TooltipTrigger.displayName = "TooltipTrigger"

export interface TooltipContentProps {
  children: React.ReactNode
  className?: string
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  hidden?: boolean
}

const TooltipContent = ({ children, side = "top", align = "center", ...props }: TooltipContentProps) => {
  return <>{children}</>
}

export { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent }

