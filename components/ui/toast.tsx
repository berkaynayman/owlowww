"use client"

import { Snackbar, Alert, Box } from "@mui/material"
import type React from "react"

export interface ToastProps {
  open: boolean
  onClose: () => void
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  variant?: "default" | "success" | "error" | "warning" | "info"
  duration?: number
  className?: string
}

export function Toast({
  open,
  onClose,
  title,
  description,
  action,
  variant = "default",
  duration = 5000,
  className,
  ...props
}: ToastProps) {
  const severity = variant === "default" ? undefined : variant

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      className={className}
      {...props}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }} action={action}>
        {title && <Box sx={{ fontWeight: "bold", mb: 0.5 }}>{title}</Box>}
        {description}
      </Alert>
    </Snackbar>
  )
}

export interface ToastActionProps {
  children: React.ReactNode
  altText: string
  className?: string
}

export function ToastAction({ children, altText, className, ...props }: ToastActionProps) {
  return (
    <Box className={className} {...props}>
      {children}
    </Box>
  )
}

export interface ToastProviderProps {
  children: React.ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  return <>{children}</>
}

