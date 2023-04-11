import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { PencilAltIcon } from "@heroicons/react/outline";
import { fetchAllCategoryAction } from "../../redux/slice/category/categorySlice";

const CategoryList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoryAction());
  }, [dispatch]);

  const store = useSelector((store) => store.categories);

  console.log(store);

  const { loading, serverError, appError, categories } = store;

  console.log();

  return (
    <>
      {loading ? (
        <div className="loader"></div>
      ) : appError || serverError ? (
        <h1>
          {serverError} {appError}
        </h1>
      ) : categories?.length <= 0 ? (
        <h2>No Category Found!</h2>
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 ">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-transparent">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Author
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Created At
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.data?.categories?.map((category) => {
                      return (
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={category?.user?.profileImage}
                                  alt="category profile"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {category?.user?.firstName}{" "}
                                  {category?.user?.lastName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {category?.user?.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {category.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {category?.createdAt}
                          </td>
                          <Link>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <Link to={`/update-category/${category._id}`}>
                                <PencilAltIcon className="h-5 text-indigo-500" />
                              </Link>
                            </td>
                          </Link>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryList;
