"use client";
import React, { FC, useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {  useEditCourseMutation, useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {
    id: string;
}

const EditCourse:FC<Props> = ({id}) => {
    const [editCourse,{isSuccess,error}] = useEditCourseMutation()
  const { data, refetch} = useGetAllCoursesQuery(
    {},
    {refetchOnMountOrArgChange: true}
  )

  const editCourseData = data && data.courses.find((i:any) => i.id === id)


  const [active, setActive] = useState(0);
      useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData.name,
        description: editCourseData.description,
        price: editCourseData.price,
        estimatedPrice: editCourseData?.estimatedPrice,
        tags: editCourseData.tags,
        level: editCourseData.level,
        demoUrl: editCourseData.demoUrl,
        thumbnail: editCourseData?.thumbnail?.url,
      })
      setBenefits(editCourseData.benefits);
      setPrerequisites(editCourseData.prerequisties);
        setCourseContentData(editCourseData.courseData);
    }
  }, [editCourseData]);



  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      links: [{ title: "", url: "" }],
      suggestion: "",
    },
  ]);

  const [courseData, setCourseData] = useState<any>({});

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Update successfully");
      redirect("/admin/all-courses");
    }
    if (error && "data" in error) {
      const err: any = error;
      toast.error(err.data.message || "Something went wrong");
    }
  }, [isSuccess, error]);




  const handleSubmit = () => {
    const formattedBenefits = benefits.map((b) => ({ title: b.title }));
    const formattedPrerequisites = prerequisites.map((p) => ({ title: p.title }));
    const formattedCourseContentData = courseContentData.map((c) => ({
      videoUrl: c.videoUrl,
      title: c.title,
      description: c.description,
      videoSection: c.videoSection,
      links: c.links.map((l) => ({ title: l.title, url: l.url })),
      suggestion: c.suggestion,
    }));

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: Number(courseInfo.price),
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags ,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseContent: formattedCourseContentData,
    };

    setCourseData(data);
    return data;
  };

  // ✅ Step 2: Submit to backend
const handleCourseCreate = async () => {
  const finalData = handleSubmit(); // gather data
  console.log("✅ Final Course Data Sent to Backend:", finalData);
    const data = courseData;
    await editCourse({id:editCourseData?.id,data});

};


  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}

        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isEdit={true}
          />
        )}
      </div>

      <div className="w-[20%] mt-[100px] h-screen fixed top-18 right-0">
        <CourseOptions active={active} setActive={setActive}/>
      </div>
    </div>
  );
};

export default EditCourse;
