import React, { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Cards from "./Cards";
import { bookAPI } from "../services/api";
function Freebook() {
  const [book, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBook = async () => {
      setIsLoading(true);
      try {
        const res = await bookAPI.getAllBooks();
        const data = res.data.filter((data) => data.category === "Free");
        console.log(data);
        setBook(data);
        setError(null);
      } catch (error) {
        console.log(error);
        setError("Failed to load free books. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    getBook();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div>
          <h1 className="font-semibold text-xl pb-2">Free Offered Courses</h1>
          <p>
          Free books exposing societal flaws, like "Animal Farm," reveal corruption and inequality, igniting critical thought and inspiring change through timeless stories.
          </p>
        </div>

        <div>
          {isLoading ? (
            <div className="text-center py-10">
              <p className="text-xl">Loading free books...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-xl text-red-500">{error}</p>
            </div>
          ) : book.length > 0 ? (
            <Slider {...settings}>
              {book.map((item) => (
                <Cards item={item} key={item._id} />
              ))}
            </Slider>
          ) : (
            <div className="text-center py-10">
              <p className="text-xl">No free books available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Freebook;
