import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
import { Product } from "../model/product.model.js";
import { Order } from "../model/order.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}); //find all products
    res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      featuredProducts = JSON.parse(featuredProducts);
      return res.status(200).json({ featuredProducts, success: true });
    }
    // if not in redis
    // .lean() is gonna return a plain javascript object instead of mongodb obj (good for performance)
    const products = await Product.find({ isFeatured: true }).lean(); //find featured products
    if (!products) {
      return res
        .status(404)
        .json({ message: "No featured products found", success: false });
    }
    //   store in redis for cache
    await redis.set("featured_products", JSON.stringify(featuredProducts));
    return res.status(200).json(featuredProducts);
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, ps, images, category, tags } = req.body;
  try {
    let imageUrls = [];
    let cloudinaryResponse = null;
    if (images && images.length > 0) {
      for (const image of images) {
        cloudinaryResponse = await cloudinary.uploader.upload(image, {
          folder: "products",
        });
        imageUrls.push(cloudinaryResponse?.secure_url);
      }
    }
    const product = await Product.create({
      name,
      description,
      ps, // Array with price and size objects
      images: imageUrls,
      category,
      tags,
    });

    res.status(201).json({ product, success: true });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }
    if (product.images) {
      for (const image of product.images) {
        const publicId = image.split("/").pop().split(".")[0]; //get image id of cloudinary
        try {
          await cloudinary.uploader.destroy(`products/${publicId}`);
          console.log("image deleted from cloudinary");
        } catch (error) {
          return res
            .status(500)
            .json({ message: error.message, success: false });
        }
      }
    }
    await Product.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: "Product deleted from database", succes: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const toggleVisibility = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }
    product.isVisible = !product.isVisible; // toggle visibility
    await product.save();
    return res
      .status(200)
      .json({ product, message: "Product visibility toggled", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 4 },
      },
    ]);
    res.status(200).json({ products, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    return res.json(200).json({ products, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not exist!", success: false });
    }
    return res.status(200).json({ product, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    ps,
    stock,
    category,
    isFeatured,
    tags,
    deletedImages,
    newImages,
  } = req.body;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not  exist", succss: false });
    }

    // Handle image deletion from Cloudinary
    if (deletedImages && deletedImages.length > 0) {
      for (const image of deletedImages) {
        const publicId = image.split("/").pop().split(".")[0]; // Get the image ID from Cloudinary URL
        try {
          await cloudinary.uploader.destroy(`products/${publicId}`);
          console.log("Image deleted from Cloudinary");
          // Now, remove the image from the product's image list in the database
          product.images = product.images.filter((img) => img !== image);
        } catch (error) {
          return res
            .status(500)
            .json({ message: error.message, success: false });
        }
      }
    }

    // Handle image upload if provided
    let newImageUrls = [];
    if (newImages && newImages.length > 0) {
      for (const image of newImages) {
        const cloudinaryResponse = await cloudinary.uploader.upload(image, {
          folder: "products",
        });
        newImageUrls.push(cloudinaryResponse.secure_url);
      }
    }

    // Update the product details in the database
    product.name = name || product.name;
    product.description = description || product.description;
    product.stock = stock ?? product.stock;
    product.category = category || product.category;
    product.isFeatured = isFeatured ?? product.isFeatured;
    product.tags = tags || product.tags;
    product.ps = ps || product.ps; // Update price/size array only if provided

    // Push new images to the existing image list if any
    if (newImageUrls.length > 0) {
      product.images.push(...newImageUrls); // Add new images
    }

    // Save the updated product in the database
    const updatedProduct = await product.save();

    // check if feature has changed and update cache if necessary
    if (req.body.isFeatured !== undefined) {
      const featuredProducts = await Product.find({ isFeatured: true }).lean(); //find featured products
      try {
        if (featuredProducts.length > 0) {
          // Only cache if there are featured products
          await redis.set(
            "featured_products",
            JSON.stringify(featuredProducts)
          );
        } else {
          console.warn("No featured products to cache.");
        }
      } catch (cacheError) {
        console.error("Error updating cache:", cacheError);
        return res
          .status(500)
          .json({ message: cacheError.message, success: false });
      }
    }
    // Send response with updated product
    return res.json({
      message: "Product updated successfully",
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const createReview = async (req, res) => {
  const { productId, orderId } = req.params;
  const { star, comment } = req.body;
  const user = req.user;

  if (user.role === "admin") {
    return res.status(403).json({ message: "Access Denied", success: false });
  }

  try {
    const order = await Order.findOne({ orderId });
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found", success: false });
    }

    const productInOrder = order.products.find(
      (product) => product.product.toString() === productId
    );

    if (!productInOrder) {
      return res
        .status(404)
        .json({ message: "Product not found in the order", success: false });
    }

    // Find the product in the Product collection
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    if (
      product.rating.some(
        (review) => review.user === user.email && review.orderId === orderId
      )
    ) {
      return res.status(400).json({
        message: "You have already reviewed this product",
        success: false,
      });
    }

    // Add the review to the product's rating array
    product.rating.push({ star, comment, user: user.email, orderId });

    // Calculate the new `overAllRating`
    const totalStars = product.rating.reduce(
      (total, review) => total + review.star,
      0
    );
    const numberOfReviews = product.rating.length;
    product.overAllRating = totalStars / numberOfReviews;

    // Save the updated product
    await product.save();

    return res.status(200).json({
      message: "Review added successfully",
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
