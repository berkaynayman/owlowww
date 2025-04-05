"use client"

import { useState } from "react"
import { Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material"

interface VersionSwitcherProps {
  versions: string[]
  defaultVersion?: string
}

export function VersionSwitcher({ versions, defaultVersion }: VersionSwitcherProps) {
  const [version, setVersion] = useState(defaultVersion || versions[0])

  return (
    <Box sx={{ mb: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="version-select-label">Version</InputLabel>
        <Select
          labelId="version-select-label"
          id="version-select"
          value={version}
          label="Version"
          onChange={(e) => setVersion(e.target.value)}
        >
          {versions.map((v) => (
            <MenuItem key={v} value={v}>
              {v}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

