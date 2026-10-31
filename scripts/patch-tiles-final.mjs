import { readFileSync, writeFileSync } from 'node:fs'

// 1. Update tiles.css using regex to catch small/ or renamed_webp/ and .jpg or .webp
let css = readFileSync('src/css/tiles.css', 'utf8')
css = css.replace(/img\/tiles\/(small|renamed_webp)\/?([0-9]+)\.(jpg|webp)/g, 'img/tiles/renamed_webp/$2.webp')
if (css.includes('small/dead.jpg')) {
  css = css.replace('img/tiles/small/dead.jpg', 'img/tiles/renamed_webp/dead.webp')
}
if (css.includes('small/concealed.jpg')) {
  css = css.replace('img/tiles/small/concealed.jpg', 'img/tiles/renamed_webp/concealed.webp')
}
writeFileSync('src/css/tiles.css', css)
console.log('Patched tiles.css paths')

// 2. Disable default-tileset.png loader in utils.js so it doesn't override
let utils = readFileSync('src/js/page/utils.js', 'utf8')
const loadDefaultRegex = /static loadDefault\(\) \{[\s\S]*?\}/m
if (loadDefaultRegex.test(utils)) {
  utils = utils.replace(loadDefaultRegex, 'static loadDefault() { /* disabled to allow tiles.css override */ }')
  writeFileSync('src/js/page/utils.js', utils)
  console.log('Disabled default-tileset.png loader in utils.js')
}
