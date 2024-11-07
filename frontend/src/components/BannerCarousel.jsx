import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BannerCarousel = () => {
  return (
    <div className="relative w-full">
      <div className="overflow-hidden">
        <img src="https://img.freepik.com/premium-vector/modern-sale-banner-website-slider-template-design_54925-46.jpg" alt="Banner" className="w-full object-cover" style={{ height: '400px' }} />
      </div>
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <button className="p-2 bg-black bg-opacity-50 text-white rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <button className="p-2 bg-black bg-opacity-50 text-white rounded-full">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
export default BannerCarousel;