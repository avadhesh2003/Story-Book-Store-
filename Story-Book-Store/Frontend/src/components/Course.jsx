import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import { bookAPI } from "../services/api";
function Course() {
  const [book, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBook = async () => {
      setIsLoading(true);
      try {
        const res = await bookAPI.getAllBooks();
        console.log(res.data);
        setBook(res.data);
        setError(null);
      } catch (error) {
        console.log(error);
        setError("Failed to load books. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    getBook();
  }, []);
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500"> Here! :)</span>
          </h1>
          <p className="mt-12">
          Here’s a short description: Coursera Plus offers unlimited access to top university courses covering AI, business, and more. Udemy provides affordable learning in programming, data science, and personal growth.
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12">
          {isLoading ? (
            <div className="text-center py-10">
              <p className="text-xl">Loading books...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-xl text-red-500">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4">
              {book.map((item) => (
                <Cards key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Course;
