"use client"

import type React from "react"

import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Typography, IconButton } from "@mui/material"
import { Menu as MenuIcon } from "@mui/icons-material"
import type { ReactNode } from "react"

// Sidebar container
interface SidebarProps {
  children: ReactNode
  open?: boolean
  onClose?: () => void
  width?: number | string
}

export function Sidebar({ children, open = true, onClose, width = 300 }: SidebarProps) {
  return (
    <Box
      component={Drawer}
      variant="persistent"
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: width,
          boxSizing: "border-box",
          border: "none",
        },
      }}
    >
      {children}
    </Box>
  )
}

// Sidebar header
interface SidebarHeaderProps {
  children: ReactNode
}

export function SidebarHeader({ children }: SidebarHeaderProps) {
  return (
    <Box
      sx={{
        padding: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      {children}
    </Box>
  )
}

// Sidebar content
interface SidebarContentProps {
  children: ReactNode
}

export function SidebarContent({ children }: SidebarContentProps) {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        padding: 2,
      }}
    >
      {children}
    </Box>
  )
}

// Sidebar group
interface SidebarGroupProps {
  children: ReactNode
}

export function SidebarGroup({ children }: SidebarGroupProps) {
  return <Box sx={{ mb: 3 }}>{children}</Box>
}

// Sidebar group label
interface SidebarGroupLabelProps {
  children: ReactNode
}

export function SidebarGroupLabel({ children }: SidebarGroupLabelProps) {
  return (
    <Typography
      variant="overline"
      sx={{
        color: "text.secondary",
        fontWeight: "bold",
        display: "block",
        mb: 1,
      }}
    >
      {children}
    </Typography>
  )
}

// Sidebar group content
interface SidebarGroupContentProps {
  children: ReactNode
}

export function SidebarGroupContent({ children }: SidebarGroupContentProps) {
  return <Box>{children}</Box>
}

// Sidebar menu
interface SidebarMenuProps {
  children: ReactNode
}

export function SidebarMenu({ children }: SidebarMenuProps) {
  return (
    <List dense disablePadding>
      {children}
    </List>
  )
}

// Sidebar menu item
interface SidebarMenuItemProps {
  children: ReactNode
}

export function SidebarMenuItem({ children }: SidebarMenuItemProps) {
  return <ListItem disablePadding>{children}</ListItem>
}

// Sidebar menu button
interface SidebarMenuButtonProps {
  children: ReactNode
  isActive?: boolean
  onClick?: () => void
  component?: React.ElementType
  href?: string
}

export function SidebarMenuButton({ children, isActive, onClick, component, href }: SidebarMenuButtonProps) {
  return (
    <ListItemButton
      onClick={onClick}
      selected={isActive}
      component={component || "button"}
      href={href}
      sx={{
        borderRadius: 1,
        mb: 0.5,
        "&.Mui-selected": {
          bgcolor: "primary.light",
          color: "primary.main",
          "&:hover": {
            bgcolor: "primary.light",
          },
        },
      }}
    >
      <ListItemText primary={children} />
    </ListItemButton>
  )
}

// Sidebar trigger (menu button)
interface SidebarTriggerProps {
  onClick?: () => void
}

export function SidebarTrigger({ onClick }: SidebarTriggerProps) {
  return (
    <IconButton onClick={onClick} size="small">
      <MenuIcon />
    </IconButton>
  )
}

// Sidebar inset (main content area)
interface SidebarInsetProps {
  children: ReactNode
}

export function SidebarInset({ children }: SidebarInsetProps) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        transition: "all 0.3s ease-in-out",
      }}
    >
      {children}
    </Box>
  )
}

// Sidebar provider (context wrapper)
interface SidebarProviderProps {
  children: ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  return <Box sx={{ display: "flex" }}>{children}</Box>
}

// Sidebar rail (visual indicator on the side)
export function SidebarRail() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        width: 4,
        height: "100%",
        bgcolor: "divider",
      }}
    />
  )
}

