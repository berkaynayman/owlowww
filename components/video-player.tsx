"use client"

import { useState } from "react"
import { Box, Typography, Button } from "@/components/ui/mui"
import Image from "next/image"

interface VideoPlayerProps {
  title: string
  videoUrl?: string
  thumbnailUrl: string
}

export default function VideoPlayer({ title, videoUrl, thumbnailUrl }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <Box
      sx={{ width: "100%", borderRadius: "8px", overflow: "hidden", backgroundColor: "white" }}
      className="dark:bg-gray-900"
    >
      <Box sx={{ padding: { xs: "12px", sm: "20px" } }}>
        <Typography
          variant="h5"
          component="h1"
          className="dark:text-white"
          sx={{ fontSize: { xs: "1.1rem", sm: "1.5rem" } }}
        >
          {title}
        </Typography>
      </Box>

      <Box sx={{ position: "relative", width: "100%", height: "0", paddingBottom: "56.25%", backgroundColor: "#000" }}>
        {isPlaying && videoUrl ? (
          <iframe
            src={videoUrl}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => videoUrl && setIsPlaying(true)}
          >
            <Image src={thumbnailUrl || "/placeholder.svg"} alt={title} fill style={{ objectFit: "cover" }} />
            <Box
              sx={{
                position: "absolute",
                width: { xs: "60px", sm: "80px" },
                height: { xs: "60px", sm: "80px" },
                borderRadius: "50%",
                backgroundColor: "rgba(0,0,0,0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3L19 12L5 21V3Z" fill="white" />
              </svg>
            </Box>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          padding: { xs: "12px", sm: "20px" },
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Button
          variant="text"
          startIcon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          className="dark:text-white"
        >
          Feedback geben
        </Button>

        <Button
          variant="contained"
          endIcon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 12L19 12M19 12L12 5M19 12L12 19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          sx={{
            backgroundColor: "rgb(46, 177, 116)",
            "&:hover": { backgroundColor: "#388e3c" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          Lektion abschließen
        </Button>
      </Box>
    </Box>
  )
}

