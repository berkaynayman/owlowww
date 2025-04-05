import { Box, Typography, Divider, IconButton } from "@mui/material"
import { Menu as MenuIcon } from "@mui/icons-material"

export default function Sidebar() {
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          width: 300,
          height: "100vh",
          borderRight: "1px solid",
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6">Sidebar</Typography>
          <IconButton>
            <MenuIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ p: 2, flex: 1, overflowY: "auto" }}>
          <Typography>Sidebar Content</Typography>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography>Main Content</Typography>
      </Box>
    </Box>
  )
}

