import React, { FC, useEffect, useState } from "react";
import SidBarProfile from "./SidBarProfile";
import { useLogoutMutation } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import { useTheme } from "next-themes";
import CourseCard from "../Courses/CourseCard";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";

// ✅ Define a User type (same as in SidBarProfile)
interface User {
  avatar?: { url?: string };
  name?: string;
  email?: string;
  courses?: any;
}

type Props = {
  user: User | null;
};



const Profile: FC<Props> = ({ user }) => {
  const { theme } = useTheme();
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [active, setActive] = useState(1);
  const [courses, setCourses] = useState([])
  const {data, isLoading} = useGetUsersAllCoursesQuery(undefined, {})

  // ✅ Use mutation (not query)
  const [logout] = useLogoutMutation();

  // ✅ Logout handler
  const logOutHandler = async () => {
    try {
      await logout(undefined).unwrap(); // call backend logout
      await signOut({ callbackUrl: "/" }); // redirect after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // ✅ Scroll effect
  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 85);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (data && user) {
      const filteredCourses = (user.courses ?? [])
        .map((userCourse: any) =>
          data.courses.find((course: any) => course._id === userCourse._id)
        )
        .filter((course: any) => course !== undefined);
      setCourses(filteredCourses);
    } else {
      setCourses([]);
    }
  }, [data, user])

  return (
    <div
      className={`${
        theme === "dark" ? "bg-slate-900" : "bg-white"
      } flex mx-auto`}
    >
      {/* Sidebar */}
      <div
        className={`md:w-[310px] h-[450px] ${
          theme === "dark"
            ? "bg-slate-900 bg-opacity-90"
            : "bg-white"
        } border border-[#ffffff1d] ml-[110px] rounded-[5px] shadow-md mt-[150px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        }`}
      >
        <SidBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logOutHandler}
        />
      </div>

      {/* Profile Info */}
      {active === 1 && (
        <div
          className={`w-full h-full bg-transparent mt-[80px] ${
            theme === "dark" ? "bg-slate-900" : "bg-white"
          }`}
        >
          <ProfileInfo user={user} avatar={avatar} />
        </div>
      )}

      {/* Change Password */}
      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ChangePassword />
        </div>
      )}
        {active === 3 && (
        <div className="w-[70%] pl-7 px-2 800px:px-10 800px:pl-8 mt-[150px]">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
            {courses &&
              courses.map((item: any, index: number) => (
                <CourseCard item={item} key={index} isProfile={true} />
              ))}
          </div>
          {courses.length === 0 && (
            <h1 className="text-center text-[18px] font-Poppins dark:text-white">
              You don&apos;t have any purchased courses!
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
