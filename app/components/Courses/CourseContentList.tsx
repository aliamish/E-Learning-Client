import { useTheme } from "next-themes";
import React, { FC, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  data: any;
  activeVideo?: number;
  setActivevideo?: any;
  isDemo?: boolean;
};

const CourseContentList: FC<Props> = (Props) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );

  // FInd unique video sections
  const videoSections: string[] = [
    ...new Set<string>(Props.data?.map((item: any) => item.videoSection)),
  ];

  let totalCount: number = 0; // Total count of videos from previous sections

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };
  const {theme} = useTheme()
  return (
    <div
      className={`mt-[15px] ${
        !Props.isDemo && "ml-[30px]  sticky top-24 left-0 z-30"
      } x`}
    >
      {videoSections.map((section: string, sectionIndex: number) => {
        const isSectionVisible = visibleSections.has(section);

        // Filter videos by section
        const sectionVideo: any[] = Props.data.filter(
          (item: any) => item.videoSection === section
        );
        const sectionVideoCount: number = sectionVideo.length;
        const sectionVideoLength: number = sectionVideo.reduce(
          (totalLength: number, item: any) => totalLength + item.videoLength,
          0
        );

        const sectionStartIndex: number = totalCount;
        totalCount += sectionVideoCount;

        const sectionContentHours: number = sectionVideoLength / 60;

        return (
          <div
            className={`${!Props.isDemo && "border-b border-[#ffffff8e]"}`}
            key={section}
          >
            <div className="w-full flex">
              {/*  Render video section */}

              <div className="w-full flex justify-between items-center">
                <h2 className={`text-[22px] ${theme === "dark" ? "text-white" : "text-black"}`}>
                  {section}
                </h2>
                <button
                  className={`mr-4 cursor-pointer ${theme === "dark" ? "text-white" : "text-black"}`}
                  onClick={() => toggleSection(section)}
                >
                  {isSectionVisible ? (
                    <BsChevronUp size={25}  className="ml-40"/>
                  ) : (
                    <BsChevronDown size={20}  className="ml-40"/>
                  )}
                </button>
              </div>
            </div>
            <h5 className={`${theme === "dark" ? "text-white" : "text-black"}`}>
              {sectionVideoCount} Lesson .{""}
              {sectionVideoLength < 60
                ? sectionVideoLength
                : sectionContentHours.toFixed(2)}
              {""}
              {sectionVideoLength > 60 ? "hours" : "minutes"}
            </h5>
            <br />
            {isSectionVisible && (
              <div className="w-full ">
                {sectionVideo.map((item: any, index: number) => {
                  const videoIndex: number = sectionStartIndex + index;
                  const contentLength: number = item.videoLength / 60;
                  return (
                    <div
                      className={`w-full ${
                        videoIndex === Props.activeVideo ? "" : ""
                      } cursor-pointer transition-all p-3`}
                      key={item._id}
                      onClick={() =>
                        Props.isDemo ? null : Props?.setActivevideo(videoIndex)
                      }
                    >
                      <div className="flex items-start">
                        <div>
                          <MdOutlineOndemandVideo
                            size={25}
                            className="mr-2"
                            color="#1cdada"
                          />
                        </div>
                        <h1 className={`text-[18px] inline-block break-words${ videoIndex === Props.activeVideo ? "" : ""} text-black dark:text-white`}>
                          {item.title}
                        </h1>
                      </div>
                      <h5 className={`pl-8 ${ theme === "dark" ? "text-white" : "text-black" }`}>
                        {item.videoLength > 60
                          ? contentLength.toFixed(2)
                          : item.videoLength}
                        {""}
                        {item.videoLength > 60 ? "hours" : "minutes"}
                      </h5>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
