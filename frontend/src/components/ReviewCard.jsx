import React from "react";
import { Star } from "lucide-react";

const ReviewCard = () => {
  return (
    <div className="border border-blue-300 rounded-3xl p-4 sm:p-6 max-w-lg mx-auto shadow-md">
      <h3 className="text-lg sm:text-xl font-semibold mb-4">Reviews & Ratings</h3>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/10337/10337609.png"
          alt="User profile"
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-gray-200"
        />
        <div className="flex-1">
          <h4 className="text-md sm:text-lg font-semibold">John Doe</h4>
          <div className="flex items-center my-1">
            {[...Array(5)].map((_, index) => (
              <Star key={index} size={16} className="text-yellow-500" />
            ))}
          </div>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Fenugreek is an annual plant in the family Fabaceae, with leaves
            consisting of three small obovate to oblong leaflets.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
