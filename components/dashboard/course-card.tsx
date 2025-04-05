"use client"

import Image from "next/image"
import Link from "next/link"
import { Box, Typography } from "@/components/ui/mui"
import { useLanguage } from "@/contexts/language-context"

interface CourseCardProps {
  id: string
  title: string
  image: string
  progress: number
}

export default function CourseCard({ id, title, image, progress }: CourseCardProps) {
  const { language } = useLanguage()

  const translations = {
    de: {
      progress: "FORTSCHRITT",
    },
    en: {
      progress: "PROGRESS",
    },
  }

  const t = translations[language]

  return (
    <Link href={`/dashboard/courses/${id}`} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          transition: "transform 0.2s, box-shadow 0.2s",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
          },
        }}
        className="dark:bg-gray-900 dark:border dark:border-gray-800"
      >
        <Box sx={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
          <Image src={image || "/placeholder.svg"} alt={title} fill style={{ objectFit: "cover" }} />
        </Box>

        <Box sx={{ padding: "16px 20px 20px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontSize: { xs: "16px", sm: "18px" },
              fontWeight: 500,
              marginBottom: "8px",
              color: "#333",
              flexGrow: 1,
            }}
            className="dark:text-white"
          >
            {title}
          </Typography>

          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                height: "4px",
                width: "100%",
                backgroundColor: "#e0e0e0",
                borderRadius: "2px",
                overflow: "hidden",
              }}
              className="dark:bg-gray-700"
            >
              <Box
                sx={{
                  height: "100%",
                  width: `${progress}%`,
                  backgroundColor: "#4caf50",
                  borderRadius: "2px",
                }}
              />
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: "#4caf50",
                fontWeight: 500,
                fontSize: "14px",
                marginTop: "8px",
              }}
            >
              {progress}% {t.progress}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  )
}

