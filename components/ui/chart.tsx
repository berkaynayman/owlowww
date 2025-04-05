"use client"

import type React from "react"
import { Box, useTheme } from "@mui/material"

export interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

export interface ChartContainerProps {
  children: React.ReactNode
  config: ChartConfig
  className?: string
}

export function ChartContainer({ children, config, className }: ChartContainerProps) {
  // Create CSS variables for chart colors
  const style = Object.entries(config).reduce(
    (acc, [key, value]) => {
      acc[`--color-${key}`] = value.color
      return acc
    },
    {} as Record<string, string>,
  )

  return (
    <Box className={className} sx={style}>
      {children}
    </Box>
  )
}

export interface ChartTooltipProps {
  content: React.ReactNode
}

export function ChartTooltip({ content }: ChartTooltipProps) {
  return <>{content}</>
}

export interface ChartTooltipContentProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    dataKey: string
  }>
  label?: string
}

export function ChartTooltipContent({ active, payload, label }: ChartTooltipContentProps) {
  const theme = useTheme()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        p: 1.5,
        boxShadow: theme.shadows[2],
      }}
    >
      <Box sx={{ mb: 1, fontWeight: "bold" }}>{label}</Box>
      {payload.map((entry, index) => (
        <Box key={`item-${index}`} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              backgroundColor: `var(--color-${entry.dataKey})`,
              mr: 1,
              borderRadius: "50%",
            }}
          />
          <Box sx={{ mr: 1 }}>{entry.name}:</Box>
          <Box sx={{ fontWeight: "bold" }}>{entry.value}</Box>
        </Box>
      ))}
    </Box>
  )
}

