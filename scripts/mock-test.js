/**
 * Automated Mock Test for AN GIA GREEN Corporate Information & Social Media Links
 * Verifies that the branding data, multilingual translations, and footer link patterns are correct.
 * Run with: node scripts/mock-test.js
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert').strict;

console.log('====================================================');
console.log('🧪 RUNNING MOCK TESTS FOR AN GIA GREEN INFORMATION');
console.log('====================================================\n');

try {
  // 1. Test Translation Files Exist & Contain Required Corporate Information
  console.log('📁 Step 1: Checking translation files...');
  const langDir = path.join(__dirname, '..', 'language');
  
  const viFile = path.join(langDir, 'vietnamese.ts');
  const enFile = path.join(langDir, 'english.ts');
  const zhFile = path.join(langDir, 'chinese.ts');
  
  assert.ok(fs.existsSync(viFile), 'vietnamese.ts should exist');
  assert.ok(fs.existsSync(enFile), 'english.ts should exist');
  assert.ok(fs.existsSync(zhFile), 'chinese.ts should exist');
  console.log('   ✅ Translation files exist.\n');

  // Load files as text to parse export properties simply
  const viContent = fs.readFileSync(viFile, 'utf8');
  const enContent = fs.readFileSync(enFile, 'utf8');
  const zhContent = fs.readFileSync(zhFile, 'utf8');

  // 2. Verify Corporate Brand Details
  console.log('🌿 Step 2: Verifying corporate brand details...');
  
  // Slogan
  assert.ok(viContent.includes('AN GIA GREEN'), 'Vietnamese translations must include AN GIA GREEN brand name');
  assert.ok(enContent.includes('AN GIA GREEN'), 'English translations must include AN GIA GREEN brand name');
  assert.ok(zhContent.includes('AN GIA GREEN'), 'Chinese translations must include AN GIA GREEN brand name');
  
  // Slogan text check
  assert.ok(viContent.includes('SỐNG XANH, SỐNG LÀNH, SỐNG CHỦ ĐỘNG'), 'Vietnamese Slogan matches exactly');
  assert.ok(enContent.includes('LIVE GREEN, LIVE HEALTHY, LIVE PROACTIVELY'), 'English Slogan matches exactly');
  assert.ok(zhContent.includes('绿色生活，健康生活，主动生活'), 'Chinese Slogan matches exactly');

  console.log('   ✅ Brand names & slogans are translated perfectly with correct diacritics.');
  console.log('   ✅ VI Slogan: "AN GIA GREEN – SỐNG XANH, SỐNG LÀNH, SỐNG CHỦ ĐỘNG"');
  console.log('   ✅ EN Slogan: "AN GIA GREEN – LIVE GREEN, LIVE HEALTHY, LIVE PROACTIVELY"');
  console.log('   ✅ ZH Slogan: "AN GIA GREEN – 绿色生活，健康生活，主动生活"\n');

  // 3. Verify Social Media Links inside Footer Component
  console.log('🔗 Step 3: Checking social media links inside Footer component...');
  const footerPath = path.join(__dirname, '..', 'components', 'layout', 'Footer.tsx');
  assert.ok(fs.existsSync(footerPath), 'Footer.tsx component should exist');

  const footerContent = fs.readFileSync(footerPath, 'utf8');

  // Assert Facebook Mock Link
  const hasFacebookMock = footerContent.includes('https://facebook.com/angiagreen.mock');
  assert.ok(hasFacebookMock, 'Footer must contain the Facebook mock link: https://facebook.com/angiagreen.mock');
  console.log('   ✅ Facebook link matches: https://facebook.com/angiagreen.mock');

  // Assert YouTube Mock Link
  const hasYoutubeMock = footerContent.includes('https://youtube.com/angiagreen.mock');
  assert.ok(hasYoutubeMock, 'Footer must contain the YouTube mock link: https://youtube.com/angiagreen.mock');
  console.log('   ✅ YouTube link matches: https://youtube.com/angiagreen.mock');

  // Assert Zalo Mock Link
  const hasZaloMock = footerContent.includes('https://zalo.me/0987654321');
  assert.ok(hasZaloMock, 'Footer must contain the Zalo mock link: https://zalo.me/0987654321');
  console.log('   ✅ Zalo link matches: https://zalo.me/0987654321\n');

  // 4. Verify Store Link Homepages
  console.log('📱 Step 4: Checking App Store & Google Play homepage links...');
  const hasAppStoreHomepage = footerContent.includes('https://www.apple.com/app-store/');
  const hasGooglePlayHomepage = footerContent.includes('https://play.google.com/store');

  assert.ok(hasAppStoreHomepage, 'Footer App Store link must point to Apple App Store homepage');
  assert.ok(hasGooglePlayHomepage, 'Footer Google Play link must point to Google Play Store homepage');
  console.log('   ✅ App Store link matches: https://www.apple.com/app-store/');
  console.log('   ✅ Google Play link matches: https://play.google.com/store\n');

  console.log('====================================================');
  console.log('🎉 ALL TESTS PASSED SUCCESSFULLY! (100% SUCCESS)');
  console.log('====================================================');

} catch (error) {
  console.error('\n❌ TEST FAILED:');
  console.error(error.message);
  process.exit(1);
}
