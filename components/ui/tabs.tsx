"use client"

import { Tabs as MuiTabs, Tab as MuiTab, Box } from "@mui/material"
import React from "react"

export interface TabsProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  className?: string
}

export function Tabs({ defaultValue, value, onValueChange, children, className, ...props }: TabsProps) {
  const [tabValue, setTabValue] = React.useState(defaultValue || "")

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue)
    } else {
      setTabValue(newValue)
    }
  }

  const currentValue = value !== undefined ? value : tabValue

  return (
    <TabsContext.Provider value={{ value: currentValue }}>
      <Box className={className} {...props}>
        {children}
      </Box>
    </TabsContext.Provider>
  )
}

const TabsContext = React.createContext<{ value: string }>({ value: "" })

export interface TabsListProps {
  children: React.ReactNode
  className?: string
}

export function TabsList({ children, className, ...props }: TabsListProps) {
  const { value } = React.useContext(TabsContext)

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    // This is handled by the parent Tabs component
  }

  return (
    <MuiTabs
      value={value}
      onChange={handleChange}
      className={className}
      variant="scrollable"
      scrollButtons="auto"
      {...props}
    >
      {children}
    </MuiTabs>
  )
}

export interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  disabled?: boolean
  className?: string
}

export function TabsTrigger({ value, children, disabled, className, ...props }: TabsTriggerProps) {
  return <MuiTab value={value} label={children} disabled={disabled} className={className} {...props} />
}

export interface TabsContentProps {
  value: string
  children: React.ReactNode
  className?: string
}

export function TabsContent({ value, children, className, ...props }: TabsContentProps) {
  const { value: selectedValue } = React.useContext(TabsContext)
  const isSelected = value === selectedValue

  if (!isSelected) return null

  return (
    <Box
      role="tabpanel"
      hidden={!isSelected}
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={className}
      sx={{ mt: 2 }}
      {...props}
    >
      {children}
    </Box>
  )
}

