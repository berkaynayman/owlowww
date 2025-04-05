"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  InputAdornment,
  TextField,
  Button,
} from "@mui/material"
import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from "@mui/icons-material"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import NewAccessModal from "@/components/admin/new-access-modal"
import { useRouter } from "next/navigation"

// Mock data for access groups
const mockAccessGroups = [
  {
    id: "1",
    name: 'Zugang: "Schwarze Liste" des Zolls - stehen wir drauf?',
    members: 9,
    courseImage: "/placeholder.svg?height=60&width=80",
  },
  {
    id: "2",
    name: "Zugang: VIP-Erfolgspaket Webinar Sparen bei Zoll",
    members: 7,
    courseImage: "/placeholder.svg?height=60&width=80",
  },
  {
    id: "3",
    name: "Zugang: Zoll-Helpdesk: Live-Support",
    members: 0,
    courseImage: "/placeholder.svg?height=60&width=80",
  },
  {
    id: "4",
    name: "Zugang: Test",
    members: 0,
    courseImage: "/placeholder.svg?height=60&width=80",
  },
]

export default function AdminAccessPage() {
  const { language } = useLanguage()
  const [accessGroups, setAccessGroups] = useState(mockAccessGroups)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  const translations = {
    de: {
      title: "Zugänge",
      searchPlaceholder: "Zugänge nach Namen suchen",
      addAccess: "Neuer Zugang",
      name: "NAME",
      members: "MITGLIEDER",
      courses: "KURSE",
      actions: "AKTIONEN",
      edit: "Bearbeiten",
      delete: "Löschen",
    },
    en: {
      title: "Access",
      searchPlaceholder: "Search access by name",
      addAccess: "New Access",
      name: "NAME",
      members: "MEMBERS",
      courses: "COURSES",
      actions: "ACTIONS",
      edit: "Edit",
      delete: "Delete",
    },
  }

  const t = translations[language]

  const handleDelete = (id: string) => {
    setAccessGroups(accessGroups.filter((group) => group.id !== id))
  }

  const handleAddAccess = (name: string) => {
    const newAccess = {
      id: `${accessGroups.length + 1}`,
      name: `Zugang: ${name}`,
      members: 0,
      courseImage: "/placeholder.svg?height=60&width=80",
    }
    setAccessGroups([...accessGroups, newAccess])
  }

  const handleRowClick = (id: string) => {
    router.push(`/admin/access/${id}`)
  }

  const filteredAccessGroups = accessGroups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: "bold" }} className="dark:text-white">
        {t.title}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <TextField
          placeholder={t.searchPlaceholder}
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: "500px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
            },
          }}
          className="dark:bg-gray-800"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="dark:text-gray-300" />
              </InputAdornment>
            ),
            className: "dark:text-white",
          }}
        />
        <Button
          variant="contained"
          onClick={() => setIsModalOpen(true)}
          sx={{
            backgroundColor: "#2563eb",
            color: "white",
            borderRadius: "30px",
            textTransform: "none",
            px: 4,
            py: 1.5,
            fontWeight: "medium",
            "&:hover": {
              backgroundColor: "#1d4ed8",
            },
          }}
          className="dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {t.addAccess}
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ boxShadow: "none", border: "1px solid #e5e7eb" }}
        className="dark:bg-gray-900 dark:border-gray-700"
      >
        <Table>
          <TableHead>
            <TableRow className="dark:bg-gray-800">
              <TableCell className="dark:text-gray-300" sx={{ fontWeight: "medium", color: "#6b7280", py: 2 }}>
                {t.name}
              </TableCell>
              <TableCell className="dark:text-gray-300" sx={{ fontWeight: "medium", color: "#6b7280", py: 2 }}>
                {t.members}
              </TableCell>
              <TableCell className="dark:text-gray-300" sx={{ fontWeight: "medium", color: "#6b7280", py: 2 }}>
                {t.courses}
              </TableCell>
              <TableCell
                className="dark:text-gray-300"
                align="right"
                sx={{ fontWeight: "medium", color: "#6b7280", py: 2 }}
              >
                {t.actions}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAccessGroups.map((group) => (
              <TableRow
                key={group.id}
                className="dark:border-gray-700 dark:hover:bg-gray-800"
                sx={{
                  "&:hover": { backgroundColor: "#f9fafb", cursor: "pointer" },
                  borderBottom: "1px solid #e5e7eb",
                }}
                onClick={() => handleRowClick(group.id)}
              >
                <TableCell component="th" scope="row" className="dark:text-white" sx={{ py: 3 }}>
                  {group.name}
                </TableCell>
                <TableCell className="dark:text-white" sx={{ py: 3 }}>
                  {group.members}
                </TableCell>
                <TableCell className="dark:text-white" sx={{ py: 3 }}>
                  <Box sx={{ width: 80, height: 60, position: "relative", borderRadius: "4px", overflow: "hidden" }}>
                    <Image
                      src={group.courseImage || "/placeholder.svg"}
                      alt={group.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right" sx={{ py: 3 }}>
                  <IconButton
                    color="primary"
                    title={t.edit}
                    className="dark:text-blue-400"
                    sx={{ color: "#6b7280" }}
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/admin/access/${group.id}/edit`)
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    title={t.delete}
                    className="dark:text-red-400"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(group.id)
                    }}
                    sx={{ color: "#6b7280" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <NewAccessModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddAccess} />
    </Box>
  )
}

