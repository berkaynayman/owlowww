"use client"

import { Popper, Paper, Box } from "@mui/material"
import React from "react"

export interface HoverCardProps {
  children: React.ReactNode
  className?: string
}

export function HoverCard({ children, className, ...props }: HoverCardProps) {
  return (
    <Box className={className} {...props}>
      {children}
    </Box>
  )
}

export interface HoverCardTriggerProps {
  children: React.ReactNode
  asChild?: boolean
  className?: string
}

export const HoverCardTrigger = React.forwardRef<HTMLDivElement, HoverCardTriggerProps>(
  ({ children, asChild = false, className, ...props }, ref) => {
    const [open, setOpen] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

    const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
      setOpen(true)
    }

    const handleMouseLeave = () => {
      setOpen(false)
    }

    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        ref,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        ...props,
      })
    }

    return (
      <Box ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={className} {...props}>
        {children}
        <HoverCardContext.Provider value={{ open, anchorEl }}>{children}</HoverCardContext.Provider>
      </Box>
    )
  },
)
HoverCardTrigger.displayName = "HoverCardTrigger"

const HoverCardContext = React.createContext<{
  open: boolean
  anchorEl: HTMLElement | null
}>({
  open: false,
  anchorEl: null,
})

export interface HoverCardContentProps {
  children: React.ReactNode
  className?: string
}

export const HoverCardContent = React.forwardRef<HTMLDivElement, HoverCardContentProps>(
  ({ children, className, ...props }, ref) => {
    const { open, anchorEl } = React.useContext(HoverCardContext)

    return (
      <Popper open={open} anchorEl={anchorEl} placement="bottom-start" transition>
        <Paper ref={ref} className={className} elevation={4} sx={{ p: 2 }} {...props}>
          {children}
        </Paper>
      </Popper>
    )
  },
)
HoverCardContent.displayName = "HoverCardContent"

