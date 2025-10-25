import { useGetCourseContentQuery } from "@/redux/features/courses/coursesApi";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import Header from "../Header";
import { useTheme } from "next-themes";
import CourseContentList from "./CourseContentList";

type Props = {
  id: string;
  user: any;
};

const CourseContent = ({ id,user }: Props) => {
  const { data: contentData, isLoading,refetch } = useGetCourseContentQuery(id,{refetchOnMountOrArgChange:true});
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("login");
  const data = contentData?.content;
  const { theme } = useTheme();

  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            activeItem={1}
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
          />

          <div
            className={`w-full h-full grid grid-cols-10 ${
              theme === "dark"
                ? "bg-slate-900 text-white"
                : "bg-white text-black"
            }`}
          >
            <Heading
              title={data?.[activeVideo]?.title || "Course Content"}
              description="anything"
              keywords={data?.[activeVideo]?.tags || []}
            />

            <div className="col-span-7">
              <CourseContentMedia
                user={user}
                data={data}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                refetch={refetch}
              />
            </div>

            <div className="hidden md:block md:col-span-3">
              <CourseContentList
                setActivevideo={setActiveVideo}
                data={data}
                activeVideo={activeVideo}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseContent;
