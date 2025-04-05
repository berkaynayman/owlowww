"use client"

import { Box, Typography } from "@/components/ui/mui"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import Link from "next/link"
import { Button, IconButton } from "@mui/material"
import { useState } from "react"

// Sample bookmark data
const bookmarks = [
  {
    id: "webinar-masterclass",
    title: "Webinar Masterclass",
    subtitle: "8 LESEZEICHEN",
    image: "..",
  },
  {
    id: "one-click-registration",
    title: "One-Click-Registration",
    subtitle: "One-Click-Registration",
    image: "/placeholder.svg?height=80&width=120",
  },
  {
    id: "retargeting-follow-up",
    title: "Retargeting und Follow-Up",
    subtitle: "Retargeting und Follow-Up",
    image: "/placeholder.svg?height=80&width=120",
  },
  {
    id: "retargeting-follow-up-examples",
    title: "Retargeting und Follow-Up Praxisbeispiele",
    subtitle: "Retargeting und Follow-Up Praxisbeispiele",
    image: "/placeholder.svg?height=80&width=120",
  },
  {
    id: "ad-setup",
    title: "Ad-Setup",
    subtitle: "Ad-Setup",
    image: "/placeholder.svg?height=80&width=120",
  },
  {
    id: "bestandskunden-anrufen",
    title: "Bestandskunden Anrufen",
    subtitle: "Bestandskunden Anrufen",
    image: "/placeholder.svg?height=80&width=120",
  },
  {
    id: "youtube-videos",
    title: "YouTube-Videos",
    subtitle: "YouTube-Videos",
    image: "/placeholder.svg?height=80&width=120",
  },
  {
    id: "instagram-stories",
    title: "Instagram-Stories",
    subtitle: "Instagram-Stories",
    image: "/placeholder.svg?height=80&width=120",
  },
  {
    id: "banner-homepage",
    title: "Banner auf der Homepage",
    subtitle: "Banner auf der Homepage",
    image: "/placeholder.svg?height=80&width=120",
  },
]

export default function BookmarksPage() {
  const { language } = useLanguage()
  const [isListVisible, setIsListVisible] = useState(true)

  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible)
  }

  const translations = {
    de: {
      bookmarks: "Lesezeichen",
      bookmarksInCourses: "Lesezeichen in Ihren Kursen",
      dashboard: "Dashboard",
      sortByModules: "Nach Modulen sortieren",
    },
    en: {
      bookmarks: "Bookmarks",
      bookmarksInCourses: "Bookmarks in your courses",
      dashboard: "Dashboard",
      sortByModules: "Sort by modules",
    },
  }

  const t = translations[language]

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          maxWidth: "1500px",
          margin: "auto",
        }}
      >
        {/* Page Title */}
        <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
          {t.bookmarks}
        </Typography>

        {/* Breadcrumbs */}
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <Typography
              variant="body2"
              sx={{ color: "#666", "&:hover": { textDecoration: "underline" } }}
              className="dark:text-gray-400"
            >
              {t.dashboard}
            </Typography>
          </Link>
          <Box component="span" sx={{ mx: 1, color: "#666" }} className="dark:text-gray-400">
            &gt;
          </Box>
          <Typography variant="body2" sx={{ color: "#666" }} className="dark:text-gray-400">
            {t.bookmarks}
          </Typography>
        </Box>

        {/* Section Title with left border */}
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
          <Box
            sx={{ width: "4px", height: "24px", backgroundColor: "#333", marginRight: 2 }}
            className="dark:bg-gray-400"
          />
          <Typography variant="h5" component="h2">
            {t.bookmarksInCourses}
          </Typography>
        </Box>

        {/* Bookmarks List Container */}
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "10px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          }}
          className="dark:bg-gray-900 dark:border dark:border-gray-800"
        >
          {/* First bookmark with sort option (Header - #1) */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              padding: "15px",
              borderBottom: isListVisible ? "1px solid #f0f0f0" : "none",
              gap: { xs: 2, sm: 0 },
            }}
            className="dark:border-gray-700"
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: { xs: "100%", sm: "auto" } }}>
              <Box sx={{ width: 80, height: 60, position: "relative", borderRadius: "4px", overflow: "hidden" }}>
                <Image
                  src={bookmarks[0].image || "/placeholder.svg"}
                  alt={bookmarks[0].title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>
              <Box>
                <Typography variant="h6" className="dark:text-white">
                  {bookmarks[0].title}
                </Typography>
                <Typography variant="caption" sx={{ color: "#757575" }} className="dark:text-gray-400">
                  {bookmarks[0].subtitle}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                width: { xs: "100%", sm: "auto" },
                justifyContent: { xs: "space-between", sm: "flex-end" },
              }}
            >
              <Button
                variant="text"
                startIcon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3 6H21M3 12H21M3 18H21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                sx={{ color: "#666" }}
                className="dark:text-gray-400"
              >
                {t.sortByModules}
              </Button>

              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton size="small" className="dark:text-gray-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15 3H21V9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 21H3V15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 3L14 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 21L10 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </IconButton>

                <IconButton size="small" className="dark:text-gray-400" onClick={toggleListVisibility}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      transform: isListVisible ? "rotate(0deg)" : "rotate(180deg)",
                      transition: "transform 0.3s",
                    }}
                  >
                    <path
                      d="M18 15L12 9L6 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* Rest of the bookmarks (List - #2) */}
          {isListVisible && (
            <>
              {bookmarks.slice(1).map((bookmark, index) => (
                <Box
                  key={bookmark.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: { xs: "10px", sm: "15px" },
                    borderBottom: index < bookmarks.length - 2 ? "1px solid #f0f0f0" : "none",
                    "&:hover": { backgroundColor: "#f9f9f9" },
                  }}
                  className="dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{ width: 80, height: 60, position: "relative", borderRadius: "4px", overflow: "hidden" }}>
                      <Image
                        src={bookmark.image || "/placeholder.svg"}
                        alt={bookmark.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        className="dark:text-white"
                        sx={{
                          fontSize: { xs: "0.9rem", sm: "1.25rem" },
                          lineHeight: { xs: 1.2, sm: 1.5 },
                        }}
                      >
                        {bookmark.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "#757575" }}
                        className="dark:text-gray-400"
                        sx={{
                          color: "#757575",
                          fontSize: { xs: "0.7rem", sm: "0.75rem" },
                          lineHeight: { xs: 1.2, sm: 1.5 },
                        }}
                      >
                        {bookmark.subtitle}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      backgroundColor: "rgba(0, 200, 150, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#00c896",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Box>
                </Box>
              ))}
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}

