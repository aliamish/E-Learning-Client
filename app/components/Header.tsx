"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { useTheme } from "next-themes";
import { HiOutlineMenuAlt2, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../components/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import avatar from "../../public/assets/avataar.jpg";
import { useSession } from "next-auth/react";
import { useLogoutMutation, useSocialAuthMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute?: (route: string) => void;
};

const Header = ({ activeItem, setOpen, route, open, setRoute }: Props) => {
  const { theme } = useTheme();

  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  interface User {
    avatar?: any;
    // add other user properties if needed
  }

  const user = useSelector(
    (state: RootState) => state.auth.user
  ) as User | null;
  const { data } = useSession();
  const [socialAuth, { isSuccess,}] = useSocialAuthMutation();

 const [logout] = useLogoutMutation();


  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data.user?.image,
        });
      }
    }
    
  }, [data, user]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof Element && e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`fixed top-0 left-0 w-full h-[80px] z-[80] transition duration-500 ${
          active
            ? `${
                theme === "dark"
                  ? "bg-slate-900 border-[#ffffff1c] shadow-xl"
                  : "bg-white border-b border-gray-300 shadow-xl"
              }`
            : `${
                theme === "dark"
                  ? "bg-gray-900 border-b border-[#ffffff1c]"
                  : "bg-white border-b border-gray-3 00"
              }`
        }`}
      >
        <div className="w-[95%] md:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className={`text-[25px] font-Poppins font-[500]  ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                ELearning
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/*   only for mobile */}
              <div className="md:hidden">
                <HiOutlineMenuAlt2
                  size={25}
                  className={`cursor-pointer ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {user ? (
                <>
                  <Link href="/profile">
                    <Image
                      src={user && user.avatar ? user.avatar.url : avatar}
                      className="w-[30px] h-[30px] rounded-full cursor-pointer"
                      alt="img"
                      width={30}
                      height={30}
                      style={{border: activeItem === 5 ? "2px solid #ffc107" : "none"}}
                    />
                  </Link>
                </>
              ) : (
                <HiOutlineUserCircle
                  size={26}
                  className={`cursor-pointer ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
        {/* mobile sidbar */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opecity-90 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                size={25}
                className={`cursor-pointer ml-5 my-2 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
                onClick={() => setOpen(true)}
              />
              <br />
              <br />
              <p
                className={`text-[16px] px-2 pl-2 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                Copyright @ 2025 ELearning
              </p>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
            />
          )}
        </>
      )}

      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}

      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
