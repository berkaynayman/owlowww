"use client"

import { Box, List, ListItem, ListItemButton, ListItemText, Paper, Popper } from "@mui/material"
import React from "react"

export interface NavigationMenuProps {
  children: React.ReactNode
  className?: string
}

export function NavigationMenu({ children, className, ...props }: NavigationMenuProps) {
  return (
    <Box className={className} sx={{ display: "flex" }} {...props}>
      {children}
    </Box>
  )
}

export interface NavigationMenuListProps {
  children: React.ReactNode
  className?: string
}

export function NavigationMenuList({ children, className, ...props }: NavigationMenuListProps) {
  return (
    <List className={className} sx={{ display: "flex", p: 0 }} {...props}>
      {children}
    </List>
  )
}

export interface NavigationMenuItemProps {
  children: React.ReactNode
  className?: string
}

export function NavigationMenuItem({ children, className, ...props }: NavigationMenuItemProps) {
  return (
    <ListItem disablePadding className={className} {...props}>
      {children}
    </ListItem>
  )
}

export interface NavigationMenuTriggerProps {
  children: React.ReactNode
  className?: string
}

export const NavigationMenuTrigger = React.forwardRef<HTMLDivElement, NavigationMenuTriggerProps>(
  ({ children, className, ...props }, ref) => {
    const [open, setOpen] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

    const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
      setOpen(true)
    }

    const handleMouseLeave = () => {
      setOpen(false)
    }

    return (
      <Box ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={className} {...props}>
        <ListItemButton>{children}</ListItemButton>
        <NavigationMenuContext.Provider value={{ open, anchorEl }}>{children}</NavigationMenuContext.Provider>
      </Box>
    )
  },
)
NavigationMenuTrigger.displayName = "NavigationMenuTrigger"

const NavigationMenuContext = React.createContext<{
  open: boolean
  anchorEl: HTMLElement | null
}>({
  open: false,
  anchorEl: null,
})

export interface NavigationMenuContentProps {
  children: React.ReactNode
  className?: string
}

export const NavigationMenuContent = React.forwardRef<HTMLDivElement, NavigationMenuContentProps>(
  ({ children, className, ...props }, ref) => {
    const { open, anchorEl } = React.useContext(NavigationMenuContext)

    return (
      <Popper open={open} anchorEl={anchorEl} placement="bottom-start" transition>
        <Paper ref={ref} className={className} elevation={4} sx={{ p: 2 }} {...props}>
          {children}
        </Paper>
      </Popper>
    )
  },
)
NavigationMenuContent.displayName = "NavigationMenuContent"

export interface NavigationMenuLinkProps {
  children: React.ReactNode
  href?: string
  className?: string
}

export const NavigationMenuLink = React.forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
  ({ children, href, className, ...props }, ref) => {
    return (
      <ListItemButton component="a" href={href} ref={ref} className={className} {...props}>
        <ListItemText primary={children} />
      </ListItemButton>
    )
  },
)
NavigationMenuLink.displayName = "NavigationMenuLink"

