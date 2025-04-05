"use client"

import { Box, Typography, Button } from "@/components/ui/mui"
import { useLanguage } from "@/contexts/language-context"

export default function MonthlyCall() {
  const { language } = useLanguage()

  const translations = {
    de: {
      title: "Ihre monatlichen Live-Call Termine",
      branding: "Strategie mit Dr. Tristan Wegner jeden letzten Donnerstag",
      timeframe: "im Monat von 12:00 bis 13:00 Uhr.",
      nextAppointment: "Der nächste Termin am:",
      nextDate: "Donnerstag, 24.04.2025",
      nextTime: "12:00 Uhr - 13:00 Uhr",
      overview: "Übersicht der kommenden Termine:",
      submitQuestions: "Reichen Sie Ihre Fragen zwei Tage vor dem Live-Call bis 18 Uhr ein.",
      submitButton: "Ihre Fragen einreichen",
      joinButton: "Jetzt teilnehmen",
    },
    en: {
      title: "Your monthly live call appointments",
      branding: "Strategy with Dr. Tristan wegner every last Thursday",
      timeframe: "of the month from 12:00 to 13:00.",
      nextAppointment: "The next appointment on:",
      nextDate: "Thursday, 24.04.2025",
      nextTime: "12:00 - 13:00",
      overview: "Overview of upcoming appointments:",
      submitQuestions: "Submit your questions two days before the live call by 18:00.",
      submitButton: "Submit your questions",
      joinButton: "Join now",
    },
  }

  const t = translations[language]

  const upcomingDates = [
    { date: "24.4.2025", time: "12-13 Uhr" },
    { date: "29.5.2025", time: "12-13 Uhr" },
    { date: "26.6.2025", time: "12-13 Uhr" },
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
        }}
        className="dark:bg-gray-900"
      >
        {/* Red background container with curved lines */}
        <Box
          sx={{
            background: "linear-gradient(to bottom, rgb(20,97,120), rgb(5,21,47))",
            borderRadius: "12px",
            overflow: "hidden",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              bottom: "-100px",
              left: "0",
              width: "100%",
              height: "200px",
              background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
              borderRadius: "50%",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "300px",
              height: "300px",
              background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
              borderRadius: "50%",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              padding: "20px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Left section - Next appointment */}
            <Box
              sx={{
                flex: 1,
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                borderBottom: { xs: "1px solid rgba(255, 255, 255, 0.2)", md: "none" },
                paddingBottom: { xs: "20px", md: 0 },
                marginBottom: { xs: "20px", md: 0 },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  fontWeight: 700,
                  marginBottom: 1,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  lineHeight: 1.2,
                }}
              >
                {t.branding}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  marginBottom: 3,
                }}
              >
                {t.timeframe}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  fontWeight: 700,
                  marginBottom: 1,
                }}
              >
                {t.nextAppointment}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  marginBottom: 1,
                }}
              >
                {t.nextDate}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  marginBottom: 3,
                }}
              >
                {t.nextTime}
              </Typography>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "#e31e24",
                  borderRadius: "50px",
                  padding: "10px 20px",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                {t.joinButton}
              </Button>
            </Box>

            {/* Middle section - Upcoming appointments */}
            <Box
              sx={{
                flex: 1,
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                borderRight: { xs: "none", md: "1px solid rgba(255, 255, 255, 0.2)" },
                borderBottom: { xs: "1px solid rgba(255, 255, 255, 0.2)", md: "none" },
                paddingBottom: { xs: "20px", md: 0 },
                marginBottom: { xs: "20px", md: 0 },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  fontWeight: 700,
                  marginBottom: 2,
                  lineHeight: 1.2,
                }}
              >
                {t.overview}
              </Typography>

              {upcomingDates.map((date, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{
                    color: "white",
                    marginBottom: 1,
                    lineHeight: 1.2,
                  }}
                >
                  {date.date} von {date.time}
                </Typography>
              ))}

              <Box sx={{ flexGrow: 1 }} />

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "#e31e24",
                  borderRadius: "50px",
                  padding: "10px 20px",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                  width: { xs: "100%", sm: "auto" },
                  marginTop: 2,
                }}
              >
                {t.joinButton}
              </Button>
            </Box>

            {/* Right section - Submit questions */}
            <Box
              sx={{
                flex: 1,
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                height: "100%",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  fontWeight: 700,
                  marginBottom: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  lineHeight: 1.2,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontSize: "2rem",
                    marginRight: 1,
                    fontWeight: 300,
                  }}
                >
                  !
                </Box>
                {t.submitQuestions}
              </Typography>

              {/* Removed flexGrow spacer */}

              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "white",
                  borderRadius: "50px",
                  padding: "10px 20px",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                  width: { xs: "100%", sm: "auto" },
                  marginTop: 2,
                }}
              >
                {t.submitButton}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

