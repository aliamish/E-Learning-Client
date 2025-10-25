"use client";
import React, { FC, useEffect, useState } from "react";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useTheme } from "next-themes";
import socketIo from "socket.io-client"
import { useGetAllNotificationsQuery, useUpdateNotificationsStatusMutation } from "@/redux/features/notifications/notificationsApi";
import { format } from "path";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIo(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen?:any;
};

const DashboardHeader: FC<Props> = ({open,setOpen}) => {
  const {data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [updateNotificationsStatus,{isSuccess}] = useUpdateNotificationsStatusMutation();
  const [notifications, setNotifications] = useState<any>([]);

  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vectjn.mp3"
    )
  );

  const playNotificationSound = () => {
    audio.play();
  };

  useEffect(() => {
    if(data){
       setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
       )
    }
    if(isSuccess){
      refetch();
    }
    audio.load();

  },[data,isSuccess]);


  useEffect(() => {
    socketId.on("newNotification", (data) => {
      refetch();
      playNotificationSound()
    })
  },[])

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationsStatus(id)
  }

  
  const {theme} = useTheme()
  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0 ">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2 "
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className={`text-2xl cursor-pointer ${theme === "dark" ? "text-white" : "text-black"}`} />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white ">
          {notifications && notifications.length}
        </span>
              </div>

        {open && (
          <div className={`w-[350px] h-[50vh] ${theme === "dark" ? "dark:bg-[#111C43]" : "bg-white"} shadow-xl absolute top-16 z-10 rounded  `}>
            <h5 className={`text-center text-[20px] font-Poppins ${theme === "dark" ? "text-white" : "text-black bg-white"} p-3`}>
              Notification
            </h5>
           {
            notifications && notifications.map((item:any, index:number) => {
               <div className={`dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]`}>
              <div className="w-full flex items-center justify-between p-2">
                <p className={`${theme === "dark" ? "text-white" : "text-black bg-white"}`}>
                  {item.title}
                </p>
                <p className={`${theme === "dark" ? "text-white" : "text-black bg-white"} cursor-pointer`}
                onClick={() => handleNotificationStatusChange(item._id)}
                >
                  Mark as read
                </p>
              </div>
              <p className={`${theme === "dark" ? "text-white" : "text-black bg-white"}`}>
               {item.message}
              </p>
              <p className={`${theme === "dark" ? "text-white" : "text-black bg-white"} text-[14px]`}>
                {format(item.createdAt)}
              </p>
            </div>
            })
           }
           
          </div>
        )}
    </div>
  );
};

export default DashboardHeader;
