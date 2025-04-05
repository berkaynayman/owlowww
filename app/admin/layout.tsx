"use client"

import type React from "react"

import { useState } from "react"
import { Box } from "@mui/material"
import AdminSidebar from "@/components/admin/sidebar"
import AdminToolbar from "@/components/admin/toolbar"
import { ThemeProvider } from "@/contexts/theme-context"
import { LanguageProvider } from "@/contexts/language-context"
import { AuthProvider } from "@/contexts/AuthContext"
import LoadingSpinner from "@/components/loading-spinner"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          {loading ? (
            <LoadingSpinner message="Preparing admin dashboard..." />
          ) : (
            <Box sx={{ display: "flex", minHeight: "100vh" }}>
              {/* Sidebar */}
              <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

              {/* Main content area */}
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  width: { xs: "100%", md: sidebarOpen ? "calc(100% - 300px)" : "100%" },
                  transition: "all 0.3s ease-in-out",
                }}
              >
                {/* Toolbar */}
                <AdminToolbar onMenuClick={toggleSidebar} />

                {/* Content */}
                <Box
                  sx={{
                    flexGrow: 1,
                    p: { xs: 1.5, md: 2.5 },
                    overflow: "auto",
                    backgroundColor: "#F5F5F7",
                  }}
                  className="text-black dark:text-white dark:bg-gray-800 transition-colors duration-200"
                >
                  {children}
                </Box>
              </Box>
            </Box>
          )}
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

