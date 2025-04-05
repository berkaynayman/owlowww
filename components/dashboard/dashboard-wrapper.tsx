"use client"

import type { ReactNode } from "react"
import { Box } from "@mui/material"
import DashboardSidebar from "@/components/dashboard/sidebar"
import DashboardToolbar from "@/components/dashboard/toolbar"

export default function DashboardWrapper({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main content area - takes up all remaining space */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%", md: "calc(100% - 300px)" },
          transition: "all 0.3s ease-in-out",
        }}
      >
        {/* Toolbar */}
        <DashboardToolbar />

        {/* Content - fills remaining vertical space */}
        <Box
          sx={{
            flexGrow: 1,
            p: 2.5,
            bgcolor: "#F5F5F7",
            overflow: "auto",
          }}
          className="dark:bg-gray-800 dark:text-white transition-colors duration-200"
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

