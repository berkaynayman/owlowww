"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Box, Typography, IconButton } from "@/components/ui/mui"
import { Check as CheckIcon, Visibility as VisibilityIcon } from "@mui/icons-material"

interface Notification {
  id: string
  message: React.ReactNode
  time: string
  read: boolean
}

export default function NotificationsDropdown({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Sample notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      message: (
        <>
          Du wurdest zu dem Kurs <strong>Daten & Tracking</strong> hinzugefügt.
        </>
      ),
      time: "vor 8 Monaten",
      read: false,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

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

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  if (!open) return null

  return (
    <Box
      ref={dropdownRef}
      sx={{
        position: "absolute",
        top: "60px",
        right: "20px",
        width: "400px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        zIndex: 1200,
        overflow: "hidden",
      }}
      className="dark:bg-gray-900 dark:border dark:border-gray-700"
    >
      {/* Header */}
      <Box
        sx={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e0e0e0",
        }}
        className="dark:border-gray-700"
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "medium" }} className="dark:text-white">
            Benachrichtigungen
          </Typography>
          {unreadCount > 0 && (
            <Typography variant="body2" sx={{ color: "#757575" }} className="dark:text-gray-400">
              {unreadCount} ungelesene Nachricht{unreadCount !== 1 ? "en" : ""}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            size="small"
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "50%",
              width: 36,
              height: 36,
            }}
            className="dark:bg-gray-800 dark:text-gray-300"
            onClick={() => {}}
            title="Alle anzeigen"
          >
            <VisibilityIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              backgroundColor: "#f0f9f4",
              borderRadius: "50%",
              width: 36,
              height: 36,
            }}
            className="dark:bg-gray-800 dark:text-green-400"
            onClick={markAllAsRead}
            title="Alle als gelesen markieren"
          >
            <CheckIcon sx={{ fontSize: 20, color: "#4caf50" }} />
          </IconButton>
        </Box>
      </Box>

      {/* Unread Section */}
      {unreadCount > 0 && (
        <>
          <Box
            sx={{
              padding: "12px 20px",
              backgroundColor: "#f9f9f9",
            }}
            className="dark:bg-gray-800"
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: "bold",
                color: "#757575",
                letterSpacing: "0.5px",
              }}
              className="dark:text-gray-400"
            >
              UNGELESEN
            </Typography>
          </Box>

          {/* Notification Items */}
          {notifications
            .filter((n) => !n.read)
            .map((notification) => (
              <Box
                key={notification.id}
                sx={{
                  padding: "16px 20px",
                  backgroundColor: "#f9f9f9",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
                className="dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                  className="dark:bg-gray-700"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ marginBottom: 1 }} className="dark:text-white">
                    {notification.message}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#757575", display: "flex", alignItems: "center" }}
                    className="dark:text-gray-400"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ marginRight: "4px" }}
                    >
                      <path
                        d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {notification.time}
                  </Typography>
                </Box>
              </Box>
            ))}
        </>
      )}

      {/* Empty State */}
      {unreadCount === 0 && (
        <Box
          sx={{
            padding: "30px 20px",
            textAlign: "center",
          }}
        >
          <Typography variant="body1" className="dark:text-gray-300">
            Keine ungelesenen Benachrichtigungen
          </Typography>
        </Box>
      )}
    </Box>
  )
}

