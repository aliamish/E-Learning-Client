'use client';

import Link from "next/link";
import React from "react";
import { useTheme } from "next-themes";

export const NavItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  const { theme } = useTheme();

  const getTextColor = (isActive: boolean) => {
    if (isActive) {
      return theme === "dark" ? "text-[#37a39a]" : "text-[crimson]";
    } else {
      return theme === "dark" ? "text-white" : "text-black";
    }
  };

  return (
    <>
      {/* Desktop */}
      {!isMobile && (
        <div className="hidden md:flex">
          {NavItemsData.map((item, index) => (
            <Link href={item.url} key={index}>
              <span
                className={`${getTextColor(activeItem === index)} text-[18px] px-6 font-Poppins font-[400]`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Mobile */}
      {isMobile && (
        <div className="md:hidden mt-5">
          <div className="w-full text-center py-6">
            {NavItemsData.map((item, index) => (
              <Link href={item.url} key={index}>
                <span
                  className={`${getTextColor(activeItem === index)} text-[18px] px-6 font-Poppins font-[400]`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;
