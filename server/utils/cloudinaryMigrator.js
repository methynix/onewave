const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const uploadImage = async (fileUrl, publicId) => {
  try {
    const result = await cloudinary.uploader.upload(fileUrl, {
      public_id: public_id,
      folder: 'one-wave-africa/products'
    });
    return result.secure_url; // Save this URL in your MongoDB
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
  }
};

module.exports = uploadImage;