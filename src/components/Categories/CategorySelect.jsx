import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchAllCategoryAction } from "../../redux/slice/category/categorySlice";

export default function CategorySelect() {
  const dispatch = useDispatch();
  const categoryStore = useSelector((store) => store?.categories);

  const categories = categoryStore?.categories?.data?.categories;
  const optionsArr = categories?.map(({ _id, title }) => {
    return { value: _id, label: title };
  });

  useEffect(() => {
    dispatch(fetchAllCategoryAction());
  }, []);

  return <Select options={optionsArr} />;
}
