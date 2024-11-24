import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Search, Lock, ShoppingCart, Menu, UserPlus } from "lucide-react";

import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useProductStore } from "../stores/useProductStore";
import AJLogo from "../assets/AJLogo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { products } = useProductStore();
  let { cartItemCount } = useCartStore();

  const isAdmin = user?.role === "admin";

  if (cartItemCount === 0 && user?.cartItems?.length) {
    cartItemCount += user?.cartItems?.length;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [searchResults, setSearchResults] = useState([]); // State for filtered products

  const toggleMenu = () => setIsOpen(!isOpen);
  const openRegisterModal = () => {
    setRegisterModalOpen(true);
    setLoginModalOpen(false);
  };
  const openLoginModal = () => {
    setLoginModalOpen(true);
    setRegisterModalOpen(false);
  };
  const closeRegisterModal = () => setRegisterModalOpen(false);
  const closeLoginModal = () => setLoginModalOpen(false);

  // Handle search input change
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const results = products?.filter(
        (product) =>
          product?.name?.toLowerCase().includes(query) ||
          product?.category?.toLowerCase().includes(query)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <nav className="bg-yellow-500 shadow-md">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex flex-row text-2xl font-bold text-black cursor-pointer"
        >
          <img className="pt-2" src={AJLogo} alt="aj-logo" width={50} />
          <h2 className="pt-3 text-2xl font-bold">A. J FOODS</h2>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 mx-4">
          <div
            className={`relative w-full ${
              user?.role === "admin" ? "hidden" : ""
            }`}
          >
            <input
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
            <Search className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-2 z-10">
                {searchResults?.map((product) => (
                  <div
                    key={product._id}
                    className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-4"
                    onClick={() => {
                      navigate(`/product/${product._id}`);
                      setSearchQuery("");
                      setSearchResults([]);
                    }}
                  >
                    {/* Product Image */}
                    <img
                      src={product?.images?.[0]} // Assuming each product has an 'image' property
                      alt={product?.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />

                    {/* Product Details */}
                    <div>
                      <h4 className="font-medium text-black">{product.name}</h4>
                      <p className="text-sm text-gray-600">
                        {product.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navbar Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-black hover:text-gray-800">
            Home
          </Link>
          <Link to="/all" className="text-black hover:text-gray-800">
            All Products
          </Link>
          <Link to="/about" className="text-black hover:text-gray-800">
            About us
          </Link>

          <Link to="/contact" className="text-black hover:text-gray-800">
            Contact us
          </Link>
        </div>

        {/* Icons for both mobile and desktop */}
        <div className="flex items-center space-x-4 ml-3 relative">
          {isAdmin && (
            <>
              {/* Dashboard Icon */}
              <button
                onClick={() => navigate("/admin")}
                className="flex items-center bg-orange-500 text-white mx-2 px-2 py-1 rounded hover:bg-green-500 cursor-pointer"
              >
                <Lock size={18} className="inline-block mr-1" />{" "}
                <span className="hidden sm:inline">Dashboard</span>
              </button>
            </>
          )}

          {/* Cart Icon with Badge */}
          {user && user?.role === "customer" && cartItemCount >= 0 && (
            <div className="relative">
              <ShoppingCart
                onClick={() => navigate("/cart")}
                className="text-black text-xl cursor-pointer"
              />

              <span className="absolute -top-2 -left-1 bg-red-500 text-white rounded-full text-xs px-1.5 py-0.5">
                {cartItemCount ?? 0}
              </span>
            </div>
          )}

          {/* Login/Profile Icon */}
          {user && user?.role === "customer" ? (
            <img
              src="https://img.icons8.com/color/48/000000/user.png"
              height={30}
              width={30}
              alt="Profile"
              onClick={() => navigate(`/profile/${user?._id}`)}
              className="text-black text-xl cursor-pointer"
            />
          ) : user && user?.role !== "customer" ? null : (
            <button
              onClick={openLoginModal}
              className="flex items-center gap-2 bg-green-500 text-white mx-2 px-2 py-1 rounded hover:bg-green-600"
            >
              <UserPlus size={18} /> Login
            </button>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button onClick={toggleMenu} className="md:hidden text-black text-2xl">
          <Menu />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-yellow-500">
          <div className="p-4 border-t border-gray-300">
            <div
              className={`relative w-full ${
                user?.role === "admin" ? "hidden" : ""
              }`}
            >
              <input
                type="text"
                placeholder="Search products"
                value={searchQuery}
                onChange={handleSearch}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              />
              <Search className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
              {/* Search Results Dropdown */}
              {searchResults?.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-2 z-10">
                  {searchResults?.map((product) => (
                    <div
                      key={product._id}
                      className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-4"
                      onClick={() => {
                        navigate(`/product/${product._id}`);
                        setSearchQuery("");
                        setSearchResults([]);
                      }}
                    >
                      {/* Product Image */}
                      <img
                        src={product?.images?.[0]} // Assuming each product has an 'image' property
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />

                      {/* Product Details */}
                      <div>
                        <h4 className="font-medium text-black">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {product.category}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Link to="/" className="block py-2 text-black hover:text-gray-800">
              Home
            </Link>
            <Link
              to="/all"
              className="block py-2 text-black hover:text-gray-800"
            >
              All Products
            </Link>
            <Link
              to="/about"
              className="block py-2 text-black hover:text-gray-800"
            >
              About us
            </Link>

            <Link
              to="/contact"
              className="block py-2 text-black hover:text-gray-800"
            >
              Contact us
            </Link>
          </div>
        </div>
      )}

      {/* Register and Login Modals */}
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
        onOpenLogin={openLoginModal}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onOpenRegister={openRegisterModal}
      />
    </nav>
  );
};

export default Navbar;
