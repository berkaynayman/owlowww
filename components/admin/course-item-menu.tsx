"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Menu, MenuItem, ListItemIcon, ListItemText, IconButton } from "@mui/material"
import {
  MoreVert as MoreVertIcon,
  Settings as SettingsIcon,
  ContentCopy as ContentCopyIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  List as ListIcon,
} from "@mui/icons-material"
import { useLanguage } from "@/contexts/language-context"

interface CourseItemMenuProps {
  onOpenProperties: () => void
  onDuplicate: () => void
  onNotifyMembers: () => void
  onDelete: () => void
  onViewContents: () => void
}

export default function CourseItemMenu({
  onOpenProperties,
  onDuplicate,
  onNotifyMembers,
  onDelete,
  onViewContents,
}: CourseItemMenuProps) {
  const { language } = useLanguage()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const menuRef = useRef<HTMLDivElement>(null)

  const translations = {
    de: {
      properties: "Eigenschaften",
      contents: "Inhalte",
      duplicate: "Duplizieren",
      notifyMembers: "Mitglieder benachrichtigen",
      delete: "Löschen",
    },
    en: {
      properties: "Properties",
      contents: "Contents",
      duplicate: "Duplicate",
      notifyMembers: "Notify members",
      delete: "Delete",
    },
  }

  const t = translations[language]

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (callback: () => void) => {
    handleClose()
    callback()
  }

  return (
    <div ref={menuRef}>
      <IconButton onClick={handleClick} size="small" className="dark:text-white" aria-label="more options">
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            minWidth: 220,
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          },
          className: "dark:bg-gray-800",
        }}
      >
        <MenuItem
          onClick={() => handleMenuItemClick(onOpenProperties)}
          className="dark:text-white dark:hover:bg-gray-700"
        >
          <ListItemIcon>
            <SettingsIcon fontSize="small" className="dark:text-gray-300" />
          </ListItemIcon>
          <ListItemText>{t.properties}</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => handleMenuItemClick(onViewContents)}
          className="dark:text-white dark:hover:bg-gray-700"
        >
          <ListItemIcon>
            <ListIcon fontSize="small" className="dark:text-gray-300" />
          </ListItemIcon>
          <ListItemText>{t.contents}</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleMenuItemClick(onDuplicate)} className="dark:text-white dark:hover:bg-gray-700">
          <ListItemIcon>
            <ContentCopyIcon fontSize="small" className="dark:text-gray-300" />
          </ListItemIcon>
          <ListItemText>{t.duplicate}</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => handleMenuItemClick(onNotifyMembers)}
          className="dark:text-white dark:hover:bg-gray-700"
        >
          <ListItemIcon>
            <EmailIcon fontSize="small" className="dark:text-gray-300" />
          </ListItemIcon>
          <ListItemText>{t.notifyMembers}</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => handleMenuItemClick(onDelete)}
          className="dark:text-white dark:hover:bg-gray-700"
          sx={{ color: "error.main" }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>{t.delete}</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  )
}

