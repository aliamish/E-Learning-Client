import { useTheme } from 'next-themes'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  const { theme } = useTheme()
  return (
    <footer  className={`border ${theme === 'dark' ? 'text-white bg-gray-900' : 'text-black bg-white'}`}>
      <div/>
      <br />
      <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className={`text-[20px] font-[600] ${theme === 'dark' ? 'text-white' : 'text-black'}`}>About</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-base dark::text-white"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-base dark::text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-base dark::text-white"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600]">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/courses"
                  className="text-base dark::text-white"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-base dark::text-white"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/course-dashboard"
                  className="text-base dark::text-white"
                >
                  Course Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600]">Social Links</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="https://www.youtube.com/channel/"
                  className="text-base dark::text-white"
                >
                  Youtube
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/"
                  className="text-base  dark::text-white"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.github.com/"
                  className="text-base  dark::text-white"
                >
                  github
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[20px] font-[600] pb-3">Contact Info</h3>
            <p className="text-base dark::text-white pb-2">
            Call Us: 1-885-665-2022
            </p>
           
            <p className="text-base  dark::text-white pb-2">
            Address: +7011 Vermont Ave, Los Angeles, CA 90044
            </p>
         
            <p className={`text-base   dark::text-white  pb-2`}>
            Mail Us: hello@elearning.com
            </p>
            
          </div>
        </div>
        <br />
        <p className="text-center">
          Copyright © 2024 Elearning | All Rights Reserved
        </p>
      </div>
      <br />
    </footer>
  )
}

export default Footer