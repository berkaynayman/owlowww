"use client"

import { Box, TextField, List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material"
import React from "react"

export interface CommandProps {
  children: React.ReactNode
  className?: string
}

export function Command({ children, className, ...props }: CommandProps) {
  return (
    <Box className={className} {...props}>
      {children}
    </Box>
  )
}

export interface CommandInputProps {
  placeholder?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}

export const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  ({ placeholder, value, onValueChange, className, ...props }, ref) => {
    return (
      <TextField
        inputRef={ref}
        fullWidth
        placeholder={placeholder}
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        className={className}
        variant="outlined"
        size="small"
        {...props}
      />
    )
  },
)
CommandInput.displayName = "CommandInput"

export interface CommandListProps {
  children: React.ReactNode
  className?: string
}

export function CommandList({ children, className, ...props }: CommandListProps) {
  return (
    <List className={className} {...props}>
      {children}
    </List>
  )
}

export interface CommandEmptyProps {
  children: React.ReactNode
  className?: string
}

export function CommandEmpty({ children, className, ...props }: CommandEmptyProps) {
  return (
    <Box className={className} sx={{ p: 2, textAlign: "center", color: "text.secondary" }} {...props}>
      {children}
    </Box>
  )
}

export interface CommandGroupProps {
  heading?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function CommandGroup({ heading, children, className, ...props }: CommandGroupProps) {
  return (
    <Box className={className} {...props}>
      {heading && <Box sx={{ p: 1, fontSize: "0.75rem", fontWeight: "bold", color: "text.secondary" }}>{heading}</Box>}
      <List dense disablePadding>
        {children}
      </List>
    </Box>
  )
}

export interface CommandItemProps {
  children: React.ReactNode
  onSelect?: () => void
  disabled?: boolean
  className?: string
}

export const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
  ({ children, onSelect, disabled, className, ...props }, ref) => {
    return (
      <ListItem disablePadding ref={ref} className={className} {...props}>
        <ListItemButton onClick={onSelect} disabled={disabled} dense>
          <ListItemText primary={children} />
        </ListItemButton>
      </ListItem>
    )
  },
)
CommandItem.displayName = "CommandItem"

export interface CommandShortcutProps {
  children: React.ReactNode
  className?: string
}

export function CommandShortcut({ children, className, ...props }: CommandShortcutProps) {
  return (
    <Box component="span" className={className} sx={{ ml: 1, color: "text.secondary", fontSize: "0.75rem" }} {...props}>
      {children}
    </Box>
  )
}

export interface CommandDialogProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

export function CommandDialog({ children, open, onOpenChange, className, ...props }: CommandDialogProps) {
  return (
    <Paper
      elevation={8}
      className={className}
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        maxWidth: 500,
        maxHeight: "85vh",
        overflow: "hidden",
        display: open ? "block" : "none",
        zIndex: 1300,
      }}
      {...props}
    >
      {children}
    </Paper>
  )
}

