"use client"

import React, {useState} from "react"
import {useParams, useRouter} from "next/navigation"
import {Box, Button, IconButton, Typography} from "@/components/ui/mui"
import {useLanguage} from "@/contexts/language-context"
import {useMobile} from "@/hooks/use-mobile"
import Link from "next/link"
import Image from "next/image"
import {Course, getCourseEntity} from "@/services/courseService";
import {useFetch} from "@/hooks/useFetch";
import CustomVideoPlayer from "@/components/components/CustomVideoPlayer";
import dynamic from 'next/dynamic';
import {toast} from "sonner";
import Divider from '@mui/material/Divider';

export default function LessonDetailPage() {
    const params = useParams()
    const {id, moduleId, lessonId} = params
    const router = useRouter()
    const {language} = useLanguage()
    const isMobile = useMobile()
    const [activeTab, setActiveTab] = useState<"video" | "lessons">("video")

    const {data: entity} = useFetch(() => getCourseEntity(lessonId as string), [])

    const [nextLesson, setNextLesson] = useState({})
    const [prevLesson, setPrevLesson] = useState({})

    const CustomVideoPlayer = dynamic(
        () => import('@/components/components/CustomVideoPlayer'),
        {ssr: false}
    );

    const translations = {
        de: {
            backToCourse: "Zurück zum Kurs",
            module: "Modul",
            lessons: "Lektionen",
            lesson: "Lektion",
            page: "Seite",
            pages: "Seiten",
            minutes: "Minuten",
            min: "Min.",
            continue: "Fortsetzen",
            completeLesson: "Lektion abschließen",
            feedbackGive: "Feedback geben",
            nextLesson: "NÄCHSTE LEKTION",
            nextSection: "Nächste Sektion",
            showVideo: "Video anzeigen",
            showLessons: "Lektionen anzeigen",
            dashboard: "Dashboard",
            courses: "Kurse",
        },
        en: {
            backToCourse: "Back to course",
            module: "Module",
            lessons: "Lessons",
            lesson: "Lesson",
            page: "Page",
            pages: "Pages",
            minutes: "Minutes",
            min: "Min.",
            continue: "Continue",
            completeLesson: "Complete lesson",
            feedbackGive: "Give feedback",
            nextLesson: "NEXT LESSON",
            nextSection: "Next section",
            showVideo: "Show video",
            showLessons: "Show lessons",
            dashboard: "Dashboard",
            courses: "Courses",
        },
    }

    const t = translations[language]

    /*
        function findPrevNextLesson(groups: any[], currentLessonId: number) {
            let prev: any = null;
            let next: any = null;

            for (let i = 0; i < groups.length; i++) {
                const entities = groups[i].courses_entities;
                const index = entities.findIndex(entity => entity.id === currentLessonId);

                if (index !== -1) {
                    // 🟢 Found the lesson
                    // Try to get prev in same group
                    if (index > 0) {
                        prev = entities[index - 1];
                    } else if (i > 0) {
                        // If none in group, fallback to last of previous group
                        const prevGroup = groups[i - 1].courses_entities;
                        prev = prevGroup[prevGroup.length - 1] || null;
                    }

                    // Try to get next in same group
                    if (index < entities.length - 1) {
                        next = entities[index + 1];
                    } else if (i < groups.length - 1) {
                        // If none in group, fallback to first of next group
                        const nextGroup = groups[i + 1].courses_entities;
                        next = nextGroup[0] || null;
                    }

                    break; // Stop searching after finding
                }
            }

            return { prev, next };
        }
    */


    // Toggle between video and lessons on mobile
    const toggleTab = (tab: "video" | "lessons") => {
        setActiveTab(tab)
    }

    // Circular progress component
    const CircularProgress = ({percentage}: { percentage: number }) => {
        const radius = 40
        const circumference = 2 * Math.PI * radius
        const strokeDashoffset = circumference - (percentage / 100) * circumference
        const strokeWidth = 3

        return (
            <Box sx={{position: "relative", width: 100, height: 100}}>
                <svg width="100" height="100" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle cx="50" cy="50" r={radius} fill="transparent" stroke="rgba(255, 255, 255, 0.2)" strokeWidth={strokeWidth}/>

                    {/* Progress arc */}
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="transparent"
                        stroke="#2eb174"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                    />

                    {/* Green dot at the end of progress */}
                    {percentage > 0 && (
                        <circle
                            cx={50 + radius * Math.cos((2 * Math.PI * percentage) / 100 - Math.PI / 2)}
                            cy={50 + radius * Math.sin((2 * Math.PI * percentage) / 100 - Math.PI / 2)}
                            r={4}
                            fill="#2eb174"
                        />
                    )}
                </svg>

                {/* Percentage text */}
                <Typography
                    variant="h5"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontWeight: "bold",
                        color: "#333",
                    }}
                    className="dark:text-white"
                >
                    {percentage}%
                </Typography>
            </Box>
        )
    }

    // Custom breadcrumbs component
    const Breadcrumbs = () => {
        const courseName = entity?.courses_module_groups.course_modules.courses.title;

        return (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "8px",
                    padding: "15px 0",
                }}
            >
                <Link href={`/dashboard/courses/${id}`} style={{textDecoration: "none"}}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "#666",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                            fontSize: {xs: "0.7rem", sm: "0.875rem"},
                        }}
                        className="dark:text-gray-400 dark:hover:text-gray-300"
                    >
                        {courseName}
                    </Typography>
                </Link>

                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{margin: "0 4px"}}
                >
                    <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                <Link href={`/dashboard/courses/${id}/modules/${moduleId}`} style={{textDecoration: "none"}}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "#666",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                            fontSize: {xs: "0.7rem", sm: "0.875rem"},
                        }}
                        className="dark:text-gray-400 dark:hover:text-gray-300"
                    >
                        {entity?.courses_module_groups.course_modules.title}
                    </Typography>
                </Link>

                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{margin: "0 4px"}}
                >
                    <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                <Typography variant="body2" sx={{fontWeight: 500}} className="dark:text-white">
                    {entity?.title || ""}
                </Typography>
            </Box>
        )
    }

    return (
        <Box sx={{maxWidth: "1280px", margin: "auto", padding: {xs: "10px", md: "20px"}}}>
            {/* Breadcrumbs */}
            <Box sx={{marginBottom: "20px"}}>
                <Breadcrumbs/>
            </Box>

            {/* Mobile tabs */}
            {isMobile && (
                <Box
                    sx={{
                        display: "flex",
                        marginBottom: "15px",
                        borderRadius: "10px",
                        overflow: "hidden",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    }}
                >
                    <Button
                        variant={activeTab === "video" ? "contained" : "text"}
                        onClick={() => toggleTab("video")}
                        sx={{
                            flex: 1,
                            borderRadius: 0,
                            py: 1.5,
                            backgroundColor: activeTab === "video" ? "#4caf50" : "white",
                            color: activeTab === "video" ? "white" : "#333",
                            "&:hover": {
                                backgroundColor: activeTab === "video" ? "#43a047" : "#f5f5f5",
                            },
                        }}
                        className={activeTab !== "video" ? "dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700" : ""}
                    >
                        {t.showVideo}
                    </Button>
                    <Button
                        variant={activeTab === "lessons" ? "contained" : "text"}
                        onClick={() => toggleTab("lessons")}
                        sx={{
                            flex: 1,
                            borderRadius: 0,
                            py: 1.5,
                            backgroundColor: activeTab === "lessons" ? "#4caf50" : "white",
                            color: activeTab === "lessons" ? "white" : "#333",
                            "&:hover": {
                                backgroundColor: activeTab === "lessons" ? "#43a047" : "#f5f5f5",
                            },
                        }}
                        className={activeTab !== "lessons" ? "dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700" : ""}
                    >
                        {t.showLessons}
                    </Button>
                </Box>
            ) as React.ReactNode}

            {/* Main content - Two column layout */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: {xs: "column", md: "row"},
                    gap: "20px",
                }}
            >


                {/* Left side - Video player */}
                {(!isMobile || activeTab === "video") && (
                    <Box
                        sx={{
                            flex: {xs: "1", md: "65%"},
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                        }}
                    >

                        {/* Module header - New design matching the image */}
                        <Box
                            sx={{
                                backgroundColor: "#6b6b6b",
                                borderRadius: "15px",
                                marginBottom: "20px",
                                overflow: "hidden",
                                display: "flex",
                                alignItems: "center",
                                padding: {xs: "15px", md: "20px"},
                                gap: {xs: "15px", md: "20px"},
                            }}
                            className="dark:bg-gray-700"
                        >
                            {/* Middle - Module info */}
                            <Box sx={{flex: 1}}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: "bold",
                                        fontSize: {xs: "0.7rem", sm: "0.8rem"},
                                        color: "rgba(255, 255, 255, 0.7)",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px",
                                        display: "block",
                                        marginBottom: "4px",
                                    }}
                                >
                                    {entity?.courses_module_groups.title}
                                </Typography>
                                <Typography
                                    variant="h4"
                                    component="h1"
                                    sx={{
                                        fontWeight: 500,
                                        color: "white",
                                        fontSize: {xs: "1.1rem", sm: "1.75rem"},
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {entity?.courses_module_groups.course_modules.title}
                                </Typography>
                            </Box>

                            {/* Right side - Progress circle */}
                            <Box
                                sx={{
                                    position: "relative",
                                    width: {xs: "60px", sm: "80px"},
                                    height: {xs: "60px", sm: "80px"},
                                    flexShrink: 0,
                                }}
                            >
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "50%",
                                        border: "2px solid rgba(255, 255, 255, 0.2)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: "bold",
                                            color: "white",
                                            fontSize: {xs: "1rem", sm: "1.25rem"},
                                        }}
                                    >
                                        {module.progress}%
                                    </Typography>
                                </Box>
                                <svg
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 100 100"
                                    style={{position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)"}}
                                >
                                    <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255, 255, 255, 0.2)"
                                            strokeWidth="4"/>
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="48"
                                        fill="none"
                                        stroke="rgb(46, 177, 116)"
                                        strokeWidth="4"
                                        strokeDasharray={`${(module.progress || 20) * 3.02} 302`}
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </Box>
                        </Box>


                        {/* Video card */}
                        <Box
                            sx={{
                                paddingTop: "32px",
                                paddingLeft: "40px",
                                paddingRight: "40px",
                                paddingBottom: "24px",
                                backgroundColor: "white",
                                borderRadius: "16px",
                                overflow: "hidden",
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                            }}
                            className="dark:bg-gray-800"
                        >
                            {/* Video title */}
                            <Box sx={{padding: "0 20px 20px 0"}}>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: "500",
                                        fontSize: {xs: "1rem", sm: "1.45rem"},
                                    }}
                                    className="dark:text-white"
                                >
                                    {entity?.title}
                                </Typography>
                            </Box>

                            {/* Video player */}
                            <Box
                                sx={{
                                    position: "relative",
                                    width: "100%",
                                    backgroundColor: "#000",
                                }}
                            >
                                <CustomVideoPlayer onProgressCheckpoint={(e) => {
                                    console.log(e);
                                    if (e == 97) {
                                        toast.success(
                                            <div className="font-bold text-center">
                                                <b>Lektion erfolgreich absolviert</b>
                                            </div>
                                        );
                                    }
                                }}
                                                   url={"https://vz-2086756f-fef.b-cdn.net/41b4459e-2b73-438d-9e30-403a101c2c7e/play_720p.mp4"}
                                ></CustomVideoPlayer>
                            </Box>

                            <Divider sx={{marginTop: "28px"}} orientation="horizontal" flexitem/>

                            {/* Action buttons */}
                            <Box
                                sx={{
                                    padding: "20px 0 0 0",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    borderTop: "1px solid #f0f0f0",
                                }}
                                className="dark:border-gray-700"
                            >
                                <Box sx={{display: "flex", alignItems: "center", gap: "15px"}}>
                                    {/* Bookmark button */}
                                    <IconButton size="small" sx={{color: "#757575"}} className="dark:text-gray-400">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </IconButton>

                                    {/* Feedback button */}
                                    <Button
                                        variant="text"
                                        startIcon={
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M11 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V14"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M18 2L22 6M22 2L18 6"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        }
                                        sx={{
                                            color: "#757575",
                                            textTransform: "none",
                                            fontSize: {xs: "0.75rem", sm: "0.875rem"},
                                        }}
                                        className="dark:text-gray-400"
                                    >
                                        {t.feedbackGive}
                                    </Button>
                                </Box>

                                {/* Complete lesson button */}
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "rgb(46, 177, 116)",
                                        color: "white",
                                        borderRadius: "8px",
                                        padding: "6px 16px",
                                        textTransform: "none",
                                        lineHeight: "1.4",
                                        minWidth: "64px",
                                        height: "40px",
                                        fontSize: {xs: "0.75rem", sm: "0.875rem"},
                                        "&:hover": {
                                            backgroundColor: "rgb(36,141,92)",
                                        },
                                    }}
                                >
                                    {t.completeLesson}
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={{marginLeft: "8px"}}
                                    >
                                        <path
                                            d="M5 12L10 17L20 7"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </Button>
                            </Box>
                        </Box>

                        {/* Next lesson preview */}
                        {nextLesson && (
                            <Box
                                sx={{
                                    backgroundColor: "#f9f9f9",
                                    borderRadius: "15px",
                                    padding: "15px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "15px",
                                    cursor: "pointer",
                                    "&:hover": {
                                        backgroundColor: "#f5f5f5",
                                    },
                                }}
                                className="dark:bg-gray-700 dark:hover:bg-gray-600"
                                onClick={() => router.push(`/dashboard/courses/${id}/modules/${moduleId}/lessons/${nextLesson.id}`)}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: "bold",
                                        color: "#757575",
                                        letterSpacing: "0.5px",
                                        fontSize: {xs: "0.65rem", sm: "0.75rem"},
                                    }}
                                    className="dark:text-gray-400"
                                >
                                    {t.nextLesson}
                                </Typography>

                                <Box
                                    sx={{
                                        width: "80px",
                                        height: "45px",
                                        borderRadius: "5px",
                                        overflow: "hidden",
                                        position: "relative",
                                        flexShrink: 0,
                                    }}
                                >
                                    <Image
                                        src={nextLesson.thumbnail || "/placeholder.svg"}
                                        alt={nextLesson.title}
                                        fill
                                        style={{objectFit: "cover"}}
                                    />
                                </Box>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: "500",
                                        flex: 1,
                                        fontSize: {xs: "0.75rem", sm: "0.875rem"},
                                    }}
                                    className="dark:text-white"
                                >
                                    {nextLesson.title}
                                </Typography>

                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9 18L15 12L9 6"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Box>
                        )}
                    </Box>
                )}

                {/* Right side - Lesson list */}
                {(!isMobile || activeTab === "lessons") && (
                    <Box
                        sx={{
                            flex: {xs: "1", md: "35%"},
                            background: "transparent",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        className="dark:bg-gray-800"
                    >
                        {/* Module header */}
                        <Box
                            sx={{
                                padding: "15px",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                            }}
                            className="dark:border-gray-700"
                        >
                            <Box
                                sx={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    backgroundColor: "#f0f0f0",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                className="dark:bg-gray-700"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Box>

                            <Box>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: "500",
                                        fontSize: {xs: "0.9rem", sm: "1.25rem"},
                                    }}
                                    className="dark:text-white"
                                >
                                    {module.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "#757575",
                                        fontSize: {xs: "0.7rem", sm: "0.875rem"},
                                    }}
                                    className="dark:text-gray-400"
                                >
                                    {module.totalLessons} {t.lessons}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Lesson list */}
                        <Box
                            sx={{
                                flex: 1,
                                overflowY: "auto",
                                maxHeight: {xs: "400px", md: "600px"},
                            }}
                        >
                            {module.courses_module_groups?.map((section, sectionIndex) => (
                                <Box key={`section-${sectionIndex}`}>
                                    {section.courses_entities.map((lesson, lessonIndex) => (
                                        <Box
                                            key={`lesson-${lesson.id}`}
                                            sx={{
                                                padding: "15px",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "15px",
                                                cursor: "pointer",
                                                borderLeft: lesson.active ? "4px solid #2196f3" : "4px solid transparent",
                                                backgroundColor: lesson.active ? "#f5f9ff" : "transparent",
                                                "&:hover": {
                                                    backgroundColor: lesson.active ? "#f5f9ff" : "#f9f9f9",
                                                },
                                            }}
                                            className={`dark:hover:bg-gray-700 ${lesson.active ? "dark:bg-gray-700" : ""}`}
                                            onClick={() => router.push(`/dashboard/courses/${id}/modules/${moduleId}/lessons/${lesson.id}`)}
                                        >
                                            <Box
                                                sx={{
                                                    width: "80px",
                                                    height: "45px",
                                                    borderRadius: "5px",
                                                    overflow: "hidden",
                                                    position: "relative",
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <Image
                                                    src={lesson.thumbnail || "/placeholder.svg"}
                                                    alt={lesson.title}
                                                    fill
                                                    style={{objectFit: "cover"}}
                                                />
                                                {lesson.completed && (
                                                    <Box
                                                        sx={{
                                                            position: "absolute",
                                                            bottom: "5px",
                                                            right: "5px",
                                                            width: "20px",
                                                            height: "20px",
                                                            borderRadius: "50%",
                                                            backgroundColor: "#2196f3",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <svg
                                                            width="12"
                                                            height="12"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
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
                                                variant="body2"
                                                sx={{
                                                    fontWeight: lesson.active ? "500" : "400",
                                                    color: lesson.active ? "#2196f3" : "#333",
                                                    fontSize: {xs: "0.75rem", sm: "0.875rem"},
                                                }}
                                                className={`${lesson.active ? "dark:text-blue-400" : "dark:text-white"}`}
                                            >
                                                {lesson.title}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            ))}
                        </Box>

                        {/* Next section button */}
                        <Box
                            sx={{
                                padding: "15px",
                                borderTop: "1px solid #f0f0f0",
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                            className="dark:border-gray-700"
                        >
                            <Button
                                variant="text"
                                endIcon={
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9 18L15 12L9 6"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                }
                                sx={{
                                    color: "#757575",
                                    textTransform: "none",
                                    fontSize: {xs: "0.75rem", sm: "0.875rem"},
                                }}
                                className="dark:text-gray-400"
                            >
                                {t.nextSection}
                            </Button>
                        </Box>
                    </Box>
                ) as React.ReactNode}
            </Box>
        </Box>
    )
}

