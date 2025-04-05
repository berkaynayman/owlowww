import type React from "react"
import { Box, Typography, List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { VersionSwitcher } from "@/components/version-switcher"
import { SearchForm } from "@/components/search-form"

interface NavItem {
  title: string
  url: string
  isActive: boolean
}

interface NavGroup {
  title: string
  items: NavItem[]
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  data: {
    versions: string[]
    navMain: NavGroup[]
  }
}

const AppSidebar: React.FC<SidebarProps> = ({ data, ...props }) => {
  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        borderRight: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
      {...props}
    >
      <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
        <VersionSwitcher versions={data.versions} defaultVersion={data.versions[0]} />
        <SearchForm />
      </Box>
      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        {data.navMain.map((item) => (
          <Box key={item.title} sx={{ mb: 3 }}>
            <Typography
              variant="overline"
              sx={{ color: "text.secondary", fontWeight: "bold", display: "block", mb: 1 }}
            >
              {item.title}
            </Typography>
            <List dense disablePadding>
              {item.items.map((subItem) => (
                <ListItem key={subItem.title} disablePadding>
                  <ListItemButton
                    component="a"
                    href={subItem.url}
                    selected={subItem.isActive}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      "&.Mui-selected": {
                        bgcolor: "primary.light",
                        color: "primary.main",
                        "&:hover": {
                          bgcolor: "primary.light",
                        },
                      },
                    }}
                  >
                    <ListItemText primary={subItem.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 4,
          height: "100%",
          bgcolor: "divider",
        }}
      />
    </Box>
  )
}

export default AppSidebar

