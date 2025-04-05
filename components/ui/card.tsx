import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardHeader as MuiCardHeader,
  CardActions as MuiCardActions,
} from "@mui/material"
import type { CardProps as MuiCardProps, CardContentProps as MuiCardContentProps } from "@mui/material"
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = MuiCard
const CardContent = MuiCardContent
const CardHeader = MuiCardHeader
const CardActions = MuiCardActions

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
CardDescription.displayName = "CardDescription"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
)
CardFooter.displayName = "CardFooter"

export { Card, CardContent, CardHeader, CardActions, CardTitle, CardDescription, CardFooter }
export type { MuiCardProps as CardProps, MuiCardContentProps as CardContentProps }

