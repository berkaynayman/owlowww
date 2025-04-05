"use client"

import {
  Dialog as MuiDialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
} from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material"
import type { DialogProps as MuiDialogProps } from "@mui/material"
import React from "react"

export interface DialogProps extends MuiDialogProps {}

export function Dialog({ children, ...props }: DialogProps) {
  return <MuiDialog {...props}>{children}</MuiDialog>
}

export interface DialogTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

export const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ children, asChild = false, ...props }, ref) => {
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
DialogTrigger.displayName = "DialogTrigger"

export interface DialogContentProps {
  children: React.ReactNode
  className?: string
  showCloseButton?: boolean
  onClose?: () => void
}

export function DialogContent({ children, className, showCloseButton = true, onClose, ...props }: DialogContentProps) {
  return (
    <MuiDialogContent className={className} {...props}>
      {showCloseButton && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
      {children}
    </MuiDialogContent>
  )
}

export interface DialogHeaderProps {
  children: React.ReactNode
  className?: string
}

export function DialogHeader({ children, className, ...props }: DialogHeaderProps) {
  return (
    <Box className={className} sx={{ mb: 2 }} {...props}>
      {children}
    </Box>
  )
}

export interface DialogTitleProps {
  children: React.ReactNode
  className?: string
}

export function DialogTitle({ children, className, ...props }: DialogTitleProps) {
  return (
    <MuiDialogTitle className={className} {...props}>
      {children}
    </MuiDialogTitle>
  )
}

export interface DialogDescriptionProps {
  children: React.ReactNode
  className?: string
}

export function DialogDescription({ children, className, ...props }: DialogDescriptionProps) {
  return (
    <Box className={className} sx={{ color: "text.secondary", mb: 2 }} {...props}>
      {children}
    </Box>
  )
}

export interface DialogFooterProps {
  children: React.ReactNode
  className?: string
}

export function DialogFooter({ children, className, ...props }: DialogFooterProps) {
  return (
    <DialogActions className={className} {...props}>
      {children}
    </DialogActions>
  )
}

