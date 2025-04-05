"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material"
import { useLanguage } from "@/contexts/language-context"

interface NewChapterModalProps {
  open: boolean
  onClose: () => void
  onSave: (name: string) => void
}

export default function NewChapterModal({ open, onClose, onSave }: NewChapterModalProps) {
  const { language } = useLanguage()
  const [name, setName] = useState("")
  const [error, setError] = useState(false)

  const translations = {
    de: {
      title: "Neues Kapitel erstellen",
      nameLabel: "Kapitelname",
      nameRequired: "Bitte geben Sie einen Namen ein",
      cancel: "Abbrechen",
      create: "Erstellen",
    },
    en: {
      title: "Create New Chapter",
      nameLabel: "Chapter Name",
      nameRequired: "Please enter a name",
      cancel: "Cancel",
      create: "Create",
    },
  }

  const t = translations[language]

  const handleClose = () => {
    setName("")
    setError(false)
    onClose()
  }

  const handleSave = () => {
    if (!name.trim()) {
      setError(true)
      return
    }
    onSave(name)
    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      className="dark:bg-gray-900"
      PaperProps={{
        className: "dark:bg-gray-800 dark:border dark:border-gray-700",
      }}
    >
      <DialogTitle className="dark:text-white">
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" component="div">
            {t.title}
          </Typography>
          <IconButton onClick={handleClose} size="small" className="dark:text-gray-400">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={t.nameLabel}
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            if (e.target.value.trim()) setError(false)
          }}
          error={error}
          helperText={error ? t.nameRequired : ""}
          sx={{ mt: 2 }}
          className="dark:bg-gray-700 dark:text-white"
          InputLabelProps={{
            className: "dark:text-gray-300",
          }}
          InputProps={{
            className: "dark:text-white",
          }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
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
          onClick={handleSave}
          variant="contained"
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
          {t.create}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

