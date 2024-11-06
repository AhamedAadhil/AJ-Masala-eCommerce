import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
import { Product } from "../model/product.model.js";

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

export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        project: {
          _id: 1,
          name: 1,
          ps: 1,
          description: 1,
          images: 1,
          category: 1,
          tags: 1,
        },
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
    const product = await product.findById(id);
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
  const { name, description, ps, images, stock, category, isFeatured, tags } =
    req.body;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not  exist", succss: false });
    }
    let newImageUrls = [];
    if (images && images.length > 0) {
      for (const image of images) {
        const cloudinaryResponse = await cloudinary.uploader.upload(image, {
          folder: "products",
        });
        newImageUrls.push(cloudinaryResponse.secure_url);
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name: name || product.name,
        description: description || product.description,
        stock: stock ?? product.stock,
        category: category || product.category,
        isFeatured: isFeatured ?? product.isFeatured,
        tags: tags || product.tags,
        $push: { images: { $each: newImageUrls } }, // Append new images to existing ones
        ps: ps || product.ps, // Update price/size array only if provided
      },
      { new: true } // Return the updated product document
    );
    // check if feature has changed
    if (req.body.isFeatured !== undefined) {
      const featuredProducts = await Product.find({ isFeatured: true }).lean(); //find featured products
      if (!featuredProducts) {
        return res
          .status(404)
          .json({ message: "No featured products found", success: false });
      }
      try {
        //   store in redis for cache
        await redis.set("featured_products", JSON.stringify(featuredProducts));
      } catch (cacheError) {
        console.error("Error updating cache:", cacheError);
        return res
          .status(500)
          .json({ message: cacheError.message, success: false });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
