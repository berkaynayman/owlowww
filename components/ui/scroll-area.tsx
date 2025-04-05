import { Box } from "@mui/material"
import React from "react"

export interface ScrollAreaProps {
  children: React.ReactNode
  className?: string
  viewportClassName?: string
}

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ children, className, viewportClassName, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={className}
        sx={{
          position: "relative",
          overflow: "hidden",
          height: "100%",
          width: "100%",
        }}
        {...props}
      >
        <Box
          className={viewportClassName}
          sx={{
            height: "100%",
            width: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            "&::-webkit-scrollbar": {
              width: "8px",
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "rgba(0,0,0,0.3)",
            },
          }}
        >
          {children}
        </Box>
      </Box>
    )
  },
)
ScrollArea.displayName = "ScrollArea"

export interface ScrollBarProps {
  orientation?: "vertical" | "horizontal"
  className?: string
}

export const ScrollBar = React.forwardRef<HTMLDivElement, ScrollBarProps>(
  ({ orientation = "vertical", className, ...props }, ref) => {
    return <Box ref={ref} className={className} {...props} />
  },
)
ScrollBar.displayName = "ScrollBar"

