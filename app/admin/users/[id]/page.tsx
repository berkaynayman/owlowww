"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Chip,
  IconButton,
  Divider,
  FormControl,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material"
import {
  Edit as EditIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
  Add as AddIcon,
} from "@mui/icons-material"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import Link from "next/link"

// Mock data for users
const mockUsers = {
  "1": {
    id: "1",
    name: "Julia Blechschmidt",
    firstName: "Julia",
    lastName: "Blechschmidt",
    email: "julia.blechschmidt@owlaw.de",
    role: "admin",
    status: "active",
    created: "23.01.25, 12:49",
    updated: "23.01.25, 12:49",
    lastLogin: "20.03.25, 19:11",
    logins: 13,
    devices: [
      {
        name: "Chrome Windows",
        lastUsed: "20.02.25, 19:26",
      },
    ],
    access: [
      {
        type: "Admin",
        courses: 9,
        created: "23.01.2025",
        validUntil: "",
        portals: ["Kunden", "Onboarding"],
        courses: [
          {
            id: "c1",
            name: "[MASTER] Export Essentials",
            status: "Noch nicht begonnen",
            firstGranted: "23.01.25, 12:49",
            startDate: "23.01.2025",
            image: "/images/export-essentials-cover.png",
          },
          {
            id: "c2",
            name: "[MASTER] Import Essentials",
            status: "Noch nicht begonnen",
            firstGranted: "23.01.25, 12:49",
            startDate: "23.01.2025",
            image: "/images/export-essentials-cover.png",
          },
        ],
      },
    ],
    progress: [
      {
        id: "c1",
        name: "[MASTER] Export Essentials",
        status: "0/0 Lektionen abgeschlossen",
        progress: 0,
        date: "23.01.2025",
        image: "/images/export-essentials-cover.png",
      },
      {
        id: "c2",
        name: "[MASTER] Import Essentials",
        status: "0/0 Lektionen abgeschlossen",
        progress: 0,
        date: "23.01.2025",
        image: "/images/export-essentials-cover.png",
      },
      {
        id: "c3",
        name: "GS Autoteile Export Essentials",
        status: "0/12 Lektionen abgeschlossen",
        progress: 0,
        date: "23.01.2025",
        image: "/images/export-essentials-cover.png",
      },
      {
        id: "c4",
        name: "Riegler Import Essentials",
        status: "0/9 Lektionen abgeschlossen",
        progress: 0,
        date: "23.01.2025",
        image: "/images/export-essentials-cover.png",
      },
      {
        id: "c5",
        name: "F+S Import Essentials",
        status: "0/7 Lektionen abgeschlossen",
        progress: 0,
        date: "23.01.2025",
        image: "/images/export-essentials-cover.png",
      },
    ],
  },
}

