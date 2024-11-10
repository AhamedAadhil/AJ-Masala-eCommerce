import cloudinary from "../lib/cloudinary.js";
import { Carousel } from "../model/carousel.model.js";

export const createCarousel = async (req, res) => {
  const { image, url } = req.body;
  try {
    // Ensure image is provided in Base64 format
    if (!image) {
      return res.status(400).json({ message: "No image provided." });
    }

    // upload image to cloudinary and get secureURl
    let cloudinaryResponse = null;
    cloudinaryResponse = await cloudinary.uploader.upload(image, {
      folder: "carousels",
    });

    const carousel = await Carousel.create({
      image: cloudinaryResponse?.secure_url,
      url,
    });
    if (!carousel) {
      return res.status(400).json({ message: "Failed to create carousel" });
    }
    return res.status(201).json({ carousel, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getAllCarousels = async (req, res) => {
  try {
    const carousels = await Carousel.find();
    if (!carousels) {
      return res.status(400).json({ message: "Failed to get carousels" });
    }
    return res.status(200).json({ carousels, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const deleteCarousel = async (req, res) => {
  const { id } = req.params;
  try {
    const carousel = await Carousel.findById(id);
    if (!carousel) {
      return res.status(400).json({ message: "Failed to delete carousel" });
    }
    const publicId = carousel.image.split("/").pop().split(".")[0]; //get image id of cloudinary
    try {
      await cloudinary.uploader.destroy(`carousels/${publicId}`);
      console.log("image deleted from cloudinary");
    } catch (error) {
      return res.status(500).json({ message: error.message, success: false });
    }
    await Carousel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Carousel deleted successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
