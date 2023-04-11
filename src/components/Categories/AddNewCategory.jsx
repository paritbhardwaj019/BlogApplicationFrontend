import { PlusCircleIcon, BookOpenIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../redux/slice/category/categorySlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const categorySchema = Yup.object({
  category: Yup.string().required("Category can't be Empty!"),
});

const AddNewCategory = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.users);
  const categoryStore = useSelector((store) => store.categories);
  const navigate = useNavigate();

  const { appError, serverError, loading } = categoryStore;
  const { user } = store;

  const isAdmin = user?.data?.user?.isAdmin;

  const formik = useFormik({
    initialValues: {
      category: "",
    },
    onSubmit: async (values) => {
      await dispatch(createCategoryAction(values));
      navigate("/category-list");
    },
    validationSchema: categorySchema,
  });

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Unauthorized</h1>
        <p className="text-gray-500 text-center">
          You do not have permission to access this page.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <BookOpenIcon className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add New Category
          </h2>
          <h1 className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-indigo-600 hover:text-indigo-500">
              These are the categories user will select when creating a post
            </p>
            {serverError || appError ? (
              <p className="mt-1 text-red-500">
                {serverError} {appError}
              </p>
            ) : (
              <></>
            )}
          </h1>
        </div>
        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              {/* Category Input */}
              <input
                type="text"
                autoComplete="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
                placeholder="New Category"
                value={formik.values.category}
                onChange={formik.handleChange("category")}
                onBlur={formik.handleBlur("category")}
              />
              <div className="text-red-400 mb-2 text-sm my-2">
                {formik.touched.category && formik.errors.category}
              </div>
            </div>
          </div>

          <div>
            <div>
              {/* Submit */}
              {loading ? (
                <button
                  disabled
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <PlusCircleIcon
                      className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <PlusCircleIcon
                      className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Add new Category
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCategory;
