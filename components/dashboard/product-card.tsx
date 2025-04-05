"use client"

import Image from "next/image"
import Link from "next/link"
import {Box, Typography} from "@/components/ui/mui"
import {useLanguage} from "@/contexts/language-context"

interface ProductCardProps {
    id: string
    title: string
    image?: string
    progress: number
}

export default function ProductCard({id, title, image, progress}: ProductCardProps) {
    const {language} = useLanguage()

    // Use the new microphone image as default
    const productImage =
        image || "/images/image-webinar.png"

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
        <Link href={`/dashboard/courses/${id}`} style={{textDecoration: "none"}}>
            <Box
                sx={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    width: "100%", // Make it take full width of its container
                    height: "100%", // Make it take full height of its container
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
                    },
                }}
                className="dark:bg-gray-900 dark:border dark:border-gray-800"
            >
                {/* Image container with progress bar */}
                <Box sx={{position: "relative", width: "100%", marginBottom: "10px"}}>
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            paddingTop: "65%", // 4:3 aspect ratio
                            border: "1px solid rgb(224, 224, 224)",
                            borderRadius: "8px",
                            overflow: "hidden",
                        }}
                        className="dark:border-gray-700"
                    >
                        <Image
                            src={productImage || "/placeholder.svg"}
                            alt={title}
                            fill
                            style={{
                                objectFit: "contain",
                                padding: "15px",
                                width:"100%",
                                aspectRatio: "16/9",
                                borderRadius: "6px"
                            }}
                        />

                        {/* Progress bar at the bottom of the image */}
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                height: "4px",
                                backgroundColor: "#e0e0e0",
                            }}
                            className="dark:bg-gray-700"
                        >
                            <Box
                                sx={{
                                    height: "100%",
                                    width: `${progress || 0}%`,
                                    backgroundColor: "#4caf50",
                                }}
                            />
                        </Box>
                    </Box>
                </Box>

                {/* Title and progress text */}
                <Box sx={{padding: "0 5px 5px"}}>
                    <Typography
                        variant="subtitle1"
                        component="h3"
                        sx={{
                            fontSize: "18px",
                            fontWeight: 500,
                            color: "#333",
                        }}
                        className="dark:text-white"
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color: "#4caf50",
                            fontWeight: 500,
                            fontSize: "12px",
                        }}
                    >
                        {progress || 0}% {t.progress}
                    </Typography>
                </Box>
            </Box>
        </Link>
    )
}

