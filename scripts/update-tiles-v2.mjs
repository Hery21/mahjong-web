import { readFileSync, writeFileSync, existsSync, renameSync } from 'node:fs'

// 1. Update tiles.css paths
let css = readFileSync('src/css/tiles.css', 'utf8')
let changes = []

for (let i = 0; i <= 41; i++) {
  const from = '../../img/tiles/small/' + i + '.jpg'
  const to = '../../img/tiles/renamed_webp/' + i + '.webp'
  if (css.includes(from)) {
    css = css.split(from).join(to)
    changes.push('tile ' + i)
  }
}

// dead.webp if exists in renamed_webp
if (existsSync('img/tiles/renamed_webp/dead.webp')) {
  css = css.split('../../img/tiles/small/dead.jpg').join('../../img/tiles/renamed_webp/dead.webp')
  changes.push('dead')
}

// concealed.webp — check if exists, else keep .jpg fallback
if (existsSync('img/tiles/renamed_webp/concealed.webp')) {
  css = css.split('../../img/tiles/small/concealed.jpg').join('../../img/tiles/renamed_webp/concealed.webp')
  changes.push('concealed')
} else {
  console.log('concealed.webp not found — keeping small/concealed.jpg fallback')
}

writeFileSync('src/css/tiles.css', css)
console.log('Updated tiles: ' + changes.length + ' entries')

// 2. Disable default-tileset.png so it doesn't override tiles.css
if (existsSync('img/tiles/default-tileset.png')) {
  renameSync('img/tiles/default-tileset.png', 'img/tiles/default-tileset.png.disabled')
  console.log('Renamed default-tileset.png → default-tileset.png.disabled')
} else {
  console.log('default-tileset.png already disabled or absent')
}
