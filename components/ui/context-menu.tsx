"use client"

import { Menu, MenuItem, Box } from "@mui/material"
import React from "react"

export interface ContextMenuProps {
  children: React.ReactNode
  className?: string
}

export function ContextMenu({ children, className, ...props }: ContextMenuProps) {
  const [anchorPosition, setAnchorPosition] = React.useState<{ top: number; left: number } | null>(null)
  const open = Boolean(anchorPosition)

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    setAnchorPosition({ top: event.clientY, left: event.clientX })
  }

  const handleClose = () => {
    setAnchorPosition(null)
  }

  return (
    <Box className={className} onContextMenu={handleContextMenu} {...props}>
      {children}
      <ContextMenuContent
        open={open}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition || undefined}
      />
    </Box>
  )
}

export interface ContextMenuTriggerProps {
  children: React.ReactNode
  className?: string
}

export function ContextMenuTrigger({ children, className, ...props }: ContextMenuTriggerProps) {
  return (
    <Box className={className} {...props}>
      {children}
    </Box>
  )
}

export interface ContextMenuContentProps {
  children?: React.ReactNode
  className?: string
  open?: boolean
  onClose?: () => void
  [key: string]: any
}

export function ContextMenuContent({ children, className, ...props }: ContextMenuContentProps) {
  return (
    <Menu className={className} MenuListProps={{ dense: true }} PaperProps={{ elevation: 3 }} {...props}>
      {children}
    </Menu>
  )
}

export interface ContextMenuItemProps {
  children: React.ReactNode
  onSelect?: () => void
  disabled?: boolean
  className?: string
}

export function ContextMenuItem({ children, onSelect, disabled, className, ...props }: ContextMenuItemProps) {
  return (
    <MenuItem onClick={onSelect} disabled={disabled} className={className} {...props}>
      {children}
    </MenuItem>
  )
}

export interface ContextMenuSeparatorProps {
  className?: string
}

export function ContextMenuSeparator({ className, ...props }: ContextMenuSeparatorProps) {
  return <Box component="hr" className={className} sx={{ my: 0.5, borderColor: "divider" }} {...props} />
}

