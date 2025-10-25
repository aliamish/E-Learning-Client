import { styles } from '@/app/styles/styles';
import Image from 'next/image';
import React from 'react'
import ReviewCard from '../Reviews/ReviewCard'
import { useTheme } from 'next-themes';

type Props = {}

export const reviews = [
  
  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Student | Cambridge university",
    comment:
      "I love the dark mode option. It makes late-night work so much easier on the eyes. Overall a very user-friendly experience.",
  },
  {
    name: "Verna Santos",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    profession: "Full stack developer | Quarter ltd.",
    comment:
      "Customer support was excellent! They answered my queries within minutes and guided me through the setup process step by step.",
  },
  {
    name: "Jay Gibbs",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    profession: "computer systems engineering student | Zimbabwe",
    comment:
      "The attention to detail is amazing. Everything feels polished and well thought out. Definitely one of the best tools I’ve used in a while.",
  },
  {
    name: "Mina Davidson",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    profession: "Junior Web Developer | Indonesia",
    comment:
      "At first I was unsure, but after using it for a week I can confidently say it saves me so much time. The features are exactly what I needed.",
  },
  {
    name: "Rosemary Smith",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    profession: "Full stack web developer | Algeria",
    comment:
      "I really enjoyed working with this platform. The interface is clean, responsive, and easy to navigate. It made my workflow much faster and smoother.",
  },
  {
    name: "Laura Mckenzie",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    profession: "Full stack web developer | Canada",
    comment:
      "Overall, a fantastic experience. It’s rare to find a product that combines speed, design, and functionality so well together.",
  },
];

const Reviews = (props: Props) => {
  const {theme} = useTheme()
  return (
     <div className={`w-[90%] md:w-[100%] m-auto pt-20 pb-20 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      <div className="w-full md:flex items-center">
        <div className="md:w-[50%] w-full ml-20 mb-20">
          <Image
            // Use the public path for images placed in the `public` folder.
            // Avoid importing/require()-ing files from `public` — reference them by URL.
            src="/iqryaifqyig1v8glifrj.webp"
            alt="business"
            width={700}
            height={700}
          />
        </div>
            <div className="800px:w-[50%] w-full ">
          <h3 className={`${styles.title} ${theme === "dark" ? "text-white" : "text-black"} 800px:!text-[40px] `}>
            Our Students Are <span className="text-blue-700">Our Strength</span>{" "}
            <br /> See What They Say About Us
          </h3>
          <br />
          <p className={`${styles.label} ${theme === "dark" ? "text-white" : "text-black"}`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque unde
            voluptatum dignissimos, nulla perferendis dolorem voluptate nemo
            possimus magni deleniti natus accusamus officiis quasi nihil

            commodi, praesentium quidem, quis doloribus?
          </p>
        </div>
            <br />
            <br />
            <br />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 mb-12 ">
        {reviews &&
          reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
      </div>
        </div>
  )
}

export default Reviews