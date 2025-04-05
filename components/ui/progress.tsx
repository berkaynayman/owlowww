import { LinearProgress, Box, Typography } from "@mui/material"
import type { LinearProgressProps } from "@mui/material"
import React from "react"

export interface ProgressProps extends LinearProgressProps {
  value?: number
  showValue?: boolean
  max?: number
  className?: string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value = 0, showValue = false, max = 100, className, ...props }, ref) => {
    const normalizedValue = Math.min(Math.max(0, value), max)
    const percentage = (normalizedValue / max) * 100

    return (
      <Box ref={ref} className={className} sx={{ width: "100%", position: "relative" }}>
        <LinearProgress variant="determinate" value={percentage} {...props} />
        {showValue && (
          <Typography variant="body2" color="text.secondary" sx={{ position: "absolute", right: 0, top: -20 }}>
            {Math.round(percentage)}%
          </Typography>
        )}
      </Box>
    )
  },
)
Progress.displayName = "Progress"

export { Progress }

