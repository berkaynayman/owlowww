"use client"

import { useState } from "react"
import { Box, Typography, Button, TextField } from "@/components/ui/mui"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export default function AccountSettingsPage() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState("general")

  // Form state
  const [firstName, setFirstName] = useState("Tristan")
  const [lastName, setLastName] = useState("Wegner")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [email, setEmail] = useState("tristan.wegner@owlaw.de")
  const [position, setPosition] = useState("")
  const [about, setAbout] = useState("")

  const translations = {
    de: {
      account: "Konto",
      dashboard: "Dashboard",
      settings: "Einstellungen",
      accountSettings: "Account-Einstellungen",
      personalSettings: "Persönliche Einstellungen",
      personalSettingsDesc:
        "Änderen Sie Ihre Informationen, Ihr Profilbild und Ihre persönlichen Einstellungen innerhalb der Plattform.",
      tabs: {
        general: "Allgemein",
        notifications: "Benachrichtigungen",
        devices: "Geräte",
      },
      profilePicture: "Dein Profilbild",
      clickToChange: "Klicke, um zu ändern",
      personalInfo: "Persönliche Informationen",
      firstName: "Vorname",
      lastName: "Nachname",
      phone: "Telefonnummer",
      city: "Stadt",
      email: "E-Mail",
      position: "Position / Beruf",
      about: "Über",
      changeEmail: "E-Mail ändern",
      changePassword: "Passwort ändern",
      saveChanges: "Änderungen speichern",
    },
    en: {
      account: "Account",
      dashboard: "Dashboard",
      settings: "Settings",
      accountSettings: "Account Settings",
      personalSettings: "Personal Settings",
      personalSettingsDesc: "Change your information, profile picture, and personal settings within the platform.",
      tabs: {
        general: "General",
        notifications: "Notifications",
        devices: "Devices",
      },
      profilePicture: "Your Profile Picture",
      clickToChange: "Click to change",
      personalInfo: "Personal Information",
      firstName: "First Name",
      lastName: "Last Name",
      phone: "Phone Number",
      city: "City",
      email: "Email",
      position: "Position / Profession",
      about: "About",
      changeEmail: "Change Email",
      changePassword: "Change Password",
      saveChanges: "Save Changes",
    },
  }

  const t = translations[language]

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f5f5f5" }} className="dark:bg-gray-800 min-h-screen">
      <Box
        sx={{
          maxWidth: "1500px",
          margin: "auto",
        }}
      >
        {/* Page Title */}
        <Typography variant="h4" component="h1" sx={{ marginBottom: 1, fontWeight: 500 }} className="dark:text-white">
          {t.account}
        </Typography>

        {/* Breadcrumbs */}
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
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
          <Link href="/dashboard/settings" style={{ textDecoration: "none" }}>
            <Typography
              variant="body2"
              sx={{ color: "#666", "&:hover": { textDecoration: "underline" } }}
              className="dark:text-gray-400"
            >
              {t.settings}
            </Typography>
          </Link>
          <Box component="span" sx={{ mx: 1, color: "#666" }} className="dark:text-gray-400">
            &gt;
          </Box>
          <Typography variant="body2" sx={{ color: "#666" }} className="dark:text-gray-400">
            {t.accountSettings}
          </Typography>
        </Box>

        {/* Banner */}
        <Box
          sx={{
            backgroundColor: "#868686",
            borderRadius: "8px",
            padding: "24px",
            display: "flex",
            alignItems: "center",
            gap: 3,
            marginBottom: 3,
          }}
          className="dark:bg-gray-700"
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
          <Box>
            <Typography variant="h5" sx={{ color: "white", fontWeight: 500, marginBottom: 0.5 }}>
              {t.personalSettings}
            </Typography>
            <Typography variant="body2" sx={{ color: "white" }}>
              {t.personalSettingsDesc}
            </Typography>
          </Box>
        </Box>

        {/* Tabs */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            marginBottom: 3,
          }}
        >
          <Button
            variant={activeTab === "general" ? "contained" : "text"}
            onClick={() => setActiveTab("general")}
            sx={{
              backgroundColor: activeTab === "general" ? "white" : "transparent",
              color: activeTab === "general" ? "#333" : "#666",
              borderRadius: "50px",
              padding: "8px 16px",
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: activeTab === "general" ? "white" : "rgba(255, 255, 255, 0.1)",
                boxShadow: "none",
              },
            }}
            className={activeTab === "general" ? "dark:bg-gray-700 dark:text-white" : "dark:text-gray-300"}
            startIcon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            {t.tabs.general}
          </Button>

          <Button
            variant={activeTab === "notifications" ? "contained" : "text"}
            onClick={() => setActiveTab("notifications")}
            sx={{
              backgroundColor: activeTab === "notifications" ? "white" : "transparent",
              color: activeTab === "notifications" ? "#333" : "#666",
              borderRadius: "50px",
              padding: "8px 16px",
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: activeTab === "notifications" ? "white" : "rgba(255, 255, 255, 0.1)",
                boxShadow: "none",
              },
            }}
            className={activeTab === "notifications" ? "dark:bg-gray-700 dark:text-white" : "dark:text-gray-300"}
            startIcon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            {t.tabs.notifications}
          </Button>

          <Button
            variant={activeTab === "devices" ? "contained" : "text"}
            onClick={() => setActiveTab("devices")}
            sx={{
              backgroundColor: activeTab === "devices" ? "white" : "transparent",
              color: activeTab === "devices" ? "#333" : "#666",
              borderRadius: "50px",
              padding: "8px 16px",
              textTransform: "none",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: activeTab === "devices" ? "white" : "rgba(255, 255, 255, 0.1)",
                boxShadow: "none",
              },
            }}
            className={activeTab === "devices" ? "dark:bg-gray-700 dark:text-white" : "dark:text-gray-300"}
            startIcon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          >
            {t.tabs.devices}
          </Button>
        </Box>

        {/* Main Content - Two Columns */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
          }}
        >
          {/* Left Column - Profile Picture */}
          <Box
            sx={{
              flex: { xs: "1 1 100%", md: "0 0 350px" },
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "fit-content",
            }}
            className="dark:bg-gray-900"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                marginBottom: 3,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                  stroke="#666666"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
                  stroke="#666666"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 15L16 10L5 21"
                  stroke="#666666"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Typography
                variant="h6"
                sx={{ marginLeft: 2, fontWeight: 500, color: "#666" }}
                className="dark:text-white"
              >
                {t.profilePicture}
              </Typography>
            </Box>

            <Box
              sx={{
                width: 200,
                height: 200,
                borderRadius: "50%",
                backgroundColor: "#868686",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "64px",
                marginBottom: 2,
                cursor: "pointer",
              }}
            >
              TW
            </Box>

            <Typography variant="body2" sx={{ color: "#666", cursor: "pointer" }} className="dark:text-gray-400">
              {t.clickToChange}
            </Typography>
          </Box>

          {/* Right Column - Personal Information */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "24px",
            }}
            className="dark:bg-gray-900"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                marginBottom: 3,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke="#666666"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                  stroke="#666666"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Typography
                variant="h6"
                sx={{ marginLeft: 2, fontWeight: 500, color: "#666" }}
                className="dark:text-white"
              >
                {t.personalInfo}
              </Typography>
            </Box>

            {/* Form Fields */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* First Name and Last Name */}
              <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ marginBottom: 1, color: "#666" }} className="dark:text-gray-300">
                    {t.firstName}
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#e0e0e0",
                        },
                      },
                    }}
                    className="dark:bg-gray-800"
                    InputProps={{
                      className: "dark:text-white",
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ marginBottom: 1, color: "#666" }} className="dark:text-gray-300">
                    {t.lastName}
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#e0e0e0",
                        },
                      },
                    }}
                    className="dark:bg-gray-800"
                    InputProps={{
                      className: "dark:text-white",
                    }}
                  />
                </Box>
              </Box>

              {/* Phone and City */}
              <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ marginBottom: 1, color: "#666" }} className="dark:text-gray-300">
                    {t.phone}
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#e0e0e0",
                        },
                      },
                    }}
                    className="dark:bg-gray-800"
                    InputProps={{
                      className: "dark:text-white",
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ marginBottom: 1, color: "#666" }} className="dark:text-gray-300">
                    {t.city}
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#e0e0e0",
                        },
                      },
                    }}
                    className="dark:bg-gray-800"
                    InputProps={{
                      className: "dark:text-white",
                    }}
                  />
                </Box>
              </Box>

              {/* Email */}
              <Box>
                <Typography variant="body2" sx={{ marginBottom: 1, color: "#666" }} className="dark:text-gray-300">
                  {t.email}
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#e0e0e0",
                      },
                    },
                  }}
                  className="dark:bg-gray-800"
                  InputProps={{
                    className: "dark:text-white",
                  }}
                />
              </Box>

              {/* Position */}
              <Box>
                <Typography variant="body2" sx={{ marginBottom: 1, color: "#666" }} className="dark:text-gray-300">
                  {t.position}
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#e0e0e0",
                      },
                    },
                  }}
                  className="dark:bg-gray-800"
                  InputProps={{
                    className: "dark:text-white",
                  }}
                />
              </Box>

              {/* About */}
              <Box>
                <Typography variant="body2" sx={{ marginBottom: 1, color: "#666" }} className="dark:text-gray-300">
                  {t.about}
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#e0e0e0",
                      },
                    },
                  }}
                  className="dark:bg-gray-800"
                  InputProps={{
                    className: "dark:text-white",
                  }}
                />
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, marginTop: 2 }}>
                <Button
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    borderColor: "#e0e0e0",
                    color: "#666",
                  }}
                  className="dark:border-gray-600 dark:text-gray-300"
                  startIcon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 6L12 13L2 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                >
                  {t.changeEmail}
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    borderColor: "#e0e0e0",
                    color: "#666",
                  }}
                  className="dark:border-gray-600 dark:text-gray-300"
                  startIcon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                >
                  {t.changePassword}
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#e0e0e0",
                    color: "#666",
                    "&:hover": {
                      backgroundColor: "#d0d0d0",
                    },
                  }}
                  className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  startIcon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 21V13H7V21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 16H17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                >
                  {t.saveChanges}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

