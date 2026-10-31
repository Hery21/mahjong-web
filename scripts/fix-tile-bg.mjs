import { readFileSync, writeFileSync } from 'node:fs'

let css = readFileSync('src/css/tiles.css', 'utf8')
if (!css.includes('background-color: transparent !important;')) {
  css = css.replace(
    'background-color: var(--tile-background);',
    'background-color: transparent !important;'
  )
  writeFileSync('src/css/tiles.css', css)
  console.log('Removed white background from tiles.css')
} else {
  console.log('Tiles already transparent')
}
