import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Courses/CourseCard";
import { useTheme } from "next-themes";

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);
  const {theme} = useTheme()

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);
  return (
      <div className={`w-[90%] md:w-[100%] m-auto ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}  pt-10 pb-20`}>
        <h1 className={`text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl ${ theme === "dark" ? "text-white " : "text-[#000]"} md:!leading-[60px] font-[700] tracking-tight `}>
          Expand Your Career {""}
          <span className="text-gradient">Opportunity</span> <br />
          Opportunity With Our Courses
        </h1>
        <br />
        <br />
        <div className="pl-[120px] grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
          {courses &&
            courses.map((item: any, index: number) => (
                
              <CourseCard item={item} key={index} />
            

            ))}
        </div>
      </div>
  );
};

export default Courses;
