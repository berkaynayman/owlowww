"use client"

import { Box, Typography } from "@/components/ui/mui"
import Image from "next/image"
import Link from "next/link"

interface Lesson {
  id: string
  title: string
  thumbnail: string
  isActive?: boolean
  isCompleted?: boolean
}

interface LessonListProps {
  moduleTitle: string
  moduleId: string
  courseId: string
  lessonCount: number
  lessons: Lesson[]
  onLessonClick?: (lessonId: string) => void
}

export default function LessonList({
  moduleTitle,
  moduleId,
  courseId,
  lessonCount,
  lessons,
  onLessonClick,
}: LessonListProps) {
  return (
    <Box sx={{ backgroundColor: "#f5f5f7", height: "100%", overflow: "auto" }} className="dark:bg-gray-800">
      {/* Module header */}
      <Box sx={{ padding: "20px", display: "flex", alignItems: "center", gap: "15px" }}>
        <Box
          sx={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "#9e9e9e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="dark:bg-gray-700"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>

        <Box>
          <Typography variant="h6" className="dark:text-white">
            {moduleTitle}
          </Typography>
          <Typography variant="body2" color="textSecondary" className="dark:text-gray-400">
            {lessonCount} LEKTIONEN
          </Typography>
        </Box>
      </Box>

      {/* Lessons */}
      <Box>
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/dashboard/courses/${courseId}/modules/${moduleId}/lessons/${lesson.id}`}
            style={{ textDecoration: "none" }}
            onClick={(e) => {
              if (onLessonClick) {
                e.preventDefault()
                onLessonClick(lesson.id)
              }
            }}
          >
            <Box
              sx={{
                padding: "15px",
                backgroundColor: lesson.isActive ? "white" : "transparent",
                display: "flex",
                alignItems: "center",
                gap: "15px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: lesson.isActive ? "white" : "rgba(0,0,0,0.05)",
                },
                borderRadius: "8px",
                margin: "0 10px 10px 10px",
              }}
              className={`dark:hover:bg-gray-700 ${lesson.isActive ? "dark:bg-gray-700" : ""}`}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "80px",
                  height: "60px",
                  borderRadius: "4px",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <Image
                  src={lesson.thumbnail || "/placeholder.svg"}
                  alt={lesson.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                {lesson.isActive && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "5px",
                      right: "5px",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: "#2196f3",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3 12H21M21 12L14 5M21 12L14 19"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Box>
                )}
                {lesson.isCompleted && !lesson.isActive && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "5px",
                      right: "5px",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: "#4caf50",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5 12L10 17L20 7"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Box>
                )}
              </Box>

              <Typography
                variant="body1"
                sx={{
                  fontWeight: lesson.isActive ? 500 : 400,
                  color: lesson.isActive ? "#000" : "#333",
                }}
                className={`dark:text-white ${lesson.isActive ? "dark:font-medium" : ""}`}
              >
                {lesson.title}
              </Typography>
            </Box>
          </Link>
        ))}

        {/* Next Section button - no action needed */}
        <Box sx={{ padding: "15px", textAlign: "center" }}>
          <Box
            sx={{
              padding: "15px",
              backgroundColor: "rgba(0,0,0,0.05)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.08)",
              },
            }}
            className="dark:bg-gray-700 dark:hover:bg-gray-600"
            onClick={(e) => e.preventDefault()}
          >
            <Typography variant="body1" className="dark:text-white">
              Nächste Sektion
            </Typography>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

