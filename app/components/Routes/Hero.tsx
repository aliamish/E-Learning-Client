"use client";

import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../Loader/Loader";

const Hero: FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const {data,isLoading} = useGetHeroDataQuery("Banner", {
    
  })

  const handleSearch = () => {
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch


  return (
    <>
     {
      isLoading ? (
        <Loader/>
      ) : (
         <div
        className={`w-full flex flex-col lg:flex-row items-center justify-between px-4 lg:px-16 pt-[100px] gap-10 lg:gap-20 ${
          isDark ? "bg-gray-900 text-white" : "bg-white text-black"
        } transition duration-300`}
      >
        {/* Left Side - Hero Image in Blue Circle */}
               <div className=" relative w-[300px] h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[450px] xl:h-[450px] rounded-full [500px] bg-[#17173f] flex items-center justify-center z-0">
                 <div className="relative w-[250px] h-[250px] lg:w-[50px] lg:h-[450px] mt-16 xl:w-[400px] xl:h-[400px] mb-15">
                   <div className="relative flex items-center justify-end">
                     <img src={data?.layout?.banner?.image?.url } alt="" className=" h-[250px] md:h-[400px] w-[500%] rounded-full [500px]" />
                     <input
                       type="file"
                       name="" 
                       id="banner"
                       accept="image/*"
                       className="hidden"
                     />
                    
                   </div>
                 </div>
       
                 
               </div>

        {/* Right Side - Text Content */}
        <div className="w-full lg:w-[60%] flex justify-center lg:justify-start">
          <div className="w-full max-w-[500px] flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-[26px] lg:text-[48px] font-[600] font-Josefin leading-snug lg:leading-[60px]">
              {"Improve Your Online Learning Experience Better Instantly"}
            </h2>

            <p className="font-serif font-[500] text-[16px] lg:text-[18px] mt-4 text-opacity-90">
              {
                "We have 20k+ Online courses & 500K+ Online registered student. Find your desired Courses from them."
              }
            </p>

            {/* Search Box */}
            <div className="w-full h-[50px] bg-transparent relative mt-6">
              <input
                type="search"
                placeholder="Search Courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`bg-transparent border ${
                  isDark
                    ? "border-white placeholder-white text-white"
                    : "border-black placeholder-black text-black"
                } px-3 w-full h-full outline-none rounded-[5px] text-base`}
              />
              <div
                className="absolute flex items-center justify-center w-[50px] h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px] cursor-pointer"
                onClick={handleSearch}
              >
                <BiSearch className="text-white" size={26} />
              </div>
            </div>

            {/* Clients Images */}
            <div className="flex items-center mt-6 w-full">
              <img
                src="https://edmy-react.hibootstrap.com/images/banner/client-3.jpg"
                alt="client-3"
                className="rounded-full w-10 h-10"
              />
              <img
                src="https://edmy-react.hibootstrap.com/images/banner/client-1.jpg"
                alt="client-1"
                className="rounded-full w-10 h-10 ml-[-10px]"
              />
              <img
                src="https://edmy-react.hibootstrap.com/images/banner/client-2.jpg"
                alt="client-2"
                className="rounded-full w-10 h-10 ml-[-10px]"
              />
              <p className="font-Josefin pl-3 text-[16px] font-[500]">
                500K+ people already trusted us.
                <Link
                  href="/courses"
                  className="ml-2 text-[crimson] dark:text-[#4cce5b]"
                >
                  View Courses
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      )
     }
    </>
  );
};

export default Hero;
