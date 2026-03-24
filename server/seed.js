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

const uploadLocalImage = async (fileName) => {
  try {
    const filePath = path.join(__dirname, '../client/public', fileName);
    if (!fs.existsSync(filePath)) return null;

    const result = await cloudinary.uploader.upload(filePath, {
      folder: "onewave_industrial_inventory",
      public_id: fileName.replace(/\s+/g, '_').split('.')[0],
      overwrite: true,
    });
    return result.secure_url;
  } catch (err) {
    console.error(`❌ Error uploading ${fileName}:`, err.message);
    return null;
  }
};

// HELPER: Generates filename arrays based on your patterns
const genArr = (base, count, ext = 'jpg') => Array.from({ length: count }, (_, i) => `${base} (${i + 1}).${ext}`);

const remainingProducts = [
  {
    name: "High-Power Tactical Security Torch",
    brand: "OneWave Pro",
    category: "security-torch",
    short: "Military-grade LED lighting for professional security patrols.",
    points: ["Ultra-Bright: High-lumen T6 LED chip for long-distance visibility.", "Rugged Build: Aerospace-grade aluminum with waterproof sealing.", "Zoomable: Adjustable focus from wide floodlight to narrow spotlight."],
    specs: { lumens: "2000LM", battery: "Rechargeable 18650", material: "Aluminum", modes: "5 Modes" },
    localImages: genArr('torch', 9)
  },
  {
    name: "Professional Radio Base Station",
    brand: "OneWave Comms",
    category: "radio-base",
    short: "Fixed-mount radio station for command centers and dispatch.",
    points: ["High Power: 25W-50W output for city-wide communication range.", "Clear Audio: Integrated noise-filtering for loud dispatch centers.", "External Support: Connects to high-gain roof antennas for maximum reach."],
    specs: { power: "50W", channels: "200", voltage: "13.8V DC", display: "Large LCD" },
    localImages: genArr('radiobase', 4)
  },
  {
    name: "Thermal Receipt Printer H806",
    brand: "Hoin",
    category: "pos-printer",
    short: "Premium 80mm thermal printer with high-speed auto-cutter.",
    points: ["Speed King: 250mm/s printing speed for high-traffic retail.", "Reliable Cutter: Auto-cutter tested for 1.5 million clean cuts.", "Multi-Interface: Connect via USB, LAN, or Serial for POS systems."],
    specs: { width: "80mm", speed: "250mm/s", cutter: "Auto", interface: "USB/LAN/Serial" },
    localImages: genArr('H806', 5)
  },
  {
    name: "Portable Thermal Printer P58B",
    brand: "Hoin",
    category: "pos-printer",
    short: "Mobile 58mm thermal printer for deliveries and field sales.",
    points: ["Bluetooth Ready: Connect directly to Android/iOS smartphones.", "Long Life: Large rechargeable battery for a full day of field work.", "Inkless: Zero ribbons needed—uses high-quality thermal technology."],
    specs: { width: "58mm", connection: "Bluetooth/USB", battery: "1500mAh", weight: "210g" },
    localImages: genArr('p58b', 5)
  },
  {
    name: "Industrial POS Touch Monitor",
    brand: "OneWave POS",
    category: "pos-monitor",
    short: "High-sensitivity touch display for retail and restaurants.",
    points: ["Precise Touch: 10-point capacitive touch for fast ordering.", "Durable Screen: Oil-resistant and waterproof glass surface.", "Adjustable Stand: Heavy-duty base for ergonomic counter placement."],
    specs: { size: "15-inch", resolution: "1024x768", type: "Capacitive", brightness: "350cd/m2" },
    localImages: genArr('posmonitor', 4)
  },
  {
    name: "Professional Handheld Metal Detector",
    brand: "OneWave Guard",
    category: "metal-detector",
    short: "High-sensitivity scanner for security screening checkpoints.",
    points: ["Dual Alarm: Switch between audible beep and silent vibration.", "Long Range: Detects handguns from 9 inches and knives from 6 inches.", "Low Power: Energy-efficient design for 40+ hours of operation."],
    specs: { sensitivity: "High", battery: "9V Block", alarm: "Sound/Vibrate", weight: "400g" },
    localImages: [...genArr('metaldetector', 4), 'metaldetector (1).png']
  },
  {
    name: "Telescopic Steel Security Baton",
    brand: "OneWave Guard",
    category: "baton",
    short: "Heavy-duty expandable baton for professional security personnel.",
    points: ["Cold-Drawn Steel: Maximum durability and impact resistance.", "Rubber Grip: Non-slip handle for secure use in all weather.", "Rapid Deploy: One-flick expansion for immediate tactical defense."],
    specs: { material: "Solid Steel", length: "26 Inches", grip: "Rubber Foam", type: "Expandable" },
    localImages: genArr('baton', 2)
  },
  {
    name: "Digital Satellite Signal Finder",
    brand: "OneWave Sat",
    category: "satellite-finder",
    short: "Precision measurement tool for satellite dish alignment.",
    points: ["Real-time Signal: Digital LCD with visual and audible signal strength.", "Wide Support: Compatible with DVB-S and DVB-S2 systems.", "Internal Battery: No need for external power during installation."],
    specs: { display: "LCD", frequency: "950-2150MHz", battery: "Li-ion", compass: "Built-in" },
    localImages: genArr('finder', 11)
  },
  {
    name: "Omnidirectional Desktop Barcode Scanner",
    brand: "OneWave POS",
    category: "barcode-scanner",
    short: "High-speed 1D/2D scanner for fast-paced retail checkout.",
    points: ["Hands-Free: Large scanning window for 'pass-through' efficiency.", "2D Ready: Scans QR codes from mobile screens and paper.", "Auto-Sleep: Energy saving mode when not in active use."],
    specs: { type: "1D/2D CMOS", interface: "USB", scan_angle: "Omnidirectional", sensor: "Automatic" },
    localImages: genArr('scanner', 11)
  },
  {
    name: "Handheld Android POS Printer",
    brand: "OneWave Mobile",
    category: "android-printer",
    short: "All-in-one handheld terminal with built-in thermal printer.",
    points: ["Android OS: Run your POS apps (M-Pesa, Retail, etc.) directly.", "High Speed: Built-in 58mm printer for instant receipt generation.", "Connectivity: Full 4G, Wi-Fi, and Bluetooth support for mobility."],
    specs: { os: "Android 8.1+", printer: "58mm Thermal", connectivity: "4G/WiFi/BT", camera: "Scanning/Photo" },
    localImages: genArr('aprinter', 5)
  },
  {
    name: "Professional Digital Alcohol Tester",
    brand: "OneWave Safety",
    category: "alcohol-tester",
    short: "High-accuracy breathalyzer for workplace safety compliance.",
    points: ["Precision Sensor: Advanced semiconductor sensor for fast results.", "Fast Reset: Quick warm-up and recovery for bulk staff testing.", "Compact: Portable design with interchangeable mouthpieces."],
    specs: { sensor: "Semiconductor", warmup: "10-15s", accuracy: "0.01% BAC", display: "Digital LCD" },
    localImages: ['tester (1).bmp', 'tester (1).jpeg', 'tester (1).jpg', 'tester (1).png', 'tester (1).webp', ...genArr('tester', 5).slice(1)]
  },
  {
    name: "IPX8 Waterproof Marine Radio",
    brand: "OneWave Marine",
    category: "marine-radio",
    short: "Submersible floating VHF radio for maritime operations.",
    points: ["Floating Design: Does not sink if dropped in deep water.", "Emergency Access: Instant access to International Channel 16.", "IPX8 Rated: Fully submersible for underwater survival."],
    specs: { rating: "IPX8 Submersible", power: "6W", bands: "All Marine Channels", feature: "Vibrating Drain" },
    localImages: genArr('marine', 7)
  }
];

