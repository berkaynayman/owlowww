"use client"

import { Box, Typography } from "@/components/ui/mui"
import { useLanguage } from "@/contexts/language-context"
import WeeklyCalls from "@/components/dashboard/weekly-calls"
import MonthlyCall from "@/components/dashboard/monthly-call"
import CourseContents from "@/components/dashboard/course-contents"

export default function PlaybookPage() {
  const { language } = useLanguage()

  const translations = {
    de: {
      welcome: "Willkommen in Ihrem O&W Essentials-Hub!",
      description:
        "Hier sind alle Links und Informationen zu unserer Zusammenarbeit. Unter anderem finden Sie hier Ihre Kommunikationswege, Kursinhalte und vieles mehr!",
      playbook: "O&W Essentials-Hub",
      dashboard: "Dashboard",
    },
    en: {
      welcome: "Welcome to your O&W Essentials Hub!",
      description:
        "Here are all links and information about our collaboration. Among other things, you'll find your communication channels, course content, and much more!",
      playbook: "O&W Essentials Hub",
      dashboard: "Dashboard",
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
        {/* Breadcrumbs */}
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
          <Typography
            variant="body2"
            component="a"
            href="/dashboard"
            sx={{
              color: "#666",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
            className="dark:text-gray-400"
          >
            {t.dashboard}
          </Typography>
          <Box component="span" sx={{ mx: 1, color: "#666" }} className="dark:text-gray-400">
            &gt;
          </Box>
          <Typography variant="body2" sx={{ color: "#666" }} className="dark:text-gray-400">
            {t.playbook}
          </Typography>
        </Box>

        {/* Hero Banner with Gradient Background */}
        <Box
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            marginBottom: 4,
            position: "relative",
            background:
              "linear-gradient( 90deg, rgba(4, 0, 14, 0.8) 0%, rgba(0, 92, 127, 0.8) 35%, rgba(3, 12, 31, 0.8) 100% );",
            padding: { xs: "24px", md: "32px" },
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "60%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right center",
              backgroundSize: "contain",
              opacity: 0.7,
              zIndex: 0,
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                color: "white",
                fontWeight: 500,
                marginBottom: 2,
                fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
              }}
            >
              {t.welcome}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "white",
                maxWidth: "600px",
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              {t.description}
            </Typography>
          </Box>
        </Box>

        {/* Important Links and Coaches Section - MOVED UP */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              marginBottom: 3,
              fontWeight: 500,
              borderLeft: "4px solid #333",
              paddingLeft: 2,
            }}
            className="dark:border-gray-400"
          >
            {language === "de"
              ? "Die wichtigsten Links und Ihre Anwälte"
              : "The most important links and your lawyers"}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
              gap: 3,
            }}
          >
            {/* Support Team Card */}
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "20px",
                border: "1px solid #e0e0e0" ,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
              className="dark:bg-gray-900 dark:border-gray-700"
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  marginBottom: 2,
                  overflow: "hidden",
                }}
              >
                <img
                  src=".."
                  alt="VIP Support"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Typography variant="h6" sx={{ marginBottom: 1 }} className="dark:text-white">
                {language === "de" ? "Ihr Support Team" : "Ihr Support Team"}
              </Typography>
              <Typography variant="body2" sx={{ color: "#757575", marginBottom: 2 }} className="dark:text-gray-400">
                VIP Support
              </Typography>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "#f5f5f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="dark:bg-gray-800"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                    stroke="#757575"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 6L12 13L2 6"
                    stroke="#757575"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Box>
            </Box>

            {/* Feedback Card */}
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "20px",
                border: "1px solid #e0e0e0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
              className="dark:bg-gray-900 dark:border-gray-700"
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "10px",
                  marginBottom: 2,
                  overflow: "hidden",
                }}
              >
                <img
                  src=".."
                  alt="Feedback"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Typography variant="h6" sx={{ marginBottom: 1 }} className="dark:text-white">
                {language === "de" ? "Sie haben Feedback?" : "Do you have feedback?"}
              </Typography>
              <Typography variant="body2" sx={{ color: "#757575" }} className="dark:text-gray-400">
                {language === "de"
                  ? "Sagen Sie uns Ihre Meinung, damit Ihre Erfahrung noch besser wird."
                  : "Tell us your opinion so your experience can be even better."}
              </Typography>
            </Box>

            {/* Jannik Löhr Card */}
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "20px",
                border: "1px solid #e0e0e0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
              className="dark:bg-gray-900 dark:border-gray-700"
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginBottom: 2,
                }}
              >
                <img
                  src="/images/tristan-wegner.png"
                  alt="Dr. Tristan Wegner"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Typography variant="h6" sx={{ marginBottom: 1 }} className="dark:text-white">
                  Dr. Tristan Wegner
              </Typography>
              <Typography variant="body2" sx={{ color: "#757575" }} className="dark:text-gray-400">
                {language === "de" ? "Transportrecht & Zollrecht" : "Transport- and Customs law"}
              </Typography>
            </Box>

            {/* AS Card */}
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "20px",
                border: "1px solid #e0e0e0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
              className="dark:bg-gray-900 dark:border-gray-700"
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginBottom: 2,
                }}
              >
                <img
                  src="/images/anton-schmoll.png"
                  alt="Anton Schmoll"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Typography variant="h6" sx={{ marginBottom: 1 }} className="dark:text-white">
                Anton Schmoll
              </Typography>
              <Typography variant="body2" sx={{ color: "#757575" }} className="dark:text-gray-400">
                {language === "de" ? "Zollrecht" : "Customs law"}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Weekly Live Calls Section */}
        <WeeklyCalls />

        {/* Monthly Live Call Section */}
        <MonthlyCall />

        {/* Course Contents Section */}
        <CourseContents />
      </Box>
    </Box>
  )
}

