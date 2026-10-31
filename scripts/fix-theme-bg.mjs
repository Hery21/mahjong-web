import { readFileSync, writeFileSync } from 'node:fs'

let css = readFileSync('src/css/peranakan-theme.css', 'utf8')
// Force tile background to transparent so the WebP shows through
css = css.replace('--tile-background: var(--app-surface);', '--tile-background: transparent !important;')
writeFileSync('src/css/peranakan-theme.css', css)
console.log('Updated peranakan-theme.css tile background')
