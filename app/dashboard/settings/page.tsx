"use client"

import { Box, Typography } from "@/components/ui/mui"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export default function SettingsPage() {
  const { language } = useLanguage()

  const translations = {
    de: {
      settings: "Einstellungen",
      dashboard: "Dashboard",
      accountSettings: "Account-Einstellungen",
      accountDescription:
        "Änderen Sie Ihre Informationen, Ihr Profilbild und Ihre persönlichen Einstellungen innerhalb der Plattform.",
    },
    en: {
      settings: "Settings",
      dashboard: "Dashboard",
      accountSettings: "Account Settings",
      accountDescription: "Change your information, profile picture, and personal settings within the platform.",
    },
  }

  const t = translations[language]

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          maxWidth: "1500px",
          margin: "auto",
        }}
      >
        {/* Page Title */}
        <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
          {t.settings}
        </Typography>

        {/* Breadcrumbs */}
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <Typography
              variant="body2"
              sx={{ color: "#666", "&:hover": { textDecoration: "underline" } }}
              className="dark:text-gray-400"
            >
              {t.dashboard}
            </Typography>
          </Link>
          <Box component="span" sx={{ mx: 1, color: "#666" }} className="dark:text-gray-400">
            &gt;
          </Box>
          <Typography variant="body2" sx={{ color: "#666" }} className="dark:text-gray-400">
            {t.settings}
          </Typography>
        </Box>

        {/* Account Settings Card */}
        <Link href="/dashboard/settings/account" style={{ textDecoration: "none" }}>
          <Box
            sx={{
              width: "350px",
              backgroundColor: "white",
              borderRadius: "15px",
              padding: "20px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              position: "relative",
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
            className="dark:bg-gray-900 dark:border dark:border-gray-800"
          >
            {/* Profile Icon */}
            <Box
              sx={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                backgroundColor: "#e3f2fd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
              className="dark:bg-blue-900/30"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke="#2196f3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                  stroke="#2196f3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M16 7H12" stroke="#2196f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Box>

            {/* Arrow Icon in top right */}
            <Box
              sx={{
                position: "absolute",
                top: "20px",
                right: "20px",
                color: "#ccc",
              }}
              className="dark:text-gray-600"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>

            {/* Card Content */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: "500",
                marginBottom: "8px",
              }}
              className="dark:text-white"
            >
              {t.accountSettings}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                lineHeight: 1.5,
              }}
              className="dark:text-gray-400"
            >
              {t.accountDescription}
            </Typography>
          </Box>
        </Link>
      </Box>
    </Box>
  )
}

