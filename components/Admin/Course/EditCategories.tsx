import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import Loader from "@/app/components/Loader/Loader";
import { styles } from "@/app/styles/styles";
import { useGetHeroDataQuery, useEditLayoutMutation } from "@/redux/features/layout/layoutApi";

type Props = {};

const EditCategories = (props: Props) => {
  const [categories, setCategories] = useState<any[]>([]);

  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();

  // ----------------------
  // Initialize categories safely
  // ----------------------
  useEffect(() => {
    if (data?.layout?.categories) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  // ----------------------
  // Success toast + refetch
  // ----------------------
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Category updated successfully");
    }
  }, [isSuccess]);

  // ----------------------
  // Error toast
  // ----------------------
  useEffect(() => {
    if (error && "data" in error) {
      toast.error((error as any).data.message);
    }
  }, [error]);

  // ----------------------
  // Handlers
  // ----------------------
  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prev) =>
      prev.map((cat) => (cat._id === id ? { ...cat, title: value } : cat))
    );
  };

  const newCategoriesHandler = () => {
    if (categories.length && categories[categories.length - 1].title === "") {
      toast.error("Category title can not be empty");
      return;
    }
    setCategories((prev) => [
      ...prev,
      { _id: Date.now().toString(), title: "" }, // unique temp id
    ]);
  };

  const areCategoriesUnchanged = (original: any[], updated: any[]) => {
    const clean = (arr: any[]) => arr.map((c) => ({ title: c.title }));
    return JSON.stringify(clean(original)) === JSON.stringify(clean(updated));
  };

  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((c) => c.title.trim() === "");
  };

  const editCategoriesHandler = async () => {
    if (
      !areCategoriesUnchanged(data?.layout?.categories || [], categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayout({
        type: "Categories",
        categories,
      });
    }
  };

  // ----------------------
  // Render
  // ----------------------
  if (isLoading) return <Loader />;

  return (
    <div className="mt-[120px] text-center">
      <h1 className={`${styles.title}`}>All Categories</h1>

      {categories.map((item) => (
        <div className="p-3" key={item._id}>
          <div className="flex items-center justify-center w-full gap-3">
            <input
              className={`${styles.input} !w-auto !border-none !text-[20px]`}
              value={item.title}
              onChange={(e) => handleCategoriesAdd(item._id, e.target.value)}
              placeholder="Enter category title..."
            />
            <AiOutlineDelete
              className="dark:text-white text-[18px] cursor-pointer"
              onClick={() =>
                setCategories((prev) =>
                  prev.filter((c) => c._id !== item._id)
                )
              }
            />
          </div>
        </div>
      ))}

      <div className="mt-4 flex justify-center">
        <IoMdAddCircleOutline
          className="dark:text-white text-[25px] cursor-pointer"
          onClick={newCategoriesHandler}
        />
      </div>

      <div
        className={`${
          styles.button
        } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black 
        ${areCategoriesUnchanged(data?.layout?.categories || [], categories) ||
        isAnyCategoryTitleEmpty(categories)
          ? "!cursor-not-allowed !bg-[#cccccc34]"
          : "!cursor-pointer !bg-[#42d383]"} 
        !rounded absolute bottom-12 right-12`}
        onClick={
          areCategoriesUnchanged(data?.layout?.categories || [], categories) ||
          isAnyCategoryTitleEmpty(categories)
            ? () => null
            : editCategoriesHandler
        }
      >
        Save
      </div>
    </div>
  );
};

export default EditCategories;
