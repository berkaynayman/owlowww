"use client";

import {Box, Typography} from "@/components/ui/mui";
import Image from "next/image";
import {useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import ProgressCircle from "@/components/components/ProgressCircle";

interface CourseHeaderCardProps {
    course: {
        title: string;
        image_url?: string;
        progress?: number;
    };
    t: {
        course: string;
    };
    displayProgress?: boolean;
    use?: string;
}

export default function CourseHeaderCard({course, t, displayProgress, use}: CourseHeaderCardProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box
            sx={{
                borderRadius: {xs: "10px", sm: "15px"},
                overflow: "hidden",
                marginBottom: {xs: "16px", sm: "20px"},
                width: "100%",
                display: "flex",
                flexDirection: {xs: "column", sm: "row"},
                position: "relative",
            }}
        >
            {/* Background Blur Image */}
            <div
                style={{
                    inset: 0,
                    filter: "blur(20px)",
                    position: "absolute",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    background: `url(${course.image_url || "/images/image-webinar.png"})`,
                }}
            ></div>

            {/* Overlay with content */}
            <Box
                sx={{
                    inset: 0,
                    background: use == "dark" ? "rgba(0, 0, 0, 0.6)" : "rgba(80, 80, 80, 0.6)",
                    zIndex: 10,
                    padding: {xs: "16px", sm: "20px"},
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flex: 1,
                        flexDirection: {xs: "column", sm: "row"},
                        gap: {xs: "16px", sm: "20px"},
                        alignItems: {xs: "center"},
                        width: "100%",
                    }}
                >
                    {/* Left - Image */}
                    <Box
                        sx={{
                            width: {xs: "120px", sm: use == "dark" ? "200px" : "250px"},
                            backgroundColor: "white",
                            borderRadius: "12px",
                            aspectRatio: "1.6 / 1",
                            overflow: "hidden",
                            position: "relative",
                            flexShrink: 0,
                        }}
                    >
                        <Image
                            src={course.image_url || "/images/moduleimg.png"}
                            alt={course.title}
                            fill
                            style={{objectFit: "contain"}}
                        />
                    </Box>

                    {/* Middle - Text */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            textAlign: {xs: "center", sm: "left"},
                            flex: 1,
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: {xs: "12px", sm: "0.75rem"},
                                marginBottom: "5px",
                            }}
                        >
                            {t.course}
                        </Typography>
                        <Typography
                            variant="h3"
                            component="h3"
                            sx={{
                                fontWeight: 400,
                                color: "white",
                                fontSize: {xs: "18px", sm: "1.5rem"},
                                lineHeight: {xs: 1.3, sm: 1.5},
                                wordBreak: "break-word",
                                hyphens: "auto",
                            }}
                        >
                            {course.title}
                        </Typography>
                        {use == "dark" && (<Typography
                            variant="caption"
                            component={"h6"}
                            sx={{
                                color: "rgba(255, 255, 255, 0.6)",
                                fontSize: {xs: "12px", sm: "0.75rem"},
                                marginBottom: "5px",
                            }}
                        >
                            9 Lektionen | 75 Minuten
                        </Typography>) as React.ReactNode}
                    </Box>

                    {/* Right - Progress */}
                    {displayProgress && (<Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: {xs: "8px", sm: 0},
                        }}
                    >
                        <ProgressCircle
                            percentage={course.progress || 0}
                            size={isMobile ? 60 : 100}
                        />
                    </Box>) as React.ReactNode}
                </Box>
            </Box>
        </Box>
    );
}
