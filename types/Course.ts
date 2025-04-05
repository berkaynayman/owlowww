// types/Course.ts

export interface CourseEntity {
    id: number
    type: string
    order: number
    title: string
    status: string
    group_id: number
    required: boolean
    image_url: string | null
    tenant_id: string
    video_url: string
    video_status: string
    bunny_video_id: string
    code_necessary: boolean
    duration_seconds: number
    long_description: string
    no_premature_end: boolean
    short_description: string
    progress: number
    courses_module_groups?: CourseModuleGroup
}

export interface CourseModuleGroup {
    id: number
    order: number
    title: string
    module_id: number
    tenant_id: string
    courses_entities: CourseEntity[]
    progress: number
    course_modules?: CourseModule
}

export interface CourseModule {
    id: number
    order: number
    title: string
    status: string
    required: boolean
    course_id: string
    image_url: string | null
    tenant_id: string
    code_necessary: boolean
    long_description: string
    no_premature_end: boolean
    short_description: string
    courses_module_groups: CourseModuleGroup[]
    progress: number
    courses? : CourseEntity
}

export interface Course {
    id: string
    title: string
    short_description: string | null
    long_description: string | null
    image_url: string | null
    status: string
    always_show_in_overview: boolean
    always_show_in_overview_no_access_link: string | null
    show_progress: boolean
    allow_comments: boolean
    tenant_id: string
    course_modules: CourseModule[]
    hasAccess: boolean
    progress: number
}
