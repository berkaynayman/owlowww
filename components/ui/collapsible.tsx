"use client"

import { Collapse, Box } from "@mui/material"
import React from "react"

export interface CollapsibleProps {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

const CollapsibleContext = React.createContext<{
  open: boolean
  toggle: () => void
} | null>(null)

export function Collapsible({
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  children,
  className,
  ...props
}: CollapsibleProps) {
  const [open, setOpen] = React.useState(defaultOpen)

  const isControlled = openProp !== undefined
  const isOpen = isControlled ? openProp : open

  const toggle = React.useCallback(() => {
    if (isControlled) {
      onOpenChange?.(!openProp)
    } else {
      setOpen((prev) => !prev)
    }
  }, [isControlled, onOpenChange, openProp])

  return (
    <CollapsibleContext.Provider value={{ open: isOpen, toggle }}>
      <Box className={className} {...props}>
        {children}
      </Box>
    </CollapsibleContext.Provider>
  )
}

export interface CollapsibleTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

export const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ children, asChild = false, ...props }, ref) => {
    const context = React.useContext(CollapsibleContext)

    if (!context) {
      throw new Error("CollapsibleTrigger must be used within a Collapsible")
    }

    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        ref,
        onClick: (e: React.MouseEvent) => {
          ;(children as React.ReactElement).props.onClick?.(e)
          context.toggle()
        },
        ...props,
      })
    }

    return (
      <button ref={ref} onClick={context.toggle} {...props}>
        {children}
      </button>
    )
  },
)
CollapsibleTrigger.displayName = "CollapsibleTrigger"

export interface CollapsibleContentProps {
  children: React.ReactNode
  className?: string
}

export const CollapsibleContent = React.forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ children, className, ...props }, ref) => {
    const context = React.useContext(CollapsibleContext)

    if (!context) {
      throw new Error("CollapsibleContent must be used within a Collapsible")
    }

    return (
      <Collapse in={context.open}>
        <Box ref={ref} className={className} {...props}>
          {children}
        </Box>
      </Collapse>
    )
  },
)
CollapsibleContent.displayName = "CollapsibleContent"

