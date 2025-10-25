import Image from "next/image";
import React, { FC } from "react";
import avatarDefault from "../../../public/assets/avataar.jpg";
import { useTheme } from "next-themes";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

interface User {
  avatar?: any;
  name?: string;
  email?: string;
}

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logoutHandler: () => void;
};

const SidBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logoutHandler,
}) => {
  const { theme } = useTheme();

  return (
    <div className={`w-full ${theme === "dark" ? " bg-slate-900" : " text-w"}`}>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "bg-slate-800" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={user && user.avatar ? user.avatar.url : avatar}
          alt="User avatar"
          width={30}
          height={30}
          className="w-[20px] h-[20px] md:w-[30px] md:h-[30px] cursor-pointer rounded-full"
        />
        <h5
          className={`cursor-pointer ml-5 my-2 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          My Account
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? "dark:bg-slate-800 text-white" : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20}  className={`${theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-black"}`} />
        <h5
          className={`cursor-pointer ml-5 my-2 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Change Password
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? "dark:bg-slate-800 -white" : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20}  className={`${theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-black"}`}/>
        <h5
          className={`cursor-pointer ml-5 my-2 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Enrolled Courses
        </h5>
      </div>

      {user.role === "admin" && (
        <Link
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 6 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
          }`}
           href={"/admin"}
        >
          <MdOutlineAdminPanelSettings size={20}  className={`${theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-black"}`} />
          <h5
            className={`cursor-pointer ml-5 my-2 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Admin Dashboard
          </h5>
        </Link>
      )}

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => logoutHandler()}
      >
        <AiOutlineLogout size={20} className={`${theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-black"}`} />
        <h5
          className={`cursor-pointer ml-5 my-2 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default SidBarProfile;