export default function UserDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState(0)
  const [user, setUser] = useState(mockUsers[id as string])
  const [expandedAccess, setExpandedAccess] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState("")

  const translations = {
    de: {
      back: "Zurück",
      lastLogin: "Letzter Login am",
      tabs: {
        information: "Informationen",
        access: "Freischaltung",
        notifications: "Benachrichtigungen",
        settings: "Einstellungen",
        fingerprint: "Fingerprint",
        results: "Ergebnisse",
      },
      memberData: "Mitgliedsdaten",
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail",
      cancel: "Abbrechen",
      save: "Speichern",
      properties: "Eigenschaften",
      noProperties: "Keine mitgliederspezifischen Eigenschaften definiert.",
      addProperty: "Neue Eigenschaft hinzufügen",
      progress: "Fortschritt",
      course: "Kurs",
      releasedOn: "Freigegeben am",
      actions: "Aktionen",
      loginAs: "Als Mitglied anmelden",
      changePassword: "Passwort ändern",
      additionalInfo: "Zusätzliche Informationen",
      logins: "Logins",
      created: "Erstellt",
      updated: "Aktualisiert",
      status: "Status",
      active: "Aktiv",
      activeDevices: "Aktive Geräte",
      showMore: "Mehr anzeigen",
      deleteUser: "Mitglied löschen",
      accesses: "Zugänge",
      newAccess: "Neuen Zugang freischalten",
      admin: "Admin",
      courses: "Kurse",
      validUntil: "Gültig bis",
      addDate: "Datum hinzufügen",
      origin: "Herkunft",
      reference: "Referenz",
      portals: "Portale",
      name: "Name",
      firstGranted: "Erstmals gewährt",
      start: "Start",
    },
    en: {
      back: "Back",
      lastLogin: "Last login on",
      tabs: {
        information: "Information",
        access: "Access",
        notifications: "Notifications",
        settings: "Settings",
        fingerprint: "Fingerprint",
        results: "Results",
      },
      memberData: "Member Data",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      cancel: "Cancel",
      save: "Save",
      properties: "Properties",
      noProperties: "No member-specific properties defined.",
      addProperty: "Add new property",
      progress: "Progress",
      course: "Course",
      releasedOn: "Released on",
      actions: "Actions",
      loginAs: "Login as member",
      changePassword: "Change password",
      additionalInfo: "Additional Information",
      logins: "Logins",
      created: "Created",
      updated: "Updated",
      status: "Status",
      active: "Active",
      activeDevices: "Active Devices",
      showMore: "Show more",
      deleteUser: "Delete member",
      accesses: "Accesses",
      newAccess: "Add new access",
      admin: "Admin",
      courses: "Courses",
      validUntil: "Valid until",
      addDate: "Add date",
      origin: "Origin",
      reference: "Reference",
      portals: "Portals",
      name: "Name",
      firstGranted: "First granted",
      start: "Start",
    },
  }

  const t = translations[language]

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleToggleAccess = () => {
    setExpandedAccess(!expandedAccess)
  }

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<KeyboardArrowRightIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 3 }}
        className="dark:text-gray-400"
      >
        <MuiLink
          component={Link}
          href="/admin"
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          className="dark:text-gray-300 dark:hover:text-gray-200"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        </MuiLink>
        <MuiLink
          component={Link}
          href="/admin/users"
          underline="hover"
          color="inherit"
          className="dark:text-gray-300 dark:hover:text-gray-200"
        >
          {user?.name}
        </MuiLink>
        {activeTab === 1 && (
          <Typography color="text.primary" className="dark:text-white">
            {t.tabs.access}
          </Typography>
        )}
      </Breadcrumbs>

      {/* User Profile Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            bgcolor: "#6b7280",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 3,
          }}
        >
          <Image src="/placeholder.svg?height=80&width=80" alt={user?.name} width={80} height={80} />
        </Box>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Typography variant="h4" component="h1" className="dark:text-white">
              {user?.name}
            </Typography>
            <Chip
              label="Admin"
              size="small"
              sx={{
                bgcolor: "#e0e7ff",
                color: "#4a7bff",
                fontWeight: "medium",
                fontSize: "0.75rem",
              }}
              className="dark:bg-blue-900 dark:text-blue-300"
            />
          </Box>
          <Typography variant="body2" color="text.secondary" className="dark:text-gray-400">
            {t.lastLogin} {user?.lastLogin}
          </Typography>
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              minWidth: "auto",
              px: 3,
              py: 2,
            },
            "& .Mui-selected": {
              color: "#4a7bff",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#4a7bff",
            },
          }}
        >
          <Tab label={t.tabs.information} className={activeTab === 0 ? "dark:text-blue-400" : "dark:text-gray-400"} />
          <Tab label={t.tabs.access} className={activeTab === 1 ? "dark:text-blue-400" : "dark:text-gray-400"} />
          <Tab label={t.tabs.notifications} className={activeTab === 2 ? "dark:text-blue-400" : "dark:text-gray-400"} />
        </Tabs>
      </Box>

      {/* Information Tab Content */}
      {activeTab === 0 && (
        <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>
          {/* Left Column */}
          <Box sx={{ flex: 2 }}>
            {/* Member Data */}
            <Paper sx={{ p: 3, mb: 3 }} className="dark:bg-gray-900 dark:border dark:border-gray-700">
              <Typography variant="h6" sx={{ mb: 3 }} className="dark:text-white">
                {t.memberData}
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ mb: 1 }} className="dark:text-gray-400">
                    {t.firstName}
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={user?.firstName}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          size="small"
                          sx={{ bgcolor: "#ef4444", color: "white" }}
                          className="dark:text-gray-400"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      ),
                      className: "dark:bg-gray-800 dark:text-white",
                    }}
                    className="dark:border-gray-700"
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ mb: 1 }} className="dark:text-gray-400">
                    {t.lastName}
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={user?.lastName}
                    InputProps={{ className: "dark:bg-gray-800 dark:text-white" }}
                    className="dark:border-gray-700"
                  />
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 1 }} className="dark:text-gray-400">
                  {t.email}
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={user?.email}
                  InputProps={{ className: "dark:bg-gray-800 dark:text-white" }}
                  className="dark:border-gray-700"
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                  variant="outlined"
                  sx={{ textTransform: "none" }}
                  className="dark:border-gray-600 dark:text-gray-300"
                >
                  {t.cancel}
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#4a7bff",
                    "&:hover": { bgcolor: "#3a6ae8" },
                    textTransform: "none",
                  }}
                  className="dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  {t.save}
                </Button>
              </Box>
            </Paper>

            {/* Properties */}
            <Paper sx={{ p: 3, mb: 3 }} className="dark:bg-gray-900 dark:border dark:border-gray-700">
              <Typography variant="h6" sx={{ mb: 3 }} className="dark:text-white">
                {t.properties}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }} className="dark:text-gray-400">
                {t.noProperties}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                  variant="text"
                  sx={{ color: "#4a7bff", textTransform: "none" }}
                  className="dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {t.addProperty}
                </Button>
                <Button
                  variant="outlined"
                  sx={{ textTransform: "none" }}
                  className="dark:border-gray-600 dark:text-gray-300"
                >
                  {t.cancel}
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#4a7bff",
                    "&:hover": { bgcolor: "#3a6ae8" },
                    textTransform: "none",
                  }}
                  className="dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  {t.save}
                </Button>
              </Box>
            </Paper>

            {/* Progress */}
            <Paper sx={{ p: 3, mb: 3 }} className="dark:bg-gray-900 dark:border dark:border-gray-700">
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h6" className="dark:text-white">
                  {t.progress}
                </Typography>
                <Box>
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <Select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      displayEmpty
                      renderValue={(selected) => (selected ? selected : t.course)}
                      sx={{ borderRadius: "8px" }}
                      className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
                    >
                      <MenuItem value="" className="dark:text-white dark:hover:bg-gray-700">
                        {t.course}
                      </MenuItem>
                      {user?.progress.map((course) => (
                        <MenuItem key={course.id} value={course.id} className="dark:text-white dark:hover:bg-gray-700">
                          {course.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              <TableContainer className="dark:bg-gray-900 dark:text-white">
                <Table>
                  <TableHead className="dark:border-gray-700 dark:text-gray-300">
                    <TableRow className="dark:text-white dark:hover:bg-gray-800">
                      <TableCell className="dark:border-gray-700">{t.course}</TableCell>
                      <TableCell className="dark:border-gray-700">{t.releasedOn}</TableCell>
                      <TableCell className="dark:border-gray-700">{t.progress}</TableCell>
                      <TableCell className="dark:border-gray-700"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user?.progress.map((course) => (
                      <TableRow key={course.id} className="dark:text-white dark:hover:bg-gray-800">
                        <TableCell className="dark:border-gray-700">
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Box sx={{ width: 40, height: 40, position: "relative" }}>
                              <Image
                                src={course.image || "/placeholder.svg"}
                                alt={course.name}
                                fill
                                style={{ objectFit: "cover" }}
                              />
                            </Box>
                            <Box>
                              <Typography variant="body2" className="dark:text-gray-300">
                                {course.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" className="dark:text-gray-400">
                                {course.status}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell className="dark:border-gray-700 dark:text-gray-300">{course.date}</TableCell>
                        <TableCell className="dark:border-gray-700">
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box sx={{ width: 100 }}>
                              <LinearProgress
                                variant="determinate"
                                value={course.progress}
                                sx={{
                                  height: 8,
                                  borderRadius: 4,
                                  bgcolor: "#e5e7eb",
                                  "& .MuiLinearProgress-bar": {
                                    bgcolor: "#4a7bff",
                                  },
                                }}
                                className="dark:bg-gray-700"
                              />
                            </Box>
                            <Typography variant="body2" className="dark:text-gray-300">
                              {course.progress}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell className="dark:border-gray-700">
                          <IconButton className="dark:text-gray-400">
                            <KeyboardArrowRightIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Typography variant="body2" color="text.secondary" className="dark:text-gray-400">
                  1 - 5 von 9
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton size="small" disabled className="dark:text-gray-400">
                    <KeyboardArrowRightIcon sx={{ transform: "rotate(180deg)" }} />
                  </IconButton>
                  <IconButton size="small" className="dark:text-gray-400">
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Right Column */}
          <Box sx={{ flex: 1 }}>
            {/* Actions */}
            <Paper sx={{ p: 3, mb: 3 }} className="dark:bg-gray-900 dark:border dark:border-gray-700">
              <Typography variant="h6" sx={{ mb: 2 }} className="dark:text-white">
                {t.actions}
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<LoginIcon />}
                  fullWidth
                  sx={{ justifyContent: "flex-start", textTransform: "none" }}
                  className="dark:border-gray-600 dark:text-gray-300"
                >
                  {t.loginAs}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<LockIcon />}
                  fullWidth
                  sx={{ justifyContent: "flex-start", textTransform: "none" }}
                  endIcon={<KeyboardArrowRightIcon />}
                  className="dark:border-gray-600 dark:text-gray-300"
                >
                  {t.changePassword}
                </Button>
              </Box>
            </Paper>

            {/* Additional Information */}
            <Paper sx={{ p: 3, mb: 3 }} className="dark:bg-gray-900 dark:border dark:border-gray-700">
              <Typography variant="h6" sx={{ mb: 2 }} className="dark:text-white">
                {t.additionalInfo}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary" className="dark:text-gray-400">
                  {t.logins}
                </Typography>
                <Typography variant="body2" className="dark:text-gray-300">
                  {user?.logins}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary" className="dark:text-gray-400">
                  {t.lastLogin}
                </Typography>
                <Typography variant="body2" className="dark:text-gray-300">
                  {user?.lastLogin}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} className="dark:border-gray-700" />

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary" className="dark:text-gray-400">
                  {t.created}
                </Typography>
                <Typography variant="body2" className="dark:text-gray-300">
                  {user?.created}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary" className="dark:text-gray-400">
                  {t.updated}
                </Typography>
                <Typography variant="body2" className="dark:text-gray-300">
                  {user?.updated}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} className="dark:border-gray-700" />

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary" className="dark:text-gray-400">
                  {t.status}
                </Typography>
                <Typography variant="body2" className="dark:text-gray-300">
                  {t.active}
                </Typography>
              </Box>
            </Paper>

            {/* Active Devices */}
            <Paper sx={{ p: 3, mb: 3 }} className="dark:bg-gray-900 dark:border dark:border-gray-700">
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h6" className="dark:text-white">
                  {t.activeDevices}
                </Typography>
                <Button
                  variant="text"
                  sx={{ color: "#4a7bff", textTransform: "none" }}
                  className="dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {t.showMore}
                </Button>
              </Box>

              {user?.devices.map((device, index) => (
                <Box key={index} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ComputerIcon />
                    <Typography variant="body2" className="dark:text-gray-300">
                      {device.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2" className="dark:text-gray-300">
                      {device.lastUsed}
                    </Typography>
                    <IconButton size="small" className="dark:text-gray-400">
                      <SettingsIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Paper>

            {/* Delete User */}
            <Button
              variant="outlined"
              color="error"
              fullWidth
              sx={{ textTransform: "none" }}
              className="dark:border-gray-600 dark:text-red-400"
            >
              {t.deleteUser}
            </Button>
          </Box>
        </Box>
      )}

      {/* Access Tab Content */}
      {activeTab === 1 && (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h5" className="dark:text-white">
              {t.accesses}
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                bgcolor: "#4a7bff",
                "&:hover": { bgcolor: "#3a6ae8" },
                textTransform: "none",
                borderRadius: "50px",
              }}
              className="dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {t.newAccess}
            </Button>
          </Box>

          <Paper sx={{ mb: 3, overflow: "hidden" }} className="dark:bg-gray-900 dark:border dark:border-gray-700">
            <Box
              sx={{
                p: 3,
                cursor: "pointer",
                "&:hover": { bgcolor: "#f9fafb" },
              }}
              onClick={handleToggleAccess}
              className="dark:hover:bg-gray-800"
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h6" className="dark:text-white">
                    {t.admin}
                  </Typography>
                  <Typography variant="body2" className="dark:text-gray-300">
                    9 {t.courses} • {t.created} Jan. 23, 2025, 12:49
                  </Typography>
                </Box>
                <IconButton className="dark:text-gray-400">
                  {expandedAccess ? <KeyboardArrowUpIcon /> : <KeyboardArrowRightIcon />}
                </IconButton>
              </Box>
            </Box>

            {expandedAccess && (
              <Box sx={{ px: 3, pb: 3 }}>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
                  <Box sx={{ flex: "1 1 200px" }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} className="dark:text-gray-400">
                      23.01.2025
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="dark:text-gray-400">
                      {t.created}
                    </Typography>
                  </Box>

                  <Box sx={{ flex: "1 1 200px" }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} className="dark:text-gray-400">
                      <Button
                        variant="text"
                        sx={{ color: "#4a7bff", textTransform: "none", p: 0 }}
                        className="dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {t.addDate}
                      </Button>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="dark:text-gray-400">
                      {t.validUntil}
                    </Typography>
                  </Box>

                  <Box sx={{ flex: "1 1 200px" }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} className="dark:text-gray-400">
                      Admin {t.access}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="dark:text-gray-400">
                      {t.origin}
                    </Typography>
                  </Box>

                  <Box sx={{ flex: "1 1 200px" }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} className="dark:text-gray-400">
                      -
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="dark:text-gray-400">
                      {t.reference}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} className="dark:text-gray-400">
                  {t.portals}
                </Typography>

                <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                  {user?.access[0].portals.map((portal, index) => (
                    <Chip
                      key={index}
                      label={portal}
                      sx={{
                        bgcolor: "#f3f4f6",
                        color: "#4b5563",
                      }}
                      className="dark:bg-blue-900 dark:text-blue-300"
                    />
                  ))}
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} className="dark:text-gray-400">
                  {t.courses}
                </Typography>

                <TableContainer className="dark:bg-gray-900 dark:text-white">
                  <Table>
                    <TableHead className="dark:border-gray-700 dark:text-gray-300">
                      <TableRow className="dark:text-white dark:hover:bg-gray-800">
                        <TableCell className="dark:border-gray-700">{t.name}</TableCell>
                        <TableCell className="dark:border-gray-700">{t.firstGranted}</TableCell>
                        <TableCell className="dark:border-gray-700">{t.start}</TableCell>
                        <TableCell align="right" className="dark:border-gray-700">
                          {t.actions}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {user?.access[0].courses.map((course) => (
                        <TableRow key={course.id} className="dark:text-white dark:hover:bg-gray-800">
                          <TableCell className="dark:border-gray-700">
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <Box sx={{ width: 40, height: 40, position: "relative" }}>
                                <Image
                                  src={course.image || "/placeholder.svg"}
                                  alt={course.name}
                                  fill
                                  style={{ objectFit: "cover" }}
                                />
                              </Box>
                              <Box>
                                <Typography variant="body2" className="dark:text-gray-300">
                                  {course.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" className="dark:text-gray-400">
                                  {course.status}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell className="dark:border-gray-700 dark:text-gray-300">
                            {course.firstGranted}
                          </TableCell>
                          <TableCell className="dark:border-gray-700 dark:text-gray-300">{course.startDate}</TableCell>
                          <TableCell align="right" className="dark:border-gray-700">
                            <IconButton className="dark:text-gray-400">
                              <EditIcon />
                            </IconButton>
                            <IconButton className="dark:text-gray-400">
                              <RefreshIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Paper>
        </Box>
      )}
    </Box>
  )
}

// Custom icon components
function LoginIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 17L15 12L10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  )
}

function ComputerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 4H4C2.89543 4 2 4.89543 2 6V15C2 16.1046 2.89543 17 4 17H20C21.1046 17 22 16.1046 22 15V6C22 4.89543 21.1046 4 20 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function RefreshIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23 4V10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 20V14H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M3.51 9.00001C4.01717 7.56682 4.87913 6.2789 6.01547 5.27549C7.1518 4.27208 8.52547 3.58195 10.0083 3.26763C11.4911 2.95331 13.0348 3.02301 14.4761 3.46928C15.9175 3.91555 17.2137 4.72049 18.24 5.80001L23 10M1 14L5.76 18.2C6.78626 19.2795 8.08247 20.0845 9.52384 20.5307C10.9652 20.977 12.5089 21.0467 13.9917 20.7324C15.4745 20.4181 16.8482 19.7279 17.9845 18.7245C19.1209 17.7211 19.9828 16.4332 20.49 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

