"use client"

import { AppBar, Toolbar, Button, Menu, MenuItem, Box } from "@mui/material"
import React from "react"

export interface MenubarProps {
  children: React.ReactNode
  className?: string
}

export function Menubar({ children, className, ...props }: MenubarProps) {
  return (
    <AppBar position="static" color="default" elevation={0} className={className} {...props}>
      <Toolbar variant="dense">{children}</Toolbar>
    </AppBar>
  )
}

export interface MenubarMenuProps {
  children: React.ReactNode
  trigger: React.ReactNode
  className?: string
}

export function MenubarMenu({ children, trigger, className, ...props }: MenubarMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box className={className} {...props}>
      <Button onClick={handleClick} color="inherit" size="small">
        {trigger}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {children}
      </Menu>
    </Box>
  )
}

export interface MenubarTriggerProps {
  children: React.ReactNode
  className?: string
}

export function MenubarTrigger({ children, className, ...props }: MenubarTriggerProps) {
  return (
    <Button className={className} color="inherit" size="small" {...props}>
      {children}
    </Button>
  )
}

export interface MenubarContentProps {
  children: React.ReactNode
  className?: string
}

export function MenubarContent({ children, className, ...props }: MenubarContentProps) {
  return <>{children}</>
}

export interface MenubarItemProps {
  children: React.ReactNode
  onSelect?: () => void
  disabled?: boolean
  className?: string
}

export function MenubarItem({ children, onSelect, disabled, className, ...props }: MenubarItemProps) {
  return (
    <MenuItem onClick={onSelect} disabled={disabled} className={className} {...props}>
      {children}
    </MenuItem>
  )
}

export interface MenubarSeparatorProps {
  className?: string
}

export function MenubarSeparator({ className, ...props }: MenubarSeparatorProps) {
  return <Box component="hr" className={className} sx={{ my: 0.5, borderColor: "divider" }} {...props} />
}

