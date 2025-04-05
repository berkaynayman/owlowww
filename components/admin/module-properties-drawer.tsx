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
  ToggleButtonGroup,
  ToggleButton,
  FormControlLabel,
  Paper, // Added Paper import
  Tooltip,
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
  Upload as UploadIcon,
} from "@mui/icons-material"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

interface ModulePropertiesDrawerProps {
  open: boolean
  onClose: () => void
  module?: {
    id: string
    title: string
    description?: string
    imageUrl?: string
    isRequired?: boolean
    detailedDescription?: string
  }
  isChapter?: boolean
}

export default function ModulePropertiesDrawer({
  open,
  onClose,
  module,
  isChapter = true,
}: ModulePropertiesDrawerProps) {
  const { language } = useLanguage()
  const [editorMode, setEditorMode] = useState<"editor" | "code">("editor")
  const [showMoreSettings, setShowMoreSettings] = useState(false)

  // Form state
  const [title, setTitle] = useState(module?.title || "")
  const [description, setDescription] = useState(module?.description || "")
  const [isRequired, setIsRequired] = useState(module?.isRequired || false)
  const [detailedDescription, setDetailedDescription] = useState(module?.detailedDescription || "")

  const translations = {
    de: {
      moduleTitle: "Kapitel Eigenschaften",
      moduleSubtitle: "Bearbeite die Kapitel Eigenschaften",
      lessonTitle: "Lektion Eigenschaften",
      lessonSubtitle: "Bearbeite die Lektion Eigenschaften",
      name: "Name",
      nameSubtitle: "Name des Kapitels",
      lessonNameSubtitle: "Name der Lektion",
      shortDescription: "Kurzbeschreibung",
      shortDescriptionSubtitle: "Erscheint in der Übersicht als Untertitel",
      properties: "Eigenschaften",
      required: "Verpflichtend",
      showMoreSettings: "Weitere Einstellungen anzeigen",
      previewImage: "Vorschaubild",
      previewImageSubtitle: "Vorschaubild des Kapitels",
      lessonPreviewImageSubtitle: "Vorschaubild der Lektion",
      uploadPreviewImage: "Vorschaubild hochladen",
      generate: "Generieren",
      detailedDescription: "Ausführliche Beschreibung",
      detailedDescriptionSubtitle: "Hier kannst du eine ausführliche Beschreibung hinterlegen.",
      editor: "Editor",
      code: "Code",
      cancel: "Abbrechen",
      save: "Speichern",
    },
    en: {
      moduleTitle: "Chapter Properties",
      moduleSubtitle: "Edit the chapter properties",
      lessonTitle: "Lesson Properties",
      lessonSubtitle: "Edit the lesson properties",
      name: "Name",
      nameSubtitle: "Name of the chapter",
      lessonNameSubtitle: "Name of the lesson",
      shortDescription: "Short Description",
      shortDescriptionSubtitle: "Appears in the overview as subtitle",
      properties: "Properties",
      required: "Required",
      showMoreSettings: "Show more settings",
      previewImage: "Preview Image",
      previewImageSubtitle: "Preview image of the chapter",
      lessonPreviewImageSubtitle: "Preview image of the lesson",
      uploadPreviewImage: "Upload preview image",
      generate: "Generate",
      detailedDescription: "Detailed Description",
      detailedDescriptionSubtitle: "Here you can add a detailed description.",
      editor: "Editor",
      code: "Code",
      cancel: "Cancel",
      save: "Save",
    },
  }

  const t = translations[language]

  const titleText = isChapter ? t.moduleTitle : t.lessonTitle
  const subtitleText = isChapter ? t.moduleSubtitle : t.lessonSubtitle
  const nameSubtitleText = isChapter ? t.nameSubtitle : t.lessonNameSubtitle
  const previewImageSubtitleText = isChapter ? t.previewImageSubtitle : t.lessonPreviewImageSubtitle

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: "500px" },
          boxSizing: "border-box",
          bgcolor: "#fff",
        },
      }}
      className="dark:bg-gray-100"
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Box
          sx={{
            p: 3,
            borderBottom: "1px solid #eee",
            backgroundColor: "#f9f9f9",
          }}
          className="dark:bg-gray-800 dark:border-gray-700"
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography variant="h5" component="h2" fontWeight="medium" className="dark:text-white">
              {titleText}
            </Typography>
            <IconButton onClick={onClose} edge="end" aria-label="close" className="dark:text-gray-300">
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" color="text.secondary" className="dark:text-gray-400">
            {subtitleText}
          </Typography>
        </Box>

        {/* Content - Scrollable */}
        <Box sx={{ p: 3, flex: 1, overflow: "auto" }} className="dark:bg-gray-900">
          {/* Name */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="h3" sx={{ mb: 1 }} className="dark:text-white">
              {t.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} className="dark:text-gray-400">
              {nameSubtitleText}
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={isChapter ? "Einführung" : "Lektion Titel"}
              InputProps={{
                className: "dark:bg-gray-800 dark:text-white",
              }}
            />
          </Box>

          {/* Short Description */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="h3" sx={{ mb: 1 }} className="dark:text-white">
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
              InputProps={{
                className: "dark:bg-gray-800 dark:text-white",
              }}
            />
          </Box>

          {/* Properties */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="h3" sx={{ mb: 2 }} className="dark:text-white">
              {t.properties}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <FormControlLabel
                control={<Switch checked={isRequired} onChange={(e) => setIsRequired(e.target.checked)} />}
                label={t.required}
                className="dark:text-white"
              />
              <Tooltip title="Info about required setting">
                <InfoIcon fontSize="small" color="action" sx={{ ml: 1 }} className="dark:text-gray-400" />
              </Tooltip>
            </Box>

            <Button
              variant="text"
              color="primary"
              endIcon={<ExpandMoreIcon />}
              onClick={() => setShowMoreSettings(!showMoreSettings)}
              className="dark:text-blue-400 dark:hover:text-blue-300"
            >
              {t.showMoreSettings}
            </Button>
          </Box>

          {/* Preview Image */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="h3" sx={{ mb: 1 }} className="dark:text-white">
              {t.previewImage}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }} className="dark:text-gray-400">
              {previewImageSubtitleText}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 250,
                mb: 2,
                position: "relative",
                border: "1px solid #eee",
                borderRadius: 1,
                overflow: "hidden",
                backgroundColor: "#0b182c",
              }}
              className="dark:border-gray-700"
            >
              {module?.imageUrl ? (
                <Image
                  src={module.imageUrl || "/placeholder.svg"}
                  alt="Module preview"
                  fill
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <Typography variant="h2" sx={{ color: "white", fontWeight: "bold" }}>
                  {title || "Einleitung"}
                </Typography>
              )}
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
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                sx={{ flex: 1 }}
                startIcon={<UploadIcon />}
                sx={{
                  borderRadius: "30px",
                  textTransform: "none",
                  px: 3,
                  py: 1,
                  borderColor: "#e5e7eb",
                  color: "#374151",
                  flex: 1,
                }}
                className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {t.uploadPreviewImage}
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "30px",
                  textTransform: "none",
                  px: 3,
                  py: 1,
                  borderColor: "#e5e7eb",
                  color: "#374151",
                  flex: 1,
                }}
                className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {t.generate}
              </Button>
            </Box>
          </Box>

          {/* Detailed Description */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" component="h3" sx={{ mb: 1 }} className="dark:text-white">
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
              >
                <ToggleButton value="editor" className="dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700">
                  <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
                  {t.editor}
                </ToggleButton>
                <ToggleButton value="code" className="dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700">
                  <CodeIcon fontSize="small" sx={{ mr: 1 }} />
                  {t.code}
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Paper
              elevation={0}
              sx={{
                border: "1px solid #ddd",
                borderRadius: 1,
                overflow: "hidden",
              }}
              className="dark:border-gray-700 dark:bg-gray-800"
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
                className="dark:border-gray-700"
              >
                <IconButton size="small" className="dark:text-gray-300 dark:hover:bg-gray-700">
                  <FormatBoldIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" className="dark:text-gray-300 dark:hover:bg-gray-700">
                  <FormatItalicIcon fontSize="small" />
                </IconButton>
                <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} className="dark:bg-gray-600" />

                <IconButton size="small" className="dark:text-gray-300 dark:hover:bg-gray-700">
                  <FormatAlignLeftIcon fontSize="small" />
                </IconButton>
                <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} className="dark:bg-gray-600" />

                <IconButton size="small" className="dark:text-gray-300 dark:hover:bg-gray-700">
                  <FormatListBulletedIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" className="dark:text-gray-300 dark:hover:bg-gray-700">
                  <FormatListNumberedIcon fontSize="small" />
                </IconButton>

                <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} className="dark:bg-gray-600" />

                <IconButton size="small" className="dark:text-gray-300 dark:hover:bg-gray-700">
                  <LinkIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" className="dark:text-gray-300 dark:hover:bg-gray-700">
                  <ImageIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" className="dark:text-gray-300 dark:hover:bg-gray-700">
                  <InsertEmoticonIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" className="dark:text-gray-300 dark:hover:bg-gray-700">
                  <FormatQuoteIcon fontSize="small" />
                </IconButton>

                <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} className="dark:bg-gray-600" />

                <IconButton size="small" className="dark:text-gray-300 dark:hover:bg-gray-700">
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
                className="dark:text-gray-400 dark:bg-gray-800"
              >
                Ausführliche Beschreibung
              </Box>

              {/* Bottom toolbar */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  p: 1,
                  borderTop: "1px solid #ddd",
                }}
                className="dark:border-gray-700"
              >
                <IconButton size="small" className="dark:text-gray-300 dark:hover:bg-gray-700">
                  <UndoIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" className="dark:text-gray-300 dark:hover:bg-gray-700">
                  <RedoIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" className="dark:text-gray-300 dark:hover:bg-gray-700">
                  <FullscreenIcon fontSize="small" />
                </IconButton>
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* Footer with action buttons */}
        <Box
          sx={{
            p: 2,
            borderTop: "1px solid #eee",
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
          className="dark:bg-gray-900 dark:border-gray-700"
        >
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderRadius: "30px",
              textTransform: "none",
              px: 3,
              py: 1,
              borderColor: "#e5e7eb",
              color: "#374151",
            }}
            className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {t.cancel}
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#2563eb",
              color: "white",
              borderRadius: "30px",
              textTransform: "none",
              px: 3,
              py: 1,
              "&:hover": {
                backgroundColor: "#1d4ed8",
              },
            }}
            className="dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {t.save}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

