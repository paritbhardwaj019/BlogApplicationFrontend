import { useEffect } from "react";
import { PlusCircleIcon, BookOpenIcon } from "@heroicons/react/solid";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryAction,
  getSingleCategoryAction,
  updateCategoryAction,
} from "../../redux/slice/category/categorySlice";
import { useNavigate, useParams } from "react-router-dom";

//Form schema
const formSchema = Yup.object({
  category: Yup.string().required("Category is required"),
});

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const categoryStore = useSelector((store) => store?.categories);

  const { appError, loading, serverError, updateCategory } = categoryStore;
  const category = categoryStore?.category?.data?.category?.title;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      category: category,
    },
    onSubmit: async (values) => {
      await dispatch(updateCategoryAction({ title: values.category, id }));
      navigate("/category-list");
    },
    validationSchema: formSchema,
  });

  useEffect(() => {
    dispatch(getSingleCategoryAction(id));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <BookOpenIcon className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Update Category
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-indigo-600 hover:text-indigo-500">
              These are the categories user will select when creating a post
            </p>
            {/* Display err */}
            <div>
              {appError || serverError ? (
                <h2 className="text-red-500 text-center text-lg">
                  {serverError} {appError}
                </h2>
              ) : null}
            </div>
          </p>
        </div>
        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Name
              </label>
              {/* Title */}
              <input
                value={formik.values.category}
                onChange={formik.handleChange("category")}
                onBlur={formik.handleBlur("category")}
                type="text"
                autoComplete="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
                placeholder="New Category"
              />
              <div className="text-red-400 mb-2">
                {formik.touched.category && formik.errors.category}
              </div>
            </div>
          </div>

          <div>
            <div>
              {/* Submit */}
              <>
                <button
                  disabled={loading ? true : false}
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <PlusCircleIcon
                      className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  {loading ? "loading..." : "Update Category"}
                </button>
                <button
                  disabled={loading ? true : false}
                  onClick={async () => {
                    await dispatch(deleteCategoryAction(id));
                    navigate("/category-list");
                  }}
                  type="button"
                  className="group mt-2 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? "loading..." : "Delete Category"}
                </button>
              </>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
