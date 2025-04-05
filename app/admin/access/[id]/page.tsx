"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  InputAdornment,
  TextField,
  Button,
  Tabs,
  Tab,
  Checkbox,
  Breadcrumbs,
  Avatar,
  Collapse,
} from "@mui/material"
import {
  Delete as DeleteIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import Link from "next/link"
import AccessSettingsDrawer from "@/components/admin/access-settings-drawer"

// Mock data for access details
const mockAccessDetails = {
  "1": {
    id: "1",
    name: 'Zugang: "Schwarze Liste" des Zolls - stehen wir drauf?',
    courses: [
      {
        id: "c1",
        name: '"Schwarze Liste" des Zolls - stehen wir drauf?',
        image: "/placeholder.svg?height=60&width=80",
      },
    ],
    members: [
      {
        id: "m1",
        name: "Emilia Rutgaiser",
        email: "emilia.rutgaiser@owlaw.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "m2",
        name: "Julia Blechschmidt",
        email: "julia.blechschmidt@owlaw.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "m3",
        name: "Max Mustermann",
        email: "max.mustermann@owlaw.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  "2": {
    id: "2",
    name: "Zugang: VIP-Erfolgspaket Webinar Sparen bei Zoll",
    courses: [
      {
        id: "c2",
        name: "VIP-Erfolgspaket Webinar Sparen bei Zoll",
        image: "/placeholder.svg?height=60&width=80",
      },
    ],
    members: [
      {
        id: "m1",
        name: "Emilia Rutgaiser",
        email: "emilia.rutgaiser@owlaw.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  "3": {
    id: "3",
    name: "Zugang: Zoll-Helpdesk: Live-Support",
    courses: [],
    members: [],
  },
  "4": {
    id: "4",
    name: "Zugang: Test",
    courses: [],
    members: [],
  },
}

export default function AccessDetailPage({ params }: { params: { id: string } }) {
  const { language } = useLanguage()
  const [tabValue, setTabValue] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [expandedMember, setExpandedMember] = useState<string | null>(null)

  const accessId = params.id
  const accessDetails = mockAccessDetails[accessId as keyof typeof mockAccessDetails] || {
    id: accessId,
    name: "Unknown Access",
    courses: [],
    members: [],
  }

  const translations = {
    de: {
      courses: "Kurse",
      members: "Mitglieder",
      searchPlaceholder: "Suche",
      add: "Hinzufügen",
      settings: "Einstellungen",
      name: "NAME",
      email: "E-MAIL",
      actions: "AKTIONEN",
      delete: "Löschen",
      back: "Zurück",
      noMembersFound: "Keine Mitglieder gefunden",
      noCoursesFound: "Keine Kurse gefunden",
    },
    en: {
      courses: "Courses",
      members: "Members",
      searchPlaceholder: "Search",
      add: "Add",
      settings: "Settings",
      name: "NAME",
      email: "E-MAIL",
      actions: "ACTIONS",
      delete: "Delete",
      back: "Back",
      noMembersFound: "No members found",
      noCoursesFound: "No courses found",
    },
  }

  const t = translations[language]

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    setSearchTerm("")
  }

  const handleDeleteCourse = (courseId: string) => {
    // In a real app, this would update the state and make an API call
    console.log(`Delete course ${courseId} from access ${accessId}`)
  }

  const handleDeleteMember = (memberId: string) => {
    // In a real app, this would update the state and make an API call
    console.log(`Delete member ${memberId} from access ${accessId}`)
  }

  const handleSettingsSave = (data: any) => {
    console.log("Saving settings:", data)
    // In a real app, this would update the state and make an API call
  }

  const handleExpandMember = (memberId: string) => {
    setExpandedMember(expandedMember === memberId ? null : memberId)
  }

  const filteredCourses = accessDetails.courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredMembers = accessDetails.members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const truncatedName =
    accessDetails.name.length > 30 ? accessDetails.name.substring(0, 30) + "..." : accessDetails.name

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* Breadcrumb navigation */}
      <Breadcrumbs sx={{ mb: 3 }} aria-label="breadcrumb">
        <Link href="/admin/access" passHref>
          <Typography
            component="span"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#6b7280",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            <Box
              component="span"
              sx={{
                display: "inline-block",
                width: 20,
                height: 20,
                bgcolor: "#e5e7eb",
                borderRadius: 1,
                mr: 1,
              }}
            />
          </Typography>
        </Link>
        <Typography color="text.primary">{truncatedName}</Typography>
      </Breadcrumbs>

      {/* Header with title and settings button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }} className="dark:text-white">
          {accessDetails.name}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<SettingsIcon />}
          onClick={() => setSettingsOpen(true)}
          sx={{
            borderColor: "#e5e7eb",
            color: "#374151",
            borderRadius: "8px",
            textTransform: "none",
          }}
        >
          {t.settings}
        </Button>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: "medium",
              fontSize: "1rem",
              px: 3,
              py: 1.5,
            },
            "& .Mui-selected": {
              color: "#2563eb",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#2563eb",
              height: 3,
            },
          }}
        >
          <Tab label={t.courses} />
          <Tab label={t.members} />
        </Tabs>
      </Box>

      {/* Tab content */}
      <Box sx={{ mt: 2 }}>
        {/* Courses Tab */}
        {tabValue === 0 && (
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <TextField
                placeholder={t.searchPlaceholder}
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  width: "500px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                    backgroundColor: "white",
                  },
                }}
                className="dark:bg-gray-800"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2563eb",
                  color: "white",
                  borderRadius: "30px",
                  textTransform: "none",
                  px: 4,
                  py: 1.5,
                  fontWeight: "medium",
                  "&:hover": {
                    backgroundColor: "#1d4ed8",
                  },
                }}
                className="dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                {t.add}
              </Button>
            </Box>

            <TableContainer
              component={Paper}
              sx={{ boxShadow: "none", border: "1px solid #e5e7eb" }}
              className="dark:bg-gray-900 dark:border-gray-700"
            >
              <Table>
                <TableHead>
                  <TableRow className="dark:bg-gray-800">
                    <TableCell padding="checkbox" className="dark:text-gray-300">
                      <Checkbox color="primary" sx={{ color: "#9ca3af" }} />
                    </TableCell>
                    <TableCell className="dark:text-gray-300" sx={{ fontWeight: "medium", color: "#6b7280", py: 2 }}>
                      {t.name}
                    </TableCell>
                    <TableCell
                      className="dark:text-gray-300"
                      align="right"
                      sx={{ fontWeight: "medium", color: "#6b7280", py: 2 }}
                    >
                      {t.actions}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCourses.map((course) => (
                    <TableRow
                      key={course.id}
                      className="dark:border-gray-700 dark:hover:bg-gray-800"
                      sx={{
                        "&:hover": { backgroundColor: "#f9fafb" },
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" sx={{ color: "#9ca3af" }} />
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        className="dark:text-white"
                        sx={{ py: 3, display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box
                          sx={{ width: 60, height: 60, position: "relative", borderRadius: "4px", overflow: "hidden" }}
                        >
                          <Image
                            src={course.image || "/placeholder.svg"}
                            alt={course.name}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </Box>
                        {course.name}
                      </TableCell>
                      <TableCell align="right" sx={{ py: 3 }}>
                        <IconButton
                          color="error"
                          title={t.delete}
                          className="dark:text-red-400"
                          onClick={() => handleDeleteCourse(course.id)}
                          sx={{ color: "#6b7280" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredCourses.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                        <Typography color="text.secondary">{t.noCoursesFound}</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {/* Members Tab */}
        {tabValue === 1 && (
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <TextField
                placeholder={t.searchPlaceholder}
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  width: "500px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                    backgroundColor: "white",
                  },
                }}
                className="dark:bg-gray-800"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2563eb",
                  color: "white",
                  borderRadius: "30px",
                  textTransform: "none",
                  px: 4,
                  py: 1.5,
                  fontWeight: "medium",
                  "&:hover": {
                    backgroundColor: "#1d4ed8",
                  },
                }}
                className="dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                {t.add}
              </Button>
            </Box>

            <TableContainer
              component={Paper}
              sx={{ boxShadow: "none", border: "1px solid #e5e7eb" }}
              className="dark:bg-gray-900 dark:border-gray-700"
            >
              <Table>
                <TableHead>
                  <TableRow className="dark:bg-gray-800">
                    <TableCell padding="checkbox" className="dark:text-gray-300" sx={{ width: "56px" }}>
                      <Checkbox color="primary" sx={{ color: "#9ca3af" }} />
                    </TableCell>
                    <TableCell className="dark:text-gray-300" sx={{ fontWeight: "medium", color: "#6b7280", py: 2 }}>
                      {t.name}
                    </TableCell>
                    <TableCell className="dark:text-gray-300" sx={{ fontWeight: "medium", color: "#6b7280", py: 2 }}>
                      {t.email}
                    </TableCell>
                    <TableCell
                      className="dark:text-gray-300"
                      align="right"
                      sx={{ fontWeight: "medium", color: "#6b7280", py: 2 }}
                    >
                      {t.actions}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <>
                      <TableRow
                        key={member.id}
                        className="dark:border-gray-700 dark:hover:bg-gray-800"
                        sx={{
                          "&:hover": { backgroundColor: "#f9fafb" },
                          borderBottom: "1px solid #e5e7eb",
                        }}
                      >
                        <TableCell padding="checkbox" sx={{ width: "56px" }}>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => handleExpandMember(member.id)}
                          >
                            {expandedMember === member.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                          </IconButton>
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className="dark:text-white"
                          sx={{ py: 3, display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Avatar src={member.avatar} alt={member.name} sx={{ width: 40, height: 40 }} />
                          {member.name}
                        </TableCell>
                        <TableCell className="dark:text-white" sx={{ py: 3 }}>
                          {member.email}
                        </TableCell>
                        <TableCell align="right" sx={{ py: 3 }}>
                          <IconButton
                            color="error"
                            title={t.delete}
                            className="dark:text-red-400"
                            onClick={() => handleDeleteMember(member.id)}
                            sx={{ color: "#6b7280" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      <TableRow key={`details-${member.id}`}>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                          <Collapse in={expandedMember === member.id} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 2 }}>
                              <Typography variant="h6" gutterBottom component="div">
                                {language === "de" ? "Details" : "Details"}
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 2 }}>
                                {language === "de"
                                  ? "Hier könnten weitere Informationen zum Mitglied angezeigt werden."
                                  : "Additional member information could be displayed here."}
                              </Typography>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                  {filteredMembers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                        <Typography color="text.secondary">{t.noMembersFound}</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>

      {/* Settings Drawer */}
      <AccessSettingsDrawer
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        accessData={accessDetails}
        onSave={handleSettingsSave}
      />
    </Box>
  )
}

