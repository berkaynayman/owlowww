"use client"

import {Box, Typography} from "@/components/ui/mui"
import ProductCard from "@/components/dashboard/product-card"
import WelcomeWidget from "@/components/dashboard/welcome-widget"
import {useLanguage} from "@/contexts/language-context"
import {getCourses} from "@/services/courseService";
import {useAuth} from "@/contexts/AuthContext";
import {useFetch} from "@/hooks/useFetch";

export default function DashboardPage() {
    const {language} = useLanguage()
    const {data: courses, loading} = useFetch(() => getCourses(false), [])
    const {user} = useAuth();
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
            {/* Main Content */}
            <Box
                sx={{
                    maxWidth: "1500px",
                    margin: "auto",
                    padding: "0 16px", // Add padding to prevent edge-to-edge content
                }}
            >
                {/* Welcome Widget */}
                <WelcomeWidget userName={(user?.firstname + " " + user?.lastname).trim()}/>

                {/* Courses Section */}
                <Box
                    sx={{borderLeft: "4px solid #333", paddingLeft: "16px", marginBottom: "32px"}}
                    className="dark:border-gray-400"
                >
                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                            fontWeight: 500,
                            color: "#333",
                        }}
                        className="dark:text-white"
                    >
                        {t.myCourses}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        margin: "-12px", // Negative margin to offset the padding of items
                        width: "calc(100% + 24px)", // Compensate for the negative margin
                    }}
                >
                    <>{courses?.map((course, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: {
                                    xs: "100%", // 1 column on extra small screens
                                    sm: "50%", // 2 columns on small screens

                                    xl: "25%", // 5 columns on extra large screens
                                },
                                padding: "12px", // Padding creates the gap between items
                            }}
                        >
                            <ProductCard id={`${course.id}`} title={course.title} progress={course.progress}/>
                        </Box>
                    ))}</>
                </Box>
            </Box>
        </Box>
    )
}

