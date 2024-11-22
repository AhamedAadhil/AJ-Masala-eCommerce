import { useState, useEffect } from "react";
import { WifiOff, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

const NoInternet = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => {
      setIsOffline(true), toast.error("No internet connection");
    };
    const handleOnline = () => {
      setIsOffline(false), toast.success("Internet connection restored");
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  const handleRetry = () => {
    if (navigator.onLine) {
      setIsOffline(false); // If online, remove overlay
      toast.success("Internet connection restored");
    } else {
      toast.error("Still no internet connection");
    }
  };

  if (!isOffline) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center z-50">
      <WifiOff className="w-16 h-16 text-white mb-4" />
      <h2 className="text-xl text-white font-semibold">
        No Internet Connection
      </h2>
      <p className="text-white text-sm mt-2 mb-6">
        Please check your network and try again.
      </p>
      <button
        onClick={handleRetry}
        className="flex items-center gap-2 px-6 py-2 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 transition duration-200"
      >
        <RefreshCw className="w-5 h-5" />
        Retry
      </button>
    </div>
  );
};

export default NoInternet;
