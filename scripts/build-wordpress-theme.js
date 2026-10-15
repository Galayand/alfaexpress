/**
 * Alfa Express Logistics - Standardized WordPress Theme Build & Asset Mapping Script
 *
 * This script maps and synchronizes all local assets (logos, SVGs, 3D canvas textures,
 * images, and scripts) from /public into the standalone WordPress theme structure,
 * verifies template path resolutions, and builds deployment-ready zip packages.
 *
 * Usage:
 *   node scripts/build-wordpress-theme.js
 *   npm run build:theme
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import JSZip from 'jszip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// PATH CONFIGURATION
const PATHS = {
  root: ROOT_DIR,
  publicAssets: path.join(ROOT_DIR, 'public', 'assets'),
  brandAssets: path.join(ROOT_DIR, 'public', 'assets', 'brand'),
  reviewsAssets: path.join(ROOT_DIR, 'public', 'assets', 'reviews'),
  wpThemeDir: path.join(ROOT_DIR, 'public', 'wordpress-package', 'alfa-express-theme'),
  wpAssetsDir: path.join(ROOT_DIR, 'public', 'wordpress-package', 'alfa-express-theme', 'assets'),
  wpImagesDir: path.join(ROOT_DIR, 'public', 'wordpress-package', 'alfa-express-theme', 'assets', 'images'),
  wpJsDir: path.join(ROOT_DIR, 'public', 'wordpress-package', 'alfa-express-theme', 'assets', 'js'),
  wpCssDir: path.join(ROOT_DIR, 'public', 'wordpress-package', 'alfa-express-theme', 'assets', 'css'),
  outputDir: path.join(ROOT_DIR, 'public'),
};

// ASSET MAPPING TABLE
const ASSET_MAPPINGS = [
  // 1. Brand Logos & Key Graphics
  {
    category: 'Brand',
    source: path.join(PATHS.brandAssets, 'alfa-logo.webp'),
    destination: path.join(PATHS.wpImagesDir, 'alfa-logo.webp'),
    wpTemplateUri: 'assets/images/alfa-logo.webp',
  },
  {
    category: 'Brand',
    source: path.join(PATHS.brandAssets, 'alfa-car.png'),
    destination: path.join(PATHS.wpImagesDir, 'alfa-car.png'),
    wpTemplateUri: 'assets/images/alfa-car.png',
  },
  // 2. Customer Reviews Avatars
  {
    category: 'Reviews',
    source: path.join(PATHS.reviewsAssets, 'review-1.jpeg'),
    destination: path.join(PATHS.wpImagesDir, 'review-1.jpeg'),
    wpTemplateUri: 'assets/images/review-1.jpeg',
  },
  {
    category: 'Reviews',
    source: path.join(PATHS.reviewsAssets, 'review-2.jpeg'),
    destination: path.join(PATHS.wpImagesDir, 'review-2.jpeg'),
    wpTemplateUri: 'assets/images/review-2.jpeg',
  },
  {
    category: 'Reviews',
    source: path.join(PATHS.reviewsAssets, 'review-3.jpeg'),
    destination: path.join(PATHS.wpImagesDir, 'review-3.jpeg'),
    wpTemplateUri: 'assets/images/review-3.jpeg',
  },
  {
    category: 'Reviews',
    source: path.join(PATHS.reviewsAssets, 'review-4.jpeg'),
    destination: path.join(PATHS.wpImagesDir, 'review-4.jpeg'),
    wpTemplateUri: 'assets/images/review-4.jpeg',
  },
  {
    category: 'Reviews',
    source: path.join(PATHS.reviewsAssets, 'review-5.jpeg'),
    destination: path.join(PATHS.wpImagesDir, 'review-5.jpeg'),
    wpTemplateUri: 'assets/images/review-5.jpeg',
  },
  {
    category: 'Reviews',
    source: path.join(PATHS.reviewsAssets, 'review-6.jpeg'),
    destination: path.join(PATHS.wpImagesDir, 'review-6.jpeg'),
    wpTemplateUri: 'assets/images/review-6.jpeg',
  },
];

console.log('\n======================================================');
console.log('📦 ALFA EXPRESS - STANDARDIZED WORDPRESS THEME BUILDER');
console.log('======================================================\n');

// STEP 1: Ensure Target Directory Structure Exists
console.log('📁 1. Ensuring target WordPress theme directories exist...');
const dirsToEnsure = [
  PATHS.wpThemeDir,
  PATHS.wpAssetsDir,
  PATHS.wpImagesDir,
  PATHS.wpJsDir,
  PATHS.wpCssDir,
];

dirsToEnsure.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`   + Created: ${path.relative(ROOT_DIR, dir)}`);
  }
});

// STEP 2: Map & Synchronize Assets
console.log('\n🔄 2. Synchronizing and mapping local assets to WordPress theme...');
let syncedCount = 0;
ASSET_MAPPINGS.forEach(item => {
  if (fs.existsSync(item.source)) {
    fs.copyFileSync(item.source, item.destination);
    console.log(`   ✓ [${item.category}] Synced ${path.basename(item.source)} -> ${path.relative(ROOT_DIR, item.destination)}`);
    syncedCount++;
  } else if (fs.existsSync(item.destination)) {
    console.log(`   ℹ [${item.category}] Theme asset verified in-place: ${path.basename(item.destination)}`);
    syncedCount++;
  } else {
    console.warn(`   ⚠ [${item.category}] Warning: Source asset not found: ${item.source}`);
  }
});

// Also sync theme preview screenshot if exists
const screenshotSrc = path.join(PATHS.wpThemeDir, 'screenshot.png');
if (!fs.existsSync(screenshotSrc) && fs.existsSync(path.join(PATHS.brandAssets, 'alfa-logo.webp'))) {
  fs.copyFileSync(path.join(PATHS.brandAssets, 'alfa-logo.webp'), screenshotSrc);
  console.log(`   ✓ Synced screenshot.png for WordPress admin theme preview`);
}

// STEP 3: Verify Core Template Files & Asset URI Resolution
console.log('\n🔍 3. Verifying WordPress template files & asset resolution standard...');
const REQUIRED_THEME_FILES = [
  'style.css',
  'functions.php',
  'header.php',
  'footer.php',
  'front-page.php',
  'page-services.php',
  'page-branches.php',
  'page-faq.php',
  'page-blog.php',
  'page-tracking.php',
  'page-quote.php',
  'template-elementor-canvas.php',
  'template-elementor-fullwidth.php',
  'admin/class-alfa-one-time-importer.php',
  'assets/css/alfa-theme.css',
  'assets/js/alfa-theme.js',
  'assets/js/alfa-3d-hero.js',
  'assets/js/three.min.js'
];

let missingFiles = 0;
REQUIRED_THEME_FILES.forEach(relPath => {
  const fullPath = path.join(PATHS.wpThemeDir, relPath);
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    console.log(`   ✓ ${relPath} (${(stats.size / 1024).toFixed(1)} KB)`);
  } else {
    console.error(`   ✗ Missing critical theme file: ${relPath}`);
    missingFiles++;
  }
});

if (missingFiles > 0) {
  console.error(`\n❌ Error: ${missingFiles} required theme files are missing. Aborting archive build.`);
  process.exit(1);
}

// STEP 4: Package WordPress ZIPs with Standard Structure using JSZip
console.log('\n📦 4. Packaging standalone WordPress ZIP distributions...');

function addFolderToZip(zip, folderPath, zipFolderPrefix = '') {
  const items = fs.readdirSync(folderPath);
  for (const item of items) {
    const fullPath = path.join(folderPath, item);
    const zipPath = zipFolderPrefix ? `${zipFolderPrefix}/${item}` : item;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      addFolderToZip(zip, fullPath, zipPath);
    } else {
      const fileData = fs.readFileSync(fullPath);
      zip.file(zipPath, fileData);
    }
  }
}

async function createThemeZip() {
  const v57ZipPath = path.join(ROOT_DIR, 'public', 'alfaExpressV5.7.zip');
  const v57LowerZipPath = path.join(ROOT_DIR, 'public', 'alfaExpressv5.7.zip');
  const v57HyphenZipPath = path.join(ROOT_DIR, 'public', 'alfa-express-v5.7.zip');
  const v57ThemeZipPath = path.join(ROOT_DIR, 'public', 'alfaThemeV5.7.zip');

  const v56ZipPath = path.join(ROOT_DIR, 'public', 'alfaExpressV5.6.zip');
  const v56LowerZipPath = path.join(ROOT_DIR, 'public', 'alfaExpressv5.6.zip');
  const v56HyphenZipPath = path.join(ROOT_DIR, 'public', 'alfa-express-v5.6.zip');
  const v56ThemeZipPath = path.join(ROOT_DIR, 'public', 'alfaThemeV5.6.zip');

  const v55ZipPath = path.join(ROOT_DIR, 'public', 'alfaExpressV5.5.zip');
  const v55LowerZipPath = path.join(ROOT_DIR, 'public', 'alfaExpressv5.5.zip');
  const v55HyphenZipPath = path.join(ROOT_DIR, 'public', 'alfa-express-v5.5.zip');
  const v55ThemeZipPath = path.join(ROOT_DIR, 'public', 'alfaThemeV5.5.zip');
  const v55ThemeHyphenZipPath = path.join(ROOT_DIR, 'public', 'alfa-theme-v5.5.zip');

  const v52ZipPath = path.join(ROOT_DIR, 'public', 'alfaExpressv5.2.zip');
  const v52HyphenZipPath = path.join(ROOT_DIR, 'public', 'alfa-express-v5.2.zip');
  const v52ThemeZipPath = path.join(ROOT_DIR, 'public', 'alfaThemeV5.2.zip');
  const v52ThemeHyphenZipPath = path.join(ROOT_DIR, 'public', 'alfa-theme-v5.2.zip');

  const wpPackageDir = path.join(ROOT_DIR, 'public', 'wordpress-package');
  const internalV57ZipPath = path.join(wpPackageDir, 'alfaExpressV5.7.zip');
  const internalV57LowerZipPath = path.join(wpPackageDir, 'alfaExpressv5.7.zip');
  const internalV57HyphenZipPath = path.join(wpPackageDir, 'alfa-express-v5.7.zip');
  const internalV57ThemeZipPath = path.join(wpPackageDir, 'alfaThemeV5.7.zip');

  const internalV56ZipPath = path.join(wpPackageDir, 'alfaExpressV5.6.zip');
  const internalV56LowerZipPath = path.join(wpPackageDir, 'alfaExpressv5.6.zip');
  const internalV56HyphenZipPath = path.join(wpPackageDir, 'alfa-express-v5.6.zip');
  const internalV56ThemeZipPath = path.join(wpPackageDir, 'alfaThemeV5.6.zip');

  const internalV55ZipPath = path.join(wpPackageDir, 'alfaExpressV5.5.zip');
  const internalV55LowerZipPath = path.join(wpPackageDir, 'alfaExpressv5.5.zip');
  const internalV55HyphenZipPath = path.join(wpPackageDir, 'alfa-express-v5.5.zip');
  const internalV55ThemeZipPath = path.join(wpPackageDir, 'alfaThemeV5.5.zip');

  const internalV52ZipPath = path.join(wpPackageDir, 'alfaExpressv5.2.zip');
  const internalV52HyphenZipPath = path.join(wpPackageDir, 'alfa-express-v5.2.zip');
  const internalV52ThemeZipPath = path.join(wpPackageDir, 'alfaThemeV5.2.zip');

  const finalV5ZipPath = path.join(ROOT_DIR, 'public', 'alfaThemeV5.zip');
  const finalV5HyphenZipPath = path.join(ROOT_DIR, 'public', 'alfa-theme-v5.zip');
  const internalV5ZipPath = path.join(wpPackageDir, 'alfaThemeV5.zip');
  const internalV5HyphenZipPath = path.join(wpPackageDir, 'alfa-theme-v5.zip');

  const finalV3ZipPath = path.join(ROOT_DIR, 'public', 'alfaFinalThemeV3.zip');
  const finalV3HyphenZipPath = path.join(ROOT_DIR, 'public', 'alfa-final-theme-v3.zip');
  const themeFinalV3ZipPath = path.join(ROOT_DIR, 'public', 'alfa-theme-final-v3.zip');
  const finalV2ZipPath = path.join(ROOT_DIR, 'public', 'alfa-theme-final-v2.zip');
  const finalV2SpacedZipPath = path.join(ROOT_DIR, 'public', 'alfa theme final v2.zip');
  const finalZipPath = path.join(ROOT_DIR, 'public', 'alfa-express-final.zip');
  const themeZipPath = path.join(ROOT_DIR, 'public', 'alfa-express-theme.zip');
  const legacyZipPath = path.join(ROOT_DIR, 'public', 'alfa express final.zip');
  const internalV3ZipPath = path.join(wpPackageDir, 'alfaFinalThemeV3.zip');
  const internalZipPath = path.join(wpPackageDir, 'alfa-express-theme.zip');
  const internalV2ZipPath = path.join(wpPackageDir, 'alfa-theme-final-v2.zip');

  // Remove existing archives
  [
    v55ZipPath,
    v55LowerZipPath,
    v55HyphenZipPath,
    v55ThemeZipPath,
    v55ThemeHyphenZipPath,
    internalV55ZipPath,
    internalV55LowerZipPath,
    internalV55HyphenZipPath,
    internalV55ThemeZipPath,
    v52ZipPath,
    v52HyphenZipPath,
    v52ThemeZipPath,
    v52ThemeHyphenZipPath,
    internalV52ZipPath,
    internalV52HyphenZipPath,
    internalV52ThemeZipPath,
    finalV5ZipPath,
    finalV5HyphenZipPath,
    internalV5ZipPath,
    internalV5HyphenZipPath,
    finalV3ZipPath,
    finalV3HyphenZipPath,
    themeFinalV3ZipPath,
    finalV2ZipPath,
    finalV2SpacedZipPath,
    finalZipPath,
    themeZipPath,
    legacyZipPath,
    internalV3ZipPath,
    internalZipPath,
    internalV2ZipPath
  ].forEach(zip => {
    if (fs.existsSync(zip)) fs.unlinkSync(zip);
  });

  const zip = new JSZip();
  addFolderToZip(zip, PATHS.wpThemeDir, 'alfa-express-theme');

  const content = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 }
  });

  // Write V5.7 Packages (Latest)
  fs.writeFileSync(v57ZipPath, content);
  fs.writeFileSync(v57LowerZipPath, content);
  fs.writeFileSync(v57HyphenZipPath, content);
  fs.writeFileSync(v57ThemeZipPath, content);
  fs.writeFileSync(internalV57ZipPath, content);
  fs.writeFileSync(internalV57LowerZipPath, content);
  fs.writeFileSync(internalV57HyphenZipPath, content);
  fs.writeFileSync(internalV57ThemeZipPath, content);

  // Write V5.6 Packages (Compatible update)
  fs.writeFileSync(v56ZipPath, content);
  fs.writeFileSync(v56LowerZipPath, content);
  fs.writeFileSync(v56HyphenZipPath, content);
  fs.writeFileSync(v56ThemeZipPath, content);
  fs.writeFileSync(internalV56ZipPath, content);
  fs.writeFileSync(internalV56LowerZipPath, content);
  fs.writeFileSync(internalV56HyphenZipPath, content);
  fs.writeFileSync(internalV56ThemeZipPath, content);

  // Write V5.5 Packages
  fs.writeFileSync(v55ZipPath, content);
  fs.writeFileSync(v55LowerZipPath, content);
  fs.writeFileSync(v55HyphenZipPath, content);
  fs.writeFileSync(v55ThemeZipPath, content);
  fs.writeFileSync(v55ThemeHyphenZipPath, content);
  fs.writeFileSync(internalV55ZipPath, content);
  fs.writeFileSync(internalV55LowerZipPath, content);
  fs.writeFileSync(internalV55HyphenZipPath, content);
  fs.writeFileSync(internalV55ThemeZipPath, content);

  // Write legacy/alias Packages
  fs.writeFileSync(v52ZipPath, content);
  fs.writeFileSync(v52HyphenZipPath, content);
  fs.writeFileSync(v52ThemeZipPath, content);
  fs.writeFileSync(v52ThemeHyphenZipPath, content);
  fs.writeFileSync(internalV52ZipPath, content);
  fs.writeFileSync(internalV52HyphenZipPath, content);
  fs.writeFileSync(internalV52ThemeZipPath, content);

  fs.writeFileSync(finalV5ZipPath, content);
  fs.writeFileSync(finalV5HyphenZipPath, content);
  fs.writeFileSync(internalV5ZipPath, content);
  fs.writeFileSync(internalV5HyphenZipPath, content);
  fs.writeFileSync(finalV3ZipPath, content);
  fs.writeFileSync(finalV3HyphenZipPath, content);
  fs.writeFileSync(themeFinalV3ZipPath, content);
  fs.writeFileSync(internalV3ZipPath, content);
  fs.writeFileSync(finalV2ZipPath, content);
  fs.writeFileSync(finalV2SpacedZipPath, content);
  fs.writeFileSync(finalZipPath, content);
  fs.writeFileSync(themeZipPath, content);
  fs.writeFileSync(legacyZipPath, content);
  fs.writeFileSync(internalZipPath, content);
  fs.writeFileSync(internalV2ZipPath, content);

  const zipStats = fs.statSync(v57ZipPath);
  console.log(`   ✓ Built: alfaExpressV5.7.zip (${(zipStats.size / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`   ✓ Built: alfa-express-v5.7.zip (${(zipStats.size / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`   ✓ Built: alfaExpressV5.6.zip (${(zipStats.size / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`   ✓ Built: alfaExpressV5.5.zip (${(zipStats.size / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`   ✓ Built: alfa-express-v5.5.zip (${(zipStats.size / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`   ✓ Built: alfaThemeV5.5.zip (${(zipStats.size / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`   ✓ Built: alfaExpressv5.2.zip (${(zipStats.size / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`   ✓ Built: alfa-express-v5.2.zip (${(zipStats.size / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`   ✓ Built: alfaThemeV5.2.zip (${(zipStats.size / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`   ✓ Built: alfaThemeV5.zip (${(zipStats.size / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`   ✓ Built: alfaFinalThemeV3.zip (${(zipStats.size / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`   ✓ Built: alfa-express-final.zip (${(zipStats.size / (1024 * 1024)).toFixed(2)} MB)`);

  console.log('\n======================================================');
  console.log('✅ WORDPRESS THEME BUILD & ASSET MAPPING COMPLETE');
  console.log('======================================================\n');
}

createThemeZip().catch((err) => {
  console.error('❌ Failed during zip packaging:', err.message);
  process.exit(1);
});
