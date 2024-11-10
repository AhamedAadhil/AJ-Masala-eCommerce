import { Trash2, Plus, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import AddCarouselModal from "../../components/admin/AddCarouselModal";
import { useCarouselStore } from "../../stores/useCarouselStore";

const CarouselManagement = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const {
    createCarousel,
    createLoading,
    getCarousels,
    deleteCarousel,
    carousels,
    loading,
  } = useCarouselStore();

  const handleCreateCarousel = (newCarousel) => {
    const { image, url } = newCarousel;
    createCarousel({ image, url });
    // Add code to handle the new carousel data, such as sending it to your backend server
  };

  useEffect(() => {
    getCarousels();
  }, [getCarousels]);

  return (
    <div className="p-6 bg-gray-800 min-h-screen rounded-lg">
      {/* Carousel Management Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">
          Carousel Management
        </h2>
        <button
          onClick={handleShowModal}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
          disabled={createLoading}
        >
          {createLoading ? (
            <div className="flex">
              <Loader className="mr-2 animate-spin" /> Creating
            </div>
          ) : (
            <div className="flex">
              <Plus className="mr-2" /> Add Carousel
            </div>
          )}
        </button>
        <AddCarouselModal
          show={showModal}
          handleClose={handleCloseModal}
          handleCreate={handleCreateCarousel}
        />
      </div>

      {/* Carousel Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {carousels.map((carousel, index) => (
          <div
            key={index}
            className="bg-gray-700 text-white rounded-lg shadow-md overflow-hidden"
          >
            <Link to={carousel.url} target="_blank" rel="noopener noreferrer">
              <img
                src={carousel.image}
                alt={`Carousel ${index + 1}`}
                className="w-full h-32 object-cover"
              />
            </Link>
            <div className="p-4 flex justify-between space-x-2">
              <span className="truncate">{carousel.url}</span>
              <button className="text-red-400 hover:text-red-500">
                <div className="flex">
                  <Loader
                    className={`mr-2 animate-spin ${!loading ? "hidden" : ""}`}
                  />
                  <Trash2
                    onClick={() => deleteCarousel(carousel._id)}
                    className="w-5 h-5"
                  />
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselManagement;
