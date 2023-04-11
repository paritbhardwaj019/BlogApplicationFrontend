import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-gray-500 text-2xl mt-4 mb-8">
          Oops! Page not found.
        </p>
        <Link
          to="/"
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Go Home
        </Link>
      </div>
      <div className="absolute bottom-0 mb-4 text-gray-500">
        <p>
          Illustration by{" "}
          <a href="https://icons8.com/illustrations/author/5c461f80b0655d0017e00e27">
            Ouch.pics
          </a>
        </p>
      </div>
    </div>
  );
}
