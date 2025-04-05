"use client"

import { Breadcrumbs, Typography, Link as MuiLink } from "@mui/material"
import { NavigateNext as NavigateNextIcon } from "@mui/icons-material"
import Link from "next/link"

interface BreadcrumbItem {
  label: string
  href: string
}

interface VideoBreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function VideoBreadcrumbs({ items }: VideoBreadcrumbsProps) {
  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ padding: "15px 0" }}>
      {items.map((item, index) =>
        index === items.length - 1 ? (
          <Typography key={index} variant="body2" sx={{ fontWeight: 500 }} className="dark:text-white">
            {item.label}
          </Typography>
        ) : (
          <MuiLink
            key={index}
            component={Link}
            href={item.href}
            underline="hover"
            sx={{ color: "#666" }}
            className="dark:text-gray-400 dark:hover:text-gray-300"
          >
            <Typography variant="body2">{item.label}</Typography>
          </MuiLink>
        ),
      )}
    </Breadcrumbs>
  )
}

