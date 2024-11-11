import { useState, useEffect } from "react";
const BannerCarousel = () => {
  // 1500x600 was exist
  // good solution 16:9 aspect ratio images
  // it will be 1800wx1000h px
  // or 2880 x1620
  const images = [
    "https://via.placeholder.com/1800x1000/ff7f7f/333333?text=Sale+Banner+1",
    "https://via.placeholder.com/1800x1000/4e73df/ffffff?text=Sale+Banner+2",
    "https://via.placeholder.com/1800x1000/28a745/ffffff?text=Sale+Banner+3",
    "https://via.placeholder.com/1800x1000/f39c12/ffffff?text=Sale+Banner+4",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to move to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to move to a specific slide (via bullet)
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Set up auto-sliding every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalId); // Clean up the interval on unmount
  });

  return (
    <div className="relative w-11/12">
      <div className="overflow-hidden">
        <div className="relative w-full h-0 pb-[40%]">
          {" "}
          {/* This ensures a 16:9 aspect ratio */}
          <img
            src={images[currentIndex]}
            alt="Banner"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Bullets */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex
                ? "bg-blue-500"
                : "bg-gray-300 hover:bg-blue-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
