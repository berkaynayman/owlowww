"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Typography,
  IconButton,
  Card,
  CardContent,
  Collapse,
  Divider,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material"
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"
import { useRouter } from "next/navigation"
import CoursePropertiesDrawer from "@/components/admin/course-properties-drawer"
import ModulePropertiesDrawer from "@/components/admin/module-properties-drawer"
import CourseItemMenu from "@/components/admin/course-item-menu"
import NewChapterModal from "@/components/admin/new-chapter-modal"
import { toast } from "sonner"

// Mock data for courses
const mockCourses = [
  {
    id: "1",
    title: "[MASTER] Export Essentials",
    description: "Erfahre mehr über den Kurseditor",
    imageUrl: "/placeholder.svg?height=300&width=400",
    modules: [
      {
        id: "m1",
        title: "Einführung",
        status: "soon",
        lessons: [],
      },
      {
        id: "m2",
        title: "Aufzeichnung Live-Veranstaltungen",
        status: "soon",
        lessons: [
          { id: "l1", title: "Wie die Zollorganisation aufzubauen ist", status: "soon" },
          { id: "l2", title: "Zolltarifnummern I", status: "soon" },
          { id: "l3", title: "Zolltarifnummern II - Teile und Zubehör", status: "soon" },
          { id: "l4", title: "Zollwert richtig kalkulieren", status: "soon" },
          { id: "l5", title: "Follow-Up: Tarifnummern, Zollwert", status: "soon" },
          { id: "l6", title: "Warenursprung- und Präferenzen", status: "soon" },
          { id: "l7", title: "Zollbescheide prüfen", status: "soon" },
          { id: "l8", title: "Instruktionen und Absicherung der Spediteurs-Instruktionen", status: "soon" },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Zollrecht für Fortgeschrittene",
    description: "Fortgeschrittene Konzepte im Zollrecht",
    modules: [
      {
        id: "m1",
        title: "Grundlagen der Zollverfahren",
        status: "soon",
        lessons: [],
      },
      {
        id: "m2",
        title: "Internationale Handelsabkommen",
        status: "soon",
        lessons: [],
      },
    ],
  },
]

export default function AdminCoursesPage() {
  const { language } = useLanguage()
  const router = useRouter()
  const [courses, setCourses] = useState(mockCourses)
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null)
  const [expandedModule, setExpandedModule] = useState<string | null>(null)
  const [propertiesDrawerOpen, setPropertiesDrawerOpen] = useState(false)
  const [modulePropertiesDrawerOpen, setModulePropertiesDrawerOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(courses[0])
  const [selectedModule, setSelectedModule] = useState<any>(null)
  const [selectedLesson, setSelectedLesson] = useState<any>(null)
  const [isChapter, setIsChapter] = useState(true)
  const [newChapterModalOpen, setNewChapterModalOpen] = useState(false)

  const translations = {
    de: {
      title: "Kursverwaltung",
      addCourse: "Kurs hinzufügen",
      addChapter: "Kapitel",
      properties: "Eigenschaften",
      soonAvailable: "Bald verfügbar",
      published: "Veröffentlicht",
      draft: "Entwurf",
      archived: "Archiviert",
      duplicated: "Kurs dupliziert",
      notificationSent: "Benachrichtigung gesendet",
      deleted: "Gelöscht",
      lessonDuplicated: "Lektion dupliziert",
      lessonDeleted: "Lektion gelöscht",
      chapterCreated: "Kapitel erstellt",
    },
    en: {
      title: "Course Management",
      addCourse: "Add Course",
      addChapter: "Add Chapter",
      properties: "Properties",
      soonAvailable: "Soon available",
      published: "Published",
      draft: "Draft",
      archived: "Archived",
      duplicated: "Course duplicated",
      notificationSent: "Notification sent",
      deleted: "Deleted",
      lessonDuplicated: "Lesson duplicated",
      lessonDeleted: "Lesson deleted",
      chapterCreated: "Chapter created",
    },
  }

  const t = translations[language]

  const handleToggleCourse = (courseId: string) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId)
  }

  const handleToggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId)
  }

  const handleOpenPropertiesDrawer = (course) => {
    setSelectedCourse(course)
    setPropertiesDrawerOpen(true)
  }

  const handleOpenModuleProperties = (item, isModuleNotLesson = true) => {
    setSelectedModule(item)
    setIsChapter(isModuleNotLesson)
    setModulePropertiesDrawerOpen(true)
  }

  const handleDuplicateCourse = (course) => {
    toast.success(t.duplicated)
  }

  const handleNotifyMembers = (course) => {
    toast.success(t.notificationSent)
  }

  const handleDeleteCourse = (course) => {
    toast.success(t.deleted)
  }

  const handleViewContents = (course) => {
    // Implementation for viewing contents
  }

  const handleDuplicateLesson = (lesson) => {
    toast.success(t.lessonDuplicated)
  }

  const handleDeleteLesson = (lesson) => {
    toast.success(t.lessonDeleted)
  }

  const handleLessonClick = (lessonId) => {
    router.push(`/admin/courses/lesson/${lessonId}`)
  }

  const handleStatusChange = (event, moduleId) => {
    event.stopPropagation()
    // Here you would update the status in your state/database
    console.log(`Status changed for module ${moduleId} to ${event.target.value}`)
  }

  const handleOpenNewChapterModal = () => {
    setNewChapterModalOpen(true)
  }

  const handleCreateNewChapter = (name: string) => {
    // Here you would create a new chapter in your state/database
    console.log(`Creating new chapter: ${name}`)

    // Add the new chapter to the first course
    const newModule = {
      id: `m${courses[0].modules.length + 1}`,
      title: name,
      status: "draft",
      lessons: [],
    }

    const updatedCourses = [...courses]
    updatedCourses[0].modules.push(newModule)
    setCourses(updatedCourses)

    toast.success(t.chapterCreated)
  }

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ mr: 1 }}>
            <IconButton
              sx={{
                backgroundColor: "#f0f0f0",
                width: 40,
                height: 40,
              }}
              className="dark:bg-gray-700"
            >
              <Image src="/placeholder.svg?height=24&width=24" alt="Course" width={24} height={24} />
            </IconButton>
          </Box>
          <Typography variant="body1" className="dark:text-gray-300">
            {courses[0]?.title}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" component="h1" className="dark:text-white">
          {courses[0]?.title}
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<SettingsIcon />}
            sx={{
              borderRadius: "30px",
              textTransform: "none",
              px: 3,
              py: 1,
              borderColor: "#e5e7eb",
              color: "#374151",
            }}
            className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
            onClick={() => handleOpenPropertiesDrawer(courses[0])}
          >
            {t.properties}
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#2563eb",
              color: "white",
              borderRadius: "30px",
              textTransform: "none",
              px: 3,
              py: 1,
              "&:hover": {
                backgroundColor: "#1d4ed8",
              },
            }}
            className="dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={handleOpenNewChapterModal}
          >
            {t.addChapter}
          </Button>
          <IconButton className="dark:text-white">
            <ExpandLessIcon />
          </IconButton>
        </Box>
      </Box>

      <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }} className="dark:text-gray-400">
        {courses[0]?.description}
      </Typography>

      {courses[0]?.modules.map((module) => (
        <Card
          key={module.id}
          sx={{
            mb: 2,
            borderRadius: 2,
            boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
          }}
          className="dark:bg-gray-800 dark:border dark:border-gray-500"
        >
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ display: "flex", p: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    backgroundColor: "#0b182c",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 1,
                    mr: 2,
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      backgroundColor: "red",
                      color: "white",
                      fontSize: "10px",
                      padding: "2px 4px",
                      borderTopLeftRadius: 4,
                      borderBottomRightRadius: 4,
                    }}
                  >
                    NEU
                  </Box>
                  <Typography variant="body2">{module.id === "m1" ? "Einleitung" : ""}</Typography>
                </Box>
                <Typography variant="h6" className="dark:text-white">
                  {module.title}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#f9f9f9",
                    borderRadius: 2,
                    padding: "4px 8px",
                    gap: 1,
                  }}
                  className="dark:bg-gray-700"
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: "orange",
                    }}
                  />
                  <FormControl
                    variant="standard"
                    sx={{
                      minWidth: 120,
                      "& .MuiInput-underline:before": { borderBottom: "none" },
                      "& .MuiInput-underline:after": { borderBottom: "none" },
                      "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottom: "none" },
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Select
                      value={module.status}
                      onChange={(e) => handleStatusChange(e, module.id)}
                      disableUnderline
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        "& .MuiSelect-select": {
                          paddingBottom: 0,
                          paddingTop: 0,
                          paddingRight: "24px !important",
                        },
                        "& .MuiSelect-icon": { right: 0 },
                      }}
                      className="dark:text-white"
                      IconComponent={ExpandMoreIcon}
                    >
                      <MenuItem value="soon">{t.soonAvailable}</MenuItem>
                      <MenuItem value="published">{t.published}</MenuItem>
                      <MenuItem value="draft">{t.draft}</MenuItem>
                      <MenuItem value="archived">{t.archived}</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <CourseItemMenu
                  onOpenProperties={() => handleOpenModuleProperties(module)}
                  onDuplicate={() => handleDuplicateCourse(module)}
                  onNotifyMembers={() => handleNotifyMembers(module)}
                  onDelete={() => handleDeleteCourse(module)}
                  onViewContents={() => handleViewContents(module)}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 1,
                cursor: "pointer",
              }}
              onClick={() => handleToggleModule(module.id)}
            >
              {expandedModule === module.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
            <Collapse in={expandedModule === module.id}>
              <Divider />
              {module.lessons.map((lesson, index) => (
                <Box key={lesson.id}>
                  <Box
                    sx={{
                      display: "flex",
                      p: 2,
                      pl: 4,
                      alignItems: "center",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                    onClick={() => handleLessonClick(lesson.id)}
                    className="dark:hover:bg-gray-700"
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        backgroundColor: "#0b182c",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 1,
                        mr: 2,
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          backgroundColor: "red",
                          color: "white",
                          fontSize: "10px",
                          padding: "2px 4px",
                          borderTopLeftRadius: 4,
                          borderBottomRightRadius: 4,
                        }}
                      >
                        NEU
                      </Box>
                      <Typography variant="body2">Termin {index + 1}</Typography>
                    </Box>
                    <Typography variant="body1" className="dark:text-white" sx={{ flex: 1 }}>
                      {lesson.title}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "#f9f9f9",
                          borderRadius: 2,
                          padding: "4px 8px",
                          gap: 1,
                        }}
                        className="dark:bg-gray-700"
                      >
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: "orange",
                          }}
                        />
                        <FormControl
                          variant="standard"
                          sx={{
                            minWidth: 120,
                            "& .MuiInput-underline:before": { borderBottom: "none" },
                            "& .MuiInput-underline:after": { borderBottom: "none" },
                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottom: "none" },
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Select
                            value={lesson.status}
                            onChange={(e) => handleStatusChange(e, lesson.id)}
                            disableUnderline
                            sx={{
                              fontSize: "0.875rem",
                              fontWeight: 500,
                              "& .MuiSelect-select": {
                                paddingBottom: 0,
                                paddingTop: 0,
                                paddingRight: "24px !important",
                              },
                              "& .MuiSelect-icon": { right: 0 },
                            }}
                            className="dark:text-white"
                            IconComponent={ExpandMoreIcon}
                          >
                            <MenuItem value="soon">{t.soonAvailable}</MenuItem>
                            <MenuItem value="published">{t.published}</MenuItem>
                            <MenuItem value="draft">{t.draft}</MenuItem>
                            <MenuItem value="archived">{t.archived}</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                      <CourseItemMenu
                        onOpenProperties={() => handleOpenModuleProperties(lesson, false)}
                        onDuplicate={() => handleDuplicateLesson(lesson)}
                        onNotifyMembers={() => handleNotifyMembers(lesson)}
                        onDelete={() => handleDeleteLesson(lesson)}
                        onViewContents={() => handleViewContents(lesson)}
                      />
                    </Box>
                  </Box>
                  {index < module.lessons.length - 1 && <Divider />}
                </Box>
              ))}
            </Collapse>
          </CardContent>
        </Card>
      ))}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
          border: "1px dashed #ccc",
          borderRadius: 2,
          mt: 4,
          cursor: "pointer",
        }}
        className="dark:border-gray-700"
        onClick={handleOpenNewChapterModal}
      >
        <Button
          startIcon={<AddIcon />}
          sx={{
            color: "#2563eb",
            textTransform: "none",
          }}
          className="dark:text-blue-400"
        >
          {t.addChapter} hinzufügen
        </Button>
      </Box>

      {/* Course Properties Drawer */}
      <CoursePropertiesDrawer
        open={propertiesDrawerOpen}
        onClose={() => setPropertiesDrawerOpen(false)}
        course={selectedCourse}
      />

      {/* Module Properties Drawer */}
      <ModulePropertiesDrawer
        open={modulePropertiesDrawerOpen}
        onClose={() => setModulePropertiesDrawerOpen(false)}
        module={selectedModule}
        isChapter={isChapter}
      />

      {/* New Chapter Modal */}
      <NewChapterModal
        open={newChapterModalOpen}
        onClose={() => setNewChapterModalOpen(false)}
        onSave={handleCreateNewChapter}
      />
    </Box>
  )
}