import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider as MUIThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Legalsuite - Login",
  description: "Geschützter Mandantenbereich",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={inter.className} suppressHydrationWarning>
        <Toaster richColors position="top-center" />
        <MUIThemeProvider>{children}</MUIThemeProvider>
      </body>
    </html>
  )
}

