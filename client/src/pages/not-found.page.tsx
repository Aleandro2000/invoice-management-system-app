import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage(): JSX.Element {
  return (
    <div
      id="not-found"
      className="flex flex-col items-center justify-center text-center h-screen fade-in"
    >
      <h1 className="text-5xl font-bold text-ass-black-4 mb-4">
        404 - Page Not Found :(
      </h1>
      <p className="text-xl text-black mb-4">
        Sorry, we could not find the page you are looking for.
      </p>
      <Link to="/">
        <button
          type="button"
          className="bg-black text-white max-w-[200px] px-4 py-2 mt-5 rounded-full"
        >
          Go back home
        </button>
      </Link>
    </div>
  );
}
