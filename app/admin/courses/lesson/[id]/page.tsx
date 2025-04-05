"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Paper,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  Tooltip,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material"
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Visibility as VisibilityIcon,
  Info as InfoIcon,
  FormatBold as FormatBoldIcon,
  FormatItalic as FormatItalicIcon,
  FormatListBulleted as FormatListBulletedIcon,
  FormatListNumbered as FormatListNumberedIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  InsertEmoticon as InsertEmoticonIcon,
  FormatQuote as FormatQuoteIcon,
  MoreHoriz as MoreHorizIcon,
  FormatAlignLeft as FormatAlignLeftIcon,
  FormatUnderlined as FormatUnderlinedIcon,
  FormatAlignCenter as FormatAlignCenterIcon,
  FormatAlignRight as FormatAlignRightIcon,
  FormatAlignJustify as FormatAlignJustifyIcon,
  Delete as DeleteIcon,
  Home as HomeIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from "@mui/icons-material"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import Link from "next/link"

// Mock data for the lesson
const mockLesson = {
  id: "l1",
  title: "Wie die Zollorganisation aufzubauen ist",
  description: "",
  type: "video",
  moduleId: "m2",
  moduleName: "Aufzeichnung Live-Veranstaltungen",
  courseId: "1",
  courseName: "[MASTER] Export Essentials",
  status: "soon",
  isRequired: true,
  noEarlyCompletion: true,
  codeRequired: true,
  detailedDescription: "",
}

