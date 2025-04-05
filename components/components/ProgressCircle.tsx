"use client";

import { Box, Typography } from "@/components/ui/mui";

interface ProgressCircleProps {
    percentage: number;
    size?: number;
    strokeColor?: string;
    bgColor?: string;
    textColor?: string;
}

const ProgressCircle = ({
                            percentage,
                            size = 80,
                            strokeColor = "#4caf50",
                            bgColor = "#e0e0e0",
                            textColor = "#4caf50",
                        }: ProgressCircleProps) => {
    const strokeWidth = size * 0.1;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <Box sx={{ position: "relative", width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {/* Background Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={bgColor}
                    strokeWidth={strokeWidth}
                    className="dark:stroke-gray-700"
                />

                {/* Progress Arc */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </svg>

            {/* Center Text */}
            <Typography
                variant="h6"
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontWeight: "bold",
                    fontSize: size * 0.25,
                    color: textColor,
                }}
            >
                {Math.round(percentage) || 0}%
            </Typography>
        </Box>
    );
};

export default ProgressCircle;
