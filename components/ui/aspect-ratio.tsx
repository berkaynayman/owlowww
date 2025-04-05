import { Box } from "@mui/material"
import type React from "react"

export interface AspectRatioProps {
  ratio?: number
  children: React.ReactNode
  className?: string
}

export function AspectRatio({ ratio = 1, children, className, ...props }: AspectRatioProps) {
  return (
    <Box
      className={className}
      sx={{
        position: "relative",
        width: "100%",
        "&::before": {
          content: '""',
          display: "block",
          height: 0,
          paddingBottom: `${(1 / ratio) * 100}%`,
        },
        "& > *": {
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        },
        "& > img, & > video": {
          objectFit: "cover",
        },
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

