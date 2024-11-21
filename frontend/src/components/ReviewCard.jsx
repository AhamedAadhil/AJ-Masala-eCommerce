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
    <div className="border border-gray-300 rounded-xl p-6 max-w-lg mx-auto shadow-lg bg-gradient-to-b from-blue-50 to-white">
      <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-yellow-600 text-center">
        Reviews & Ratings
      </h3>

      {/* Scrollable Container */}
      <div className="overflow-y-auto h-60 space-y-4">
        {reviews && reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <div
              key={review._id || idx} // Using review._id or fallback to index
              className="flex items-center gap-4 border-b pb-2"
            >
              {/* User Profile Image */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/10337/10337609.png"
                alt="User profile"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-blue-200 shadow-sm"
              />

              {/* Review Content */}
              <div className="flex-1">
                {/* User Name */}
                <h4 className="text-sm sm:text-base font-semibold text-gray-600">
                  {maskEmail(review.user)}
                </h4>

                {/* Star Ratings */}
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={14}
                      className={
                        index < review.star
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                {/* Review Comment */}
                <p className="text-gray-500 text-xs sm:text-sm mt-2">
                  {review.comment || "No comments provided."}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <Frown size={32} className="text-blue-400 mb-2" />
            <h4 className="text-sm sm:text-base font-semibold text-gray-600">
              No Reviews Yet
            </h4>
            <p className="text-gray-500 text-xs sm:text-sm mt-1 text-center">
              Be the first to review this product and share your thoughts!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
