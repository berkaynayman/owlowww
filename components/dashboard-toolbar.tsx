"use client"

import { useState, useRef, useEffect } from "react"
import { Box, IconButton } from "@/components/ui/mui"
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material"
import { useTheme } from "@/contexts/theme-context"
import NotificationsDropdown from "./notifications-dropdown"

export default function DashboardToolbar() {
  const { isDarkMode, toggleTheme } = useTheme()
  const [searchValue, setSearchValue] = useState("")
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const handleUserClick = () => {
    console.log("User profile clicked")
    // Add your user profile click handler here
  }

  const handleSearchClick = () => {
    if (!isSearchExpanded) {
      setIsSearchExpanded(true)
      // Focus the input after expansion
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 300) // Wait for animation to complete
    }
  }

  // Handle clicks outside the search box to collapse it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSearchExpanded &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        !searchValue
      ) {
        setIsSearchExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isSearchExpanded, searchValue])

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 20px",
        height: "64px",
      }}
      className="dark:bg-gray-900 dark:border-gray-700 transition-colors duration-200"
    >test
      {/* Search Box */}
      <Box
        ref={searchContainerRef}
        onClick={handleSearchClick}
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#F5F5F7",
          borderRadius: "50px",
          padding: "8px 12px",
          width: isSearchExpanded ? { xs: "200px", sm: "250px", md: "350px" } : "40px",
          transition: "width 0.3s ease-in-out",
          overflow: "hidden",
          cursor: isSearchExpanded ? "auto" : "pointer",
        }}
        className="dark:bg-gray-800 transition-colors duration-200"
      >
        <SearchIcon sx={{ color: "#757575", fontSize: "20px", marginRight: "8px" }} className="dark:text-gray-400" />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Suche"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            width: "100%",
            fontSize: "14px",
          }}
          className="dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
        />
      </Box>

      {/* Right side tools */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {/* Action buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#F5F5F7",
            borderRadius: "50px",
            padding: "4px 8px",
            marginRight: "8px",
          }}
          className="dark:bg-gray-800 transition-colors duration-200"
        >
          {/* Light/Dark Mode Toggle */}
          <IconButton
            size="small"
            sx={{ width: 36, height: 36 }}
            onClick={toggleTheme}
            className="transition-colors duration-200"
          >
            {isDarkMode ? (
              <DarkModeIcon sx={{ fontSize: "20px" }} className="text-yellow-400" />
            ) : (
              <LightModeIcon sx={{ fontSize: "20px" }} className="text-gray-600" />
            )}
          </IconButton>

          {/* Notifications */}
          <IconButton
            size="small"
            sx={{ width: 36, height: 36, position: "relative" }}
            className="dark:text-white"
            onClick={() => setNotificationsOpen((prev) => !prev)}
          >
            <NotificationsIcon sx={{ fontSize: "20px" }} />
            <Box
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                backgroundColor: "#e91e63",
                color: "white",
                borderRadius: "50%",
                width: 16,
                height: 16,
                fontSize: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              1
            </Box>
          </IconButton>

          {/* Settings */}
          <IconButton size="small" sx={{ width: 36, height: 36 }} className="dark:text-white">
            <SettingsIcon sx={{ fontSize: "20px" }} />
          </IconButton>

          {/* User Profile */}
          <Box
            onClick={handleUserClick}
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: "#9E9E9E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              "&:hover": {
                opacity: 0.8,
              },
            }}
          >
            TW
          </Box>
        </Box>
      </Box>
      {/* Notifications Dropdown */}
      <NotificationsDropdown open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </Box>
  )
}

