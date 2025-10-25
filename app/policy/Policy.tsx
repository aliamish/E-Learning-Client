
import React from "react";
import { styles } from "../styles/styles";
import { useTheme } from "next-themes";



const Policy = () => {
    const {theme} = useTheme()
  return (
    <div>
      <div className={`w-[95%] md:w-[100%] m-auto py-2 mt-20 px-14 ${theme === "dark" ? "bg-slate-900 text-white" :"bg-white text-black"}`}>
        <h1 className={`${styles.title} !text-start pt-2`}>
          Platform Terms and Condition
        </h1>
      <ul style={{ listStyle: "unset", marginLeft: "15px" }}>
      <p className="py-2 ml-[-15px] text-[18px] font-Poppins leading-8 whitespace-pre-line">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
          blanditiis architecto quasi impedit in dicta nisi, asperiores
          voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos
          accusantium quod numquam dolores! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
          blanditiis architecto quasi impedit in dicta nisi, asperiores
          voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos
          accusantium quod numquam dolores!
        </p>
        <br />
        <p className="py-2 ml-[-15px] text-[18px] font-Poppins leading-8 whitespace-pre-line">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
          blanditiis architecto quasi impedit in dicta nisi, asperiores
          voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos
          accusantium quod numquam dolores! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
          blanditiis architecto quasi impedit in dicta nisi, asperiores
          voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos
          accusantium quod numquam dolores!
        </p>
        <br />
        <p className="py-2 ml-[-15px] text-[18px] font-Poppins leading-8 whitespace-pre-line">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
          blanditiis architecto quasi impedit in dicta nisi, asperiores
          voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos
          accusantium quod numquam dolores! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
          blanditiis architecto quasi impedit in dicta nisi, asperiores
          voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos
          accusantium quod numquam dolores!
        </p>
        <br />
        <p className="py-2 ml-[-15px] text-[18px] font-Poppins leading-8 whitespace-pre-line">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
          blanditiis architecto quasi impedit in dicta nisi, asperiores
          voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos
          accusantium quod numquam dolores! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
          blanditiis architecto quasi impedit in dicta nisi, asperiores
          voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos
          accusantium quod numquam dolores!
        </p>
        <br />
        <p className="py-2 ml-[-15px] text-[18px] font-Poppins leading-8 whitespace-pre-line">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
          blanditiis architecto quasi impedit in dicta nisi, asperiores
          voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos
          accusantium quod numquam dolores! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
          blanditiis architecto quasi impedit in dicta nisi, asperiores
          voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos
          accusantium quod numquam dolores!
        </p>
        <br />
        <p className="py-2 ml-[-15px] text-[18px] font-Poppins leading-8 whitespace-pre-line">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
          blanditiis architecto quasi impedit in dicta nisi, asperiores
          voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos
          accusantium quod numquam dolores! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
          blanditiis architecto quasi impedit in dicta nisi, asperiores
          voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos
          accusantium quod numquam dolores!
        </p>
      </ul>
      </div>
    </div>
  );
};

export default Policy;
