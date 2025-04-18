import { Box, CircularProgress, Typography } from "@mui/material"

export default function AccessDetailLoading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <CircularProgress size={60} thickness={4} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Loading access details...
      </Typography>
    </Box>
  )
}

