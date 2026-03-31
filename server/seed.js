require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const supabase = require('./config/supabase');
const path = require('path');
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const fix = async () => {
  console.log("🚀 Targeted Fix for Alcohol Tester...");

  // 1. Tafuta bidhaa hata kama jina ni refu (kama 'Professional Digital...')
  const { data: product } = await supabase
    .from('products')
    .select('id, name')
    .ilike('name', '%Alcohol Tester%')
    .single();

  if (!product) {
    console.error("❌ ERROR: Haijawahi kupatikana bidhaa yoyote yenye neno 'Alcohol Tester' kwenye DB!");
    process.exit();
  }

  console.log(`📦 Found Product: ${product.name} (ID: ${product.id})`);

  const localFiles = [
    'tester (1).jpg',  // THUMBNAIL
    'tester (1).jpeg', 
    'tester (2).jpg', 
    'tester (3).webp', 
    'tester (4).webp', 
    'tester (5).webp'
  ];

  const finalUrls = [];
  for (const file of localFiles) {
    const filePath = path.join(__dirname, '../client/public', file);
    if (fs.existsSync(filePath)) {
      console.log(`📤 Uploading ${file}...`);
      const res = await cloudinary.uploader.upload(filePath, {
        folder: "onewave_industrial_inventory",
        overwrite: true,
        quality: "auto:best"
      });
      finalUrls.push(res.secure_url);
    }
  }

  // 2. Update Database kwa kutumia ID (Njia ya uhakika zaidi)
  const { error } = await supabase
    .from('products')
    .update({ 
      name: 'Alcohol Tester', // Tunalazimisha jina fupi hapa
      images: finalUrls 
    })
    .eq('id', product.id);

  if (error) console.error("❌ Update failed:", error.message);
  else console.log("✅ SUCCESS: Alcohol Tester updated with 4K images!");

  process.exit();
};

fix();