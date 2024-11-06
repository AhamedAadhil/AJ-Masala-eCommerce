/* eslint-disable react/prop-types */

const LoginModal = ({ isOpen, onOpenRegister, onClose }) => {
  if (!isOpen) return null; // Only render if the modal is open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Welcome to AJ Masala!
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Log in to explore a world of authentic spices and exclusive deals
        </p>

        {/* Google Signup Button */}
        <button className="flex items-center justify-center w-full bg-gray-100 text-gray-700 py-2 px-4 rounded mb-4 hover:bg-gray-200">
          <img
            src="https://img.icons8.com/color/16/000000/google-logo.png"
            alt="Google Logo"
            className="mr-2"
          />
          Login with Google
        </button>

        <p className="text-center text-gray-500 mb-4">or with email</p>

        {/* login Form */}
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            Login
          </button>
        </form>

        {/* Already have an account link */}
        <p className="text-center text-gray-500 mt-4">
          Don&apos;t have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              onOpenRegister();
            }}
            className="text-yellow-500 hover:underline"
          >
            Register here
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
    </div>
  );
};

export default LoginModal;
