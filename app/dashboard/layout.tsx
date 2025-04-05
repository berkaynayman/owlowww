"use client"

import type {ReactNode} from "react"
import {useEffect, useState} from "react"
import {ThemeProvider, useTheme} from "@/contexts/theme-context"
import {LanguageProvider} from "@/contexts/language-context"
import DashboardSidebar from "@/components/dashboard/sidebar"
import DashboardToolbar from "@/components/dashboard/toolbar"
import LoadingSpinner from "@/components/loading-spinner"
import {useMobile} from "@/hooks/use-mobile"
import {Box} from "@mui/material"
import {AuthProvider} from "@/contexts/AuthContext";

export default function DashboardLayout({children}: { children: ReactNode }) {
    const [loading, setLoading] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)

   /* useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, []) */

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    return (
        <ThemeProvider>
            <LanguageProvider>
                <AuthProvider>
                    {loading ? (
                        <LoadingSpinner message="Preparing your dashboard..."/>
                    ) : (
                        <DashboardContent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}
                                          toggleSidebar={toggleSidebar}>
                            {children}
                        </DashboardContent>
                    )}
                </AuthProvider>
            </LanguageProvider>
        </ThemeProvider>
    )
}

// Separate component to use hooks after ThemeProvider is mounted
function DashboardContent({
                              children,
                              sidebarOpen,
                              setSidebarOpen,
                              toggleSidebar,
                          }: {
    children: ReactNode
    sidebarOpen: boolean
    setSidebarOpen: (open: boolean) => void
    toggleSidebar: () => void
}) {
    const isMobile = useMobile()
    const {isDarkMode} = useTheme()

    return (
        <Box sx={{display: "flex", minHeight: "100vh"}}>
            {/* Sidebar */}
            <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}/>

            {/* Main content area - takes up all remaining space */}
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    width: {xs: "100%", md: "calc(100% - 300px)"},
                    transition: "all 0.3s ease-in-out",
                    backgroundColor: isDarkMode ? "rgb(31 41 55)" : "#F5F5F7",
                }}
            >
                {/* Toolbar */}
                <DashboardToolbar onMenuClick={toggleSidebar}/>

                {/* Content - fills remaining vertical space */}
                <Box
                    sx={{
                        flexGrow: 1,
                        p: {xs: 1.5, md: 2.5},
                        overflow: "auto",
                    }}
                    className="text-black dark:text-white transition-colors duration-200"
                >
                    {children}
                </Box>
            </Box>
        </Box>
    )
}

