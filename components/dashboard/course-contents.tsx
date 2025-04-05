"use client"

import { Box, Typography } from "@/components/ui/mui"
import { useLanguage } from "@/contexts/language-context"

export default function CourseContents() {
  const { language } = useLanguage()

  const translations = {
    de: {
      title: "Ihre Kursinhalte",
      noAccess: "Sie haben keinen Zugriff zu diesem Kurs.",
    },
    en: {
      title: "Your Course Contents",
      noAccess: "You don't have access to this course.",
    },
  }

  const t = translations[language]

  // This would typically come from an API
  const courses = [
    { id: 1, hasAccess: false },
    { id: 2, hasAccess: false },
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

      {/* Course grid */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          width: "100%",
        }}
      >
        {courses.map((course) => (
          <Box
            key={course.id}
            sx={{
              width: { xs: "100%", sm: "50%" },
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
            className="dark:bg-gray-900"
          >
            <Typography
              variant="body1"
              sx={{
                color: "#666",
                textAlign: "center",
                width: "100%",
              }}
              className="dark:text-gray-400"
            >
              {t.noAccess}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