const seedRemaining = async () => {
  console.log("🚀 STARTING INDUSTRIAL INVENTORY MIGRATION...");

  // Wipes categories we are about to re-seed to avoid duplicates
  const cats = [...new Set(remainingProducts.map(p => p.category))];
  for (const cat of cats) {
    await supabase.from('products').delete().eq('category', cat);
  }

  for (const item of remainingProducts) {
    console.log(`\n📦 Processing: ${item.name}`);
    
    const cloudinaryUrls = [];
    for (const imgName of item.localImages) {
      const url = await uploadLocalImage(imgName);
      if (url) cloudinaryUrls.push(url);
    }

    if (cloudinaryUrls.length === 0) {
        console.warn(`⚠️ No images found for ${item.name}. Check client/public folder.`);
    }

    const { error } = await supabase.from('products').insert([{
      name: item.name,
      brand: item.brand,
      category: item.category,
      short_description: item.short,
      description_points: item.points,
      specifications: item.specs,
      images: cloudinaryUrls
    }]);

    if (error) console.error(`❌ DB Error:`, error.message);
    else console.log(`✅ ${item.name} seeded with ${cloudinaryUrls.length} images.`);
  }
  console.log("\n✨ Mission Complete: All 100+ items are safe in Cloudinary/Supabase!");
  process.exit();
};

seedRemaining();