import Ratings from "@/app/utils/Ratings";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";

type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  const { theme } = useTheme();
  return (
   
       <Link
      href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}` }
    >
      <div
        className={`w-full min-h-[35vh]   ${
          theme === "dark" ? "bg-slate-900" : "bg-white"
        }   dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015]  rounded-lg p-3 shadow-sm`}
      >
        <Image
          src={item.thumbnail.url}
          width={500}
          height={300}
          objectFit="contain"
          className="rounded-full"
          alt=""
        />
        <br />
        <h1 className={`font-Poppins text-[16px]  ${theme === "dark" ? "text-white" : "text-black"}`}>
          {item.name}
        </h1>
        <div className="w-full flex items-center justify-between pt-2">
          <Ratings rating={item.ratings} />
          <h5
            className={` ${theme === "dark" ? "text-white" : "text-black"} ${isProfile && "hidden md:inline"}`}
          >
            {item.purchased} Students
          </h5>
        </div>

        <div className="w-full flex items-center justify-between pt-3">
          <div className="flex">
            <h3 className={`${theme === "dark" ? "text-white" : "text-black bg-white"}`}>
              {item.price === 0 ? "Free" : item.price + "$"}
            </h3>
            <h5 className="pl-3 text-[14px] mt-[-5px] line-through opacity-80 dark:text-[#fff]">
              {item.estimatedPrice}$
            </h5>
          </div>

          <div className="flex items-center pb-3">
            <AiOutlineUnorderedList size={20} className={`pl-2 ${theme === "dark" ? "text-white" : "text-black"}`}/>
            <h5 className={`pl-2 ${theme === "dark" ? "text-white" : "text-black"}`}>
              {item.courseData?.length} Lectures
            </h5>
          </div>
        </div>
      </div>
    </Link>
   
  );
};


export default CourseCard;
