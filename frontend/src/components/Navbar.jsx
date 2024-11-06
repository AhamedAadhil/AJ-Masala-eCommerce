import { useState } from "react";
import { Search, Heart, ShoppingCart, Menu } from "lucide-react";

import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const openRegisterModal = () => {
    setRegisterModalOpen(true);
    setLoginModalOpen(false); // Ensure login modal is closed when register opens
  };
  const openLoginModal = () => {
    setLoginModalOpen(true);
    setRegisterModalOpen(false); // Ensure register modal is closed when login opens
  };
  const closeRegisterModal = () => setRegisterModalOpen(false);
  const closeLoginModal = () => setLoginModalOpen(false);

  return (
    <nav className="bg-yellow-500 shadow-md">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-black">AJ MASALA</div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Type to search products"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
            <Search className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Navbar Links */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#home" className="text-black hover:text-gray-800">
            Home
          </a>
          <a href="#top-selling" className="text-black hover:text-gray-800">
            Top Selling
          </a>
          <a href="#all-products" className="text-black hover:text-gray-800">
            All Products
          </a>
          <a href="#contact" className="text-black hover:text-gray-800">
            Contact us
          </a>
        </div>

        {/* Icons for both mobile and desktop */}
        <div className="flex items-center space-x-4 ml-3">
          {/* Heart and Cart icons for both mobile and desktop */}
          <Heart className="text-red-500 text-xl cursor-pointer" />
          <ShoppingCart className="text-black text-xl cursor-pointer" />

          {/* Login Button for desktop and mobile */}
          <button
            onClick={openLoginModal}
            className="bg-green-500 text-white mx-2 px-3 py-1 rounded hover:bg-green-600"
          >
            Login
          </button>
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
            <a
              href="#home"
              className="block py-2 text-black hover:text-gray-800"
            >
              Home
            </a>
            <a
              href="#top-selling"
              className="block py-2 text-black hover:text-gray-800"
            >
              Top Selling
            </a>
            <a
              href="#all-products"
              className="block py-2 text-black hover:text-gray-800"
            >
              All Products
            </a>
            <a
              href="#contact"
              className="block py-2 text-black hover:text-gray-800"
            >
              Contact us
            </a>
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
