"use client"

import { useEffect, useRef } from "react"
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Home as HomeIcon, Logout as LogoutIcon, Person as PersonIcon } from "@mui/icons-material"
import { logout } from "@/services/auth"
import { useAuth } from "@/contexts/AuthContext"

interface AdminUserDropdownProps {
  open: boolean
  onClose: () => void
  activeButton: string | null
  setActiveButton: (button: string | null) => void
}

export default function AdminUserDropdown({ open, onClose, activeButton, setActiveButton }: AdminUserDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { language, toggleLanguage } = useLanguage()
  const { user } = useAuth()

  // Handle clicks outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, onClose])

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const translations = {
    de: {
      profile: "Profil",
      language: "Deutsch",
      logout: "Abmelden",
      home: "Home",
      admin: "Administrator",
    },
    en: {
      profile: "Profile",
      language: "English",
      logout: "Logout",
      home: "Home",
      admin: "Administrator",
    },
  }

  const t = translations[language]

  if (!open) return null

  return (
    <Paper
      ref={dropdownRef}
      elevation={5}
      sx={{
        position: "absolute",
        top: "60px",
        right: { xs: "10px", sm: "20px" },
        width: { xs: "240px", sm: "240px" },
        maxWidth: "calc(100vw - 20px)",
        borderRadius: "8px",
        zIndex: 1200,
        overflow: "hidden",
        bgcolor: "background.paper",
      }}
      className="dark:bg-gray-900 dark:border dark:border-gray-700"
    >
      {/* User Info */}
      <Box sx={{ padding: "16px" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "medium", marginBottom: "4px" }} className="dark:text-white">
          {(user?.firstname + " " + user?.lastname).trim() || "Tristan Wegner"}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} className="dark:text-gray-400">
          {t.admin}
        </Typography>
      </Box>

      {/* Divider */}
      <Divider sx={{ mx: 2 }} className="dark:bg-gray-700" />

      {/* Navigation Options */}
      <List sx={{ padding: "8px" }}>
        {/* Home */}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/dashboard"
            selected={pathname === "/dashboard" && activeButton !== "app"}
            onClick={() => {
              setActiveButton(null)
              onClose()
            }}
            sx={{
              borderRadius: "4px",
              "&.Mui-selected": {
                backgroundColor: "action.hover",
              },
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
            className={`dark:hover:bg-gray-800 transition-colors duration-200 ${
              pathname === "/dashboard" && activeButton !== "app" ? "dark:bg-gray-800" : ""
            }`}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <HomeIcon fontSize="small" className="dark:text-white" />
            </ListItemIcon>
            <ListItemText primary={t.home} className="dark:text-white" />
          </ListItemButton>
        </ListItem>

        {/* Profile */}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/dashboard/settings/account"
            selected={pathname === "/dashboard/settings/account"}
            onClick={() => {
              setActiveButton(null)
              onClose()
            }}
            sx={{
              borderRadius: "4px",
              marginTop: "4px",
              "&.Mui-selected": {
                backgroundColor: "action.hover",
              },
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
            className={`dark:hover:bg-gray-800 transition-colors duration-200 ${
              pathname === "/dashboard/profile" ? "dark:bg-gray-800" : ""
            }`}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <PersonIcon fontSize="small" className="dark:text-white" />
            </ListItemIcon>
            <ListItemText primary={t.profile} className="dark:text-white" />
          </ListItemButton>
        </ListItem>

        {/* Language Selector */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={(e) => {
              e.stopPropagation()
              toggleLanguage()
              // Don't close the dropdown
            }}
            sx={{
              borderRadius: "4px",
              marginTop: "4px",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
            className="dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Box
                component="img"
                src={language === "de" ? "/images/english-flag.svg" : "/images/german-flag.svg"}
                alt={language === "de" ? "English flag" : "German flag"}
                sx={{ width: 24, height: 16 }}
              />
            </ListItemIcon>
            <ListItemText primary={language === "de" ? "English" : "Deutsch"} className="dark:text-white" />
          </ListItemButton>
        </ListItem>
      </List>

      {/* Logout Button */}
      <Box sx={{ padding: "8px 8px 16px 8px" }}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            borderColor: "divider",
            color: "text.primary",
            textTransform: "none",
            justifyContent: "flex-start",
            padding: "8px 16px",
            "&:hover": {
              backgroundColor: "action.hover",
              borderColor: "divider",
            },
          }}
          className="dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 transition-colors duration-200"
        >
          {t.logout}
        </Button>
      </Box>
    </Paper>
  )
}

