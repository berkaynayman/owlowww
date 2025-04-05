"use client"

import { Box, Typography } from "@/components/ui/mui"
import Image from "next/image"
import Link from "next/link"

interface NextLessonProps {
  title: string
  courseId: string
  moduleId: string
  lessonId: string
  thumbnailUrl: string
}

export default function NextLesson({ title, courseId, moduleId, lessonId, thumbnailUrl }: NextLessonProps) {
  return (
    <Link
      href={`/dashboard/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`}
      style={{ textDecoration: "none" }}
    >
      <Box
        sx={{
          backgroundColor: "#f5f5f7",
          borderRadius: "8px",
          padding: "15px",
          display: "flex",
          alignItems: "center",
          gap: "15px",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#ececec",
          },
          marginTop: "20px",
        }}
        className="dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <Box
          sx={{
            position: "relative",
            width: "120px",
            height: "80px",
            borderRadius: "4px",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <Image src={thumbnailUrl || "/placeholder.svg"} alt={title} fill style={{ objectFit: "cover" }} />
        </Box>

        <Box>
          <Typography variant="caption" color="textSecondary" className="dark:text-gray-400">
            NÄCHSTE LEKTION
          </Typography>
          <Typography variant="h6" className="dark:text-white">
            {title}
          </Typography>
        </Box>
      </Box>
    </Link>
  )
}

