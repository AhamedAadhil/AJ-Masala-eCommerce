import { useState, useEffect } from "react";
import { Check } from "lucide-react";

const CookieNotice = () => {
  const consentKey = "cookieConsent";
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = sessionStorage.getItem(consentKey);
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem(consentKey, "true"); // Store consent
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="fixed bottom-0 w-full bg-gray-800 text-white p-4 flex items-center justify-between z-50">
        <p className="text-sm">
          We use cookies to securely authenticate users, authorize access to
          private routes, and validate transactions. By using our site, you
          agree to this use.
        </p>
        <button
          onClick={handleAccept}
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <Check className="mr-2" size={16} /> Accept
        </button>
      </div>
    )
  );
};

export default CookieNotice;
