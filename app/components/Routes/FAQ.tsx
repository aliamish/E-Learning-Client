import { styles } from "@/app/styles/styles";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

type Props = {};

const Faq = (props: Props) => {
  const { data } = useGetHeroDataQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const {theme} = useTheme()

  useEffect(() => {
    if (data) {
      setQuestions(data?.layout?.faq);
    }
  }, [data]);

  const toogleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };
  return (
    <div className={` ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      <div className={`w-[90%] 800px:w-[90%] m-auto ${theme === "dark" ? "text-white" : "text-black bg-white"}`}>
        <h1 className={`${styles.title} 800px:text-[40px] ${theme === "dark" ? "text-white" : "text-black bg-white"}`}>
          Frequently Asked Questions
        </h1>
        <div className="mt-12">
          <dl className="space-y-8">
            {questions?.map((q) => (
              <div
                key={q._id}
                className={`${
                  q._id !== questions[0]?._id && "border-t"
                } border-gray-200 pt-6`}
              >
                <dt className="text-lg">
                  <button
                    className="flex items-start justify-between w-full text-left focus:outline-none"
                    onClick={() => toogleQuestion(q._id)}
                  >
                    <span className={`font-medium ${theme === "dark" ? "text-white" : "text-black bg-white"}`}>
                      {q.question}
                    </span>
                    <span className="ml-6 flex-shrink-0">
                      {activeQuestion === q._id ? (
                        <HiMinus className={`h-6 w-6 ${theme === "dark" ? "text-white" : "text-black bg-white"}`}/>
                      ) : (
                        <HiPlus className={`h-6 w-6 ${theme === "dark" ? "text-white" : "text-black bg-white"}`}/>
                      )}
                    </span>
                  </button>
                </dt>
                {activeQuestion === q._id && (
                  <dd className="mt-2 pr-12">
                    <p className={`text-base font-Poppins ${theme === "dark" ? "text-white" : "text-black bg-white"}`}>
                      {q.answer}
                    </p>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Faq;