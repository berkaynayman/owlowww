"use client"
import Link from "next/link"
import {Box, Typography} from "@/components/ui/mui"
import {useLanguage} from "@/contexts/language-context"
import Image from "next/image";

interface ModuleCardProps {
    id: string
    courseId: string
    title: string
    lessons: number
    duration: number
    progress: number
    image?: string
}

export default function ModuleCard({
                                       id,
                                       courseId,
                                       number,
                                       title,
                                       lessons,
                                       duration,
                                       progress,
                                       image,
                                   }: ModuleCardProps) {
    const {language} = useLanguage()

    const translations = {
        de: {
            module: "Modul",
            lessons: "LEKTIONEN",
            min: "MIN.",
        },
        en: {
            module: "Module",
            lessons: "LESSONS",
            min: "MIN.",
        },
    }

    const t = translations[language]

    return (
        <Link href={`/dashboard/courses/${courseId}/modules/${id}`} style={{textDecoration: "none"}}>
            <Box
                sx={{
                    backgroundColor: "white",
                    borderRadius: "15px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    marginBottom: "16px",
                    "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    },
                    padding: "12px 16px 12px 12px",
                    display: "flex",
                    flexDirection: {xs: "column", sm: "row"}, // Stack vertically on mobile, horizontal on tablet/desktop
                    alignItems: "stretch",
                    height: {xs: "auto", sm: "120px"}, // Auto height on mobile, fixed on tablet/desktop
                    position: "relative",
                }}
                className="dark:bg-gray-900 dark:border dark:border-gray-800"
            >
                {/* Left side - Module thumbnail */}
                <Box
                    sx={{
                        width: {xs: "100%", sm: "180px"}, // Full width on mobile
                        backgroundColor: "#f5f5f5",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        position: "relative",
                        overflow: "hidden",
                        padding: "16px",
                        borderRadius: {xs: "15px 15px 0 0", sm: "15px 0 0 15px", md: "8px"}, // Different border radius on mobile
                        marginRight: {xs: 0, sm: "16px"}, // No margin on mobile
                    }}
                    className="dark:bg-gray-800"
                >
                    <Image
                        src={image || "/images/moduleimg.png"}
                        alt={title}
                        fill
                        style={{objectFit: "cover"}}
                    />
                </Box>

                {/* Right side - Module info */}
                <Box
                    sx={{
                        flex: 1,
                        padding: {xs: "16px", sm: "24px"}, // Less padding on mobile
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        position: "relative", // For positioning the progress circle
                    }}
                >
                    {/* Desktop info - hidden on mobile */}
                    <Box sx={{display: {xs: "none", sm: "block"}}}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "500",
                                color: "#333",
                                marginBottom: "8px",
                            }}
                            className="dark:text-white"
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: "#666",
                            }}
                            className="dark:text-gray-400"
                        >
                            {lessons} {t.lessons} | {duration} {t.min}
                        </Typography>
                    </Box>

                    {/* Progress circle */}
                    <Box
                        sx={{
                            position: {xs: "absolute", sm: "relative"}, // Absolute position on mobile
                            top: {xs: "16px", sm: "auto"}, // Position at top on mobile
                            right: {xs: "16px", sm: "auto"}, // Position at right on mobile
                            width: {xs: "50px", sm: "60px"}, // Smaller on mobile
                            height: {xs: "50px", sm: "60px"}, // Smaller on mobile
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "white",
                            border: "1px solid #f0f0f0",
                            zIndex: 1, // Ensure it's above other elements
                        }}
                        className="dark:bg-gray-800 dark:border-gray-700"
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: {xs: "44px", sm: "54px"}, // Smaller on mobile
                                height: {xs: "44px", sm: "54px"}, // Smaller on mobile
                                borderRadius: "50%",
                                border: "2px solid #f0f0f0",
                                "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    top: "-2px",
                                    left: "-2px",
                                    width: {xs: "44px", sm: "54px"}, // Smaller on mobile
                                    height: {xs: "44px", sm: "54px"}, // Smaller on mobile
                                    borderRadius: "50%",
                                    border: "2px solid transparent",
                                    borderTopColor: "#4caf50",
                                    borderRightColor: progress >= 25 ? "#4caf50" : "transparent",
                                    borderBottomColor: progress >= 50 ? "#4caf50" : "transparent",
                                    borderLeftColor: progress >= 75 ? "#4caf50" : "transparent",
                                    transform: `rotate(${progress * 3.6}deg)`,
                                    boxSizing: "border-box",
                                },
                            }}
                            className="dark:border-gray-700"
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: "bold",
                                color: "#4caf50",
                                fontSize: {xs: "12px", sm: "14px"}, // Smaller on mobile
                            }}
                        >
                            {progress || 0}%
                        </Typography>
                    </Box>
                </Box>

                {/* Mobile-only info section at bottom */}
                <Box
                    sx={{
                        padding: "16px",
                        borderTop: "1px solid #f0f0f0",
                        display: {xs: "block", sm: "none"}, // Only show on mobile
                    }}
                    className="dark:border-gray-700"
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "500",
                            color: "#333",
                            marginBottom: "8px",
                            fontSize: "16px", // Smaller on mobile
                        }}
                        className="dark:text-white"
                    >
                        {t.module} {number} | {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "#666",
                        }}
                        className="dark:text-gray-400"
                    >
                        {lessons} {t.lessons} | {duration} {t.min}
                    </Typography>
                </Box>
            </Box>
        </Link>
    )
}

