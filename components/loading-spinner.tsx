"use client"

import { Box, Typography, CircularProgress } from "@mui/material"
import Image from "next/image"
import { useEffect, useState } from "react"

interface LoadingSpinnerProps {
  message?: string
}

export default function LoadingSpinner({ message = "Loading..." }: LoadingSpinnerProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check for dark mode using document class instead of the theme context
    if (typeof window !== "undefined") {
      setIsDarkMode(document.documentElement.classList.contains("dark"))

      // Also set up an observer to detect theme changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "class") {
            setIsDarkMode(document.documentElement.classList.contains("dark"))
          }
        })
      })

      observer.observe(document.documentElement, { attributes: true })
      return () => observer.disconnect()
    }
  }, [])

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        zIndex: 9999,
      }}
      className="dark:bg-gray-900/90 transition-colors duration-200"
    >
      <Box sx={{ position: "relative", width: 200, height: 50, marginBottom: 4 }}>
        <Image
          src={isDarkMode ? "/images/logo-white.svg" : "/images/logo-color.svg"}
          alt="O&W Rechtsanwaltsgesellschaft mbH"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </Box>

      <CircularProgress size={60} thickness={3} color="primary" />

      <Typography variant="h6" sx={{ marginTop: 3, color: "#333" }} className="dark:text-white">
        {message}
      </Typography>
    </Box>
  )
}

