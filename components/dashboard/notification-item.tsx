"use client"

import { useState } from "react"
import { Box, Typography } from "@/components/ui/mui"

interface NotificationItemProps {
  title: string
  description: string
  defaultChecked?: boolean
}

export default function NotificationItem({ title, description, defaultChecked = false }: NotificationItemProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
        padding: { xs: "12px", sm: "16px" },
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
        gap: { xs: 1.5, sm: 0 },
      }}
      className="dark:border-gray-700"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          width: { xs: "100%", sm: "auto" },
        }}
      >
        {/* Toggle switch */}
        <Box
          sx={{
            position: "relative",
            width: 44,
            height: 24,
            flexShrink: 0,
          }}
        >
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            style={{
              position: "absolute",
              opacity: 0,
              width: "100%",
              height: "100%",
              zIndex: 2,
              cursor: "pointer",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: isChecked ? "#4caf50" : "#e0e0e0",
              borderRadius: 12,
              transition: "background-color 0.3s",
              "&::before": {
                content: '""',
                position: "absolute",
                width: 20,
                height: 20,
                left: isChecked ? 20 : 2,
                bottom: 2,
                backgroundColor: "white",
                borderRadius: "50%",
                transition: "left 0.3s",
              },
            }}
            className={`dark:${isChecked ? "bg-green-500" : "bg-gray-600"}`}
          />
        </Box>

        {/* Title */}
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            fontSize: { xs: "13px", sm: "16px" },
            lineHeight: 1.4,
            wordBreak: "break-word",
          }}
          className="dark:text-white"
        >
          {title}
        </Typography>
      </Box>

      {/* Description */}
      <Typography
        variant="body2"
        sx={{
          color: "#757575",
          maxWidth: { xs: "100%", sm: "60%" },
          textAlign: { xs: "left", sm: "right" },
          fontSize: { xs: "11px", sm: "14px" },
          lineHeight: 1.5,
          wordBreak: "break-word",
        }}
        className="dark:text-gray-400"
      >
        {description}
      </Typography>
    </Box>
  )
}

