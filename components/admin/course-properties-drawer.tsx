"use client"

import { useState } from "react"
import {
  Box,
  Drawer,
  Typography,
  TextField,
  Switch,
  Button,
  IconButton,
  Divider,
  InputAdornment,
  TextareaAutosize,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material"
import {
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  Info as InfoIcon,
  Visibility as VisibilityIcon,
  Code as CodeIcon,
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
  Undo as UndoIcon,
  Redo as RedoIcon,
  Fullscreen as FullscreenIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

interface CoursePropertiesDrawerProps {
  open: boolean
  onClose: () => void
  course?: {
    id: string
    title: string
    description: string
    imageUrl?: string
    alwaysShowInOverview?: boolean
    deactivateProgress?: boolean
    activateComments?: boolean
    isMiniCourse?: boolean
    releaseTime?: string
    detailedDescription?: string
  }
}

export default function CoursePropertiesDrawer({ open, onClose, course }: CoursePropertiesDrawerProps) {
  const { language } = useLanguage()
  const [editorMode, setEditorMode] = useState<"editor" | "code">("editor")
  const [showMoreSettings, setShowMoreSettings] = useState(false)

  // Form state
  const [title, setTitle] = useState(course?.title || "")
  const [description, setDescription] = useState(course?.description || "")
  const [alwaysShowInOverview, setAlwaysShowInOverview] = useState(course?.alwaysShowInOverview || false)
  const [deactivateProgress, setDeactivateProgress] = useState(course?.deactivateProgress || false)
  const [activateComments, setActivateComments] = useState(course?.activateComments || false)
  const [isMiniCourse, setIsMiniCourse] = useState(course?.isMiniCourse || false)
  const [releaseTime, setReleaseTime] = useState(course?.releaseTime || "09:00")
  const [detailedDescription, setDetailedDescription] = useState(course?.detailedDescription || "")

  const translations = {
    de: {
      title: "Kurs Eigenschaften",
      subtitle: "Bearbeite die Kurs Eigenschaften",
      name: "Name",
      nameSubtitle: "Name des Kurses",
      shortDescription: "Kurzbeschreibung",
      shortDescriptionSubtitle: "Erscheint in der Übersicht als Untertitel",
      properties: "Eigenschaften",
      alwaysShowInOverview: "Kurs immer in der Übersicht anzeigen",
      deactivateProgress: "Fortschritt deaktivieren",
      activateComments: "Kommentare aktivieren",
      miniCourse: "Mini Kurs",
      showMoreSettings: "Weitere Einstellungen anzeigen",
      previewImage: "Vorschaubild",
      previewImageSubtitle: "Vorschaubild des Kurses",
      uploadPreviewImage: "Vorschaubild hochladen",
      generate: "Generieren",
      releaseTime: "Freigabe Uhrzeit",
      releaseTimeSubtitle:
        "Verzögert freigeschaltete Inhalte werden freigegeben und die Benachrichtigung dazu verschickt",
      detailedDescription: "Ausführliche Beschreibung",
      detailedDescriptionSubtitle: "Hier kannst du eine ausführliche Beschreibung hinterlegen.",
      editor: "Editor",
      code: "Code",
    },
    en: {
      title: "Course Properties",
      subtitle: "Edit the course properties",
      name: "Name",
      nameSubtitle: "Name of the course",
      shortDescription: "Short Description",
      shortDescriptionSubtitle: "Appears in the overview as subtitle",
      properties: "Properties",
      alwaysShowInOverview: "Always show course in overview",
      deactivateProgress: "Deactivate progress",
      activateComments: "Activate comments",
      miniCourse: "Mini Course",
      showMoreSettings: "Show more settings",
      previewImage: "Preview Image",
      previewImageSubtitle: "Preview image of the course",
      uploadPreviewImage: "Upload preview image",
      generate: "Generate",
      releaseTime: "Release Time",
      releaseTimeSubtitle: "Delayed content will be released and notification will be sent",
      detailedDescription: "Detailed Description",
      detailedDescriptionSubtitle: "Here you can add a detailed description.",
      editor: "Editor",
      code: "Code",
    },
  }

  const t = translations[language]

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: "500px" },
          boxSizing: "border-box",
          bgcolor: "background.paper",
        },
      }}
      className="dark:bg-gray-900"
    >
      <Box sx={{ p: 3, height: "100%", overflow: "auto" }} className="dark:bg-gray-900 dark:text-gray-100">
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography variant="h5" component="h2" fontWeight="medium" className="dark:text-white">
            {t.title}
          </Typography>
          <IconButton onClick={onClose} edge="end">
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }} className="dark:text-gray-400">
          {t.subtitle}
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Name */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" component="h3" sx={{ mb: 1 }} className="dark:text-gray-200">
            {t.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} className="dark:text-gray-400">
            {t.nameSubtitle}
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ bgcolor: "background.paper" }}
            className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
            InputProps={{
              className: "dark:text-white",
            }}
          />
        </Box>

        {/* Short Description */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" component="h3" sx={{ mb: 1 }} className="dark:text-gray-200">
            {t.shortDescription}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} className="dark:text-gray-400">
            {t.shortDescriptionSubtitle}
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ bgcolor: "background.paper" }}
            className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
            InputProps={{
              className: "dark:text-white",
            }}
          />
        </Box>

        {/* Properties */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" component="h3" sx={{ mb: 2 }} className="dark:text-gray-200">
            {t.properties}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }} className="dark:text-gray-300">
            <Box
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              className="dark:text-gray-300"
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography className="dark:text-gray-300">{t.alwaysShowInOverview}</Typography>
                <InfoIcon fontSize="small" color="action" className="dark:text-gray-400" />
              </Box>
              <Switch checked={alwaysShowInOverview} onChange={(e) => setAlwaysShowInOverview(e.target.checked)} />
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              className="dark:text-gray-300"
            >
              <Typography>{t.deactivateProgress}</Typography>
              <Switch checked={deactivateProgress} onChange={(e) => setDeactivateProgress(e.target.checked)} />
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              className="dark:text-gray-300"
            >
              <Typography>{t.activateComments}</Typography>
              <Switch checked={activateComments} onChange={(e) => setActivateComments(e.target.checked)} />
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              className="dark:text-gray-300"
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography>{t.miniCourse}</Typography>
                <InfoIcon fontSize="small" color="action" className="dark:text-gray-400" />
              </Box>
              <Switch checked={isMiniCourse} onChange={(e) => setIsMiniCourse(e.target.checked)} />
            </Box>
          </Box>

          <Button
            variant="text"
            color="primary"
            endIcon={<ExpandMoreIcon />}
            onClick={() => setShowMoreSettings(!showMoreSettings)}
            sx={{ mt: 2 }}
            className="dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t.showMoreSettings}
          </Button>
        </Box>

        {/* Preview Image */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" component="h3" sx={{ mb: 1 }} className="dark:text-gray-200">
            {t.previewImage}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }} className="dark:text-gray-400">
            {t.previewImageSubtitle}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 200,
              mb: 2,
              position: "relative",
            }}
          >
            {course?.imageUrl ? (
              <Image
                src={course.imageUrl || "/placeholder.svg"}
                alt="Course preview"
                fill
                style={{ objectFit: "contain" }}
              />
            ) : (
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Course preview"
                width={300}
                height={200}
                style={{ objectFit: "contain" }}
              />
            )}
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              sx={{ flex: 1 }}
              className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {t.uploadPreviewImage}
            </Button>
            <Button
              variant="outlined"
              sx={{ flex: 1 }}
              className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {t.generate}
            </Button>
          </Box>
        </Box>

        {/* Release Time */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" component="h3" sx={{ mb: 1 }} className="dark:text-gray-200">
            {t.releaseTime}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} className="dark:text-gray-400">
            {t.releaseTimeSubtitle}
          </Typography>
          <TextField
            fullWidth
            type="time"
            value={releaseTime}
            onChange={(e) => setReleaseTime(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccessTimeIcon className="dark:text-gray-400" />
                </InputAdornment>
              ),
              className: "dark:text-white",
            }}
            sx={{ bgcolor: "background.paper" }}
            className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
        </Box>

        {/* Detailed Description */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" component="h3" sx={{ mb: 1 }} className="dark:text-gray-200">
            {t.detailedDescription}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} className="dark:text-gray-400">
            {t.detailedDescriptionSubtitle}
          </Typography>

          <Box sx={{ mb: 1 }}>
            <ToggleButtonGroup
              value={editorMode}
              exclusive
              onChange={(e, newMode) => {
                if (newMode !== null) {
                  setEditorMode(newMode)
                }
              }}
              size="small"
              className="dark:border-gray-700"
            >
              <ToggleButton
                value="editor"
                className="dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <VisibilityIcon fontSize="small" sx={{ mr: 1 }} className="dark:text-gray-400" />
                {t.editor}
              </ToggleButton>
              <ToggleButton
                value="code"
                className="dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <CodeIcon fontSize="small" sx={{ mr: 1 }} className="dark:text-gray-400" />
                {t.code}
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: 1,
              bgcolor: "background.paper",
              overflow: "hidden",
            }}
            className="dark:border-gray-700 dark:bg-gray-800"
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                p: 1,
                borderBottom: "1px solid #ddd",
              }}
              className="dark:border-gray-700 dark:bg-gray-800"
            >
              <IconButton size="small" className="dark:text-gray-400 dark:hover:bg-gray-700">
                <FormatBoldIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" className="dark:text-gray-400 dark:hover:bg-gray-700">
                <FormatItalicIcon fontSize="small" />
              </IconButton>
              <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} className="dark:border-gray-700" />
              <IconButton size="small" className="dark:text-gray-400 dark:hover:bg-gray-700">
                <FormatAlignLeftIcon fontSize="small" />
              </IconButton>
              <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} className="dark:border-gray-700" />
              <IconButton size="small" className="dark:text-gray-400 dark:hover:bg-gray-700">
                <FormatListBulletedIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" className="dark:text-gray-400 dark:hover:bg-gray-700">
                <FormatListNumberedIcon fontSize="small" />
              </IconButton>
              <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} className="dark:border-gray-700" />
              <IconButton size="small" className="dark:text-gray-400 dark:hover:bg-gray-700">
                <LinkIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" className="dark:text-gray-400 dark:hover:bg-gray-700">
                <ImageIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" className="dark:text-gray-400 dark:hover:bg-gray-700">
                <InsertEmoticonIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" className="dark:text-gray-400 dark:hover:bg-gray-700">
                <FormatQuoteIcon fontSize="small" />
              </IconButton>
              <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} className="dark:border-gray-700" />
              <IconButton size="small" className="dark:text-gray-400 dark:hover:bg-gray-700">
                <MoreHorizIcon fontSize="small" />
              </IconButton>
            </Box>

            <TextareaAutosize
              minRows={10}
              style={{
                width: "100%",
                padding: "16px",
                border: "none",
                resize: "vertical",
                fontFamily: "inherit",
                fontSize: "14px",
                backgroundColor: "inherit",
                color: "inherit",
              }}
              value={detailedDescription}
              onChange={(e) => setDetailedDescription(e.target.value)}
              className="dark:bg-gray-800 dark:text-gray-300"
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                p: 1,
                borderTop: "1px solid #ddd",
              }}
              className="dark:border-gray-700 dark:bg-gray-800"
            >
              <IconButton size="small" className="dark:text-gray-400 dark:hover:bg-gray-700">
                <UndoIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" className="dark:text-gray-400 dark:hover:bg-gray-700">
                <RedoIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" className="dark:text-gray-400 dark:hover:bg-gray-700">
                <FullscreenIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  )
}

