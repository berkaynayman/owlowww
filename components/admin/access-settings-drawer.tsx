"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Divider,
  Button,
} from "@mui/material"
import {
  Close as CloseIcon,
  FormatBold as FormatBoldIcon,
  FormatListBulleted as FormatListBulletedIcon,
  FormatListNumbered as FormatListNumberedIcon,
  FormatItalic as FormatItalicIcon,
  FormatAlignLeft as FormatAlignLeftIcon,
  FormatAlignCenter as FormatAlignCenterIcon,
  Code as CodeIcon,
  InsertEmoticon as InsertEmoticonIcon,
  FormatClear as FormatClearIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material"
import { useLanguage } from "@/contexts/language-context"

interface AccessSettingsDrawerProps {
  open: boolean
  onClose: () => void
  accessData: {
    id: string
    name: string
  }
  onSave: (data: any) => void
}

export default function AccessSettingsDrawer({ open, onClose, accessData, onSave }: AccessSettingsDrawerProps) {
  const { language } = useLanguage()
  const [name, setName] = useState(accessData.name)
  const [validityType, setValidityType] = useState("launch")
  const [accessMessage, setAccessMessage] = useState("")

  useEffect(() => {
    if (open) {
      setName(accessData.name)
    }
  }, [open, accessData])

  const translations = {
    de: {
      settings: "Einstellungen",
      name: "Name",
      validity: "Gültigkeit",
      launchDate: "Launch Datum",
      launchDateDescription: "Wird der Zugang an ein Mitglied vergeben, dann wird dieses Datum als Startdatum gesetzt.",
      revokeAfterDays: "Entziehen nach Tagen",
      revokeAfterDaysDescription:
        "Zugang nach einer bestimmten Zeit automatisch sperren. Dies wirkt sich nicht auf bereits vergebene Zugänge aus.",
      accessMessage: "Zugangsnachricht",
      accessMessageDescription:
        "Hinterlege hier den Wert der 'Zugangsnachricht' Variable. Diese Variable wird in der Zugangs E-Mail verwendet.",
      yourTemplate: "Dein Template",
      save: "Speichern",
      cancel: "Abbrechen",
    },
    en: {
      settings: "Settings",
      name: "Name",
      validity: "Validity",
      launchDate: "Launch Date",
      launchDateDescription: "When the access is granted to a member, this date is set as the start date.",
      revokeAfterDays: "Revoke after days",
      revokeAfterDaysDescription:
        "Automatically block access after a certain time. This does not affect already granted access.",
      accessMessage: "Access message",
      accessMessageDescription:
        "Enter the value of the 'Access message' variable here. This variable is used in the access email.",
      yourTemplate: "Your template",
      save: "Save",
      cancel: "Cancel",
    },
  }

  const t = translations[language]

  const handleSave = () => {
    onSave({
      name,
      validityType,
      accessMessage,
    })
    onClose()
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 450 },
          maxWidth: "100%",
          p: 3,
          boxSizing: "border-box",
        },
        className: "dark:bg-gray-800 dark:text-white",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" className="dark:text-white">
          {t.settings}
        </Typography>
        <IconButton onClick={onClose} edge="end" aria-label="close" className="dark:text-gray-300">
          <CloseIcon />
        </IconButton>
      </Box>

      <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {/* Name field */}
        <Box>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom className="dark:text-white">
            {t.name}
          </Typography>
          <TextField
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            size="small"
            InputProps={{
              className: "dark:bg-gray-700 dark:text-white",
            }}
          />
        </Box>

        {/* Validity section */}
        <Box>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom className="dark:text-white">
            {t.validity}
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup value={validityType} onChange={(e) => setValidityType(e.target.value)}>
              <FormControlLabel
                value="launch"
                control={<Radio className="dark:text-blue-400" />}
                label={
                  <Box>
                    <Typography variant="body2" fontWeight="medium" className="dark:text-white">
                      {t.launchDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }} className="dark:text-gray-300">
                      {t.launchDateDescription}
                    </Typography>
                  </Box>
                }
                sx={{ alignItems: "flex-start", mb: 2 }}
                className="dark:text-white"
              />
              <FormControlLabel
                value="revoke"
                control={<Radio className="dark:text-blue-400" />}
                label={
                  <Box>
                    <Typography variant="body2" fontWeight="medium" className="dark:text-white">
                      {t.revokeAfterDays}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }} className="dark:text-gray-300">
                      {t.revokeAfterDaysDescription}
                    </Typography>
                  </Box>
                }
                sx={{ alignItems: "flex-start" }}
                className="dark:text-white"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Access message section */}
        <Box>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom className="dark:text-white">
            {t.accessMessage}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }} className="dark:text-gray-300">
            {t.accessMessageDescription}
          </Typography>

          {/* Rich text editor toolbar */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
              p: 1,
              border: "1px solid #e0e0e0",
              borderBottom: "none",
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            }}
            className="dark:border-gray-600 dark:bg-gray-700"
          >
            <IconButton size="small" className="dark:text-gray-300">
              <FormatBoldIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" className="dark:text-gray-300">
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} className="dark:bg-gray-600" />
            <IconButton size="small" className="dark:text-gray-300">
              <FormatAlignLeftIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" className="dark:text-gray-300">
              <FormatAlignCenterIcon fontSize="small" />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} className="dark:bg-gray-600" />
            <IconButton size="small" className="dark:text-gray-300">
              <FormatListBulletedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" className="dark:text-gray-300">
              <FormatListNumberedIcon fontSize="small" />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} className="dark:bg-gray-600" />
            <IconButton size="small" className="dark:text-gray-300">
              <FormatItalicIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" className="dark:text-gray-300">
              <CodeIcon fontSize="small" />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} className="dark:bg-gray-600" />
            <IconButton size="small" className="dark:text-gray-300">
              <InsertEmoticonIcon fontSize="small" />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} className="dark:bg-gray-600" />
            <IconButton size="small" className="dark:text-gray-300">
              <FormatClearIcon fontSize="small" />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} className="dark:bg-gray-600" />
            <IconButton size="small" className="dark:text-gray-300">
              <UndoIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" className="dark:text-gray-300">
              <RedoIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Rich text editor content area */}
          <TextField
            fullWidth
            multiline
            rows={10}
            placeholder={t.yourTemplate}
            value={accessMessage}
            onChange={(e) => setAccessMessage(e.target.value)}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              },
            }}
            InputProps={{
              className: "dark:bg-gray-700 dark:text-white",
            }}
          />
        </Box>

        {/* Action buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
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
            onClick={handleSave}
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

