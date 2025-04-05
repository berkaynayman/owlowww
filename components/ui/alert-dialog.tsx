import { Dialog, DialogTitle, DialogContentText, DialogActions, Button } from "@mui/material"
import type { DialogProps } from "@mui/material"
import React from "react"

export interface AlertDialogProps extends Omit<DialogProps, "title"> {
  title?: React.ReactNode
}

export function AlertDialog({ children, title, ...props }: AlertDialogProps) {
  return <Dialog {...props}>{children}</Dialog>
}

export interface AlertDialogTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

export const AlertDialogTrigger = React.forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(
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
AlertDialogTrigger.displayName = "AlertDialogTrigger"

export interface AlertDialogContentProps {
  children: React.ReactNode
}

export function AlertDialogContent({ children }: AlertDialogContentProps) {
  return <>{children}</>
}

export interface AlertDialogHeaderProps {
  children: React.ReactNode
}

export function AlertDialogHeader({ children }: AlertDialogHeaderProps) {
  return <>{children}</>
}

export interface AlertDialogTitleProps {
  children: React.ReactNode
}

export function AlertDialogTitle({ children }: AlertDialogTitleProps) {
  return <DialogTitle>{children}</DialogTitle>
}

export interface AlertDialogDescriptionProps {
  children: React.ReactNode
}

export function AlertDialogDescription({ children }: AlertDialogDescriptionProps) {
  return <DialogContentText>{children}</DialogContentText>
}

export interface AlertDialogFooterProps {
  children: React.ReactNode
}

export function AlertDialogFooter({ children }: AlertDialogFooterProps) {
  return <DialogActions>{children}</DialogActions>
}

export interface AlertDialogActionProps {
  children: React.ReactNode
}

export function AlertDialogAction({
  children,
  ...props
}: AlertDialogActionProps & React.ComponentProps<typeof Button>) {
  return <Button {...props}>{children}</Button>
}

export interface AlertDialogCancelProps {
  children: React.ReactNode
}

export function AlertDialogCancel({
  children,
  ...props
}: AlertDialogCancelProps & React.ComponentProps<typeof Button>) {
  return (
    <Button color="inherit" {...props}>
      {children}
    </Button>
  )
}

