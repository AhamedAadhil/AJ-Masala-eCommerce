import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useCarouselStore } from "../stores/useCarouselStore";

const BannerCarousel = () => {
  const { carousels, getCarousels } = useCarouselStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselLoading, setCarouselLoading] = useState(true);

  const [startTouch, setStartTouch] = useState(0);
  const [endTouch, setEndTouch] = useState(0);

  const navigate = useNavigate();
  // 1500x600 was exist
  // good solution 16:9 aspect ratio images
  // it will be 1800wx1000h px

  // Function to move to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carousels?.length);
  };

  // Function to move to the previous slide
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + carousels?.length) % carousels?.length
    );
  };

  // Function to move to a specific slide (via bullet)
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // fetch carousels from  API
  useEffect(() => {
    getCarousels();
  }, [getCarousels]);

  // Set up auto-sliding every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalId); // Clean up the interval on unmount
  });

  // Swipe event handlers
  const handleTouchStart = (e) => {
    setStartTouch(e.touches[0].clientX); // Get the starting position of touch
  };

  const handleTouchMove = (e) => {
    setEndTouch(e.touches[0].clientX); // Get the current touch position
  };

  const handleTouchEnd = () => {
    if (startTouch - endTouch > 100) {
      // Swipe left, go to next slide
      nextSlide();
    } else if (endTouch - startTouch > 100) {
      // Swipe right, go to previous slide
      prevSlide();
    }
  };

  return (
    // w-11/12
    <div
      className="relative w-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="overflow-hidden">
        <div className="relative w-full h-0 pb-[55.6%]">
          {/* This ensures a 18:10 or 9:5 aspect ratio */}
          {/*pb-[33.3%] will be use for 3:1 aspect ratio*/}
          {/* Show a placeholder if there are no carousels */}
          {carousels?.length === 0 ? (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 font-semibold text-lg">
                No Carousels Available
              </span>
            </div>
          ) : (
            <>
              {/* Placeholder */}
              {carouselLoading && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 font-semibold text-lg">
                    A.J FOODS
                  </span>
                </div>
              )}
              {/* carousel image */}
              <img
                onClick={() => {
                  navigate(carousels[currentIndex]?.url);
                }}
                src={carousels[currentIndex]?.image}
                alt="Banner"
                className={`absolute top-0 left-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
                  carouselLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setCarouselLoading(false)} // Set loading to false when image loads
              />
            </>
          )}
        </div>
      </div>

      {/* Bullets */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carousels?.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex
                ? "bg-yellow-500"
                : "bg-gray-300 hover:bg-yellow-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
