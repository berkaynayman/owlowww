import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, Box } from "@mui/material"
import type { BreadcrumbsProps as MuiBreadcrumbsProps } from "@mui/material"
import type React from "react"

export interface BreadcrumbProps extends MuiBreadcrumbsProps {}

export function Breadcrumb({ children, ...props }: BreadcrumbProps) {
  return <MuiBreadcrumbs {...props}>{children}</MuiBreadcrumbs>
}

export interface BreadcrumbListProps {
  children: React.ReactNode
}

export function BreadcrumbList({ children }: BreadcrumbListProps) {
  return <>{children}</>
}

export interface BreadcrumbItemProps {
  children: React.ReactNode
  className?: string
}

export function BreadcrumbItem({ children, className }: BreadcrumbItemProps) {
  return <Box className={className}>{children}</Box>
}

export interface BreadcrumbLinkProps {
  children: React.ReactNode
  href: string
  className?: string
}

export function BreadcrumbLink({ children, href, className }: BreadcrumbLinkProps) {
  return (
    <Link href={href} underline="hover" color="inherit" className={className}>
      {children}
    </Link>
  )
}

export interface BreadcrumbPageProps {
  children: React.ReactNode
  className?: string
}

export function BreadcrumbPage({ children, className }: BreadcrumbPageProps) {
  return (
    <Typography color="text.primary" className={className}>
      {children}
    </Typography>
  )
}

export interface BreadcrumbSeparatorProps {
  children?: React.ReactNode
  className?: string
}

export function BreadcrumbSeparator({ children = "/", className }: BreadcrumbSeparatorProps) {
  return <Box className={className}>{children}</Box>
}

