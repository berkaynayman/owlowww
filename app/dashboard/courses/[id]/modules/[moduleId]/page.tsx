"use client"

import {useState} from "react"
import {useParams, useRouter} from "next/navigation"
import {Box, Button, Typography} from "@/components/ui/mui"
import {useLanguage} from "@/contexts/language-context"
import Link from "next/link"
import Image from "next/image"
import {useMediaQuery} from "@mui/material"
import {getCourse, getCourseModule} from "@/services/courseService";
import {useFetch} from "@/hooks/useFetch";
import CourseHeaderCard from "@/components/components/CourseHeaderCard";

export default function ModuleDetailPage() {
    const params = useParams()
    const {id, moduleId} = params
    const router = useRouter()
    const {language} = useLanguage()
    const [hoveredLessonId, setHoveredLessonId] = useState<string | null>(null)
    const isMobile = useMediaQuery("(max-width:600px)")
    const {data: module} = useFetch(() => getCourseModule(moduleId), [])

    const translations = {
        de: {
            backToCourse: "Zurück zum Kurs",
            module: "Modul",
            lessons: "Lektionen",
            page: "Seite",
            pages: "Seiten",
            minutes: "Minuten",
            continue: "Fortsetzen",
            min: "Minuten",
        },
        en: {
            backToCourse: "Back to course",
            module: "Module",
            lessons: "Lessons",
            page: "Page",
            pages: "Pages",
            minutes: "Minutes",
            continue: "Continue",
            min: "Minutes",
        },
    }
    const t = translations[language]

    if (!module) {
        return (
            <Box sx={{padding: "20px", textAlign: "center"}}>
                <Typography variant="h5" sx={{marginBottom: "20px"}}>
                    Modul nicht gefunden
                </Typography>
                <Button variant="contained" onClick={() => router.back()}>
                    Zurück
                </Button>
            </Box>
        )
    }

    return (
        <Box sx={{maxWidth: "1200px", margin: "auto", padding: "20px"}}>
            {/* Back button */}
            <Link href={`/dashboard/courses/${id}`} passHref>
                <Button
                    variant="text"
                    sx={{
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                    }}
                    className="dark:text-white"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19 12H5M5 12L12 19M5 12L12 5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    {t.backToCourse}
                </Button>
            </Link>

            {/* Module header */}
            <CourseHeaderCard use="dark" displayProgress={false} course={module.courses} image={"/images/moduleimg.png"}
                              t={t}></CourseHeaderCard>


            {/* Sections */}
            {module?.courses_module_groups?.map((section, sectionIndex) => (
                <Box
                    key={`section-${sectionIndex}`}
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "15px",
                        marginBottom: "20px",
                        overflow: "hidden",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                    }}
                    className="dark:bg-gray-800 dark:text-white"
                >
                    {/* Section header */}
                    <Box
                        sx={{
                            padding: "24px 24px 0 24px",
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "24px",
                        }}
                        className="dark:border-gray-700"
                    >
                        {/* Book icon */}
                        <Box
                            sx={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                backgroundColor: "#f0f0f0",
                                display: "flex",
                                marginRight: "24px",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            className="dark:bg-gray-700"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Box>

                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <Typography variant="h6" sx={{fontWeight: "500"}}>
                                {section.title}
                            </Typography>
                            <Typography variant="body2" sx={{color: "#757575", marginLeft: "10px"}}
                                        className="dark:text-gray-400">


                                {section.totalMinutes} {t.minutes}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Lessons list */}
                    <Box
                        sx={{
                            padding: "24px",

                        }}>
                        {section.courses_entities?.map((lesson, lessonIndex) => (
                            <Box
                                key={`lesson-${lessonIndex}`}
                                sx={{
                                    padding: "8px 14px 8px 8px",
                                    borderRadius: "8px",
                                    border: "rgba(153, 153, 153, 0.24) 2px solid",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "15px",
                                    cursor: "pointer",
                                    "&:hover": {
                                        backgroundColor: "#f9f9f9",
                                    },
                                    position: "relative",
                                }}
                                className="dark:border-gray-700 dark:hover:bg-gray-700"
                                onClick={() => router.push(`/dashboard/courses/${id}/modules/${moduleId}/lessons/${lesson.id}`)}
                            >
                                {/* Lesson thumbnail */}
                                <Box
                                    sx={{
                                        aspectRatio: "1.6",
                                        width: "86px",
                                        borderRadius: "6px",
                                        overflow: "hidden",
                                        position: "relative",
                                        flexShrink: 0,
                                    }}
                                >
                                    <Image
                                        src={lesson.image_url || "/images/videothumb.jpg"}
                                        alt={lesson.title}
                                        fill
                                        style={{objectFit: "cover"}}
                                    />
                                </Box>

                                {/* Lesson info */}
                                <Box sx={{flex: 1}}>
                                    <Typography variant="body1" sx={{fontWeight: "500", marginBottom: "4px"}}>
                                        {lesson.title}
                                    </Typography>
                                    <Box sx={{display: "flex", alignItems: "center", gap: "10px"}}>
                                        {/* Clock icon */}
                                        <Box sx={{display: "flex", alignItems: "center", gap: "4px"}}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <Typography variant="caption" sx={{color: "#757575"}}
                                                        className="dark:text-gray-400">
                                                {lesson.duration} {t.minutes}
                                            </Typography>
                                        </Box>

                                        {/* Page icon */}
                                        <Box sx={{display: "flex", alignItems: "center", gap: "4px"}}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M7 7H17"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M7 12H17"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M7 17H13"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <Typography variant="caption" sx={{color: "#757575"}}
                                                        className="dark:text-gray-400">
                                                {lesson.pages} {lesson.pages === 1 ? t.page : t.pages}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Status indicator */}
                                {lesson.completed && (
                                    <Box
                                        sx={{
                                            width: "24px",
                                            height: "24px",
                                            borderRadius: "50%",
                                            backgroundColor: "#4caf50",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "white",
                                        }}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M5 12L10 17L20 7"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </Box>
                                ) as React.ReactNode}

                                {/* Continue button - show on hover only on desktop */}
                                {hoveredLessonId === lesson.id && !isMobile && (
                                    <Link
                                        href={`/dashboard/courses/${id}/modules/${moduleId}/lessons/${lesson.id}`}
                                        style={{textDecoration: "none"}}
                                    >
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: "#757575",
                                                color: "white",
                                                borderRadius: "8px",
                                                padding: "6px 12px",
                                                textTransform: "none",
                                                "&:hover": {
                                                    backgroundColor: "#616161",
                                                },
                                            }}
                                            className="dark:bg-gray-600 dark:hover:bg-gray-500"
                                        >
                                            {t.continue}
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                style={{marginLeft: "4px"}}
                                            >
                                                <path
                                                    d="M9 18L15 12L9 6"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </Button>
                                    </Link>
                                ) as React.ReactNode}
                            </Box>
                        ) as React.ReactNode)}
                    </Box>
                </Box>
            )) as React.ReactNode}
        </Box>
    )
}

