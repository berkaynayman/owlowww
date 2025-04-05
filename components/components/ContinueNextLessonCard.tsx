"use client";

import { Box, Typography } from "@/components/ui/mui";
import Image from "next/image";
import { Button } from "@/components/ui/mui"; // or your own button if customized
import Link from "next/link";

interface ContinueNextLessonCardProps {
    imageUrl?: string;
    title: string;
    continueLabel: string;
    continueButtonText: string;
    href?: string;
}

const ContinueNextLessonCard = ({
                            imageUrl = "/placeholder.svg",
                            title,
                            continueLabel,
                            continueButtonText,
                            href = "#",
                        }: ContinueNextLessonCardProps) => {
    return (
        <Box
            sx={{
                backgroundColor: "#868686",
                borderRadius: { xs: "10px", sm: "15px" },
                width: "100%",
                padding: { xs: "8px", sm: "10px 18px" },
                marginBottom: { xs: "16px", sm: "20px" },
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
                gap: { xs: "12px", sm: "0" },
            }}
            className="dark:bg-gray-700"
        >
            {/* Left side with thumbnail and text */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: { xs: "100%", sm: "auto" },
                }}
            >
                {/* Thumbnail */}
                <Box
                    sx={{
                        width: { xs: "60px", sm: "80px" },
                        height: { xs: "45px", sm: "60px" },
                        backgroundColor: "#333",
                        borderRadius: "5px",
                        marginRight: "15px",
                        overflow: "hidden",
                        position: "relative",
                        flexShrink: 0,
                    }}
                >
                    <Image
                        src={imageUrl}
                        alt="Next lesson thumbnail"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </Box>

                {/* Text content */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                        variant="caption"
                        sx={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "12px",
                            display: "block",
                        }}
                    >
                        {continueLabel}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: "white",
                            fontWeight: "medium",
                            fontSize: { xs: "13px", sm: "16px" },
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            wordBreak: "break-word",
                        }}
                    >
                        {title}
                    </Typography>
                </Box>
            </Box>

            {/* Continue button */}
            <Link href={href} passHref>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "white",
                        color: "#333",
                        borderRadius: "8px",
                        padding: "8px 16px",
                        textTransform: "none",
                        fontWeight: "medium",
                        "&:hover": {
                            backgroundColor: "#f0f0f0",
                        },
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        alignSelf: { xs: "flex-end", sm: "auto" },
                        minWidth: { xs: "auto", sm: "150px" },
                        whiteSpace: "nowrap",
                    }}
                >
                    {continueButtonText}
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 12H19M19 12L12 5M19 12L12 19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Button>
            </Link>
        </Box>
    );
};

export default ContinueNextLessonCard;
