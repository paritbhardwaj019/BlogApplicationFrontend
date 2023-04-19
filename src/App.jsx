import { Routes, Route } from 'react-router-dom';
import {
  HomePage,
  PublicNavbar,
  Register,
  Login,
  PrivateNavbar,
  AdminNavbar,
  CreateCategory,
  NotFound,
  CreatePost,
  AllCategories,
  UpdateCategory,
  Profile,
  AllPosts,
} from './components';
import { useSelector } from 'react-redux';

export default function App() {
  const store = useSelector((store) => store.users);
  const { user } = store;

  const isAdmin = user?.data?.user?.isAdmin;

  return (
    <>
      {isAdmin ? (
        <AdminNavbar />
      ) : user?.data?.user ? (
        <PrivateNavbar />
      ) : (
        <PublicNavbar />
      )}
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/add-category" Component={CreateCategory} />
        <Route path="/create-post" Component={CreatePost} />
        <Route path="/posts" Component={AllPosts} />
        <Route path="/category-list" Component={AllCategories} />
        <Route path="/update-category/:id" Component={UpdateCategory} />
        <Route path="/profile" Component={Profile} />
        <Route path="/*" Component={NotFound} />
      </Routes>
    </>
  );
}
