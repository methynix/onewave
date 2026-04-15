require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const supabase = require('./config/supabase');
const path = require('path');
const fs = require('fs');

cloudinary.config({
  cloud_name: 'dwt1u991q',
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const uploadPredictable = async (fileName, publicId) => {
  const filePath = path.join(__dirname, '../client/public', fileName);
  if (!fs.existsSync(filePath)) return null;
  
  const res = await cloudinary.uploader.upload(filePath, {
    folder: "onewave_final",
    public_id: publicId, // THIS FORCES THE URL TO BE PREDICTABLE
    overwrite: true,
    quality: "auto:best"
  });
  return res.secure_url;
};

const run = async () => {
  console.log("🚀 Starting Predictable Image Sync...");

  const mapping = [
    // MOTOROLA R2
    { name: "Mototrbo R2", brand: "Motorola", local: ["R2-1.jpg", "R2-2.jpg", "R2-3.jpg"], idBase: "moto_r2" },
    // MOTOROLA R7
    { name: "Mototrbo R7", brand: "Motorola", local: ["R7-1.jpg", "R7-2.jpg", "R7-3.jpg", "R7-4.jpg"], idBase: "moto_r7" },
    // MOTOROLA T82
    { name: "Motorola T82/T80", brand: "Motorola", local: ["T82-1.jpg", "T82-2.png", "T82-3.jpg", "T82-4.jpg", "T82-5.png"], idBase: "moto_t82" },
    // MOTOROLA GP340
    { name: "Motorola GP340/328", brand: "Motorola", local: ["gp328-1.png", "gp340-2.jpg", "gp340-3.png", "gp340-5.png"], idBase: "moto_gp340" },
    // KENWOOD NX3300
    { name: "Nexedge NX-3300", brand: "Kenwood", local: ["nx3300-1.jpg", "nx3300-2.jpg", "nx3300-3.jpg", "nx3300-4.jpg"], idBase: "ken_nx3300" },
    // KENWOOD P1200
    { name: "Kenwood NX-P1200NV", brand: "Kenwood", local: ["p1200nv-1.webp", "p1200nv-2.jpg", "p1200nv-3.png", "p1200nv-4.png"], idBase: "ken_p1200" }
  ];

  for (const item of mapping) {
    const urls = [];
    for (let i = 0; i < item.local.length; i++) {
      const url = await uploadPredictable(item.local[i], `${item.idBase}_${i + 1}`);
      if (url) urls.push(url);
    }
    
    // Update Supabase with the new array of multiple images
    await supabase.from('products').update({ images: urls }).eq('name', item.name);
    console.log(`✅ ${item.name}: Synced ${urls.length} images.`);
  }

  process.exit();
};

run();