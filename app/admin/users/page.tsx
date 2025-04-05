"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Chip,
  InputAdornment,
  Menu,
  MenuItem,
} from "@mui/material"
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  FileDownload as FileDownloadIcon,
  Add as AddIcon,
  Info as InfoIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import { useRouter } from "next/navigation"

// Mock data for users
const mockUsers = [
  {
    id: "1",
    name: "Julia Blechschmidt",
    email: "julia.blechschmidt@owlaw.de",
    role: "admin",
    status: "active",
    created: "23.01.25, 12:49",
    lastLogin: "20.03.25, 19:11",
    logins: 13,
  },
  {
    id: "2",
    name: "Anton Schmoll",
    email: "anton.schmoll@owlaw.de",
    role: "admin",
    status: "active",
    created: "15.12.24, 10:30",
    lastLogin: "19.03.25, 14:22",
    logins: 27,
  },
  {
    id: "3",
    name: "Max Mustermann",
    email: "max.mustermann@example.com",
    role: "user",
    status: "active",
    created: "05.02.25, 09:15",
    lastLogin: "18.03.25, 11:45",
    logins: 8,
  },
  {
    id: "4",
    name: "Erika Musterfrau",
    email: "erika.musterfrau@example.com",
    role: "user",
    status: "inactive",
    created: "10.01.25, 14:20",
    lastLogin: "15.02.25, 16:30",
    logins: 5,
  },
]

