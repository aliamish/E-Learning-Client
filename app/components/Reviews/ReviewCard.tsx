import Ratings from '@/app/utils/Ratings';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react'

type Props = {
    item: any;
}

const ReviewCard = (props: Props) => {
    const { theme } = useTheme();
  return (
    <div className={`w-full ${
        theme === "dark" ? "bg-slate-900" : "bg-white"
      }   dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015]  rounded-lg p-3 shadow-sm`}>
         <div className="flex w-full">
        <Image
          src={props.item.avatar}
          alt=""
          className="w-[50px] h-[50px] rounded-full object-cover"
          height={50}
          width={50}
        />
         <div className="md:flex justify-between w-full hidden">
          <div className="pl-4">
            <h5 className={`text-[20px] ${theme === "dark" ? "text-white" : "text-black"}  `}>{props.item.name}</h5>
            <h6 className={`text-[16px] ${theme === "dark" ? "text-[#ffffffab]" : "text-black"}  `}>
              {props.item.profession}
            </h6>
          </div>
          <Ratings rating={5} />
        </div>
         <div className="md:hidden justify-between w-full flex flex-col">
          <div className="pl-4">
            <h5 className={`text-[20px] ${theme === "dark" ? "text-white" : "text-black"}  `}>{props.item.name}</h5>
            <h6 className="text-[16px] dark:text-[#ffffffab]">
              {props.item.profession}
            </h6>
          </div>
          <Ratings rating={5} />
        </div>

      </div>
       <p
        className={`pt-2 px-2 font-Poppins
      ${theme === "dark" ? "text-white" : "text-black"}
        `}
      >
        {props.item.comment}
      </p>
      </div>
  )
}

export default ReviewCard