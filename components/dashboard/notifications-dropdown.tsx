"use client"

import type React from "react"
import {useEffect, useRef, useState} from "react"
import {Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography} from "@mui/material"
import {
    AccessTime as AccessTimeIcon,
    Check as CheckIcon,
    Message as MessageIcon,
    Visibility as VisibilityIcon,
} from "@mui/icons-material"
import {useAuth} from "@/contexts/AuthContext";

interface Notification {
    id: string
    message: React.ReactNode
    time: string
    read: boolean
}

export default function NotificationsDropdown({
                                                  open,
                                                  onClose,
                                              }: {
    open: boolean
    onClose: () => void
}) {
    const dropdownRef = useRef<HTMLDivElement>(null)
    const {notifications} = useAuth();

    // Sample notifications data
    const unreadCount = notifications?.filter((n) => !n.read).length || 0

    // Handle clicks outside to close the dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose()
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [open, onClose])

    const markAllAsRead = () => {
//        setNotifications((prev) => prev.map((notification) => ({...notification, read: true})))
    }

    if (!open) return null

    return (
        <Paper
            ref={dropdownRef}
            elevation={5}
            sx={{
                position: "absolute",
                top: "60px",
                right: {xs: "10px", sm: "20px"},
                width: {xs: "calc(100vw - 20px)", sm: "400px"},
                maxWidth: "100%",
                borderRadius: "8px",
                zIndex: 1200,
                overflow: "hidden",
                bgcolor: "background.paper",
            }}
            className="dark:bg-gray-900 dark:border dark:border-gray-700"
        >
            {/* Header */}
            <Box
                sx={{
                    padding: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                }}
                className="dark:border-gray-700"
            >
                <Box>
                    <Typography variant="h6" sx={{fontWeight: "medium"}} className="dark:text-white">
                        Benachrichtigungen
                    </Typography>
                    {unreadCount > 0 && (
                        <Typography variant="body2" sx={{color: "text.secondary"}} className="dark:text-gray-400">
                            {unreadCount} ungelesene Nachricht{unreadCount !== 1 ? "en" : ""}
                        </Typography>
                    )}
                </Box>
                <Box sx={{display: "flex", gap: 1}}>
                    <IconButton
                        size="small"
                        sx={{
                            bgcolor: "action.hover",
                            width: 36,
                            height: 36,
                        }}
                        className="dark:bg-gray-800 dark:text-gray-300"
                        onClick={() => {
                        }}
                        title="Alle anzeigen"
                    >
                        <VisibilityIcon sx={{fontSize: 20}}/>
                    </IconButton>
                    <IconButton
                        size="small"
                        sx={{
                            bgcolor: "success.light",
                            width: 36,
                            height: 36,
                            "& .MuiSvgIcon-root": {
                                color: "success.main",
                            },
                        }}
                        className="dark:bg-gray-800 dark:text-green-400"
                        onClick={markAllAsRead}
                        title="Alle als gelesen markieren"
                    >
                        <CheckIcon sx={{fontSize: 20}}/>
                    </IconButton>
                </Box>
            </Box>

            {/* Unread Section */}
            {unreadCount > 0 && (
                <>
                    <Box
                        sx={{
                            padding: "12px 20px",
                            bgcolor: "action.hover",
                        }}
                        className="dark:bg-gray-800"
                    >
                        <Typography
                            variant="caption"
                            sx={{
                                fontWeight: "bold",
                                color: "text.secondary",
                                letterSpacing: "0.5px",
                            }}
                            className="dark:text-gray-400"
                        >
                            UNGELESEN
                        </Typography>
                    </Box>

                    {/* Notification Items */}
                    <List sx={{padding: 0}}>
                        {notifications
                            .filter((n) => !n.read)
                            .map((notification) => (
                                <ListItem
                                    key={notification.id}
                                    sx={{
                                        padding: "16px 20px",
                                        bgcolor: "action.hover",
                                        cursor: "pointer",
                                        "&:hover": {
                                            bgcolor: "action.selected",
                                        },
                                    }}
                                    className="dark:bg-gray-800 dark:hover:bg-gray-700"
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{bgcolor: "action.selected"}} className="dark:bg-gray-700">
                                            <MessageIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography variant="body2" className="dark:text-white">
                                                {notification.message}
                                            </Typography>
                                        }
                                        secondary={
                                            <Box
                                                sx={{display: "flex", alignItems: "center", color: "text.secondary"}}
                                                className="dark:text-gray-400"
                                            >
                                                <AccessTimeIcon sx={{fontSize: 16, marginRight: 0.5}}/>
                                                <Typography variant="caption">{notification.time}</Typography>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                            ))}
                    </List>
                </>
            )}

            {/* Empty State */}
            {unreadCount === 0 && (
                <Box
                    sx={{
                        padding: "30px 20px",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="body1" className="dark:text-gray-300">
                        Keine ungelesenen Benachrichtigungen
                    </Typography>
                </Box>
            )}
        </Paper>
    )
}

