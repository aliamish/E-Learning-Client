"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from './components/Header'
import Hero from './components/Routes/Hero'
import Courses from './components/Courses/Courses'
import Reviews from './components/Routes/Reviews'
import FAQ from './components/Routes/FAQ'
import Footer from './components/Routes/Footer'


interface Props {
  title: string;
  description: string;
  keywords: string;
}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem,setActiveItem] = useState(5);

  const [route,setRoute] = useState("Login")
  return (
    <div>
      <Heading
        title="ELearning"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Prograaming,MARN,Redux,Machine Learing"
      />

       <Header
         open={open}
         setOpen={setOpen}
         activeItem={activeItem}
         setRoute={setRoute}
         route={route}
       />

       <Hero/>
       <Courses />
       <Reviews/>
       <FAQ/>
       <Footer/>
    </div>
  );
};

export default Page;
