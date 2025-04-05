"use client"

import { Menu, MenuItem, Button } from "@mui/material"
import type { MenuProps, MenuItemProps, ButtonProps } from "@mui/material"
import React from "react"

export interface DropdownMenuProps {
  children: React.ReactNode
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  return <>{children}</>
}

export interface DropdownMenuTriggerProps extends ButtonProps {
  asChild?: boolean
}

export const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ asChild = false, children, ...props }, ref) => {
    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        ref,
        ...props,
      })
    }
    return (
      <Button ref={ref} {...props}>
        {children}
      </Button>
    )
  },
)
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

export interface DropdownMenuContentProps extends Omit<MenuProps, "open"> {
  align?: "start" | "center" | "end"
  className?: string
}

export const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ children, align = "center", className, ...props }, ref) => {
    return (
      <Menu
        anchorOrigin={{
          vertical: "bottom",
          horizontal: align === "start" ? "left" : align === "end" ? "right" : "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: align === "start" ? "left" : align === "end" ? "right" : "center",
        }}
        {...props}
      >
        {children}
      </Menu>
    )
  },
)
DropdownMenuContent.displayName = "DropdownMenuContent"

export interface DropdownMenuItemProps extends MenuItemProps {
  onSelect?: () => void
}

export const DropdownMenuItem = React.forwardRef<HTMLLIElement, DropdownMenuItemProps>(
  ({ onSelect, ...props }, ref) => {
    return <MenuItem ref={ref} onClick={onSelect} {...props} />
  },
)
DropdownMenuItem.displayName = "DropdownMenuItem"

