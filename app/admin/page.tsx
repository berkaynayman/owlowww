"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminPage() {
  const router = useRouter()

  // Redirect to courses page by default
  useEffect(() => {
    router.push("/admin/courses")
  }, [router])

  return null
}

