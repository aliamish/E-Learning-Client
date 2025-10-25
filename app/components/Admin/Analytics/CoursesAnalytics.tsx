import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/styles";

type Props = {};

const CoursesAnalytics = (props: Props) => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});

//   const analytics = [
//     { name: "Jun 2023", uv: 3 },
//     { name: "Jult 2023", uv: 2 },
//     { name: "August 2023", uv: 5 },
//     { name: "Sept 2023", uv: 7 },
//     { name: "October 2023", uv: 2 },
//     { name: "Nov 2023", uv: 5 },
//     { name: "December 2023", uv: 7 },
//   ];

  const analyticsData =
  data?.courses?.last12Months?.map((item: any) => ({
    name: item.month,
    uv: item.count,
  })) || [];


  const minValue = 0;
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="mt-[50px]">
            <h1 className={`${styles.title} px-5 !text-start`}>
              Courses Analytics
            </h1>
            <p className={`${styles.label} ml-6`}>
              Last 12 months analytics data{""}
            </p>
          </div>

          <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, "auto"]} />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CoursesAnalytics;
