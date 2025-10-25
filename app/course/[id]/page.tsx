'use client'

import CourseDatailsPage from "@/app/components/Courses/CourseDatailsPage"


const page = ({params}:any) => {
    return(
        <div>
            <CourseDatailsPage id={params.id}/>
        </div>
    )
}

export default page