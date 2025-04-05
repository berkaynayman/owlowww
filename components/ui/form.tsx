"use client"

import { Box, FormControl as MuiFormControl, FormLabel as MuiFormLabel, FormHelperText } from "@mui/material"
import React from "react"

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(({ className, ...props }, ref) => {
  return <form ref={ref} className={className} {...props} />
})
Form.displayName = "Form"

export interface FormFieldProps {
  name: string
  children: React.ReactNode
}

export function FormField({ name, children }: FormFieldProps) {
  return <>{children}</>
}

export interface FormItemProps {
  children: React.ReactNode
  className?: string
}

export function FormItem({ children, className, ...props }: FormItemProps) {
  return (
    <Box className={className} sx={{ mb: 2 }} {...props}>
      {children}
    </Box>
  )
}

export interface FormLabelProps {
  children: React.ReactNode
  className?: string
}

export function FormLabel({ children, className, ...props }: FormLabelProps) {
  return (
    <MuiFormLabel className={className} {...props}>
      {children}
    </MuiFormLabel>
  )
}

export interface FormControlProps {
  children: React.ReactNode
  className?: string
}

export function FormControl({ children, className, ...props }: FormControlProps) {
  return (
    <MuiFormControl className={className} fullWidth {...props}>
      {children}
    </MuiFormControl>
  )
}

export interface FormDescriptionProps {
  children: React.ReactNode
  className?: string
}

export function FormDescription({ children, className, ...props }: FormDescriptionProps) {
  return (
    <FormHelperText className={className} {...props}>
      {children}
    </FormHelperText>
  )
}

export interface FormMessageProps {
  children?: React.ReactNode
  className?: string
}

export function FormMessage({ children, className, ...props }: FormMessageProps) {
  return (
    <FormHelperText className={className} error {...props}>
      {children}
    </FormHelperText>
  )
}

