import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { fetchAllCategoryAction } from '../../redux/slice/category/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchAllPosts } from '../../redux/slice/posts/postSlices';

export default function AllPosts() {
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const categoryStore = useSelector((state) => state.categories);
  const postsStore = useSelector((state) => state.posts);

  const { loading, appError, serverError, posts } = postsStore;
  const {
    loading: categoryLoading,
    appError: categoryAppError,
    serverError: categoryServerError,
    categories,
  } = categoryStore;

  useEffect(() => {
    dispatch(fetchAllCategoryAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllPosts(category));
  }, [category, dispatch]);

  return (
    <>
      <section>
        <div class="py-20 bg-gray-900 min-h-screen radius-for-skewed">
          <div class="container mx-auto px-4">
            <div class="mb-16 flex flex-wrap items-center">
              <div class="w-full lg:w-1/2">
                <span class="text-green-600 font-bold">
                  Latest Posts from our awesome authors
                </span>
                <h2 class="text-4xl text-gray-300 lg:text-5xl font-bold font-heading">
                  Latest Post
                </h2>
              </div>
              <div class=" block text-right w-1/2">
                {/* View All */}
                <button
                  class="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-green-600 hover:bg-green-700 text-gray-50 font-bold leading-loose transition duration-200"
                  onClick={() => setCategory('')}
                >
                  View All Posts
                </button>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3">
              <div class="mb-8 lg:mb-0 w-full lg:w-1/4 px-3">
                <div class="py-4 px-6 bg-gray-600 shadow rounded">
                  <h4 class="mb-4 text-gray-500 font-bold uppercase">
                    Categories
                  </h4>
                  <ul>
                    {loading ? (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : appError || serverError ? (
                      <h1>Error</h1>
                    ) : categories?.data?.categories?.length <= 0 ? (
                      <h1>No Category</h1>
                    ) : (
                      categories?.data?.categories.map((currElem) => {
                        return (
                          <li onClick={() => setCategory(currElem?.title)}>
                            <p className="block cursor-pointer py-2 px-3 mb-4 rounded text-yellow-500 font-bold bg-gray-500">
                              {currElem?.title}
                            </p>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
              </div>
              <div class="w-full lg:w-3/4 px-3">
                {loading ? (
                  <h1 className="text-xl text-white">Loading...</h1>
                ) : appError || serverError ? (
                  <h1>Error</h1>
                ) : posts?.data?.posts?.length <= 0 ? (
                  <h1 className="text-xl text-white">No Post</h1>
                ) : (
                  posts?.data?.posts?.map((currElem) => {
                    return (
                      <div class="flex flex-wrap bg-gray-900 -mx-3  lg:mb-6">
                        <div class="mb-10  w-full lg:w-1/4 px-3">
                          <Link>
                            {/* Post image */}
                            <img
                              class="w-full h-full object-cover rounded"
                              src={currElem?.image}
                              alt=""
                            />
                          </Link>
                          {/* Likes, views dislikes */}
                          <div className="flex flex-row bg-gray-300 justify-center w-full  items-center ">
                            {/* Likes */}
                            <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                              {/* Togle like  */}
                              <div className="">
                                <ThumbUpIcon className="h-7 w-7 text-indigo-600 cursor-pointer" />
                              </div>
                              <div className="pl-2 text-gray-600">
                                {currElem?.likes.length}
                              </div>
                            </div>
                            {/* Dislike */}
                            <div className="flex flex-row  justify-center items-center ml-4 mr-4 pb-2 pt-1">
                              <div>
                                <ThumbDownIcon className="h-7 w-7 cursor-pointer text-gray-600" />
                              </div>
                              <div className="pl-2 text-gray-600">
                                {currElem?.disLikes.length}
                              </div>
                            </div>
                            {/* Views */}
                            <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                              <div>
                                <EyeIcon className="h-7 w-7  text-gray-400" />
                              </div>
                              <div className="pl-2 text-gray-600">
                                {currElem?.numViews}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="w-full lg:w-3/4 px-3">
                          <Link class="hover:underline">
                            <h3 class="mb-1 text-2xl text-green-400 font-bold font-heading">
                              {currElem?.title}
                            </h3>
                          </Link>
                          <p class="text-gray-300">{currElem?.description}</p>
                          {/* Read more */}
                          <Link className="text-indigo-500 hover:underline">
                            Read More..
                          </Link>
                          {/* User Avatar */}
                          <div className="mt-6 flex items-center">
                            <div className="flex-shrink-0">
                              <Link>
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={currElem?.user?.profileImage}
                                  alt=""
                                />
                              </Link>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">
                                <Link className="text-yellow-400 hover:underline ">
                                  {`${currElem?.user?.firstName} ${currElem?.user?.lastName}`}
                                </Link>
                              </p>
                              <div className="flex space-x-1 text-sm text-green-500">
                                <time>{currElem?.createdAt}</time>
                                <span aria-hidden="true">&middot;</span>
                              </div>
                            </div>
                          </div>
                          {/* <p class="text-gray-500">
                            Quisque id sagittis turpis. Nulla sollicitudin rutrum
                            eros eu dictum...
                          </p> */}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-900">
          <div class="skew bg-green-500 skew-bottom mr-for-radius">
            <svg
              class="h-8 md:h-12 lg:h-10 w-full text-gray-900"
              viewBox="0 0 10 10"
              preserveAspectRatio="none"
            >
              <polygon fill="currentColor" points="0 0 10 0 0 10"></polygon>
            </svg>
          </div>
          <div class="skew bg-gray-500  skew-bottom ml-for-radius">
            <svg
              class="h-8 bg-gray-500 md:h-12 lg:h-20 w-full text-gray-900"
              viewBox="0 0 10 10"
              preserveAspectRatio="none"
            >
              <polygon fill="currentColor" points="0 0 10 0 10 10"></polygon>
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}
