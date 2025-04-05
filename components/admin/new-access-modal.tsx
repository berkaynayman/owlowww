"use client"

import { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from "@mui/material"
import { useLanguage } from "@/contexts/language-context"

interface NewAccessModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (name: string) => void
}

export default function NewAccessModal({ open, onClose, onSubmit }: NewAccessModalProps) {
  const { language } = useLanguage()
  const [name, setName] = useState("")
  const [error, setError] = useState(false)

  const translations = {
    de: {
      title: "Neuen Zugang erstellen",
      namePlaceholder: "Name",
      required: "Wird benötigt",
      cancel: "Abbrechen",
      create: "Erstellen",
    },
    en: {
      title: "Create New Access",
      namePlaceholder: "Name",
      required: "Required",
      cancel: "Cancel",
      create: "Create",
    },
  }

  const t = translations[language]

  const handleSubmit = () => {
    if (!name.trim()) {
      setError(true)
      return
    }
    onSubmit(name)
    handleClose()
  }

  const handleClose = () => {
    setName("")
    setError(false)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "400px",
          maxWidth: "90vw",
          borderRadius: "8px",
        },
        className: "dark:bg-gray-800",
      }}
    >
      <DialogTitle sx={{ textAlign: "center", pt: 3, pb: 2 }} className="dark:text-white">
        {t.title}
      </DialogTitle>
      <DialogContent sx={{ px: 3, pb: 2 }}>
        <TextField
          autoFocus
          fullWidth
          placeholder={t.namePlaceholder}
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            if (e.target.value.trim()) setError(false)
          }}
          error={error}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderColor: error ? "#ef4444" : undefined,
            },
          }}
          InputProps={{
            sx: {
              borderColor: error ? "#ef4444" : undefined,
            },
            className: "dark:bg-gray-700 dark:text-white",
          }}
        />
        {error && <Box sx={{ color: "#ef4444", fontSize: "0.875rem", mt: 1 }}>{t.required}</Box>}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, justifyContent: "space-between" }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderRadius: "4px",
            textTransform: "none",
            px: 3,
            borderColor: "#e5e7eb",
            color: "#374151",
          }}
          className="dark:border-gray-600 dark:text-gray-300"
        >
          {t.cancel}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            borderRadius: "4px",
            textTransform: "none",
            px: 3,
            backgroundColor: "#6366f1",
            "&:hover": {
              backgroundColor: "#4f46e5",
            },
          }}
        >
          {t.create}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

