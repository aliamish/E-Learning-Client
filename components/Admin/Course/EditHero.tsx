import { styles } from "@/app/styles/styles";
import { useEditLayoutMutation, useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
//import newImage from "../../../public/assets/avataar.jpg"

type Props = {};

const EditHero: FC<Props> = (props: Props) => {
  // previewImage is used for immediate UI preview (object URL or remote url)
  const [previewImage, setPreviewImage] = useState("");
  // image holds the base64 data URL to send to backend (or remote url)
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const { data, refetch } = useGetHeroDataQuery("Banner", {
      refetchOnMountOrArgChange: true,
  });

  const [editLayout,{isLoading,isSuccess,error}] = useEditLayoutMutation()

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner?.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setPreviewImage(data?.layout?.banner?.image?.url);
      // set image to the remote url by default so backend can re-use it if user doesn't change
      setImage(data?.layout?.banner?.image?.url);
    }
    if(isSuccess){
        refetch()
        toast.success("Hero updated successfully")
    }
    if(error){
        if("data" in error){
            const errorData = error as any;
            toast.error(errorData?.data?.message)
        }
    }
  }, [data,isSuccess,error]);

   
  const handleUpdate = (e:any) => {
    const file = e.target.files?.[0];
    if(file){
    // immediate preview with object URL
    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);

    // read base64 for upload
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      // revoke object url after base64 is ready
      try { URL.revokeObjectURL(objectUrl); } catch (err) {}
    };
    reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
     // ensure we send base64 if available, otherwise send the existing remote url
     const payloadImage = image || previewImage;
     await editLayout({
       type:"banner",
       image: payloadImage,
       title,
       subTitle,
     })
  }

  return (
    <>
      <div className="w-full flex flex-col z-10 lg:flex-row items-center justify-between px-4 pb-20 lg:px-16 pt-[100px] gap-10 lg:gap-20 transition duration-300">
        <div className=" relative w-[300px] h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[450px] xl:h-[450px] rounded-full [500px] bg-[#17173f] flex items-center justify-center z-0">
          <div className="relative w-[250px] h-[250px] lg:w-[50px] lg:h-[450px] mt-16 xl:w-[400px] xl:h-[400px] mb-15 ml-9">
            <div className="relative flex items-center justify-end">
              <img src={image } alt="" className="h-[400px] w-[500%] rounded-full [500px]" />
              <input
                type="file"
                name="" 
                id="banner"
                accept="image/*"
                onChange={handleUpdate}
                className="hidden"
              />
              <label htmlFor="banner" className=" bottom-0  pt-70 z-20">
                <AiOutlineCamera className="dark:text-white text-black text-[18px] cursor-pointer " />
              </label>
            </div>
          </div>

          
        </div>
          {/* Right Side - Text Content */}
        <div className="lg:w-[60%] xl:w-[90%] flex flex-col items-center lg:mt-[0px] text-center lg:text-left mt-[150px]">
          <textarea
            className="dark:text-white resize-none text-[30px] px-3 w-full lg:text-[60px] 2xl:text-[70px] font-[600] font-Josefin py-2 lg:leading-[75px] 2xl:w-[60%] xl:w-[108%] outline-none bg-transparent block"
            placeholder="Improve Your Online Learning Experience Better Instantly"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={4}
          />
          <br />
          <textarea
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            placeholder="We have 40k+ Online courses & 500K+ Online registered student. Find your desired Courses from them."
            className="dark:text-[#edfff4] font-Josefin font-[600] text-[18px] 2xl:!w-[55%] xl:!w-[94%] bg-transparent outline-none resize-none"
          ></textarea>

          <br />
          <br />
          <br />
          <div
            className={`${
              styles.button
            } !w-[100px] a !min-h-[40px] !h-[40px] dark:text-white  bg-[#cccccc34] 
          ${
            data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== (image || previewImage)
              ? "!cursor-pointer !bg-[#42d383]"
              : "!cursor-not-allowed"
          }
          !rounded absolute bottom-12 right-12`}
            onClick={
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== (image || previewImage)
                ? handleEdit
                : () => null
            }
          >
            Save
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHero;
