import React, { FC, useEffect, useState } from "react";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import UsersAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { Box, CircularProgress,  } from "@mui/material";
import { PiUsersFourLight } from "react-icons/pi";
import AllInvoices from "../Order/AllInvoices";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";
import { useTheme } from "next-themes";

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
        left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const {theme} = useTheme()
  const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
  const [userComparePercentage, setUserComparePercentage] = useState<any>();

  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: orderData, isLoading: orderLoading } =
    useGetOrdersAnalyticsQuery({});

  useEffect(() => {
    if (isLoading || orderLoading) return;

    const usersLastTwoMonths = data?.users?.last12Month?.slice(-2) || [];
    const ordersLastTwoMonths = orderData?.orders?.last12Month?.slice(-2) || [];

    if (usersLastTwoMonths.length === 2 && ordersLastTwoMonths.length === 2) {
      const usersCurrentMonth = usersLastTwoMonths[1]?.count || 0;
      const usersPreviousMonth = usersLastTwoMonths[0]?.count || 0;

      const ordersCurrentMonth = ordersLastTwoMonths[1]?.count || 0;
      const ordersPreviousMonth = ordersLastTwoMonths[0]?.count || 0;

      const usersPercentChange =
        usersPreviousMonth > 0
          ? ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) * 100
          : 100;

      const ordersPercentChange =
        ordersPreviousMonth > 0
          ? ((ordersCurrentMonth - ordersPreviousMonth) / ordersPreviousMonth) *
            100
          : 100;

      setUserComparePercentage({
        currentMonth: usersCurrentMonth,
        previousMonth: usersPreviousMonth,
        percentChange: usersPercentChange,
      });

      setOrdersComparePercentage({
        currentMonth: ordersCurrentMonth,
        previousMonth: ordersPreviousMonth,
        percentChange: ordersPercentChange,
      });
    }
  }, [isLoading, orderLoading, orderData, data]);

  return (
    <div className="mt-[30px] min-h-screen">
      <div className="grid grid-cols-[75%,25%]">
        <div className="p-8">
          <UsersAnalytics isDashboard={true} />
        </div>

        <div className="pt-[80px] pr-8">
          {/* Orders Widget */}
          <div className={`w-full ${theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-black"} rounded-sm shadow`}>
            <div className="flex items-center p-5 justify-between">
              <div>
                <BiBorderLeft className={`dark:text-[#45CBA0] text-[30px]`} />
                <h5 className={`pt-2 font-Poppins ${theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-black"} text-[20px]`}>
                  {ordersComparePercentage?.currentMonth ?? 0}
                </h5>
                <h5 className={`py-2 font-Poppins ${theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-black"} text-[20px] font-[400]`}>
                  Sales Obtained
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={ordersComparePercentage?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <h5 className="text-center pt-4">
                  {ordersComparePercentage
                    ? ordersComparePercentage?.percentChange > 0
                      ? "+" + ordersComparePercentage?.percentChange.toFixed(2)
                      : ordersComparePercentage?.percentChange.toFixed(2)
                    : "0"}
                  %
                </h5>
              </div>
            </div>
          </div>

          {/* Users Widget */}
          <div className={`w-full ${theme === "dark" ? "dark:bg-[#111C43]" : "bg-white"} rounded-sm shadow my-8`}>
            <div className="flex items-center p-5 justify-between">
              <div>
                <PiUsersFourLight className={`dark:text-[#45CBA0] text-[30px]`} />
                <h5 className={`pt-2 font-Poppins ${theme === "dark" ? "dark:text-[#fff]" : "text-black"} text-[20px]`}>
                  {userComparePercentage?.currentMonth ?? 0}
                </h5>
                <h5 className={`py-2 font-Poppins ${theme === "dark" ? "dark:text-[#45CBA0]" : "text-black"} text-[20px] font-[400]`}>
                  New Users
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={userComparePercentage?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <h5 className="text-center pt-4">
                  {userComparePercentage
                    ? userComparePercentage?.percentChange > 0
                      ? "+" + userComparePercentage?.percentChange.toFixed(2)
                      : userComparePercentage?.percentChange.toFixed(2)
                    : "0"}
                  %
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orders chart & invoices */}
      <div className="grid grid-cols-[65%,35%] mt-[-20px]">
        <div className={`dark:bg-[#111c43] w-[94%] mt-[30px] h-[40vh] shadow-sm m-auto`}>
          <OrdersAnalytics isDashboard={true} />
        </div>

        <div className="p-5">
          <h5 className={`dark:text-[#fff] text-[20px] font-[400] font-Poppins pb-3`}>
            Recent Transactions
          </h5>
          <AllInvoices isDashboard={true} /> 
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
