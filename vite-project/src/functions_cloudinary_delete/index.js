import config from "../config/config.js";

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

module.exports = async function (req, res) {
  const payload = JSON.parse(req.payload);
  const { publicId } = payload;

  if (!publicId) {
    res.json({ message: "Public ID is required", success: false });
    return;
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    res.json({ message: "Image deleted successfully", result, success: true });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.json({ message: "Failed to delete image", error, success: false });
  }
};
