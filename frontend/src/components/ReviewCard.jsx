/* eslint-disable react/prop-types */
import { Star, Frown } from "lucide-react"; // Importing Sad icon for empty state

// Utility function to mask email
const maskEmail = (email) => {
  if (!email || !email.includes("@")) return "Anonymous";
  const [localPart, domain] = email.split("@");
  return `${localPart.slice(0, 5)}*****@${domain}`;
};

const ReviewCard = ({ reviews }) => {
  return (
    <div className="border border-blue-300 rounded-3xl p-6 max-w-lg mx-auto shadow-lg bg-gradient-to-b from-blue-50 to-white">
      <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-blue-700 text-center">
        Reviews & Ratings
      </h3>

      {/* Scrollable Container */}
      <div className="overflow-y-auto h-72 space-y-8">
        {reviews && reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <div
              key={review._id || idx} // Using review._id or fallback to index
              className="flex items-center gap-6 border-b pb-4"
            >
              {/* User Profile Image */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/10337/10337609.png"
                alt="User profile"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-blue-200 shadow-md"
              />

              {/* Review Content */}
              <div className="flex-1">
                {/* User Name */}
                <h4 className="text-md sm:text-lg font-semibold text-gray-700">
                  {maskEmail(review.user)}
                </h4>

                {/* Star Ratings */}
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={18}
                      className={
                        index < review.star
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                {/* Review Comment */}
                <p className="text-gray-600 text-sm sm:text-base mt-3">
                  {review.comment || "No comments provided."}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <Frown size={48} className="text-blue-500 mb-4" />
            <h4 className="text-lg sm:text-xl font-semibold text-gray-700">
              No Reviews Yet
            </h4>
            <p className="text-gray-600 text-sm sm:text-base mt-2 text-center">
              Be the first to review this product and share your thoughts!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
