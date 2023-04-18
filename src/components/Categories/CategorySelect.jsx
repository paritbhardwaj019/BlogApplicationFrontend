import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { fetchAllCategoryAction } from '../../redux/slice/category/categorySlice';

export default function CategorySelect(props) {
  const dispatch = useDispatch();
  const categoryStore = useSelector((store) => store?.categories);

  const { loading } = categoryStore;

  const categories = categoryStore?.categories?.data?.categories;
  const optionsArr = categories?.map(({ _id, title }) => {
    return { value: _id, label: title };
  });

  useEffect(() => {
    dispatch(fetchAllCategoryAction());
  }, []);

  const handleChange = (value) => {
    props.onChange('category', value);
  };

  const handleBlur = () => {
    props.onBlur('category', true);
  };

  return (
    <>
      <Select
        onChange={handleChange}
        onBlur={handleBlur}
        value={props?.value?.category}
        id="category"
        options={optionsArr}
      />
    </>
  );
}
