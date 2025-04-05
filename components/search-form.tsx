"use client"

import type React from "react"

import { Search } from "@mui/icons-material"
import { Box, TextField, InputAdornment } from "@mui/material"

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <Box sx={{ position: "relative" }}>
        <TextField
          id="search"
          placeholder="Search the docs..."
          fullWidth
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />
      </Box>
    </form>
  )
}