export default function LessonEditorPage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState(0)
  const [lesson, setLesson] = useState(mockLesson)
  const [editorMode, setEditorMode] = useState<"editor" | "code">("editor")

  // Form state
  const [title, setTitle] = useState(lesson.title)
  const [description, setDescription] = useState(lesson.description)
  const [type, setType] = useState(lesson.type)
  const [module, setModule] = useState(lesson.moduleId)
  const [isRequired, setIsRequired] = useState(lesson.isRequired)
  const [noEarlyCompletion, setNoEarlyCompletion] = useState(lesson.noEarlyCompletion)
  const [codeRequired, setCodeRequired] = useState(lesson.codeRequired)
  const [detailedDescription, setDetailedDescription] = useState(lesson.detailedDescription)

  const translations = {
    de: {
      back: "Zurück",
      save: "Speichern",
      liveVersion: "Live version",
      videoUpload: "Datei auswählen oder hier ablegen",
      videoUploadSubtitle: "Video- & Audiodateien bis zu 25GB",
      importVideo: "Video importieren",
      general: "Allgemein",
      chapter: "Kapitel",
      videoAudioLesson: "Video/Audio Lektion",
      type: "Typ",
      belongsTo: "Gehört zu:",
      name: "Name",
      shortDescription: "Kurzbeschreibung",
      detailedDescription: "Ausführliche Beschreibung",
      editor: "Editor",
      code: "Code",
      status: "Status",
      soonAvailable: "Bald verfügbar",
      previewImage: "Vorschaubild",
      edit: "Bearbeiten",
      properties: "Eigenschaften",
      required: "Verpflichtend",
      noEarlyCompletion: "Kein vorzeitiges abschließen",
      codeRequired: "Code erforderlich",
      deleteLesson: "Lektion löschen",
    },
    en: {
      back: "Back",
      save: "Save",
      liveVersion: "Live version",
      videoUpload: "Select file or drop here",
      videoUploadSubtitle: "Video & audio files up to 25GB",
      importVideo: "Import video",
      general: "General",
      chapter: "Chapter",
      videoAudioLesson: "Video/Audio Lesson",
      type: "Type",
      belongsTo: "Belongs to:",
      name: "Name",
      shortDescription: "Short description",
      detailedDescription: "Detailed description",
      editor: "Editor",
      code: "Code",
      status: "Status",
      soonAvailable: "Soon available",
      previewImage: "Preview image",
      edit: "Edit",
      properties: "Properties",
      required: "Required",
      noEarlyCompletion: "No early completion",
      codeRequired: "Code required",
      deleteLesson: "Delete lesson",
    },
  }

  const t = translations[language]

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <Box sx={{ maxWidth: "1400px", margin: "0 auto", padding: "20px" }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<KeyboardArrowRightIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 2 }}
        className="dark:text-gray-400"
      >
        <MuiLink
          component={Link}
          href="/admin/courses"
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          className="dark:text-gray-400 dark:hover:text-gray-300"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        </MuiLink>
        <MuiLink
          component={Link}
          href="/admin/courses"
          underline="hover"
          color="inherit"
          className="dark:text-gray-400 dark:hover:text-gray-300"
        >
          {lesson.courseName}
        </MuiLink>
        <MuiLink
          component={Link}
          href="/admin/courses"
          underline="hover"
          color="inherit"
          className="dark:text-gray-400 dark:hover:text-gray-300"
        >
          {lesson.moduleName}
        </MuiLink>
        <Typography color="text.primary" className="dark:text-gray-300">
          {lesson.title}
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton sx={{ mr: 2 }} component={Link} href="/admin/courses" className="dark:text-gray-300">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }} className="dark:text-white">
          {lesson.title}
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton className="dark:text-gray-300">
            <ArrowBackIcon />
          </IconButton>
          <IconButton className="dark:text-gray-300">
            <ArrowForwardIcon />
          </IconButton>
          <Button
            variant="outlined"
            startIcon={<VisibilityIcon />}
            sx={{ mx: 2 }}
            className="dark:border-gray-600 dark:text-gray-300"
          >
            {t.liveVersion}
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ bgcolor: "#4a7bff" }}
            className="dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {t.save}
          </Button>
        </Box>
      </Box>

      {/* Main content */}
      <Box sx={{ display: "flex", gap: 3 }}>
        {/* Left column - Form */}
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ mb: 3, p: 3 }} className="dark:bg-gray-800 dark:border dark:border-gray-600">
            {/* Video upload area */}
            <Box
              sx={{
                border: "2px dashed #ccc",
                borderRadius: 2,
                p: 4,
                textAlign: "center",
                backgroundColor: "#f9f9f9",
                mb: 3,
              }}
              className="dark:border-gray-600 dark:bg-gray-700"
            >
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <Image src="/placeholder.svg?height=48&width=48" alt="Upload" width={48} height={48} />
              </Box>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  color: "#4a7bff",
                  fontWeight: "medium",
                  mb: 1,
                }}
                className="dark:text-blue-400"
              >
                {t.videoUpload}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="dark:text-gray-400">
                {t.videoUploadSubtitle}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
              <Button
                variant="outlined"
                endIcon={<KeyboardArrowRightIcon />}
                className="dark:border-gray-600 dark:text-gray-300"
              >
                {t.importVideo}
              </Button>
            </Box>

            {/* Tabs */}
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                mb: 3,
              }}
              className="dark:border-gray-600"
            >
              <Tab
                label={t.general}
                sx={{
                  textTransform: "none",
                  fontWeight: activeTab === 0 ? "bold" : "normal",
                  color: activeTab === 0 ? "#4a7bff" : "inherit",
                  "&.Mui-selected": {
                    color: "#4a7bff",
                  },
                }}
                className={activeTab === 0 ? "dark:text-blue-400" : "dark:text-gray-300"}
              />
              <Tab
                label={t.chapter}
                sx={{
                  textTransform: "none",
                  fontWeight: activeTab === 1 ? "bold" : "normal",
                  color: activeTab === 1 ? "#4a7bff" : "inherit",
                  "&.Mui-selected": {
                    color: "#4a7bff",
                  },
                }}
                className={activeTab === 1 ? "dark:text-blue-400" : "dark:text-gray-300"}
              />
            </Tabs>

            {/* Tab content */}
            <Box sx={{ display: activeTab === 0 ? "block" : "none" }}>
              {/* Video/Audio Lesson section */}
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  fontWeight: "medium",
                }}
                className="dark:text-gray-200"
              >
                {t.videoAudioLesson}
              </Typography>

              {/* Type and Module selectors */}
              <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
                <FormControl fullWidth>
                  <InputLabel id="type-label" className="dark:text-gray-300">
                    {t.type}
                  </InputLabel>
                  <Select
                    labelId="type-label"
                    value={type}
                    label={t.type}
                    onChange={(e) => setType(e.target.value)}
                    startAdornment={
                      <Box component="span" sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                        <VisibilityIcon fontSize="small" />
                      </Box>
                    }
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  >
                    <MenuItem value="video" className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                      Video/Audio
                    </MenuItem>
                    <MenuItem value="text" className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                      Text
                    </MenuItem>
                    <MenuItem value="quiz" className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                      Quiz
                    </MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="module-label" className="dark:text-gray-300">
                    {t.belongsTo}
                  </InputLabel>
                  <Select
                    labelId="module-label"
                    value={module}
                    label={t.belongsTo}
                    onChange={(e) => setModule(e.target.value)}
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  >
                    <MenuItem value="m1" className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                      Einführung
                    </MenuItem>
                    <MenuItem value="m2" className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                      Aufzeichnung Live-Veranstaltungen
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Name field */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ mb: 1 }} className="dark:text-gray-300">
                  {t.name}
                </Typography>
                <TextField
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="dark:bg-gray-700"
                  InputProps={{
                    className: "dark:text-white dark:border-gray-600",
                  }}
                />
              </Box>

              {/* Short description */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography variant="body1" sx={{ mr: 1 }} className="dark:text-gray-300">
                    {t.shortDescription}
                  </Typography>
                  <Tooltip title="Add a short description that will appear in the overview">
                    <InfoIcon fontSize="small" color="action" className="dark:text-gray-400" />
                  </Tooltip>
                </Box>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="dark:bg-gray-700"
                  InputProps={{
                    className: "dark:text-white dark:border-gray-600",
                  }}
                />
              </Box>

              {/* Detailed description */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "medium" }} className="dark:text-gray-200">
                  {t.detailedDescription}
                </Typography>

                {/* Editor/Code toggle */}
                <Box sx={{ mb: 2, display: "flex", gap: 1 }}>
                  <Button
                    variant={editorMode === "editor" ? "contained" : "outlined"}
                    size="small"
                    onClick={() => setEditorMode("editor")}
                    startIcon={<VisibilityIcon />}
                    sx={{
                      textTransform: "none",
                      bgcolor: editorMode === "editor" ? "#f0f0f0" : "transparent",
                      color: "text.primary",
                      "&:hover": {
                        bgcolor: editorMode === "editor" ? "#e0e0e0" : "#f0f0f0",
                      },
                    }}
                    className={
                      editorMode === "editor"
                        ? "dark:bg-gray-700 dark:text-white"
                        : "dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                    }
                  >
                    {t.editor}
                  </Button>
                  <Button
                    variant={editorMode === "code" ? "contained" : "outlined"}
                    size="small"
                    onClick={() => setEditorMode("code")}
                    startIcon={<CodeIcon />}
                    sx={{
                      textTransform: "none",
                      bgcolor: editorMode === "code" ? "#f0f0f0" : "transparent",
                      color: "text.primary",
                      "&:hover": {
                        bgcolor: editorMode === "code" ? "#e0e0e0" : "#f0f0f0",
                      },
                    }}
                    className={
                      editorMode === "code"
                        ? "dark:bg-gray-700 dark:text-white"
                        : "dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                    }
                  >
                    {t.code}
                  </Button>
                </Box>

                {/* Rich text editor */}
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                  className="dark:border-gray-600"
                >
                  {/* Toolbar */}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      p: 1,
                      borderBottom: "1px solid #ddd",
                      gap: 0.5,
                    }}
                    className="dark:bg-gray-700 dark:border-gray-600"
                  >
                    <IconButton size="small" className="dark:text-gray-300">
                      <FormatBoldIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" className="dark:text-gray-300">
                      <FormatItalicIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" className="dark:text-gray-300">
                      <FormatUnderlinedIcon fontSize="small" />
                    </IconButton>
                    <Box sx={{ mx: 0.5, borderRight: "1px solid #ddd", height: 24 }} className="dark:border-gray-600" />

                    <IconButton size="small" className="dark:text-gray-300">
                      <FormatAlignLeftIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" className="dark:text-gray-300">
                      <FormatAlignCenterIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" className="dark:text-gray-300">
                      <FormatAlignRightIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" className="dark:text-gray-300">
                      <FormatAlignJustifyIcon fontSize="small" />
                    </IconButton>

                    <Box sx={{ mx: 0.5, borderRight: "1px solid #ddd", height: 24 }} className="dark:border-gray-600" />

                    <IconButton size="small" className="dark:text-gray-300">
                      <FormatListBulletedIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" className="dark:text-gray-300">
                      <FormatListNumberedIcon fontSize="small" />
                    </IconButton>

                    <Box sx={{ mx: 0.5, borderRight: "1px solid #ddd", height: 24 }} className="dark:border-gray-600" />

                    <IconButton size="small" className="dark:text-gray-300">
                      <LinkIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" className="dark:text-gray-300">
                      <ImageIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" className="dark:text-gray-300">
                      <InsertEmoticonIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" className="dark:text-gray-300">
                      <FormatQuoteIcon fontSize="small" />
                    </IconButton>

                    <Box sx={{ mx: 0.5, borderRight: "1px solid #ddd", height: 24 }} className="dark:border-gray-600" />

                    <IconButton size="small" className="dark:text-gray-300">
                      <MoreHorizIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  {/* Editor area */}
                  <Box
                    sx={{
                      p: 2,
                      minHeight: "200px",
                      color: "#666",
                      fontStyle: "italic",
                    }}
                    className="dark:bg-gray-700 dark:text-gray-400"
                  >
                    Ausführliche Beschreibung
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: activeTab === 1 ? "block" : "none" }}>
              {/* Chapter tab content */}
              <Typography variant="body1" className="dark:text-gray-300">
                Chapter settings will go here
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Right column - Sidebar */}
        <Box sx={{ width: 300 }}>
          {/* Status card */}
          <Paper sx={{ p: 3, mb: 3 }} className="dark:bg-gray-800 dark:border dark:border-gray-600">
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "medium" }} className="dark:text-gray-20">
                {t.status}
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton size="small" className="dark:text-gray-300">
                  <InfoIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" className="dark:text-gray-300">
                  <EmailIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            <FormControl fullWidth className="dark:bg-gray-700">
              <Select
                value="soon"
                displayEmpty
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                renderValue={() => (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        bgcolor: "orange",
                      }}
                    />
                    <Typography className="dark:text-white">{t.soonAvailable}asdasd</Typography>
                  </Box>
                )}
              >
                <MenuItem value="soon" className="dark:bg-gray-700 dark:text-gray-700 dark:hover:bg-gray-600">
                  {t.soonAvailable}
                </MenuItem>
                <MenuItem value="published" className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                  Publishedsds
                </MenuItem>
                <MenuItem value="draft" className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                  Draft
                </MenuItem>
              </Select>
            </FormControl>
          </Paper>

          {/* Preview image card */}
          <Paper sx={{ p: 3, mb: 3 }} className="dark:bg-gray-800 dark:border dark:border-gray-600">
            <Typography variant="h6" sx={{ fontWeight: "medium", mb: 2 }} className="dark:text-gray-200">
              {t.previewImage}
            </Typography>

            <Box
              sx={{
                width: "100%",
                height: 150,
                position: "relative",
                mb: 2,
                bgcolor: "#0b182c",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  padding: "8px 16px",
                  backgroundColor: "#e74c3c",
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                O&W
              </Box>
              <Typography
                variant="h4"
                sx={{
                  color: "white",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontWeight: "bold",
                }}
                className="flex justify-center items-center w-full mt-2"
              >
                Termin 1
              </Typography>
            </Box>

            <Button fullWidth variant="outlined" className="dark:border-gray-600 dark:text-gray-300">
              {t.edit}
            </Button>
          </Paper>

          {/* Properties card */}
          <Paper sx={{ p: 3, mb: 3 }} className="dark:bg-gray-800 dark:border dark:border-gray-600">
            <Typography variant="h6" sx={{ fontWeight: "medium", mb: 2 }} className="dark:text-gray-200">
              {t.properties}
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body2" sx={{ mr: 1 }} className="dark:text-gray-300">
                    {t.required}
                  </Typography>
                  <Tooltip title="Make this lesson required for completion">
                    <InfoIcon fontSize="small" color="action" className="dark:text-gray-400" />
                  </Tooltip>
                </Box>
                <Switch checked={isRequired} onChange={(e) => setIsRequired(e.target.checked)} />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body2" sx={{ mr: 1 }} className="dark:text-gray-300">
                    {t.noEarlyCompletion}
                  </Typography>
                  <Tooltip title="Prevent users from marking as complete before finishing">
                    <InfoIcon fontSize="small" color="action" className="dark:text-gray-400" />
                  </Tooltip>
                </Box>
                <Switch checked={noEarlyCompletion} onChange={(e) => setNoEarlyCompletion(e.target.checked)} />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body2" sx={{ mr: 1 }} className="dark:text-gray-300">
                    {t.codeRequired}
                  </Typography>
                  <Tooltip title="Require a code to access this lesson">
                    <InfoIcon fontSize="small" color="action" className="dark:text-gray-400" />
                  </Tooltip>
                </Box>
                <Switch checked={codeRequired} onChange={(e) => setCodeRequired(e.target.checked)} />
              </Box>
            </Box>
          </Paper>

          {/* Footer actions */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              startIcon={<ArrowBackIcon />}
              sx={{ color: "text.secondary" }}
              component={Link}
              href="/admin/courses"
              className="dark:text-gray-400 dark:hover:text-gray-300"
            >
              {t.back}
            </Button>

            <Button
              startIcon={<DeleteIcon />}
              sx={{ color: "error.main" }}
              className="dark:text-red-400 dark:hover:text-red-300"
            >
              {t.deleteLesson}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

// Custom icon component for email
function EmailIcon({ fontSize = "medium" }) {
  return (
    <svg
      width={fontSize === "small" ? 20 : 24}
      height={fontSize === "small" ? 20 : 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Custom icon component for code
function CodeIcon({ fontSize = "medium" }) {
  return (
    <svg
      width={fontSize === "small" ? 20 : 24}
      height={fontSize === "small" ? 20 : 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 18L22 12L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

