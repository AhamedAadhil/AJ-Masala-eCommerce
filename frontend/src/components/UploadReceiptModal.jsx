/* eslint-disable react/prop-types */

import { Loader, X } from "lucide-react";

const UploadReceiptModal = ({
  isOpen,
  onClose,
  onFileChange,
  onUpload,
  loading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Upload Payment Receipt</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          className="block w-full mb-4 border rounded-lg p-2"
          onChange={onFileChange} // Bind to file change event
        />
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg text-sm hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onUpload} // Trigger upload
            className="px-4 py-2 bg-blue-500 rounded-lg text-white text-sm hover:bg-blue-600"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-1">
                <Loader className="animate-spin" /> Uploading...
              </span>
            ) : (
              "Upload"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadReceiptModal;
