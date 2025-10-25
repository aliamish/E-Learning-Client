import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import defaultAvatar from '../../../public/assets/avataar.jpg'

import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { styles } from "@/app/styles/styles";
import toast from "react-hot-toast";
import { useEditProfileMutation, useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import { useTheme } from "next-themes";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const {theme} = useTheme()

  const [loadUser, setLoadUser] = useState(false);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
   const [editProfile,{isSuccess:success,error:updateError}] = useEditProfileMutation()

  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
          const avatar = fileReader.result;
        updateAvatar(
          avatar,
        
        );
      }
    };
      fileReader.readAsDataURL(e.target.files[0])
  };

  useEffect(() => {
    if(isSuccess || success){
      setLoadUser(true)
    }
    if(error || updateError){
      console.log(error)
    }
    if(success){
      toast.success("Profile updated successfully!")
    }

  },[isSuccess,error,success, updateError])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(name !== ""){
     await editProfile({
        name: name,
      })
    }
  };

  const avatarDefault = user?.avatar
    ? user.avatar
    : avatar
    ? avatar
    : defaultAvatar;

  return (
    <div className={` ${theme === "dark" ?  "bg-slate-900" : "bg-white"} w-full flex flex-col justify-center items-center mt-[150px]`}>
      <div className="w-full flex justify-center">
        <div className="relative  h-[120px] rounded-full overflow-hidden border-[1px] border-[#37a39a]">
          <Image
            src={user.avatar ? user?.avatar?.url : avatarDefault}
            alt=""
            width={120}
            height={120}
            className="h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full object-cover bg-auto"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="avatar">
            <div className={`w-[30px] h-[30px] ${theme === "dark" ? "text-white" : "text-black bg-white"} bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer`}>
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
        <div className={`w-full pl-6 md:pl-10 ${theme === "dark" ? "text-white" : "text-black bg-white"} `}>
        <form onSubmit={handleSubmit}>
          <div className="md:w-[60%] mx-auto md:mt-[-15px] block pb-4">
            <div className="w-[100%]">
              <label className="block md:pb-2">Full Name</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2 ">
              <label className="block md:pb-2 ">Email Address</label>
              <input
                type="text"
                readOnly
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0 `}
                required
                value={user?.email}
              />
            </div>
            <input
              className={`w-[50%]  h-[40px] border-[1px] border-[#daeceb] text-center${theme === "dark" ? " dark:text-[#fff]" : ""}  rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
        <br />
      </div>
    </div>
  );
};

export default ProfileInfo;
