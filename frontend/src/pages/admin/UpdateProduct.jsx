import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Plus, Trash, Upload, Loader } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { quilModules } from "../../lib/quilModules";
import { useProductStore } from "../../stores/useProductStore";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    product,
    loading,
    getSingleProduct,
    updateProduct,
    fetchAllProducts,
  } = useProductStore();

  const [deletedImages, setDeletedImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const categories = ["Spices", "Herbs", "Grains"];

  const [productData, setProductData] = useState(null); // Set to null initially

  useEffect(() => {
    const fetchProductData = async () => {
      if (id) {
        await getSingleProduct(id);
      }
    };
    fetchProductData();
  }, [id, getSingleProduct]);

  // const [productData, setProductData] = useState({
  //   id: "",
  //   name: "",
  //   description: "",
  //   stock: 0,
  //   category: "",
  //   tags: "",
  //   ps: [{ price: 0, size: "" }],
  //   images: [],
  // });

  useEffect(() => {
    // Set productData only when product data is fully fetched
    if (product && product._id) {
      setProductData({
        id: product._id,
        name: product.name,
        description: product.description,
        stock: product.stock || 0,
        category: product.category,
        tags: product.tags,
        ps: product.ps,
        images: product.images,
      });
    }
  }, [product]);

  if (loading || !productData) {
    return <div>Loading...</div>; // Show loading message while fetching product data
  }

  console.log(`product `, product);
  console.log(`product Data `, productData);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const addPriceSize = () => {
    setProductData({
      ...productData,
      ps: [...productData.ps, { price: "", size: "" }],
    });
  };

  const removePriceSize = (index) => {
    const newPs = [...productData.ps];
    newPs.splice(index, 1);
    setProductData({ ...productData, ps: newPs });
  };

  const handlePriceSizeChange = (index, field, value) => {
    const updatedPs = [...productData.ps];
    updatedPs[index][field] = value;
    setProductData({ ...productData, ps: updatedPs });
  };

  const handleCategoryChange = (event) => {
    setProductData({ ...productData, category: event.target.value });
  };

  const handleDescriptionChange = (value) => {
    setProductData({ ...productData, description: value });
  };

  const handleRemoveImage = (index) => {
    const imageToRemove = productData.images[index];
    setDeletedImages((prevDeletedImages) => [
      ...prevDeletedImages,
      imageToRemove,
    ]);
    const updatedImages = [...productData.images];
    updatedImages.splice(index, 1);
    setProductData({ ...productData, images: updatedImages });
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
              images: [...prevData.images, ...newImages],
            }));
            setNewImages((prevNewImages) => [...prevNewImages, ...newImages]);
          }
        };
        reader.readAsDataURL(file); // Convert to base64
        fileReaders.push(reader);
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(
      id,
      { ...productData, deletedImages, newImages },
      fetchAllProducts,
      navigate
    );
    console.log("Updated Product Data:", productData);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Update Product
        </h2>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {productData.images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt="Product"
                className="w-full h-34 object-cover rounded"
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                <Trash size={16} />
              </button>
            </div>
          ))}
          <label className="flex items-center justify-center w-full h-24 bg-gray-600 text-white rounded cursor-pointer">
            <Upload size={24} />
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white">Product Name</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-white">Product Description</label>
            {/* <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
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

          <div>
            <label className="block text-white">Stock</label>
            <input
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-white">Price and Size</label>
            {productData.ps.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) =>
                    handlePriceSizeChange(index, "price", e.target.value)
                  }
                  className="p-2 rounded bg-gray-700 text-white w-24"
                  required
                />
                <input
                  type="text"
                  placeholder="Size"
                  value={item.size}
                  onChange={(e) =>
                    handlePriceSizeChange(index, "size", e.target.value)
                  }
                  className="p-2 rounded bg-gray-700 text-white w-24"
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

          <div>
            <label className="block text-white">Category</label>
            <select
              name="category"
              value={productData.category}
              onChange={handleCategoryChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            >
              <option value="" disabled>
                Select a Category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white">Tags</label>
            <input
              type="text"
              name="tags"
              value={productData.tags}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>

          <button
            type="submit"
            className=" flex items-center justify-center gap-2 w-full p-3 mt-4 rounded bg-green-600 text-white"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader
                  className="mr-2 h-5 w-5 animate-spin"
                  aria-hidden="true"
                />
                Updating Product...
              </div>
            ) : (
              <div className="flex gap-2 items-center justify-center">
                <Box />
                Update Product
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
