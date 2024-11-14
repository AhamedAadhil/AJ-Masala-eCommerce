import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Plus, Upload, Loader } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { quilModules } from "../../lib/quilModules";

import { useProductStore } from "../../stores/useProductStore";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [priceSizeList, setPriceSizeList] = useState([{ price: "", size: "" }]);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    tags: "",
    images: [],
    ps: [{ price: "", size: "" }],
  });

  const { createProduct, loading } = useProductStore();

  const fileInputRef = useRef(null); // Create a ref for the file input

  // Handle change in the main product fields
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  // Handle description change from Quill editor
  const handleDescriptionChange = (value) => {
    setProductData({ ...productData, description: value });
  };
  // Add a new price/size combo
  const addPriceSize = () => {
    setPriceSizeList([...priceSizeList, { price: "", size: "" }]);
  };

  // Remove a price/size combo
  const removePriceSize = (index) => {
    const newPriceSizeList = [...priceSizeList];
    newPriceSizeList.splice(index, 1);
    setPriceSizeList(newPriceSizeList);
  };

  // Handle change in each price/size combo
  const handlePriceSizeChange = (index, field, value) => {
    const newPriceSizeList = [...priceSizeList];
    newPriceSizeList[index][field] = value;
    setPriceSizeList(newPriceSizeList);
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files) {
      const fileReaders = [];
      const newImages = [];
      // Loop through each file and convert it to a base64 string
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result);

          // If all files are processed, update the state
          if (newImages.length === files.length) {
            setProductData((prevData) => ({
              ...prevData,
              images: newImages,
            }));
          }
        };
        reader.readAsDataURL(file); // Convert to base64
        fileReaders.push(reader);
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update the ps field with the current priceSizeList
    const updatedProductData = {
      ...productData,
      ps: priceSizeList,
    };

    try {
      await createProduct(updatedProductData, navigate);
      setProductData({
        name: "",
        description: "",
        category: "",
        tags: "",
        images: [],
        ps: [{ price: "", size: "" }],
      });
      setPriceSizeList([{ price: "", size: "" }]); // Reset priceSizeList
      if (fileInputRef.current) fileInputRef.current.value = ""; // Clear the file input
    } catch (error) {
      console.error("Error creating product:", error.message);
    }
  };

  return (
    <div className="p-8 bg-gray-100 h-full w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Create New Product
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label className="block text-white">Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            className="w-full p-2 rounded bg-gray-700 text-white"
            onChange={handleChange}
            value={productData.name}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white">Product Description</label>
          {/* <textarea
            name="description"
            placeholder="Tell more about your product"
            className="w-full p-2 rounded bg-gray-700 text-white"
            onChange={handleChange}
            value={productData.description}
            required
          /> */}
          <ReactQuill
            theme="snow"
            placeholder="Tell more about your product"
            className="text-white"
            value={productData.description}
            onChange={handleDescriptionChange}
            modules={quilModules}
          />
        </div>

        <div className="mb-4">
          <label className="block text-white">Price and Size</label>
          {priceSizeList.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="number"
                placeholder="Rs."
                className="p-2 rounded bg-gray-700 text-white w-24"
                value={item.price}
                onChange={(e) =>
                  handlePriceSizeChange(index, "price", e.target.value)
                }
                required
              />
              <input
                type="text"
                placeholder="Size."
                className="p-2 rounded bg-gray-700 text-white w-24"
                value={item.size}
                onChange={(e) =>
                  handlePriceSizeChange(index, "size", e.target.value)
                }
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removePriceSize(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addPriceSize}
            className="flex items-center text-green-500 mt-2"
          >
            <Plus className="mr-1" size={15} /> Add
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-white">Category</label>
          <select
            name="category"
            className="w-full p-2 rounded bg-gray-700 text-white"
            onChange={handleChange}
            value={productData.category}
          >
            <option value="" disabled>
              Select a Category
            </option>
            <option value="Spices">Spices</option>
            <option value="Herbs">Herbs</option>
            <option value="Grains">Grains</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-white">Tags</label>
          <input
            type="text"
            name="tags"
            placeholder="Enter any tags related to this product"
            className="w-full p-2 rounded bg-gray-700 text-white"
            onChange={handleChange}
            value={productData.tags}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white">Upload Images</label>
          <div className="flex items-center space-x-2">
            <Upload className="text-white" />
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              className="w-full p-2 rounded bg-gray-700 text-white"
              onChange={handleFileChange}
              required
              disabled={loading}
              ref={fileInputRef}
            />
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="flex items-center justify-center gap-2  w-full p-3 mt-4 rounded bg-green-600 hover:bg-green-700 text-white font-bold"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader
                className="mr-2 h-5 w-5 animate-spin"
                aria-hidden="true"
              />
              Creating Product...
            </div>
          ) : (
            <div className="flex gap-2 items-center justify-center">
              <Box />
              Create Product
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
