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
  TextareaAutosize,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material"
import {
  Close as CloseIcon,
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

  // Form state
  const [title, setTitle] = useState(module?.title || "")
  const [description, setDescription] = useState(module?.description || "")
  const [isRequired, setIsRequired] = useState(module?.isRequired || false)
  const [detailedDescription, setDetailedDescription] = useState(module?.detailedDescription || "")

  const translations = {
    de: {
      moduleTitle: "Kapitel Eigenschaften",
      lessonTitle: "Lektion Eigenschaften",
      subtitle: "Bearbeite die Eigenschaften",
      name: "Name",
      nameSubtitle: "Name des Kapitels",
      lessonNameSubtitle: "Name der Lektion",
      shortDescription: "Kurzbeschreibung",
      shortDescriptionSubtitle: "Erscheint in der Übersicht als Untertitel",
      properties: "Eigenschaften",
      required: "Verpflichtend",
      previewImage: "Vorschaubild",
      previewImageSubtitle: "Vorschaubild des Kapitels",
      lessonPreviewImageSubtitle: "Vorschaubild der Lektion",
      uploadPreviewImage: "Vorschaubild hochladen",
      generate: "Generieren",
      detailedDescription: "Ausführliche Beschreibung",
      detailedDescriptionSubtitle: "Hier kannst du eine ausführliche Beschreibung hinterlegen.",
      editor: "Editor",
      code: "Code",
      save: "Speichern",
      cancel: "Abbrechen",
    },
    en: {
      moduleTitle: "Chapter Properties",
      lessonTitle: "Lesson Properties",
      subtitle: "Edit the properties",
      name: "Name",
      nameSubtitle: "Name of the chapter",
      lessonNameSubtitle: "Name of the lesson",
      shortDescription: "Short Description",
      shortDescriptionSubtitle: "Appears in the overview as subtitle",
      properties: "Properties",
      required: "Required",
      previewImage: "Preview Image",
      previewImageSubtitle: "Preview image of the chapter",
      lessonPreviewImageSubtitle: "Preview image of the lesson",
      uploadPreviewImage: "Upload preview image",
      generate: "Generate",
      detailedDescription: "Detailed Description",
      detailedDescriptionSubtitle: "Here you can add a detailed description.",
      editor: "Editor",
      code: "Code",
      save: "Save",
      cancel: "Cancel",
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
            {isChapter ? t.moduleTitle : t.lessonTitle}
          </Typography>
          <IconButton onClick={onClose} edge="end" className="dark:text-gray-300 dark:hover:bg-gray-800">
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }} className="dark:text-gray-400">
          {t.subtitle}
        </Typography>

        <Divider sx={{ my: 3 }} className="dark:border-gray-700" />

        {/* Name */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" component="h3" sx={{ mb: 1 }} className="dark:text-gray-200">
            {t.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} className="dark:text-gray-400">
            {isChapter ? t.nameSubtitle : t.lessonNameSubtitle}
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
                <Typography className="dark:text-gray-300">{t.required}</Typography>
                <InfoIcon fontSize="small" color="action" className="dark:text-gray-400" />
              </Box>
              <Switch checked={isRequired} onChange={(e) => setIsRequired(e.target.checked)} />
            </Box>
          </Box>
        </Box>

        {/* Preview Image */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" component="h3" sx={{ mb: 1 }} className="dark:text-gray-200">
            {t.previewImage}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }} className="dark:text-gray-400">
            {isChapter ? t.previewImageSubtitle : t.lessonPreviewImageSubtitle}
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
            {module?.imageUrl ? (
              <Image
                src={module.imageUrl || "/placeholder.svg"}
                alt="Module preview"
                fill
                style={{ objectFit: "contain" }}
              />
            ) : (
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Module preview"
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

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {t.cancel}
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
          >
            {t.save}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

