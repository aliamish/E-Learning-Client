"use client";
import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from '../components/Profile/Profile'
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Footer from "../components/Routes/Footer";

interface User {
  name?: string;
  email?: string;
  avatar?: any;
}

const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
const { user } = useSelector((state: RootState) => state.auth) as { user: User | null };
  return (
    <div className="min-h-screen">
      <Protected>
        <Heading
          title={`${user?.name} Profile - ELearning`}
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming, MERN, Redux, Machine Learning"
        />

        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Profile user={user}/>
        <Footer/>
      </Protected>
    </div>
  );
};

export default Page;
