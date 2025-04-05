"use client"

import { Box, Typography } from "@/components/ui/mui"
import Image from "next/image"

interface WelcomeWidgetProps {
  userName: string
}

export default function WelcomeWidget({ userName = user }: WelcomeWidgetProps) {

    return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: "30px",
        width: "100%",
      }}
      className="dark:text-white"
    >
      {/* Logo Container */}
      <Box
        sx={{
          width: "100px",
          height: "100px",
          borderRadius: "50px",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "20px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          flexShrink: 0,
        }}
      >
        <Box sx={{ position: "relative", width: "60px", height: "30px" }}>
          <Image
            src="/images/washer.png"
            alt="Logo"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </Box>
      </Box>

      {/* Welcome Text */}
      <Box>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 500,
            color: "#333",
            marginBottom: "4px",
          }}
          className="dark:text-white"
        >
          Willkommen, {userName}!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#666",
          }}
          className="dark:text-gray-400"
        >
          Viel Spaß & Erfolg beim Lernen!
        </Typography>
      </Box>
    </Box>
  )
}