export default function AdminUsersPage() {
  const { language } = useLanguage()
  const router = useRouter()
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const translations = {
    de: {
      members: "Mitglieder",
      learnMore: "Erfahre mehr über Mitglieder",
      membersTab: "Mitglieder",
      propertiesGroupsTab: "Eigenschaftsgruppen",
      searchPlaceholder: "Mitglied suchen",
      exportCSV: "Export CSV",
      reload: "Neu Laden",
      manage: "Verwalten",
      add: "Hinzufügen",
      name: "NAME",
      created: "ERSTELLT",
      lastLogin: "LETZTER LOGIN",
      logins: "LOGINS",
      admin: "Admin",
    },
    en: {
      members: "Members",
      learnMore: "Learn more about members",
      membersTab: "Members",
      propertiesGroupsTab: "Property Groups",
      searchPlaceholder: "Search member",
      exportCSV: "Export CSV",
      reload: "Reload",
      manage: "Manage",
      add: "Add",
      name: "NAME",
      created: "CREATED",
      lastLogin: "LAST LOGIN",
      logins: "LOGINS",
      admin: "Admin",
    },
  }

  const t = translations[language]

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = users.map((user) => user.id)
      setSelectedUsers(newSelected)
      return
    }
    setSelectedUsers([])
  }

  const handleSelectUser = (id: string) => {
    const selectedIndex = selectedUsers.indexOf(id)
    let newSelected: string[] = []

    if (selectedIndex === -1) {
      newSelected = [...selectedUsers, id]
    } else {
      newSelected = selectedUsers.filter((userId) => userId !== id)
    }

    setSelectedUsers(newSelected)
  }

  const isSelected = (id: string) => selectedUsers.indexOf(id) !== -1

  const handleManageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleManageClose = () => {
    setAnchorEl(null)
  }

  const handleUserClick = (userId: string) => {
    router.push(`/admin/users/${userId}`)
  }

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 1 }} className="dark:text-white">
          {t.members}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <InfoIcon fontSize="small" color="action" className="dark:text-gray-100" />
          <Typography variant="body2" color="text.secondary" className="dark:text-gray-400">
            {t.learnMore}
          </Typography>
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              py: 2,
              px: 3,
              borderBottom: "2px solid #4a7bff",
              color: "#4a7bff",
              fontWeight: "medium",
            }}
            className="dark:text-blue-400"
          >
            {t.membersTab}
          </Box>
          <Box
            sx={{
              py: 2,
              px: 3,
              color: "text.secondary",
              "&:hover": {
                color: "text.primary",
                cursor: "pointer",
              },
            }}
            className="dark:text-gray-400 dark:hover:text-gray-300"
          >
            {t.propertiesGroupsTab}
          </Box>
        </Box>
      </Box>

      {/* Search and Actions */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <TextField
          placeholder={t.searchPlaceholder}
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            flex: { xs: "1 1 100%", sm: "1 1 auto" },
            maxWidth: { sm: "400px" },
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
              paddingLeft: 2,
            },
          }}
          className="dark:bg-gray-800"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="dark:text-gray-400" />
              </InputAdornment>
            ),
            className: "dark:text-white dark:border-gray-700",
          }}
        />

        <IconButton
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "8px",
          }}
          className="dark:border-gray-700 dark:text-gray-400"
        >
          <FilterListIcon />
        </IconButton>

        <Button
          variant="outlined"
          startIcon={<FileDownloadIcon />}
          sx={{
            borderRadius: "8px",
            textTransform: "none",
          }}
          className="dark:border-gray-700 dark:text-gray-300"
        >
          {t.exportCSV}
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          variant="outlined"
          sx={{
            borderRadius: "8px",
            textTransform: "none",
          }}
          className="dark:border-gray-700 dark:text-gray-300"
        >
          {t.reload}
        </Button>

        <Button
          variant="outlined"
          endIcon={<KeyboardArrowDownIcon />}
          onClick={handleManageClick}
          sx={{
            borderRadius: "8px",
            textTransform: "none",
          }}
          className="dark:border-gray-700 dark:text-gray-300"
        >
          {t.manage}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleManageClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            className: "dark:bg-gray-800 dark:border dark:border-gray-700",
          }}
        >
          <MenuItem onClick={handleManageClose} className="dark:text-gray-300 dark:hover:bg-gray-700">
            Option 1
          </MenuItem>
          <MenuItem onClick={handleManageClose} className="dark:text-gray-300 dark:hover:bg-gray-700">
            Option 2
          </MenuItem>
        </Menu>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            bgcolor: "#4a7bff",
            "&:hover": {
              bgcolor: "#3a6ae8",
            },
          }}
          className="dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {t.add}
        </Button>
      </Box>

      {/* Users Table */}
      <TableContainer component={Paper} sx={{ mb: 3 }} className="dark:bg-gray-900 dark:border dark:border-gray-700">
        <Table>
          <TableHead className="dark:bg-gray-800">
            <TableRow>
              <TableCell padding="checkbox" className="dark:text-gray-300 dark:border-gray-700">
                <Checkbox
                  indeterminate={selectedUsers.length > 0 && selectedUsers.length < users.length}
                  checked={users.length > 0 && selectedUsers.length === users.length}
                  onChange={handleSelectAllClick}
                  className="dark:text-gray-300"
                />
              </TableCell>
              <TableCell className="dark:text-gray-300 dark:border-gray-700">{t.name}</TableCell>
              <TableCell align="right" className="dark:text-gray-300 dark:border-gray-700">
                {t.created} ↓
              </TableCell>
              <TableCell align="right" className="dark:text-gray-300 dark:border-gray-700">
                {t.lastLogin}
              </TableCell>
              <TableCell align="right" className="dark:text-gray-300 dark:border-gray-700">
                {t.logins}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              const isItemSelected = isSelected(user.id)
              return (
                <TableRow
                  key={user.id}
                  hover
                  onClick={() => handleUserClick(user.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  selected={isItemSelected}
                  sx={{ cursor: "pointer" }}
                  className="dark:hover:bg-gray-800 dark:text-white"
                >
                  <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()} className="dark:border-gray-700">
                    <Checkbox
                      checked={isItemSelected}
                      onChange={() => handleSelectUser(user.id)}
                      className="dark:text-gray-300"
                    />
                  </TableCell>
                  <TableCell className="dark:border-gray-700">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          bgcolor: "#6b7280",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image src="/placeholder.svg?height=40&width=40" alt={user.name} width={40} height={40} />
                      </Box>
                      <Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography variant="body1" className="dark:text-white">
                            {user.name}
                          </Typography>
                          {user.role === "admin" && (
                            <Chip
                              label={t.admin}
                              size="small"
                              sx={{
                                bgcolor: "#e0e7ff",
                                color: "#4a7bff",
                                fontWeight: "medium",
                                fontSize: "0.75rem",
                              }}
                              className="dark:bg-blue-900 dark:text-blue-300"
                            />
                          )}
                        </Box>
                        <Typography variant="body2" color="text.secondary" className="dark:text-gray-400">
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="right" className="dark:border-gray-700">
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
                      <IconButton size="small" className="dark:text-gray-300">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </IconButton>
                      <Typography className="dark:text-white">{user.created}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right" className="dark:border-gray-700 dark:text-white">
                    {user.lastLogin}
                  </TableCell>
                  <TableCell align="right" className="dark:border-gray-700 dark:text-white">
                    {user.logins}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

