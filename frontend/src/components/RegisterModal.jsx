/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Loader, Lock, Mail, User, UserPlus, EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";

const RegisterModal = ({ isOpen, onClose, onOpenLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData, onClose);
  };

  if (!isOpen) return null; // Don't render modal if it's not open

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <p className="text-center text-gray-600 mb-4">
          Join the A.J Foods family and spice up your life with exclusive access
          to authentic flavors!
        </p>

        {/* Google Signup Button */}
        {/* <button className="flex items-center justify-center w-full bg-gray-100 text-gray-700 py-2 px-4 rounded mb-4 hover:bg-gray-200">
          <img
            src="https://img.icons8.com/color/16/000000/google-logo.png"
            alt="Google Logo"
            className="mr-2"
          />
          Sign up with Google
        </button>

        <p className="text-center text-gray-500 mb-4">or with email</p> */}

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Username</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <User className="w-5 h-5" />
              </span>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full pl-10 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="John Doe"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-10 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="your@example.com"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pl-10 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="********"
              />
              {/* Eye Icon */}
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full pl-10 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="********"
              />
              {/* Eye Icon */}
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader
                  className="mr-2 h-5 w-5 animate-spin"
                  aria-hidden="true"
                />
                Loading...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />
                Sign Up
              </div>
            )}
          </button>
        </form>

        {/* Already have an account link */}
        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <a
            onClick={(e) => {
              e.preventDefault();
              onOpenLogin();
              onClose();
            }}
            href="#"
            className="text-yellow-500 hover:underline"
          >
            Login here
          </a>
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>
      </div>
    </motion.div>
  );
};

export default RegisterModal;
