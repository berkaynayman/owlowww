"use client"

import { Popover as MuiPopover, Box, Paper } from "@mui/material"
import type { PopoverProps as MuiPopoverProps } from "@mui/material"
import React from "react"

export interface PopoverProps extends Omit<MuiPopoverProps, "children"> {
  children: React.ReactNode
}

export function Popover({ children, ...props }: PopoverProps) {
  return <>{children}</>
}

export interface PopoverTriggerProps {
  children: React.ReactNode
  asChild?: boolean
  className?: string
}

const PopoverContext = React.createContext<{
  anchorEl: HTMLElement | null
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}>({
  anchorEl: null,
  setAnchorEl: () => null,
})

export const PopoverTrigger = React.forwardRef<HTMLDivElement, PopoverTriggerProps>(
  ({ children, asChild = false, className, ...props }, ref) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    }

    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        ref,
        onClick: handleClick,
        ...props,
      })
    }

    return (
      <Box ref={ref} onClick={handleClick} className={className} {...props}>
        {children}
      </Box>
    )
  },
)
PopoverTrigger.displayName = "PopoverTrigger"

export interface PopoverContentProps {
  children: React.ReactNode
  className?: string
}

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, className, ...props }, ref) => {
    const { anchorEl, setAnchorEl } = React.useContext(PopoverContext)
    const open = Boolean(anchorEl)

    const handleClose = () => {
      setAnchorEl(null)
    }

    return (
      <MuiPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Paper ref={ref} className={className} sx={{ p: 2 }} {...props}>
          {children}
        </Paper>
      </MuiPopover>
    )
  },
)
PopoverContent.displayName = "PopoverContent"

