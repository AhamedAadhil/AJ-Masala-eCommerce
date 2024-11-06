// eslint-disable-next-line react/prop-types
const RegisterModal = ({ isOpen, onClose, onOpenLogin }) => {
  if (!isOpen) return null; // Don't render modal if it's not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <p className="text-center text-gray-600 mb-4">
          Join the AJ Masala family and spice up your life with exclusive access
          to authentic flavors!
        </p>

        {/* Google Signup Button */}
        <button className="flex items-center justify-center w-full bg-gray-100 text-gray-700 py-2 px-4 rounded mb-4 hover:bg-gray-200">
          <img
            src="https://img.icons8.com/color/16/000000/google-logo.png"
            alt="Google Logo"
            className="mr-2"
          />
          Sign up with Google
        </button>

        <p className="text-center text-gray-500 mb-4">or with email</p>

        {/* Registration Form */}
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1">Username</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Username"
            />
          </div>
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
            Sign Up
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
    </div>
  );
};

export default RegisterModal;
