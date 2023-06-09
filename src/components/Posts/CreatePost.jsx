import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createPostAction } from '../../redux/slice/posts/postSlices';
import CategorySelect from '../Categories/CategorySelect';
import styled from 'styled-components';

const formSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  image: Yup.string().required('Image is required'),
});

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: solid;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  margin-top: 20px;
  border-radius: 12px;
`;

export default function CreatePost() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.users);
  const post = useSelector((store) => store.posts);
  const { user } = store;

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      image: '',
    },
    onSubmit: (values) => {
      const data = {
        category: values.category.label,
        title: values.title,
        description: values.description,
        image: values.image,
      };
      dispatch(createPostAction(data));
    },
    validationSchema: formSchema,
  });

  const isAdmin = user?.data?.user?.isAdmin;

  const postsStore = useSelector((state) => state.posts);

  const { loading, appError, serverError } = postsStore;

  if (post?.isCreated) {
    return <Navigate to={'/posts'} />;
  }

  if (!user?.data?.user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-500">Oops!</h1>
          <p className="text-gray-500 text-2xl mt-4 mb-8">
            You're not logged in.
          </p>
          <Link
            to="/login"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="border border-red-500 hover:bg-red-500 text-red-500 hover:text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </Link>
        </div>
        <div className="absolute bottom-0 mb-4 text-gray-500">
          <p>
            Illustration by{' '}
            <a href="https://icons8.com/illustrations/author/5c461f80b0655d0017e00e27">
              Ouch.pics
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
            Create Post
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-green-600 hover:text-indigo-500">
              Share your ideas to the word.
            </p>
            {appError ||
              (serverError && (
                <p className="font-medium text-red-600 hover:text-indigo-500" s>
                  {serverError} {appError}
                </p>
              ))}
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <div className="mt-1">
                  {/* Title */}
                  <input
                    value={formik.values.title}
                    onChange={formik.handleChange('title')}
                    onBlur={formik.handleBlur('title')}
                    id="title"
                    name="title"
                    type="title"
                    autoComplete="title"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {/* Err msg */}
                <div className="text-red-500">
                  {formik.touched.title && formik.errors.title}
                </div>
              </div>
              {/* Category input goes here */}
              <CategorySelect
                value={formik.values}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                touched={formik.touched.category}
              />
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                {/* Description */}
                <textarea
                  value={formik.values.description}
                  onChange={formik.handleChange('description')}
                  onBlur={formik.handleBlur('description')}
                  rows="5"
                  cols="10"
                  className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                  type="text"
                ></textarea>
                {/* Err msg */}
                <div className="text-red-500">
                  {formik.touched.description && formik.errors.description}
                </div>
                {/* Image Component */}
                <Container className="container border-none bg-slate-300 hover:bg-slate-500 transition ease-out duration-200 cursor-pointer ">
                  <Dropzone
                    accept="image/jpeg, image/png"
                    onDrop={(acceptedFiles) => {
                      formik.setFieldValue('image', acceptedFiles[0]);
                    }}
                    onBlur={formik.handleBlur('image')}
                  >
                    {({ getRootProps, getInputProps }) => {
                      return (
                        <div className="container">
                          <div
                            {...getRootProps({
                              className: 'dropzone',
                              onDrop: (event) => {
                                event.stopPropagation();
                              },
                            })}
                          >
                            {/* <input  /> */}
                            <p className="text-gray" {...getInputProps}>
                              Click Here to Select Image
                            </p>
                          </div>
                        </div>
                      );
                    }}
                  </Dropzone>
                </Container>
              </div>
              <div>
                {/* Submit btn */}
                {loading ? (
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
