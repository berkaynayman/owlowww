"use client"

import {useState} from "react"
import {useParams} from "next/navigation"
import {Box, Typography} from "@/components/ui/mui"
import {useLanguage} from "@/contexts/language-context"
import ModuleCard from "@/components/dashboard/module-card"
import {useMobile} from "@/hooks/use-mobile"
import {getCourse} from "@/services/courseService";
import CourseHeaderCard from "@/components/components/CourseHeaderCard";
import ContinueNextLessonCard from "@/components/components/ContinueNextLessonCard";
import LoadingSpinner from "@/components/loading-spinner";
import {useFetch} from "@/hooks/useFetch";

export default function ProductDetailPage() {
    const params = useParams()
    const {id} = params
    const {language} = useLanguage()
    const [activeTab, setActiveTab] = useState("dashboard")
    const isMobile = useMobile()
    const {data: course, loading} = useFetch(() => getCourse(id), [])

    const translations = {
        de: {
            course: "KURS",
            progress: "FORTSCHRITT",
            description: "Beschreibung",
            dashboard: "Dashboard",
            information: "Information",
            bookmarks: "Lesezeichen",
            continueDirectly: "MACHE DIREKT WEITER!",
            continueButton: "Weiterlernen",
            module: "Module",
        },
        en: {
            course: "COURSE",
            progress: "PROGRESS",
            description: "Description",
            dashboard: "Dashboard",
            information: "Information",
            bookmarks: "Bookmarks",
            continueDirectly: "CONTINUE DIRECTLY!",
            continueButton: "Continue learning",
            module: "Modules",
        },
    }
    const t = translations[language]


    return (
        loading ? <LoadingSpinner message="Lade Kurs..."/> :
            <Box sx={{maxWidth: "1200px", margin: "auto", padding: {xs: "12px", sm: "20px"}}}>

                <CourseHeaderCard course={course} t={t}></CourseHeaderCard>
                {/* Tabs Section - Responsive */}
                <Box
                    sx={{
                        display: "flex",
                        padding: {xs: "6px", sm: "10px 20px"},
                        gap: {xs: "6px", sm: "10px"},
                        backgroundColor: "white",
                        borderRadius: {xs: "10px", sm: "15px"},
                        marginBottom: {xs: "16px", sm: "20px"},
                        flexWrap: "nowrap",
                        overflowX: "auto",
                        WebkitOverflowScrolling: "touch", // For smooth scrolling on iOS
                        msOverflowStyle: "none", // Hide scrollbar in IE and Edge
                        scrollbarWidth: "none", // Hide scrollbar in Firefox
                        "&::-webkit-scrollbar": {
                            // Hide scrollbar in Chrome, Safari, and Opera
                            display: "none",
                        },
                    }}
                    className="dark:bg-gray-800"
                >
                    {/* Dashboard Tab */}
                    <Box
                        onClick={() => setActiveTab("dashboard")}
                        sx={{
                            backgroundColor: activeTab === "dashboard" ? "#9e9e9e" : "#e0e0e0",
                            padding: {xs: "6px 10px", sm: "10px 20px"},
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            gap: {xs: "4px", sm: "8px"},
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            minWidth: "fit-content",
                            "&:hover": {
                                backgroundColor: activeTab === "dashboard" ? "#9e9e9e" : "#d5d5d5",
                            },
                        }}
                        className={activeTab === "dashboard" ? "dark:bg-gray-600" : "dark:bg-gray-700"}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                                stroke="#333"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 500,
                                color: "#333",
                                fontSize: {xs: "11px", sm: "14px"}, // Reduced from 12px to 11px
                            }}
                            className="dark:text-white"
                        >
                            {t.dashboard}
                        </Typography>
                    </Box>

                    {/* Information Tab */}
                    <Box
                        onClick={() => setActiveTab("information")}
                        sx={{
                            backgroundColor: activeTab === "information" ? "#9e9e9e" : "#e0e0e0",
                            padding: {xs: "6px 10px", sm: "10px 20px"},
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            gap: {xs: "4px", sm: "8px"},
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            minWidth: "fit-content",
                            "&:hover": {
                                backgroundColor: activeTab === "information" ? "#9e9e9e" : "#d5d5d5",
                            },
                        }}
                        className={activeTab === "information" ? "dark:bg-gray-600" : "dark:bg-gray-700"}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                                stroke="#333"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                stroke="#333"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 500,
                                color: "#333",
                                fontSize: {xs: "11px", sm: "14px"}, // Reduced from 12px to 11px
                            }}
                            className="dark:text-white"
                        >
                            {t.information}
                        </Typography>
                    </Box>

                    {/* Bookmarks Tab */}
                    <Box
                        onClick={() => setActiveTab("bookmarks")}
                        sx={{
                            backgroundColor: activeTab === "bookmarks" ? "#9e9e9e" : "#e0e0e0",
                            padding: {xs: "6px 10px", sm: "10px 20px"},
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            gap: {xs: "4px", sm: "8px"},
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            minWidth: "fit-content",
                            "&:hover": {
                                backgroundColor: activeTab === "bookmarks" ? "#9e9e9e" : "#d5d5d5",
                            },
                        }}
                        className={activeTab === "bookmarks" ? "dark:bg-gray-600" : "dark:bg-gray-700"}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
                                stroke="#333"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 500,
                                color: "#333",
                                fontSize: {xs: "11px", sm: "14px"}, // Reduced from 12px to 11px
                            }}
                            className="dark:text-white"
                        >
                            {t.bookmarks}
                        </Typography>
                    </Box>
                </Box>

                {/* Continue Learning Section - Responsive */}
                {(activeTab !== "information") && (
                    <ContinueNextLessonCard continueButtonText={t.continueButton} continueLabel={t.continueDirectly}
                                            title={course?.title}></ContinueNextLessonCard>
                ) as React.ReactNode}

                {/* Content based on active tab */}
                <Box
                    sx={{
                        borderRadius: {xs: "10px", sm: "15px"},
                        minHeight: "300px",
                    }}
                    className="dark:text-white"
                >
                    {activeTab === "dashboard" && (
                        <><Box>
                            {/* Module section */}
                            <Box sx={{marginTop: {xs: "8px", sm: "10px"}}}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: {xs: "16px", sm: "20px"},
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: "4px",
                                            height: "24px",
                                            backgroundColor: "#333",
                                            marginRight: "10px",
                                            flexShrink: 0,
                                        }}
                                        className="dark:bg-gray-400"
                                    />
                                    <Typography
                                        variant="h5"
                                        component="h2"
                                        sx={{
                                            fontSize: {xs: "16px", sm: "24px"}, // Reduced from 18px to 16px
                                            lineHeight: 1.4,
                                            wordBreak: "break-word",
                                        }}
                                    >
                                        {t.module}
                                    </Typography>
                                </Box>

                                {/* Module cards */}
                                {course?.course_modules?.map((module) => (
                                    <ModuleCard
                                        key={module.id}
                                        id={module?.id}
                                        courseId={course?.id as string}
                                        title={module.title}
                                        lessons={module?.lessons}
                                        duration={module?.duration}
                                        progress={module.progress}
                                    />
                                ) as React.ReactNode)}
                            </Box>

                            <Typography
                                variant="body1"
                                sx={{
                                    marginTop: "20px",
                                    fontSize: {xs: "13px", sm: "16px"}, // Reduced from 14px to 13px
                                    lineHeight: 1.6,
                                    wordBreak: "break-word",
                                }}
                            >
                                {course.short_description}
                            </Typography>
                        </Box></>
                    ) as React.ReactNode}

                    {activeTab === "information" && (
                        <>LEER</>
                    ) as React.ReactNode}

                    {activeTab === "bookmarks" && (
                        <Box
                            sx={{
                                backgroundColor: "white",
                                borderRadius: {xs: "10px", sm: "15px"},
                                padding: {xs: "16px", sm: "20px"},
                            }}
                            className="dark:bg-gray-800"
                        >
                            <Typography
                                variant="h5"
                                component="h2"
                                sx={{
                                    marginBottom: "20px",
                                    fontSize: {xs: "18px", sm: "24px"},
                                    lineHeight: 1.4,
                                    wordBreak: "break-word",
                                }}
                            >
                                {t.bookmarks}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: {xs: "14px", sm: "16px"},
                                    lineHeight: 1.6,
                                    wordBreak: "break-word",
                                }}
                            >
                                {t.description}: {course.short_description}
                            </Typography>
                        </Box>
                    ) as React.ReactNode}
                </Box>
            </Box>
    )
}

