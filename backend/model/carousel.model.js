import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema({
  image: { type: String, required: true },
  url: { type: String, required: true },
});

export const Carousel = mongoose.model("Carousel", carouselSchema);
