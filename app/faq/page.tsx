"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Routes/Footer";
import Faq from "../components/Routes/FAQ";



const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(4);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Heading
        title="FAQ - ELearning"
        description="Elearning is a learning management system for helping programmers"
        keywords="programming,mern"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <div className="mt-20">
        <Faq/>
      </div>
      <Footer/>
    </div>
  );
};

export default Page;
