"use client"

import {useEffect, useRef, useState} from "react"
import {Badge, Box, IconButton, InputBase, Paper} from "@mui/material"
import {
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon,
    Menu as MenuIcon,
    Notifications as NotificationsIcon,
    Search as SearchIcon,
    Settings as SettingsIcon,
} from "@mui/icons-material"
import {useTheme} from "@/contexts/theme-context"
import {useLanguage} from "@/contexts/language-context"
import NotificationsDropdown from "./notifications-dropdown"
import UserDropdown from "./user-dropdown"
import {useMobile} from "@/hooks/use-mobile"
import {useAuth} from "@/contexts/AuthContext";

interface DashboardToolbarProps {
    onMenuClick?: () => void
}

export default function DashboardToolbar({onMenuClick}: DashboardToolbarProps) {
    const {isDarkMode, toggleTheme} = useTheme()
    const {language} = useLanguage()
    const [searchValue, setSearchValue] = useState("")
    const [isSearchExpanded, setIsSearchExpanded] = useState(false)
    const searchInputRef = useRef<HTMLInputElement>(null)
    const searchContainerRef = useRef<HTMLDivElement>(null)
    const [notificationsOpen, setNotificationsOpen] = useState(false)
    const [userDropdownOpen, setUserDropdownOpen] = useState(false)
    const [activeButton, setActiveButton] = useState<string | null>(null)
    const isMobile = useMobile()

    const handleUserClick = () => {
        setUserDropdownOpen((prev) => !prev)
        // Close notifications dropdown if open
        if (notificationsOpen) {
            setNotificationsOpen(false)
        }
    }

    const handleSearchClick = () => {
        if (!isSearchExpanded) {
            setIsSearchExpanded(true)
            // Focus the input after expansion
            setTimeout(() => {
                searchInputRef.current?.focus()
            }, 300) // Wait for animation to complete
        }
    }

    // Handle clicks outside the search box to collapse it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isSearchExpanded &&
                searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target as Node) &&
                !searchValue
            ) {
                setIsSearchExpanded(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isSearchExpanded, searchValue])

    const translations = {
        de: {
            search: "Suche",
        },
        en: {
            search: "Search",
        },
    }

    const t = translations[language]
    const {notifications} = useAuth();
    const unreadCount = notifications?.filter((n) => !n.read).length || 0

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "42px 20px 32px 20px",
                height: "64px",
                position: "relative",
            }}
            className="dark:bg-gray-900 dark:border-gray-700 transition-colors duration-200"
        >
            {/* Menu button for mobile */}
            {isMobile && (
                <IconButton onClick={onMenuClick} sx={{marginRight: 1}} className="dark:text-white">
                    <MenuIcon/>
                </IconButton>
            )}

            {/* Search Box */}
            <Paper
                ref={searchContainerRef}
                onClick={handleSearchClick}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#F5F5F7",
                    borderRadius: "50px",
                    padding: "8px 12px",
                    width: isSearchExpanded ? {xs: "150px", sm: "200px", md: "350px"} : "40px",
                    transition: "width 0.3s ease-in-out",
                    overflow: "hidden",
                    cursor: isSearchExpanded ? "auto" : "pointer",
                    boxShadow: "none",
                }}
                className="dark:bg-gray-800 transition-colors duration-200"
                elevation={0}
            >
                <SearchIcon sx={{color: "#757575", fontSize: "20px", marginRight: "8px"}}
                            className="dark:text-gray-400"/>
                <InputBase
                    inputRef={searchInputRef}
                    placeholder={t.search}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    sx={{
                        flex: 1,
                        fontSize: "14px",
                    }}
                    className="dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                />
            </Paper>

            {/* Right side tools */}
            <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                {/* Action buttons */}
                <Paper
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#F5F5F7",
                        borderRadius: "50px",
                        padding: "4px 8px",
                        marginRight: "8px",
                        boxShadow: "none",
                    }}
                    className="dark:bg-gray-800 transition-colors duration-200"
                    elevation={0}
                >
                    {/* Light/Dark Mode Toggle */}
                    <IconButton
                        size="small"
                        sx={{width: 36, height: 36}}
                        onClick={toggleTheme}
                        className="transition-colors duration-200"
                    >
                        {isDarkMode ? (
                            <DarkModeIcon sx={{fontSize: "20px"}} className="text-yellow-400"/>
                        ) : (
                            <LightModeIcon sx={{fontSize: "20px"}} className="text-gray-600"/>
                        )}
                    </IconButton>

                    {/* Notifications */}
                    <Box sx={{position: "relative"}}>
                        <IconButton
                            size="small"
                            sx={{width: 36, height: 36}}
                            className="dark:text-white"
                            onClick={() => {
                                setNotificationsOpen((prev) => !prev)
                                if (userDropdownOpen) {
                                    setUserDropdownOpen(false)
                                }
                            }}
                        >
                            <Badge badgeContent={unreadCount} color="error">
                                <NotificationsIcon sx={{fontSize: "20px"}}/>
                            </Badge>
                        </IconButton>
                    </Box>

                    {/* Settings - Hide on small mobile */}
                    <IconButton
                        size="small"
                        sx={{
                            width: 36,
                            height: 36,
                            display: {xs: "none", sm: "flex"},
                        }}
                        className="dark:text-white"
                    >
                        <SettingsIcon sx={{fontSize: "20px"}}/>
                    </IconButton>

                    {/* User Profile */}
                    <Box
                        onClick={handleUserClick}
                        sx={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            backgroundColor: "#9E9E9E",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: "bold",
                            cursor: "pointer",
                            "&:hover": {
                                opacity: 0.8,
                            },
                        }}
                    >
                        TW
                    </Box>
                </Paper>
            </Box>
            {/* Notifications Dropdown */}
            <NotificationsDropdown open={notificationsOpen} onClose={() => setNotificationsOpen(false)}/>

            {/* User Dropdown */}
            <UserDropdown
                open={userDropdownOpen}
                onClose={() => setUserDropdownOpen(false)}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
            />
        </Box>
    )
}

