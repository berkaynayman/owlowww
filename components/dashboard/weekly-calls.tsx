"use client"

import { Box, Typography, Button } from "@/components/ui/mui"
import { useLanguage } from "@/contexts/language-context"

export default function WeeklyCalls() {
  const { language } = useLanguage()

  const translations = {
    de: {
      title: "Ihre regelmäßigen Live-Call Termine",
      joinNow: "Jetzt teilnehmen",
      days: {
        tuesday: "Dienstag",
        wednesday: "Mittwoch",
        thursday: "Donnerstag",
        friday: "Freitag",
      },
      topics: {
        marketingAds: "Marketing & Werbeanzeigen",
        marketingCopywriting: "Marketing & Copywriting",
        strategyClarity: "Strategie & Klarheit",
        ads: "Werbeanzeigen",
      },
    },
    en: {
      title: "Your regular live call appointments",
      joinNow: "Join now",
      days: {
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
      },
      topics: {
        marketingAds: "Marketing & Advertisements",
        marketingCopywriting: "Marketing & Copywriting",
        strategyClarity: "Strategy & Clarity",
        ads: "Advertisements",
      },
    },
  }

  const t = translations[language]

  const calls = [
    {
      day: t.days.tuesday,
      time: "11:00",
      topic: t.topics.marketingAds,
    },
    {
      day: t.days.wednesday,
      time: "17:00",
      topic: t.topics.marketingCopywriting,
    },
    {
      day: t.days.thursday,
      time: "17:00",
      topic: t.topics.strategyClarity,
    },
    {
      day: t.days.friday,
      time: "17:00",
      topic: t.topics.ads,
    },
  ]

  return (
    <Box sx={{ width: "100%", marginBottom: 4 }}>
      {/* Title with left border */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Box
          sx={{
            width: "4px",
            height: "24px",
            backgroundColor: "#666",
            marginRight: 2,
          }}
          className="dark:bg-gray-400"
        />
        <Typography
          variant="h5"
          component="h2"
          sx={{
            color: "#666",
            fontWeight: 400,
          }}
          className="dark:text-gray-300"
        >
          {t.title}
        </Typography>
      </Box>

      {/* White container */}
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "16px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          background: "linear-gradient(to right, #ffffff, #f8f8f8, #f5f5f5)",
        }}
        className="dark:bg-gray-900 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      >
        {/* Red background container */}
        <Box
          sx={{
            background: "linear-gradient(rgb(20, 97, 120), rgb(5, 21, 47))",
            borderRadius: "12px",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            overflow: "hidden",
          }}
        >
          {calls.map((call, index) => (
            <Box
              key={index}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px 16px",
                borderRight:
                  index < calls.length - 1 ? { xs: "none", md: "1px solid rgba(255, 255, 255, 0.2)" } : "none",
                borderBottom:
                  index < calls.length - 1 ? { xs: "1px solid rgba(255, 255, 255, 0.2)", md: "none" } : "none",
                position: "relative",
              }}
            >
              {/* Day and time */}
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  fontWeight: 400,
                  marginBottom: 1,
                  textAlign: "center",
                }}
              >
                {call.day} {call.time} Uhr
              </Typography>

              {/* Topic */}
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  fontWeight: 700,
                  marginBottom: 2,
                  textAlign: "center",
                }}
              >
                {call.topic}
              </Typography>

              {/* Join button */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "#333",
                  borderRadius: "50px",
                  padding: "8px 20px",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                {t.joinNow}
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

