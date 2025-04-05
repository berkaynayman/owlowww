"use client"

import { Box, Typography, Grid } from "@/components/ui/mui"
import CourseCard from "@/components/dashboard/course-card"
import { useLanguage } from "@/contexts/language-context"
import {useEffect, useState} from "react";
import {getCourses} from "@/services/courseService";
import {useFetch} from "@/hooks/useFetch";


export default function CoursesPage() {
  const { language } = useLanguage()
  const { data: courses, loading } = useFetch(() => getCourses(false), [])

  const translations = {
    de: {
      myCourses: "Meine Kurse",
    },
    en: {
      myCourses: "My Courses",
    },
  }

  const t = translations[language]

  return (
    <Box>
      <Box
        sx={{
          maxWidth: "1500px",
          margin: "auto",
          marginTop: { xs: "20px", md: "50px" },
          padding: "0 16px",
        }}
      >
        <Box
          sx={{ borderLeft: "4px solid #333", paddingLeft: "16px", marginBottom: "32px" }}
          className="dark:border-gray-400"
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 500,
              color: "#333",
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
            className="dark:text-white"
          >
            {t.myCourses}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {courses?.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <CourseCard id={course?.id} title={course?.title} image={course?.image_url} progress={course.progress} />
            </Grid>
          )) as React.ReactNode}
        </Grid>
      </Box>
    </Box>
  )
}

