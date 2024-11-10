import { Edit, Trash2, Plus } from "lucide-react";

const CarouselList = () => {
  const carousels = [
    {
      title: "50% Mega Sale",
      description:
        "This carousel will appear in the Home page and we can post offers and ads and job updates in this.",
      fromDate: "25/11/2024",
      toDate: "28/11/2024",
      img: "https://via.placeholder.com/150", // Placeholder for the image URL
    },
    // Add more carousel items here as needed
  ];

  return (
    <div className="p-6 bg-gray-800 min-h-screen">
      {/* Carousel Management Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">
          Carousel Management
        </h2>
        <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
          <Plus className="mr-2" /> Add Carousel
        </button>
      </div>

      {/* Carousel Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {carousels.map((carousel, index) => (
          <div
            key={index}
            className="bg-gray-700 text-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={carousel.img}
              alt={carousel.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{carousel.title}</h3>
              <p className="text-sm mt-2 text-gray-300">
                {carousel.description}
              </p>
              <div className="mt-3 text-sm text-gray-400">
                <p>From: {carousel.fromDate}</p>
                <p>To: {carousel.toDate}</p>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button className="text-blue-400 hover:text-blue-500">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="text-red-400 hover:text-red-500">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselList;
