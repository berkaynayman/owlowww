// Add 'use client' directive to the profile page
"use client"

import { Box, Typography } from "@/components/ui/mui"
import { useLanguage } from "@/contexts/language-context"

export default function ProfilePage() {
  const { language } = useLanguage()

  const translations = {
    de: {
      profile: "Profil",
      personalInfo: "Persönliche Informationen",
      name: "Name: Tristan Wegner",
      email: "E-Mail: tristan.wegner@owlaw.de",
    },
    en: {
      profile: "Profile",
      personalInfo: "Personal Information",
      name: "Name: Tristan Wegner",
      email: "Email: tristan.wegner@owlaw.de",
    },
  }

  const t = translations[language]

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ marginBottom: 4 }} className="dark:text-white">
        {t.profile}
      </Typography>

      <Box
        sx={{ backgroundColor: "white", padding: 3, borderRadius: 2, boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)" }}
        className="dark:bg-gray-900 dark:text-white dark:shadow-gray-800"
      >
        <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }} className="dark:text-white">
          {t.personalInfo}
        </Typography>
        <Typography variant="body1" className="dark:text-gray-300">
          {t.name}
        </Typography>
        <Typography variant="body1" className="dark:text-gray-300">
          {t.email}
        </Typography>
      </Box>
    </Box>
  )
}

