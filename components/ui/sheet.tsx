import { Drawer, Box } from "@mui/material"
import type { DrawerProps } from "@mui/material"
import React from "react"

export interface SheetProps extends Omit<DrawerProps, "anchor"> {
  side?: "top" | "right" | "bottom" | "left"
}

const Sheet = React.forwardRef<HTMLDivElement, SheetProps>(({ side = "right", ...props }, ref) => {
  return <Drawer ref={ref} anchor={side} {...props} />
})
Sheet.displayName = "Sheet"

export interface SheetContentProps {
  children: React.ReactNode
  className?: string
  side?: "top" | "right" | "bottom" | "left"
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ children, className, side = "right", ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={className}
        sx={{
          width: side === "left" || side === "right" ? 300 : "auto",
          height: side === "top" || side === "bottom" ? 300 : "auto",
          p: 2,
        }}
        {...props}
      >
        {children}
      </Box>
    )
  },
)
SheetContent.displayName = "SheetContent"

export { Sheet, SheetContent }

